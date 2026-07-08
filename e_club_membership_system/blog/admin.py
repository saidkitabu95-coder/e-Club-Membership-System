from django.contrib import admin
from .models import Student, Club


@admin.register(Student)
class StudentAdmin(admin.ModelAdmin):
    list_display = ('full_name', 'email', 'year_of_study')


@admin.register(Club)
class ClubAdmin(admin.ModelAdmin):
    list_display = (
        'name',
        'category',
        'memberCount',
        'fee'
    )