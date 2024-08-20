const recipes = [
    {
        title: "Banh beo",
        ingredients: ["Bột gạo", "Tôm", "Hành lá", "Nước mắm", "Chanh", "Đường", "Ớt"],
        instructions: "Steam the rice flour batter, top with shrimp, scallions, and serve with sweet and sour fish sauce.",
        image: "banhbeo.png"
    },
    // Thêm các công thức khác ở đây...
];

function displayRecipes(recipesToDisplay) {
    const recipeList = document.getElementById('recipe-list');
    recipeList.innerHTML = recipesToDisplay.map(recipe => `
        <div class="recipe">
            <img src="img/${recipe.image}" alt="${recipe.title}">
            <h3>${recipe.title}</h3>
            <h4>Ingredients</h4>
            <ul>
                ${recipe.ingredients.map(ingredient => `<li>${ingredient}</li>`).join('')}
            </ul>
            <h4>Instructions</h4>
            <p>${recipe.instructions}</p>
        </div>
    `).join('');
}

function filterRecipes(event) {
    const query = event.target.value.toLowerCase();
    const filteredRecipes = recipes.filter(recipe => 
        recipe.title.toLowerCase().includes(query) || 
        recipe.ingredients.some(ingredient => ingredient.toLowerCase().includes(query))
    );
    displayRecipes(filteredRecipes);
}

document.addEventListener('DOMContentLoaded', () => {
    displayRecipes(recipes);

    const searchInput = document.getElementById('search-input');
    searchInput.addEventListener('input', filterRecipes);
});
