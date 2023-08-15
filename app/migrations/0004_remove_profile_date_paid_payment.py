# Generated by Django 4.1.9 on 2023-08-12 18:06

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('app', '0003_alter_profile_date_paid_alter_profile_user'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='profile',
            name='date_paid',
        ),
        migrations.CreateModel(
            name='Payment',
            fields=[
                ('id', models.CharField(max_length=100, primary_key=True, serialize=False, unique=True, verbose_name='Id платежа')),
                ('status', models.IntegerField(choices=[(0, 'Pending'), (1, 'Waiting For Capture'), (2, 'Succeeded'), (3, 'Canceled')], default=0, verbose_name='Статус')),
                ('redirect_url', models.CharField(max_length=100, verbose_name='Редирект')),
                ('created_at', models.DateTimeField(auto_now=True, verbose_name='Дата создания')),
                ('user', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL, verbose_name='Пользователь')),
            ],
            options={
                'verbose_name': 'Платёж',
                'verbose_name_plural': 'Платежы',
            },
        ),
    ]