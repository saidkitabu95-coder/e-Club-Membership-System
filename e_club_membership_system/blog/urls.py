from django.urls import path
from . import views

urlpatterns = [
    path('api/register/', views.register, name='register'),
    path('api/login/', views.login, name='login'),
    path('api/clubs/', views.clubs, name='clubs'),
    path('', views.home, name='home'),
]