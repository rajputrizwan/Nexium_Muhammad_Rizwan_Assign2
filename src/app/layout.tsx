// app/layout.tsx
import "./globals.css";
import { ReactNode } from "react";
import { Toaster } from "react-hot-toast";
import { ThemeProvider } from "../components/theme-provider";
import Link from "next/link";
import { FileText } from "lucide-react";
import { ThemeToggle } from "../components/theme-toggle";

export const metadata = {
  title: "Blog Summarizer",
  description: "Summarize any blog with AI",
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
          <Toaster position="top-right" />

          {/* Header with logo + theme toggle */}
          <header className="flex items-center justify-between px-6 py-4 border-b border-gray-200 dark:border-gray-700">
            <Link
              href="/"
              className="flex items-center gap-2 text-xl font-semibold"
            >
              <FileText className="w-6 h-6" />
              Blog Summarizer
            </Link>

            <ThemeToggle />
          </header>

          {/* Main content */}
          <main className="flex-grow">{children}</main>
        </ThemeProvider>
      </body>
    </html>
  );
}
