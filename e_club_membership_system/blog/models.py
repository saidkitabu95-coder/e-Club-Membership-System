from django.db import models


class Student(models.Model):
    full_name = models.CharField(max_length=100)
    email = models.EmailField(unique=True)
    password = models.CharField(max_length=255)
    year_of_study = models.CharField(max_length=20)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.full_name

class Admin(models.Model):
    full_name = models.CharField(max_length=100)
    email = models.EmailField(unique=True)
    password = models.CharField(max_length=255)

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

class Application(models.Model):
    STATUS_CHOICES = [
        ('Pending', 'Pending'),
        ('Approved', 'Approved'),
        ('Rejected', 'Rejected'),
    ]

    student = models.ForeignKey(Student, on_delete=models.CASCADE)
    club = models.ForeignKey(Club, on_delete=models.CASCADE)
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='Pending')
    applied_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        unique_together = ('student', 'club')

    def __str__(self):
        return f"{self.student.full_name} - {self.club.name}" 

class Event(models.Model):
    club = models.ForeignKey(Club, on_delete=models.CASCADE)
    title = models.CharField(max_length=200)
    description = models.TextField()
    event_date = models.DateField()
    event_time = models.TimeField()
    venue = models.CharField(max_length=200)

    def __str__(self):
        return self.title


class Announcement(models.Model):
    club = models.ForeignKey(Club, on_delete=models.CASCADE)
    title = models.CharField(max_length=200)
    message = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.title