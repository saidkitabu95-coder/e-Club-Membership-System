from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from .models import (
    Announcement,
    Student,
    Club,
    Application,
    Event,
    Admin
)
import json
from django.contrib.auth.hashers import make_password, check_password
from .serializers import (
    EventSerializer,
    StudentSerializer,
    AdminSerializer,
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

        application = Application.objects.get(
            id=application_id
        )

    except Application.DoesNotExist:

        return JsonResponse({
            "message": "Application not found"
        }, status=404)



    application.status = "Approved"
    application.save()



    club = application.club

    club.memberCount += 1

    club.save()



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

    clubs = Club.objects.all()

    total_members = sum(club.memberCount for club in clubs)

    data = {
        "students": Student.objects.count(),
        "clubs": Club.objects.count(),
        "applications": Application.objects.count(),
        "events": Event.objects.count(),
        "announcements": Announcement.objects.count(),
        "members": total_members,
    }

    return JsonResponse(data)

@csrf_exempt
def admin_login(request):

    if request.method == "POST":

        data = json.loads(request.body)

        print("REQUEST DATA:", data)

        email = data.get("email")
        password = data.get("password")

        print("EMAIL:", email)

        try:
            admin = Admin.objects.get(email=email)

            print("ADMIN FOUND:", admin.email)

            if check_password(password, admin.password):

                return JsonResponse({
                    "message": "Admin login successful",
                    "admin": {
                        "id": admin.id,
                        "full_name": admin.full_name,
                        "email": admin.email
                    }
                })

            return JsonResponse({
                "message": "Wrong password"
            }, status=400)

        except Admin.DoesNotExist:

            print("ADMIN DOES NOT EXIST")

            return JsonResponse({
                "message": "Admin not found"
            }, status=404)

    return JsonResponse({
        "message": "Method not allowed"
    }, status=405)

def students(request):

    students = Student.objects.all()

    serializer = StudentSerializer(students, many=True)

    return JsonResponse(serializer.data, safe=False)

def statistics(request):
    data = {
        "members": Student.objects.count(),
        "applications": Application.objects.count(),
        "events": Event.objects.count(),
        "clubs": Club.objects.count(),
    }

    return JsonResponse(data)

@csrf_exempt
def admin_clubs(request):

    if request.method == "GET":

        clubs = Club.objects.all()
        serializer = ClubSerializer(clubs, many=True)

        return JsonResponse(serializer.data, safe=False)

    elif request.method == "POST":

        data = json.loads(request.body)

        club = Club.objects.create(
            name=data["name"],
            description=data["description"],
            full_description=data["full_description"],
            category=data["category"],
            logo=data["logo"],
            requirements=data["requirements"],
            founded=data["founded"],
            president=data["president"],
            fee=data["fee"],
            objectives=data["objectives"]
        )

        serializer = ClubSerializer(club)

        return JsonResponse(serializer.data, status=201)

@csrf_exempt
def delete_club(request, club_id):

    try:
        club = Club.objects.get(id=club_id)

    except Club.DoesNotExist:

        return JsonResponse(
            {"message": "Club not found"},
            status=404
        )

    club.delete()

    return JsonResponse({
        "message": "Club deleted successfully"
    })

@csrf_exempt
def update_club(request, club_id):

    try:
        club = Club.objects.get(id=club_id)

    except Club.DoesNotExist:
        return JsonResponse({
            "message": "Club not found"
        }, status=404)


    if request.method == "PUT":

        data = json.loads(request.body)

        club.name = data.get("name", club.name)
        club.category = data.get("category", club.category)
        club.description = data.get("description", club.description)
        club.full_description = data.get(
            "full_description",
            club.full_description
        )
        club.president = data.get(
            "president",
            club.president
        )
        club.fee = data.get(
            "fee",
            club.fee
        )
        club.founded = data.get(
            "founded",
            club.founded
        )
        club.logo = data.get(
            "logo",
            club.logo
        )

        club.save()


        serializer = ClubSerializer(club)


        return JsonResponse(
            serializer.data
        )


    return JsonResponse({
        "message":"Method not allowed"
    }, status=405) 

@csrf_exempt
def admin_events(request):

    if request.method == "GET":

        events = Event.objects.all()

        serializer = EventSerializer(
            events,
            many=True
        )

        return JsonResponse(
            serializer.data,
            safe=False
        )


    if request.method == "POST":

        data = json.loads(request.body)

        event = Event.objects.create(

            title=data.get("title"),

            description=data.get("description"),

            date=data.get("date"),

            time=data.get("time"),

            location=data.get("location")

        )


        serializer = EventSerializer(event)


        return JsonResponse(
            serializer.data,
            status=201
        )       