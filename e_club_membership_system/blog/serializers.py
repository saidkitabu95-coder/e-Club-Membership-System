from rest_framework import serializers
from .models import (
    Student,
    Admin,
    Club,
    Application,
    Event,
    Announcement
)


class StudentSerializer(serializers.ModelSerializer):

    class Meta:
        model = Student
        fields = "__all__"

class AdminSerializer(serializers.ModelSerializer):

    class Meta:
        model = Admin
        fields = "__all__"

class ClubSerializer(serializers.ModelSerializer):

    class Meta:
        model = Club
        fields = "__all__"



class ApplicationSerializer(serializers.ModelSerializer):

    student_name = serializers.CharField(
        source="student.full_name",
        read_only=True
    )

    club_name = serializers.CharField(
        source="club.name",
        read_only=True
    )


    class Meta:
        model = Application

        fields = [
            "id",
            "student",
            "student_name",
            "club",
            "club_name",
            "status",
            "applied_at"
        ]



class EventSerializer(serializers.ModelSerializer):

    class Meta:
        model = Event
        fields = "__all__"



class AnnouncementSerializer(serializers.ModelSerializer):

    class Meta:
        model = Announcement
        fields = "__all__"