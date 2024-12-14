// Import necessary modules and icons
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
  
  // AdminTimeline component
  export function AdminTimeline() {
    return (
      <div className="w-full max-w-[32rem] p-6 sm:px-8">
        <Timeline>
          <TimelineItem>
            <TimelineConnector />
            <TimelineHeader>
              <TimelineIcon className="p-2">
                <HomeIcon className="h-4 w-4" />
              </TimelineIcon>
              <Typography variant="h5" color="blue-gray" className="text-lg lg:text-xl" {...({} as React.ComponentProps<typeof Typography>)}>
                Welcome, Admin, to Your Dashboard!
              </Typography>
            </TimelineHeader>
            <TimelineBody className="pb-8 text-left">
              <Typography color="gray" className="text-sm lg:text-base font-normal text-gray-600" {...({} as React.ComponentProps<typeof Typography>)}>
                Welcome to ShelfSpace, Admin! Thank you for signing up and joining our community. We&#39;re excited to have you on board! Your admin dashboard is your central hub—manage the eBook collection, upload new content, and ensure everything runs smoothly. Let&apos;s get started on making the platform even better!
              </Typography>
            </TimelineBody>
          </TimelineItem>
          <TimelineItem>
            <TimelineConnector />
            <TimelineHeader>
              <TimelineIcon className="p-2">
                <BookOpenIcon className="h-4 w-4" />
              </TimelineIcon>
              <Typography variant="h5" color="blue-gray" className="text-lg lg:text-xl" {...({} as React.ComponentProps<typeof Typography>)}>
                Manage eBook Collection
              </Typography>
            </TimelineHeader>
            <TimelineBody className="pb-8">
              <Typography color="gray" className="text-sm lg:text-base font-normal text-gray-600" {...({} as React.ComponentProps<typeof Typography>)}> 
                As an admin, you can easily upload new eBooks using the eBook form, expanding the library for users to enjoy! Simply fill out the form to add fresh content and make it available to everyone. You also have the ability to delete any unwanted entries, keeping the collection organized and up-to-date.
              </Typography>
            </TimelineBody>
          </TimelineItem>
          <TimelineItem>
            <TimelineHeader>
              <TimelineIcon className="p-2">
                <PhotoIcon className="h-4 w-4" />
              </TimelineIcon>
              <Typography variant="h5" color="blue-gray" className="text-lg lg:text-xl" {...({} as React.ComponentProps<typeof Typography>)}>
                Personalize Your Admin Profile!
              </Typography>
            </TimelineHeader>
            <TimelineBody>
              <Typography color="gray" className="text-sm lg:text-base font-normal text-gray-600" {...({} as React.ComponentProps<typeof Typography>)}>
                Check out your profile tab to personalize your admin account! You can easily edit your avatar to reflect your unique style. Make your profile truly yours and add a personalized touch. Visit your profile now and make it stand out as an admin!
              </Typography>
            </TimelineBody>
          </TimelineItem>
        </Timeline>
      </div>
    );
  }
  