import { connectDB } from "@/lib/mongoose";
import Summary from "@/lib/models/Summary";
import { NextResponse } from "next/server";
import axios from "axios";

export async function POST(req: Request) {
  const { text, url } = await req.json();

  if (typeof text !== "string" || text.trim().length < 50) {
    return NextResponse.json(
      { error: "Invalid blog content." },
      { status: 400 }
    );
  }

  try {
    // 1. Call Groq API for production description (max 50 words)
    const groqRes = await axios.post(
      "https://api.groq.com/openai/v1/chat/completions",
      {
        model: "llama3-70b-8192",
        messages: [
          {
            role: "user",
            content: `Generate a concise, production-ready description of this blog (max 100 words):\n\n${text}`,
          },
        ],
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.GROQ_API_KEY}`,
          "Content-Type": "application/json",
        },
      }
    );

    const summary =
      groqRes.data?.choices?.[0]?.message?.content?.trim() ||
      "No description returned.";

    // 2. Save to MongoDB
    await connectDB();
    const newSummary = await Summary.create({
      url,
      originalText: text,
      summary,
    });

    return NextResponse.json(newSummary);
  } catch (err) {
    console.error("Error summarizing blog:", err);
    return NextResponse.json(
      { error: "Failed to summarize blog." },
      { status: 500 }
    );
  }
}

export async function GET() {
  await connectDB();
  const summaries = await Summary.find().sort({ createdAt: -1 });
  return NextResponse.json(summaries);
}
