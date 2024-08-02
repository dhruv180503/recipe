const searchbox = document.querySelector('.searchbox');
const searchbtn = document.querySelector('.searchbtn');
const recipeContainer = document.querySelector('.recipe-container');
const recipeDetailsContent = document.querySelector('.recipe-details-content');
const recipeCloseBtn = document.querySelector('.recipe-close-Btn');

const fetchRecipes = async(query) => {
    try {
        const data = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`);
        const response = await data.json();
        
        recipeContainer.innerHTML = "Fetching Recipes..."; // Clear previous results

        if (response.meals) {
            recipeContainer.innerHTML = ""
            response.meals.forEach(meal => {
                const recipeDiv = document.createElement('div');
                recipeDiv.classList.add('recipe');
                recipeDiv.innerHTML = `
                    <img src="${meal.strMealThumb}" alt="${meal.strMeal}">
                    <h3>${meal.strMeal}</h3>
                    <p><span>${meal.strArea}Dish</span></p>
                    <p><span>Belongs To ${meal.strCategory} </span>Category</p>
                `;
                const button = document.createElement('button');
                button.textContent = "View Recipes";
                recipeDiv.appendChild(button);
                button.addEventListener('click', () => {
                    openRecipePopup(meal);
                })
                recipeContainer.appendChild(recipeDiv);
                
            });
        } else {
            recipeContainer.innerHTML = "<h6>No Recipes Found</h6>";
        }
    } catch (error) {
        console.error("Error fetching recipes:", error);
    }
};
const fetchIngredents = (meal) => {
    let ingredientList = "";
    for (let i = 1; i <= 20; i++){
        const ingredient = meal[`strIngredient${i}`];
        if (ingredient) {
            const measure = meal[`strMeasure${i}`]
            ingredientList += `<li> ${measure} ${ingredient}</li>`
        }
        else {
            break;
        }
        
    }
    return ingredientList;
}

const openRecipePopup = (meal) => {
    
    recipeDetailsContent.innerHTML = `
    <h2 class="recipename">${meal.strMeal}</h2> 
    <h3>Ingredents:</h3>
    <ul class="ingredients">${fetchIngredents(meal)}</ul>
    <div class="recipeInstructions">
    <h3>Instructions:</h3>
    <p >${meal.strInstructions}</p>
</div>
    `
        
    recipeDetailsContent.parentElement.style.display = 'block';
}
recipeCloseBtn.addEventListener('click', () => {
      recipeDetailsContent.parentElement.style.display = 'none';
 })

searchbtn.addEventListener('click', (e) => {
    e.preventDefault();
    const searchInput = searchbox.value.trim();
    if (searchInput) {
        fetchRecipes(searchInput);
    }
});
