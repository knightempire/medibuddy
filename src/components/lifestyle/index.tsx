"use client";

import { useEffect, useState } from "react";

// Define the component
const Lifestyle = () => {
  const [data, setData] = useState<any>(null);

  // Fetch data from the API
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("https://677f757b0476123f76a68a42.mockapi.io/api/labs/v1/page_config");
        const result = await response.json();
        // Access the page_config array and filter for the LifeStyle Health Check Packages
        const lifestylePackage = result[0]?.page_config?.find((item: any) => item.title === "LifeStyle Health Check Packages");
        setData(lifestylePackage); // Store the relevant data in state
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  // If data is not yet fetched, render a loading state
  if (!data || !data.props) {
    return (
      <section
        id="lifeStyle"
        className="py-16 md:py-20 lg:py-28 relative bg-[#ffffff]"
      >
        <div className="container mx-auto px-4">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold text-left text-black" style={{ color: "#050a4e" }}>
            LifeStyle Health Check Packages
          </h2>
          <p>Loading...</p>
        </div>
      </section>
    );
  }

  return (
    <section
      id="lifeStyle"
      className="py-16  relative bg-[#ffffff]"
    >
      <div className="container mx-auto px-4">
        {/* Title Section */}
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold text-left text-black" style={{ color: "#050a4e" }}>
          {data.title}
        </h2>

        {/* Image Grid Section */}
        <div className="mt-8 grid grid-cols-3 gap-4 sm:grid-cols-2 lg:grid-cols-5">
          {data.props.map((item: any, index: number) => (
            <div
              key={index}
              className="flex flex-col items-center bg-white p-6 rounded-lg shadow-md hover:shadow-xl border border-r-2 transition-shadow duration-300"
            >
              {/* Prepending the base URL to the image src */}
              <img
                src={`https://www.medibuddy.in/${item.imgSrc}`}
                alt={item.title}
                className="w-20 h-20 sm:w-24 sm:h-24 md:w-32 md:h-32 mb-4"
              />
              <span className="text-xs sm:text-sm font-medium text-gray-800">{item.title}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Lifestyle;
