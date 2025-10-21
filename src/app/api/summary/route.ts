// src/app/api/summary/route.ts
import { NextResponse } from "next/server";
import OpenAI from "openai";
import { connectDB } from "@/lib/mongoose";
import Summary from "@/lib/models/Summary";

// Optimized prompt template
const SUMMARY_PROMPT = `Please provide a concise 2-3 paragraph summary of the following blog post. Focus on the main ideas, key points, and overall message.

Blog Content:
{{blogText}}

Summary:`;

// MongoDB connection cache
let dbConnection: Promise<typeof import("mongoose")> | null = null;

async function ensureDBConnection() {
  if (!dbConnection) {
    dbConnection = connectDB().catch((err) => {
      dbConnection = null; // Reset on error
      throw err;
    });
  }
  return dbConnection;
}

export async function POST(req: Request) {
  const startTime = Date.now();
  console.log(`[${new Date().toISOString()}] Summary API called`);

  try {
    // Validate request quickly
    if (!req.body) {
      return NextResponse.json(
        { error: "Request body is required" },
        { status: 400 }
      );
    }

    const body = await req.json();
    const blogText = body.blogText?.trim();

    // Fast validation
    if (!blogText || typeof blogText !== "string") {
      return NextResponse.json(
        { error: "Valid blog content is required" },
        { status: 400 }
      );
    }

    if (blogText.length < 50) {
      return NextResponse.json(
        { error: "Content too short (min 50 characters)" },
        { status: 400 }
      );
    }

    if (blogText.length > 8000) {
      return NextResponse.json(
        { error: "Content too long (max 8000 characters)" },
        { status: 400 }
      );
    }

    console.log(`Processing blog text: ${blogText.length} chars`);

    // Validate API key
    if (!process.env.OPENROUTER_API_KEY) {
      return NextResponse.json(
        { error: "Service configuration error" },
        { status: 500 }
      );
    }

    // Optimize: Use shorter content for faster processing
    const optimizedBlogText =
      blogText.length > 3000
        ? blogText.substring(0, 3000) +
          "... [content truncated for optimal processing]"
        : blogText;

    const FINAL_PROMPT = SUMMARY_PROMPT.replace(
      "{{blogText}}",
      optimizedBlogText
    );

    // Initialize OpenAI with optimized settings
    const openai = new OpenAI({
      apiKey: process.env.OPENROUTER_API_KEY || "",
      baseURL: "https://openrouter.ai/api/v1",
      timeout: 10000, // 10 second timeout
    });

    console.log("Calling Mistral model...");
    const aiStartTime = Date.now();

    // Use only the working model with optimized parameters
    const completion = await openai.chat.completions.create({
      model: "mistralai/mistral-7b-instruct:free",
      messages: [{ role: "user", content: FINAL_PROMPT }],
      temperature: 0.7,
      max_tokens: 350, // Reduced for faster generation
      top_p: 0.8,
    });

    const aiTime = Date.now() - aiStartTime;
    console.log(`AI response received in ${aiTime}ms`);

    const summary = completion?.choices?.[0]?.message?.content?.trim();

    if (!summary) {
      return NextResponse.json(
        { error: "Failed to generate summary" },
        { status: 500 }
      );
    }

    console.log(`Summary generated: ${summary.substring(0, 80)}...`);

    // Try to save to MongoDB with timeout protection
    let dbSaveSuccess = false;
    let savedId = null;

    try {
      await ensureDBConnection();

      // Use Promise.race to timeout MongoDB operation
      const savePromise = Summary.create({
        originalText: blogText.substring(0, 500), // Store only snippet
        fullTextLength: blogText.length,
        summary,
        url: body.url || null,
      });

      const timeoutPromise = new Promise<never>((_, reject) =>
        setTimeout(() => reject(new Error("Database timeout")), 5000)
      );

      const result = (await Promise.race([savePromise, timeoutPromise])) as {
        _id: string;
      };
      dbSaveSuccess = true;
      savedId = result._id;
      console.log("Successfully saved to database");
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.warn("Database save failed (non-critical):", error.message);
      } else {
        console.warn("Database save failed (non-critical):", error);
      }
      // Continue without failing the request
    }

    const totalTime = Date.now() - startTime;
    console.log(`Request completed in ${totalTime}ms`);

    return NextResponse.json({
      summary,
      id: savedId,
      originalLength: blogText.length,
      savedToDB: dbSaveSuccess,
      processingTime: totalTime,
      success: true,
    });
  } catch (error: unknown) {
    const totalTime = Date.now() - startTime;

    if (error instanceof Error) {
      console.error(`API error after ${totalTime}ms:`, error.message);

      // Check for timeout in the message
      if (error.message.includes("timeout")) {
        return NextResponse.json(
          {
            error:
              "Processing taking too long. Please try with shorter content.",
          },
          { status: 408 }
        );
      }
    } else {
      console.error(`API error after ${totalTime}ms:`, error);
    }

    // Check for status code if error has a status property
    if (typeof error === "object" && error !== null && "status" in error) {
      const errWithStatus = error as { status?: number };
      if (errWithStatus.status === 429) {
        return NextResponse.json(
          { error: "Rate limit exceeded. Please try again in a moment." },
          { status: 429 }
        );
      }
    }

    // Fallback for all other errors
    return NextResponse.json(
      {
        error: "Failed to process request",
        success: false,
      },
      { status: 500 }
    );
  }
}

// GET route - optimized with timeout protection
export async function GET() {
  try {
    await ensureDBConnection();

    const fetchPromise = Summary.find()
      .select("summary url fullTextLength createdAt")
      .sort({ createdAt: -1 })
      .limit(20)
      .lean();

    const timeoutPromise = new Promise((_, reject) =>
      setTimeout(() => reject(new Error("Database timeout")), 8000)
    );

    const summaries = await Promise.race([fetchPromise, timeoutPromise]);

    return NextResponse.json(summaries);
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error("GET error:", error.message);
    } else {
      console.error("GET error:", error);
    }

    return NextResponse.json(
      {
        error: "Failed to fetch summaries",
        success: false,
      },
      { status: 500 }
    );
  }
}
