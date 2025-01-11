"use client";

import { useEffect, useState } from "react";

// Define the component
const Safe = () => {
  const [faqData, setFaqData] = useState([]);

  // Fetch FAQ data from the API
  useEffect(() => {
    const fetchFaqData = async () => {
      try {
        const response = await fetch('https://677f757b0476123f76a68a42.mockapi.io/api/labs/v1/page_config');
        const data = await response.json();

        // Find the FAQ section with id 7
        const faqSection = data[0]?.page_config.find(config => config.id === "7");

        // Filter the question with id 1 from the FAQ section
        const filteredFaq = faqSection?.props.filter(faq => faq.id === 1) || [];

        // Set the FAQ data to the state
        setFaqData(filteredFaq);
      } catch (error) {
        console.error('Error fetching FAQ data:', error);
      }
    };

    fetchFaqData();
  }, []);

  // Function to replace the image URL based on the path
  const replaceImageUrl = (imgPath) => {
    if (imgPath === "/assets/icons/labs/microscope.svg") {
      return "https://www.medibuddy.in/assets/icons/labs/test.svg";
    }
    if (imgPath === "/assets/icons/labs/runner.svg") {
      return "https://www.medibuddy.in/assets/icons/labs/rider.svg";
    }
    if (imgPath === "/assets/icons/message.svg") {
      return "https://www.medibuddy.in/assets/icons/mail.svg";
    }
    return imgPath; // Return the original path if no match is found
  };

  return (
    <section id="Safe" className="py-16 relative space-x-4 bg-[#ffffff]">
      <div className="container mx-auto px-4">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold text-left text-black" style={{ color: "#050a4e" }}>
          How it works?
        </h2>

        {/* Display the FAQ section in a responsive way */}
        <div className="mt-8 flex flex-col  sm:grid-cols-1  md:grid-cols-1 lg:grid-cols-1 gap-4">
          {faqData.map((faq, index) => (
            <div key={index} className="flex items-start  flex-col sm:flex-row md:flex-row lg:flex-row">
      
              {faq.points.map((point, idx) => (
                <div key={idx} className="flex items-center space-x-4 mb-4">
            
                  <img
                    src={replaceImageUrl(point.img)}
                    alt={`Point ${idx + 1}`}
                    className="w-8 h-8" // Adjust size of images
                  />
                  <p className="text-gray-600">{point.pnt}</p>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>

      <div className="container mx-auto py-16 px-8">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold text-left text-black" style={{ color: "#050a4e" }}>
        100% Safe & Secure Lab Tests
        </h2>

    
      </div>
    </section>
    
  );
};

export default Safe;
