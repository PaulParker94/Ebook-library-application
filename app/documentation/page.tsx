// Render the component client-side
"use client";

// Import necessary components from the components directory
import Navbar from "../../components/Navbar";
import { DocumentationViewer } from "../../components/DocumentDisplayer";
import { Footer } from "../../components/Footer";

// Create and export the DocumentationPage function
export default function DocumentationPage() {
  return (
    // Flexbox layout container
    <div className="flex flex-col min-h-screen bg-custom-gray">
      {/* Navbar */}
      <Navbar />
      <main className="flex-grow relative">
        <div className="w-full max-w-2xl mx-auto text-center mt-16 lg:mt-28">
          {/* Main heading */}
          <h1 className="font-sans font-bold tracking-tight underline text-white text-2xl sm:text-5xl md:text-6xl lg:text-4xl 2xl:text-8xl 2xl:mt-52 py-6">
            Project Documentation
          </h1>
          {/* Subheading */}
          <p className="mt-2 mx-16 lg:mx-20 text-xs sm:text-lg md:text-xl lg:text-base 2xl:text-3xl leading-7 sm:leading-8 text-white font-extralight text-center 2xl:mt-20">
            Check out the documentation below.
          </p>
        </div>
        <div className="relative min-h-screen min-w-full px-auto py-10 z-10">
          {/* Documentation viewer */}
          <DocumentationViewer />
        </div>
      </main>
      {/* Footer */}
      <Footer />
    </div>
  );
}
