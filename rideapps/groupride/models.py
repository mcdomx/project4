from django.db import models
from django.contrib.auth.models import User


class Comment(models.Model):
    # date will be initial time stamp that does not change (auto_add_now)
    date = models.DateTimeField(auto_now_add=True, editable=False, blank=False)
    text = models.CharField(max_length = 1024)
    user = models.ForeignKey(User, on_delete = models.SET_NULL, blank=True, null=True)


class Review(models.Model):

    RATINGS = (
        (None, "no rating given"),
        ('1', "Entire route is not recommended and possibly dangerous."),
        ('2', "Sections of route are not recommended."),
        ('3', "Generally accepable. Nothing Special, but safe."),
        ('4', "Good. Recommended"),
        ('5', "Outstanding!"),
    )

    # date will be initial time stamp that does not change (auto_add_now)
    date = models.DateTimeField(auto_now_add=True, editable=False, blank=False)
    text = models.CharField(max_length = 2048)
    user = models.ForeignKey(User, on_delete = models.SET_NULL, blank=True, null=True)
    rating = models.CharField(max_length = 1, blank = True, choices = RATINGS, default = None)


# class Ride(models.Model):
#
#
# class Route(models.Model):
