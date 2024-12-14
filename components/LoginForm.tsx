// Render the component client-side
"use client";

// Import React hooks, necessary modules and icons
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { 
  Input,
  Button,
} from "@material-tailwind/react"; 
import { FaEye, FaEyeSlash } from "react-icons/fa"; 

const LoginForm = () => {
  const [email, setEmail] = useState(''); // State to store the email 
  const [password, setPassword] = useState(''); // State to store the password 
  const [showPassword, setShowPassword] = useState(false); // Toggles password visibility
  const [message, setMessage] = useState(''); // Stores the success or error message 

  // Router hook to navigate after successful login
  const router = useRouter();

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault(); // Prevent default form submission
    setMessage(''); // Clear previous messages

    try {
      // Sending login request to the API which checks the Postgres database for existing tables
      const response = await fetch('/api/login', {
        method: 'POST', // Sending POST request to the login API
        headers: {
          'Content-Type': 'application/json', // Setting request body type
        },
        body: JSON.stringify({ email, password }), // Convert email, and password to a JSON string
      });

      if (response.ok) { // Check if login was successful
        const data = await response.json();
        localStorage.setItem("token", data.token); // Store the JWT token in localStorage
        setMessage('Login successful!'); // Set success message
        setEmail(''); // Clear email input field
        setPassword(''); // Clear password input field

        // Redirect route based on user role: admin or user
        if (data.isAdmin) {
          router.push('/dashboard/admin'); // Redirect to admin dashboard
        } else {
          router.push('/dashboard/user'); // Redirect to user dashboard
        }
      } else {
        // Handle errors for invalid details
        const errorData = await response.json();
        setMessage(`Error: ${errorData.error}`);
      }
    } catch {
      // Handle errors
      setMessage('Error: Unable to log in.');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 flex flex-col items-center">
      
      {/* Email Input */}
      <div className="w-3/6 pt-2 pb-2">
        <Input 
          variant="standard" 
          color="white" 
          type="email" 
          id="email" 
          value={email} 
          onChange={(e) => setEmail(e.target.value)} // Update email on change
          required 
          label="Email Address" {...({} as React.ComponentProps<typeof Input>)}
        />
      </div>

      {/* Password Input */}
      <div className="w-3/6 pb-2 relative">
        <Input 
          variant="standard" 
          color="white" 
          type={showPassword ? "text" : "password"} // Toggle password visibility
          id="password" 
          value={password} 
          onChange={(e) => setPassword(e.target.value)} // Update password on change
          required 
          label="Password" {...({} as React.ComponentProps<typeof Input>)}
        />

        {/* Eye Icon */}
        <button
          type="button"
          onClick={() => setShowPassword(!showPassword)} // Toggle password visibility
          className="absolute top-1/2 right-3 transform -translate-y-1/2 text-gray-500"
          aria-label="Toggle password visibility"
        >
          {showPassword ? <FaEyeSlash /> : <FaEye />}
        </button>

      </div>

      {/* No Account Link */}
      <a 
        href="/register" 
        className="px-5 py-0 text-xs 2xl:text-2xl font-semibold leading-6 text-white hover:focus:text-gray-300 hover:text-gray-300 hover:underline 2xl:mt-20">
        Don&#39;t have an account? <span aria-hidden="true">→</span>
      </a>

      {/* Submit Button */}
      <Button variant="outlined" color="white" type="submit" {...({} as React.ComponentProps<typeof Button>)}>
        Login
      </Button>

      {/* Display error or success message */}
      {message && <p className="mt-2 text-sm text-red-500">{message}</p>}
    </form>
  );
};

export default LoginForm; // Export LoginForm component
