from rest_framework import routers
from .api import UserViewSet, PostViewSet

router = routers.DefaultRouter()
router.register('api/users', UserViewSet, 'users')
router.register('api/posts', PostViewSet, 'posts')






urlpatterns = router.urls