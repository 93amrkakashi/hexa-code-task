const express = require('express');
const bodyParser = require('body-parser');
const geolib = require('geolib');
const fs = require('fs');
const cors = require('cors');

const app = express();
const port = 3000;

app.use(bodyParser.json());

app.use(cors());

const restaurantData = JSON.parse(fs.readFileSync('data.json', 'utf8'));

// to filter by location
function sortRestaurantsByProximity(location, restaurants) {
    return restaurants.sort((a, b) => {
        const distanceA = geolib.getDistance(location, a.location);
        const distanceB = geolib.getDistance(location, b.location);
        return distanceA - distanceB;
    });
}

// to filter by rating
function sortRestaurantsByRating(restaurants) {
    return restaurants.sort((a, b) => b.rating - a.rating);
}

// to filter by visiits
function sortRestaurantsByVisits(restaurants) {
    return restaurants.sort((a, b) => b.visits - a.visits);
}

/*
لا هنا القصة طويلة حبتين
بنفلتر  الاول حسب المكان
والناتج بيتفلتر حسب الاعلى تقييم
والناتج بيتفلتر حسب الاعلى زيارة
طبعا ممكن نغير تغيير بسيط  لو عاوزين نشقلب الدنيا حسب مزاجنا
بس انا سيبت الحته دى اتحكم فيها من الفرونت
اخلى اليوزر هو اللى يختار يفلتر الحاجه ازاى براحته
*/
function filterData(location) {
    const filteredData = sortRestaurantsByProximity(location, restaurantData);
    const sortedByRating = sortRestaurantsByRating(filteredData);
    const sortedByVisits = sortRestaurantsByVisits(sortedByRating);
    return sortedByVisits;
}


app.post('/get_data', (req, res) => {
  const { location, category } = req.body;
  let filteredData;

  switch (category) {
      case "proximity":
          filteredData = sortRestaurantsByProximity(location,restaurantData);
          break;
      case "rating":
          filteredData = sortRestaurantsByRating(restaurantData);
          break;
      case "visits":
          filteredData = sortRestaurantsByVisits(restaurantData);
          break;
      default:
          filteredData = filterData(location);
  }

  res.json({data: filteredData });
});



app.listen(port, () => {
    console.log(`running at http://localhost:${port}`);
});

// الاند بوينت يا معلم
// http://localhost:3000/get_data
