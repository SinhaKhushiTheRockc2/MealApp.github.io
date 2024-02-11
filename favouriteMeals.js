//Receive data from the main page
const receiveData=JSON.parse(localStorage.getItem('favDishes'));
let data=JSON.parse(JSON.stringify(receiveData));
console.log(data);

//Declare parent container for displaying each meal card
const parentMealContainer=document.getElementById('parent-meal-container');

//Add meal cards to our favourites page
function createMealCard(mealName,mealImg,mealCategory,mealOrigin){
  //Iterate through each element present in the list
for (let index = 0; index < mealName.length; index++) {
  //Declare the elements required for our meal card
  const childMealContainer=document.createElement('div');
  const mealImage=document.createElement('img');
  childMealContainer.className='child-meal-container';
  const mealHead=document.createElement('h1');
  const category=document.createElement('h1');
  const origin=document.createElement('h1');
  const removeFromFav=document.createElement('button');
  mealHead.textContent=`Meal Name: ${mealName[index]}`;
  const headData=mealName[index];
  mealImage.src=mealImg[index];
  const imageData=mealImg[index];
  category.textContent=`Meal Category: ${mealCategory[index]}`;
  const categoryData=mealCategory[index];
  origin.textContent=`Origin: ${mealOrigin[index]}`;
  const originData=mealOrigin[index];
  removeFromFav.textContent='Remove From Favourites';
  //Append everything to childMealContainer
  childMealContainer.appendChild(mealImage);
  childMealContainer.appendChild(mealHead);
  childMealContainer.appendChild(category);
  childMealContainer.appendChild(origin);
  childMealContainer.appendChild(removeFromFav);
  //Append childMealContainer to parentaMealContainer
  parentMealContainer.appendChild(childMealContainer);

  //Add event listener for removeFromFav button
  removeFromFav.addEventListener('click',()=>{
    const key=mealName[index];
    //Remove a particular card from the favourite meals page
    removeMealCard(key);
    mealName.splice(index, 1);
    mealImg.splice(index, 1);
    mealCategory.splice(index, 1);
    mealOrigin.splice(index, 1);

    childMealContainer.remove();
  });
}
}

// Function that removes an item from local storage
function removeMealCard(key) {
  delete receiveData[key];
  localStorage.setItem('favDishes', JSON.stringify(receiveData));

  // Update data object by filtering out the removed item
  const updatedData = {
    mealName: data.mealName.filter(name => name !== key),
    mealImg: data.mealImg.filter((_, index) => data.mealName[index] !== key),
    mealCategory: data.mealCategory.filter((_, index) => data.mealName[index] !== key),
    mealOrigin: data.mealOrigin.filter((_, index) => data.mealName[index] !== key)
  };

  // Update the data object
  Object.assign(receiveData, updatedData);

  console.log(receiveData);
}

//Calling the createMealCard function for each and every meal added to the favourite meals
createMealCard(data.mealName,data.mealImg,data.mealCategory,data.mealOrigin);

