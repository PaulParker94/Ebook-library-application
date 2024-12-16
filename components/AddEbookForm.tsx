// Render the component client-side
"use client"; 

// Import React hooks and import necessary modules
import {
  Input, 
  Button, 
  Typography, 
} from "@material-tailwind/react";
import { useState, useRef } from "react"; 

const AddEbookForm = () => {
  // State hooks for managing form values
  const [title, setTitle] = useState(""); // To store the book title
  const [author, setAuthor] = useState(""); // To store the author name
  const [description, setDescription] = useState(""); // To store the description
  const [publishedAt, setPublishedAt] = useState(""); // To store the publish date
  const [file, setFile] = useState<File | null>(null); // To store the ebook file 
  const [coverPage, setCoverPage] = useState<File | null>(null); // To store the cover page file 
  const [message, setMessage] = useState(""); // To store messages such as success or error messages

  // References for file input fields
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const coverPageInputRef = useRef<HTMLInputElement | null>(null);

  // Submit handler for the form
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault(); // Prevent the form from submitting the default way
    setMessage(""); // Clear previous messages

    const formData = new FormData(); // Create a new FormData object to handle form data
    formData.append("title", title); // Add title to the form data
    formData.append("author", author); // Add author to the form data
    formData.append("description", description); // Add description to the form data
    formData.append("publishedAt", publishedAt); // Add published date to the form data

    // Append files if they exist
    if (file) formData.append("file", file); // If a file is selected, append it
    if (coverPage) formData.append("coverPage", coverPage); // If a cover page is selected, append it

    try {
      const response = await fetch("/api/ebooks", { // Make a POST request to the server
        method: "POST", // Use POST method to send the form data
        body: formData, // Send the form data as the body of the request
      });

      if (response.ok) { // Check if the response was successful
        setMessage("Ebook added successfully!"); // Set a success message

        // Reset form fields
        setTitle("");
        setAuthor("");
        setDescription("");
        setPublishedAt("");
        setFile(null);
        setCoverPage(null);

        // Reset the file inputs using references
        if (fileInputRef.current) fileInputRef.current.value = "";
        if (coverPageInputRef.current) coverPageInputRef.current.value = "";

        // Reload the page after submission
        window.location.reload();
      }
    } catch {
      setMessage("Error: Unable to add ebook."); // If the fetch request fails, show an error message
    }
  }

  return (
    <form
      onSubmit={handleSubmit} // Handle form submission
      className="relative flex flex-col items-center justify-center mb-2 w-full px-4 sm:px-6 lg:px-74"
    >
      <div className="mb-1 flex flex-col items-center justify-center gap-6 w-full max-w-lg min-h-screen">
        {/* Book Title Input */}
        <Typography variant="h6" color="blue-gray" className="pt-3 text-lg underline" {...({} as React.ComponentProps<typeof Typography>)}>
          Book Title
        </Typography>
        <Input
          type="text"
          id="title"
          size="lg"
          placeholder="Sample Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)} // Update title state
          required
          className="bg-white !border-t-blue-gray-200 focus:!border-t-gray-500"
          labelProps={{
            className: "before:content-none after:content-none", 
          }} {...({} as React.ComponentProps<typeof Input>)}
        />

        {/* Author Input */}
        <Typography variant="h6" color="blue-gray" className="pt-3 text-lg underline" {...({} as React.ComponentProps<typeof Typography>)}>
          Author
        </Typography>
        <Input
          type="text"
          id="author"
          size="lg"
          placeholder="Sample Author"
          value={author}
          onChange={(e) => setAuthor(e.target.value)} // Update author state
          required
          className="bg-white !border-t-blue-gray-200 focus:!border-t-gray-500"
          labelProps={{
            className: "before:content-none after:content-none", 
          }} {...({} as React.ComponentProps<typeof Input>)}
        />

        {/* Description Input */}
        <Typography variant="h6" color="black" className="pt-3 text-lg underline" {...({} as React.ComponentProps<typeof Typography>)}>
          Description
        </Typography>
        <textarea
          id="description"
          placeholder="Sample Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)} // Update description state
          required
          className="!border-t-blue-gray-500 focus:!border-t-gray-500 w-full pb-16"
        ></textarea>

        {/* Publish Date Input */}
        <label
          htmlFor="publishedAt"
          className="block text-black text-base underline"
        >
          Published Date
        </label>
        <input
          type="date"
          id="publishedAt"
          value={publishedAt}
          onChange={(e) => setPublishedAt(e.target.value)} // Update published date state
          required
          className="mt-1"
        />

        {/* Ebook File Input */}
        <label
          htmlFor="file"
          className="block text-black text-base underline"
        >
          Ebook File
        </label>
        <input
          type="file"
          id="file"
          accept=".html"
          onChange={(e) => setFile(e.target.files?.[0] || null)} // Update file state
          required
          className="mt-1 block lg:px-24 w-52 lg:w-96"
          ref={fileInputRef} // Reference for file input
        />

        {/* Cover Page Input */}
        <label
          htmlFor="coverPage"
          className="block text-black text-base underline"
        >
          Cover Page
        </label>
        <input
          type="file"
          id="coverPage"
          accept="image/*"
          onChange={(e) => setCoverPage(e.target.files?.[0] || null)} // Update cover page state
          required
          className="mt-1 block lg:px-24 w-52 lg:w-96"
          ref={coverPageInputRef} // Reference for cover page input
        />

        {/* Submit Button */}
        <Button type="submit" className="m-6 w-3/5 lg:w-4/5 sm:w-auto" {...({} as React.ComponentProps<typeof Button>)}>
          Submit
        </Button>
      </div>

      {/* Success or error message */}
      <div className="lg:mt-2">
        {message && <p className="absolute lg:bottom-0 left-1/2 transform -translate-x-1/2 text-sm text-red-500">{message}</p>}
      </div>
    </form>
  );
};

export default AddEbookForm; // Export the form component
