import React, { useState, useEffect } from 'react';
import './RecipesPage.css'; // Import the CSS file

const recipes = [
  {
    title: "Banh beo",
    ingredients: ["Bột gạo", "Tôm", "Hành lá", "Nước mắm", "Chanh", "Đường", "Ớt"],
    instructions: "Steam the rice flour batter, top with shrimp, scallions, and serve with sweet and sour fish sauce.",
    image: require('../img/banhbeo.png') 
},
{
    title: "Banh bot loc",
    ingredients: ["Bột năng", "Tôm", "Thịt ba chỉ", "Hành tím", "Tỏi", "Nước mắm", "Tiêu", "Lá chuối"],
    instructions: "Make the tapioca dough, fill with shrimp and pork, wrap in banana leaves, and steam until cooked.",
    image: require('../img/banhbotloc.png')
},
{
    title: "Banh can",
    ingredients: ["Bột gạo", "Tôm", "Mực", "Trứng", "Hành lá", "Nước mắm", "Mỡ heo"],
    instructions: "Cook the rice flour batter in clay molds, add shrimp, squid, or egg, and top with scallions.",
    image: require('../img/banhcan.png')
},


];

const RecipesPage = () => {
  const [filteredRecipes, setFilteredRecipes] = useState(recipes);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    // Lọc công thức dựa trên tiêu đề khi từ khóa tìm kiếm thay đổi
    const filtered = recipes.filter(recipe => {
      const titleMatch = recipe.title.toLowerCase().includes(searchTerm.toLowerCase());
      return titleMatch;
    });
    setFilteredRecipes(filtered);
  }, [searchTerm]);

  const handleSearch = () => {
    const filtered = recipes.filter(recipe => {
      if (searchTerm.trim() === '') {
        return true; // Hiển thị tất cả công thức nếu ô tìm kiếm trống
      }
      
      const titleMatch = recipe.title.toLowerCase().includes(searchTerm.toLowerCase());
      if (titleMatch) {
        return true; // Hiển thị công thức nếu tiêu đề khớp với từ khóa tìm kiếm
      }
      
      return false; // Không hiển thị công thức nếu tiêu đề không khớp
    });
    setFilteredRecipes(filtered);
  };

  return (
    <div>
      <main>
        <section id="home">
          <h2>Welcome to Vietnamese food recipes</h2>
        </section>
        <div className="search-container">
          <input
            type="text"
            id="search-input"
            placeholder="Search recipes by name..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button onClick={handleSearch}>Tìm kiếm</button>
        </div>
        <section id="recipes">
          <h2>How to make</h2>
          <div id="recipe-list">
            {filteredRecipes.map(recipe => (
              <div className="recipe" key={recipe.title}>
                <img src={recipe.image} alt={recipe.title} />
                <h3>{recipe.title}</h3>
                <h4>Require...</h4>
                <ul>
                  {recipe.ingredients.map((ingredient, index) => (
                    <li key={index}>{ingredient}</li>
                  ))}
                </ul>
                <h4>Tutorial</h4>
                <p>{recipe.instructions}</p>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
};

export default RecipesPage;
