
import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import useAxiosSecure from "../hooks/useAxiosSecure";
import useAuth from "../hooks/useAuth";
import toast from "react-hot-toast";
import {
  ArrowLeft,
  Lightbulb,
  MessageSquare,
  Trash2,
  Edit2,
  User,
  DollarSign,
  Target,
} from "lucide-react";
import LoadingSpinner from "../components/LoadingSpinner";

const IdeaDetails = () => {
  const { id } = useParams();
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const [idea, setIdea] = useState(null);
  const [comments, setComments] = useState([]);
  const [commentText, setCommentText] = useState("");
  const [editingCommentId, setEditingCommentId] = useState(null);
  const [editText, setEditText] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (id) {
      fetchIdeaAndComments();
    }
  }, [id]);

  const fetchIdeaAndComments = async () => {
    try {
      setLoading(true);
      const [ideaRes, commentsRes] = await Promise.all([
        axiosSecure.get(`/ideas/${id}`). catch(() => axios.get(`http://localhost:5000/ideas/${id}`)),
        axiosSecure.get(`/comments/${id}`).catch(() => ({ data: [] })),
      ]);

      setIdea(ideaRes.data);
      setComments(commentsRes.data || []);
      document.title = `IdeaVault | ${ideaRes.data?.title || "Idea Details"}`;
    } catch (err) {
      console.error(err);
      toast.error("Failed to load idea details");
    } finally {
      setLoading(false);
    } 

  };


  const handleUpvote = async () => {
    if (!user) return toast.error("Please login to upvote!");
    try {
      const res = await axiosSecure.patch(`/ideas/${id}/upvote`);
      if (res.data.isUpvoted) {
        toast.success("Upvoted idea!");
      } else {
        toast.success("Removed upvote!");
      }
      fetchIdeaAndComments();
    } catch (err) {
      toast.error("Failed to update upvote");
    }
  };  

  const handleAddComment = async (e) => {
    e.preventDefault();
    if (!user) return toast.error("Please login to comment!");
    if (!commentText.trim()) return;

    try {
      const newComment = {
        ideaId: id,
        text: commentText,
        userName: user?.displayName || "User",
        userEmail: user?.email,
        userPhoto: user?.photoURL,
      };

      await axiosSecure.post("/comments", newComment);
      toast.success("Comment added!");  
      setCommentText("");
      fetchIdeaAndComments();
    } catch (err) {
      toast.error("Failed to post comment");
    }
  };
 
  
  const handleDeleteComment = async (commentId) => {
    try {
      await axiosSecure.delete(`/comments/${commentId}`);
      toast.success("Comment deleted!");
      fetchIdeaAndComments();
    }
    catch (err) {
      toast.error("Failed to delete comment");
    }
  };  


  const handleUpdateComment = async (commentId) => {
    if (!editText.trim()) return toast.error("Comment cannot be empty!");
    try {
      await axiosSecure.patch(`/comments/${commentId}`, { text: editText });
      toast.success("Comment updated!");
      setEditingCommentId(null);
      fetchIdeaAndComments();
    }
    catch (err) {
      try {
        await axiosSecure.put(`/comments/${commentId}`, { text: editText });
        toast.success("Comment updated!");
        setEditingCommentId(null);
        fetchIdeaAndComments();
      } catch (error) {
        try {
          await axiosSecure.post(`/comments/${commentId}`, { text: editText });
          toast.success("Comment updated!");
          setEditingCommentId(null);
          fetchIdeaAndComments();
        } catch (error) {
          toast.error("Failed to update comment");
        }
      }
    }
  };

  if (loading) return <LoadingSpinner />;
  if (!idea) return <div className="text-center py-12 font-semibold">Idea not found.</div>;

  const isUpvoted = idea.upvotedBy?.includes(user?.email);


  return (
    <div className="max-w-4xl mx-auto space-y-8 pb-12 pt-6">
      <Link
        to="/ideas"
        className="inline-flex items-center gap-1.5 text-xs font-semibold text-indigo-600 hover:underline"
      >
        <ArrowLeft size={16} /> Back to Ideas
      </Link>

      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 md:p-8 space-y-6">
        <img
          src={idea.imageUrl || idea.image || "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800"}
          alt={idea.title}
          className="w-full h-72 object-cover rounded-2xl"
        />  

        <div className="flex flex-wrap items-center justify-between gap-4">
          <span className="px-3.5 py-1 rounded-full bg-indigo-50 dark:bg-indigo-950 text-indigo-600 dark:text-indigo-400 font-semibold text-xs border border-indigo-200 dark:border-indigo-800">
            {idea.category}
          </span>

          <button
            onClick={handleUpvote}
            className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-xl font-semibold text-xs transition-all ${
              isUpvoted
                ? "bg-amber-500 text-white shadow-md shadow-amber-500/20"
                : "bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-amber-100"  
            }`}
          >
            <Lightbulb size={16} />
            {isUpvoted ? "Upvoted" : "Upvote Idea"} ({idea.upvotesCount || 0})
          </button>
        </div>
 
          <h1 className="text-2xl md:text-4xl font-extrabold text-slate-900 dark:text-white">{idea.title}</h1>

          <div className="flex flex-wrap items-center gap-6 text-xs text-slate-400 dark:text-slate-500 border-y border-slate-100 dark:border-slate-800 py-3">
            <span className="inline-flex items-center gap-1">
              <User size={14} /> {idea.authorName || idea.authorEmail || "Anonymous"}
            </span>
            {(idea.estimatedBudget || idea.budget) && (
              <span className="inline-flex items-center gap-1">
                <DollarSign size={14} /> Budget: ${idea.estimatedBudget || idea.budget}
              </span>
            )}
            {idea.targetAudience && (
              <span className="inline-flex items-center gap-1">
                <Target size={14} /> Target: {idea.targetAudience}
              </span>
            )}
          </div>

          <div className="space-y-4">
            {idea.problemStatement && (
              <div>
                <h3 className="font-bold text-sm text-indigo-500 mb-1">Problem Statement</h3>
                <p className="text-sm text-slate-600 dark:text-slate-300">{idea.problemStatement}</p>
              </div>
            )}
            {idea.proposedSolution && (
              <div>
                <h3 className="font-bold text-sm text-indigo-500 mb-1">Proposed Solution</h3>
                <p className="text-sm text-slate-600 dark:text-slate-300">{idea.proposedSolution}</p>
              </div>  
            )}

          <div>
            <h3 className="font-bold text-sm text-indigo-500 mb-1">Detailed Description</h3>
            <p className="text-sm text-slate-600 dark:text-slate-300">
              {idea.detailedDescription || idea.shortDescription || "No detailed description provided."}
            </p>
          </div>
          </div>
          </div>

          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 md:p-8 space-y-6">
        <h3 className="text-xl font-bold flex items-center gap-2">
          <MessageSquare size={20} /> Community Discussion ({comments.length})
        </h3>

        <form onSubmit={handleAddComment} className="space-y-3">
          <textarea
            rows="3"
            value={commentText}
            onChange={(e) => setCommentText(e.target.value)}
            placeholder="Share feedback or suggest improvements..."
            className="w-full p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
            required
          />


         <button
            type="submit"
            className="px-5 py-2.5 rounded-xl bg-indigo-600 text-white font-semibold text-xs hover:bg-indigo-500 transition-colors cursor-pointer"
          >
            Post Comment
          </button>


        </form>
        <div className="space-y-4 pt-4 border-t border-slate-100 dark:border-slate-800">
          {comments.map((comment) => (
            <div
              key={comment._id}
              className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-950/60 border border-slate-100 dark:border-slate-800/80 space-y-2"
            >
              <div className="flex items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  <img
                    src={comment.userPhoto || "https://i.ibb.co/mJRq84n/user.png"}
                    alt={comment.userName}
                    className="w-7 h-7 rounded-full object-cover"
                  />

                  <div>
                    <span className="font-bold text-xs block">{comment.userName}</span>
                    <span className="text-[10px] text-slate-400">
                      {comment.createdAt ? new Date(comment.createdAt).toLocaleDateString() : "Recently"}
                    </span>
                  </div>
                </div>

                {comment.userEmail === user?.email && (
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => {
                        setEditingCommentId(comment._id);
                        setEditText(comment.text);
                      }}
                      className="text-slate-400 hover:text-indigo-500 cursor-pointer"
                    >
                      <Edit2 size={14} />
                    </button>
                    <button
                      onClick={() => handleDeleteComment(comment._id)}
                      className="text-slate-400 hover:text-rose-500 cursor-pointer"
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                )}
              </div>

              {editingCommentId === comment._id ? (
                <div className="space-y-2 pt-2">
                  <input
                    type="text"
                    value={editText}
                    onChange={(e) => setEditText(e.target.value)}
                    className="w-full p-2 text-xs rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900"
                  />
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleUpdateComment(comment._id)}
                      className="px-3 py-1 bg-indigo-600 text-white text-[11px] rounded-md font-semibold cursor-pointer"
                    >
                      Save
                    </button>
                    <button
                      onClick={() => setEditingCommentId(null)}
                      className="px-3 py-1 bg-slate-300 dark:bg-slate-700 text-[11px] rounded-md font-semibold cursor-pointer"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              ) : (
                <p className="text-xs text-slate-600 dark:text-slate-300">{comment.text}</p>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default IdeaDetails;

                    
       