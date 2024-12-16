// DocumentationViewer component
export function DocumentationViewer() {
  return (
    <div className="flex relative pb-10 lg:pb-14 lg:mt-3 items-center justify-center bg-custom-gray overflow-hidden">
      {/* Embeds the PDF document inside an iframe */}
      <iframe
        src="/Project(Systems%20%26%20Services)%20Proposal%20Submission.pdf"
        className="w-4/5 sm:w-11/12 md:w-4/5 h-[75vh] sm:h-[90vh] md:h-[100vh] lg:h-[125vh] max-w-5xl rounded-lg shadow-lg"
        style={{
          minHeight: '65vh',
        }}
        title="Documentation Viewer"
      />
    </div>
  );
}
