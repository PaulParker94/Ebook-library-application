// DocumentationViewer component
export function DocumentationViewer() {
  return (
    <div className="flex flex-col relative pb-10 lg:pb-14 lg:mt-3 items-center justify-center bg-custom-gray overflow-hidden">
      <a
        href="/Project(Systems%20%26%20Services)%20Proposal%20Submission.pdf"
        target="_blank"
        rel="noopener noreferrer"
        className="text-xs lg:text-base font-normal lg:font-medium pb-6 text-red-500 underline mt-6 block hover:text-red-400"
      >
      Open PDF in a new window
      </a>

      {/* Embeds the PDF document inside an iframe */}
      <iframe
        src="/Project(Systems%20%26%20Services)%20Proposal%20Submission.pdf"
        className="w-full sm:w-11/12 md:w-4/5 h-[75vh] sm:h-[90vh] md:h-[100vh] lg:h-[125vh] max-w-5xl rounded-lg shadow-lg"
        style={{
          minHeight: '65vh',
          width: '85%',  
          height: '100%',
          border: 'none',
        }}
        title="Documentation Viewer"
      />
    </div>
  );
}

