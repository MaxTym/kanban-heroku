from django.contrib import admin
from django.conf.urls import url, include
from rest_framework import routers
from tasks import views
from django.contrib.auth import views as auth_views
from django.views.generic import TemplateView


router = routers.DefaultRouter()
router.register(r'api/tasks', views.TasksViewSet)


urlpatterns = [
    url(r'^', include(router.urls)),
    url(r'^admin/', admin.site.urls),
    url(r'^api-auth/', include('rest_framework.urls', namespace='rest_framework')),
    url(r'^login/$', auth_views.login, name='login'),
    url(r'^logout/$', auth_views.logout, {'next_page': 'login'},
        name='logout'),
    url(r'^register/$', views.register, name='register'),
    url(r'^index/$', TemplateView.as_view(template_name='index.html'), name= 'index')
]
