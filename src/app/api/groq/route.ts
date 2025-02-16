import { NextResponse } from "next/server";
import { Groq } from "groq-sdk";

// Initialize Groq client
const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

export async function POST(req: Request) {
  try {
    console.log("Received API request");
    const { messages } = await req.json();
    console.log("Request payload:", { messages });

    if (!messages) {
      console.error("Missing messages in request");
      return NextResponse.json(
        { error: "Messages are required" },
        { status: 400 }
      );
    }

    console.log("Calling Groq API...");
    const response = await groq.chat.completions.create({
      messages,
      model: "mixtral-8x7b-32768",
    });
    console.log("Groq API response:", response);

    return NextResponse.json(response);
  } catch (error) {
    console.error("Error calling Groq API:", error);
    if (error instanceof Error) {
      console.error("Error details:", {
        message: error.message,
        stack: error.stack
      });
    }
    return NextResponse.json(
      { 
        error: "Failed to process request",
        details: error instanceof Error ? error.message : "Unknown error"
      },
      { status: 500 }
    );
  }
}
