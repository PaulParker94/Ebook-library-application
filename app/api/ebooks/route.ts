import { NextResponse } from 'next/server'; // Import NextResponse from 'next/server'
import { PrismaClient } from '@prisma/client'; // Importing PrismaClient to interact with the database
import { createClient } from '@supabase/supabase-js'; // Import Supabase client

// Creating an instance of PrismaClient to communicate with the database
const prisma = new PrismaClient(); 

// Initialize Supabase client
const supabase = createClient(
  'postgresql://postgres.tshuqzoktjjlooqfenvm:Library_app24@aws-0-eu-west-1.pooler.supabase.com:5432/postgres', 
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRzaHVxem9rdGpqbG9vcWZlbnZtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzQyMTA2NjYsImV4cCI6MjA0OTc4NjY2Nn0.1VcwDJLA5BOx-xcGpg_Gw25fixxgJMx1aSNkLdssiR4' 
);

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

    // Function to upload files to Supabase Storage
    const uploadToSupabase = async (file: File, folder: string): Promise<string> => {
      const { data, error } = await supabase
        .storage
        .from('ebooks') // Make sure to create a bucket called 'ebooks' in Supabase Storage
        .upload(`${folder}/${file.name}`, file.stream(), {
          cacheControl: '3600', // Set cache control headers (optional)
          upsert: true, // Overwrite if file already exists (optional)
        });

      if (error) {
        throw new Error(error.message); // Handle the error if upload fails
      }

      // Ensure the path exists and return the public URL
      if (data?.path) {
        return `https://your-supabase-url/storage/v1/object/public/ebooks/${data.path}`;
      } else {
        throw new Error("Failed to get file URL after upload.");
      }
    };

    // Upload the ebook and cover page files to Supabase Storage
    const fileUrl = await uploadToSupabase(file, 'ebooks');
    const coverPageUrl = await uploadToSupabase(coverPage, 'covers');

    // Saving the ebook information to the database
    const ebook = await prisma.ebook.create({
      data: {
        title,
        author,
        description,
        publishedAt,
        fileUrl, // Now this will always be a string
        coverPageUrl, // Now this will always be a string
      },
    });

    // Success message
    return NextResponse.json({ message: "Ebook added successfully!", ebook });
  } catch (error) {
    console.error('Error while adding ebook:', error); // Log the error for debugging
    // Error handler
    return NextResponse.json({ error: "Something went wrong" }, { status: 500 }); // Status code 500 for internal server error
  }
}
