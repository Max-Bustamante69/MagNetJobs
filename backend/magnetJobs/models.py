from django.db import models
from django.utils import timezone

# Create your models here.
class Users(models.Model):
    username = models.CharField(max_length=50)
    password = models.CharField(max_length=50)
    email = models.EmailField()
    first_name = models.CharField(max_length=50)
    last_name = models.CharField(max_length=50)
    phone_number = models.CharField(max_length=50)
    skills = models.CharField(max_length=50)
    employed = models.BooleanField()

    def __str__(self):
        return self.username

class Post(models.Model):
    user = models.ForeignKey(Users, on_delete=models.CASCADE, related_name='posts')
    content = models.TextField()
    created_at = models.DateTimeField(default= timezone.now)

    def __str__(self):
        return f'{self.user.username}:{self.content}'

    

   