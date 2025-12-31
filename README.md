# Blog Summarizer

A modern web application that uses AI to summarize blog content. Built with [Next.js](https://nextjs.org/), [MongoDB](https://www.mongodb.com/) for data persistence, [Mongoose](https://mongoosejs.com/) for database modeling, and [OpenRouter API](https://openrouter.ai/) for AI-powered summarization using the Mistral 7B model.

## Features

- Paste any blog content and get an AI-generated summary.
- Animated summary reveal for better UX.
- Copy summary to clipboard with one click.
- Dark/light theme toggle.
- Summaries are saved to the database.
- Built with modern UI components ([shadcn/ui](https://ui.shadcn.com/)), [Tailwind CSS](https://tailwindcss.com/), and [Framer Motion](https://www.framer.com/motion/).

## Getting Started

### Prerequisites

- Node.js (v18+ recommended)
- [pnpm](https://pnpm.io/) (or npm/yarn)
- MongoDB instance (local or cloud-based like MongoDB Atlas)
- [OpenRouter API](https://openrouter.ai/) account with API key

### Installation

1. **Clone the repository:**

   ```sh
   git clone https://github.com/rajputrizwan/Nexium_Muhammad_Rizwan_Assign2.git
   cd Nexium_Muhammad_Rizwan_Assign2
   ```

2. **Install dependencies:**

   ```sh
   pnpm install
   # or
   npm install
   # or
   yarn install
   ```

3. **Configure environment variables:**

   Create a `.env.local` file with the following (adjust as needed):

   ```
   MONGODB_URI=mongodb://localhost:27017/blog-summarizer
   OPENROUTER_API_KEY=your_openrouter_api_key_here
   ```
   
   To get your OpenRouter API key:
   - Visit [OpenRouter](https://openrouter.ai/)
   - Sign up or log in
   - Navigate to the API keys section and create a new key

4. **Run the development server:**

   ```sh
   pnpm dev
   # or
   npm run dev
   # or
   yarn dev
   ```

5. **Open [http://localhost:3000](http://localhost:3000) in your browser.**

## Project Structure

- `src/app/` – Next.js app directory with API routes and main layout
  - `api/summary/` – API endpoint for blog summarization
  - `layout.tsx` – Root layout with theme provider
  - `page.tsx` – Main application page
- `src/components/` – Reusable UI components
  - `SummaryCard.tsx` – Component displaying summary with typing effect
  - `theme-toggle.tsx` – Dark/light mode switcher
- `src/lib/` – Core utility functions
  - `mongoose.ts` – MongoDB connection and model setup
  - `summarizeBlog.ts` – AI summarization logic using OpenRouter
  - `models/` – Mongoose data models
- `src/hooks/` – Custom React hooks
  - `useTypingEffect.ts` – Animation hook for typing effect
- `src/services/` – Service utilities
  - `constants.ts` – API and configuration constants

## How It Works

1. User pastes blog content (50-8000 characters) into the input field and clicks "Summarize".
2. The app validates the content length and sends it to the `/api/summary` endpoint.
3. The backend calls the OpenRouter API, which uses the Mistral 7B model for summarization.
4. The generated summary is saved to MongoDB with metadata (original content, timestamp).
5. The summary is returned to the frontend and displayed with a smooth typing animation effect.
6. Users can copy the summary to clipboard or modify the input to generate new summaries.

## Customization

- **Change AI Model:** Modify the model selection in `src/lib/summarizeBlog.ts` to use different OpenRouter-supported models (Claude, GPT-4, etc.)
- **Database Configuration:** Update `MONGODB_URI` in `.env.local` to use your MongoDB instance
- **Content Limits:** Adjust min/max character limits in the API route `src/app/api/summary/route.ts`
- **Styling:** Customize theme colors and components in `src/components/` and `src/app/globals.css`

---

**Made with ❤️ using Next.js, MongoDB, Mongoose, OpenRouter AI, and React**
