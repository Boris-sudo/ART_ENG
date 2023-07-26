from django.contrib.auth.models import User
from app.models import Items, Value
from rest_framework import serializers
from django.core import exceptions
import django.contrib.auth.password_validation as validators


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
    class Meta:
        model = User
        fields = ['id', 'username', 'email', 'first_name', 'last_name']


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
