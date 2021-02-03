from django.db.models import Q
from rest_framework import permissions
from .models import SiteGroup, GroupsUser, TestGroup

import logging

# Create your views here.
logger = logging.getLogger(__name__)

class IsTestDataAuthor(object):
   def get_queryset(self):
      if self.request.user.is_author:
         return self.queryset.filter(test_data__author=self.request.user, test_data__id=self.kwargs['testid'])
      return self.queryset.none()

class IsResultTestAuthor(object):
   def get_queryset(self):
      if self.request.user.is_author:
         return self.queryset.filter(test_data__author=self.request.user)
      return self.queryset.none()

class IsAuthor(object):
   def get_queryset(self):
      if self.request.user.is_author:
         return self.queryset.filter(author=self.request.user)
      return self.queryset.none()

class IsMyTest(object):
   def get_queryset(self):
      if self.kwargs.get('id', ''):
         site_group = SiteGroup.objects.filter(
            Q(users=self.request.user) | Q(author=self.request.user),
            id=self.kwargs['id']
         ).values_list('id', flat=True)
      elif self.request.user.is_author:
         site_group = SiteGroup.objects.filter(
            author=self.request.user
         ).values_list('id', flat=True)
      else:
         site_group = SiteGroup.objects.filter(
            Q(users=self.request.user) | Q(access="General")
         ).values_list('id', flat=True)
      if site_group.exists():    
         test_data = self.queryset.filter(sitegroup__id__in=site_group, status="available")
         if test_data.exists():
            return test_data
      return self.queryset.none()
   def get_object(self):
      return self.get_queryset().filter(id=self.kwargs['pk'])[0]