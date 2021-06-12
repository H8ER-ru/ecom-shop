from django.urls import path
from . import views


urlpatterns = [
    path('user/login/', views.MyTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('users/profile/', views.getUserProfile, name='user_profile'),
    path('products/', views.getProducts, name='products'),
    path('product/<str:pk>', views.getProduct, name='product'),
]