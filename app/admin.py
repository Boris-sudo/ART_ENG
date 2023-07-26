from django.contrib import admin
from app.models import Items, Value


class ValueInline(admin.StackedInline):
    model = Value
    extra = 1


@admin.register(Items)
class ItemsAdmin(admin.ModelAdmin):
    inlines = [ValueInline]



