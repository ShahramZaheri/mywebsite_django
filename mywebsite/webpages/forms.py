from django import forms
import pandas as pd
import csv
from mywebsite.settings import CSVFILES_FOLDER

f = CSVFILES_FOLDER+'adj_matrix.csv'
adj_matrix = pd.read_csv(f)
listOfCities=adj_matrix.columns.tolist()

class Path_finder_form (forms.Form):
    CITIES=[]
    len_list=len(listOfCities)
    for x in listOfCities[1:len_list-2]:
        CITIES.append((x,x)) 
  
    origin_city= forms.CharField(label='Where is the origin?',widget=forms.Select(choices=CITIES))
    dest_city= forms.CharField(label='Where is the destination?', widget=forms.Select(choices=CITIES))
