from django.contrib.auth import get_user_model
from rest_framework import serializers
from rest_framework.renderers import JSONRenderer
from appaccount.serializers import MyUserDetailsSerializer, ProfileSerializer
from django.conf import settings
from django.core.signing import Signer
from .models import (
   Question, 
   Answer, 
   QuestionGroup, 
   QuestionImage, 
   TestData, 
   SiteGroup, 
   TestGroup, 
   Result,
   AnswerUpload,
)
import magic
import logging
import os
# Get an instance of a logger
logger = logging.getLogger(__name__)

FILE_TYPE = (
   ("IMAGE", "Image"),
   ("DOC", "Doc"),
   ("PDF", "Pdf")
)

class GroupUserSerializer(serializers.ModelSerializer):
   profile_user = ProfileSerializer()
   class Meta:
      model = get_user_model()
      fields = ('id', 'username', 'email', 'first_name', 'last_name', 'profile_user',)

class SiteGroupSerializer(serializers.ModelSerializer):
   class Meta:
      model = SiteGroup
      fields = '__all__'
      extra_kwargs = {
         'author': {'required': False}, 
         'users': {'read_only': True},
         'tests': {'read_only': True},
         'max_users': {'read_only': True},
         'access_key': {'required': False, 'write_only': True}
      }

class TestGroupSerializer(serializers.ModelSerializer):
   class Meta:
      model = TestGroup
      fields = '__all__'

class TestDataSerializer(serializers.ModelSerializer):
   class Meta:
      model = TestData
      fields = '__all__'
      read_only_fields = [
         'total_questions',
         'valid_questions', 
         'created',
         'total_attempts',
      ]
      extra_kwargs = {
         'password': {'write_only': True},
         'author': {'required': False}
      }

   def validate_password(self, value):
      value = value.strip()
      if value:
         signer = Signer()
         value = signer.sign(value)
      return value
   def create(self, validated_data):
      testInstance = super(TestDataSerializer, self).create(validated_data)
      group = self.initial_data.get('group', 0)
      groups = SiteGroup.objects.filter(id=group)
      if groups.exists():
         groupInstance = groups[0]
         groupInstance.tests.add(testInstance)
      return testInstance
   def update(self, instance, validated_data):
      if not validated_data.get('cover_image'):
         validated_data['cover_image'] = instance.cover_image
      return super(TestDataSerializer, self).update(instance, validated_data)

class AnswerSerializer(serializers.ModelSerializer):
   class Meta:
      model = Answer
      fields = ['label', 'answer']

class GroupSerializer(serializers.ModelSerializer):
   class Meta:
      model = QuestionGroup
      fields = '__all__'

class ResultSerializer(serializers.ModelSerializer):
   class Meta:
      model = Result
      fields = '__all__'

class ImageSerializer(serializers.ModelSerializer):
   class Meta:
      model = QuestionImage
      fields = '__all__'

class AnswerUploadSerializer(serializers.ModelSerializer):
   def validate_file(self, file):
      #validate upload file type
      allowed_file_types = {
         'IMAGE': {
            'content_type': ['image/jpeg','image/pjpeg','application/octet-stream'],
            'extension': ['.jpg', '.jpeg', '.png'],
         },
         'PDF': {
            'content_type': ['application/pdf','application/octet-stream'],
            'extension': ['.pdf'],
         },
         'DOC': {
            'content_type': ['application/msword','application/octet-stream'],
            'extension': ['.doc', '.docx'],
         }
      }
      try:
         question = Question.objects.get(id=self.get_initial()['question'])
      except Question.DoesNotExist:
         raise serializers.ValidationError('Question not found')
      file_type = question.file_type
      if file_type not in allowed_file_types.keys() or question.answer_type != "FILE":
         raise serializers.ValidationError('File type not allowed.')
      file_mime_type = magic.from_buffer(file.read(1024), mime=True)
      if file_mime_type not in allowed_file_types[file_type]['content_type']:
         raise serializers.ValidationError('Unsupported file type.')
      ext = os.path.splitext(file.name)[1]
      if ext.lower() not in allowed_file_types[file_type]['extension']:
         raise serializers.ValidationError('Unacceptable file extension.')
      return file
   class Meta:
      model = AnswerUpload
      fields = '__all__'

class QuestionSerializer(serializers.ModelSerializer):
   options = AnswerSerializer(many=True)
   class Meta:
      model = Question
      fields = [
         'id',
         'question',
         'question_delta',
         'answer',
         'options',
         'group',
         'answer_type',
         'file_type',
         'valid_question',
         'mark_scheme',
         'test_data',
      ]
      read_only_fields = ['valid_question']
      order_by = ''
   
   def validate_question(self, value):
      value = value.strip()
      return value
   def validate_answer(self, value):
      value = value.strip()
      return value
   def validate_mark_scheme(self, value):
      value = value.strip()
      return value
   def validate_options(self, options):
      for index, option in enumerate(options):
         options[index].update({'answer': options[index].get('answer', '').strip()})
      return options

   def validate(self, data):
      data['valid_question'] = True
      if data['answer_type'] == 'FILL' and not len(data['mark_scheme']):
         data['valid_question'] = False
      elif data['answer_type'] == 'OPTION' and  not len(data['answer']):
         data['valid_question'] = False
      elif data['answer_type'] == 'OPTION':	
         for option in data['options']:
            if not len(option.get('answer', '')):
               data['valid_question'] = False
      return data

   def addInstance(self, option, instance):
      option.update({'answer_question': instance})
      return option

   def create(self, validated_data):
      options = validated_data.pop("options", "")
      instance = super(QuestionSerializer, self).create(validated_data)
      options = [self.addInstance(option, instance) for option in options ]
      answers = [Answer(**option) for option in options]
      Answer.objects.bulk_create(answers)
      #update test data
      questions = Question.objects.filter(test_data=validated_data["test_data"])
      TestData.objects.filter(id=validated_data["test_data"].id).update(
         total_questions=questions.count(),
         duration= 45 * questions.filter(valid_question=True).count()
      )
      return instance

   def update(self, instance, validated_data):
      instance.options.all().delete()
      options = validated_data.pop("options", "")
      options = [self.addInstance(option, instance) for option in options ]
      answers = [Answer(**option) for option in options]
      Answer.objects.bulk_create(answers)
      instance.valid_question = validated_data['valid_question']
      instance.save()
      #update total valid question in test data
      total_valid = Question.objects.filter(test_data=validated_data["test_data"], valid_question=True).count()
      TestData.objects.filter(id=validated_data["test_data"].id).update(valid_questions=total_valid)
      return super(QuestionSerializer, self).update(instance, validated_data)

class PublicTestDataSerializer(TestDataSerializer):
   class Meta(TestDataSerializer.Meta):
      fields = [
         'id',
         'name',
         'author',
         'status',
         'duration',
         'total_questions',
         'valid_questions',
         'description',
         'cover_image',
         'testgroup_set',
         'randomize_questions',
         'question_per_page',
         'start_date',
         'end_date',
      ]

class TestGroupSerializer(GroupSerializer):
   image = ImageSerializer()

class TestQuestionSerializer(QuestionSerializer):
   group = TestGroupSerializer()
   class Meta(QuestionSerializer.Meta):
      fields = [
         'id',
         'question',
         'question_delta',
         'options',
         'group',
         'answer_type',
         'file_type',
         'valid_question',
         'test_data',
      ]