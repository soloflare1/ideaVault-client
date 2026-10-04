import React, { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import LoadingSpinner from "./components/LoadingSpinner";

import Home from "./pages/Home";
import Ideas from "./pages/Ideas";
import IdeaDetails from "./pages/IdeaDetails";
import AddIdea from "./pages/AddIdea";
import MyIdeas from "./pages/MyIdeas";
import MyInteractions from "./pages/MyInteractions";
import Profile from "./pages/Profile";
import Login from "./pages/Login";
import Register from "./pages/Register";
import NotFound from "./pages/NotFound";
import PrivateRoute from "./routes/PrivateRoute";

const TitleManager = () => {
  const location = useLocation();

  useEffect(() => {
    const titles = {
      "/": "Home - Discover Startup Ideas",
      "/ideas": "Explore Startup Ideas",
      "/add-idea": "Submit New Startup Idea",
      "/my-ideas": "Manage My Ideas",
      "/my-interactions": "My Activity & Comments",
      "/profile": "User Profile",
      "/login": "Account Login",
      "/register": "Create Account",
    };

    document.title = titles[location.pathname] || "IdeaVault - Startup Platform";
  }, [location]);

  return null;
}

function App() {  
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem("theme") || "light";
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const root = document.documentElement;
    if (theme === "dark") {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
    localStorage.setItem("theme", theme);
  }, [theme]);  

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 300);
    return () => clearTimeout(timer);
  }, []);

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === "dark" ? "light" : "dark"));
  };

  return (
    <BrowserRouter>
      <TitleManager />
      <div className={`min-h-screen flex flex-col ${theme === "dark" ? "dark" : ""}`}>
        <div className="flex flex-col min-h-screen w-full bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100">
          <Navbar theme={theme} toggleTheme={toggleTheme} />

          <main className="flex-grow">
            {loading ? (
              <div className="flex justify-center items-center py-24">
                <LoadingSpinner />
              </div>
            ) : (
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/ideas" element={<Ideas />} />
                <Route path="/ideas/:id" element={<IdeaDetails />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />

                <Route path="/add-idea" element={<PrivateRoute><AddIdea /></PrivateRoute>} />
                <Route path="/my-ideas" element={<PrivateRoute><MyIdeas /></PrivateRoute>} />
                <Route path="/my-interactions" element={<PrivateRoute><MyInteractions /></PrivateRoute>} />
                <Route path="/profile" element={<PrivateRoute><Profile /></PrivateRoute>} />

                <Route path="*" element={<NotFound />} />
              </Routes>
            )}
          </main>

          <Footer />
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App; 

