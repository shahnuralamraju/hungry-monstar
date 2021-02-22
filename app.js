const searchInputText = document.getElementById('search-input');
const mealDiv = document.getElementById('meal-div');
const ingredientDiv = document.getElementById('ingredient-div');
const ul = document.getElementById('un-orderlist');

// search button onclick function here

const searchButton = () => {
    ingredientDiv.innerHTML = '';
    ul.innerHTML = '';
    document.getElementById('error-msg').innerHTML = '';

    if (searchInputText.value === '') {
        alert('Please enter a meal name...')
    } else {
        return getMeal(searchInputText.value);
    }
}

// refresh button onclick function here

const refreshButton = () => {
    document.getElementById('second-div').innerHTML = '';
    document.getElementById('meal-div').innerHTML = '';
    searchInputText.value = '';
    ingredientDiv.innerHTML = '';
    ul.innerHTML = '';
}

// load data from server with fetch (showing mealName and mealImage)

const getMeal = mealName => {
    fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${mealName}`)
        .then(response => response.json())
        .then(data => showMeal(data))
        .catch(error => errorMessage(error));
}


const showMeal = foodName => {

    mealDiv.innerHTML = '';
    const food = foodName.meals;

    food.forEach(meal => {
        const newMealDiv = document.createElement('div');
        newMealDiv.className = 'newmeal-div';
        const mealInfo = `
        <img onclick="getIngredient('${meal.strMeal}')"  class="meal-image" src="${meal.strMealThumb}">
        <h5 onclick="getIngredient('${meal.strMeal}')" class="meal-name">${meal.strMeal}</h5>
        `
        newMealDiv.innerHTML = mealInfo;
        mealDiv.appendChild(newMealDiv);
    });
}


// Error message showing function 

const errorMessage = () => {
    const errMsg = document.getElementById('error-msg');
    errMsg.innerHTML = `
    This meal name has not found. Please, Enter a valid meal name.
    `
}


//  Showing ingredient details with Ingredient Names and measurement dynamically in UI

const getIngredient = (name) => {
    const url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${name}`
    fetch(url)
        .then(res => res.json())
        .then(data => showIngredient(data.meals))
}


const showIngredient = (ingredient) => {
    ingredientDiv.innerHTML = '';
    ul.innerHTML = '';

    ingredient.forEach(element => {
        const inGdiv = document.createElement('div');
        const inGli = document.createElement('li');
        inGdiv.className = 'ing-div';

        const ingInfo = `
        <img src="${element.strMealThumb}">
        <h2>${element.strMeal}</h2>
        <h5>Ingredients</h5>
        `
        const ingredientsArry = [];

        for (let i = 1; i <= 20; i++) {
            if (element[`strIngredient${i}`]) {
                ingredientsArry.push(
                    `${element[`strMeasure${i}`]} ${element[`strIngredient${i}`]}`
                );
            }
            else break;
        }

        inGli.innerHTML = `
           ${ingredientsArry.map((inG) => `
           <li>
                <div class ="list-div">
                    <span class="icon-size"><i class="fa fa-check-square"></i></span> 
                    <span class="ing-size">${inG}</span>
                </div>
           </li>
           `).join('')}
        `
        inGdiv.innerHTML = ingInfo;
        ingredientDiv.appendChild(inGdiv);
        ul.appendChild(inGli);
    });
}


// ........Thanks for reading .......