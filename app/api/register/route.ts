import { NextResponse } from 'next/server'; // Import NextResponse from 'next/server'
import { prisma } from '@/lib/db'; // Import Prisma client for interacting with the database
import bcrypt from 'bcryptjs'; // Import for hashing and comparing passwords

// POST function
export async function POST(request: Request) {
  try {
    // Parse the request data
    const body = await request.json();

    // Extract username, email, and password
    const { username, email, password } = body;

    // Validate that username, email, and password are provided
    if (!username || !email || !password) {
      return NextResponse.json({ error: "Username, email, and password are required" }, { status: 400 }); // Status code 400 for bad request
    }

    // Check if the email or username already exists in the database
    const existingUser = await prisma.user.findFirst({
      where: {
        OR: [
          { email }, // Check if email exists
          { username }, // Check if username exists
        ],
      },
    });

    // If either the email or username is taken, return an error
    if (existingUser) {
      return NextResponse.json({ error: "Email or username already exists" }, { status: 400 }); // Status code 400 for bad request
    }

    // Hash the password before saving it to the database
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create the new user in the User table in the database
    await prisma.user.create({
      data: {
        username,
        email,
        password: hashedPassword,
      },
    });

    // Return a success message
    return NextResponse.json({ message: "Registration successful!" });

  } catch {
    // Return error message
    return NextResponse.json({ error: "Something went wrong" }, { status: 500 }); // Status code 500 for internal server error
  }
}
