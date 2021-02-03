from django.shortcuts import render
from django.core.signing import Signer
from django.views.generic import TemplateView
from django.contrib.auth import get_user_model
from django.http import Http404
from django.conf import settings
from django.utils import timezone
from django.db.models import Q
from rest_framework.parsers import MultiPartParser, FormParser
from rest_framework import generics, mixins, status
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated, AllowAny
from .models import (
   TEST_STATUS, 
   ANSWER_TYPE, 
   FILE_TYPE, 
   RESULT_STATUS, 
   Question, 
   QuestionGroup, 
   QuestionImage, 
   TestData, 
   SiteGroup,
   GroupsUser,
   Result,
   AnswerFill,
   AnswerUpload,
)
from .serializers import (
   QuestionSerializer, 
   TestQuestionSerializer, 
   GroupSerializer, 
   ImageSerializer, 
   TestDataSerializer, 
   PublicTestDataSerializer, 
   ResultSerializer,
   SiteGroupSerializer,
   AnswerUploadSerializer,
   GroupUserSerializer,
)
from .permissions import IsTestDataAuthor, IsResultTestAuthor, IsAuthor, IsMyTest
from .getdata import get_result, get_group, get_test
from .grade import grade
import logging
from pathlib import Path
import glob
import os


# Create your views here.
logger = logging.getLogger(__name__)

class Index(TemplateView):
   template_name = 'index.html'

class TestDataList(IsAuthor, generics.ListCreateAPIView):
   parser_classes = (MultiPartParser, FormParser)
   permission_classes = (IsAuthenticated,)
   serializer_class = TestDataSerializer
   queryset = TestData.objects.all()
   
   def perform_create(self, serializer):
      serializer.save(author=self.request.user)
      #Response(serializer.data)

class TestDataDetail(IsAuthor, generics.RetrieveUpdateDestroyAPIView):
   parser_classes = (MultiPartParser, FormParser)
   permission_classes = (IsAuthenticated,)
   serializer_class = TestDataSerializer
   queryset = TestData.objects.all()

class AllTestList(generics.ListAPIView):
   permission_classes = (IsAuthenticated,)
   serializer_class = PublicTestDataSerializer
   queryset = TestData.objects.all()

   def list(self, request, *args, **kwargs):
      data = self.serializer_class(self.get_queryset(), many=True).data
      if data:
            data = get_test(self, data)
            return Response(data)
      return Response({'error': "No test records found"}, status=status.HTTP_404_NOT_FOUND) 

class MyTestList(IsMyTest, generics.ListAPIView):
   permission_classes = (IsAuthenticated,)
   serializer_class = PublicTestDataSerializer
   queryset = TestData.objects.all()
   
   def list(self, request, *args, **kwargs):
      data = self.serializer_class(self.get_queryset(), many=True).data
      if data:
            data = get_test(self, data)
            return Response(data)
      return Response({'error': "No test records found"}, status=status.HTTP_404_NOT_FOUND) 

class MyTestDetail(IsMyTest, generics.RetrieveAPIView):
   permission_classes = (IsAuthenticated,)
   serializer_class = PublicTestDataSerializer
   queryset = TestData.objects.all()
   def retrieve(self, request, *args, **kwargs):
      data = self.serializer_class(self.get_object()).data
      if data:
            data = get_test(self, [data])[0]
            return Response(data)
      return Response({'error': "Test not found"}, status=status.HTTP_404_NOT_FOUND) 

