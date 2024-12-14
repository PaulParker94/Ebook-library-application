import fs from 'fs'; // Importing the 'fs' module to interact with the file system
import path from 'path'; // Importing the 'path' module for working with file paths
import { NextResponse } from 'next/server'; // Import NextResponse from 'next/server'
import { PrismaClient } from '@prisma/client'; // Importing PrismaClient to interact with the database

// Creating an instance of PrismaClient to communicate with the database
const prisma = new PrismaClient(); 

// POST function
export async function POST(request: Request) {
  try {
    // Parsing the incoming form data
    const formData = await request.formData();

    // Extract input data from the form 
    const title = formData.get("title") as string; // Get the title of the ebook
    const author = formData.get("author") as string; // Get the author of the ebook
    const description = formData.get("description") as string; // Get the description of the ebook
    const publishedAt = new Date(formData.get("publishedAt") as string); // Get the publish date of the ebook

    // Extracting the ebook file and cover page file from the form data
    const file = formData.get("file") as File;
    const coverPage = formData.get("coverPage") as File;

    // Defining the URLs where the files will be saved
    const fileUrl = `/ebooks/${file.name}`; // URL for the ebook file
    const coverPageUrl = `/uploads/${coverPage.name}`; // URL for the cover page image

    // Defining the directories where the files will be saved
    const uploadsDirectory = path.join(process.cwd(), 'public', 'uploads');
    const ebooksDirectory = path.join(process.cwd(), 'public', 'ebooks');

    // Create the directories if they do not already exist
    if (!fs.existsSync(uploadsDirectory)) {
      fs.mkdirSync(uploadsDirectory, { recursive: true });
    }
    if (!fs.existsSync(ebooksDirectory)) {
      fs.mkdirSync(ebooksDirectory, { recursive: true });
    }

    // Save the files to the directory
    await fs.promises.writeFile(path.join(uploadsDirectory, coverPage.name), Buffer.from(await coverPage.arrayBuffer())); // Saving the cover page
    await fs.promises.writeFile(path.join(ebooksDirectory, file.name), Buffer.from(await file.arrayBuffer())); // Saving the ebook file

    // Saving the ebook information to the database
    const ebook = await prisma.ebook.create({
      data: {
        title,
        author,
        description,
        publishedAt,
        fileUrl,
        coverPageUrl,
      },
    });

    // Success message
    return NextResponse.json({ message: "Ebook added successfully!", ebook });
  } catch {
    // Error handler
    return NextResponse.json({ error: "Something went wrong" }, { status: 500 }); // Status code 500 for internal server error
  }
}
