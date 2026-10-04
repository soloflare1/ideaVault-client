
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import useAxiosSecure from "../hooks/useAxiosSecure";
import useAuth from "../hooks/useAuth";
import toast from "react-hot-toast";
import LoadingSpinner from "../components/LoadingSpinner";
import { MessageSquare, ArrowRight } from "lucide-react";

const MyInteractions = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const [ideas, setIdeas] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    document.title = "IdeaVault | My Interactions";
    if (user?.email) {
      fetchInteractions();
    }
  }, [user?.email]);

  const fetchInteractions = async () => {
    try {
      setLoading(true);
      const res = await axiosSecure.get(`/my-interactions?email=${user?.email}`);
   
      if (res.data && Array.isArray(res.data.commentedIdeas)) {
        setIdeas(res.data.commentedIdeas);
      }
    } catch (err) {
      console.error(err);
      toast.error("Failed to load interactions");
      setIdeas([]);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <LoadingSpinner />; 

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 transition-colors duration-300">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
        <div>
          <h2 className="text-2xl font-black text-slate-900 dark:text-white tracking-tight">
            My Interactions
          </h2>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
            Ideas you have commented on or engaged with.
          </p>
        </div>
        <span className="px-3.5 py-1.5 bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 text-xs font-bold rounded-full border border-indigo-100 dark:border-indigo-900/40">
          Total: {ideas.length}
        </span>
      </div>

      {ideas.length === 0 ? (
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-12 text-center max-w-lg mx-auto shadow-sm">
          <div className="w-12 h-12 bg-indigo-50 dark:bg-indigo-950/50 rounded-2xl flex items-center justify-center text-indigo-600 dark:text-indigo-400 mx-auto mb-4">
            <MessageSquare size={24} />
          </div>
          <h3 className="text-lg font-bold text-slate-900 dark:text-white">No interactions yet</h3>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-2 mb-6">
            Explore community ideas and share your comments.
          </p>
          <Link
            to="/ideas"
            className="inline-flex items-center gap-2 bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold px-5 py-2.5 rounded-xl transition-all shadow-md shadow-indigo-600/20"
          >
            Explore Ideas <ArrowRight size={14} />
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {ideas.map((idea) => (
            <div
              key={idea._id}
              className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 flex flex-col justify-between hover:border-indigo-500 dark:hover:border-indigo-500 transition-all shadow-sm hover:shadow-md"
            > 

            <div>
                <span className="text-[11px] bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 px-2.5 py-1 rounded-full font-bold tracking-wide">
                  {idea.category}
                </span>
                <h3 className="font-bold text-base text-slate-900 dark:text-white mt-3 line-clamp-1">
                  {idea.title}
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-2 line-clamp-2 leading-relaxed">
                  {idea.shortDescription}
                </p>
              </div>
              <Link
                to={`/ideas/${idea._id}`}
                className="mt-6 flex items-center justify-center gap-1.5 bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold py-2.5 rounded-xl transition-all shadow-md shadow-indigo-600/20"
              >
                View Discussion <ArrowRight size={14} />
              </Link>
            </div>
          ))}
          </div>
          )}
          </div>
  );
};

export default MyInteractions;  
