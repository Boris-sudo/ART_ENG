"""
Django settings for ART_ENG project.

Generated by 'django-admin startproject' using Django 4.2.

For more information on this file, see
https://docs.djangoproject.com/en/4.2/topics/settings/

For the full list of settings and their values, see
https://docs.djangoproject.com/en/4.2/ref/settings/
"""

from dotenv import load_dotenv
from pathlib import Path
import mimetypes
import os

# Build paths inside the project like this: BASE_DIR / 'subdir'.
BASE_DIR = Path(__file__).resolve().parent.parent

load_dotenv(BASE_DIR / ".env")


# Quick-start development settings - unsuitable for production
# See https://docs.djangoproject.com/en/4.2/howto/deployment/checklist/

# SECURITY WARNING: keep the secret key used in production secret!
SECRET_KEY = os.environ.get('SECRET_KEY', 'django-insecure-)wy0h9z6x4o3t4@=s_keq0x$illy9yqyo!4g8wk%mo8l+8imun')

# SECURITY WARNING: don't run with debug turned on in production!
DEBUG = os.environ.get('DEBUG', 'true') == 'true'

ALLOWED_HOSTS = os.environ.get('ALLOWED_HOSTS', '*').split()


SILENCED_SYSTEM_CHECKS = ["staticfiles.W004"]

# Application definition

INSTALLED_APPS = [
    'jazzmin',

    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',

    'rest_framework',
    'knox',

    "django_browser_reload",

    'web',
    'app',

    'django.contrib.staticfiles',
]

MIDDLEWARE = [
    'django.middleware.security.SecurityMiddleware',
    "whitenoise.middleware.WhiteNoiseMiddleware",
    'django.contrib.sessions.middleware.SessionMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
    "django_browser_reload.middleware.BrowserReloadMiddleware",
]


REST_FRAMEWORK = {
    'DEFAULT_AUTHENTICATION_CLASSES': [
        # 'rest_framework.authentication.TokenAuthentication',
        'rest_framework.authentication.SessionAuthentication',
        'knox.auth.TokenAuthentication',
    ]
}

REST_KNOX = {
    "USER_SERIALIZER": "app.serializers.UserSerializer"
}

ROOT_URLCONF = 'ART_ENG.urls'

TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': [BASE_DIR / 'templates']
        ,
        'APP_DIRS': True,
        'OPTIONS': {
            'context_processors': [
                'django.template.context_processors.debug',
                'django.template.context_processors.request',
                'django.contrib.auth.context_processors.auth',
                'django.contrib.messages.context_processors.messages',
            ],
        },
    },
]

WSGI_APPLICATION = 'ART_ENG.wsgi.application'


# Database
# https://docs.djangoproject.com/en/4.2/ref/settings/#databases
if os.environ.get('DB_TYPE', 'sqlite') == 'mysql':
    DATABASES = {
        'default': {
            'ENGINE': 'django.db.backends.mysql',
            'NAME': os.environ.get('MYSQL_NAME', None),
            'USER': os.environ.get('MYSQL_USER', None),
            'PASSWORD': os.environ.get('MYSQL_PASSWORD', None),
            'HOST': os.environ.get('MYSQL_HOST', 'localhost'),
            'PORT': os.environ.get('MYSQL_PORT', '3306'),
            'ATOMIC_REQUESTS': True,
        }
    }
else:
    DATABASES = {
        'default': {
            'ENGINE': 'django.db.backends.sqlite3',
            'NAME': BASE_DIR / 'db.sqlite3',
            'ATOMIC_REQUESTS': True,
        }
}


# Password validation
# https://docs.djangoproject.com/en/4.2/ref/settings/#auth-password-validators

AUTH_PASSWORD_VALIDATORS = [
    {
        'NAME': 'django.contrib.auth.password_validation.UserAttributeSimilarityValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.MinimumLengthValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.CommonPasswordValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.NumericPasswordValidator',
    },
]


# Internationalization
# https://docs.djangoproject.com/en/4.2/topics/i18n/

LANGUAGE_CODE = 'en'

TIME_ZONE = 'UTC'

USE_I18N = True

USE_TZ = True


# Static files (CSS, JavaScript, Images)
# https://docs.djangoproject.com/en/4.2/howto/static-files/

STATIC_URL = 'static/'
STATIC_ROOT = BASE_DIR / 'static'
STATICFILES_DIRS = [BASE_DIR / 'staticfiles']
STATICFILES_STORAGE = "whitenoise.storage.CompressedStaticFilesStorage"


mimetypes.add_type('application/javascript', '.js')
mimetypes.add_type('text/css', '.css')

MEDIA_URL = "media/"
MEDIA_ROOT = BASE_DIR / "files"

# Default primary key field type
# https://docs.djangoproject.com/en/4.2/ref/settings/#default-auto-field

DEFAULT_AUTO_FIELD = 'django.db.models.BigAutoField'


SENTRY = os.environ.get("SENTRY", None)
if SENTRY:
    import sentry_sdk
    from sentry_sdk.integrations.django import DjangoIntegration

    sentry_sdk.init(
        dsn=SENTRY,
        integrations=[DjangoIntegration()],

        # Set traces_sample_rate to 1.0 to capture 100%
        # of transactions for performance monitoring.
        # We recommend adjusting this value in production.
        traces_sample_rate=1.0,

        # If you wish to associate users to errors (assuming you are using
        # django.contrib.auth) you may enable sending PII data.
        send_default_pii=True
    )


from yookassa import Configuration

Configuration.account_id = os.environ.get("YOOKASSA_ACCOUNT_ID", None)
Configuration.secret_key = os.environ.get("YOOKASSA_SECRET_KEY", None)


YOOKASSA_PAYMENT_DATA = {
    "amount": {
        "value": "499.00",
        "currency": "RUB"
    },
    "confirmation": {
        "type": "redirect",
        "return_url": "https://arteng.site/"
    },
    "capture": True,
    "description": "Оплата за услуги ArtEng",
    "receipt": {
        "customer": {
            "email": "user@example.com"
        },
        "items": [
            {
                "description": "Оплата за услуги ArtEng",
                "quantity": "1.00",
                "amount": {
                    "value": "499.00",
                    "currency": "RUB"
                },
                "vat_code": "1",
                "payment_mode": "full_prepayment",
                "payment_subject": "commodity"
            },
        ]
    }
}
