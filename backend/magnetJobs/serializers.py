from rest_framework import serializers
from .models import Users, Post, Comment, Media

class UserDetailSerializer(serializers.ModelSerializer):
    posts = serializers.PrimaryKeyRelatedField(many=True, read_only=True)  # Include post IDs in user details

    class Meta:
        model = Users
        fields = ['id', 'username', 'email', 'avatar_image', 'bio', 'posts']  # Include necessary fields

class UsersSerializer(serializers.ModelSerializer):
    class Meta:
        model = Users
        fields = ['id', 'username', 'email', 'avatar_image', 'following']  # Minimal fields for list views

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

class CommentSerializer(serializers.ModelSerializer):
    user = UserDetailSerializer(read_only=True)  # Nested user information

    class Meta:
        model = Comment
        fields = ['id', 'content', 'user', 'created_at']  # Adjust fields as necessary

class MediaSerializer(serializers.ModelSerializer):
    class Meta:
        model = Media
        fields = ['id', 'url']  # Adjust fields as necessary

class PostSerializer(serializers.ModelSerializer):
    comments = CommentSerializer(many=True, read_only=True)  # Nested comments
    comments_count = serializers.IntegerField(source='comments.count', read_only=True)
    likes_count = serializers.IntegerField(source='likes.count', read_only=True)
    bookmarks_count = serializers.IntegerField(source='bookmarks.count', read_only=True)

    class Meta:
        model = Post
        fields = '__all__'  # Return all fields for detailed view
        read_only_fields = ['created_at', 'comments', 'linked_notifications']  # Make certain fields read-only
