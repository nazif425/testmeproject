from django.db import models
from django.conf import settings
from django.contrib.auth import get_user_model
from django.utils import timezone
from .validators import answer_upload_validator

# Create your models here.
TEST_STATUS = (
   ("available", "Available"),
   ("unavailable", "Unavailable")
)

ANSWER_TYPE = (
   ("OPTION", "option"),
   ("FILL", "fill"),
   ("FILE", "file")
)

FILE_TYPE = (
   ("IMAGE", "Image"),
   ("DOC", "Doc"),
   ("PDF", "Pdf")
)

RESULT_STATUS = (
   ("Pending", "pending"),
   ("Completed", "completed")
)

GROUP_ACCESS = (
   ("General", "General Access"),
   ("Members", "Members Only")
)

class SiteGroup(models.Model):
   name = models.CharField(max_length=30)
   author = models.ForeignKey(settings.AUTH_USER_MODEL, related_name="sitegroups", on_delete=models.CASCADE)
   users = models.ManyToManyField(settings.AUTH_USER_MODEL, through='GroupsUser')
   tests = models.ManyToManyField("TestData", through='TestGroup')
   access = models.CharField(max_length=7, choices=GROUP_ACCESS, default=GROUP_ACCESS[1][0])
   access_key = models.CharField(max_length=255, blank=True)
   can_admit = models.BooleanField(default=True)
   max_users = models.IntegerField(default=100)

   def __str__(self):
      return '%s by %s' % (self.name, self.author.get_full_name())

class GroupsUser(models.Model):
   group = models.ForeignKey(SiteGroup, on_delete=models.CASCADE)
   user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
   
   def __str__(self):
        return '%s in %s' % (self.user.get_full_name(), self.group.name)

class TestGroup(models.Model):
   group = models.ForeignKey(SiteGroup, on_delete=models.CASCADE)
   test = models.ForeignKey("TestData", on_delete=models.CASCADE)

   def __str__(self):
      return '%s in %s' % (self.test.name, self.group.name)

class TestData(models.Model):
   name = models.CharField(max_length=255)
   author = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
   status = models.CharField(default=TEST_STATUS[0][0], choices=TEST_STATUS, max_length=11)
   points_per_mark = models.IntegerField(default=1)
   question_per_page = models.IntegerField(default=1)
   duration = models.IntegerField(default=0)
   start_date = models.DateTimeField(null=True, blank=True)
   end_date = models.DateTimeField(null=True, blank=True)
   total_questions = models.IntegerField(default=0)
   valid_questions = models.IntegerField(default=0)
   allowed_attempts = models.IntegerField(default=1)
   password = models.CharField(max_length=255, blank=True)
   randomize_questions = models.BooleanField(default=True)
   total_attempts = models.IntegerField(default=0)
   description = models.TextField(blank=True)
   view_result = models.BooleanField(default=True)
   cover_image = models.ImageField(null=True, blank=True, upload_to="image/test_cover/%Y/%m/%d/")
   created = models.DateTimeField(auto_now_add=True)

   def __str__(self):
      return '%s (%d) by %s' % (self.name, self.id, self.author.get_full_name())


class QuestionImage(models.Model):
   name = models.CharField(max_length=100)
   image = models.ImageField(upload_to="image/question_images/%Y/%m/%d/")
   test_data = models.ForeignKey(TestData, on_delete=models.CASCADE)
   timestamp = models.DateTimeField(auto_now_add=True)

class QuestionGroup(models.Model):
   name = models.CharField(max_length=100, blank=True)
   test_data = models.ForeignKey(TestData, on_delete=models.CASCADE)
   image = models.ForeignKey(QuestionImage, null=True, on_delete=models.SET_NULL)
   header_note = models.TextField(blank=True)

class Answer(models.Model):
   answer = models.TextField(blank=True)
   label = models.CharField(max_length=1)
   answer_question = models.ForeignKey("Question", default=1, related_name="options", on_delete=models.CASCADE)

   def __str__(self):
      return str(self.answer_question.id) + self.label

class Question(models.Model):
   question = models.TextField(blank=True)
   question_delta = models.TextField(blank=True)
   answer = models.CharField(blank=True, max_length=1)
   test_data = models.ForeignKey(TestData, on_delete=models.CASCADE)
   group = models.ForeignKey(QuestionGroup, null=True, on_delete=models.SET_NULL)
   mark_scheme = models.TextField(blank=True)
   answer_type = models.CharField(default=ANSWER_TYPE[0][0], choices=ANSWER_TYPE, max_length=6)
   file_type = models.CharField(default=FILE_TYPE[0][0], choices=FILE_TYPE, max_length=6)
   valid_question = models.BooleanField(default=False)

   def __str__(self):
        return '%s (%d)' % ('question', self.id)

class Result(models.Model):
   user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
   test_data = models.ForeignKey(TestData, on_delete=models.CASCADE)
   result_status = models.CharField(choices=RESULT_STATUS, max_length=9, default=RESULT_STATUS[0][0])
   correct = models.IntegerField(default=0)
   incorrect = models.IntegerField(default=0)
   score = models.IntegerField(default=0)
   total = models.IntegerField(default=0)
   grade = models.CharField(max_length=1, blank=True)
   time_elapsed = models.IntegerField(default=0)
   started = models.DateTimeField(auto_now_add=True)
   submitted = models.DateTimeField(null=True, blank=True)

class AnswerFill(models.Model):
   question = models.ForeignKey(Question, on_delete=models.CASCADE)
   answer = models.TextField(blank=True)
   result = models.ForeignKey(Result, on_delete=models.CASCADE)
   user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
   test_data = models.ForeignKey(TestData, on_delete=models.CASCADE)

class AnswerUpload(models.Model):
   name = models.CharField(max_length=100)
   file = models.FileField(upload_to="answer_files/%Y/%m/%d/")
   question = models.ForeignKey(Question, on_delete=models.CASCADE)
   test_data = models.ForeignKey(TestData, on_delete=models.CASCADE)
   result = models.ForeignKey(Result, on_delete=models.CASCADE)
   timestamp = models.DateTimeField(auto_now_add=True)
