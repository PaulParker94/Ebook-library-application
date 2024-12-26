// Import NextRequest and NextResponse from 'next/server' and import necessary modules
import { NextRequest, NextResponse } from "next/server"; 
import { PrismaClient } from "@prisma/client"; 

// Import prisma to interact with the database
const prisma = new PrismaClient();

// GET function 
export async function GET(req: NextRequest) {
  // Get the query parameters from the URL of the request
  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id"); 

  // Check if id is a valid number
  const parsedId = parseInt(id ?? '', 10);  // Convert id to an integer, defaulting to NaN if id is null
  if (isNaN(parsedId)) {
    return NextResponse.json(
      { error: "Invalid 'id' parameter" },  // Error message for invalid 'id'
      { status: 400 }  // Status code 400 for bad request
    );
  }

  // Fetch the ebook data from the database using the provided id
  const ebook = await prisma.ebook.findUnique({
    where: { id: parsedId },  // Query the database for the ebook with the given id
  });

  // If the ebook is not found, return error message
  if (!ebook) {
    return NextResponse.json(
      { error: "Ebook not found" }, 
      { status: 404 }  // Status code 404 for not found
    );
  }

  // Return the ebook details if found
  return NextResponse.json({
    id: ebook.id,  // Ebook ID
    title: ebook.title,  // Ebook title
    description: ebook.description,  // Ebook description
    fileUrl: ebook.fileUrl,  // URL to the ebook file 
    coverPageUrl: ebook.coverPageUrl,  // URL to the cover page image
  });
}
