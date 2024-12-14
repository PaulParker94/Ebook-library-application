// Render the component client-side
"use client"; 

// Import necessary modules
import { Carousel } from "@material-tailwind/react"; // Importing the Carousel component from Material Tailwind

// CarouselCustomNavigation component
export function CarouselCustomNavigation() {
  return (
    <Carousel
      className="rounded-xl"
      navigation={({ setActiveIndex, activeIndex, length }) => (
        <div className="absolute bottom-4 left-2/4 z-50 flex -translate-x-2/4 gap-2">
          {/* Map over the total number of images to create custom navigation UI element */}
          {new Array(length).fill("").map((_, i) => (
            <span
              key={i} // Unique key for each navigation dot
              className={`block h-1 cursor-pointer rounded-2xl transition-all content-[''] ${
                activeIndex === i ? "w-8 bg-white" : "w-4 bg-white/50"
              }`}
              onClick={() => setActiveIndex(i)} // Set active index when UI nav element is clicked
            />
          ))}
        </div>
      )}
    >
      {/* Images in the carousel */}
      <img
        src="/images/reading-image2.jpg" // Image source for the first image
        alt="image 1" // Alt text for accessibility
        className="h-full w-full object-cover" // Make the image cover the entire carousel container
      />
      <img
        src="/images/reading-image.jpg" // Image source for the second image
        alt="image 2" // Alt text for accessibility
        className="h-full w-full object-cover" // Ensure the image covers the container
      />
      <img
        src="/images/reading-image1.jpg" // Image source for the third image
        alt="image 3" // Alt text for accessibility
        className="h-full w-full object-cover" // Ensure the image fills the container
      />
    </Carousel>
  );
}
