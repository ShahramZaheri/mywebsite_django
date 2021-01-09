import random
import math
import heapq
import pandas as pd
import csv
from mywebsite.settings import CSVFILES_FOLDER


f = CSVFILES_FOLDER+'adj_matrix.csv'
adj_matrix = pd.read_csv(f)

# ======================== some helper functions =======================================
#input: a city and the goal city
#output: distance of two cities in KM
#https://math.stackexchange.com/questions/29157/how-do-i-convert-the-distance-between-two-lat-long-points-into-feet-meters
def h (city,goal_city):
    lat1 = adj_matrix[city][20]
    lat2 = adj_matrix[goal_city][20]
    lng1 = adj_matrix[city][21]
    lng2 = adj_matrix[goal_city][21]
    x = (lat1 - lat2) * math.pi/180
    y = (lng1 - lng2) * math.pi/180 * math.cos((lat1+lat2)*.5*math.pi/180)
    return (6371* math.sqrt(x*x + y*y))
# ========================= beginning of Path class =============================
class Path:
    list_of_cities = []
    cost = 0
    def __init__(self, list_of_cities, cost):
        self.list_of_cities = list_of_cities
        self.cost = cost
    # > overload function to compare two paths. It's needed in priority queue.
    def __gt__(self, other):
        if (self.cost > other.cost):
            return True
        else:
            return False
    # to print Path class
    def print_path (self):
        return {"path_found" : True ,"list of cities": self.list_of_cities, "cost": self.cost}
        
# ============================ end of path class ============================================

def find_a_path(start_point,destination):
    PQ=[]
    root_list = []
    root_list.append(start_point)
    root_cost = h(start_point, destination)
    root_path = Path(root_list, root_cost)
    heapq.heappush(PQ, root_path)
    #print(len(PQ))
    while len(PQ) != 0:
        # if (len(PQ) >1000):
        #     exit()
        path_being_examined = heapq.heappop(PQ)
        #print("path being popped")
        #path_being_examined.print_path()
        last_city_in_path = path_being_examined.list_of_cities[-1]
        #print(" line 65 - PQ length", len(PQ))
        if (last_city_in_path == destination):
            return path_being_examined.print_path()
        else:
            for i in range(20):
                #print(last_city_in_path)
                if (((adj_matrix[last_city_in_path][i]) > 0) and not (adj_matrix['cities'][i] in path_being_examined.list_of_cities)):
                    new_list_of_cities = []
                    for item in path_being_examined.list_of_cities:
                        new_list_of_cities.append(item)
                    new_list_of_cities.append(adj_matrix['cities'][i])
                    #print(new_list_of_cities)
                    new_cost = path_being_examined.cost - h(last_city_in_path,destination) \
                            + adj_matrix[last_city_in_path][i] + h(adj_matrix['cities'][i], destination)
                    new_path = Path(new_list_of_cities, new_cost)
                    # print("path being added")
                    # new_path.print_path()
                    heapq.heappush(PQ, new_path)
                    #print("PQ length", len(PQ))
    #return ("All the routes have been checked. There is no route between the entered start point and destination")
    return {"path_found" : False ,"list of cities": [], "cost":[]}