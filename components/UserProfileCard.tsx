// Import React hooks, token and necessary modules
import Image from 'next/image';
import { useEffect, useState } from 'react'; // Import useState and useEffect hooks
import jwt from 'jsonwebtoken'; // Import the jwt library to decode the token
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
  Button,
} from "@material-tailwind/react";

// Define an interface for the token object
interface DecodedToken {
  userId: string;
  username: string;
  email: string;
}

export function UserProfileCard() {
  const [username, setUsername] = useState(''); // State to store the username
  const [email, setEmail] = useState(''); // State to store the email
  const [selectedImage, setSelectedImage] = useState(''); // State for selected profile image, initially empty value
  const [showPopup, setShowPopup] = useState(false); // State to toggle Popup visibility
  const [errorMessage, setErrorMessage] = useState(''); // State for error message
  const [successMessage, setSuccessMessage] = useState(''); // State for success message

  // Image pool 
  const imagePool = [
    '../images/avatar-man.svg',
    '../images/avatar-woman-5.svg',
    '../images/avatar-man-1.svg',
    '../images/avatar-woman-6.svg',
    '../images/avatar-man-2.svg',
    '../images/avatar-woman-7.svg',
    '../images/avatar-man-3.svg',
    '../images/avatar-woman-8.svg',
    '../images/avatar-man-4.svg',
    '../images/avatar-woman.svg',
    '../images/avatar-woman-1.svg',
    '../images/avatar-woman-2.svg',
    '../images/avatar-woman-3.svg',
    '../images/avatar-woman-4.svg',
  ];

  useEffect(() => {
    const token = localStorage.getItem("token"); // Retrieve the token from localStorage

    if (token) {
      try {
        const decodedToken = jwt.decode(token) as DecodedToken; // Decode the token with the declared interface

        if (decodedToken && decodedToken.userId) {
          setUsername(decodedToken.username || 'Default Username');
          setEmail(decodedToken.email || 'Default Email');
          // Fetch the profile picture from the API
          fetch(`/api/getUserProfile?userId=${decodedToken.userId}`)
            .then((response) => response.json()) // Parse the JSON response
            .then((data) => {
              // Set the user's profile picture or a default image
              if (data.user) {
                setSelectedImage(data.user.profilePicture || '../images/avatar-man-1.svg');
              }
            });
        }
      } catch {
        setErrorMessage('Error decoding the token');
      }
    }
  }, []); // Runs once on component load

  // Handle image selection
  const handleImageSelect = async (image: string) => {
    setSelectedImage(image); // Update selected image
    setShowPopup(false); // Close the Popup

    // Get the token from localStorage
    const token = localStorage.getItem("token"); 
    if (token) {
      try {
        // Sending a POST request to update the profile picture in the database
        const response = await fetch('/api/updateProfile', { 
          method: 'POST', // Sending POST request to the updateProfile API
          headers: {
            'Content-Type': 'application/json', // Setting request body type
          },
          body: JSON.stringify({ profilePicture: image, token }), // Send selected image and token
        });

        const data = await response.json();
        if (response.ok) {
          setSelectedImage(data.user.profilePicture); // Set the updated profile picture
          setSuccessMessage(data.message || 'Profile picture updated successfully!'); // Set success message
          setTimeout(() => setSuccessMessage(''), 3000); // Clear message after 3 seconds
        } else {
          setErrorMessage(data.error || 'Failed to update profile picture');
        }
      } catch (error) {
        console.error('Error during fetch:', error);
        setErrorMessage('Error updating profile picture');
      }
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen p-2">
      <Card className="min-h-screen w-full sm:w-4/5 md:w-2/5" {...({} as React.ComponentProps<typeof Card>)}>
        <CardHeader floated={false} className="h-60 lg:h-80" {...({} as React.ComponentProps<typeof CardHeader>)}>
          {/* If selectedImage is not set, fallback to default */}
          <Image
            src={selectedImage || '/images/avatar-man-1.svg'}  
            alt="profile-picture"
            width={500}  
            height={300} 
            className="rounded-full" 
          />
        </CardHeader>
        <CardBody className="text-center" {...({} as React.ComponentProps<typeof CardBody>)}>
          <Typography variant="h4" color="blue-gray" className="underline my-4 lg:my-2 text-x1 lg:text-3xl" {...({} as React.ComponentProps<typeof Typography>)}>
            {username}
          </Typography>
          <Typography color="blue-gray" className="mt-12 text-lg lg:text-2xl" {...({} as React.ComponentProps<typeof Typography>)}>
            {email}
          </Typography>
        </CardBody>
        <CardFooter className="flex justify-center gap-7 pt-2" {...({} as React.ComponentProps<typeof CardFooter>)}>
          <Button
            onClick={() => setShowPopup(true)} // Open the Popup
            className="text-xs mt-20" {...({} as React.ComponentProps<typeof Button>)}>
            Change Profile Picture
          </Button>
        </CardFooter>
      </Card>

      {/* Error message */}
      {errorMessage && (
        <div className="text-center text-red-500 mt-4">
          <Typography {...({} as React.ComponentProps<typeof Typography>)}>{errorMessage}</Typography>
        </div>
      )}

      {/* Success message */}
      {successMessage && (
        <div className="lg:mt-2">
          <p className="absolute bottom-40 lg:bottom-[-5rem] left-1/2 transform -translate-x-1/2 text-sm text-green-500">
            {successMessage}
          </p>
        </div>
      )}

      {/* Popup for image selection */}
      {showPopup && (
        <div className="fixed inset-0 pb-2 flex items-center justify-center lg:items-center lg:justify-center bg-black bg-opacity-50">
          <div className="bg-white p-2 sm:p-6 rounded-lg shadow-lg w-9/12 sm:w-3/4 md:w-1/2 lg:w-2/3 max-h-[90vh] overflow-y-auto">
            <Typography variant="h6" className="mb-4 text-center underline" {...({} as React.ComponentProps<typeof Typography>)}>
              Choose a Profile Picture
            </Typography>
            <div className="flex flex-wrap justify-center gap-4">
              {imagePool.map((image, index) => (
                <Image
                  key={index}
                  src={image}
                  alt={`avatar ${index + 1}`}
                  className="w-16 h-16 lg:w-24 lg:h-24 rounded-full cursor-pointer border-2 border-transparent hover:border-blue-500"
                  width={100}  
                  height={100} 
                  onClick={() => handleImageSelect(image)} // Update image on click
                 />
              ))}
            </div>
            <div className="mt-8 flex justify-center">
              <Button onClick={() => setShowPopup(false)} color="red" {...({} as React.ComponentProps<typeof Button>)}>
                Close
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
