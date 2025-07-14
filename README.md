# Blog Summarizer

A modern web application that uses AI to summarize blog content. Built with [Next.js](https://nextjs.org/), [Prisma](https://www.prisma.io/), [MongoDB](https://www.mongodb.com/) (for summaries), [PostgreSQL](https://www.postgresql.org/) (for users), and [n8n](https://n8n.io/) for AI integration via the Gemini API.

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
- MongoDB instance (for summaries)
- PostgreSQL instance (for users)
- [n8n](https://n8n.io/) running the provided workflow

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
   DATABASE_URL=postgresql://user:password@localhost:5432/blog-summarizer
   ```

4. **Set up Prisma:**

   ```sh
   npx prisma generate
   npx prisma migrate dev
   ```

5. **Run the development server:**

   ```sh
   pnpm dev
   # or
   npm run dev
   # or
   yarn dev
   ```

6. **Start n8n and import the workflow in `blog-summarizer.json`.**

7. **Open [http://localhost:3000](http://localhost:3000) in your browser.**

## Project Structure

- `src/app/` – Next.js app directory (pages, layout, providers)
- `src/components/` – UI and feature components
- `src/lib/` – Database and utility functions
- `src/hooks/` – Custom React hooks
- `prisma/` – Prisma schema for PostgreSQL (users)
- `blog-summarizer.json` – n8n workflow for AI summarization

## How It Works

1. User pastes blog content and clicks "Summarize".
2. The app sends the content to an n8n webhook.
3. n8n calls the Gemini API to generate a summary.
4. The summary is returned and saved to MongoDB.
5. The summary is displayed with an animated typing effect.

## Customization

- Update the n8n workflow or Gemini API key as needed in `blog-summarizer.json`.
- Adjust database URIs in `.env.local`.

---

**Made with ❤️ using Next.js, Prisma, MongoDB, PostgreSQL, and n8n**
