import { NextResponse } from 'next/server'; // Import NextResponse from 'next/server'
import { PrismaClient } from '@prisma/client'; // Importing PrismaClient to interact with the database
import { createClient } from '@supabase/supabase-js'; // Import Supabase client

// Creating an instance of PrismaClient to communicate with the database
const prisma = new PrismaClient(); 

// Initialize Supabase client
const supabase = createClient(
  'https://tshuqzoktjjlooqfenvm.supabase.co', // Supabase Project URL
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRzaHVxem9rdGpqbG9vcWZlbnZtIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTczNDIxMDY2NiwiZXhwIjoyMDQ5Nzg2NjY2fQ.JGFT5rSkyoym7MiG_Pmo5IlWLxi16ZvmtP15_57UT3U' // 'service_role' Supabase API key 
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
      // Upload the file to Supabase Storage buckets
      const { data, error } = await supabase
        .storage
        .from(folder) // Supabase bucket
        .upload(`${folder}/${file.name}`, file.stream(), {
          upsert: true, // If the file already exists then overwrite it
          duplex: 'half', // Allow file upload with duplex stream
        });

      if (error) {
        throw new Error(`Supabase upload error: ${error.message}`);
      }

      // Ensure the file path exists and return the public URL
      if (data?.path) {
        return `https://tshuqzoktjjlooqfenvm.supabase.co/storage/v1/object/public/${folder}/${data.path}`;
      } else {
        throw new Error("Failed to get file URL after uploading ebook form data.");
      }
    };

    // Upload the ebook file and cover page to Supabase Storage
    const fileUrl = await uploadToSupabase(file, 'ebooks');
    const coverPageUrl = await uploadToSupabase(coverPage, 'coverPages');

    // Save the ebook information to the database
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
    // Error message
    return NextResponse.json({ error: "Something went wrong" }, { status: 500 }); // Status code 500 for internal server error
  }
}
