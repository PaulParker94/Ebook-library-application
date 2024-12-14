// Import necessary modules
import { Button } from "@material-tailwind/react";

// LogoutButton component to handle user logout
const LogoutButton = () => {
  const logout = () => {
    // Remove token from localStorage
    localStorage.removeItem('token');
    
    // Redirect the user to the login page
    window.location.href = '/login';
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-2">
      <p className="text-center justify-center text-sm lg:text-lg font-normal text-black mb-4 w-4/5">
        Finished your session? Logout using the button below.
      </p>
      <Button onClick={logout} className="mt-6 w-2/5 lg:w-1/5 sm:w-auto">
        Logout
      </Button>
    </div>
  );
};

export default LogoutButton; // Export LogoutButton component