class ValidateAccess(APIView):
   permission_classes = (IsAuthenticated,)
   
   def get_object(self):
      try:    
         return TestData.objects.get(
            Q(id=self.request.data.get('test_data', 0)) | Q(id=self.request.data.get('testId', 0))
         )
      except TestData.DoesNotExist:
         logger.error("Test not found")
         raise Http404
         #return {'valid': False, 'response': Response({'error': "Test not found"}, status=status.HTTP_404_NOT_FOUND)}
   def validate_access(self, request, *args, **kwargs):
      test_data = self.get_object()
      if test_data.status == "unavailable":
            return {'valid': False, 'response': Response({'error': "Sorry, this test is unavailable"}, status=status.HTTP_404_NOT_FOUND)}
      #check if user assigned to a test 
      site_group = SiteGroup.objects.filter(users=request.user, tests=test_data)
      if not site_group.exists():
            logger.error("no group")
            return {'valid': False, 'response': Response({'error': "You don't have access to test"}, status=status.HTTP_404_NOT_FOUND)}
      #check if allowed attempts       #not self.request.data.get('result', 0)
      if Result.objects.filter(user=request.user, test_data=test_data, submitted__isnull=False).count() >= test_data.allowed_attempts:
            logger.error("rewrite")
            return {'valid': False, 'response': Response({'error': "Test already written"}, status=status.HTTP_400_BAD_REQUEST)}
      #check if password exist and does not match 
      signer = Signer()
      logger.error(signer.unsign(test_data.password))
      if test_data.password and (signer.unsign(test_data.password) != request.data.get('password', '').strip()):
            logger.error("password")
            return {'valid': False, 'response': Response({'error': "Incurrect password"}, status=status.HTTP_400_BAD_REQUEST)}
      return {'valid': True, 'response': Response({'password_is_valid': True}, status=status.HTTP_200_OK)}
      
   def post(self, request, *args, **kwargs):
      return self.validate_access(request, *args, **kwargs)['response']

class TestQuestions(ValidateAccess, APIView):
   permission_classes = (IsAuthenticated,)
   serializer_class = TestQuestionSerializer
   queryset = Question.objects.all().order_by("group")

   def post(self, request, *args, **kwargs):
      access = self.validate_access(request, *args, **kwargs)
      if not access['valid']:
            return access['response']
      test_data = self.get_object()
      #check if test still available
      now = timezone.now()
      if not (((test_data.start_date == None) or (test_data.start_date <= now)) \
         and ((test_data.end_date == None) or (test_data.end_date >= now))):
         return Response(
            {'error': "Sorry test is only available from %s to %s" % \
               (
                  test_data.start_date.strftime("%A,%b %d, %Y. %I:%M %p"), 
                  test_data.end_date.strftime("%A,%b %d, %Y. %I:%M %p"),
               )}, 
            status=status.HTTP_404_NOT_FOUND
         )
      test_data.total_attempts += 1
      test_data.save()

      result = Result.objects.filter(
         user=request.user,
         test_data=test_data,
         submitted__isnull=True
      )
      if result.exists():
         result = result[0]
         logger.error(result)
      else:
         result = Result.objects.create(
            user=request.user, 
            test_data=test_data, 
            total=test_data.valid_questions
         )
      question_queryset = self.queryset.filter(valid_question=True, test_data=test_data)
      data = self.serializer_class(question_queryset, many=True).data
      return Response({'questions': data, 'resultId': result.id}, status=status.HTTP_200_OK)

class SubmitTest(ValidateAccess, APIView):
   permission_classes = (IsAuthenticated,)
   serializer_class = ResultSerializer
   queryset = Question.objects.all().order_by("group")

   def post(self, request, *args, **kwargs):
      access = self.validate_access(request, *args, **kwargs)
      if not access['valid']:
            return access['response']
      test_data = self.get_object()
      try:
         result = Result.objects.get(id=request.data.get('resultId', 0), user=request.user)
      except Result.DoesNotExist:
            logger.error("Result not found")
            #raise Http404
            return Response({'error': "Result not found"}, status=status.HTTP_404_NOT_FOUND)
      question_queryset = self.queryset.filter(valid_question=True, test_data=test_data)
      result.result_status = RESULT_STATUS[1][0] #result available
      logger.error(request.data['answers'])
      for question_id in request.data['answers'].keys():
         questions = question_queryset.filter(id=int(question_id))
         if questions.exists():
            question = questions[0]
            if question.answer_type == "OPTION":
               if question.answer == request.data['answers'].get(question_id, '').strip():
                  result.score += test_data.points_per_mark
                  result.correct += 1
               else:
                  result.incorrect += 1
            elif question.answer_type == "FILL":
               if request.data['answers'].get(question_id, '').strip():
                  AnswerFill.objects.create(
                     question=question, 
                     answer=request.data['answers'].get(question_id, ''), 
                     result=result, 
                     user=request.user, 
                     test_data=test_data
                  )
                  result.result_status = RESULT_STATUS[0][0] #result pending
               else:
                  result.incorrect += 1
            elif question.answer_type == "FILE":
               if AnswerUpload.objects.filter(question=question, result=result).exists():
                  result.result_status = RESULT_STATUS[0][0]
               else:
                  result.incorrect += 1
      result.grade = grade(test_data, result)
      result.time_elapsed = request.data.get('time', result.time_elapsed)
      result.submitted = timezone.now()
      result.save()
      if test_data.view_result:
            data = get_result([result])[0]
            return Response(data, status=status.HTTP_200_OK)
      return Response(status=status.HTTP_200_OK)

