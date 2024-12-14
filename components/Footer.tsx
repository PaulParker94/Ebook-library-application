// Render the component client-side
"use client";

// Import necessary modules
import Image from 'next/image';
import { Typography } from "@material-tailwind/react";

// Footer Component
export function Footer() {
  return (
    // Footer container
    <footer className="w-full bg-gray-50">
      {/* Top section of the footer */}
      <div className="flex flex-row items-center flex-wrap justify-between bg-gray-50 text-black text-center p-6">
        {/* Logo Section */}
        <div className="flex justify-start">
        <Image
          src="/images/logo.svg" 
          alt="logo-ct"
          className="w-8 h-6"
          width={32}  
          height={24} 
        />
        </div>

        {/* Navigation Links */}
        <ul className="flex flex-wrap items-center justify-center py-2 gap-y-2 gap-x-6 flex-1">
          <li>
            <Typography
              as="a"
              href="/visualisations"
              color="blue-gray"
              className="text-sm font-normal transition-colors hover:text-gray-500 focus:text-gray-500" {...({} as React.ComponentProps<typeof Typography>)}
            >
              Visualisations
            </Typography>
          </li>
          <li>
            <Typography
              as="a"
              href="/libraries"
              color="blue-gray"
              className="text-sm font-normal transition-colors hover:text-gray-500 focus:text-gray-500" {...({} as React.ComponentProps<typeof Typography>)}
            >
              Libraries
            </Typography>
          </li>
          <li>
            <Typography
              as="a"
              href="/documentation"
              color="blue-gray"
              className="text-sm font-normal transition-colors hover:text-gray-500 focus:text-gray-500" {...({} as React.ComponentProps<typeof Typography>)}
            >
              Documentation
            </Typography>
          </li>
          <li>
            <Typography
              as="a"
              href="/about"
              color="blue-gray"
              className="text-sm font-normal transition-colors hover:text-gray-500 focus:text-gray-500" {...({} as React.ComponentProps<typeof Typography>)}
            >
              About
            </Typography>
          </li>
        </ul>
      </div>

      {/* Divider */}
      <hr className="border-blue-gray-50" />

      {/* Footer bottom text */}
      <Typography
        color="blue-gray"
        className="text-center text-sm font-normal text-black py-4" {...({} as React.ComponentProps<typeof Typography>)}
      >
        &copy; 2024 ShelfSpace
      </Typography>
    </footer>
  );
}
