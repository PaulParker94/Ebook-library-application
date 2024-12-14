// DocumentationViewer component
export function DocumentationViewer() {
  return (
    <div className="flex relative pb-10 lg:pb-14 lg:mt-3 items-center justify-center bg-custom-gray">
      {/* Embeds the PDF document inside an iframe */}
      <iframe
        src="/Project(Systems%20%26%20Services)%20Proposal%20Submission.pdf" 
        className="w-full h-auto md:h-[95vh] max-w-5xl rounded-lg shadow-lg" 
        style={{
          minHeight: '85vh',
        }}
        title="Documentation Viewer" 
      />
    </div>
  );
}
