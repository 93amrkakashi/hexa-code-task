document.addEventListener("DOMContentLoaded", async () => {
  let usedNumbers = [];
  const restaurantsContainer = document.getElementById("restaurants-container");
  const serverEndpoint = "http://localhost:3000/get_data";
  const choices = document.querySelectorAll(".choice");
  const location = { location: { lat: 30.001, lon: 31.001 } };
  // هنا هجيب الداتا افتراضى زى ما صنفتها فى السيرفر
  try {
    const response = await fetch(serverEndpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(location),
    });

    if (!response.ok) {
      throw new Error(
        `فى حاجه غلط يا فنااااان راجعلك كود <==> ${response.status}`
      );
    }

    const data = await response.json();
    displayRestaurants(data.data);
  } catch (error) {
    console.error(error);
  }

  // هنا عشان امرر التصنيف كبارمتر للفنكشن اللى هتجيب الداتا
  choices.forEach((choice) => {
    choice.addEventListener("click", () => {
      choices.forEach((c) => c.classList.remove("active"));
      choice.classList.add("active");
      fetchData(choice.getAttribute("value"));
    });
  });


// دى الفنكشن اللى هتجيب الداتا على حسب اختيار الزبون 
  async function fetchData(category) {
    try {
      const response = await fetch(serverEndpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          location: { lat: 30.001, lon: 31.001 },
          category,
        }),
      });
  
      if (!response.ok) {
        throw new Error(
          `فى حاجه غلط يا فنااااان راجعلك كود <==> ${response.statusText}`
        );
      }
  
      const data = await response.json();
      displayRestaurants(data.data);
    } catch (error) {
      console.error(error);
    }
  }

  
/*
لا دا هرى فاضى بتاع فرونت
ملناش دعوة بيه احنا
*/
  function displayRestaurants(restaurants) {
    restaurantsContainer.innerHTML = "";
    restaurants.forEach((restaurant) => {
      const card = createRestaurantCard(restaurant);
      restaurantsContainer.appendChild(card);
    });
  }

  function getRandomImage() {
    let randomNumber;
    do {
      randomNumber = Math.floor(Math.random() * 30) + 1;
    } while (usedNumbers.includes(randomNumber));

    usedNumbers.push(randomNumber);
    if (usedNumbers.length === 30) {
      usedNumbers.length = 0;
    }

    return `./images/${randomNumber}.jpg`;
  }

  function createRestaurantCard(restaurant) {
    const stars = "★".repeat(restaurant.rating);
    const cardHTML = `
      <div class="card">
        <img src="${getRandomImage()}" alt="${restaurant.name}">
        <div class="card-content">
          <div class="card-title">${restaurant.name}</div>
          <div class="card-info">
            <div class="rating">
              <span>Rating:  </span> 
              <span class="stars">${stars}</span>
            </div>
            <p>Visits: ${restaurant.visits}</p> 
          </div>
        </div>
      </div>
    `;
    const cardContainer = document.createElement("div");
    cardContainer.innerHTML = cardHTML;
    return cardContainer;
  }
});

// نهاية الهرى بتاع الفرونت

