
import React from "react";

const Profile = ({ theme }) => {
  const isDark = theme === "dark";

  return (
    <div className={`min-h-screen py-12 px-4 transition-colors ${isDark ? "bg-slate-950 text-white" : "bg-slate-50 text-slate-800"}`}>
      <div className={`max-w-xl mx-auto p-8 rounded-3xl border shadow-xl ${isDark ? "bg-slate-900 border-slate-800" : "bg-white border-slate-200"}`}>
        <h1 className="text-2xl font-bold mb-6">Profile Management</h1>

        <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
          <div>
            <label className="block text-sm font-medium mb-1">Full Name</label>
            <input type="text" defaultValue="Nosratee Jahan Naba" className={`w-full p-3 rounded-xl border outline-none ${isDark ? "bg-slate-800 border-slate-700" : "bg-slate-50 border-slate-300"}`} />
          </div> 
          <div>
            <label className="block text-sm font-medium mb-1">Email</label>
            <input type="email" defaultValue="naba@ideavault.com" disabled className={`w-full p-3 rounded-xl border outline-none opacity-60 ${isDark ? "bg-slate-800 border-slate-700" : "bg-slate-100 border-slate-300"}`} />
          </div>
          <button className="w-full py-3 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold rounded-xl transition-all">
            Update Profile
          </button>
        </form>
      </div>
    </div>
  );
};

export default Profile;

