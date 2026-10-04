import React, { useState, useContext } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { Lightbulb, Sun, Moon, Menu, X, LogOut, User } from "lucide-react";
import { AuthContext } from "../providers/AuthProvider";
import { useTheme } from "../contexts/ThemeContext"; 

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { user, logOut } = useContext(AuthContext);
  const { theme, toggleTheme } = useTheme(); 
  const navigate = useNavigate();

  const toggleMenu = () => setIsOpen(!isOpen);
  const closeMenu = () => setIsOpen(false);

  const handleLogoutClick = async () => {
    try {
      if (logOut) await logOut();
      closeMenu();
      navigate("/login");
    } catch (err) {
      console.error("Logout failed:", err);
    }
  };

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Ideas", path: "/ideas" },
    ...(user
      ? [
          { name: "Add Idea", path: "/add-idea" },
          { name: "My Ideas", path: "/my-ideas" },
          { name: "My Activity", path: "/my-interactions" },
        ]
      : []),
  ];

  return (
    <header className="sticky top-0 z-50 bg-white/90 dark:bg-slate-900/90 backdrop-blur-md border-b
     border-slate-200 dark:border-slate-800 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
      
          <Link to="/" onClick={closeMenu} className="flex items-center gap-2">
            <div className="p-2 bg-indigo-600 rounded-xl text-white shadow-md shadow-indigo-600/30">
              <Lightbulb size={20} />
            </div>
            <span className="text-xl font-black text-slate-900 dark:text-white tracking-tight">
              IdeaVault
            </span>
          </Link>

          <nav className="hidden md:flex items-center gap-6">
            {navLinks.map((link) => (
              <NavLink
                key={link.path}
                to={link.path}
                className={({ isActive }) =>
                  `text-sm font-semibold transition-colors ${
                    isActive
                      ? "text-indigo-600 dark:text-indigo-400"
                      : "text-slate-600 hover:text-slate-900 dark:text-slate-300 dark:hover:text-white"
                  }`
                }
              >
                {link.name}
              </NavLink>
            ))}
          </nav>

   
          <div className="flex items-center gap-3">
        
            <button
              type="button"
              onClick={toggleTheme}
              className="p-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800
               dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 transition-all border
                border-slate-200 dark:border-slate-700 cursor-pointer"
              aria-label="Toggle Theme"
            >
              {theme === "dark" ? (
                <Sun size={18} className="text-amber-400" />
              ) : (
                <Moon size={18} className="text-slate-700" />
              )}
            </button>

            <div className="hidden md:flex items-center gap-3">
              {user ? (
                <div className="flex items-center gap-3">
                  <Link
                    to="/profile"
                    className="flex items-center gap-2 text-sm font-semibold text-slate-700 dark:text-slate-200
                     hover:text-indigo-600 dark:hover:text-indigo-400"
                  >
                    <User size={18} />
                    <span>{user.displayName || user.name || "Profile"}</span>
                  </Link>
                  <button
                    type="button"
                    onClick={handleLogoutClick}
                    className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-red-600
                     dark:text-red-400 bg-red-50 dark:bg-red-950/40 hover:bg-red-100
                      dark:hover:bg-red-900/40 rounded-lg border border-red-200
                       dark:border-red-800/40 transition-colors cursor-pointer"
                  >
                    <LogOut size={14} /> Logout
                  </button>
                </div>
              ) : (
                <>
                  <Link
                    to="/login"
                    className="px-4 py-2 text-sm font-semibold text-slate-700 dark:text-slate-200
                     hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
                  >
                    Login
                  </Link>
                  <Link
                    to="/register"
                    className="px-4 py-2 text-sm font-semibold text-white bg-indigo-600
                     hover:bg-indigo-500 rounded-xl shadow-md shadow-indigo-600/20 transition-all hover:scale-105"
                  >
                    Register
                  </Link>
                </>
              )}
            </div>

            <button
              type="button"
              onClick={toggleMenu}
              className="md:hidden p-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700
               dark:text-slate-200 border border-slate-200 dark:border-slate-700"
            >
              {isOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </div>

      {isOpen && (
        <div className="md:hidden bg-white dark:bg-slate-900 border-b border-slate-200
         dark:border-slate-800 px-4 pt-3 pb-6 space-y-3">
          {navLinks.map((link) => (
            <NavLink
              key={link.path}
              to={link.path}
              onClick={closeMenu}
              className={({ isActive }) =>
                `block px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                  isActive
                    ? "bg-indigo-50 dark:bg-indigo-950/50 text-indigo-600 dark:text-indigo-400 font-bold"
                    : "text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800"
                }`
              }
            >
              {link.name}
            </NavLink>
          ))}

          <div className="pt-3 border-t border-slate-200 dark:border-slate-800 flex flex-col gap-2">
            {user ? (
              <>
                <Link
                  to="/profile"
                  onClick={closeMenu}
                  className="w-full text-center py-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-800 
                  dark:text-slate-200 font-semibold text-sm"
                >
                  My Profile ({user.displayName || user.name || "User"})
                </Link>
                <button
                  type="button"
                  onClick={handleLogoutClick}
                  className="w-full text-center py-2 rounded-xl bg-red-600 text-white font-semibold text-sm"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  onClick={closeMenu}
                  className="w-full text-center py-2 rounded-xl border border-slate-200 dark:border-slate-700
                   text-slate-700 dark:text-slate-200 font-semibold text-sm"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  onClick={closeMenu}
                  className="w-full text-center py-2 rounded-xl bg-indigo-600 text-white font-semibold text-sm"
                >
                  Register
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;