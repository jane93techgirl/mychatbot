import { NextResponse } from "next/server";
import { Groq } from "groq-sdk";

// Initialize Groq client
const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

export async function POST(req: Request) {
  try {
    console.log("Received request:", req);
    const { messages } = await req.json();
    console.log("Parsed messages:", messages);

    if (!messages) {
      console.error("No messages provided");
      return NextResponse.json(
        { error: "Messages are required" },
        { status: 400 }
      );
    }

    console.log("Calling Groq API with messages:", messages);
    const response = await groq.chat.completions.create({
      messages,
      model: "mixtral-8x7b-32768",
    });
    console.log("Received response from Groq API:", response);

    return NextResponse.json(response);
  } catch (error: unknown) {
    console.error("Error calling Groq API:", error);
    const errorMessage = error instanceof Error ? error.message : "Unknown error occurred";
    return NextResponse.json(
      { error: "Failed to process request", details: errorMessage },
      { status: 500 }
    );
  }
}
