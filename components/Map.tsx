// Import React hooks, Leaflet library, and Leaflet's CSS for proper styling
import React, { useEffect, useRef } from 'react';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// Configure custom marker icons for Leaflet
L.Icon.Default.mergeOptions({
  iconUrl: '/images/marker-icon.png',
  iconRetinaUrl: '/images/marker-icon-2x.png',
  shadowUrl: '/images/marker-shadow.png',
});

// Define data types for GeoJSON feature properties and geometry
interface LibraryProperties {
  Name: string;
  Address1: string;
  Town: string;
  County: string;
  Eircode: string;
  Phone: string;
  Email: string;
  Website: string;
  Opening_Hours_Monday: string;
  Opening_Hours_Tuesday: string;
  Opening_Hours_Wednesday: string;
  Opening_Hours_Thursday: string;
  Opening_Hours_Friday: string;
  Opening_Hours_Saturday: string;
}

interface LibraryGeometry {
  coordinates: [number, number]; // [longitude, latitude]
}

// Represents a library with its geometry and properties
interface LibraryFeature {
  geometry: LibraryGeometry;
  properties: LibraryProperties;
}

// References for the map container and Leaflet map instance
const MapComponent: React.FC = () => {
  const mapRef = useRef<HTMLDivElement | null>(null); // Reference to the map container element
  const mapInstance = useRef<L.Map | null>(null); // Holds the Leaflet map instance

  // Array of GeoJSON file paths to load library locations
  const geojsonFiles = [
    '/geojson/wexford_libraries.geojson',
    '/geojson/Libraries_Roscommon.geojson',
    '/geojson/Wicklow_Libraries_WIW.geojson',
    '/geojson/librarylocationsdlr.geojson',
    '/geojson/Library_Services_SDCC.geojson',
    '/geojson/Libraries_FCC.geojson',
    '/geojson/GCC_Libraries.geojson',
    '/geojson/cork-city-council-libraries.geojson',
  ];

  useEffect(() => {
    // Initialize the map when the component loads
    if (mapRef.current && !mapInstance.current) {
      // Create a Leaflet map instance and set the initial view and zoom level
      mapInstance.current = L.map(mapRef.current).setView([52.655778, -6.65652], 8);

      // Add OpenStreetMap tile layer to the map
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; OpenStreetMap contributors',
      }).addTo(mapInstance.current);

      // Function to load and process GeoJSON data
      const loadGeojson = (filePath: string) => {
        fetch(filePath) // Fetch GeoJSON file
          .then((response) => response.json()) // Parse the response as JSON
          .then((geojsonData: { features: LibraryFeature[] }) => {
            // Iterate through each feature in the GeoJSON data
            geojsonData.features.forEach((feature) => {
              const { coordinates } = feature.geometry; // Extract coordinates (longitude, latitude)
              const {
                Name,
                Address1,
                Town,
                County,
                Eircode,
                Phone,
                Email,
                Website,
                Opening_Hours_Monday,
                Opening_Hours_Tuesday,
                Opening_Hours_Wednesday,
                Opening_Hours_Thursday,
                Opening_Hours_Friday,
                Opening_Hours_Saturday,
              } = feature.properties; // Extract other properties, the library details

              // Create popup content box with relevant library details
              const popupContent = `
                <div style="overflow-y: scroll; max-width: 200px; max-height: 200px; word-wrap: break-word; padding: 12px;">
                  <h3 style="text-decoration: underline; font-size: 15px; font-weight: bold;">${Name}</h3>
                  <p><strong>Address:</strong> ${Address1}, ${Town}, ${County}, ${Eircode}</p>
                  <p><strong>Phone:</strong> ${Phone}</p>
                  <p><strong>Email:</strong> <a href="mailto:${Email}">${Email}</a></p>
                  <p><strong>Website:</strong> <a href="${Website}" target="_blank">${Website}</a></p>
                  <p><strong>Opening Hours (Monday):</strong> ${Opening_Hours_Monday}</p>
                  <p><strong>Opening Hours (Tuesday):</strong> ${Opening_Hours_Tuesday}</p>
                  <p><strong>Opening Hours (Wednesday):</strong> ${Opening_Hours_Wednesday}</p>
                  <p><strong>Opening Hours (Thursday):</strong> ${Opening_Hours_Thursday}</p>
                  <p><strong>Opening Hours (Friday):</strong> ${Opening_Hours_Friday}</p>
                  <p><strong>Opening Hours (Saturday):</strong> ${Opening_Hours_Saturday}</p>
                  <p><strong>Opening Hours (Sunday):</strong> Closed</p>
                  <p><strong>Opening Hours (Bank Holidays):</strong> Closed</p>
                </div>
              `;

              // Add a marker on the map for each feature's coordinates
              L.marker([coordinates[1], coordinates[0]]) // Create a marker at the given coordinates
                .addTo(mapInstance.current!) // Add marker to the map
                .bindPopup(popupContent); // Bind the popup content to the marker
            });
          })
      };

      // Load all the GeoJSON files
      geojsonFiles.forEach((file) => {
        loadGeojson(file);
      });
    }

    // Clean up the map instance when the component is disconneted
    return () => {
      if (mapInstance.current) {
        mapInstance.current.remove(); // Remove the map instance
        mapInstance.current = null; // Set the map instance to null
      }
    };
  }, []); // Empty dependency array ensures this effect runs once on load

  return (
    // Map container element
    <div
      ref={mapRef}
      className="w-full rounded-lg overflow-hidden h-[100vw] sm:h-[50vw] lg:h-[40vw]" // Tailwind classes for styling
    />
  );
};

export default MapComponent; // Export the MapComponent component
