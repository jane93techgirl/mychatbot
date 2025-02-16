import { NextRequest, NextResponse } from "next/server";
import { OpenAI } from "openai"; // Import the OpenAI class

// Initialize the OpenAI client
const openai = new OpenAI({
  apiKey: "your-api-key-here", // Replace with your actual OpenAI API key
});

// Example function to call the OpenAI API
async function callOpenAI() {
  try {
    // Make a request to the OpenAI API
    const response = await openai.chat.completions.create({
      model: "gpt-4", // Specify the model you want to use
      messages: [
        { role: "system", content: "You are a helpful assistant." },
        { role: "user", content: "Hello, world!" },
      ],
    });

    // Log the response from the API
    console.log(response.choices[0].message.content);
  } catch (error) {
    // Handle any errors
    console.error("Error calling OpenAI API:", error);
  }
}

// Call the function to execute the API request
callOpenAI();