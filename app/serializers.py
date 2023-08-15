from django.contrib.auth.models import User
from django.conf import settings
from app.models import Payment, Profile
from rest_framework import serializers
from django.core import exceptions
import django.contrib.auth.password_validation as validators
from yookassa import Payment as PaymentAPI
import uuid


class PaymentSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Payment
        fields = ['id', 'status', 'created_at']
        read_only_fields = ['id', 'status', 'created_at']

    def create(self, validated_data):
        payment = PaymentAPI.create(settings.YOOKASSA_PAYMENT_DATA, uuid.uuid4())
        validated_data.update({'id': payment.id,
                               'redirect_url': payment.confirmation.confirmation_url})

        return Payment.objects.create(**validated_data)


class UserSerializer(serializers.ModelSerializer):
    date_paid = serializers.SerializerMethodField()

    class Meta:
        model = User
        fields = ['id', 'username', 'email', 'first_name', 'last_name', 'date_paid']
        read_only_fields = ['id', 'email', 'date_paid']

    def get_profile(self, instance: User):
        return Profile.objects.get(user=instance)

    def get_date_paid(self, instance: User):
        date = self.get_profile(instance).date_paid
        if date:
            return int(date.timestamp())


class RegisterSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)

    class Meta:
        model = User
        fields = ['id', 'username', 'email', 'password']

    def create(self, validated_data):
        user = User.objects.create_user(validated_data['username'], validated_data['email'], validated_data['password'])
        return user

    def validate_password(self, value):
        try:
            validators.validate_password(value)
        except exceptions.ValidationError as exc:
            raise serializers.ValidationError(list(exc.messages))
        return value
