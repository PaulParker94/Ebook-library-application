import { prisma } from '../../../lib/db'; // Import Prisma client to interact with the database
import jwt from 'jsonwebtoken'; // Import for creating and verifying JSON Web Tokens

// Define an interface for the DecodedToken object
interface DecodedToken {
  userId: number; // User ID extracted from the decoded token
}

// POST function
export async function POST(req: Request) {
  // Extract profile picture URL and token from the request
  const { profilePicture, token } = await req.json();

  // Decode the JWT token
  const decodedToken = jwt.decode(token) as DecodedToken;

  // Check if the token is valid and contains a userId
  if (!decodedToken || !decodedToken.userId) {
    return new Response(JSON.stringify({ error: 'Unauthorized' }), {
      status: 401, // Unauthorized if token is invalid
    });
  }

  try {
    // Update the user's profile picture in the database
    const updatedUser = await prisma.user.update({
      where: { id: decodedToken.userId }, // Find user by ID
      data: {
        profilePicture, // Set new profile picture URL
      },
    });

    // Success message
    return new Response(
      JSON.stringify({ message: 'Profile picture updated', user: updatedUser }),
      {
        status: 200, // Successfully updated
      }
    );
  } catch {
    // Return error message
    return new Response(
      JSON.stringify({ error: 'Failed to update profile picture' }),
      { status: 500 } // Status code 500 for internal server error
    );
  }
}
