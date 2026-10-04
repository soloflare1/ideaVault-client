
import React, { useEffect, useState } from "react";
import useAxiosSecure from "../hooks/useAxiosSecure";
import useAuth from "../hooks/useAuth";
import toast from "react-hot-toast";
import LoadingSpinner from "../components/LoadingSpinner";

const MyIdeas = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const [ideas, setIdeas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedIdea, setSelectedIdea] = useState(null);

  const fetchMyIdeas = async () => {
    try {
      setLoading(true);
      const res = await axiosSecure.get(`/my-ideas?email=${user?.email}`);
      setIdeas(res.data);
    } catch (err) {
      toast.error("Failed to load ideas");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    document.title = "IdeaVault | My Ideas";
    if (user?.email) {
      fetchMyIdeas();
    }
  }, [user?.email, axiosSecure]);

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this idea?")) {
      try {
        await axiosSecure.delete(`/ideas/${id}`);
        toast.success("Idea deleted successfully!");
        fetchMyIdeas();
      } catch (err) {
        toast.error("Failed to delete idea");
      }
    }
  };

  const handleUpdateSubmit = async (e) => {
    e.preventDefault();
    try {
      await axiosSecure.put(`/ideas/${selectedIdea._id}`, selectedIdea);
      toast.success("Idea updated successfully!");
      setSelectedIdea(null);
      fetchMyIdeas();
    } catch (err) {
      toast.error("Failed to update idea");
    }
  };

  if (loading) return <LoadingSpinner />;

  return (
    <div className="max-w-6xl mx-auto p-4 py-8">
      <h2 className="text-2xl font-bold mb-6">My Posted Ideas ({ideas.length})</h2>

      {ideas.length === 0 ? (
        <div className="text-center py-12 text-slate-500">You haven't posted any ideas yet.</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {ideas.map((idea) => (
            <div key={idea._id} className="bg-white dark:bg-slate-900 border rounded-2xl p-5 flex flex-col justify-between">
              <div>
                <span className="text-xs bg-indigo-50 text-indigo-600 px-2.5 py-1 rounded-full font-bold">
                  {idea.category}
                </span>
                <h3 className="font-bold text-lg mt-3">{idea.title}</h3>
                <p className="text-sm text-slate-500 mt-2 line-clamp-2">{idea.shortDescription}</p>
              </div>

              <div className="flex items-center gap-3 mt-6 pt-3 border-t">
                <button
                  onClick={() => setSelectedIdea(idea)}
                  className="flex-1 py-2 bg-indigo-600 text-white rounded-lg text-xs font-semibold"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(idea._id)}
                  className="flex-1 py-2 bg-rose-600 text-white rounded-lg text-xs font-semibold"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {selectedIdea && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 max-w-lg w-full max-h-[90vh] overflow-y-auto">
            <h3 className="text-lg font-bold mb-4">Edit Startup Idea</h3>
            <form onSubmit={handleUpdateSubmit} className="space-y-4">
              <input
                type="text"
                value={selectedIdea.title}
                onChange={(e) => setSelectedIdea({ ...selectedIdea, title: e.target.value })}
                className="w-full p-3 border rounded-xl"
                placeholder="Title"
                required
              />
              <textarea
                value={selectedIdea.shortDescription}
                onChange={(e) => setSelectedIdea({ ...selectedIdea, shortDescription: e.target.value })}
                className="w-full p-3 border rounded-xl"
                placeholder="Short Description"
                rows="2"
                required
              />

              <textarea
                value={selectedIdea.detailedDescription}
                onChange={(e) => setSelectedIdea({ ...selectedIdea, detailedDescription: e.target.value })}
                className="w-full p-3 border rounded-xl"
                placeholder="Detailed Description"
                rows="4"
              />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <button
                  type="button"
                  onClick={() => setSelectedIdea(null)}
                  className="px-4 py-2 bg-slate-200 text-slate-700 rounded-lg text-xs font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-indigo-600 text-white rounded-lg text-xs font-semibold"
                >
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyIdeas;