class ResultList(generics.ListAPIView):
   permission_classes = (IsAuthenticated,)
   serializer_class = ResultSerializer
   queryset = Result.objects.all()

   def list(self, request, version, pk=None):
      results = self.queryset.filter(Q(user=request.user) | Q(test_data__author=request.user))
      if not results.exists():
            return Response({'error': "Result not found"}, status=status.HTTP_404_NOT_FOUND)
      if pk:
         tests = TestData.objects.filter(
            sitegroup__id=self.kwargs['pk']
         ).values_list('id', flat=True)
         logger.error(tests)
         results = self.queryset.filter(test_data__id__in=tests)
         if not results.exists():
            return Response({'error': "Group result not found"}, status=status.HTTP_404_NOT_FOUND)
      data = get_result(results)
      return Response(data, status=status.HTTP_200_OK)

class QuestionList(IsTestDataAuthor, generics.ListCreateAPIView):
   permission_classes = (IsAuthenticated,)
   serializer_class = QuestionSerializer
   queryset = Question.objects.all().order_by("group")
   
class QuestionDetail(IsTestDataAuthor, generics.RetrieveUpdateDestroyAPIView):
   permission_classes = (IsAuthenticated,)
   serializer_class = QuestionSerializer
   queryset = Question.objects.all()

class AllSiteGroupList(generics.ListAPIView):
   permission_classes = (IsAuthenticated,)
   serializer_class = SiteGroupSerializer
   queryset = SiteGroup.objects.all()
   def list(self, *args, **kwargs):
      data = self.serializer_class(self.get_queryset(), many=True).data
      if data:
         #set sitegroup perperties for group users
         data = get_group(self, data)
         return Response(data)
      return Response({'error': "Result not found"}, status=status.HTTP_404_NOT_FOUND)        

class MySiteGroupList(generics.ListCreateAPIView):
   permission_classes = (IsAuthenticated,)
   serializer_class = SiteGroupSerializer
   queryset = SiteGroup.objects.all()
   def perform_create(self, serializer):
      serializer.save(author=self.request.user)
   def get_queryset(self):
      if self.request.user.is_author:
         return self.queryset.filter(author=self.request.user)
      else:
         return self.queryset.filter(Q(users=self.request.user) | Q(access="General"))
   def list(self, *args, **kwargs):
      data = self.serializer_class(self.get_queryset(), many=True).data
      if data:
         #set sitegroup perperties for group users
         data = get_group(self, data)
         return Response(data)
      return Response({'error': "Result not found"}, status=status.HTTP_404_NOT_FOUND)

class MySiteGroupDetail(IsAuthor, generics.RetrieveUpdateDestroyAPIView):
   permission_classes = (IsAuthenticated,)
   serializer_class = SiteGroupSerializer
   queryset = SiteGroup.objects.all()
   def retrieve(self, *args, **kwargs):
      data = self.serializer_class(self.get_object()).data
      if data:
         #set sitegroup perperties for group users
         data = get_group(self, [data])[0]
         return Response(data)
      return Response({'error': "Result not found"}, status=status.HTTP_404_NOT_FOUND)
   def update(self, *args, **kwargs):
      group = self.get_object()
      if not group:
         return Response({'error': "Group not found"}, status=status.HTTP_404_NOT_FOUND)
      #rename group
      group.name = self.request.data.get('name', group.name)
      group.save()
      data = self.serializer_class(group).data
      if not data:
         return Response({'error': "Failed to retrieve Group not found"}, status=status.HTTP_404_NOT_FOUND)
      #set sitegroup perperties for group users
      data = get_group(self, [data])[0]
      return Response(data)

