import { NextRequest, NextResponse } from "next/server"; // Import NextResponse from 'next/server' in Next.js
import { PrismaClient } from "@prisma/client"; // Import PrismaClient to interact with the database

// Creating an instance of PrismaClient to communicate with the database
const prisma = new PrismaClient();

// GET function 
export async function GET(req: NextRequest) {
  // Get the query parameters from the request URL
  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id"); // Get the 'id' parameter from the query 

  // If 'id' is not provided, return a 400 error status code
  if (!id) {
    return NextResponse.json(
      { error: "'id' query parameter is required" }, // Error message
      { status: 400 } // Status code 400 for bad request
    );
  }

  try {
    // Fetch the ebook from the database by 'id'
    const ebook = await prisma.ebook.findUnique({
      where: { id: parseInt(id, 10) }, // Find ebook by ID
    });

    // If the ebook is not found, return error status code
    if (!ebook) {
      return NextResponse.json({ error: "Ebook not found" }, { status: 404 }); // Resource not found
    }

    // Return the ebook details as a JSON response
    return NextResponse.json({
      id: ebook.id,
      title: ebook.title,
      author: ebook.author,
      description: ebook.description,
      fileUrl: ebook.fileUrl, 
      coverPageUrl: ebook.coverPageUrl,
    });
  } catch {
    // Error handler
    return NextResponse.json(
      { error: "Failed to retrieve ebook data" }, 
      { status: 500 } // Status code 500 for internal server error
    );
  }
}
