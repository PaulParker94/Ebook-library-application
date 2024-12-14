// Render the component client-side
"use client";

// Import React hooks, necessary modules and plugins for animations
import React, { useEffect } from "react";
import { gsap } from "gsap"; 
import { ScrollTrigger } from "gsap/dist/ScrollTrigger"; 
import {
  Card, 
  CardHeader, 
  CardBody, 
  Typography, 
  Avatar,
} from "@material-tailwind/react"; 

// StarIcon component
function StarIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="currentColor"
      className="h-5 w-5 text-yellow-700"
    >
      <path
        fillRule="evenodd"
        d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z"
        clipRule="evenodd"
      />
    </svg>
  );
}

// Define an interface for the TestimonialCardProperties object
interface TestimonialCardProperties {
  name: string; 
  title: string; 
  imageUrl: string; 
  rating: number; // Rating score 
  testimonial: string;
}

// TestimonialCard component 
export function TestimonialCard({
  name,
  title,
  imageUrl,
  rating,
  testimonial,
}: TestimonialCardProperties) {
  useEffect(() => {
    // Register the ScrollTrigger plugin for scroll-based animations
    gsap.registerPlugin(ScrollTrigger);

    // Convert all elements with the class "testimonial-card" into an array using GSAP's toArray method
    const testimonialCards = gsap.utils.toArray(".testimonial-card");

    testimonialCards.forEach((card) => {
      // Animate each card when it enters the viewport
      gsap.fromTo(
        card,
        {
          opacity: 0, // Initial state
          y: 50, // Initial vertical position
        },
        {
          opacity: 1, // Final state
          y: 0, // Reset vertical position
          duration: 0.5, // Duration of the animation
          ease: "power1.out", // Easing function for smoothness
          scrollTrigger: {
            trigger: card, // Animation trigger
            start: "top 80%", // Trigger when 80% of the card is visible
            once: true, // Trigger only once
          },
        }
      );
    });
  }, []); // Empty dependency array ensures this effect runs only once on load

  // Dynamically generate star icons based on the rating
  const stars = Array.from({ length: 5 }, (_, index) => (
    <StarIcon key={index} /> // Return a new star icon for each iteration
  ));

  return (
    <Card
      color="transparent"
      shadow={false}
      className="testimonial-card w-full max-w-[26rem] mx-20 my-4"
    >
      <CardHeader
        color="transparent"
        floated={false}
        shadow={false}
        className="mx-0 flex items-center gap-4 pt-0 pb-8"
      >
        {/* Avatar and Name Section */}
        <Avatar
          size="lg"
          variant="circular"
          src={imageUrl}
          alt={name}
        />
        <div className="flex w-full flex-col gap-0.5">
          <div className="flex items-center justify-between">
            <Typography variant="h5" color="blue-gray">
              {name} {/* Display the name of the person */}
            </Typography>
            <div className="flex items-center gap-0">
              {stars.slice(0, rating)} {/* Display the number of stars based on rating */}
            </div>
          </div>
          <Typography color="blue-gray">{title}</Typography> {/* Display the title */}
        </div>
      </CardHeader>
      <CardBody className="mb-6 p-0">
        <Typography>
          &quot;{testimonial}&quot; {/* Display the testimonial message */}
        </Typography>
      </CardBody>
    </Card>
  );
}
