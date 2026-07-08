from django.db import models


class Student(models.Model):
    full_name = models.CharField(max_length=100)
    email = models.EmailField(unique=True)
    password = models.CharField(max_length=255)
    year_of_study = models.CharField(max_length=20)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.full_name


class Club(models.Model):
    name = models.CharField(max_length=100)
    description = models.TextField()
    full_description = models.TextField(default="")
    category = models.CharField(max_length=50)
    logo = models.CharField(max_length=10)

    requirements = models.TextField(default="")
    founded = models.CharField(max_length=50, default="")
    president = models.CharField(max_length=100, default="")

    memberCount = models.IntegerField(default=0)
    fee = models.CharField(max_length=50, default="Free")

    objectives = models.JSONField(default=list)

    def __str__(self):
        return self.name