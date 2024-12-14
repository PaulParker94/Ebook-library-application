// Import React hooks, components and necessary modules 
import Image from 'next/image';
import React, { useState, useEffect } from "react";
import {
  Drawer,
  Tabs,
  TabsHeader,
  Tab,
  Button,
  Select,
  Option
} from "@material-tailwind/react";
import { Square3Stack3DIcon, BookOpenIcon, UserCircleIcon, Cog6ToothIcon } from "@heroicons/react/24/solid";
import EbookReader from "./EbookReader";
import { UserProfileCard } from "./UserProfileCard";
import LogoutButton from "./Logout";
import { OverviewTab } from "./OverviewTab";

// Define an interface for the Ebook object
interface Ebook {
  id: number;
  title: string;
  author: string;
  description: string;
  publishedAt: string;
  fileUrl: string;
  coverPageUrl: string;
}

// Main UserDashboardTabs component
export function UserDashboardTabs() {
  const [open, setOpen] = useState(false); // State for drawer visibility
  const [selectedTab, setSelectedTab] = useState("dashboard"); // State to track selected tab
  const [ebookId, setEbookId] = useState<number | null>(null); // Track the selected ebook ID
  const [ebooks, setEbooks] = useState<Ebook[]>([]); // State to store list of ebooks
  const [loading, setLoading] = useState<boolean>(false); // Loading state for fetching ebooks
  const [error] = useState<string | null>(null); // State to track errors

  // Function to open the drawer
  const openDrawer = () => setOpen(true);

  // Function to close the drawer
  const closeDrawer = () => setOpen(false);

  // Data for each tab in the sidebar, including labels, values, and icons
  const data = [
    { label: "Dashboard", value: "dashboard", icon: Square3Stack3DIcon },
    { label: "ebook Reader", value: "ebookreader", icon: BookOpenIcon },
    { label: "Profile", value: "profile", icon: UserCircleIcon },
    { label: "Settings", value: "settings", icon: Cog6ToothIcon },
  ];

  // Fetch ebooks on component load
  useEffect(() => {
    const fetchEbooks = async () => {
      setLoading(true); // Set loading to true while fetching
      const response = await fetch("/api/fetch");
      const data = await response.json();  
      setEbooks(data); // Store fetched ebooks in state
      setLoading(false); // Set loading to false once fetching is complete
    };

    fetchEbooks();
  }, []); // Empty dependency array ensures it runs only once when the component loads

  // Function to render the relevant content based on selected tab
  const renderContent = () => {
    switch (selectedTab) {
      case "dashboard":
        return <OverviewTab />;
      case "ebookreader":
        return (
          <div className="flex w-full h-full flex-col gap-6 py-4 px-2">
            <h2 className="text-lg lg:text-2xl font-bold text-black underline mb-4 ml-4">Choose a ebook:</h2>

            {/* Loading or error states */}
            {loading && <div className="text-center text-gray-600">Loading ebooks...</div>}
            {error && <div className="text-center text-red-500">{error}</div>}

            {/* Ebook selection dropdown */}
            <Select
              size="lg"
              label="Select Ebook"
              value={ebookId?.toString() || ""}
              onChange={(value) => {
                // Convert the selected value to a number and update the ebookId state
                const selectedId = Number(value);
                setEbookId(selectedId);
              }}
              className="mb-6" {...({} as React.ComponentProps<typeof Select>)}
            >
              {/* Iterate over the ebooks array and create an option for each ebook */}
              {ebooks.map((ebook) => (
                <Option key={ebook.id} value={ebook.id.toString()}>
                  {ebook.title}
                </Option>
              ))}
            </Select>

            {/* If an ebook is selected, display the book details and cover page */}
            {ebookId && (
              <div className="text-center">
                <h3 className="text-x1 lg:text-3xl font-semibold overline mt-4">{ebooks.find((ebook) => ebook.id === ebookId)?.title}</h3>
                <p className="text-sm lg:text-base text-black underline py-2 mt-4">Author: {ebooks.find((ebook) => ebook.id === ebookId)?.author}</p>
                <p className="text-sm lg:text-base text-justify text-gray-600 font-medium mt-4 px-10 lg:px-60">Description: {ebooks.find((ebook) => ebook.id === ebookId)?.description}</p>

                {/* Show cover image only when an ebook is selected */}
                {ebooks.find((ebook) => ebook.id === ebookId)?.coverPageUrl && (
                <Image
                src={ebooks.find((ebook) => ebook.id === ebookId)?.coverPageUrl || '/default-image.jpg'} 
                alt={ebooks.find((ebook) => ebook.id === ebookId)?.title || 'Default Title'}
                className="mt-12 h-80 w-72 lg:h-96 lg:w-80 mx-auto hover:-translate-y-1 hover:scale-110 duration-300"
                width={288} 
                 height={320} 
                />
                )}

                <a
                  href={ebooks.find((ebook) => ebook.id === ebookId)?.fileUrl || "#"} // Link to the ebook's file, opens in a new tab
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm lg:text-base font-light text-red-500 underline mt-6 block hover:text-red-400"
                >
                  Open ebook in a new window
                </a>

                {/* Display the EbookReader component */}
                <div className="overflow-hidden mt-4">
                  <EbookReader ebookId={ebookId} />
                </div>
              </div>
            )}
          </div>
        );
      case "profile":
        return <UserProfileCard />;
      case "settings":
        return <LogoutButton />;
      default:
        return null; // Return nothing if no tab is selected
    }
  };

  // Function to handle tab change
  const handleTabChange = (value: string) => {
    setSelectedTab(value);
    closeDrawer(); // Close the drawer after selecting a tab
  };

  return (
    <>
      {/* Button to open the drawer */}
      <div className="flex items-center justify-center">
        <Button className="text-sm font-semibold" color="red" onClick={openDrawer} {...({} as React.ComponentProps<typeof Button>)}>
          Open Menu
        </Button>
      </div>

      {/* Drawer component to show tabs */}
      <Drawer {...({} as React.ComponentProps<typeof Drawer>)} open={open} onClose={closeDrawer} className="p-4 w-64">
        <Tabs value={selectedTab} orientation="vertical">
          <TabsHeader {...({} as React.ComponentProps<typeof TabsHeader>)}>
            {data.map(({ label, value, icon }) => (
              <Tab {...({} as React.ComponentProps<typeof Tab>)} key={value} value={value} onClick={() => handleTabChange(value)}>
                <div className="flex items-center gap-6 m-2">
                  {React.createElement(icon, { className: "w-5 h-5" })} {/* Render the tab icon */}
                  {label} {/* Render the tab label */}
                </div>
              </Tab>
            ))}
          </TabsHeader>
        </Tabs>
      </Drawer>

      {/* Main content area */}
      <div className="rounded-2xl lg:p-8 bg-gray-50 flex flex-col min-h-screen">
        {renderContent()} {/* Render content based on selected tab */}
      </div>
    </>
  );
}
