
import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const Ideas = () => {
  const [ideas, setIdeas] = useState([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All Categories");

  const API_URL = import.meta.env.VITE_API_URL || "https://ideavault-server-nqa7.onrender.com";
  
  useEffect(() => {
    document.title = "IdeaVault | Explore Ideas";
    const fetchIdeas = async () => {  
      try {
        const res = await axios.get(
          `${API_URL}/ideas?search=${search}&category=${category}`
        );
        setIdeas(res.data);
      } catch (err) {
        console.error(err);
      }
    };

    const timer = setTimeout(() => {
      fetchIdeas();
    }, 300);

    return () => clearTimeout(timer);
  }, [search, category]);

  return (
    <div className="max-w-7xl mx-auto p-4 py-8">
      <div className="flex flex-col sm:flex-row gap-4 mb-8">
        <input
        type="text"  
        placeholder="Search ideas by title..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="p-3 border border-slate-200 dark:border-slate-800 rounded-xl w-full bg-white dark:bg-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-500"
      />  
      <select 
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        className="p-3 border border-slate-200 dark:border-slate-800 rounded-xl bg-white dark:bg-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-500"
      >
        <option value="All Categories">All Categories</option>
        <option value="Tech">Tech</option>
        <option value="Health">Health</option>
        <option value="AI">AI</option>
        <option value="Education">Education</option>
        <option value="FinTech">FinTech</option>
        <option value="E-commerce">E-commerce</option>
        <option value="SaaS">SaaS</option>
        <option value="AgriTech">AgriTech</option>
      </select>
      </div>  

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {ideas.map((idea) => (
          <div key={idea._id} className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-100 dark:border-slate-800 overflow-hidden hover:shadow-lg transition duration-300 flex flex-col justify-between"> 
          <div>
            <div className="h-48 w-full overflow-hidden bg-slate-100 dark:bg-slate-800">
              <img
                src={idea.imageUrl || idea.image || "https://images.unsplash.com/photo-1555066931-4365d14bab8c"}
                alt={idea.title}
                className="w-full h-full object-cover hover:scale-105 transition duration-300"
              />
            </div>

            <div className="p-5">
              <span className="text-xs bg-indigo-50 dark:bg-indigo-950 text-indigo-600 dark:text-indigo-400 px-2.5 py-1 rounded-full font-bold border border-indigo-100 dark:border-indigo-900">
                {idea.category}
              </span>
              <h3 className="font-bold text-lg mt-3 text-slate-800 dark:text-slate-100 line-clamp-1">
                {idea.title}
              </h3>
              <p className="text-sm text-slate-500 dark:text-slate-400 mt-2 line-clamp-2">
                {idea.shortDescription}
              </p>
            </div>
          </div>

          <div className="px-5 pb-5 pt-2 flex items-center justify-between border-t border-slate-100 dark:border-slate-800/80 mt-2">  
            <span className="text-xs font-medium text-slate-400">
              Budget:{" "}
              <strong className="text-slate-700 dark:text-slate-200 font-bold"> 
                ${idea.estimatedBudget || idea.budget || "N/A"} 
              </strong>
            </span> 
            <Link
              to={`/ideas/${idea._id}`}
              className="bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold px-4 py-2 rounded-lg transition"  
            >
              View Details
            </Link> 
          </div>
        </div>
        ))}
      </div>
    </div>
  );
};

export default Ideas;