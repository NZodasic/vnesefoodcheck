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
{
    title: "Banh canh",
    ingredients: ["Bột gạo hoặc bột lọc", "Thịt (heo, gà, bò)", "Tôm", "Cua", "Chả cá", "Xương heo", "Hành tím", "Tỏi", "Nước mắm", "Muối", "Tiêu"],
    instructions: "Prepare thick noodles from rice or tapioca flour, cook in a rich broth with various toppings like meat, shrimp, and fish cake.",
    image: require('../img/banhcanh.png')
},
{
    title: "Banh chung",
    ingredients: ["Gạo nếp", "Đậu xanh", "Thịt heo", "Lá dong", "Hạt tiêu", "Hành tím", "Muối"],
    instructions: "Layer glutinous rice, mung beans, and pork in dong leaves, wrap tightly, and boil until the rice is tender.",
    image: require('../img/banhchung.png')
},
{
    title: "Banh cuon",
    ingredients: ["Bột gạo", "Thịt heo băm", "Mộc nhĩ", "Hành tím", "Nước mắm", "Chanh", "Đường", "Ớt"],
    instructions: "Steam thin rice sheets, fill with ground pork and wood ear mushrooms, and serve with sweet and sour fish sauce.",
    image: require('../img/banhcuon.png')
},
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
{
    title: "Banh canh",
    ingredients: ["Bột gạo hoặc bột lọc", "Thịt (heo, gà, bò)", "Tôm", "Cua", "Chả cá", "Xương heo", "Hành tím", "Tỏi", "Nước mắm", "Muối", "Tiêu"],
    instructions: "Prepare thick noodles from rice or tapioca flour, cook in a rich broth with various toppings like meat, shrimp, and fish cake.",
    image: "banhcanh.png"
},
{
    title: "Banh chung",
    ingredients: ["Gạo nếp", "Đậu xanh", "Thịt heo", "Lá dong", "Hạt tiêu", "Hành tím", "Muối"],
    instructions: "Layer glutinous rice, mung beans, and pork in dong leaves, wrap tightly, and boil until the rice is tender.",
    image: "banhchung.png"
},
{
    title: "Banh cuon",
    ingredients: ["Bột gạo", "Thịt heo băm", "Mộc nhĩ", "Hành tím", "Nước mắm", "Chanh", "Đường", "Ớt"],
    instructions: "Steam thin rice sheets, fill with ground pork and wood ear mushrooms, and serve with sweet and sour fish sauce.",
    image: "banhcuon.png"
},
{
    title: "Pho bo",
    ingredients: ["Bánh phở", "Thịt bò", "Xương bò", "Hành tím", "Gừng", "Quế", "Hồi", "Hành lá", "Rau thơm", "Nước mắm", "Chanh", "Ớt"],
    instructions: "Simmer beef bones to make broth, add spices, cook noodles separately, and assemble with beef slices, herbs, and broth.",
    image: "phobo.png"
},
{
    title: "Bun thit nuong",
    ingredients: ["Bún", "Thịt heo", "Rau sống", "Đậu phộng", "Hành phi", "Nước mắm", "Đường", "Tỏi", "Ớt"],
    instructions: "Grill marinated pork, serve over vermicelli noodles with fresh herbs, peanuts, fried shallots, and sweet and sour fish sauce.",
    image: "bunthitnuong.png"
},
{
    title: "Goi cuon",
    ingredients: ["Bánh tráng", "Tôm", "Thịt heo", "Rau sống", "Bún", "Đậu phộng", "Tỏi", "Nước mắm", "Đường"],
    instructions: "Assemble fresh rolls with shrimp, pork, herbs, and vermicelli, wrap in rice paper, and serve with peanut dipping sauce.",
    image: "goicuon.png"
},
{
    title: "Cha gio",
    ingredients: ["Bánh tráng", "Thịt heo", "Tôm", "Cà rốt", "Mộc nhĩ", "Miến", "Hành tím", "Trứng", "Nước mắm", "Dầu ăn"],
    instructions: "Fill rice paper with pork, shrimp, veggies, and vermicelli, roll, and deep fry until golden and crispy.",
    image: "chagio.png"
},
{
    title: "Com tam",
    ingredients: ["Cơm tấm", "Sườn nướng", "Bì", "Chả trứng", "Dưa leo", "Cà chua", "Nước mắm", "Đường", "Tỏi", "Ớt"],
    instructions: "Serve broken rice with grilled pork chop, shredded pork skin, egg meatloaf, and pickled vegetables with fish sauce.",
    image: "comtam.png"
}
];

const RecipesPage = () => {
  const [filteredRecipes, setFilteredRecipes] = useState(recipes);
  const [searchTerm, setSearchTerm] = useState('');

  // Update filtered recipes when search term changes
  useEffect(() => {
    const filtered = recipes.filter(recipe =>
      recipe.title.toLowerCase().includes(searchTerm) ||
      recipe.ingredients.some(ingredient => ingredient.toLowerCase().includes(searchTerm))
    );
    setFilteredRecipes(filtered);
  }, [searchTerm]);

  const handleSearch = (event) => {
    setSearchTerm(event.target.value.toLowerCase());
  };

  const displayRecipes = (recipesToDisplay) => {
    return recipesToDisplay.map(recipe => (
      <div className="recipe" key={recipe.title}>
        <img src={recipe.image} alt={recipe.title} />
        <h3>{recipe.title}</h3>
        <h4>Ingredients</h4>
        <ul>
          {recipe.ingredients.map((ingredient, index) => (
            <li key={index}>{ingredient}</li>
          ))}
        </ul>
        <h4>Instructions</h4>
        <p>{recipe.instructions}</p>
      </div>
    ));
  };

  return (
    <div>
      <main>
        <section id="home">
          <h2>Welcome to the Vnese Recipe Book</h2>
        </section>
        <div className="search-container">
          <input
            type="text"
            id="search-input"
            placeholder="Search recipes..."
            onChange={handleSearch}
          />
        </div>
        <section id="recipes">
          <h2>Recipes</h2>
          <div id="recipe-list">
            {displayRecipes(filteredRecipes)}
          </div>
        </section>
      </main>
    </div>
  );
};

export default RecipesPage;
