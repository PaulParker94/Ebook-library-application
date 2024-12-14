// Render the component client-side
"use client";

// Import Necessary modules
import Image from 'next/image';
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
} from "@material-tailwind/react";

// CardDefault component
export function CardDefault() {
  return (
    <Card className="mt-6 w-96" {...({} as React.ComponentProps<typeof Card>)}>
      {/* Card Header with image */}
      <CardHeader color="blue-gray" className="relative h-56" {...({} as React.ComponentProps<typeof CardHeader>)}>
      <Image
        src="/images/map-of-ireland.jpg"  
        alt="Map Image"  
        width={500}  
        height={300}  
      />
      </CardHeader>
      
      {/* Card Body with title and description */}
      <CardBody {...({} as React.ComponentProps<typeof CardBody>)}>
        <Typography variant="h5" color="blue-gray" className="mb-2" {...({} as React.ComponentProps<typeof Typography>)}>
          Interactive Libraries Map
        </Typography>
        <Typography {...({} as React.ComponentProps<typeof Typography>)}>
          Check out our Libraries page to explore an interactive map of Ireland, showcasing library locations. 
          Discover nearby libraries, their services, and more, making it easier to find your next visit!
        </Typography>
      </CardBody>
      
      {/* Card Footer with 'Learn more' link */}
      <CardFooter className="pt-0 flex justify-center text-center" {...({} as React.ComponentProps<typeof CardFooter>)}>
        <a 
          href="/libraries" 
          className="px-5 py-2 text-sm 2xl:text-2xl font-semibold leading-6 text-black hover:focus:text-gray-600 hover:text-gray-600 hover:underline 2xl:mt-20"
        >
          Learn more <span aria-hidden="true">→</span>
        </a>
      </CardFooter>
    </Card>
  );
}
