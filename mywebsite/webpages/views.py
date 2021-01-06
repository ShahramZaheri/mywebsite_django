from django.shortcuts import render, HttpResponse

# Create your views here.
def index (request):
    return render (request, 'index.html')
def projects (request):
    return render (request, 'projects.html')
def pathfinder (request):
    return render (request, 'pathfinder.html')
