from django.db import models
from django.conf import settings
from django.contrib.auth import get_user_model
from django.contrib.auth.models import AbstractUser
# Create your models here.

GENDER = (
    ("M","male"),
    ("F","female")
)

class MyUser(AbstractUser):
    is_author = models.BooleanField(default=False)
    registered_by = models.ForeignKey('self', null=True, blank=True, on_delete=models.CASCADE)

    def __str__(self):
        return '%s (%d)' % (self.username, self.id)
class Profile(models.Model):
    profile_pic = models.ImageField(upload_to="image/profile_pics/", null=True, blank=True)
    user = models.OneToOneField(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name="profile_user")
    date_of_birth = models.DateField(null=True)
    gender = models.CharField(choices=GENDER, max_length=1, blank=True, null=True)
    phone_number = models.CharField(max_length=11, blank=True, null=True)