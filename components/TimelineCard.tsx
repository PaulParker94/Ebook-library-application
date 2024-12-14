// Import necessary modules and Icons
import {
  Timeline,
  TimelineItem,
  TimelineConnector,
  TimelineHeader,
  TimelineIcon,
  TimelineBody,
  Typography,
} from "@material-tailwind/react";
import { HomeIcon, BookOpenIcon, PhotoIcon } from "@heroicons/react/24/solid";

// TimelineWithIcon component
export function TimelineWithIcon() {
  return (
    <div className="w-full max-w-[32rem] p-6 sm:px-8">
      <Timeline>
        <TimelineItem>
          <TimelineConnector />
          <TimelineHeader>
            <TimelineIcon className="p-2">
              <HomeIcon className="h-4 w-4" />
            </TimelineIcon>
            <Typography variant="h5" color="blue-gray" className="text-lg lg:text-xl">
              Welcome to Your Dashboard!
            </Typography>
          </TimelineHeader>
          <TimelineBody className="pb-8 text-left">
            <Typography color="gray" className="text-sm lg:text-base font-normal text-gray-600">
              Welcome to ShelfSpace! Thank you for signing up and joining our community. We're thrilled to have you on board! Your dashboard is your central hub—explore features, manage your account, and get the most out of your experience. Let’s get started on achieving your goals together! 
            </Typography>
          </TimelineBody>
        </TimelineItem>
        <TimelineItem>
          <TimelineConnector />
          <TimelineHeader>
            <TimelineIcon className="p-2">
              <BookOpenIcon className="h-4 w-4" />
            </TimelineIcon>
            <Typography variant="h5" color="blue-gray" className="text-lg lg:text-xl">
              Explore Our eBook Collection!
            </Typography>
          </TimelineHeader>
          <TimelineBody className="pb-8">
            <Typography color="gray" className="text-sm lg:text-base font-normal text-gray-600">
              Explore our extensive collection of eBooks, carefully curated for your reading pleasure! With the eBook reader, you can dive into new stories, learn something new, or relax with your favorite genres—all at your fingertips. Start exploring today and enjoy a world of knowledge and entertainment!
            </Typography>
          </TimelineBody>
        </TimelineItem>
        <TimelineItem>
          <TimelineHeader>
            <TimelineIcon className="p-2">
              <PhotoIcon className="h-4 w-4" />
            </TimelineIcon>
            <Typography variant="h5" color="blue-gray" className="text-lg lg:text-xl">
              Customize Your Profile!
            </Typography>
          </TimelineHeader>
          <TimelineBody>
            <Typography color="gray" className="text-sm lg:text-base font-normal text-gray-600">
              Check out your profile tab to personalise your account! You can easily edit your avatar to reflect your unique style. Make your profile truly yours and keep it fresh with a personalized touch. Visit your profile now and make it stand out!
            </Typography>
          </TimelineBody>
        </TimelineItem>
      </Timeline>
    </div>
  );
}
