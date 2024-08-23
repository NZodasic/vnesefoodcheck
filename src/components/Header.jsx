import React, { useState } from "react";
import { MdShoppingBasket } from "react-icons/md";
import { motion } from "framer-motion";
import { useNavigate, Link } from "react-router-dom";

import Logo from "../img/logo.png";
import Avatar from "../img/avatar.png";
import { useStateValue } from "../context/StateProvider";
import { actionType } from "../context/reducer";
import AuthForm from "./AuthForm";

const Header = () => {
  const [{ user, cartShow, cartItems }, dispatch] = useStateValue();
  const [showAuthForm, setShowAuthForm] = useState(false);
  const navigate = useNavigate();

  const handleAuth = (data) => {
    const userInfo = { email: data.email, token: data.access_token };
    dispatch({
      type: actionType.SET_USER,
      user: userInfo,
    });
    localStorage.setItem("user", JSON.stringify(userInfo));
    setShowAuthForm(false);
  };

  const logout = async () => {
    setShowAuthForm(false);
    localStorage.removeItem("user");
    dispatch({
      type: actionType.SET_USER,
      user: null,
    });
    // Optional: Call your backend to invalidate JWT
    try {
      await fetch("http://nnquanghomeserver.ddnsking.com:5000/logout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        }
      });
    } catch (error) {
      console.error("Error during logout:", error);
    }
  };

  const showCart = () => {
    dispatch({
      type: actionType.SET_CART_SHOW,
      cartShow: !cartShow,
    });
  };

  return (
    <header className="fixed z-50 w-screen h-20 p-3 px-4 md:p-5 md:px-16 bg-zinc-950">
      {/* desktop & tablet */}
      <div className="hidden md:flex w-full h-full items-center justify-between">
        <Link to={"/home"} className="flex items-center gap-2">
          <img src={Logo} className="w-16 object-cover" alt="logo" />
          <p className="text-white text-xl font-bold">Lashma</p>
        </Link>

        <div className="flex items-center gap-8">
          <motion.ul
            initial={{ opacity: 0, x: 200 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 200 }}
            className="flex items-center gap-24"
          >
            <li 
              onClick={() => navigate("/home")} 
              className="text-lg font-bold text-amber-300 hover:text-orange-900 duration-100 transition-all ease-in-out cursor-pointer">
              Home
            </li>
            <li 
              onClick={() => window.location.href = ("http://localhost:3000/upload")} 
              className="text-lg font-bold text-amber-300 hover:text--900 duration-100 transition-all ease-in-out cursor-pointer"
            >
              Scanning food
            </li>
            <li 
              onClick={() => window.location.href= "https://foodrecognition.vercel.app/calories"} 
              className="text-lg font-bold text-amber-300 hover:text-orange-900 duration-100 transition-all ease-in-out cursor-pointer"
            >
              Calories
            </li>
            <li
               onClick={() => navigate("/recipes")}
              className="text-lg font-bold text-amber-300 hover:text-orange-900 duration-100 transition-all ease-in-out cursor-pointer">
              Recipes
            </li>
          </motion.ul>

          <div className="relative">
            <motion.img
              whileTap={{ scale: 0.6 }}
              src={Avatar}
              className="w-10 min-w-[40px] h-10 min-h-[40px] drop-shadow-xl cursor-pointer rounded-full"
              alt="userprofile"
              onClick={() => navigate("/register")}
            />
          </div>
        </div>
      </div>

      {/* mobile */}
      <div className="flex items-center justify-between md:hidden w-full h-full">
        <div
          className="relative flex items-center justify-center"
          onClick={showCart}
        >
          <MdShoppingBasket className="text-textColor text-2xl cursor-pointer" />
          {cartItems && cartItems.length > 0 && (
            <div className="absolute -top-2 -right-2 w-5 h-5 rounded-full bg-black flex items-center justify-center">
              <p className="text-xs text-white font-semibold">
                {cartItems.length}
              </p>
            </div>
          )}
        </div>

        <Link to={"/home"} className="flex items-center gap-2">
          <img src={Logo} className="w-8 object-cover" alt="logo" />
          <p className="text-headingColor text-xl font-bold">City</p>
        </Link>

        <div className="relative">
          <motion.img
            whileTap={{ scale: 0.6 }}
            src={user ? user.photoURL : Avatar}
            className="w-10 min-w-[40px] h-10 min-h-[40px] drop-shadow-xl cursor-pointer rounded-full"
            alt="userprofile"
            onClick={() => setShowAuthForm(true)}
          />
        </div>
      </div>

      {showAuthForm && <AuthForm onClose={() => setShowAuthForm(false)} onAuth={handleAuth} />}
    </header>
  );
};

export default Header;
