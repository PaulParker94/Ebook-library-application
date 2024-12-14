// Import the component from the components directory
import { AdminTimeline } from "./AdminTimelineCard";

// AdminOverviewTab component
export function AdminOverviewTab() {
  return (
    // Flexbox layout container
    <div className="flex flex-row items-center justify-center">
      {/* Admin Timeline */}
      <AdminTimeline />
    </div>
  );
}
