import React, { useState, useEffect } from "react";

const AuthForm = ({ onClose, onAuth }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState(""); // State for username
  const [isSignup, setIsSignup] = useState(false);
  const [imageFile, setImageFile] = useState(null);
  const [avatarUrl, setAvatarUrl] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const storedAuthData = JSON.parse(localStorage.getItem("authData"));
    if (storedAuthData) {
      setIsAuthenticated(true);
      setAvatarUrl(storedAuthData.avatarUrl);
      setUsername(storedAuthData.username); // Set username from stored data
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const authResponse = await fetch(
        `http://127.0.0.1:5000/${isSignup ? "signup" : "logintoken"}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email, password, username }), // Include username in request body
        }
      );

      if (authResponse.ok) {
        const authData = await authResponse.json();
        onAuth(authData);
        setIsAuthenticated(true);

        if (imageFile) {
          const formData = new FormData();
          formData.append("avatar", imageFile);

          const uploadResponse = await fetch(
            "http://127.0.0.1:5000/upload_avatar",
            {
              method: "POST", 
              headers: {
                Authorization: `Bearer ${authData.access_token}`,
              },
              body: formData,
            }
          );

          if (uploadResponse.ok) {
            const uploadData = await uploadResponse.json();
            setAvatarUrl(uploadData.avatar_url);
            authData.avatarUrl = uploadData.avatar_url;
            localStorage.setItem("authData", JSON.stringify(authData));
          } else {
            alert("Avatar upload failed: " + uploadResponse.statusText);
          }
        }

        // Store authData including username
        localStorage.setItem("authData", JSON.stringify(authData));
      } else {
        alert("Authentication failed: " + authResponse.statusText);
      }
    } catch (error) {
      console.error("Error during authentication:", error);
      alert("An error occurred. Please try again.");
    }
  };

  const handleFileChange = (e) => {
    setImageFile(e.target.files[0]);
  };

  const handleLogout = () => {
    localStorage.removeItem("authData");
    setIsAuthenticated(false);
    setAvatarUrl(null);
    setUsername(""); // Clear username on logout
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white p-4 rounded shadow-lg w-80">
        
        {isAuthenticated ? (
          <div className="text-center">
            <h2 className="text-xl mb-4">Welcome, {username || email}</h2>
            {avatarUrl && (
              <img
                src={avatarUrl}
                alt="Avatar"
                className="w-24 h-24 rounded-full mx-auto mb-4"
              />
            )}
            <button
              onClick={handleLogout}
              className="bg-red-500 text-white px-4 py-2 rounded"
            >
              Log Out
            </button>
          </div>
        ) : (
          <>
            <h2 className="text-xl mb-4">{isSignup ? "Sign Up" : "Log In"}</h2>
            <form onSubmit={handleSubmit}>
              {isSignup && (
                <label className="block mb-2">
                  Username:
                  <input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="block w-full border border-gray-300 rounded p-2"
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
                  className="block w-full border border-gray-300 rounded p-2"
                  required
                />
              </label>
              <label className="block mb-4">
                Password:
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="block w-full border border-gray-300 rounded p-2"
                  required
                />
              </label>
              {isSignup && (
                <label className="block mb-4">
                  Upload Avatar:
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                    className="block w-full border border-gray-300 rounded p-2"
                  />
                </label>
              )}
              <button
                type="submit"
                className="bg-blue-500 text-white px-4 py-2 rounded"
              >
                {isSignup ? "Sign Up" : "Log In"}
              </button>
              <button
                type="button"
                onClick={() => setIsSignup(!isSignup)}
                className="ml-4 text-blue-500 underline"
              >
                {isSignup ? "Switch to Log In" : "Switch to Sign Up"}
              </button>
            </form>
            <button
              type="button"
              onClick={onClose}
              className="mt-4 text-red-500 underline"
            >
              Close
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default AuthForm;
