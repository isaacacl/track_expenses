from django.db import models as m
from accounts.models import CustomUser
from django.utils import timezone

class Category(m.Model):
    name = m.CharField(max_length=200)
    owner = m.ForeignKey(CustomUser, db_column="owner", on_delete=m.CASCADE)

    def __str__(self):
        return self.name

class Expense(m.Model):
    name = m.CharField(max_length=200)
    amount = m.IntegerField()
    date = m.CharField(max_length=11)
    category = m.ForeignKey(Category, on_delete=m.CASCADE)

    class Meta:
        ordering = ['date']

    def __str__(self):
        return self.name
