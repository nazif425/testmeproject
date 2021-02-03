from django.urls import path, include
from .views import MyUserDetailsView

urlpatterns = [
    path('',  MyUserDetailsView.as_view(), name='my_user_details'),
]