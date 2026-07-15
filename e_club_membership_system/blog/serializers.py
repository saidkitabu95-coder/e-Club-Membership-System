from rest_framework import serializers
from .models import (
    Student,
    Club,
    Application,
    Event,
    Announcement
)


class StudentSerializer(serializers.ModelSerializer):

    class Meta:
        model = Student
        fields = "__all__"



class ClubSerializer(serializers.ModelSerializer):

    class Meta:
        model = Club
        fields = "__all__"



class ApplicationSerializer(serializers.ModelSerializer):

    class Meta:
        model = Application
        fields = "__all__"



class EventSerializer(serializers.ModelSerializer):

    class Meta:
        model = Event
        fields = "__all__"



class AnnouncementSerializer(serializers.ModelSerializer):

    class Meta:
        model = Announcement
        fields = "__all__"