from django.http import HttpResponse, Http404, HttpResponseRedirect, JsonResponse
from django.shortcuts import render, redirect
from django.urls import reverse, reverse_lazy
from django.contrib.auth import login, authenticate
from django.contrib.auth.forms import UserCreationForm
from django.views import generic
from django import forms
from django.contrib.auth.models import User
from .models import Comment, Review, Route, Ride
from django.core.exceptions import MultipleObjectsReturned
import json, datetime

def index(request):
    context = {}
    return render(request, "groupride/index.html", context)


def create_ride(request):
    routes = Route.objects.values('route_name','miles','vertical_feet')
    context = {'routes': routes,}
    return render(request, "groupride/create_ride.html", context)


def create_route(request):
    context = {}
    return render(request, "groupride/create_route.html", context)


def login(request):
    context = {}
    return render(request, "groupride/login.html", context)


def ride(request):
    context = {}
    return render(request, "groupride/ride.html", context)


def route(request):
    context = {}
    return render(request, "groupride/route.html", context)


def rides(request):
    context = {}
    return render(request, "groupride/rides.html", context)


def routes(request):
    context = {}
    return render(request, "groupride/routes.html", context)

def create_new_ride(request):
    return True


def create_new_route(request):

    route_name = request.POST.get("route_name")
    miles = request.POST.get("miles")
    vertical_feet = request.POST.get("vertical_feet")
    origin = request.POST.get("origin")

    try:
        Route.objects.get(route_name = route_name)
        context = {
            'success': False,
            'headline': "Sorry! ",
            'message': f"A route with the name '{route_name}' already exists. Choose a new route name."
        }
        return JsonResponse(context)

    except Route.DoesNotExist as e:
        new_route = Route()
        new_route.created_by = request.user
        new_route.created_on = datetime.datetime.now()
        new_route.route_name = route_name
        new_route.miles = float(miles)
        new_route.vertical_feet = int(vertical_feet)
        new_route.origin = origin
        new_route.save()

        context = {
            'success': True,
            'headline': "Route created! ",
            'message': f"'{route_name}' by '{request.user}'"
        }

        return JsonResponse(context)


# START User registration form
class RegistrationForm(UserCreationForm):
    first_name = forms.CharField(max_length=30, required=False, help_text='Optional.')
    last_name = forms.CharField(max_length=30, required=False, help_text='Optional.')
    email = forms.EmailField(max_length=254, help_text='Required.')

    class Meta:
        model = User
        fields = ('username', 'first_name', 'last_name', 'email', 'password1', 'password2', )

class Register(generic.CreateView):
    form_class = RegistrationForm
    success_url = reverse_lazy('login')
    template_name = 'registration/register.html'
# END User Registration Form

# Exception Classes
# class RouteNameExists(Exception):
#     pass

# end Exception Classes
