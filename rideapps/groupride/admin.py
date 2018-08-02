from django.contrib import admin
from .models import Comment, Review


class ReviewAdmin(admin.ModelAdmin):
	list_display = ('date','user','rating')  #field will be displayed in column
	list_filter = ('date','user','rating')  #will allow items to be filtered

admin.site.register(Review, ReviewAdmin)

class CommentAdmin(admin.ModelAdmin):
	list_display = ('date','user')  #field will be displayed in column
	list_filter = ('date','user')  #will allow items to be filtered

admin.site.register(Comment, CommentAdmin)
