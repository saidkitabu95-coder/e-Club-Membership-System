from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from .models import Announcement, Student, Club, Application, Event
import json
from django.contrib.auth.hashers import make_password, check_password
from .serializers import (
    EventSerializer,
    StudentSerializer,
    ClubSerializer,
    ApplicationSerializer,
    AnnouncementSerializer
)

@csrf_exempt
def register(request):

    if request.method == "POST":

        data = json.loads(request.body)

        full_name = data.get('fullName') or data.get('full_name')
        email = data.get('email')
        password = data.get('password')
        year_of_study = data.get('year') or data.get('year_of_study')


        if Student.objects.filter(email=email).exists():
            return JsonResponse({
                "message": "Email already exists"
            }, status=400)


        student = Student.objects.create(
            full_name=full_name,
            email=email,
            password=make_password(password),
            year_of_study=year_of_study
        )


        serializer = StudentSerializer(student)


        return JsonResponse({
            "message": "Registered successfully",
            "student": serializer.data
        }, status=201)


    return JsonResponse({
        "message": "Method not allowed"
    }, status=405)

             

@csrf_exempt
def login(request):

    if request.method == "POST":

        data = json.loads(request.body)

        email = data.get("email")
        password = data.get("password")

        try:
            user = Student.objects.get(email=email)

            if check_password(password, user.password):
                return JsonResponse({
                    "message": "Login successful",
                    "student": {
                        "id": user.id,
                        "full_name": user.full_name,
                        "email": user.email,
                        "year_of_study": user.year_of_study
                    }
                })

            else:
                return JsonResponse({
                    "message": "Wrong password",
                    "success": False
                }, status=400)

        except Student.DoesNotExist:
            return JsonResponse({
                "message": "User not found",
                "success": False
            }, status=404)

    return JsonResponse({
        "message": "Method not allowed"
    }, status=405)

def home(request):
    return JsonResponse({"message": "Welcome to E-Club Membership System!"})


def clubs(request):

    clubs = Club.objects.all()

    serializer = ClubSerializer(clubs, many=True)

    return JsonResponse(serializer.data, safe=False)

 

@csrf_exempt
def apply_club(request):

    if request.method == "POST":

        data = json.loads(request.body)

        student_id = data.get("student_id")
        club_id = data.get("club_id")

        try:
            student = Student.objects.get(id=student_id)
            club = Club.objects.get(id=club_id)

            if Application.objects.filter(student=student, club=club).exists():
                return JsonResponse({
                    "message": "You already applied for this club."
                }, status=400)

            application = Application.objects.create(
                student=student,
                club=club
            )

            serializer = ApplicationSerializer(application)

            return JsonResponse({
                "message": "Application submitted successfully",
                "application": serializer.data
            }, status=201)

        except Student.DoesNotExist:
            return JsonResponse({"message": "Student not found"}, status=404)

        except Club.DoesNotExist:
            return JsonResponse({"message": "Club not found"}, status=404)

    return JsonResponse({"message": "Method not allowed"}, status=405)

def my_applications(request):

    student_id = request.GET.get("student_id")

    applications = Application.objects.filter(student_id=student_id)

    serializer = ApplicationSerializer(applications, many=True)

    return JsonResponse(serializer.data, safe=False)

def all_applications(request):

    applications = Application.objects.all()

    serializer = ApplicationSerializer(applications, many=True)

    return JsonResponse(serializer.data, safe=False)

@csrf_exempt
def approve_application(request, application_id):

    try:
        application = Application.objects.get(id=application_id)

    except Application.DoesNotExist:

        return JsonResponse({
            "message": "Application not found"
        }, status=404)

    application.status = "Approved"
    application.save()

    serializer = ApplicationSerializer(application)

    return JsonResponse({
        "message": "Application Approved",
        "application": serializer.data
    }) 

@csrf_exempt
def reject_application(request, application_id):

    try:
        application = Application.objects.get(id=application_id)

    except Application.DoesNotExist:

        return JsonResponse({
            "message": "Application not found"
        }, status=404)

    application.status = "Rejected"
    application.save()

    serializer = ApplicationSerializer(application)

    return JsonResponse({
        "message": "Application Rejected",
        "application": serializer.data
    })

def events(request):

    events = Event.objects.all()

    serializer = EventSerializer(events, many=True)

    return JsonResponse(serializer.data, safe=False)

def announcements(request):

    announcements = Announcement.objects.all()

    serializer = AnnouncementSerializer(
        announcements,
        many=True
    )

    return JsonResponse(serializer.data, safe=False)

def dashboard(request):

    data = {
        "students": Student.objects.count(),
        "clubs": Club.objects.count(),
        "applications": Application.objects.count(),
        "events": Event.objects.count(),
        "announcements": Announcement.objects.count(),
    }

    return JsonResponse(data)   

   