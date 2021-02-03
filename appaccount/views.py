from django.shortcuts import render
from rest_framework.parsers import MultiPartParser, FormParser 
from rest_auth.views import UserDetailsView
from django.contrib.auth import get_user_model
from rest_framework.generics import RetrieveUpdateAPIView
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.response import Response
from .models import Profile
from .serializers import MyUserDetailsSerializer, ProfileSerializer
import logging
# Get an instance of a logger
logger = logging.getLogger(__name__)
# Create your views here.

class MyUserDetailsView(RetrieveUpdateAPIView):
   parser_classes = (MultiPartParser, FormParser)
   serializer_class = MyUserDetailsSerializer
   permission_classes = (IsAuthenticated,)
   def get_object(self):
      return self.request.user
   def retrieve(self, request):
      user = get_user_model().objects.get(id=request.user.id)
      data = self.get_serializer(user).data
      profileObj = request.user.profile_user
      #Profile.objects.get(user=user)
      data.update(ProfileSerializer(profileObj).data)
      return Response(data)
   
      