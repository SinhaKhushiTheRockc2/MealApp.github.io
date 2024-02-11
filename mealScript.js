//Recieve data from the main page
const receiveData = JSON.parse(localStorage.getItem("myData"));

const input = receiveData.trim().toLowerCase();
console.log(input);

const mealDetailsContainer = document.getElementById("meal-details-container");

//Function that fetches different types of meals from the mealDb api
async function fetchMeal(input) {
  try {
    let res = await fetch(
      `https://www.themealdb.com/api/json/v1/1/search.php?s=${input}`
    );
    let data = await res.json();
    //Clear the meal container before showing other search result
    mealDetailsContainer.innerHTML = "";
    createMealCard(data.meals);
  } catch (err) {
    //If no result found
    const head = document.createElement("h2");
    head.textContent =
      "No results found for the entered input, please check your input!!!";
    mealDetailsContainer.appendChild(head);
  }
}

//Function that creates a meal card
function createMealCard(meals) {
  //Iterate through each meal
  meals.forEach((meal) => {
    //Add the h1 element that will display the name of the meal
    const mealName = document.createElement("h1");

    //Add the h1 element that will display the origin of the meal
    const mealOrigin = document.createElement("h1");

    //Add the h1 element of the meal that will display the category of meal
    const mealCategory = document.createElement("h1");

    //Add the image element that will display the thumbnail of the meal
    const mealImg = document.createElement("img");

    //Add the paragraph element that will display the recipe of the meal
    const mealPara = document.createElement("p");

    mealName.textContent = `Meal Name: ${meal.strMeal}`;
    mealCategory.textContent = `Meal Category: ${meal.strCategory}`;
    mealOrigin.textContent = `Origin: ${meal.strArea}`;
    mealImg.src = meal.strMealThumb + "/preview";
    mealPara.textContent = meal.strInstructions;

    //Display the meal card
    mealDetailsContainer.appendChild(mealImg);
    mealDetailsContainer.appendChild(mealName);
    mealDetailsContainer.appendChild(mealCategory);
    mealDetailsContainer.appendChild(mealOrigin);
    mealDetailsContainer.appendChild(mealPara);
  });
}

//Fetch the data and show it on the screen
fetchMeal(receiveData.trim().toLowerCase());
