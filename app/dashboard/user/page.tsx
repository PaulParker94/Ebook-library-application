// Render the component client-side
"use client";

// Import the components from the components directory
import { UserDashboardTabs } from "@/components/UserDashboard";

const UserDashboard = () => {
  return (
    // Outer container
    <div className="p-10 bg-custom-gray">
      <UserDashboardTabs />
    </div>
  );
};

export default UserDashboard; // Export UserDashboard
