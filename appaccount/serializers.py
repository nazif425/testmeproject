from django.contrib.auth import get_user_model
from django.core.signing import Signer
from rest_auth.registration.serializers import RegisterSerializer
from rest_framework import serializers

from .models import Profile
from datetime import date
from testme.models import SiteGroup, GroupsUser
import logging
# Get an instance of a logger
logger = logging.getLogger(__name__)

GENDER = (
    ("M","male"),
    ("F","female")
)

class MyRegisterSerializer(RegisterSerializer):
    date_of_birth = serializers.DateField(allow_null=True)
    gender = serializers.ChoiceField(allow_null=True, allow_blank=True, choices=GENDER)
    phone_number = serializers.CharField(allow_null=True, allow_blank=True, max_length=11)
    last_name = serializers.CharField(allow_null=True, allow_blank=True, max_length=30)
    first_name = serializers.CharField(allow_null=True, allow_blank=True, max_length=30)

    def validate_group_signup(self, request):
        group = request.data.get('group', 0)
        logger.error(group)
        if group:
            groups = SiteGroup.objects.filter(id=group)
            if groups.exists():
                groupInstance = groups[0]
                if not groupInstance.can_admit:
                    raise serializers.ValidationError({'group': ['Group is inaccessible']})
                if GroupsUser.objects.filter(group=groupInstance).count() >= groupInstance.max_users:
                    raise serializers.ValidationError({'group': ['Group is inaccessible']})
                if (request.auth == None) or groupInstance.author != request.user:
                    key = request.data.get('access_key', '')
                    signer = Signer()
                    if groupInstance.access_key and (signer.unsign(groupInstance.access_key) != key.strip()):
                        raise serializers.ValidationError({'access_key': ['invalid access key']})
            else:
                raise serializers.ValidationError({'group': ['invalid group id']})

    def save(self, request):
        self.validate_group_signup(request)
        return super(MyRegisterSerializer, self).save(request)

    def custom_signup(self, request, user):
        logger.error("in")
        user.last_name = self.validated_data.get('last_name', "")
        user.first_name = self.validated_data.get('first_name', "")
        user.save()
        gender = self.validated_data.get("gender", "")
        date_of_birth = self.validated_data.get("date_of_birth", "")
        phone_number = self.validated_data.get("phone_number", "")
        newprofile = Profile(user=user, gender=gender, date_of_birth=date_of_birth,
            phone_number=phone_number)
        newprofile.save()
        #add user to group
        group = request.data.get('group', 0)
        if group:
            groups = SiteGroup.objects.filter(id=group)
            if groups.exists():
                groupInstance = groups[0]
                groupInstance.users.add(user)     

class ProfileSerializer(serializers.ModelSerializer):

    class Meta:
        model = Profile
        fields = ("user", "date_of_birth", "gender", "phone_number", "profile_pic")

class MyUserDetailsSerializer(serializers.ModelSerializer):
    profile_pic = serializers.ImageField(max_length=None, allow_empty_file=True, use_url=True, required=False)
    date_of_birth = serializers.DateField(allow_null=True)
    gender = serializers.ChoiceField(choices=GENDER, allow_blank=True, allow_null=True)
    phone_number = serializers.CharField(allow_null=True, max_length=11, allow_blank=True)
    last_name = serializers.CharField(allow_null=True, allow_blank=True, max_length=30)
    first_name = serializers.CharField(allow_null=True, allow_blank=True, max_length=30)

    class Meta:
        model = get_user_model()
        fields = ('id', 'username', 'email', 'first_name', 'last_name', 'is_author', 'date_of_birth', 'gender', 'phone_number', 'profile_pic')
        read_only_fields = ('email', 'is_author', 'username', 'password')

    def update(self, instance, validated_data):
        profile_data = {}
        profile_data['gender'] = validated_data.pop("gender", "")
        profile_data['date_of_birth'] = validated_data.pop("date_of_birth", "")
        profile_data['phone_number'] = validated_data.pop("phone_number", "")
        photo = validated_data.pop("profile_pic", "")
        if photo != "":
            profile_data['profile_pic'] = photo
        user = super(MyUserDetailsSerializer, self).update(instance, validated_data)
        serializer = ProfileSerializer(user.profile_user, data=profile_data, partial=True) 
        if serializer.is_valid(raise_exception=True):
            serializer.save()
        return user
