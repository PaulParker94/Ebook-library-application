// Import the components from the components directory
import { TimelineWithIcon } from "./TimelineCard";

// OverviewTab component
export function OverviewTab() {
  return (
    // Flexbox layout container
    <div className="flex flex-row items-center justify-center">
      <TimelineWithIcon />
    </div>
  );
}
