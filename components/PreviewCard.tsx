// Import Necessary modules
import {
  Card,
  CardHeader,
  CardBody,
  Typography,
} from "@material-tailwind/react";

// HorizontalCard component
export function HorizontalCard() {
  return (
    <Card className="w-full max-w-[48rem] flex-col sm:flex-row">
      
      {/* Card Body */}
      <CardBody className="sm:w-3/5">
        
        {/* Title section */}
        <Typography
          variant="h6"
          color="gray"
          className="mb-4 uppercase text-center sm:text-center"
        >
          DATA
        </Typography>
        
        {/* Heading for visualizations link */}
        <Typography
          variant="h4"
          color="blue-gray"
          className="mb-8 lg:mb-4 text-center sm:text-center"
        >
          Visualisations using data taken from Project Gutenberg
        </Typography>
        
        {/* Description */}
        <Typography
          color="gray"
          className="mb-4 font-normal text-center sm:text-left"
        >
          The visualizations are powered by data retrieved from the Gutendex API,
          which fetches book catalog information from the Project Gutenberg website.
          This data is then stored in a PostgreSQL database, enabling dynamic and
          interactive visualisations for exploring the book collection.
        </Typography>
        
        {/* Learn More link */}
        <div className="flex justify-center">
          <a
            href="/visualisations"
            className="px-5 py-2 text-sm 2xl:text-2xl font-semibold leading-6 text-black hover:focus:text-gray-600 hover:text-gray-600 hover:underline 2xl:mt-20"
          >
            Learn more <span aria-hidden="true">→</span>
          </a>
        </div>
      </CardBody>

      {/* Image */}
      <CardHeader
        shadow={false}
        floated={false}
        className="ml-2 lg:mt-0 mt-[-2rem] w-full sm:w-2/5 shrink-0 rounded-t-none sm:rounded-l-none"
      >
        <img
          src="/images/Bar-Chart-Vertical.png"
          alt="card-image"
          className="h-full w-full object-cover"
        />
      </CardHeader>
    </Card>
  );
}
