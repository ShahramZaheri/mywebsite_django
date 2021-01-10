from django.shortcuts import render, HttpResponse
from django.views.generic import TemplateView
from .forms import Path_finder_form
from .methods import find_a_path

# Create your views here.
def index (request):
    page_title = "home"
    args = {'title':page_title}
    return render (request, 'index.html', args)
def projects (request):
    page_title = "projects"
    args = {'title':page_title}
    return render (request, 'projects.html', args)
def bouncing_ball (request):
    page_title = "bouncing ball"
    args = {'title':page_title}
    return render(request, 'bouncing_ball.html', args)
def heat_flow (request):
    page_title = "heat transfer"
    args = {'title':page_title}
    return render(request, 'heat_flow.html', args)

class pathfinder (TemplateView):
    template_name = 'pathfinder.html'
    page_title = "path finder"
        
    def get (self, request):
        my_path_finder_form = Path_finder_form ()
        args = {'title':self.page_title, 'form':my_path_finder_form}
        return render (request, self.template_name, args)
    
    def post (self, request):
        my_path_finder_form = Path_finder_form (request.POST)
        if my_path_finder_form.is_valid():
            start_point = my_path_finder_form.cleaned_data['origin_city']
            destination = my_path_finder_form.cleaned_data['dest_city']
            result = find_a_path(start_point,destination)
            my_path_finder_form = Path_finder_form ()
            # to print list of cities nicely
            cities = ""
            for i in range (len(result['list of cities'])-1):
                cities = cities + result['list of cities'][i]
                cities = cities + ' -> '
            cities = cities + result['list of cities'][-1]
            if (start_point == destination):
                message = "Sorry! start point and destinaiton cannot be the same city. Try again!"
                cities = ""
            else:
                message = "The shortest path between " + start_point + " and " + destination + " is as below. Total distance of this path is "+ str(result['cost'])+ " KM."

            args ={'title':self.page_title,'form':my_path_finder_form, 'cities': cities, 'msg': message}
        return render (request, self.template_name, args)
        

