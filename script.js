//Declard the constants required in our project
const receiveData=JSON.parse(localStorage.getItem('favDishes'));
const parentMealContainer=document.getElementById
('parent-meal-container');
const searchMealBtn=document.getElementById('search-btn');
const searchInput=document.getElementById('search');
let input="";

//List for autocomplete function 
const dishes = ['Corba','Tamiya','Dal fry','Chocolate Gateau','Mousse','Chicken','EggPlant Adobo','Peach','black current','Chicken handi','Chicken Congee','Chicken Handee','Chicken Karage','Chicken Marrange','Tandoori Chicken','Chicken Adobo','Tart','Beef Lo Mein','Beef Rendang','Schezuan Beef','Beef Wellington','Pasta','Apple','Skillet Apple Pork Chops with Roasted Sweet Potatoes & Zucchini','Apple & Blackberry Crumble','Chinon Apple Tarts','Red Peas Soup','Spotted Dick','Beef Mechado','Beef Mechado','Clam chowder','Duck Confit','Yaki Udon','Dundee cake','Steak Diane','Kedgeree','Chocolate Raspberry Brownies','Chocolate Avocado Mousse','Chocolate Souffle'];

//JSON object that stores details about different meals
const favDishes={'mealName':[],'mealImg':[],'mealCategory':[],'mealOrigin':[]};

// Add event listener for search button
searchMealBtn.addEventListener('click',()=>{
  searchMealBtn.style.display='none';
  searchInput.style.display='block';
  searchInput.focus();
});

//Add event listener for search input
searchInput.addEventListener('keydown',((event)=>{
    if(event.key==='Enter'){
        input=searchInput.value.trim().toLowerCase();
        fetchMeal(input);
        searchInput.value='';
        searchInput.style.display='none';
        searchMealBtn.style.display='block';
    }
}));

//Function that fetches different types of meals from the mealDb api
async function fetchMeal(input) {
    try {
      let res = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${input}`);
      let data = await res.json();
      //Clear the meal container before showing other search result
      parentMealContainer.innerHTML = '';
      createMealCard(data.meals);
    } catch (err) {
      //If no result found
      const head=document.createElement('h2');
      head.textContent='No results found for the entered input, please check your input!!!';
      parentMealContainer.appendChild(head);
    }
}


function createMealCard(meals){
  meals.forEach(meal => {
    //Add div that shows data for each meal
    const childMealContainer=document.createElement('div');
    childMealContainer.className="child-meal-container";
    
    //Add heading that displays the name of the meal
    const heading=document.createElement('h1');

    //This button allows us to add our favourite dishes to the favourites list
    const addToFavbutton=document.createElement('button');

    //Add image element for displaying the thumbnail image of the meal
    const mealImage=document.createElement('img');

    //Add the h1 element that displays the category of the meal
    const mealCategory=document.createElement('h1');

    //Add the h1 element that displays the area from which the meal belongs to
    const mealArea=document.createElement('h1');

    //This button will allow us to view more details i.e, the recipe of the meal
    const mealDetails=document.createElement('button');
    mealImage.className='meal-img';
    heading.textContent=meal.strMeal;
    const data=meal.strMeal;
    addToFavbutton.textContent='Add to favourites';
    addToFavbutton.className="fa-solid fa-heart";
    mealImage.src=meal.strMealThumb+'/preview';
    const imgData=meal.strMealThumb+'/preview';
    mealCategory.textContent=`Meal Category:${meal.strCategory}`;
    const categoryData=meal.strCategory;
    mealArea.textContent=`Origin:${meal.strArea}`;
    const originData=meal.strArea;
    mealDetails.textContent='View Recipe 👨‍🍳';

    //Append everything as a meal card
    childMealContainer.appendChild(mealImage);
    childMealContainer.appendChild(heading);
    childMealContainer.appendChild(mealCategory);
    childMealContainer.appendChild(mealArea);
    childMealContainer.appendChild(addToFavbutton);
    childMealContainer.appendChild(mealDetails);

    //Display the details on the main container
    parentMealContainer.appendChild(childMealContainer);
    
    //Add event listener to mealDetails button
    mealDetails.addEventListener('click',()=>{
      localStorage.setItem('myData', JSON.stringify(data));
      window.location.href = 'mealDetails.html';
    });

    //Add event listener for the add to favourite button
    addToFavbutton.addEventListener('click',()=>{
      favDishes.mealName.push(data);
      favDishes.mealImg.push(imgData);
      favDishes.mealCategory.push(categoryData);
      favDishes.mealOrigin.push(originData);
      addToFavbutton.textContent='Added to favourites';
      addToFavbutton.disabled=true;
      addToFavbutton.style.backgroundColor='grey';
      localStorage.setItem('favDishes',JSON.stringify(favDishes));
    });
});
}

function autocompleteSearch(input, list) {
  //Add an event listener to compare the input value with all dishes
  input.addEventListener('input', function () {
      //Close the existing list if it is open
      closeList();

      //If the input is empty, exit the function
      if (!this.value)
          return;

      //Div that shows the suggestions
      const suggestions = document.createElement('div');
      suggestions.setAttribute('id', 'suggestions');
      this.parentNode.appendChild(suggestions);

      //Traverse through all entries in the list and find matches
      for (let i=0; i<list.length; i++) {
          if (list[i].toUpperCase().includes(this.value.toUpperCase())) {
              const suggestion = document.createElement('div');
              suggestion.innerHTML = list[i];
              
              suggestion.addEventListener('click', function () {
                  input.value = this.innerHTML;
                  input.focus();
                  closeList();
              });
              suggestion.style.cursor = 'pointer';

              suggestions.appendChild(suggestion);
          }
      }

  });

  //Function that will close the list if the suggestion made has been chosen
  function closeList() {
      let suggestions = document.getElementById('suggestions');
      if (suggestions)
          suggestions.parentNode.removeChild(suggestions);
  }
}

//Call the autocomplete function to give suggestions for your search
autocompleteSearch(searchInput, dishes);
