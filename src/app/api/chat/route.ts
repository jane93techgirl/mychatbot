import { NextResponse } from "next/server";

// Define the type for the request object
interface RequestBody {
  name: string;
  age: number;
}

// Define the type for the response object
interface ResponseBody {
  message: string;
  data?: {
    name: string;
    age: number;
  };
}

// Handle GET requests
export async function GET() {
  return NextResponse.json({ message: "Hello, World!" });
}

// Handle POST requests
export async function POST(request: Request) {
  try {
    // Parse the request body
    const body: RequestBody = await request.json();

    // Validate the request body
    if (!body.name || !body.age) {
      return NextResponse.json(
        { message: "Name and age are required" },
        { status: 400 }
      );
    }

    // Prepare the response
    const response: ResponseBody = {
      message: "Data received successfully",
      data: {
        name: body.name,
        age: body.age,
      },
    };

    // Return the response
    return NextResponse.json(response, { status: 200 });
  } catch (error) {
    console.error("Error in POST request:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}