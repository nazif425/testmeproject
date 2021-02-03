"""testmeproject URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/3.0/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path, include
from django.conf import settings
from django.views.generic import TemplateView
from django.conf.urls.static import static
import glob
from pathlib import Path
import os
import logging

logger = logging.getLogger(__name__)


urlpatterns = [
    path('', include('testme.urls')),
    path('testapi/<int:version>/', include('testme.testapi_urls')),
    path('user/', include('appaccount.urls')),
    path('admin/', admin.site.urls),
    path('api-auth/', include('rest_framework.urls')),
    path('rest-auth/', include('rest_auth.urls')),
    path('rest-auth/registration/', include('rest_auth.registration.urls' )),
    path('service-worker.js', TemplateView.as_view(template_name="service-worker.js", content_type='application/javascript'), name="service-worker.js"),
    path('manifest.json', TemplateView.as_view(template_name="manifest.json", content_type='application/json'), name="manifest.json"),
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)


#precache-manifest url
static_path = os.path.join(settings.BASE_DIR, "static")
file_paths = glob.glob(os.path.join(static_path, 'precache-manifest.*.js'))
if len(file_paths):
    precache_manifest = Path(file_paths[0]).name
    urlpatterns += [path(precache_manifest, TemplateView.as_view(template_name=precache_manifest, content_type='application/javascript'), name=precache_manifest)]

#workbox url
file_paths = glob.glob(os.path.join(static_path, 'workbox-v[0-9+].[0-9+].[0-9+]/*'))
for file_path in file_paths:
    workbox  = Path(file_path).parent.name + '/' + Path(file_path).name
    content_type = 'application/javascript'
    if workbox.endswith(".map"):
        content_type = 'application/json'
    urlpatterns += [path(workbox, TemplateView.as_view(template_name=workbox, content_type=content_type), name=workbox)]