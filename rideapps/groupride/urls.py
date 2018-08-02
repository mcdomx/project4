from django.urls import path
from . import views

urlpatterns = [
    path("", views.index, name="index"),
    path("create_ride/", views.create_ride, name="create_ride"),
    path("create_route/", views.create_route, name="create_route"),
    path("login/", views.login, name="login"),
    path("ride/<int:ride_id>", views.ride, name="ride"),
    path("route/<int:route_id>", views.route, name="route"),
    path("rides/", views.rides, name="rides"),
    path("routes/", views.routes, name="routes"),
    path('register/', views.Register.as_view(), name='register'),
]
