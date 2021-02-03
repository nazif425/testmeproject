from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from django.contrib.auth import get_user_model
from .models import MyUser
from .models import Profile
# Register your models here.
#admin.site.unregister(MyUser)
@admin.register(get_user_model())
class CustomUserAdmin(UserAdmin):
   fieldsets = UserAdmin.fieldsets + (
      ("Custom User Fields", { 'fields' : [ 'is_author', 'registered_by']}),
   )
   #pass #fields = ("", "",)

admin.site.register(Profile)