from rest_framework.serializers import ModelSerializer
from .models import Expense, Category

class ExpenseSerializer(ModelSerializer):
    class Meta:
        model = Expense
        fields = ('id', 'name' ,'amount', 'category', 'date')

class CategoryExpenseSerializer(ModelSerializer):
    expense_set = ExpenseSerializer(many=True, required=False)
    class Meta:
        model = Category
        fields = ('id', 'name', 'expense_set', 'owner')

