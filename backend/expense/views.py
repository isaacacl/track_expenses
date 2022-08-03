from rest_framework import viewsets
from rest_framework.permissions import AllowAny
from .models import Category, Expense
from .serializers import ExpenseSerializer, CategoryExpenseSerializer


class ExpenseViewSet(viewsets.ModelViewSet):
    queryset = Expense.objects.all()
    serializer_class = ExpenseSerializer

class CategoryViewSet(viewsets.ModelViewSet):
    queryset = Category.objects.all()
    serializer_class = CategoryExpenseSerializer
