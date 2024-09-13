from rest_framework import serializers
from .models import Users, Post

class UsersSerializer(serializers.ModelSerializer):
    class Meta:
        model = Users
        fields = '__all__'
        read_only_fields = ['id']

class PostSerializer(serializers.ModelSerializer):
    class Meta: 
        model= Post
        fields = '__all__'
        ordering=['-created_at']
        read_only_fields = ['id']