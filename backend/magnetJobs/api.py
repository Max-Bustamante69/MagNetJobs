from rest_framework import viewsets, permissions, status
from .models import Users, Post, Friendship, Notification
from .serializers import UsersSerializer, PostSerializer, UserDetailSerializer, FriendshipSerializer, NotificationSerializer
from rest_framework.response import Response
from rest_framework.decorators import action
from rest_framework.pagination import PageNumberPagination
from django.db.models import Count
from django.shortcuts import get_object_or_404
from django.db import transaction



class UserViewSet(viewsets.ModelViewSet):
    queryset = Users.objects.all().prefetch_related(
        'following',  
        'sessions',  
        'received_notifications',  
        'issued_notifications',  
        'posts',
    )
    permission_classes = [permissions.AllowAny]

    def get_serializer_class(self):
        if self.action == 'retrieve':
            return UserDetailSerializer  
        return UsersSerializer  

    @action(detail=True, methods=['post'])
    def follow(self, request, pk=None):
        user = self.get_object()
        target_user = Users.objects.get(pk=request.data['target_user'])
        user.following.add(target_user)
        return Response({'status': f'You are now following {target_user.username}'}, status=status.HTTP_200_OK)

    @action(detail=True, methods=['get'])
    def following(self, request, pk=None):
        user = self.get_object()
        following_users = user.following.all()
        serializer = UsersSerializer(following_users, many=True)
        return Response(serializer.data)
    
    # ALLOW SEARCHING FOR USERS BY USERNAME
    def get_queryset(self):
        # Filter by 'search' query parameter if provided
        search_param = self.request.query_params.get('search', None)
        if search_param:
            return Users.objects.filter(username__icontains=search_param)
        return super().get_queryset()
    
    @action(detail=False, methods=['get'], url_path='username/(?P<username>[^/.]+)')
    def get_user_by_username(self, request, username=None):
        user = get_object_or_404(Users, username=username)
        serializer = UsersSerializer(user)
        return Response(serializer.data)
    

class PostPagination(PageNumberPagination):
    page_size = 10 
    page_size_query_param = 'page_size'
    max_page_size = 100

