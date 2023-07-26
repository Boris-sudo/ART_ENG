from django.contrib.auth.models import AnonymousUser
from rest_framework import viewsets, mixins, permissions
from app.models import Items
from app.serializers import ItemsSerializer


class IsOwner(permissions.BasePermission):
    """
    Custom permission to only allow owners of an object to edit it.
    """

    def has_object_permission(self, request, view, obj):
        return obj.user == request.user


class ItemsViewSet(viewsets.ModelViewSet):
    serializer_class = ItemsSerializer
    permission_classes = [permissions.IsAuthenticated, IsOwner]

    def perform_create(self, serializer):
        serializer.save(user=self.request.user, values=self.request.data.get("values", []))

    def perform_update(self, serializer):
        serializer.save(values=self.request.data.get("values", []))

    def get_queryset(self, *args, **kwargs):
        if type(self.request.user) != AnonymousUser:
            return Items.objects.filter(user=self.request.user)
        return Items.objects.none()


__all__ = ["ItemsViewSet"]
