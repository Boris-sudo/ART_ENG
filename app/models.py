from django.db import models


class Profile(models.Model):
    class Meta:
        verbose_name = "Профиль"
        verbose_name_plural = "Профили"

    user = models.OneToOneField("auth.User", on_delete=models.CASCADE, verbose_name="Пользователь")
    date_paid = models.DateTimeField(blank=True, null=True, verbose_name="Дата покупки")


class Items(models.Model):
    class Meta:
        verbose_name = "Массив"
        verbose_name_plural = "Массивы"

    user = models.ForeignKey("auth.User", on_delete=models.CASCADE, verbose_name="Пользователь")

    def __str__(self):
        return str(list(map(str, Value.objects.filter(items=self))))


class Value(models.Model):
    class Meta:
        verbose_name = "Значение"
        verbose_name_plural = "Значения"

    items = models.ForeignKey(Items, on_delete=models.CASCADE, verbose_name="Массивы")
    value = models.TextField(verbose_name="Значение")

    def __str__(self):
        return self.value
