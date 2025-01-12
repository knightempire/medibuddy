"use client";

import { useState, useEffect } from "react";

// Define the component
const Faq = () => {
  const [faqs, setFaqs] = useState([]);
  const [expanded, setExpanded] = useState({});

  // Fetch data from the API
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://677f757b0476123f76a68a42.mockapi.io/api/labs/v1/page_config');
        const data = await response.json();
        
        // Filter to find the FAQ section by ID (7 in this case)
        const faqSection = data[0].page_config.find(section => section.id === '7');
        
        if (faqSection) {
          console.log("FAQ Section:", faqSection); // Log the entire FAQ section to check data structure
          setFaqs(faqSection.props);
        }
      } catch (error) {
        console.error("Error fetching FAQ data:", error);
      }
    };

    fetchData();
  }, []);   

  // Toggle the expanded/collapsed state for a given FAQ
  const toggleFAQ = (index) => {
    setExpanded((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  return (
    <section id="Faq" className="py-16 relative bg-[#ffffff] w-full">
      <div className="container mx-auto px-4 w-full">
        <h2
          className="text-2xl sm:text-3xl md:text-4xl font-semibold text-left text-black"
          style={{ color: "#050a4e" }}
        >
          Frequently Asked Questions
        </h2>

        <div className="py-12 px-8 max-w-full mx-auto flex flex-col md:flex-row gap-12 w-full">
          <ul className="w-full">
            {faqs.map((faq, index) => (
              <li key={index}>
                <div className="flex gap-2 items-center">
                  {/* Icon before question */}
                  <img src={`https://www.medibuddy.in/${faq.icon}`} alt="icon" className="w-12 h-12" />
                  <button
                    className="relative flex gap-2 items-center w-full py-5 text-base font-semibold text-left border-t md:text-lg border-base-content/10 text-black"
                    aria-expanded={expanded[index] ? "true" : "false"}
                    onClick={() => toggleFAQ(index)}
                  >
                    <span className="flex-1 text-base-content">{faq.question}</span>
                    <svg
                      className={`flex-shrink-0 w-4 h-4 ml-auto fill-current transform ${
                        expanded[index] ? "rotate-45" : ""
                      }`}
                      viewBox="0 0 16 16"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M3 8h10M8 3v10"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </button>
                </div>
                <div
                  className={`transition-all duration-300 ease-in-out overflow-hidden ${
                    expanded[index] ? "max-h-[500px]" : "max-h-0"
                  }`}
                >
                  <div className="pb-5 pl-6 leading-relaxed">
                    {/* Display answer with left padding */}
                    <p className="mb-4 text-black">{faq.answer}</p>

                    {/* Display points in a list format with SVG bullet and left padding */}
                    <ul className="space-y-2 leading-relaxed text-black pl-6">
                      {faq.points && faq.points.length > 0 ? (
                        faq.points.map((point, pointIndex) => (
                          <li key={pointIndex} className="flex items-start gap-2">
                            {/* SVG as bullet placed before the text */}
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="16"
                              height="20"
                              fill="currentColor"
                              className="bi bi-dot"
                              viewBox="0 0 16 16"
                            >
                              <path d="M8 9.5a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3" />
                            </svg>
                            <span>{point.pnt || point}</span> {/* Display the point */}
                          </li>
                        ))
                      ) : (
                        <p>No points available.</p>
                      )}
                    </ul>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
};

export default Faq;
