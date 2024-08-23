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
    title: "Banh chung",
    ingredients: ["Gạo nếp", "Đậu xanh", "Thịt heo", "Lá dong", "Hạt tiêu", "Hành tím", "Muối"],
    instructions: "Wrap glutinous rice, mung beans, and pork in dong leaves, and boil until fully cooked.",
    image: require('../img/banhchung.png')
  },
  {
    title: "Banh cuon",
    ingredients: ["Bột gạo", "Thịt heo băm", "Mộc nhĩ", "Hành tím", "Nước mắm", "Chanh", "Đường", "Ớt"],
    instructions: "Spread thin rice batter, fill with minced pork and mushrooms, roll, and serve with sweet and sour fish sauce.",
    image: require('../img/banhcuon.png')
  },
  {
    title: "Banh duc",
    ingredients: ["Bột gạo", "Nước vôi trong", "Hành tím", "Nước mắm", "Chanh", "Đường", "Ớt"],
    instructions: "Make soft rice flour pudding, serve with fish sauce or fermented soybean sauce.",
    image: require('../img/banhcuon.png')
  },
  {
    title: "Banh gio",
    ingredients: ["Bột gạo", "Thịt heo băm", "Mộc nhĩ", "Nấm hương", "Hành tím", "Tỏi", "Nước mắm", "Tiêu", "Lá chuối"],
    instructions: "Wrap ground pork and mushrooms in rice flour dough, and steam in banana leaves until cooked.",
    image: require('../img/banhchung.png')
  },
  {
    title: "Banh khot",
    ingredients: ["Bột gạo", "Tôm", "Bột nghệ", "Hành lá", "Nước mắm", "Rau sống"],
    instructions: "Fry small rice flour cakes with turmeric and shrimp, serve with herbs and fish sauce.",
    image: require('../img/banhcan.png')
  },
  {
    title: "Banh mi",
    ingredients: ["Bột mì", "Men nở", "Đường", "Muối", "Sữa", "Bơ"],
    instructions: "Bake Vietnamese baguettes, and fill with various ingredients such as pâté, ham, grilled pork, and vegetables.",
    image: require('../img/banhmy.png')
  },
  {
    title: "Banh tet",
    ingredients: ["Gạo nếp", "Đậu xanh", "Thịt heo", "Lá chuối", "Hạt tiêu", "Hành tím", "Muối"],
    instructions: "Wrap glutinous rice, mung beans, and pork in banana leaves, and boil until fully cooked.",
    image: require('../img/banhchung.png')
  },
  {
    title: "Banh trang nuong",
    ingredients: ["Bánh tráng", "Trứng", "Xúc xích", "Khô bò", "Hành phi", "Tương ớt", "Sốt mayonnaise"],
    instructions: "Grill rice paper on charcoal, add toppings like eggs, sausage, dried beef, and scallions.",
    image: require('../img/bundaumamtom.png')
  },
  {
    title: "Banh xeo",
    ingredients: ["Bột gạo", "Tôm", "Thịt ba chỉ", "Giá đỗ", "Hành lá", "Nước mắm", "Rau sống"],
    instructions: "Make crispy rice flour pancakes with shrimp, pork, and bean sprouts, and serve with herbs and fish sauce.",
    image: require('../img/banhcan.png')
  },
  {
    title: "Bun bo Hue",
    ingredients: ["Bún", "Xương bò", "Thịt bò", "Chả cua", "Mắm ruốc", "Sả", "Ớt", "Rau thơm"],
    instructions: "Prepare rich beef broth with lemongrass and shrimp paste, serve with rice noodles, beef, and crab patties.",
    image: require('../img/bunbohue.png')
  },
  {
    title: "Bun dau mam tom",
    ingredients: ["Bún lá", "Đậu hũ", "Chả cốm", "Thịt heo luộc", "Lòng lợn", "Mắm tôm", "Rau sống", "Ớt, chanh"],
    instructions: "Serve rice vermicelli with fried tofu, pork, Vietnamese sausage, and shrimp paste with herbs.",
    image: require('../img/bundaumamtom.png')
  },
  {
    title: "Bun mam",
    ingredients: ["Bún", "Mắm cá linh hoặc cá sặc", "Thịt heo quay", "Chả cá", "Tôm", "Mực", "Rau sống"],
    instructions: "Make fermented fish broth, serve with rice noodles, roast pork, fish cake, shrimp, and squid.",
    image: require('../img/bundaumamtom.png')
  },
  {
    title: "Bun rieu",
    ingredients: ["Bún", "Cà chua", "Gạch cua", "Đậu hũ", "Riêu cua", "Thịt heo xay", "Rau sống"],
    instructions: "Prepare crab and tomato broth, serve with rice noodles, tofu, minced pork, and fresh herbs.",
    image: require('../img/bunbohue.png')
  },
]  

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
