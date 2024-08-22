import React, { useEffect } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import { CreateContainer, Header, MainContainer } from "./components";
import UploadPage from "./components/UploadPage";
import { useStateValue } from "./context/StateProvider";
import { getAllFoodItems } from "./utils/firebaseFunctions";
import { actionType } from "./context/reducer";
import RecipesPage from "./components/RecipesPage";
import AuthPage from "./components/AuthPage";

const App = () => {
  const [{ foodItems, user }, dispatch] = useStateValue();
  const navigate = useNavigate();

  const fetchData = async () => {
    await getAllFoodItems().then((data) => {
      dispatch({
        type: actionType.SET_FOOD_ITEMS,
        foodItems: data,
      });
    });
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    // Check if the current URL is localhost:3000 and redirect to /register
    const currentUrl = window.location.href;
    if (currentUrl === "https://foodrecognltion.vercel.app/") {
      navigate("/register");
    }
  }, [navigate]);

  return (
    <AnimatePresence exitBeforeEnter>
      <div className="w-screen h-auto flex flex-col bg-emerald-400">
        <Header />

        <main className="mt-14 md:mt-20 px-4 md:px-16 py-4 w-full">
          <Routes>
            <Route path="/home" element={<MainContainer />} />
            <Route path="/createItem" element={<CreateContainer />} />
            <Route path="/upload" element={<UploadPage />} />
            <Route path="/recipes" element={<RecipesPage />} />
            <Route path="/register" element={<AuthPage />} />
          </Routes>
        </main>
      </div>
    </AnimatePresence>
  );
};

export default App;
