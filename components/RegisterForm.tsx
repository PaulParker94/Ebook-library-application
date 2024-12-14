// Render the component client-side
"use client"; 

// Import React hooks, necessary modules and icons
import { useState } from 'react';
import { 
  Input,
  Button,
} from "@material-tailwind/react"; 
import { FaEye, FaEyeSlash } from "react-icons/fa"; 

const RegisterForm = () => {
  const [username, setUsername] = useState(""); // Stores the username entered by the user
  const [email, setEmail] = useState(''); // Stores the email entered by the user
  const [password, setPassword] = useState(''); // Stores the password entered by the user
  const [confirmPassword, setConfirmPassword] = useState(''); // Stores the confirmed password
  const [showPassword, setShowPassword] = useState(false); // Toggles password visibility
  const [message, setMessage] = useState(''); // Stores the success or error message  

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault(); // Prevent default form submission
    setMessage(''); // Clear previous messages

    // Check if password and confirm password match
    if (password !== confirmPassword) {
      setMessage('Error: Passwords do not match.');
      return; // If passwords don't match stop form submission
    }

    try {
      // Send registration data to the API which updates the tables in Postgres database
      const response = await fetch('/api/register', {
        method: 'POST', // Sending POST request to the register API
        headers: {
          'Content-Type': 'application/json', // Setting request body type
        },
        body: JSON.stringify({ username, email, password }), // Convert username, email, and password to a JSON string
      });

      // Check if the registration was successful
      if (response.ok) {
        setMessage('Registration successful!'); // Success message
        setUsername(''); // Clear username field
        setEmail(''); // Clear email field
        setPassword(''); // Clear password field
        setConfirmPassword(''); // Clear confirm password field
      } else {
        const errorData = await response.json();
        setMessage(`Error: ${errorData.error}`); // Error message 
      }
    } catch {
      setMessage('Error: Unable to register.'); // Error message
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 flex flex-col items-center">
      
      {/* Username Input */}
      <div className="w-3/6 pt-2 pb-2">
        <Input 
          variant="standard" 
          color="white"
          type="text" 
          id="username" 
          value={username} 
          onChange={(e) => setUsername(e.target.value)} // Update Username on change
          required 
          label="Username" 
        />
      </div>

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
          label="Email Address" 
        />
      </div>

      {/* Password Input */}
      <div className="w-3/6 pt-2 pb-2 relative">
        <Input 
          variant="standard" 
          color="white" 
          type={showPassword ? "text" : "password"} // Toggle password visibility
          id="password" 
          value={password} 
          onChange={(e) => setPassword(e.target.value)} // Update password on change
          required 
          label="Password" 
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

      {/* Confirm Password Input */}
      <div className="w-3/6 pt-2 pb-2 relative">
        <Input 
          variant="standard" 
          color="white" 
          type={showPassword ? "text" : "password"} // Toggle password visibility
          id="confirmPassword" 
          value={confirmPassword} 
          onChange={(e) => setConfirmPassword(e.target.value)} // Update confirm password on change
          required 
          label="Confirm Password" 
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

      {/* Already Have Account Link */}
      <a 
        href="/login" 
        className="px-5 py-0 text-xs 2xl:text-2xl font-semibold leading-6 text-white hover:focus:text-gray-300 hover:text-gray-300 hover:underline 2xl:mt-20"
      >
        Already have an account? <span aria-hidden="true">→</span>
      </a>

      {/* Submit Button */}
      <Button variant="outlined" color="white" type="submit">
        Register
      </Button>

      {/* Display error or success message */}
      {message && <p className="mt-2 text-sm text-red-500">{message}</p>}
    </form>
  );
};

export default RegisterForm; // Export the RegisterForm component 
