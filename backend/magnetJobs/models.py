from django.db import models

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
        return self.title