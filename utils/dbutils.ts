// Import the Prisma client to interact with the database
import prisma from '../lib/prisma'; 

// Function to reset the 'Ebook' sequence in the PostgreSQL database, to avoid autoincrement id error related to adding and removing ebook entries to the database
export async function resetEbookSequence() {
  try {
    // Retrieve the maximum 'id' value from the 'Ebook' table
    const maxId = await prisma.ebook.aggregate({
      _max: {
        id: true, // Get the highest 'id' value from the 'Ebook' table
      },
    });

    // Reset the 'Ebook' sequence to the max 'id' or 1 if none exist.
    await prisma.$executeRawUnsafe(`
      SELECT setval('public."Ebook_id_seq"', ${maxId._max.id || 1}, false);
    `);
  } catch  {
    // If there is an error throw the error
    throw new Error("Failed to reset sequence.");
  }
}
