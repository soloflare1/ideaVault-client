
import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { Home } from "lucide-react";


const NotFound = () => {
  useEffect(() => {
    document.title = "IdeaVault | Page Not Found";
  }, []); 

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 text-center bg-slate-50 dark:bg-slate-950 text-slate-800 dark:text-slate-100">
      <h1 className="text-8xl font-black text-indigo-600 mb-2">404</h1>
      <h2 className="text-2xl font-bold mb-2">Page Not Found</h2>

      <p className="text-xs text-slate-500 max-w-sm mb-6">
        The route you are trying to access does not exist or has been moved.
      </p>
      <Link to="/" className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-indigo-600 text-white text-xs font-semibold hover:bg-indigo-500">
        <Home size={16} /> Back to Home
      </Link>
    </div>
  );
};

export default NotFound;
