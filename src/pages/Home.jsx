import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { ArrowRight,Sparkles,ShieldCheck,Lightbulb,ChevronLeft,ChevronRight,Layers,Rocket} from "lucide-react";
import LoadingSpinner from "../components/LoadingSpinner.jsx";

const bannerSlides = [
  {
    title: "Share Next-Gen Startup Concepts",
    subtitle: "Turn raw ideas into validated ventures with community feedback and peer collaboration.",
    image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=1920&auto=format&fit=crop",
    badge: "Startup Ecosystem"
  },
  {
    title: "Collaborate With Global Innovators",
    subtitle: "Connect with developers, designers, and mentors looking to build groundbreaking projects.",
    image: "https://images.unsplash.com/photo-1497215728101-856f4ea42174?q=80&w=1920&auto=format&fit=crop",
    badge: "Community Driven"
  },
  {
    title: "Validate & Pitch Ideas Faster",
    subtitle: "Get upvotes, meaningful suggestions, and market validation before writing code.",
    image: "https://images.unsplash.com/photo-1497366811353-6870744d04b2?q=80&w=1920&auto=format&fit=crop",
    badge: "Innovation Hub"
  }
];

const Home = () => {

  const [currentSlide, setCurrentSlide] = useState(0);
  const [trendingIdeas, setTrendingIdeas] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    document.title = "IdeaVault | Home - Startup Idea Sharing Platform";
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % bannerSlides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const fetchTrending = async () => {
      const BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";
      try {
        setLoading(true);
        let res;
        try {
          res = await axios.get(`${BASE_URL}/ideas`);
        }
        catch {
          res = await axios.get(`${BASE_URL}/api/ideas`);
        }
        const data = Array.isArray(res.data) ? res.data : res.data?.ideas || [];
        const sorted = data.sort((a, b) => (b.upvotesCount || b.upvotes || 0) - (a.upvotesCount || a.upvotes || 0));
        setTrendingIdeas(sorted.slice(0, 6));
      } catch (err) {
        console.error("Error loading trending ideas:", err);
        setTrendingIdeas([]);
      } finally {
        setLoading(false);
      }
    };

    fetchTrending();
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16 py-8">
      <section className="relative h-[480px] md:h-[540px] rounded-3xl overflow-hidden shadow-2xl border border-slate-200 dark:border-slate-800">
        {bannerSlides.map((slide, idx) => (
          <div
            key={idx}
            className={`absolute inset-0 transition-opacity duration-1000 bg-cover bg-center flex items-center justify-center ${
              idx === currentSlide ? "opacity-100 z-10" : "opacity-0 z-0"
            }`}
            style={{ backgroundImage: `url('${slide.image}')` }}
          >

            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/40 to-slate-950/60"></div>
            <div className="max-w-3xl mx-auto text-center px-6 space-y-6 relative z-20">
              <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 text-xs font-semibold backdrop-blur-md">
                <Sparkles size={14} /> {slide.badge}

                </span>
                <h1 className="text-3xl md:text-5xl font-black tracking-tight leading-tight text-white drop-shadow-md">
                  {slide.title}
                </h1>
                <p className="text-sm md:text-base text-slate-200 max-w-xl mx-auto font-medium drop-shadow-sm">
                  {slide.subtitle}
                </p>
                <div>
                  <Link
                    to="/ideas"
                    className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold shadow-lg shadow-indigo-600/30 transition-all hover:scale-105"
                  >
                    Explore Ideas <ArrowRight size={18} />
                  </Link>
                </div>
              </div>
            </div>
          ))}

          <button
            onClick={() => setCurrentSlide((prev) => (prev === 0 ? bannerSlides.length - 1 : prev - 1))}
            className="absolute left-4 top-1/2 -translate-y-1/2 z-30 p-3 rounded-full bg-slate-900/60 hover:bg-slate-900 text-white border border-white/20 backdrop-blur-md transition-all cursor-pointer"
          >
            <ChevronLeft size={20} />
          </button>
          <button
            onClick={() => setCurrentSlide((prev) => (prev + 1) % bannerSlides.length)}
            className="absolute right-4 top-1/2 -translate-y-1/2 z-30 p-3 rounded-full bg-slate-900/60 hover:bg-slate-900 text-white border border-white/20 backdrop-blur-md transition-all cursor-pointer"
          >
            <ChevronRight size={20} />
          </button>
        </section>

        

   
     <section className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 sm:p-8 md:p-10 space-y-8 shadow-sm">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-slate-200 dark:border-slate-800 pb-6">
          <div className="space-y-1">
             <div className="inline-flex items-center gap-2 text-indigo-600 dark:text-indigo-400 text-xs font-bold uppercase tracking-wider">
               <Sparkles size={14} /> Top Community Picks
             </div>
             <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white">
               Trending Innovations
             </h2>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
              Top voted community concepts driving early traction
            </p>
          </div>
          <Link
            to="/ideas"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-indigo-600 dark:text-indigo-400 font-semibold text-xs sm:text-sm hover:shadow-md transition-all w-fit"
          >
            View All Ideas <ArrowRight size={16} />
          </Link>
      </div>

         {loading ? (
          <LoadingSpinner />
        ) : trendingIdeas.length === 0 ? (
           <div className="text-center py-16 bg-slate-50 dark:bg-slate-800/40 border border-dashed rounded-2xl border-slate-300 dark:border-slate-800 space-y-3">
             <Lightbulb size={36} className="mx-auto text-slate-400" />
             <p className="text-slate-600 dark:text-slate-400 text-sm font-medium">No dynamic ideas found. Be the first to share one!</p>
             <Link
               to="/add-idea"
               className="inline-block text-xs font-semibold px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-500 transition-colors"
             >
               Post an Idea
             </Link>
           </div>
         ) : (
           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
             {trendingIdeas.map((idea) => (
               <div
                 key={idea._id}
                 className="group bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700/60 rounded-2xl overflow-hidden flex flex-col justify-between shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
               >
                 <div>
                   <div className="relative overflow-hidden h-48 bg-slate-200 dark:bg-slate-800">
                     <img
                       src={idea.imageUrl || idea.image || "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800"}
                       alt={idea.title}
                       className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                     />
                     <div className="absolute top-3 left-3">
                       <span className="px-3 py-1 rounded-full bg-slate-950/80 text-indigo-300 text-xs font-semibold backdrop-blur-md border border-white/10">
                         {idea.category || "General"}
                       </span>
                     </div>
                   </div>
                  
                   <div className="p-6 space-y-3">
                     <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
                       <span>By <strong className="text-slate-700 dark:text-slate-200">{idea.authorName || idea.user?.name || idea.userEmail || "Anonymous"}</strong></span>
                       <span className="flex items-center gap-1 font-bold text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-950/50 px-2.5 py-1 rounded-full border border-amber-200 dark:border-amber-800/50">
                         <Lightbulb size={13} /> {idea.upvotesCount ?? idea.upvotes ?? 0}
                       </span>
                     </div>

                     <h3 className="text-base font-bold text-slate-900 dark:text-white line-clamp-1 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                       {idea.title}
                     </h3>
                     <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 line-clamp-2 leading-relaxed">
                       {idea.shortDescription || idea.description || idea.problemStatement || "No description provided."}
                     </p>
                   </div>
                 </div>

                 <div className="px-6 pb-6 pt-2 border-t border-slate-200 dark:border-slate-700/50 flex items-center justify-between">
                   <span className="text-[11px] text-slate-400 font-medium">Validated Concept</span>
                   <Link
                     to={`/ideas/${idea._id}`}
                     className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold transition-colors shadow-md shadow-indigo-600/20"
                   >
                     View Details
                   </Link>
                 </div>
               </div>
             ))}
           </div>
         )}
       </section>

       <section className="bg-white dark:bg-slate-900/80 rounded-3xl p-8 border border-slate-200 dark:border-slate-800 space-y-6 shadow-sm">
         <div className="text-center max-w-xl mx-auto space-y-2">
           <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Explore Industry Sectors</h2>

           <p className="text-xs text-slate-500 dark:text-slate-400">
             Find ideas tailored to specific tech verticals
           </p> 
  
         </div>
         <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
           {[
             { name: "Artificial Intelligence", count: "120+ Ideas", icon: <Sparkles className="text-indigo-500" /> },
             { name: "FinTech & Banking", count: "85+ Ideas", icon: <ShieldCheck className="text-emerald-500" /> },
             { name: "Web3 & Cloud", count: "64+ Ideas", icon: <Layers className="text-purple-500" /> },
             { name: "Health & EcoTech", count: "90+ Ideas", icon: <Rocket className="text-amber-500" /> }
           ].map((cat, idx) => (
             <div key={idx} className="bg-slate-50 dark:bg-slate-800/50 p-5 rounded-2xl border border-slate-200/80 dark:border-slate-700/60 text-center space-y-2 transition-all hover:border-indigo-500/50">
               <div className="w-10 h-10 mx-auto rounded-xl bg-white dark:bg-slate-800 flex items-center justify-center border border-slate-200 dark:border-slate-700 shadow-sm">
                 {cat.icon}
               </div>
               <h4 className="font-semibold text-sm text-slate-900 dark:text-white">{cat.name}</h4>
               <p className="text-xs text-slate-500 dark:text-slate-400">{cat.count}</p>
             </div>
           ))}
         </div>
       </section>

    
       <section className="bg-white dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800 rounded-3xl p-8 md:p-12 text-center space-y-8 shadow-sm">
         <div className="max-w-2xl mx-auto space-y-3">
           <h2 className="text-2xl md:text-3xl font-extrabold text-slate-900 dark:text-white">Empowering Creators Worldwide</h2>
           <p className="text-xs md:text-sm text-slate-500 dark:text-slate-400">
             IdeaVault provides the creator infrastructure to turn raw concepts into venture-backed startups.
           </p>
         </div>
         <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
           <div className="p-6 bg-indigo-50/60 dark:bg-indigo-950/30 rounded-2xl border border-indigo-100 dark:border-indigo-900/50">
             <h3 className="text-3xl font-black text-indigo-600 dark:text-indigo-400">1,200+</h3>
             <p className="text-xs font-medium text-slate-600 dark:text-slate-400 mt-1">Submitted Ideas</p>
           </div>
           <div className="p-6 bg-purple-50/60 dark:bg-purple-950/30 rounded-2xl border border-purple-100 dark:border-purple-900/50">
             <h3 className="text-3xl font-black text-purple-600 dark:text-purple-400">8,500+</h3>
             <p className="text-xs font-medium text-slate-600 dark:text-slate-400 mt-1">Community Feedback</p>
           </div>
           <div className="p-6 bg-emerald-50/60 dark:bg-emerald-950/30 rounded-2xl border border-emerald-100 dark:border-emerald-900/50">
             <h3 className="text-3xl font-black text-emerald-600 dark:text-emerald-400">340+</h3>
             <p className="text-xs font-medium text-slate-600 dark:text-slate-400 mt-1">Team Collaborations</p>
           </div>
         </div>
       </section>
     </div>
   );
 };

 export default Home;