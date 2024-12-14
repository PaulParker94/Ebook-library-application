// Import necessary modules
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
    <Card className="mt-6 w-96"> {/* Define the card container */}
      <CardBody>
        <img
          src="images/document-logo.svg"
          alt="logo-ct"
          className="w-14 h-16"
        />

        <Typography
          variant="h5"
          color="blue-gray"
          className="mt-2 mb-2"
        >
          Project Documentation
        </Typography> {/* Title of the card */}

        <Typography>
          Explore the project documentation to learn more about the features, development process, and technical details of the eBook website.
        </Typography> {/* Description of the card */}
      </CardBody>

      <CardFooter className="pt-0"> {/* Footer section of the card */}
        <a href="/documentation" className="inline-block">
          <Button
            size="sm"
            variant="text"
            className="flex items-center gap-2"
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
