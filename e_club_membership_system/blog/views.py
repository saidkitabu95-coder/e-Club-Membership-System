from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from .models import Student, Club, Application
from .serializers import StudentSerializer, ClubSerializer, ApplicationSerializer
import json
from django.contrib.auth.hashers import make_password, check_password
from rest_framework_simplejwt.tokens import RefreshToken

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

    data = []

    for club in clubs:
        data.append({
            "id": club.id,
            "name": club.name,
            "description": club.description,
            "full_description": club.full_description,
            "category": club.category,
            "logo": club.logo,
            "requirements": club.requirements,
            "founded": club.founded,
            "president": club.president,
            "memberCount": club.memberCount,
            "fee": club.fee,
            "objectives": club.objectives
        })

    return JsonResponse(data, safe=False)

   