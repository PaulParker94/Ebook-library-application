// Import necessary modules from Next.js and Prisma
import { NextRequest, NextResponse } from "next/server";  // NextRequest and NextResponse are used to handle the API request and response
import { PrismaClient } from "@prisma/client";  // PrismaClient allows interaction with the database

// Create an instance of PrismaClient to access the database
const prisma = new PrismaClient();

// Define the GET function to handle the incoming request
export async function GET(req: NextRequest) {
  // Get the query parameters from the URL of the request
  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");  // Extract the 'id' parameter from the URL

  // If the 'id' parameter is missing, return a 400 error (Bad Request)
  if (!id) {
    return NextResponse.json(
      { error: "'id' query parameter is required" },  // Error message when 'id' is not provided
      { status: 400 }  // HTTP status code 400 (Bad Request)
    );
  }

  try {
    // Ensure the 'id' is a valid number before attempting to use it
    const parsedId = parseInt(id, 10);  // Convert 'id' to an integer
    if (isNaN(parsedId)) {
      // If the 'id' is not a valid number, return a 400 error
      return NextResponse.json(
        { error: "Invalid 'id' parameter" },  // Error message for invalid 'id'
        { status: 400 }  // HTTP status code 400 (Bad Request)
      );
    }

    // Fetch the ebook data from the database using the provided 'id'
    const ebook = await prisma.ebook.findUnique({
      where: { id: parsedId },  // Use the parsed 'id' to query the ebook in the database
    });

    // If the ebook is not found, return a 404 error (Not Found)
    if (!ebook) {
      return NextResponse.json(
        { error: "Ebook not found" },  // Error message when ebook is not found
        { status: 404 }  // HTTP status code 404 (Not Found)
      );
    }

    // If the ebook is found, return the ebook's details in the response
    return NextResponse.json({
      id: ebook.id,  // Ebook ID
      title: ebook.title,  // Ebook title
      description: ebook.description,  // Ebook description
      fileUrl: ebook.fileUrl,  // URL to the ebook file (could be stored in a file storage service like Supabase)
      coverPageUrl: ebook.coverPageUrl,  // URL to the cover page image
    });

  } catch (error) {
    // Catch any errors during the process and log them for debugging
    console.error("Error fetching ebook data:", error);  // Log the full error stack

    // Return a 500 error (Internal Server Error) with details about the error
    return NextResponse.json(
      { error: "Failed to retrieve ebook data" }, 
      { status: 500 }  // HTTP status code 500 (Internal Server Error)
    );
  }
}
