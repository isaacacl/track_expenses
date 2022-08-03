from django.db import models as m
from django.contrib.auth.models import (AbstractBaseUser,
PermissionsMixin, BaseUserManager)


# manages user creation
class CustomUserManager(BaseUserManager):

    def create_user(self, email, name, password=None):
        if not email:
            raise ValueError('Users must have an email address')
        
        #to lowercase, stuff like that
        email = self.normalize_email(email)
        user = self.model(email=email, name=name)

        #hashes password
        user.set_password(password)
        #saves user to db
        user.save()
        return user

    def create_superuser(self, email, name, password=None):
        if not email:
            raise ValueError('Users must have an email address')
        email = self.normalize_email(email)
        user = self.model(email=email, name=name)

        user.is_staff = True
        user.set_password(password)
        user.save()

        return user


class CustomUser(AbstractBaseUser, PermissionsMixin):
    email = m.EmailField(max_length=250, unique=True)
    name = m.CharField(max_length=200)
    is_active = m.BooleanField(default=True)
    is_staff = m.BooleanField(default=False)

    objects = CustomUserManager()

    # this is cool
    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['name']

    def get_full_name(self):
        return self.name

    def get_short_name(self):
        return self.name

    def __str__(self):
        return self.email
    


