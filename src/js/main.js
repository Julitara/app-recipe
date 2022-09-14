let result = document.getElementById('result');
let searchBtn = document.getElementById('search-btn');
let url = 'https://www.themealdb.com/api/json/v1/1/search.php?s=';



searchBtn.addEventListener('click', () => {

  let userInput = document.getElementById('user-input').value;
  if (userInput.lenght == 0) {
    result.innerHTML = `<h3 class="result__title_err">Input Field Cannot Be Empty</h3>`
  } else {
    fetch(url + userInput).then((response) =>
      response.json()).then(data => {
        let myMeal = data.meals[0];
        let count = 1;
        let ingredients = [];
        for (let i in myMeal) {
          let ingredient = '';
          let measure = '';
          if (i.startsWith('strIngredient') && myMeal[i]) {
            ingredient = myMeal[i];
            measure = myMeal['strMeasure' + count];
            count += 1;
            ingredients.push(`${measure} ${ingredient}`);
          }
        }

        result.innerHTML = `<img class="result__img" src=${myMeal.strMealThumb}>
    <div class="details">
      <h2 class="details__title_top">${myMeal.strMeal}</h2>
      <h4 class="details__title_bottom">${myMeal.strArea}</h4>
    </div>
    <div id="ingredient-container" class="ingredient-container"></div>
    <div id="recipe" class="recipe">
      <button id="hide-recipe" class="recipe__btn">X</button>
      <pre id="instructions" class="instructions">${myMeal.strInstructions}</pre>
    </div>
    <button id="show-recipe" class="recipe__btn_show">Show recipe</button>
    `;

        let ingredientContainer = document.getElementById('ingredient-container');
        let ingredientItem = document.createElement('ul');
        ingredientItem.classList.add('ingredient__item');
        let recipe = document.getElementById('recipe');
        let hideRecipe = document.getElementById('hide-recipe');
        let showRecipe = document.getElementById('show-recipe');

        ingredients.forEach((i) => {
          let ingredientList = document.createElement('li');
          ingredientList.classList.add('ingredient__list');
          ingredientList.innerHTML = i;
          ingredientItem.append(ingredientList);
          ingredientContainer.append(ingredientItem);
        });

        hideRecipe.addEventListener('click', () => {
          recipe.style.display = "none";
        });

        showRecipe.addEventListener('click', () => {
          recipe.style.display = "block";
        });
      }).catch(() => {
        result.innerHTML = `<h3 class="result__title_err">Invalid Input</h3>`
      })
  }
});


