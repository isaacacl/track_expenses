from .views import CategoryViewSet, ExpenseViewSet
from rest_framework.routers import SimpleRouter

router = SimpleRouter()
router.register('expenses', ExpenseViewSet, basename='expenses')
router.register('', CategoryViewSet, basename='categories')

urlpatterns = router.urls