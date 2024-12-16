// Import necessary styles and components
import ".//../globals.css";
import Navbar from "../../components/Navbar"; // Import the Navbar component
import RegisterForm from "../../components/RegisterForm"; // Import the RegisterForm component

// Create and export the Register function
export default function Register() {
  return (
    // Outer container
    <div className="bg-custom-gray px-4 pt-24 lg:pt-14 lg:px-8 min-h-screen">
      {/* Navbar */}
      <Navbar />
      {/* Main content */}
      <div className="mx-auto max-w-2xl py-8 sm:py-24 lg:py-12 text-center">
        {/* Main heading */}
        <h1 className="text-5xl sm:text-4xl md:text-5xl font-bold tracking-tight text-white underline">
          Register
        </h1>
        {/* Subheading */}
        <p className="mt-8 sm:mt-6 text-xs sm:text-sm font-light leading-6 sm:leading-8 pb-8 text-gray-200">
          Enter your information below.
        </p>
        {/* Register form */}
        <RegisterForm />
      </div>
    </div>
  );
}
