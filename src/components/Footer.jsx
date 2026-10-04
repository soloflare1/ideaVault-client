import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="w-full bg-slate-900 text-slate-400 text-xs border-t border-slate-800 py-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
  
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          
     
          <div className="space-y-2">
            <Link to="/" className="text-base font-bold text-white">
              Idea<span className="text-indigo-400">Vault</span>
            </Link>
            <p className="text-slate-400 leading-relaxed">
              Open platform to share, validate, and scale startup concepts.
            </p>
          </div>

       
          <div className="space-y-2">
            <h4 className="font-semibold text-white uppercase tracking-wider text-[11px]">Platform</h4>
            <ul className="space-y-1">
              <li><Link to="/ideas" className="hover:text-indigo-400 transition-colors">Explore Ideas</Link></li>
              <li><Link to="/add-idea" className="hover:text-indigo-400 transition-colors">Submit Idea</Link></li>
              <li><Link to="/my-ideas" className="hover:text-indigo-400 transition-colors">My Ideas</Link></li>
              <li><Link to="/my-interactions" className="hover:text-indigo-400 transition-colors">My Activity</Link></li>
            </ul>
          </div>

          <div className="space-y-2">
            <h4 className="font-semibold text-white uppercase tracking-wider text-[11px]">Contact Info</h4>
            <ul className="space-y-1 text-slate-400">
              <li>Tech Innovation Hub, USA</li>
              <li>
                <a href="mailto:support@ideavault.com" className="hover:text-indigo-400 transition-colors">
                  support@ideavault.com
                </a>
              </li>
              <li>
                <a href="tel:+18005554332" className="hover:text-indigo-400 transition-colors">
                  +1 (800) 555-IDEA
                </a>
              </li>
            </ul>
          </div>
          
          <div className="space-y-2">
            <h4 className="font-semibold text-white uppercase tracking-wider text-[11px]">Connect</h4>
            <div className="flex flex-col space-y-1">
              <a href="https://github.com" target="_blank" rel="noreferrer" className="hover:text-indigo-400 transition-colors">
                GitHub
              </a>
              <a href="https://x.com" target="_blank" rel="noreferrer" className="hover:text-indigo-400 transition-colors">
                X / Twitter
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noreferrer" className="hover:text-indigo-400 transition-colors">
                LinkedIn
              </a>
            </div>
          </div>

        </div>

        <div className="border-t border-slate-800/80 pt-4 flex flex-col sm:flex-row items-center justify-between gap-2 text-slate-500 text-[11px]">
          <p> &copy; {new Date().getFullYear()} IdeaVault Inc. All rights reserved.</p>
          <div className="flex gap-4">
            <a href="#privacy" className="hover:text-slate-400 transition-colors">Privacy Policy</a>
            <a href="#terms" className="hover:text-slate-400 transition-colors">Terms of Service</a>
          </div>
        </div>

      </div>
    </footer>
  ); 
};

export default Footer;