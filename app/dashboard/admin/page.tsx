// Render the component client-side
'use client';

// Import the components from the components directory
import { AdminDashboardTabs } from '@/components/AdminDashboard';

const AdminDashboard = () => {
  return (
    // Outer container
    <div className="p-10 bg-custom-gray">
      <AdminDashboardTabs />
    </div>
  );
};

export default AdminDashboard; // Export AdminDashboard
