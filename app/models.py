from django.db import models


class Profile(models.Model):
    class Meta:
        verbose_name = "Профиль"
        verbose_name_plural = "Профили"

    user = models.OneToOneField("auth.User", on_delete=models.CASCADE, verbose_name="Пользователь")

    @property
    def date_paid(self):
        payment = Payment.objects.filter(user=self.user, status=Payment.Status.SUCCEEDED).last()
        if payment:
            return payment.created_at


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


class Payment(models.Model):
    class Meta:
        verbose_name = "Платёж"
        verbose_name_plural = "Платежы"

    class Status(models.IntegerChoices):
        PENDING = 0
        WAITING_FOR_CAPTURE = 1
        SUCCEEDED = 2
        CANCELED = 3

    user = models.ForeignKey("auth.User", on_delete=models.CASCADE, verbose_name="Пользователь")

    id = models.CharField(max_length=100, primary_key=True, unique=True, verbose_name="Id платежа")
    status = models.IntegerField(default=Status.PENDING, choices=Status.choices, verbose_name="Статус")
    redirect_url = models.CharField(max_length=100, verbose_name="Редирект")

    created_at = models.DateTimeField(auto_now=True, verbose_name="Дата создания")

    def __str__(self):
        return f"{self.user}: {self.status} - {self.created_at}"

    @property
    def is_succeeded(self) -> bool:
        return self.status == Payment.Status.SUCCEEDED
