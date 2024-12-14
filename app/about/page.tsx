// Render the component client-side
"use client";

// Import the components from the components directory
import Navbar from "../../components/Navbar";
import AboutPage from "../../components/AboutPage";
import { DefaultAccordion } from "../../components/DefaultAccordion";
import { Footer } from "../../components/Footer";

// Create and export the AboutHome function
export default function AboutHome() {
  return (
    // Flexbox layout container
    <div className="flex flex-col min-h-screen bg-custom-black">
      {/* Navbar */}
      <Navbar />
      {/* Main content */}
      <main className="flex-grow">
        {/* About Page */}
        <AboutPage />
        {/* Accordion Section */}
        <div className="flex justify-center items-center w-full py-24">
          <div className="box z-12 rounded-lg bg-custom-black px-4 py-4 mt-[-10rem] w-2/3 sm:w-2/3 md:w-3/4 lg:w-4/6 min-h-64 2xl:min-h-96 shadow-2xl flex flex-wrap">
            {/* Accordion */}
            <DefaultAccordion />
          </div>
        </div>
      </main>
      {/* Footer */}
      <Footer />
    </div>
  );
}
