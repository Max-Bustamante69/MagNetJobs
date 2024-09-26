from rest_framework import viewsets, permissions, filters
from .models import Users, Post
from .serializers import UsersSerializer, PostSerializer
from rest_framework.pagination import PageNumberPagination
from django.core.cache import cache

# Custom pagination class
class PostPagination(PageNumberPagination):
    page_size = 10
    page_size_query_param = 'page_size'
    max_page_size = 100

# User ViewSet with caching and optimized queryset
class UserViewSet(viewsets.ModelViewSet):
    permission_classes = [permissions.AllowAny]
    serializer_class = UsersSerializer
    filter_backends = [filters.SearchFilter]
    search_fields = ['username', 'email']  # Search by username and email

    def get_queryset(self):
        # Try to get the cached users list
        queryset = cache.get('users_list')
        if not queryset:
            # If cache is empty, query the database
            queryset = Users.objects.only('id', 'username', 'email', 'avatar_image').prefetch_related(
                'posts', 
                'following',
                'followers',  # Do not slice in prefetch; limit elsewhere
                'received_notifications', 
                'issued_notifications'
            )
            # Cache the queryset for 10 minutes
            cache.set('users_list', queryset, timeout=600)  # Cache timeout set to 600 seconds (10 minutes)

        return queryset

# Post ViewSet with improved prefetching and filtering
class PostViewSet(viewsets.ModelViewSet):
    permission_classes = [permissions.AllowAny]
    serializer_class = PostSerializer
    pagination_class = PostPagination

    def get_queryset(self):
        user_id = self.request.query_params.get('user_id', None)
        queryset = Post.objects.select_related('user').prefetch_related(
            'likes__user', 
            'bookmarks__user', 
            'comments__user'
        ).order_by('-created_at')
        
        # Apply filtering if user_id is provided
        if user_id:
            queryset = queryset.filter(user__id=user_id)
        return queryset