class GroupAccess(APIView):
   serializer_class = SiteGroupSerializer
   queryset = SiteGroup.objects.all()
   def post(self, request, *args, **kwargs):
      group = kwargs.get('group_id', 0)
      groups = SiteGroup.objects.filter(id=group)
      if groups.exists():
         signer = Signer()
         groupInstance = groups[0]
         logger.error(type(request.data.get('access_key')))
         access_key = request.data.get('access_key', None)
         can_admit = request.data.get('can_admit', None)
         if groupInstance.author == self.request.user:
            #update group access key
            if can_admit != None:
               groupInstance.can_admit = can_admit
            if access_key != None:
               access_key = access_key.strip()
               if access_key:
                  access_key = signer.sign(access_key)
               groupInstance.access_key = access_key
            groupInstance.save()
      else:
         return Response({'error': 'invalid group id'}, status=status.HTTP_400_BAD_REQUEST)
      data = self.serializer_class(groupInstance).data
      return Response(data,  status=status.HTTP_200_OK)

   def get(self, request, *args, **kwargs):
      group = kwargs.get('group_id', 0)
      groups = SiteGroup.objects.filter(id=group)
      if groups.exists():
         groupInstance = groups[0]
      data = {}
      if groupInstance:
         data = self.serializer_class(groupInstance).data
         data.update({'is_author': False, 'is_member': False, 'requires_access_key': False})
         if groupInstance.author == self.request.user:
            data['is_author'] = True
         if groupInstance.access_key:
            data['requires_access_key'] = True
         if (request.auth != None) and groups.filter(users=self.request.user).exists():
            data['is_member'] = True
      return Response(data,  status=status.HTTP_200_OK)

class GroupAdmission(APIView):
   serializer_class = SiteGroupSerializer
   queryset = SiteGroup.objects.all()
   def post(self, request, *args, **kwargs):
      group = kwargs.get('group_id', 0)
      groups = SiteGroup.objects.filter(id=group)
      if groups.exists():
         signer = Signer()
         groupInstance = groups[0]
         key = request.data.get('access_key', '').strip()
         if groupInstance.author != self.request.user:
            #add user to group
            if groups.filter(users=self.request.user).exists():
               return Response({'error': 'user already exists'}, status=status.HTTP_400_BAD_REQUEST)
            if not groupInstance.can_admit:
               return Response({'error': 'Group is inaccessible'}, status=status.HTTP_400_BAD_REQUEST)
            if GroupsUser.objects.filter(group=groupInstance).count() >= groupInstance.max_users:
               return Response({'error': 'Group is inaccessible'}, status=status.HTTP_400_BAD_REQUEST)
            if groupInstance.access_key and (signer.unsign(groupInstance.access_key) != key):
               return Response({'error': 'invalid access key'}, status=status.HTTP_400_BAD_REQUEST)
            groupInstance.users.add(request.user)
         groupInstance.save()
      else:
         return Response({'error': 'invalid group id'}, status=status.HTTP_400_BAD_REQUEST)
      data = self.serializer_class(groupInstance).data
      return Response(data,  status=status.HTTP_200_OK)

class AnswerFileUpload(ValidateAccess, generics.CreateAPIView):
   parser_classes = (MultiPartParser, FormParser)
   permission_classes = (IsAuthenticated,)
   queryset = AnswerUpload.objects.all()
   serializer_class = AnswerUploadSerializer
   def post(self, request, *args, **kwargs):
      logger.error(request.data)
      access = self.validate_access(request, *args, **kwargs)
      if not access['valid']:
         return access['response']
      return self.create(request, *args, **kwargs)

class PenddingTest(IsResultTestAuthor, APIView):
   permission_classes = (IsAuthenticated,)
   queryset = Result.objects.all()
   def post(self, request, *args, **kwargs):
      results = self.get_queryset().filter(id=self.request.data.get('resultId', 0))
      if not results.exists():
         return Response({'error': "Result not found"}, status=status.HTTP_404_NOT_FOUND)
      result = results[0]
      #get array of questions with answer (file or fill) assign to question
      questions = Question.objects.filter(
         Q(answer_type="FILL") | Q(answer_type="FILE"),
         test_data=result.test_data
      ).values()
      for  index, question in enumerate(questions):
         answer_data = ''
         if question['answer_type'] == 'FILL':
            answer = AnswerFill.objects.filter(question__id=question['id'], result=result)
            if answer.exists():
               answer_data = answer.values()[0]
         if question['answer_type'] == 'FILE':
            answer = AnswerUpload.objects.filter(question__id=question['id'], result=result)
            if answer.exists():
               answer_data = AnswerUploadSerializer(answer[0]).data
         if answer_data:
            questions[index].update({
               'answer': answer_data,
               'total_points': result.test_data.points_per_mark,
               'score': 0,
            })
      return Response(questions, status=status.HTTP_200_OK)