class PostViewSet(viewsets.ModelViewSet):
    serializer_class = PostSerializer
    pagination_class = PostPagination

    def get_queryset(self):
        return Post.objects.all().select_related('user').prefetch_related(
            'comments',
            'likes',
            'bookmarks',
            'linked_notifications'
        ).annotate(
            comments_count=Count('comments'),
            likes_count=Count('likes'),
            bookmarks_count=Count('bookmarks')
        ).order_by('-created_at')

    def retrieve_user(self, pk):
        """Helper method to retrieve a user or return a 404 response."""
        try:
            return Users.objects.get(pk=pk)
        except Users.DoesNotExist:
            return None

    def get_posts(self, user, following=False):
        """Retrieve posts based on user status: self or following."""
        if following:
            # Fetch posts from the users the current user is following
            following_users = user.following.prefetch_related('posts')
            
            # Combine posts from all followed users into a single queryset
            posts = Post.objects.none()  # Start with an empty queryset
            for followed_user in following_users:
                posts = posts | followed_user.posts.all()  # Combine posts from each followed user
            
            return posts.prefetch_related(
                'comments', 'likes', 'bookmarks', 'linked_notifications'
            ).order_by('-created_at')

        # Fetch only the posts of the user
        return user.posts.all().prefetch_related(
            'comments', 'likes', 'bookmarks', 'linked_notifications'
        ).order_by('-created_at')


    @action(detail=True, methods=['get'])
    def following_posts(self, request, pk=None):
        user = self.retrieve_user(pk)
        if not user:
            return Response({'detail': 'User not found.'}, status=status.HTTP_404_NOT_FOUND)

        posts = self.get_posts(user, following=True)
        return self.paginate_and_respond(posts)

    @action(detail=True, methods=['get'])
    def user_posts(self, request, pk=None):
        user = self.retrieve_user(pk)
        if not user:
            return Response({'detail': 'User not found.'}, status=status.HTTP_404_NOT_FOUND)

        posts = self.get_posts(user)
        return self.paginate_and_respond(posts)

    def paginate_and_respond(self, posts):
        """Helper method for pagination and response formatting."""
        page = self.paginate_queryset(posts)
        if page is not None:
            serializer = self.get_serializer(page, many=True)
            return self.get_paginated_response(serializer.data)
        serializer = self.get_serializer(posts, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

class FriendshipViewSet (viewsets.ModelViewSet):
    serializer_class = FriendshipSerializer
    queryset = Friendship.objects.all()

    def create(self, request, *args, **kwargs):
        user_id = request.data.get("user_id")
        friend_id = request.data.get("friend_id")

        if not user_id or not friend_id:
            return Response({"error": "User IDs are required"}, status=status.HTTP_400_BAD_REQUEST)

        try:
            user = Users.objects.get(id=user_id)
            friend = Users.objects.get(id=friend_id)
        except Users.DoesNotExist:
            return Response({"error": "User not found"}, status=status.HTTP_404_NOT_FOUND)

        friendship, created = Friendship.objects.get_or_create(user=user, friend=friend)

        if created:
            return Response({"success": "Friendship created successfully"}, status=status.HTTP_201_CREATED)
        else:
            return Response({"error": "Friendship already exists"}, status=status.HTTP_400_BAD_REQUEST)
    
    def destroy(self, request, pk=None):
        try:
            friendship = self.get_object()  # Obtiene el objeto a eliminar
            friendship.delete()  # Elimina la amistad
            return Response(status=status.HTTP_204_NO_CONTENT)
        except Friendship.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)
    
    @action(detail=False, methods=['get'], url_path='get_id/(?P<user_id>[^/.]+)/(?P<friend_id>[^/.]+)')
    def get_friendship_id(self, request, user_id, friend_id):
        try:
            friendship = Friendship.objects.get(user_id=user_id, friend_id=friend_id)
            return Response({'friendship_id': friendship.id}, status=status.HTTP_200_OK)
        except Friendship.DoesNotExist:
            return Response({'error': 'Friendship not found'}, status=status.HTTP_404_NOT_FOUND)

class NotificationViewSet(viewsets.ModelViewSet):
    serializer_class = NotificationSerializer

    def get_queryset(self):
        # Retorna todas las notificaciones del usuario , leídas y no leídas
        return Notification.objects.filter().order_by('-created_at')

    @action(detail=False, methods=['get'])
    def by_recipient(self, request):
        recipient_id = request.query_params.get('recipient_id')  # Parámetro en la consulta (query)
        if recipient_id is None:
            return Response({"error": "El parámetro recipient_id es requerido."}, status=status.HTTP_400_BAD_REQUEST)

        notifications = Notification.objects.filter(recipient_id=recipient_id).order_by('-created_at')
        serializer = self.get_serializer(notifications, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)
    

    def create(self, request, *args, **kwargs):
        data = request.data
        recipient_id = data.get('recipient')
        issuer_id = data.get('issuer')
        post_id = data.get('post')
        content = data.get('content')
        type = data.get('type', 'notificacion')

        try:
            recipient = Users.objects.get(id=recipient_id)
            issuer = Users.objects.get(id=issuer_id)
        except Users.DoesNotExist:
            return Response({"error": "Usuario no encontrado."}, status=status.HTTP_404_NOT_FOUND)
        
        post = None
        if post_id:
            try:
                post = Post.objects.get(id=post_id)
            except Post.DoesNotExist:
                return Response({"error": "Post no encontrado."}, status=status.HTTP_404_NOT_FOUND)

        with transaction.atomic():  # Asegura la atomicidad de la transacción
            notification = Notification.objects.create(
                recipient=recipient,
                issuer=issuer,
                post=post,
                content=content,
                type=type
            )
        
        notification.save()

        # Serializamos y devolvemos la respuesta
        serializer = self.get_serializer(notification)
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    
    def destroy(self, request, pk=None):
        try:
            notification = self.get_object()  # Obtiene el objeto a eliminar
            notification.delete()  # Elimina la amistad
            return Response(status=status.HTTP_204_NO_CONTENT)
        except notification.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)
