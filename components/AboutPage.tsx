// Render the component client-side
"use client"; 

// AboutPage component
export default function AboutPage() {
  return (
    <div className="bg-custom-gray">
      {/* Hero Section */}
      <div className="relative isolate px-6 pt-0 lg:px-48 bg-about-pattern bg-no-repeat bg-center bg-cover min-h-screen w-full">
        {/* Container for the hero content */}
        <div className="mx-auto max-w-full">
          <div className="flex items-center justify-center lg:justify-between pt-2">
            {/* Intro Header */}
            <div className="mt-24 text-center lg:mt-32 lg:text-left pb-24">
              {/* Hero Heading */}
              <h1 className="font-sans font-bold tracking-tight text-white text-4xl sm:text-5xl md:text-6xl lg:text-7xl 2xl:text-8xl 2xl:mt-52">
                ABOUT US
              </h1>

              {/* Hero Subheading */}
              <p className="mt-8 text-xs sm:text-base md:text-xl lg:text-sm 2xl:text-3xl lg:w-96 max-w-40 sm:max-w-md md:max-w-lg leading-7 sm:leading-8 text-white font-light 2xl:mt-20">
                Explore a vast collection of ebooks and immerse yourself in the world of endless reading possibilities.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
