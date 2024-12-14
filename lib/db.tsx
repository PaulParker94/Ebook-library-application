// Import the PrismaClient from the Prisma client library to interact with the database
import { PrismaClient } from '@prisma/client';

// Instantiate a new PrismaClient instance, to make queries to the database
const prisma = new PrismaClient();

// Export the PrismaClient instance 
export { prisma };
