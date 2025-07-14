import { connectDB } from "@/lib/mongoose";
import Summary from "@/lib/models/Summary";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { text, url, summary } = await req.json();
  await connectDB();
  const newSummary = await Summary.create({ url, originalText: text, summary });
  return NextResponse.json(newSummary);
}

export async function GET() {
  await connectDB();
  const summaries = await Summary.find().sort({ createdAt: -1 });
  return NextResponse.json(summaries);
}
