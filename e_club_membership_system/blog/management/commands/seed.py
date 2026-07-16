from django.core.management.base import BaseCommand
from blog.models import Club, Event, Announcement


class Command(BaseCommand):
    help = "Seed database with initial data"

    def handle(self, *args, **kwargs):
        Club.objects.all().delete()

        self.stdout.write("Old clubs deleted.")