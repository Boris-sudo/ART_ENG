from django.contrib.auth.models import AnonymousUser
from rest_framework.response import Response
from rest_framework import viewsets, mixins, permissions, views, status
from app.models import Payment
from app.serializers import PaymentSerializer
import json


class IsOwner(permissions.BasePermission):
    """
    Custom permission to only allow owners of an object to edit it.
    """

    def has_object_permission(self, request, view, obj):
        return obj.user == request.user


class PaymentViewSet(mixins.ListModelMixin, mixins.RetrieveModelMixin, mixins.CreateModelMixin,
                     viewsets.GenericViewSet):
    serializer_class = PaymentSerializer
    permission_classes = [permissions.IsAuthenticated, IsOwner]

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)

    def get_queryset(self, *args, **kwargs):
        if type(self.request.user) != AnonymousUser:
            return Payment.objects.filter(user=self.request.user)
        return Payment.objects.none()


class NotificationAPI(views.APIView):
    def post(self, request):
        event_json = json.loads(request.body)
        try:
            payment = Payment.objects.get(id=event_json['object']['id'])
            payment.status = getattr(Payment.Status, event_json['object']['status'].upper(), Payment.Status.PENDING)
            payment.save()
        except Payment.DoesNotExist:
            pass
        return Response(None, status=status.HTTP_200_OK)


__all__ = ["PaymentViewSet", "NotificationAPI"]
