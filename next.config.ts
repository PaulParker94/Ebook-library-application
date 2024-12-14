import type { NextConfig } from "next";
import dotenv from "dotenv";

dotenv.config();

const nextConfig: NextConfig = {
  /* Add your custom config options here */
  env: {
    JWT_SECRET: process.env.JWT_SECRET, // Expose JWT_SECRET to the app
  },
};

export default nextConfig;
