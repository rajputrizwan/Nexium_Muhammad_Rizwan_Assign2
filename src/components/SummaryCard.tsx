"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Copy, ExternalLink } from "lucide-react";
import toast from "react-hot-toast";
import { motion } from "framer-motion";
import { useTypingEffect } from "@/hooks/useTypingEffect";

type SummaryProps = {
  url?: string;
  text: string;
  summary: string;
};

export default function SummaryCard({ url, text, summary }: SummaryProps) {
  const typedSummary = useTypingEffect(summary, 15);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(summary);
    toast.success("Summary copied to clipboard!");
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      <Card className="w-full my-6 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900">
        <CardContent className="p-6 space-y-4">
          {url && (
            <a
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center text-blue-600 hover:underline text-sm font-medium"
            >
              <ExternalLink size={16} className="mr-1" />
              View Original Blog
            </a>
          )}

          <div className="grid md:grid-cols-2 gap-6">
            {/* Original */}
            <div className="space-y-2">
              <h3 className="font-semibold text-gray-600 dark:text-gray-300 text-sm">
                📄 Original Blog Content
              </h3>
              <div className="max-h-96 overflow-auto rounded-lg bg-gray-100 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 p-4 text-sm text-gray-800 dark:text-gray-100 shadow-inner custom-scroll">
                <pre className="whitespace-pre-wrap">{text}</pre>
              </div>
            </div>

            {/* Animated Summary */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="space-y-2"
            >
              <h3 className="font-semibold text-gray-600 dark:text-gray-300 text-sm">
                🧠 AI-Generated Summary
              </h3>
              <div className="max-h-96 overflow-auto rounded-lg bg-indigo-50 dark:bg-indigo-900 border border-indigo-300 dark:border-indigo-700 p-4 text-sm text-gray-900 dark:text-indigo-100 shadow-inner custom-scroll">
                <pre className="whitespace-pre-wrap">{typedSummary}</pre>
              </div>
            </motion.div>
          </div>

          <div className="flex justify-end pt-4">
            <button
              onClick={copyToClipboard}
              className="flex items-center gap-2 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg shadow transition"
            >
              <Copy size={16} />
              Copy Summary
            </button>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
