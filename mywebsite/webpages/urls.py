from django.urls import path
from . import views

urlpatterns = [
    path('', views.index, name="home"),
    path('projects/', views.projects, name= "projects"),
    path ('projects/pathfinder/', views.pathfinder.as_view(), name="path_finder"),
    path ('projects/bouncing_ball/', views.bouncing_ball, name="bouncing_ball"),
    path ('projects/heat_flow/', views.heat_flow, name="heat_flow")
]