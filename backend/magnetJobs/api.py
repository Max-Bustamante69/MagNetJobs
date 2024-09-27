from rest_framework import viewsets, permissions, status
from .models import Users, Post
from .serializers import UsersSerializer, PostSerializer, UserDetailSerializer
from rest_framework.response import Response
from rest_framework.decorators import action
from rest_framework.pagination import PageNumberPagination
from django.db.models import Count, Prefetch

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
