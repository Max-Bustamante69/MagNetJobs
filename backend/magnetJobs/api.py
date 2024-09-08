from rest_framework import viewsets, permissions, status
from .models import Users
from .serializers import UsersSerializer
from rest_framework.response import Response
from rest_framework.decorators import action

# Create your views here.
class UserViewSet(viewsets.ModelViewSet):
    queryset = Users.objects.all()
    permission_classes = [permissions.AllowAny]
    serializer_class = UsersSerializer
    
    @action(detail=True, methods=['post'])
    def employed(self, request, pk=None):
        user = self.get_object()
        user.employed = not user.employed
        user.save()
        return Response({'status': f'User {user.username} is now employed' if user.employed else f'User {user.username} is now unemployed'}, status=status.HTTP_200_OK)