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
import json
from datetime import datetime

def index(request):
    context = {}
    return render(request, "groupride/index.html", context)


def create_ride(request):
    routes = Route.objects.values('id', 'route_name','miles','vertical_feet')
    context = {'routes': routes,}
    return render(request, "groupride/create_ride.html", context)


def create_route(request):
    context = {}
    return render(request, "groupride/create_route.html", context)


def login(request):
    context = {}
    return render(request, "groupride/login.html", context)


def ride(request,ride_id):
    ride = Ride.objects.get(pk = ride_id)
    context = {
        "ride": ride,
    }
    return render(request, "groupride/ride.html", context)


def route(request, route_id):
    route = Route.objects.get(pk = route_id)
    context = {
        "route": route,
        "ratings": Review.RATINGS,
    }
    return render(request, "groupride/route.html", context)


def get_reviews(request):
    route_id = request.POST.get("route_id")
    route = Route.objects.get(pk = route_id)
    reviews = route.reviews.all()

    reviews_dict = {}
    for r in reviews:
        reviews_dict[r.id] = {
            "user": f'{r.user.first_name[0]}. {r.user.last_name}',
            "date": r.date,
            "text": r.text,
            "rating": r.rating
        }

    context = {
        "reviews": reviews_dict,
        "ratings": Review.RATINGS,
    }

    return JsonResponse(context)




def rides(request):
    rides = Ride.objects.all()

    context = {'rides': rides,}
    return render(request, "groupride/rides.html", context)


def routes(request):
    routes = Route.objects.values('id', 'route_name', 'origin', 'miles','vertical_feet')
    context = {'routes': routes,}
    return render(request, "groupride/routes.html", context)

def create_new_ride(request):
    ride_name = request.POST.get("ride_name")
    rd = []
    rd = request.POST.get("ride_date").split(',')

    ride_date = datetime(int(rd[0]), int(rd[1]), int(rd[2]), int(rd[3]), int(rd[4]))
    # ride_date = datetime(rd[0], rd[1], rd[2], rd[3], rd[4])
    print(ride_date)

    route_id = request.POST.get("route_id")

    # see if a ride with the given name on the same day already exists
    try:
        # Ride.objects.get(ride_name = ride_name, ride_date = ride_date)

        Ride.objects.get(   ride_name = ride_name,
                            ride_date__year = ride_date.year,
                            ride_date__month = ride_date.month,
                            ride_date__day = ride_date.day)
        context = {
            'success': False,
            'headline': "Sorry! ",
            'message': f"A ride with the name '{ride_name}' already exists on '{ride_date}'. Choose a new route name."
        }
        return JsonResponse(context)

    # if a route with smae name on same day doesn't exist, the create it
    except Ride.DoesNotExist as e:
            new_ride = Ride()
            new_ride.created_by = request.user
            new_ride.created_on = datetime.now()
            new_ride.ride_name = ride_name
            new_ride.ride_date = ride_date
            new_ride.route_id = route_id
            new_ride.save()

            context = {
                'success': True,
                'headline': "Ride created! ",
                'message': f"'{ride_name}' by '{request.user}'.  Check back later to see who is coming!"
            }

            return JsonResponse(context)



def create_new_route(request):

    route_name = request.POST.get("route_name")
    miles = request.POST.get("miles")
    vertical_feet = request.POST.get("vertical_feet")
    origin = request.POST.get("origin")

    # see if a route with the given name already exists
    try:
        Route.objects.get(route_name = route_name)
        context = {
            'success': False,
            'headline': "Sorry! ",
            'message': f"A route with the name '{route_name}' already exists. Choose a new route name."
        }
        return JsonResponse(context)

    # if the route with the name doesn't exists then create it
    except Route.DoesNotExist as e:
        new_route = Route()
        new_route.created_by = request.user
        new_route.created_on = datetime.now()
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
