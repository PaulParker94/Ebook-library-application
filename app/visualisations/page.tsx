// Render the component client-side
"use client";

//Import React hooks and import necessary modules and components
import { useEffect, useState, useCallback } from "react";
import Navbar from "../../components/Navbar";
import BarChart from "../../components/BarChart"; 
import { Footer } from "../../components/Footer";
import {
  Menu,
  MenuHandler,
  MenuList,
  MenuItem,
  Button,
} from "@material-tailwind/react";

// Define the data fetched from the API
interface Point {
  title: string;
  download_count: number;
}

// Specify the format of the API data
interface ApiResponse {
  data: Point[];
}

const VisualisationsPage = () => {
  // State variables for points, sorted points, error, loading, and sort order
  const [points, setPoints] = useState<Point[]>([]); // Ensure points state is always an array
  const [sortedPoints, setSortedPoints] = useState<Point[]>([]); 
  const [error] = useState<string>(""); // Error state to handle API errors
  const [loading, setLoading] = useState<boolean>(true); // Loading state to show loading message
  const [sortOrder, setSortOrder] = useState<string>("frequency"); // Default sorting order

  // Handle sorting order change when user selects an option of Popular or Alphabetical
  const handleSortChange = (order: string) => {
    setSortOrder(order); 
  };

  // Sort the data based on selected order 
  const sortData = useCallback((order: string) => {
    if (points.length === 0) return; // If no data is available return

    // Initialise new variable as empty array and store sorted data
    let sortedData: Point[] = [];
    if (order === "alphabetical") {
      sortedData = [...points].sort((a, b) => a.title.localeCompare(b.title)); // Sort alphabetically by comparing strings with .localeCompare
    } else if (order === "frequency") {
      sortedData = [...points].sort((a, b) => b.download_count - a.download_count); // Sorting is done by subtracting `a.download_count` from `b.download_count` to arrange the elements from highest to lowest download count
    }

    setSortedPoints(sortedData); // Update the state variable with the newly sorted array sortedData
  }, [points]); // The sortData function will run whenever the points array changes

  // Fetch data from the API when the component loads
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true); // Set loading to true before fetching
      try {
        const response = await fetch("/api/visualisations"); // Fetch data from the API
        const data: ApiResponse = await response.json(); // Parse the json response

        // Check if data.data is a valid array, otherwise use an empty array.
        const formattedData = Array.isArray(data.data) ? data.data : [];
        setPoints(formattedData);  // Set points with the fetched data

      } finally {
        setLoading(false); // After the data fetch, set loading to false to indicate the process is complete.
      }
    };
    fetchData();
  }, []); // Run only once when the component is first loaded

  // Sort data whenever `points` or `sortOrder` changes
  useEffect(() => {
    if (points.length > 0) {
      sortData(sortOrder); // Sort data based on the current sort order
    }
  }, [points, sortOrder, sortData]); // Re-run the effect when points, sortOrder, or sortData change

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-custom-gray mb-[-2rem]">
      <Navbar /> {/* Navbar */}
      <main className="flex w-full px-8 py-20 justify-center items-center text-white">
        {loading && <p>Loading data...</p>} {/* Show loading message if data is loading */}

        {/* Render the content only when data has finished loading, no error has occurred, and there are data points to display. */}
        {!loading && !error && sortedPoints.length > 0 && (
          <div className="max-w-2xl w-full mx-auto mt-12 lg:mt-28 text-center">
            <h1 className="font-sans font-bold tracking-tight text-white underline text-2xl sm:text-5xl md:text-6xl lg:text-4xl 2xl:text-8xl 2xl:mt-52">
              Project Gutenberg Most Downloaded
            </h1>
            <div className="my-8">
              {/* Filter Menu for sorting options */}
              <Menu animate={{ mount: { y: 0 }, unmount: { y: 25 } }}>
                <MenuHandler>
                  <Button className="bg-gray-50 text-custom-gray my-4 items-start text-sm sm:text-base md:text-lg px-3 sm:px-5 md:px-4 py-2 sm:py-2" {...({} as React.ComponentProps<typeof Button>)}>
                    Filters
                  </Button>
                </MenuHandler>
                <MenuList className="w-auto sm:w-48 md:w-64" {...({} as React.ComponentProps<typeof MenuList>)}>
                  <MenuItem
                    className={`flex items-center justify-center font-semibold text-custom-gray underline hover:text-gray-500 hover:focus:text-gray-500 py-2 text-sm sm:text-base ${sortOrder === "alphabetical" ? "bg-gray-200" : ""}`}
                    onClick={() => handleSortChange("alphabetical")} {...({} as React.ComponentProps<typeof MenuItem>)}
                  >
                    Alphabetical
                  </MenuItem>
                  <MenuItem
                    className={`flex items-center justify-center font-semibold text-custom-gray underline hover:text-gray-500 hover:focus:text-gray-500 py-2 text-sm sm:text-base ${sortOrder === "frequency" ? "bg-gray-200" : ""}`}
                    onClick={() => handleSortChange("frequency")} {...({} as React.ComponentProps<typeof MenuItem>)}
                  >
                    Popular
                  </MenuItem>
                </MenuList>
              </Menu>
            </div>
            <BarChart data={sortedPoints} /> {/* Render BarChart with sorted data */}
          </div>
        )}

        {/* A No data available message when there is no data to display. */}
        {!loading && !error && sortedPoints.length === 0 && (
          <p>No data available to display</p>
        )}
      </main>
      {/* Footer */}
      <Footer />
    </div>
  );
};

export default VisualisationsPage; // Export the VisualisationsPage component
