from django.contrib import admin
from .models import (
    Student,
    Club,
    Application,
    Event,
    Announcement
)


admin.site.register(Student)
admin.site.register(Club)
admin.site.register(Application)
admin.site.register(Event)
admin.site.register(Announcement)