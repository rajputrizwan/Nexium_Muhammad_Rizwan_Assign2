"use client";

import { useState } from "react";
import { summarizeBlog } from "@/lib/summarizeBlog";
import SummaryCard from "@/components/SummaryCard";

export default function Home() {
  const [content, setContent] = useState("");
  const [summary, setSummary] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSummarize = async () => {
    if (!content.trim()) return;
    setLoading(true);
    try {
      const result = await summarizeBlog(content);
      setSummary(result);
      console.log("Returned summary:", result);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="p-6 max-w-3xl mx-auto space-y-8">
      <h1 className="text-4xl font-extrabold text-center text-gray-900 dark:text-gray-100">
        🧠 Blog Summarizer
      </h1>

      <section>
        <label
          htmlFor="blog-content"
          className="block mb-2 font-semibold text-gray-700 dark:text-gray-300"
        >
          Paste your blog content below:
        </label>
        <textarea
          id="blog-content"
          placeholder="Paste blog content here..."
          value={content}
          onChange={(e) => setContent(e.target.value)}
          rows={10}
          maxLength={5000}
          className="w-full rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 p-4 resize-none shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
        />
        <p className="text-sm mt-1 text-gray-500 dark:text-gray-400">
          {content.length} / 5000 characters
        </p>
      </section>

      <button
        onClick={handleSummarize}
        disabled={loading || !content.trim()}
        className={`w-full rounded-lg py-3 font-semibold text-white 
          ${
            loading || !content.trim()
              ? "bg-indigo-300 cursor-not-allowed"
              : "bg-indigo-600 hover:bg-indigo-700"
          }
          transition-colors duration-200`}
      >
        {loading ? (
          <svg
            className="animate-spin h-5 w-5 mx-auto text-white"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            aria-label="Loading spinner"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            ></circle>
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8v8H4z"
            ></path>
          </svg>
        ) : (
          "Summarize Blog"
        )}
      </button>

      {summary && (
        <section className="mt-6">
          <SummaryCard text={content} summary={summary} />
        </section>
      )}
    </main>
  );
}