class MarkTest(APIView):
   permission_classes = (IsAuthenticated,)
   queryset = Question.objects.all().order_by("group")
   def post(self, request, *args, **kwargs):
      results = Result.objects.filter(
         id=request.data.get('resultId', 0),
         test_data__author=self.request.user
      )
      if not results.exists():
         return Response({'error': "Result not found"}, status=status.HTTP_404_NOT_FOUND)
      result = results[0]
      test_data = result.test_data
      question_queryset = self.queryset.filter(valid_question=True, test_data=test_data)
      result.result_status = RESULT_STATUS[1][0] #result available
      for question_id in request.data['answers'].keys():
         questions = question_queryset.filter(id=int(question_id))
         if questions.exists():
            question = questions[0]
            question_score = request.data['answers'].get(question_id, 0)
            if question_score and (question_score <= test_data.points_per_mark):
               result.score += question_score
               result.correct += 1
            else:
               result.incorrect += 1
            if question.answer_type == 'FILL':
               AnswerFill.objects.filter(question=question, result=result).delete()
            if question.answer_type == 'FILE':
               AnswerUpload.objects.filter(question=question, result=result).delete()
      result.grade = grade(test_data, result)
      if result.correct + result.incorrect < result.total:
         result.result_status = RESULT_STATUS[0][0] #result pending
      result.save()
      data = get_result([result])[0]
      return Response(data, status=status.HTTP_200_OK)

class GroupList(IsTestDataAuthor, generics.ListCreateAPIView):
   permission_classes = (IsAuthenticated,)
   queryset = QuestionGroup.objects.all()
   serializer_class = GroupSerializer

class GroupDetail(IsTestDataAuthor, generics.RetrieveUpdateDestroyAPIView):
   permission_classes = (IsAuthenticated,)
   queryset = QuestionGroup.objects.all()
   serializer_class = GroupSerializer

class ImageList(IsTestDataAuthor, generics.ListCreateAPIView):
   parser_classes = (MultiPartParser, FormParser)
   permission_classes = (IsAuthenticated,)
   queryset = QuestionImage.objects.all()
   serializer_class = ImageSerializer

class ImageDetail(IsTestDataAuthor, generics.DestroyAPIView):
   parser_classes = (MultiPartParser, FormParser)
   permission_classes = (IsAuthenticated,)
   queryset = QuestionImage.objects.all()
   serializer_class = ImageSerializer

class GroupUserList(generics.ListAPIView):
   permission_classes = (IsAuthenticated,)
   queryset = get_user_model().objects.all()
   serializer_class = GroupUserSerializer
   def get_queryset(self):
      if self.kwargs.get('pk', 0) and self.request.user.is_author:
         return self.queryset.filter(
            groupsuser__group__id=self.kwargs['pk'],
            groupsuser__group__author=self.request.user,
         )

class GroupUserDetail(APIView):
   permission_classes = (IsAuthenticated,)
   queryset = get_user_model().objects.all()
   serializer_class = GroupUserSerializer
   
   def delete(self, *args, **kwargs):
      groupsuser = GroupsUser.objects.filter(
         user__id=self.kwargs.get('pk', 0),
         group__id=self.kwargs.get('group_id', 0),
         group__author=self.request.user
      )
      if groupsuser.exists():
         groupsuser.delete()
         return Response(status=status.HTTP_204_NO_CONTENT)
      return Response(status=status.HTTP_404_NOT_FOUND)

class Statistics(APIView):
   def get(self, *args, **kwargs):
      data = {'users': 0,'groups': 0,'tests': 0, 'attempts': 0}
      data['tests'] = TestData.objects.all().count()
      data['groups'] = SiteGroup.objects.all().count()
      data['users'] = get_user_model().objects.all().count()
      return Response(data, status=status.HTTP_200_OK)