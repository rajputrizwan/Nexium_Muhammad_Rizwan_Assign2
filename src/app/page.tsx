// app/page.tsx
"use client";

import { useState } from "react";
import { summarizeBlog } from "@/lib/summarizeBlog";
import SummaryCard from "@/components/SummaryCard";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, Zap, BookOpen, ArrowRight } from "lucide-react";

export default function Home() {
  const [content, setContent] = useState("");
  const [summary, setSummary] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSummarize = async () => {
    if (!content.trim()) return;

    setLoading(true);
    setError("");
    setSummary("");

    try {
      const result = await summarizeBlog(content);
      setSummary(result);
    } catch (error: unknown) {
      console.error("Summarization error:", error);

      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError("Failed to generate summary");
      }
    } finally {
      setLoading(false);
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
      },
    },
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 dark:from-gray-900 dark:via-gray-800 dark:to-blue-900">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="space-y-8"
        >
          {/* Header Section */}
          <motion.div variants={itemVariants} className="text-center space-y-4">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
              className="flex justify-center"
            >
              <div className="relative">
                <div className="absolute -inset-4 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full blur-xl opacity-20"></div>
                <div className="relative bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-2xl border border-gray-100 dark:border-gray-700">
                  <div className="flex items-center justify-center gap-3">
                    <div className="p-3 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl">
                      <Sparkles className="w-8 h-8 text-white" />
                    </div>
                    <div>
                      <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent pb-2">
                        Blog Summarizer
                      </h1>
                      <p className="text-gray-600 dark:text-gray-300 mt-2 text-lg">
                        Transform long articles into concise summaries with AI
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>

          {/* Features Grid */}
          <motion.div
            variants={itemVariants}
            className="grid grid-cols-1 md:grid-cols-3 gap-4"
          >
            {[
              {
                icon: Zap,
                text: "Lightning Fast",
                desc: "Get summaries in seconds",
              },
              {
                icon: Sparkles,
                text: "AI Powered",
                desc: "Advanced AI models",
              },
              { icon: BookOpen, text: "Easy to Use", desc: "Paste and click" },
            ].map((feature, index) => (
              <motion.div
                key={feature.text}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 + index * 0.1 }}
                className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm rounded-xl p-4 text-center border border-gray-200 dark:border-gray-700 shadow-sm"
              >
                <feature.icon className="w-8 h-8 text-blue-600 mx-auto mb-2" />
                <h3 className="font-semibold text-gray-900 dark:text-white">
                  {feature.text}
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  {feature.desc}
                </p>
              </motion.div>
            ))}
          </motion.div>

          {/* Input Section */}
          <motion.section variants={itemVariants} className="relative">
            <div className="absolute -inset-4 bg-gradient-to-r from-blue-600 to-purple-600 rounded-3xl blur-xl opacity-10"></div>
            <div className="relative bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl p-6 border border-gray-200 dark:border-gray-700 shadow-xl">
              <div className="flex items-center gap-2 mb-4">
                <BookOpen className="w-5 h-5 text-blue-600" />
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                  Paste Your Blog Content
                </h2>
              </div>

              <motion.div
                whileFocus={{ scale: 1.01 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <textarea
                  placeholder="Paste your blog article, research paper, or any long text here... (Minimum 50 characters)"
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  rows={12}
                  maxLength={8000}
                  className="w-full rounded-xl border-2 border-gray-200 dark:border-gray-600 p-4 bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 focus:border-blue-500 focus:ring-4 focus:ring-blue-200 dark:focus:ring-blue-900 transition-all duration-200 resize-none custom-scrollbar"
                />
              </motion.div>

              <div className="flex justify-between items-center mt-4">
                <motion.p
                  className="text-sm text-gray-500 dark:text-gray-400"
                  animate={{
                    color: content.length > 7500 ? "#ef4444" : "#6b7280",
                  }}
                >
                  {content.length} / 8000 characters
                </motion.p>

                <motion.button
                  onClick={handleSummarize}
                  disabled={loading || !content.trim() || content.length < 50}
                  className={`flex items-center gap-2 px-8 py-3 rounded-xl font-semibold text-white transition-all duration-300 ${
                    loading || !content.trim() || content.length < 50
                      ? "bg-gray-400 cursor-not-allowed"
                      : "bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                  }`}
                  whileHover={
                    !(loading || !content.trim() || content.length < 50)
                      ? { scale: 1.05 }
                      : {}
                  }
                  whileTap={
                    !(loading || !content.trim() || content.length < 50)
                      ? { scale: 0.95 }
                      : {}
                  }
                >
                  {loading ? (
                    <>
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{
                          duration: 1,
                          repeat: Infinity,
                          ease: "linear",
                        }}
                        className="w-5 h-5 border-2 border-white border-t-transparent rounded-full"
                      />
                      Generating...
                    </>
                  ) : (
                    <>
                      <Zap className="w-5 h-5" />
                      Summarize Blog
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </motion.button>
              </div>
            </div>
          </motion.section>

          {/* Error Display */}
          <AnimatePresence>
            {error && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl"
              >
                <p className="text-red-700 dark:text-red-300 font-medium">
                  ⚠️ {error}
                </p>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Summary Display */}
          <AnimatePresence>
            {summary && !error && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <SummaryCard text={content} summary={summary} />
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* Custom Scrollbar Styles */}
      <style jsx global>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: #f1f5f9;
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #cbd5e1;
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #94a3b8;
        }
        .dark .custom-scrollbar::-webkit-scrollbar-track {
          background: #374151;
        }
        .dark .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #4b5563;
        }
        .dark .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #6b7280;
        }
      `}</style>
    </main>
  );
}
