"use client";

// Import necessary modules
import { useState } from "react";
import Image from "next/image";
import { Carousel } from "@material-tailwind/react"; // Importing the Carousel component from Material Tailwind

// CarouselCustomNavigation component
export function CarouselCustomNavigation() {
  const [imagesLoaded, setImagesLoaded] = useState(false); // Track if all images are loaded

  return (
    <div className="relative w-full h-[400px]"> {/* Container with fixed height */}
      {!imagesLoaded && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-200">
          <span className="text-gray-500">Loading...</span>
        </div>
      )}
      <Carousel
        className={`rounded-xl transition-opacity ${
          imagesLoaded ? "opacity-100" : "opacity-0"
        }`} {...({} as React.ComponentProps<typeof Carousel>)}
        navigation={({ setActiveIndex, activeIndex, length }) => (
          <div className="absolute bottom-4 left-2/4 z-50 flex -translate-x-2/4 gap-2">
            {new Array(length).fill("").map((_, i) => (
              <span
                key={i} // Unique key for each navigation dot
                className={`block h-1 cursor-pointer rounded-2xl transition-all ${
                  activeIndex === i ? "w-8 bg-white" : "w-4 bg-white/50"
                }`}
                onClick={() => setActiveIndex(i)} // Set active index when UI nav element is clicked
              />
            ))}
          </div>
        )}
      >
        {/* Images in the carousel */}
        <Image
          src="/images/reading-image2.jpg"
          alt="image 1"
          className="w-full h-full object-cover"
          width={500}
          height={500}
          onLoad={() => setImagesLoaded(true)} // Set imagesLoaded to true once image loads
        />
        <Image
          src="/images/reading-image.jpg"
          alt="image 2"
          className="w-full h-full object-cover"
          width={500}
          height={500}
          onLoad={() => setImagesLoaded(true)}
        />
        <Image
          src="/images/reading-image1.jpg"
          alt="image 3"
          className="w-full h-full object-cover"
          width={500}
          height={500}
          onLoad={() => setImagesLoaded(true)}
        />
      </Carousel>
    </div>
  );
}
