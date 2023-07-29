from django.contrib.auth.models import User
from app.models import Items, Value, Profile
from rest_framework import serializers
from django.core import exceptions
import django.contrib.auth.password_validation as validators
from django.utils import timezone
from datetime import datetime


class ValueSerializer(serializers.StringRelatedField):
    def to_internal_value(self, data):
        print(type(data))


class ItemsSerializer(serializers.HyperlinkedModelSerializer):
    values = serializers.SerializerMethodField()

    class Meta:
        model = Items
        fields = ['id', 'values']
        related_object = 'value'

    def update(self, instance, validated_data):
        instance.value_set.all().delete()
        for value in validated_data.get("values"):
            Value.objects.create(items=instance, value=value)
        return instance

    def create(self, validated_data):
        values = validated_data.pop("values", [])
        instance = Items.objects.create(**validated_data)
        for value in values:
            Value.objects.create(items=instance, value=value)
        return instance

    def get_values(self, items: Items):
        return list(map(str, Value.objects.filter(items=items)))


class UserSerializer(serializers.ModelSerializer):
    date_paid = serializers.SerializerMethodField()

    class Meta:
        model = User
        fields = ['id', 'username', 'email', 'first_name', 'last_name', 'date_paid']
        read_only_fields = ['id', 'email']

    def update(self, instance, validated_data):
        print(validated_data)
        timestamp = validated_data.pop("date_paid", None)
        if timestamp:
            profile = self.get_profile(instance)
            profile.date_paid = datetime.fromtimestamp(timestamp, tz=timezone.get_default_timezone())
            profile.save()
        super().update(instance, validated_data)
        return instance

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
