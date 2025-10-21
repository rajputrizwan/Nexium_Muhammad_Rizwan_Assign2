// app/layout.tsx
import "./globals.css";
import { ReactNode } from "react";
import { Toaster } from "react-hot-toast";
import { ThemeProvider } from "next-themes";
import Link from "next/link";
import { FileText } from "lucide-react";
import { ThemeToggle } from "../components/theme-toggle";

export const metadata = {
  title: "Blog Summarizer - AI-Powered Content Summarization",
  description:
    "Transform long articles and blog posts into concise, AI-generated summaries instantly.",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head />
      <body className="bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 min-h-screen flex flex-col">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <Toaster
            position="top-right"
            toastOptions={{
              duration: 4000,
              style: {
                background: "#363636",
                color: "#fff",
              },
              success: {
                duration: 3000,
                iconTheme: {
                  primary: "#10b981",
                  secondary: "#fff",
                },
              },
            }}
          />

          {/* Enhanced Header */}
          <header className="flex items-center justify-between px-6 py-4 border-b border-gray-200 dark:border-gray-700 bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm">
            <Link
              href="/"
              className="flex items-center gap-3 text-xl font-bold group"
            >
              <div className="p-2 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl group-hover:scale-110 transition-transform">
                <FileText className="w-6 h-6 text-white" />
              </div>
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                BlogSummarizer
              </span>
            </Link>

            <div className="flex items-center gap-4">
              <ThemeToggle />
            </div>
          </header>

          {/* Main content */}
          <main className="flex-grow">{children}</main>

          {/* Enhanced Footer */}
          <footer className="border-t border-gray-200 dark:border-gray-700 bg-white/50 dark:bg-gray-900/50 backdrop-blur-sm">
            <div className="container mx-auto px-6 py-8">
              <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg">
                    <FileText className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900 dark:text-white">
                      Blog Summarizer
                    </p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      AI-powered content summarization
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-4 text-sm text-gray-600 dark:text-gray-400">
                  <p>Powered by AI • Built with Next.js</p>
                </div>
              </div>
            </div>
          </footer>
        </ThemeProvider>
      </body>
    </html>
  );
}
