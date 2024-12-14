// Render the component client-side
"use client"; 

// Import the components from the components directory and import necessary modules
import dynamic from "next/dynamic";
import Navbar from "../../components/Navbar"; 
import { Footer } from "../../components/Footer"; 

// Disable server-side rendering for the Map component
const Map = dynamic(() => import("../../components/Map"), { ssr: false });

// Create and export the 'LibrariesPage' function
export default function LibrariesPage() {
  return (
    // Flexbox layout container
    <div className="flex flex-col min-h-screen bg-custom-gray">
      {/* Navbar */}
      <Navbar />
      {/* Main content */}
      <main className="flex-grow">
        <div className="w-full max-w-2xl mx-auto text-center mt-16 lg:mt-28">
          {/* Heading */}
          <h1 className="font-sans font-bold tracking-tight underline text-white text-2xl sm:text-5xl md:text-6xl lg:text-4xl 2xl:text-8xl 2xl:mt-52 py-6">
            Discover Libraries Around Ireland
          </h1>
          {/* Subheading */}
          <p className="mt-2 mx-16 lg:mx-20 text-xs sm:text-lg md:text-xl lg:text-base 2xl:text-3xl leading-7 sm:leading-8 text-white font-extralight text-center 2xl:mt-20">
            Connect with a community of readers and resources in libraries across Ireland.
          </p>
        </div>
        {/* Map Container */}
        <div className="flex justify-center items-center w-full py-16">
          {/* Map container */}
          <div className="rounded-3xl bg-custom-gray px-4 py-4 mt-[-2rem] w-full sm:w-2/3 md:w-3/4 lg:w-4/5 min-h-64 2xl:min-h-96 shadow-2xl">
            <Map /> {/* Map Component */}
          </div>
        </div>
      </main>
      {/* Footer */}
      <Footer />
    </div>
  );
}
