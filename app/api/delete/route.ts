// Import NextResponse from 'next/server'
import { NextResponse } from "next/server";

// Import prisma to interact with the database
import prisma from "../../../lib/prisma";

// resetEbookSequence function
async function resetEbookSequence() {
  // Handle DELETE request to remove an ebook and reset the sequence
  const maxId = await prisma.ebook.aggregate({
    _max: {
      id: true, // Get the highest 'id' value
    },
  });

  // Set the next sequence ID for 'Ebook' table, defaulting to 1 if no records exist
  const nextId = (maxId._max.id || 0) + 1; 
  // Set 'Ebook' sequence to the next ID
  await prisma.$executeRawUnsafe(`
    SELECT setval('public."Ebook_id_seq"', ${nextId}, false); 
  `);
}

// DELETE function 
export async function DELETE(request: Request) {
  try {
    // Get query parameters from the request URL
    const ebookId = new URL(request.url).searchParams.get("id");

    // Ensure ebookId exists
    if (!ebookId) {
      return NextResponse.json({ error: "Ebook ID is required" }, { status: 400 }); // Status code 400 for bad request
    }

    // Delete the ebook from the database
    const deletedEbook = await prisma.ebook.delete({
      where: { id: Number(ebookId) },
    });

    // Reset the sequence
    await resetEbookSequence();

    // Return the deleted ebook as a response
    return NextResponse.json(deletedEbook);
  } catch {
    // Error message
    return NextResponse.json({ error: "An error occurred while deleting the ebook" }, { status: 500 }); // Status code 500 for internal server error
  }
}
