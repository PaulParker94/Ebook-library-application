// Render the component client-side
"use client";

// Import React hooks and import the Link component for navigation between pages
import React, { useState, useEffect } from "react";
import Link from "next/link";

const Navbar = () => {
  // State for showing/hiding the navbar on scroll
  const [isVisible, setIsVisible] = useState(true);
  // State to track the last scroll position
  const [lastScrollY, setLastScrollY] = useState(0);
  // State to control the navbar background colour
  const [bgColor, setBgColor] = useState("bg-transparent");
  // State to control font colour
  const [fontColor, setFontColor] = useState("text-white");
  // State to control button text colour
  const [buttonColor, setButtonColor] = useState("text-white");
  // State to track the hamburger menu open/close state
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  // State to control the logo source
  const [logoSrc, setLogoSrc] = useState("images/home_icon_w.png");

  // Handle scroll to change navbar styles based on scroll position
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY === 0) {
        // Reset styles when at the top of the page
        setBgColor("bg-transparent");
        setFontColor("text-white");
        setButtonColor("text-white");
        setLogoSrc("images/home_icon_w.png");
      } else if (currentScrollY > lastScrollY) {
        // Hide navbar on scroll down
        setIsVisible(false);
        setBgColor("bg-transparent");
      } else {
        // Show navbar on scroll up and change styles
        setIsVisible(true);
        setBgColor("bg-gray-200");
        setFontColor("text-black");
        setButtonColor("text-black");
        setLogoSrc("images/home_icon.png");
      }

      // Update the last scroll position
      setLastScrollY(currentScrollY);
    };

    // Scroll event handler
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [lastScrollY]);

  // Toggle hamburger menu for mobile screens
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-50 ${bgColor} ${fontColor} transition-transform duration-300 ${
        isVisible ? "translate-y-0" : "-translate-y-full"
      }`}
    >
      <div className="flex items-center justify-between px-4 py-2 lg:gap-x-6 lg:px-8">
        {/* Logo */}
        <div>
          <Link href="/" className="flex items-center animate-pulse">
            <img src={logoSrc} alt="Logo" className="h-6 w-auto" />
          </Link>
        </div>

        {/* Hamburger Icon for mobile screens */}
        <div className="lg:hidden flex items-center">
          <button
            onClick={toggleMenu}
            className="text-white focus:outline-none"
          >
            {/* Hamburger icon */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              className="h-6 w-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
        </div>

        {/* Desktop links */}
        <div className="hidden lg:flex lg:gap-x-6 mr-auto pl-24">
          <Link
            href="/visualisations"
            className="rounded-full px-4 py-3 text-sm font-semibold hover:underline hover:-translate-y-1 hover:scale-60 duration-300"
          >
            Visualisations
          </Link>
          <Link
            href="/libraries"
            className="rounded-full px-4 py-3 text-sm font-semibold hover:underline hover:-translate-y-1 hover:scale-60 duration-300"
          >
            Libraries
          </Link>
          <Link
            href="/documentation"
            className="rounded-full px-4 py-3 text-sm font-semibold hover:underline hover:-translate-y-1 hover:scale-60 duration-300"
          >
            Documentation
          </Link>
          <Link
            href="/about"
            className="rounded-full px-4 py-3 text-sm font-semibold hover:underline hover:-translate-y-1 hover:scale-60 duration-300"
          >
            About
          </Link>
        </div>

        {/* Desktop buttons */}
        <div className="hidden lg:flex lg:gap-x-4">
          <Link href="/login">
            <button
              className={`px-4 py-1 text-sm font-semibold border border-white rounded hover:bg-white hover:text-gray-800 ${buttonColor}`}
            >
              Log in
            </button>
          </Link>
          <Link href="/register">
            <button
              className={`px-4 py-1 text-sm font-semibold rounded hover:bg-gray-500 ${
                buttonColor === "text-white"
                  ? "bg-white text-black"
                  : "bg-gray-800 text-white"
              }`}
            >
              Sign up
            </button>
          </Link>
        </div>
      </div>

      {/* Mobile menu */}
      <div
        className={`lg:hidden ${isMenuOpen ? "block" : "hidden"} bg-custom-gray text-white py-4 px-6`}
      >
        <div className="flex flex-col items-end">
        <Link href="/visualisations" className="block py-2 text-sm hover:underline hover:text-gray-300 hover:focus:text-gray-300">
          Visualisations
        </Link>
        <Link href="/libraries" className="block py-2 text-sm hover:underline hover:text-gray-300 hover:focus:text-gray-300">
          Libraries
        </Link>
        <Link href="/documentation" className="block py-2 text-sm hover:underline hover:text-gray-300 hover:focus:text-gray-300">
          Documentation
        </Link>
        <Link href="/about" className="block py-2 text-sm hover:underline hover:text-gray-300 hover:focus:text-gray-300">
          About
        </Link>
        <Link href="/login" className="block py-2 text-sm hover:underline hover:text-gray-300 hover:focus:text-gray-300">
          Log in
        </Link>
        <Link href="/register" className="block py-2 text-sm hover:underline hover:text-gray-300 hover:focus:text-gray-300">
          Sign up
        </Link>
      </div>
    </div>
  </nav>
  );
};

export default Navbar; // Export the Navbar component
