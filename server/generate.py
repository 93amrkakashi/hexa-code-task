"""
مجرد سكريبت بايثون عشان يعمل الملف بتاع المطاعم
generate 30 restaurants 
name : "مطعم عادل شكل 1 وهكذا لحد 30" 
بالمناسبه هما 30 بس عشان انا مظبط الفرونت على 30 صورة بس
اى هكا ولا هكا الفرونت هيضرب فى وشك علطول
location: random
rating: random from 1 => 5
visits: random from 1 => 500
"""
import json
import os
import random

def generate_random_location():
    return {'lat': round(random.uniform(20.0, 90.0), 6), 'lon': round(random.uniform(30.0, 100.0), 6)}

def generate_restaurant_data(restaurant_id):
    name = f"مطعم عادل شكل {restaurant_id}"
    location = generate_random_location()
    rating = random.randint(1, 5)
    visits = random.randint(1, 500)

    return {'id': restaurant_id, 'name': name, 'location': location, 'rating': rating, 'visits': visits}

restaurants_data = [generate_restaurant_data(i + 1) for i in range(30)]

script_directory = os.path.dirname(os.path.realpath(__file__))

json_file_path = os.path.join(script_directory, 'data.json')

with open(json_file_path, 'w', encoding='utf-8') as json_file:
    json.dump(restaurants_data, json_file, ensure_ascii=False, indent=4)

print(f'done ya m3lm')
