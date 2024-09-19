from rest_framework import routers
from .api import UserViewSet, PostViewSet

from django.conf.urls.static import static
from django.conf import settings

router = routers.DefaultRouter()
router.register('api/users', UserViewSet, 'users')
router.register('api/posts', PostViewSet, 'posts')






urlpatterns = router.urls

urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)