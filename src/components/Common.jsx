import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";

export const useDocumentTitle = (title) => 
{
  const location = useLocation();
  useEffect(() => {
    document.title = title ? `${title} | IdeaVault` : "IdeaVault - Startup Ideas Platform";
  }, [title, location]);
};

export const LoadingSpinner = () => 
{
  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center gap-3">
      <div className="w-12 h-12 border-4 border-indigo-600/20 border-t-indigo-600 rounded-full animate-spin"></div>
      <p className="text-xs font-semibold text-slate-400 tracking-wider uppercase animate-pulse">
        Loading Content...
      </p>
    </div>
  );
};