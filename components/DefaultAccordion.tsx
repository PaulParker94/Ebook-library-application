// Import React hooks and import necessary modules
import React from "react";
import {
  Accordion,
  AccordionHeader,
  AccordionBody,
} from "@material-tailwind/react"; // Import Material Tailwind Accordion components

// DefaultAccordion component
export function DefaultAccordion() {
  // State to manage which accordion is open
  const [open, setOpen] = React.useState(1);

  // Function to handle opening and closing the accordion
  const handleOpen = (value) => setOpen(open === value ? 0 : value); // Toggle the opened state based on value

  return (
    <>
      {/* Accordion 1 */}
      <Accordion open={open === 1}>
        <AccordionHeader
          className="bg-custom-black text-white text-sm lg:text-lg"
          onClick={() => handleOpen(1)}
        >
          What is Project Gutenberg?
        </AccordionHeader>
        <AccordionBody className="bg-custom-black text-white text-xs lg:text-base">
          Project Gutenberg is a library of over 70,000 free eBooks. Project
          Gutenberg was the first provider of free electronic books, or eBooks.
          Michael Hart, founder of Project Gutenberg, invented eBooks in 1971 and
          his memory continues to inspire the creation of eBooks and related
          content today. Project Gutenberg is a volunteer effort to digitize and
          archive cultural works, as well as to "encourage the creation and
          distribution of eBooks."
        </AccordionBody>
      </Accordion>

      {/* Accordion 2 */}
      <Accordion open={open === 2}>
        <AccordionHeader
          className="bg-custom-black text-white text-sm lg:text-lg"
          onClick={() => handleOpen(2)}
        >
          What is the Gutendex API?
        </AccordionHeader>
        <AccordionBody className="bg-custom-black text-white text-xs lg:text-base">
          Gutendex is a simple, self-hosted web API for serving book catalog
          information from Project Gutenberg, an online library of free ebooks.
          Project Gutenberg can be a useful source of literature, but its large
          size makes it difficult to access and analyse it on a large scale.
          Thus, an API of its catalog information is useful for automating these
          tasks.
        </AccordionBody>
      </Accordion>

      {/* Accordion 3 */}
      <Accordion open={open === 3}>
        <AccordionHeader
          className="bg-custom-black text-white text-sm lg:text-lg"
          onClick={() => handleOpen(3)}
        >
          How does the Gutendex API work?
        </AccordionHeader>
        <AccordionBody className="bg-custom-black text-white text-xs lg:text-base">
          Gutendex uses Django to download catalog data and serve it in a simple
          JSON REST API.
          <br />
          Project Gutenberg has no such public API of its own, but it publishes
          nightly archives of complicated XML files. Gutendex downloads these
          files, stores their data in a database, and publishes the data in a
          simpler format.
        </AccordionBody>
      </Accordion>

      {/* Accordion 4 */}
      <Accordion open={open === 4}>
        <AccordionHeader
          className="bg-custom-black text-white text-sm lg:text-lg"
          onClick={() => handleOpen(4)}
        >
          Our Mission Statement
        </AccordionHeader>
        <AccordionBody className="bg-custom-black text-white text-xs lg:text-base">
          Our mission is to empower adults in Ireland by providing accessible,
          diverse, and engaging eBooks that foster a love of reading and promote
          lifelong learning. We strive to enhance literacy rates, offering a wide
          range of resources that support personal growth, education, and
          empowerment, ensuring that every individual has the opportunity to
          improve their reading skills and broaden their knowledge.
        </AccordionBody>
      </Accordion>
    </>
  );
}
