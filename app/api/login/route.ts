import { NextResponse } from 'next/server'; // Import NextResponse from 'next/server'
import { prisma } from '@/lib/db'; // Import Prisma client for interacting with the database
import bcrypt from 'bcryptjs'; // Import for hashing and comparing passwords 
import jwt from 'jsonwebtoken'; // Import for creating and verifying JSON Web Tokens

// POST function
export async function POST(request: Request) {
  try {
    // Parse incoming JSON request data to get the email and password
    const { email, password } = await request.json();

    // Validate and ensure that both email and password are provided
    if (!email || !password) {
      return NextResponse.json({ error: 'Email and password are required' }, { status: 400 }); // Status code 400 for bad request
    }

    // Find the user by the provided email in the database
    const user = await prisma.user.findUnique({
      where: { email },
    });

    // If no user is found with the given email, return an error
    if (!user) {
      return NextResponse.json({ error: 'Invalid email or password' }, { status: 400 }); // Status code 400 for bad request
    }

    // Compare the provided password with the hashed password
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return NextResponse.json({ error: 'Invalid email or password' }, { status: 400 }); // Status code 400 for bad request
    }

    // Fetch JWT secret from environment variable .env file
    const jwtSecret = process.env.JWT_SECRET;

    if (!jwtSecret) {
      // If JWT secret is missing, throw an error
      throw new Error("JWT_SECRET is not defined in the environment variables. Please check the .env file");
    }

    // Generate a JWT token with user details if authentication is successful
    const token = jwt.sign(
      { 
        userId: user.id, 
        isAdmin: user.isAdmin,
        username: user.username,  
        email: user.email,        
        profilePicture: user.profilePicture, 
      },
      jwtSecret, // Secret key to encode the token
      { expiresIn: '1h' } // Token expiration time
    );

    // Return a success message with the token and user's admin status
    return NextResponse.json({
      message: 'Login successful!',
      token,
      isAdmin: user.isAdmin,
      profilePicture: user.profilePicture, 
    });
  } catch {
    // Return error message
    return NextResponse.json({ error: 'Something went wrong' }, { status: 500 }); // Status code 500 for internal server error
  }
}
