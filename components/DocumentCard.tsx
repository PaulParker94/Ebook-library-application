// Import necessary modules
import Image from 'next/image';
import {
  Card,
  CardBody,
  CardFooter,
  Typography,
  Button,
} from "@material-tailwind/react";

// CardWithLink component
export function CardWithLink() {
  return (
    <Card className="mt-6 w-96" {...({} as React.ComponentProps<typeof Card>)}> {/* Define the card container */}
      <CardBody {...({} as React.ComponentProps<typeof CardBody>)}>
      <Image
        src="/images/document-logo.svg"  
        alt="logo-ct"
        className="w-14 h-16"
        width={56}  
        height={64} 
      />

        <Typography
          variant="h5"
          color="blue-gray"
          className="mt-2 mb-2" {...({} as React.ComponentProps<typeof Typography>)}
        >
          Project Documentation
        </Typography> {/* Title of the card */}

        <Typography {...({} as React.ComponentProps<typeof Typography>)}>
          Explore the project documentation to learn more about the features, development process, and technical details of the eBook website.
        </Typography> {/* Description of the card */}
      </CardBody>

      <CardFooter className="pt-0" {...({} as React.ComponentProps<typeof CardFooter>)}> {/* Footer section of the card */}
        <a href="/documentation" className="inline-block">
          <Button
            size="sm"
            variant="text"
            className="flex items-center gap-2" {...({} as React.ComponentProps<typeof Button>)}
          >
            Learn More

            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              className="h-4 w-4"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3"
              />
            </svg>
          </Button>
        </a>
      </CardFooter>
    </Card>
  );
}
