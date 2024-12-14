// Import React hooks
import React, { useState, useEffect } from "react";

// Defining the props interface for EbookReader component
interface EbookReaderProps {
  ebookId: number; // ebookId is passed as a prop to fetch the specific ebook data
}

// Define an interface for the EbookData object
interface EbookData {
  id: number;
  title: string;
  description: string;
  publishedAt: Date;
  fileUrl: string;
}

// EbookReader component for displaying an ebook based on the ebookId
const EbookReader: React.FC<EbookReaderProps> = ({ ebookId }) => {
  // State to store the ebook data fetched from the API
  const [ebookData, setEbookData] = useState<EbookData | null>(null);

  // State to handle loading and error messages
  const [status, setStatus] = useState<{ loading: boolean; error: string | null }>({
    loading: true,
    error: null,
  });

  // useEffect hook to fetch ebook data when the ebookId changes
  useEffect(() => {
    const fetchEbook = async () => {
      setStatus({ loading: true, error: null }); // Reset loading and error states
      try {
        // Fetches data from the API and updates the loading and error states
        const response = await fetch(`/api/reader?id=${ebookId}`);
        if (!response.ok) {
          throw new Error("Failed to fetch ebook data");
        }

        // Parses the fetched ebook data and updates the state; handles errors if the fetch fails
        const data: EbookData = await response.json();
        setEbookData(data);
        setStatus({ loading: false, error: null });
      } catch {
        setStatus({ loading: false, error: "Failed to fetch ebook data" });
      }
    };

    fetchEbook();
  }, [ebookId]); // Runs when ebookId changes

  // If the data is still loading, show a loading message
  if (status.loading) return <div>Loading...</div>;

  // If there's an error, show the error message
  if (status.error) return <div>Error: {status.error}</div>;

  return (
    <div className="text-center justify-center min-h-screen">
      {/* If fileUrl is present, display the ebook content */}
      {ebookData?.fileUrl ? (
        <div>
          <iframe
            src={ebookData.fileUrl}
            width="100%"
            height="600"
            title={ebookData.title}
          />
        </div>
      ) : (
        <div className="text-red-500 py-4">No file available for this ebook</div>
      )}
    </div>
  );
};

export default EbookReader; // Export the EbookReader component
