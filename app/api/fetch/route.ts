// Import NextResponse from 'next/server'
import { NextResponse } from 'next/server';

// Import prisma to interact with the database
import { prisma } from '../../../lib/db';  

// GET function
export async function GET() {
  // Fetch all ebooks from the database using Prisma's findMany method
  const ebooks = await prisma.ebook.findMany();
  
  // Return ebooks data as a JSON response
  return NextResponse.json(ebooks); 
}
