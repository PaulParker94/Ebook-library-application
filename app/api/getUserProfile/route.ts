// Import Prisma client to interact with the database
import { prisma } from '../../../lib/db';

// GET function 
export async function GET(req: Request) {
  // Get the request URL
  const url = new URL(req.url);
  
  // Get 'userId' from the query string
  const userId = url.searchParams.get('userId'); 

  // If 'userId' is missing, return a 400 error status code
  if (!userId) {
    return new Response(JSON.stringify({ error: 'User ID is required' }), {
      status: 400, // Status code 400 for bad request
    });
  }

  // Query the database to find the user by 'userId' and select the 'profilePicture'
  const user = await prisma.user.findUnique({
    where: { id: parseInt(userId) }, // Find user by 'id'
    select: { profilePicture: true }, // Only select the 'profilePicture' field
  });

  // If user is found return profile data, if not return null value
  return new Response(
    JSON.stringify({ user: user || null }),
    { status: 200 } // Successfully updated
  );
}
