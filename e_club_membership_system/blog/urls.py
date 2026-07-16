from django.urls import path
from . import views

urlpatterns = [
    path('api/register/', views.register, name='register'),
    path('api/login/', views.login, name='login'),
    path("api/admin/login/", views.admin_login, name="admin_login"),
    path('api/clubs/', views.clubs, name='clubs'),
    path('api/apply/', views.apply_club, name='apply_club'),
    path("api/my-applications/", views.my_applications, name="my_applications"),
    path('api/applications/', views.all_applications, name='all_applications'),
    path('api/application/<int:application_id>/approve/', views.approve_application, name='approve_application'),
    path('api/application/<int:application_id>/reject/', views.reject_application, name='reject_application'),
    path('api/events/', views.events, name='events'),
    path('api/announcements/', views.announcements, name='announcements'),
    path('api/dashboard/', views.dashboard, name='dashboard'),
    path("api/students/", views.students, name="students"),
    path("api/statistics/", views.statistics, name="statistics"),
    path("api/admin/clubs/", views.admin_clubs, name="admin_clubs"),
    path("api/admin/clubs/<int:club_id>/delete/", views.delete_club, name="delete_club"),
    path("api/admin/clubs/<int:club_id>/update/", views.update_club, name="update_club"),
    path("api/admin/events/", views.admin_events, name="admin_events"),
    path('', views.home, name='home'),
]