from django.db import models
from django.utils import timezone

# Helper function to define the user-specific upload path
def user_directory_path(instance, filename, avatar=False):
    if avatar:
        return f'user_{instance.id}/avatar/avatar.{filename.split(".")[-1]}'
    return f'user_{instance.user.id}/posts/{filename}'

class Users(models.Model):
    id = models.CharField(max_length=50, primary_key=True, unique=True)
    first_name = models.CharField(max_length=50, null=True, blank=True)
    last_name = models.CharField(max_length=50, null=True, blank=True)
    username = models.CharField(max_length=50, unique=True, db_index=True, default='unkwown')  # Index added
    display_name = models.CharField(max_length=50, null=True, blank=True)
    email = models.EmailField(unique=True, null=True, blank=True, db_index=True)  # Index added
    password_hash = models.CharField(max_length=255, null=True, blank=True)
    google_id = models.CharField(max_length=100, unique=True, null=True, blank=True, db_index=True)  # Index added
    bio = models.TextField(null=True, blank=True)
    employed = models.BooleanField(default=False)
    
    avatar_image = models.ImageField(upload_to=user_directory_path, null=True, blank=True)

    following = models.ManyToManyField('self', symmetrical=False, related_name='followers', blank=True)
    sessions = models.ManyToManyField('Session', related_name='user_sessions', blank=True)
    received_notifications = models.ManyToManyField('Notification', related_name='notifications_received', blank=True)
    issued_notifications = models.ManyToManyField('Notification', related_name='notifications_issued', blank=True)

    def __str__(self):
        return self.username

class Session(models.Model):
    id = models.CharField(max_length=50, primary_key=True, unique=True)
    user = models.ForeignKey(Users, on_delete=models.CASCADE)  # Foreign key relationship to Users
    expires_at = models.DateTimeField(default=timezone.now)  # Default value set to current time


    @property
    def user_id(self):
        return self.user.id  # Automatically return the user ID from the foreign key

    def __str__(self):
        return self.id

class Post(models.Model):
    content = models.TextField()
    user = models.ForeignKey(Users, on_delete=models.CASCADE, related_name='posts')
    image = models.ImageField(upload_to=user_directory_path, null=True, blank=True)
    
    attachments = models.ManyToManyField('Media', related_name='attached_posts', blank=True)
    likes = models.ManyToManyField(Users, through='Like', related_name='liked_posts', blank=True)
    bookmarks = models.ManyToManyField(Users, through='Bookmark', related_name='bookmarked_posts', blank=True)
    comments = models.ManyToManyField('Comment', related_name='commented_posts', blank=True)
    linked_notifications = models.ManyToManyField('Notification', related_name='linked_posts', blank=True)
    
    created_at = models.DateTimeField(default=timezone.now, db_index=True)  # Index added

    def __str__(self):
        return f'{self.user.username}: {self.content}'

class Media(models.Model):
    file = models.FileField(upload_to='posts/attachments')
    post = models.ForeignKey(Post, related_name='media_attachments', on_delete=models.CASCADE)
    uploaded_at = models.DateTimeField(auto_now_add=True)

class Like(models.Model):
    user = models.ForeignKey(Users, on_delete=models.CASCADE)
    post = models.ForeignKey(Post, on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True)

class Bookmark(models.Model):
    user = models.ForeignKey(Users, on_delete=models.CASCADE)
    post = models.ForeignKey(Post, on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True)

class Comment(models.Model):
    user = models.ForeignKey(Users, on_delete=models.CASCADE)
    post = models.ForeignKey(Post, on_delete=models.CASCADE, related_name='post_comments')
    content = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)

class Notification(models.Model):
    recipient = models.ForeignKey(Users, on_delete=models.CASCADE, related_name='notifications_sent')
    issuer = models.ForeignKey(Users, on_delete=models.CASCADE, related_name='notifications_issued')
    post = models.ForeignKey(Post, on_delete=models.CASCADE, related_name='notifications_linked', null=True, blank=True)
    content = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)
