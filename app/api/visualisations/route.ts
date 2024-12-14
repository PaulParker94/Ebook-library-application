import { NextResponse } from "next/server"; // Import NextResponse from 'next/server'
import prisma from "../../../lib/prisma"; // Import Prisma client to interact with the database

// GET function
export async function GET(request: Request) {
  // Parse the request URL to access query parameters
  const url = new URL(request.url); 

  // Get page and limit from query parameters
  const page = parseInt(url.searchParams.get("page") || "1", 10); // Default to page 1
  const limit = parseInt(url.searchParams.get("limit") || "50", 10); // Default to 50 items per page
  const offset = (page - 1) * limit; // Calculate how many records to skip based on the current page and the limit per page

  try {
    // Fetch books, sorted by download count
    const books = await prisma.books_book.findMany({
      select: {
        title: true, // Select only the 'title' field
        download_count: true, // Select the 'download_count' field
      },
      orderBy: {
        download_count: 'desc', // Order books by download count in descending order
      },
      skip: offset, // Skip the records from previous pages based on the offset
      take: limit, // Get 'limit' number of books
    });

    // Get the total number of books
    const totalBooks = await prisma.books_book.count();

    // Return the books data, total count, and page information
    return NextResponse.json({
      data: books, // Array of fetched books
      total: totalBooks, // Total number of books
      page, // Current page number
      totalPages: Math.ceil(totalBooks / limit), // Calculate the total number of pages
    });
  } catch {
    // Return error message
    return NextResponse.json({ error: 'An unexpected error occurred' });
  }
}
