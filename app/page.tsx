// Import the components from the components directory
import Navbar from "../components/Navbar"; 
import Hero from '../components/Hero';
import { Footer } from "../components/Footer";

// Create and export the 'HomePage' function
export default function HomePage() {
  return (
    // Flexbox layout container
    <div className="flex flex-col min-h-screen">
      {/* Navbar */}
      <Navbar />
      {/* Main content */}
      <main className="flex-grow">
        <Hero />
      </main>
      {/* Footer */}
      <Footer />
    </div>
  );
}
