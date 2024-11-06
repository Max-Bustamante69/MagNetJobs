from rest_framework import routers
from .api import UserViewSet, PostViewSet, FriendshipViewSet, NotificationViewSet

from django.conf.urls.static import static
from django.conf import settings

router = routers.DefaultRouter()
router.register('api/users', UserViewSet, 'users')
router.register('api/posts', PostViewSet, 'posts')
router.register('api/friendship', FriendshipViewSet, 'friendship')
router.register('api/notifications', NotificationViewSet,'notifications')


urlpatterns = router.urls

urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)