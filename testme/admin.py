from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from .models import Question, Answer, TestData, QuestionImage, QuestionGroup, SiteGroup, GroupsUser, TestGroup, Result

# Register your models here.
admin.site.register(Question)
admin.site.register(Answer)
admin.site.register(TestData)
admin.site.register(QuestionImage)
admin.site.register(QuestionGroup)
admin.site.register(TestGroup)
admin.site.register(GroupsUser)
admin.site.register(SiteGroup)
admin.site.register(Result)