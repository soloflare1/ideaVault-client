import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useAxiosSecure from "../hooks/useAxiosSecure";
import useAuth from "../hooks/useAuth";
import toast from "react-hot-toast";

const categories = ["Tech", "Health", "AI", "Education", "FinTech", "E-commerce"];

const AddIdea = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();

  useEffect(() => {
    document.title = "IdeaVault | Submit New Idea";
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;

    const newIdea = {
      title: form.title.value,
      shortDescription: form.shortDescription.value,
      detailedDescription: form.detailedDescription.value,
      category: form.category.value,
      tags: form.tags.value,
      imageUrl: form.imageUrl.value,
      estimatedBudget: form.estimatedBudget.value,
      targetAudience: form.targetAudience.value,
      problemStatement: form.problemStatement.value,
      proposedSolution: form.proposedSolution.value,
      authorName: user?.displayName,
      authorEmail: user?.email,
      authorPhoto: user?.photoURL
    };

    try {
      const res = await axiosSecure.post("/ideas", newIdea);
      if (res.data.insertedId) {
        toast.success("Startup Idea Posted Successfully!");
        navigate("/my-ideas");
      }
    } catch (err) {
      toast.error("Failed to submit idea");
    }
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6 pb-12">
      <div className="space-y-1">
        <h1 className="text-2xl font-black">Submit Startup Concept</h1>
        <p className="text-xs text-slate-500">Fill out details to get community feedback and validation</p>
      </div>

      <form onSubmit={handleSubmit} className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-200 dark:border-slate-800 space-y-4">
        <div>
          <label className="text-xs font-bold block mb-1">Idea Title *</label>
          <input name="title" type="text" required className="w-full p-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-xs focus:ring-2 focus:ring-indigo-500 focus:outline-none" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="text-xs font-bold block mb-1">Category *</label>
            <select name="category" required className="w-full p-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-xs focus:ring-2 focus:ring-indigo-500 focus:outline-none">
              {categories.map((cat) => <option key={cat} value={cat}>{cat}</option>)}
            </select>
          </div>
          <div>
            <label className="text-xs font-bold block mb-1">Image URL *</label>
            <input name="imageUrl" type="url" required className="w-full p-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-xs focus:ring-2 focus:ring-indigo-500 focus:outline-none" />
          </div>
        </div>

        <div>
          <label className="text-xs font-bold block mb-1">Short Description *</label>
          <input name="shortDescription" type="text" required className="w-full p-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-xs focus:ring-2 focus:ring-indigo-500 focus:outline-none" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="text-xs font-bold block mb-1">Problem Statement</label>
            <input name="problemStatement" type="text" className="w-full p-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-xs focus:ring-2 focus:ring-indigo-500 focus:outline-none" />
          </div>
          <div>
            <label className="text-xs font-bold block mb-1">Proposed Solution</label>
            <input name="proposedSolution" type="text" className="w-full p-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-xs focus:ring-2 focus:ring-indigo-500 focus:outline-none" />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="text-xs font-bold block mb-1">Estimated Budget ($)</label>
            <input name="estimatedBudget" type="number" className="w-full p-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-xs focus:ring-2 focus:ring-indigo-500 focus:outline-none" />
          </div>
          <div>
            <label className="text-xs font-bold block mb-1">Target Audience</label>
            <input name="targetAudience" type="text" className="w-full p-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-xs focus:ring-2 focus:ring-indigo-500 focus:outline-none" />
          </div>
        </div>

        <div>
          <label className="text-xs font-bold block mb-1">Tags (comma separated)</label>
          <input name="tags" type="text" placeholder="ai, SaaS, web3" className="w-full p-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-xs focus:ring-2 focus:ring-indigo-500 focus:outline-none" />
        </div>

        <div>
          <label className="text-xs font-bold block mb-1">Detailed Description *</label>
          <textarea name="detailedDescription" rows="4" required className="w-full p-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-xs focus:ring-2 focus:ring-indigo-500 focus:outline-none" />
        </div>

        <button type="submit" className="w-full py-3 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-xs font-bold transition-colors">
          Publish Startup Concept
        </button>
      </form>
    </div>
  );
};

export default AddIdea;