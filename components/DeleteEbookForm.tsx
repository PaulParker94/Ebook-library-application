// Import React hooks and necessary modules
import React from "react";
import { Button, Select, Option } from "@material-tailwind/react";

// Define an interface for the ebook object
interface Ebook {
  id: number; 
  title: string; 
}

// Define the interface for DeleteEbookForm
interface DeleteEbookForm {
  ebooks: Ebook[]; // List of ebooks to display in the dropdown
  ebookId: number | null; // The currently selected ebook ID
  onDelete: (ebookId: number) => void; // Callback function to handle ebook deletion
  onSelect: (ebookId: number) => void; // Callback function to handle ebook selection
}

// DeleteEbookForm component handles ebook selection and deletion using properties
const DeleteEbookForm: React.FC<DeleteEbookForm> = ({ ebooks, ebookId, onDelete, onSelect }) => {
  // handleDelete function calls the onDelete callback and reloads the page after deletion
  const handleDelete = (ebookId: number) => {
    onDelete(ebookId);
    window.location.reload(); 
  };

  return (
    <div className="flex flex-col items-center justify-center w-full max-w-xl mx-auto p-4">
      {/* Header */}
      <h2 className="text-xl lg:text-2xl font-semibold mb-4 text-center underline">Delete Ebook</h2>

      {/* Select dropdown */}
      <Select
        label="Select Ebook to Delete" 
        value={ebookId?.toString() || ""} // Set the value to the currently selected ebook ID
        onChange={(e) => onSelect(Number(e))} // When a new option is chosen update selection
        className="mb-4 w-full" {...({} as React.ComponentProps<typeof Select>)}
      >
        {/* Create an option for each ebook  */}
        {ebooks.map((ebook) => (
          <Option key={ebook.id} value={ebook.id.toString()}>
            {ebook.title} {/* Display ebook title */}
          </Option>
        ))}
      </Select>

      {/* Show delete button on selection of ebook */}
      {ebookId && (
        <div className="flex justify-center w-2/5 lg:w-full mt-6">
          <Button color="red" onClick={() => handleDelete(ebookId)} className="w-full sm:w-auto" {...({} as React.ComponentProps<typeof Button>)}>
            Delete Ebook
          </Button>
        </div>
      )}
    </div>
  );
};

export default DeleteEbookForm; // Export the DeleteEbookForm component
