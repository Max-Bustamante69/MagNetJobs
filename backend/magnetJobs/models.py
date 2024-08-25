# Create your models here.
from django.db import models


# Create your models here.
class User(models.Model):
    username = models.CharField(max_length=50)
    password = models.CharField(max_length=50)
    email = models.CharField(max_length=50)
    first_name = models.CharField(max_length=50)
    last_name = models.CharField(max_length=50)
    phone_number = models.CharField(max_length=50)
    #list of skills
    skills = models.CharField(max_length=50)
    employed = models.BooleanField(default=False)
    
    
    
    def __str__(self):
        return self.username