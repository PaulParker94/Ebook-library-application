// Import the PrismaClient from the Prisma client library to interact with the database
import { PrismaClient } from '@prisma/client';

// Instantiate a new PrismaClient instance to interact with the database
const prisma = new PrismaClient();

// Export the Prisma instance 
export default prisma;
