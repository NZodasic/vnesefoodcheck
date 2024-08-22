import React, { useState, useEffect } from "react";
import Avatar from "../img/avatar.png";
import { Link } from 'react-router-dom';
import { useNavigate } from "react-router-dom";

const AuthForm = ({ onClose, onAuth }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState(""); // State for username
  const [isSignup, setIsSignup] = useState(false);
  const [imageFile, setImageFile] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const storedAuthData = JSON.parse(localStorage.getItem("authData"));
    if (storedAuthData) {
      setIsAuthenticated(true);
      setUsername(storedAuthData.username || ""); // Set username from stored data
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const endpoint = `http://nnquanghomeserver.ddnsking.com:5000/${isSignup ? "signup" : "logintoken"}`;
      const authResponse = await fetch(endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password, username }), // Include username in request body
      });

      if (authResponse.ok) {
        const authData = await authResponse.json();
        onAuth(authData);
        setIsAuthenticated(true);

        if (isSignup && imageFile) {
          const formData = new FormData();
          formData.append("image", imageFile);

          const uploadResponse = await fetch("http://nnquanghomeserver.ddnsking.com:5000/upload_avatar", {
            method: "POST",
            headers: {
              Authorization: `Bearer ${authData.access_token}`,
            },
            body: formData,
          });

          if (uploadResponse.ok) {
            const uploadData = await uploadResponse.json();
            authData.avatarUrl = uploadData.avatar_url;
            // Update local storage with avatar URL
            localStorage.setItem("authData", JSON.stringify(authData));
          } else {
            alert("Avatar upload failed: " + uploadResponse.statusText);
          }
        } else {
          // Update local storage without avatar URL
          localStorage.setItem("authData", JSON.stringify(authData));
        }
      } else {
        alert("Authentication failed: " + authResponse.statusText);
      }
    } catch (error) {
      console.error("Error during authentication:", error);
    }
  };

  const handleFileChange = (e) => {
    setImageFile(e.target.files[0]);
  };

  const handleLogout = () => {
    localStorage.removeItem("authData");
    setIsAuthenticated(false);
    setUsername(""); // Clear username on logout
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-emerald-400 to-emerald-400 p-4 overflow-hidden">
      <div className="w-full max-w-md bg-white rounded-lg shadow-md p-6">
        {isAuthenticated ? (
          <div className="text-center">
            <h2 className="text-2xl mb-4">Welcome, {username || email}</h2>
            <img
              src={Avatar}
              className="w-24 h-24 rounded-full object-cover mx-auto"
              alt="avatar"
            />
            <button
              onClick={handleLogout}
              className="bg-red-500 text-black px-4 py-2 rounded mt-4"
            >
              Log Out
            </button>
            <button
              type="button"
              onClick={onClose}
              className="bg-red-500 text-black px-4 py-2 rounded mt-4"
            >
              Close
            </button>
          </div>
        ) : (
          <>
            <h1 className="text-4xl font-bold text-center text-black mb-4">
              {isSignup ? "Sign Up" : "Log In"}
            </h1>
            <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
              {isSignup && (
                <label className="block mb-2 text-black">
                  Username:
                  <input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="block w-full px-4 py-2 border border-gray-300 text-black rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                    required
                  />
                </label>
              )}
              <label className="block mb-2">
                Email:
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="block w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                  required
                />
              </label>
              <label className="block mb-4">
                Password:
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="block w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                  required
                />
              </label>
              {isSignup && (
                <label className="block mb-4">
                  Avatar:
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                    className="block w-full border border-gray-300 rounded-md p-2"
                  />
                </label>
              )}
              <button
                onClick={() => alert("Sign up sucessful")}
                type="submit"
                className="bg-purple-600 text-white font-bold py-2 rounded-md hover:bg-purple-700 transition duration-200"
              >
                {isSignup ? "Sign in" : "Sign up"}
              </button>
              <button 
                onClick={() => navigate("/home")}
                type="submit"
                className="bg-purple-600 text-white font-bold py-2 rounded-md hover:bg-purple-700 transition duration-200"
              >
                Sign in
              </button>
              <Link to="/home" className="text-center text-gray-600 mt-2">
                <p>
                  Already have an account? <span className="text-purple-600 hover:underline cursor-pointer">login here</span>.
                </p>
              </Link>
              {isSignup && (
                <div className="flex items-center mt-4">
                  <input 
                    type="checkbox" 
                    id="agree" 
                    className="w-4 h-4 text-purple-600 focus:ring-0 border-gray-300 rounded"
                  />
                  <label htmlFor="agree" className="ml-2 text-gray-600">
                    By continuing, I agree to the <span className="text-purple-600 hover:underline cursor-pointer">terms of use</span> & <span className="text-purple-600 hover:underline cursor-pointer">privacy policy</span>.
                  </label>
                </div>
              )}
              <label htmlFor="agree" className="ml-2 text-gray-600">
                            By continuing, I agree to the <span className="text-purple-600 hover:underline cursor-pointer">terms of use</span> & <span className="text-purple-600 hover:underline cursor-pointer">privacy policy</span>.
                        </label>
            </form>
          </>
        )}
      </div>
    </div>
  );
};

export default AuthForm;
