// Render the component client-side
"use client";

// Import the components from the components directory and import necessary modules
import Image from 'next/image';
import { useEffect } from "react";
import { CardDefault } from "./InfoCard";
import { CarouselCustomNavigation } from "./ImageCarousel";
import { CardWithLink } from "./DocumentCard";
import { TestimonialCard } from "./UserReviewCard";
import { HorizontalCard } from "./PreviewCard";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";

// Hero Component
export default function Hero() {
  // Scroll to a section function triggered by the up arrow click
  const scrollToSection = (sectionId: string) => {
    const sectionElement = document.getElementById(sectionId);
    if (sectionElement) {
      sectionElement.scrollIntoView({ behavior: "smooth" });
    }
  };
  
  useEffect(() => {
    // Register the ScrollTrigger plugin for scroll-based animations
    gsap.registerPlugin(ScrollTrigger);

    // Animate <h1> in #textSection when it comes into view
    gsap.fromTo(
      "#textSection h1",
      {
        opacity: 0, // Start as invisible
        y: 50, // Animation starting place
      },
      {
        opacity: 1, // End with full opacity
        y: 0, // Move to original position
        duration: 3, // Duration of animation
        ease: "power1.out", // Ease for smooth animation
        scrollTrigger: {
          trigger: "#textSection", // Animation trigger
          start: "top 75%", // Animation starts
          once: true, // Animation runs only once
        },
      }
    );
    // Animate <h1> in #homeSection when it comes into view
    gsap.fromTo(
      "#homeSection h1",
      {
        opacity: 0, // Start as invisible
        y: 50, // Animation starting place
      },
      {
        opacity: 1, // End with full opacity
        y: 0, // Move to original position
        duration: 2, // Duration of animation
        ease: "power1.out", // Ease for smooth animation
        scrollTrigger: {
          trigger: "#homeSection", // Trigger animation when #imageSection is in view
          start: "top 75%", // Animation starts
          once: true, // Animation runs only once
        },
      }
    );

    // Animate <p> in #imageSection when it comes into view
    gsap.fromTo(
      "#homeSection p",
      {
        opacity: 0, // Start as invisible
        y: 30, // Animation starting place
      },
      {
        opacity: 1, // End with full opacity
        y: 0, // Move to original position
        duration: 1, // Duration of animation
        delay: 0.2, // Delay after <h1> animation
        ease: "power1.out", // Ease for smooth animation
        scrollTrigger: {
          trigger: "#homeSection", // Animation trigger
          start: "top 75%", // Animation starts
          once: true, // Animation runs only once
        },
      }
    );

    // Animate <h1> in #imageSection when it comes into view
    gsap.fromTo(
      "#imageSection h1",
      {
        opacity: 0, // Start as invisible
        y: 50, // Animation starting place
      },
      {
        opacity: 1, // End with full opacity
        y: 0, // Move to original position
        duration: 3, // Duration of animation
        ease: "power1.out", // Ease for smooth animation
        scrollTrigger: {
          trigger: "#imageSection", // Animation trigger
          start: "top 75%", // Animation starts
          once: true, // Animation runs only once
        },
      }
    );

    // Animate <p> in #textSection when it comes into view
    gsap.fromTo(
      "#textSection p",
      {
        opacity: 0, // Start as invisible
        y: 30, // Animation starting place
      },
      {
        opacity: 1, // End with full opacity
        y: 0, // Move to original position
        duration: 3, // Duration of animation
        delay: 0.2, // Delay after <h1> animation
        ease: "power1.out", // Ease for smooth animation
        scrollTrigger: {
          trigger: "#textSection", // Animation trigger
          start: "top 75%", // Animation starts
          once: true, // Animation runs only once
        },
      }
    );

    // Animate <p> in #imageSection when it comes into view
    gsap.fromTo(
      "#imageSection p",
      {
        opacity: 0, // Start as invisible
        y: 30, // Animation starting place
      },
      {
        opacity: 1, // End with full opacity
        y: 0, // Move to original position
        duration: 2, // Duration of animation
        delay: 0.2, // Delay after <h1> animation
        ease: "power1.out", // Ease for smooth animation
        scrollTrigger: {
          trigger: "#imageSection", // Animation trigger
          start: "top 75%", // Animation starts
          once: true, // Animation runs only once
        },
      }
    );
  }, []); // Empty dependency array ensures this effect runs only once

  return (
    <div className="bg-gray-50">
    {/* Scroll Up Arrow */}
    <Image
      className="fixed right-6 bottom-6 lg:justify-end h-8 w-auto z-50 animate-bounce cursor-pointer"
      src="/images/arrow-up.svg" 
      alt="Arrow Up"
      width={32}  
      height={32} 
      onClick={() => scrollToSection("homeSection")} // Call scrollToSection when clicked
    />

      {/* Hero Section */}
      <div className="relative isolate px-6 pt-0 lg:px-48 bg-hero-pattern bg-no-repeat bg-center bg-cover lg:min-h-screen w-full" id="homeSection">
        <div className="mx-auto max-w-full">
          <div className="flex items-center justify-between pt-2">
            {/* Intro Header */}
            <div className="mt-24 text-left pb-24">
              {/* Hero Heading */}
              <h1 className="font-sans font-bold tracking-tight text-white text-3xl sm:text-5xl md:text-6xl lg:text-7xl 2xl:text-8xl 2xl:mt-52">
                CHANGE THE WAY YOU READ
              </h1>
  
              {/* Hero Subheading */}
              <p className="mt-8 text-base sm:text-lg md:text-xl lg:text-base 2xl:text-3xl max-w-sm sm:max-w-md md:max-w-lg leading-7 sm:leading-8 text-white font-bold 2xl:mt-20">
                Explore a vast catalogue of ebooks. Sign up for free.
              </p>
  
              {/* Link Buttons */}
              <div className="mt-20 flex items-center justify-start gap-x-6">
                {/* Get Started Button */}
                <a 
                  href="/register"
                  className="rounded-full bg-black px-5 py-2 text-sm 2xl:text-2xl font-semibold text-white shadow-sm hover:bg-gray-800 2xl:mt-20">
                  Get started
                </a>
  
                {/* Learn More Button */}
                <a 
                  href="/about" 
                  className="px-5 py-2 text-sm 2xl:text-2xl font-semibold leading-6 text-black hover:focus:text-gray-600 hover:text-gray-600 hover:underline 2xl:mt-20">
                  Learn more <span aria-hidden="true">→</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
  
      {/* Cards Section */}
      <div className="relative bg-gray-50 min-h-screen lg:mb-[-28rem] pt-24 pb-24">
        {/* Responsive Grid for Cards */}
        <section 
          className="grid grid-cols-1 lg:grid-cols-3 lg:grid-rows-3 lg:grid-flow-col gap-4 justify-center items-center mx-4 mb-[-2rem] lg:mb-0 lg:pb-10 sm:mx-10 lg:mx-20" >
          {/* First Card */}
          <div className="rounded-2xl lg:row-span-3 bg-white lg:mt-[-40rem] min-h-64 sm:min-h-[16rem] lg:min-h-[20rem] shadow-2xl text-sm font-semibold text-black flex items-center justify-center">
            <CardDefault />
          </div>
  
          {/* Second Card */}
          <div className="rounded-2xl lg:col-span-2 bg-white min-h-64 sm:min-h-[16rem] lg:min-h-[20rem] shadow-2xl text-sm font-semibold text-black flex items-center justify-center">
            <HorizontalCard />
          </div>
  
          {/* Third Card */}
          <div className="rounded-2xl lg:col-span-3 bg-white min-h-48 sm:min-h-[16rem] lg:min-h-[20rem] shadow-2xl text-sm font-semibold text-black flex items-center justify-center">
            <CarouselCustomNavigation />
          </div>
        </section>
      </div>
    
      {/* Text Section */}
      <div className="relative bg-custom-gradient min-h-[600px] sm:min-h-screen pt-2 pb-14 w-full" id="textSection">
        <div className="flex justify-center items-center text-right mx-auto py-16 px-4 sm:py-14 sm:px-6 lg:px-8">
          <div className="max-w-screen-md px-4">
            {/* Hero Heading */}
            <h1 className="text-center text-4xl text-white font-black tracking-normal sm:text-5xl lg:text-5xl">
              READ, EXPLORE, AND ENGAGE IN A WHOLE NEW WAY!
            </h1>

            {/* Hero Subheading */}
            <p className="mt-16 max-w-2xl mx-auto text-justify text-white text-sm sm:text-lg 2xl:text-4xl leading-7 font-sans font-bold">
              Experience a new way to read and engage with books like never before! Our platform combines cutting-edge technology to offer a personalized reading experience, featuring interactive elements, real-time updates, and a community-driven approach. Dive deeper into the world of literature with dynamic data visualizations powered by data from Project Gutenberg, offering insights into trends, popular titles, and reading patterns. Whether you&#39;re reading for pleasure or learning, our innovative approach makes exploring eBooks more immersive, engaging, and data-driven than traditional methods. Join today to unlock a whole new dimension of digital reading!
            </p>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-center w-full px-4 pb-12">
        <CardWithLink />
      </div>

      {/* Book Cover Container Section */}
      <div className="relative min-h-screen pt-2" id="imageSection">
        <div className="mx-auto py-6 px-4 sm:py-16 sm:px-6 lg:px-8">
          <div className="px-4">
            {/* Image Section Heading */}
            <h1 className="text-center text-4xl sm:text-4xl md:text-5xl lg:text-5xl 2xl:text-7xl font-black tracking-normal 2xl:mt-14">
              DISCOVER A WORLD OF KNOWLEDGE
            </h1>

            {/* Book Cover Section Description */}
            <p className="text-justify mt-6 sm:mt-8 md:mt-10 2xl:mt-20 max-w-lg sm:max-w-x1 md:max-w-2xl mx-auto text-sm sm:text-lg md:text-xl lg:text-base 2xl:text-3xl leading-6 sm:leading-7 lg:leading-8 font-sans font-semibold">
              Looking to explore a world of eBooks at your fingertips? Our platform offers a seamless experience for discovering, reading, and enjoying eBooks across all genres. Join a growing community of readers and access an ever-expanding library of titles, with such classics as seen below.
            </p>

            {/* Book Cover Grid */}
            <section className="w-full flex justify-center items-center gap-4 pt-16 2xl:mt-20">
              {/* First Book Cover */}
              <div className="box z-12 rounded-lg bg-white bg-book-cover1 bg-cover w-full sm:w-1/3 md:w-1/4 lg:w-1/5 min-h-52 lg:h-80 2xl:min-h-96 shadow-2xl text-sm font-semibold text-black flex items-center justify-center hover:bg-black hover:-translate-y-1 hover:scale-110 duration-300">
              </div>

              {/* Second Book Cover */}
              <div className="box z-11 rounded-lg bg-white bg-book-cover2 bg-cover w-full sm:w-1/3 md:w-1/4 lg:w-1/5 min-h-52 lg:h-80 2xl:min-h-96 shadow-2xl text-sm font-semibold text-black flex items-center justify-center hover:bg-black hover:-translate-y-1 hover:scale-110 duration-300">
              </div>

              {/* Third Book Cover */}
              <div className="box z-10 rounded-lg bg-white bg-book-cover3 bg-cover w-full sm:w-1/3 md:w-1/4 lg:w-1/5 min-h-52 lg:h-80 2xl:min-h-96 shadow-2xl text-sm font-semibold text-black flex items-center justify-center hover:bg-black hover:-translate-y-1 hover:scale-110 duration-300">
              </div>
            </section>
          </div>
        </div>
      </div>

      <div className="container mx-auto mt-[-8rem] lg:mt-0 px-4 lg:px-16 py-12">
        {/* Testimonial Cards Container */}
        <div className="space-y-6">
          <div className="flex rounded-2xl items-center justify-center min-w-64 shadow-2xl text-sm font-semibold text-black">
            {/* Testimonial Card 1 */}
            <TestimonialCard
              name="John M."
              title="Ebook Explorer"
              imageUrl="/images/avatar-man-1.svg"
              rating={5}
              testimonial="This site has transformed my reading habits! The ability to read on any device is a game-changer. I can't wait to explore more titles!"
            />

          </div>
          <div className="flex rounded-2xl items-center justify-center min-w-64 shadow-2xl text-sm font-semibold text-black">
            {/* Testimonial Card 2 */}
            <TestimonialCard
              name="Saoirse W"
              title="Literature Lover"
              imageUrl="/images/avatar-woman-1.svg"
              rating={5}
              testimonial="I absolutely love this ebook platform! The selection of books is fantastic, and the reading experience is seamless. I’ve been able to find so many hidden gems that I wouldn’t have discovered otherwise. Highly recommend it to any book lover!"
            />
          </div>
          <div className="flex rounded-2xl items-center justify-center min-w-64 shadow-2xl text-sm font-semibold text-black">
            {/* Testimonial Card 3 */}
            <TestimonialCard
              name="Deirdre M."
              title="Story Seeker"
              imageUrl="/images/avatar-woman.svg"
              rating={5}
              testimonial="A must-have for any ebook reader! The site is so user-friendly, and I love that I can read books on the go. There’s a huge selection, and I always find something new to enjoy. Excellent experience overall!"
            />
          </div>
          <div className="flex rounded-2xl items-center justify-center min-w-64 shadow-2xl text-sm font-semibold text-black">
            {/* Testimonial Card 4 */}
            <TestimonialCard
              name="Michael T."
              title="World Wanderer"
              imageUrl="/images/avatar-man.svg"
              rating={4}
              testimonial="As an avid reader, I’ve tried many ebook sites, but this one stands out. The books are high quality, the site is fast, and there are always great recommendations."
            />
          </div>
        </div>
      </div>

    </div>// Main container close
  );
}

