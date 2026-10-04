import React from "react";

export const LoadingSpinner = () => {
  return (
    <div className="flex justify-center items-center py-16">
      <div className="w-10 h-10 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin"></div>
    </div>
  );
};

export default LoadingSpinner;