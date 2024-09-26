from rest_framework import serializers
from .models import Users, Post

class PostSerializer(serializers.ModelSerializer):
    class Meta:
        model = Post
        fields = '__all__'
        read_only_fields = ['created_at']
        

class UsersSerializer(serializers.ModelSerializer):
    posts = PostSerializer(many=True, read_only=True)  # Nested serializer to include posts

    class Meta:
        model = Users
        fields = '__all__'



    def validate_username(self, value):
        """Validate that the username is unique."""
        if Users.objects.filter(username=value).exists():
            raise serializers.ValidationError("Username already exists.")
        return value

    def validate_email(self, value):
        """Validate that the email is unique."""
        if Users.objects.filter(email=value).exists():
            raise serializers.ValidationError("Email already exists.")
        return value
