// components/SummaryCard.tsx
"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Copy, ExternalLink, CheckCircle, Sparkles } from "lucide-react";
import toast from "react-hot-toast";
import { motion, AnimatePresence } from "framer-motion";
import { useTypingEffect } from "@/hooks/useTypingEffect";
import { useState } from "react";

type SummaryProps = {
  url?: string;
  text: string;
  summary: string;
};

export default function SummaryCard({ url, text, summary }: SummaryProps) {
  const typedSummary = useTypingEffect(summary, 10);
  const [copied, setCopied] = useState(false);

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(summary);
      setCopied(true);
      toast.success("Summary copied to clipboard! 📋");
      setTimeout(() => setCopied(false), 2000);
    } catch (error: unknown) {
      console.error(error); // optional, for debugging
      toast.error("Failed to copy summary");
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{
        duration: 0.6,
        type: "spring",
        stiffness: 100,
      }}
      className="relative"
    >
      {/* Background Glow */}
      <div className="absolute -inset-4 bg-gradient-to-r from-green-500 to-blue-500 rounded-3xl blur-xl opacity-10"></div>

      <Card className="relative w-full rounded-2xl shadow-2xl border-0 bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-900 overflow-hidden">
        {/* Header Gradient */}
        <div className="h-2 bg-gradient-to-r from-green-500 via-blue-500 to-purple-500"></div>

        <CardContent className="p-8 space-y-6">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="flex items-center justify-between"
          >
            <div className="flex items-center gap-3">
              <div className="p-2 bg-gradient-to-r from-green-500 to-blue-500 rounded-xl">
                <Sparkles className="w-5 h-5 text-white" />
              </div>
              <div>
                <h2 className="text-2xl font-bold bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
                  Summary Generated
                </h2>
                <p className="text-gray-600 dark:text-gray-300 text-sm">
                  AI-powered insights from your content
                </p>
              </div>
            </div>

            <motion.button
              onClick={copyToClipboard}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 text-white rounded-xl shadow-lg transition-all duration-200"
            >
              <AnimatePresence mode="wait">
                {copied ? (
                  <motion.div
                    key="check"
                    initial={{ scale: 0, rotate: -180 }}
                    animate={{ scale: 1, rotate: 0 }}
                    exit={{ scale: 0, rotate: 180 }}
                  >
                    <CheckCircle className="w-4 h-4" />
                  </motion.div>
                ) : (
                  <motion.div
                    key="copy"
                    initial={{ scale: 1 }}
                    exit={{ scale: 0 }}
                  >
                    <Copy className="w-4 h-4" />
                  </motion.div>
                )}
              </AnimatePresence>
              {copied ? "Copied!" : "Copy"}
            </motion.button>
          </motion.div>

          {/* Content Grid */}
          <div className="grid lg:grid-cols-2 gap-6">
            {/* Original Content */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              className="space-y-3"
            >
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                <h3 className="font-semibold text-gray-700 dark:text-gray-200">
                  📄 Original Content
                </h3>
                <span className="text-xs bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 px-2 py-1 rounded-full">
                  {text.length} chars
                </span>
              </div>
              <div className="h-96 overflow-auto rounded-xl bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 p-4 text-sm text-gray-700 dark:text-gray-300 custom-scrollbar">
                <pre className="whitespace-pre-wrap font-sans">{text}</pre>
              </div>
            </motion.div>

            {/* AI Summary */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
              className="space-y-3"
            >
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <h3 className="font-semibold text-gray-700 dark:text-gray-200">
                  🧠 AI Summary
                </h3>
                <span className="text-xs bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 px-2 py-1 rounded-full">
                  {typedSummary.length}/{summary.length} chars
                </span>
              </div>
              <div className="h-96 overflow-auto rounded-xl bg-gradient-to-br from-green-50 to-blue-50 dark:from-green-900/20 dark:to-blue-900/20 border border-green-200 dark:border-green-800 p-4 text-sm text-gray-800 dark:text-green-100 custom-scrollbar relative">
                {/* Animated background particles */}
                <div className="absolute inset-0 opacity-10">
                  {[...Array(5)].map((_, i) => (
                    <motion.div
                      key={i}
                      className="absolute w-2 h-2 bg-green-500 rounded-full"
                      initial={{
                        x: Math.random() * 100 + "%",
                        y: Math.random() * 100 + "%",
                        scale: 0,
                      }}
                      animate={{
                        scale: [0, 1, 0],
                        opacity: [0, 1, 0],
                      }}
                      transition={{
                        duration: 3,
                        repeat: Infinity,
                        delay: i * 0.6,
                      }}
                    />
                  ))}
                </div>
                <pre className="whitespace-pre-wrap font-sans relative z-10 leading-relaxed">
                  {typedSummary}
                  {typedSummary.length < summary.length && (
                    <motion.span
                      animate={{ opacity: [1, 0, 1] }}
                      transition={{ duration: 0.8, repeat: Infinity }}
                      className="inline-block w-2 h-4 bg-green-500 ml-1"
                    />
                  )}
                </pre>
              </div>
            </motion.div>
          </div>

          {/* Stats Footer */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="flex items-center justify-between pt-4 border-t border-gray-200 dark:border-gray-700"
          >
            <div className="flex items-center gap-4 text-sm text-gray-600 dark:text-gray-400">
              <div className="flex items-center gap-1">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span>
                  Compression:{" "}
                  {Math.round((1 - summary.length / text.length) * 100)}%
                </span>
              </div>
              <div className="flex items-center gap-1">
                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                <span>Read time: ~{Math.ceil(summary.length / 200)} min</span>
              </div>
            </div>

            {url && (
              <motion.a
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.05 }}
                className="flex items-center gap-2 px-3 py-1 text-sm bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300 rounded-lg transition-colors"
              >
                <ExternalLink size={14} />
                Source
              </motion.a>
            )}
          </motion.div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
