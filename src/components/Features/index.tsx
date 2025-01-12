"use client";
import { useEffect, useState } from "react";


const Features = () => {
  const [categories, setCategories] = useState<string[]>([]); // State for the categories
  const [selectedCategory, setSelectedCategory] = useState<string>(""); // State for the selected category
  const [quantities, setQuantities] = useState<{ [key: number]: number }>({}); // State to manage quantities for each card
  const [packages, setPackages] = useState<any[]>([]); // State for the fetched packages
  const [filteredPackages, setFilteredPackages] = useState<any[]>([]); // State for filtered packages
  const [currentIndexPerCategory, setCurrentIndexPerCategory] = useState<{ [key: string]: number }>({}); // State for the currentIndex for each category

  useEffect(() => {
    // Fetch data from the API
    fetch("https://677f757b0476123f76a68a42.mockapi.io/api/labs/v1/page_config")
      .then((response) => response.json())
      .then((data) => {
        // Find the specific config with id "3"
        const pageConfig = data[0]?.page_config as FeaturedHealthCheckup[];
        const featuredHealthCheckup = pageConfig?.find((item) => item.id === "3");

        if (featuredHealthCheckup) {
          // Extract the categories from the data and set the state
          const categoriesArray = Object.values(featuredHealthCheckup.categories)[0];
          setCategories(categoriesArray);
          setSelectedCategory(categoriesArray[0]); // Set default selection to the first category
          
          // Set the initial packages
          setPackages(featuredHealthCheckup.props[0]?.packages || []);
        }
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  useEffect(() => {
    // Filter the packages based on selected category
    if (selectedCategory) {
      const filtered = packages.filter((pkg) =>
        pkg.subCategories.includes(selectedCategory.toUpperCase())
      );
      setFilteredPackages(filtered); // Update the state with filtered packages

      // Set currentIndex for the selected category
      setCurrentIndexPerCategory((prev) => ({
        ...prev,
        [selectedCategory]: 0,
      }));
    }
  }, [selectedCategory, packages]); // Only run when selectedCategory or packages change

  // Function to handle category selection
  const handleCategoryClick = (category: string) => {
    setSelectedCategory(category); // Set the selected category
    console.log("Selected Category:", category); // Log the selected category

    // Filter the packages based on the selected category
    const filtered = packages.filter((pkg) =>
      pkg.subCategories.includes(category.toUpperCase())
    );
    setFilteredPackages(filtered); // Update the state with filtered packages

    console.log("Filtered Packages:", filtered); // Log the filtered packages

    // Reset currentIndex for the newly selected category
    setCurrentIndexPerCategory((prev) => ({
      ...prev,
      [category]: 0,
    }));
  };

  // Function to scroll the card container
  const scrollCards = (direction: string) => {
    const cardCount = filteredPackages.length; // Total number of cards (from filtered packages)
    const maxVisibleCards = 3; // Maximum visible cards

    // Get currentIndex for the selected category
    const currentIndex = currentIndexPerCategory[selectedCategory] || 0;

    const newIndex =
      direction === "left"
        ? currentIndex === 0
          ? cardCount - maxVisibleCards
          : currentIndex - 1
        : currentIndex === cardCount - maxVisibleCards
        ? 0
        : currentIndex + 1;

    // Update the currentIndex for the selected category
    setCurrentIndexPerCategory((prev) => ({
      ...prev,
      [selectedCategory]: newIndex,
    }));
  };

  // Handle quantity change (increment and decrement)
  const handleQuantityChange = (index: number, operation: string) => {
    setQuantities((prevQuantities) => {
      const currentQuantity = prevQuantities[index] || 0;
      const newQuantity =
        operation === "increment" ? currentQuantity + 1 : currentQuantity > 0 ? currentQuantity - 1 : 0;

      return {
        ...prevQuantities,
        [index]: newQuantity,
      };
    });
  };

  // Check if Next/Previous buttons should be shown based on filtered packages
  const showNavButtons = filteredPackages.length > 3;

  return (
    <section id="features" className="py-16 md:py-20 lg:py-28 relative bg-[#e8f2fe]">
      <div className="container mx-auto px-4">
        {/* Flex container for the title */}
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-lg sm:text-2xl md:text-3xl font-semibold text-left" style={{ color: "#050a4e" }}>
          Featured Health Check-ups
          </h2>
          <button className="text-blue-500 font-semibold text-sm sm:text-base">
            View All
          </button>
        </div>

        {/* Category buttons/tags for large and medium screens */}
        <div className="mt-8 flex flex-wrap gap-4 hidden md:flex">
          {categories.map((category, index) => (
            <button
              key={index}
              className={`px-6 py-2 text-sm font-medium ${category === selectedCategory
                ? "bg-white border-2 border-blue-500 text-blue-500 rounded-md"
                : "bg-white border border-gray-300 text-black rounded-md"
                }`}
              onClick={() => handleCategoryClick(category)} // Handle click for selection
            >
              {category}
            </button>
          ))}
        </div>

        {/* Category buttons/tags for small devices (mobile) */}
        <div className="mt-8 flex gap-4 flex-nowrap overflow-x-auto sm:hidden">
          {categories.map((category, index) => (
            <button
              key={index}
              className={`px-4 py-1 text-sm font-medium whitespace-nowrap ${category === selectedCategory
                ? "bg-white border-2 border-blue-500 text-blue-500 rounded-md"
                : "bg-white border border-gray-300 text-black rounded-md"
                }`}
              onClick={() => handleCategoryClick(category)} // Handle click for selection
            >
              {category}
            </button>
          ))}
        </div>

        {/* Cards Section for Large Devices */}
        <div className="mt-12 relative hidden lg:block">
          <div id="cards-container" className="flex gap-4 overflow-x-hidden pb-4 px-8" style={{ scrollBehavior: "smooth" }}>
            {filteredPackages.length === 0 ? (
              <div className="text-center w-full py-16 text-xl text-gray-500">No data available</div>
            ) : (
              filteredPackages.map((pkg, index) => (
                <div
                  key={index}
                  className={`w-1/3 min-w-[380px] h-[380px] bg-white rounded-lg shadow-lg p-6 flex-shrink-0 ${index >= currentIndexPerCategory[selectedCategory] && index < currentIndexPerCategory[selectedCategory] + 3 ? "block" : "hidden"}`}
                >
                  <h3 className="text-xl font-semibold text-black mb-4">{pkg.packageDisplayName}</h3>
                  <div className="flex items-center mb-4">
                    <img src="https://www.medibuddy.in/assets/icons/corpLabs/labs-reports-tat.svg" alt="Reports" className="w-6 h-6 mr-2" />
                    <span className="text-blue-500">{pkg.reportsTatText}</span>
                  </div>

                  {/* 2/3 for tests, 1/3 for radiology */}
                  <div className="grid grid-cols-3 gap-4">
                    <div className="col-span-2">
                      <div className="text-sm text-gray-800 mb-4">
                        <p className="font-bold">{pkg.testCount} Tests</p>
                        <ul className="list-disc pl-6">
                          {pkg.testsSummary.map((test, testIndex) => (
                            <li key={testIndex}>{test}</li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    {pkg.isRadiologyIncluded && (
                      <div className="col-span-1 flex flex-col items-center p-4 rounded-md">
                        <span className="text-center text-sm text-gray-800 font-bold">
                          <span>Includes:</span>
                        </span>
                        <div className="flex items-center space-x-2">
                          <img src="https://views.medibuddy.in/labs/HomeScreenIcons/radiology.png" alt="Radiology" className="w-6 h-6" />
                          <span className="text-sm text-gray-600">Radiology</span>
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="flex justify-between items-center p-2 rounded-md mb-4 text-gray-600" style={{ backgroundColor: '#f8f8f8' }}>
                    <span className="flex items-center text-sm">
                      Available at: <img src="https://www.medibuddy.in/assets/icons/ahc/home-sample.svg" alt="Home" className="w-4 h-4 mr-2" /> Home
                    </span>
                    <span className="text-sm">Fasting: {pkg.fastingHoursText}</span>
                  </div>

                  <div className="flex justify-between items-center">
                    <span className="text-lg text-gray-900 font-semibold">₹{pkg.price}</span>
                    {/* Quantity Adjuster */}
                    {quantities[index] && quantities[index] > 0 ? (
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => handleQuantityChange(index, "decrement")}
                          className="text-sm text-white bg-blue-500 px-4 py-2 rounded-md hover:bg-blue-600"
                        >
                          -
                        </button>
                        <span className="text-lg text-gray-900 font-semibold">{quantities[index] || 0}</span>
                        <button
                          onClick={() => handleQuantityChange(index, "increment")}
                          className="text-sm text-white bg-blue-500 px-4 py-2 rounded-md hover:bg-blue-600"
                        >
                          +
                        </button>
                      </div>
                    ) : (
                      <button
                        onClick={() => handleQuantityChange(index, "increment")}
                        className="text-sm text-white bg-blue-500 px-4 py-2 rounded-md hover:bg-blue-600"
                      >
                        Add
                      </button>
                    )}
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Arrow Buttons positioned at the bottom center for large screens */}
        {showNavButtons && (
          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-4 hidden lg:flex">
            <button
              className="bg-blue-500 p-2 rounded-full text-xl text-white"
              onClick={() => scrollCards("left")}
            >
              &#8592;
            </button>
            <button
              className="bg-blue-500 p-2 rounded-full text-xl text-white"
              onClick={() => scrollCards("right")}
            >
              &#8594;
            </button>
          </div>
        )}

        {/* Cards Section for Small Devices */}
        <div className="mt-12 lg:hidden">
          <div className="flex gap-4 overflow-x-auto pb-4 px-4">
            {filteredPackages.length === 0 ? (
              <div className="text-center w-full py-16 text-xl text-gray-500">No data available</div>
            ) : (
              filteredPackages.map((pkg, index) => (
                <div key={index} className="min-w-[380px] h-[400px] bg-white rounded-lg shadow-lg p-6">
                  <h3 className="text-xl font-semibold text-black mb-4">{pkg.packageDisplayName}</h3>
                  <div className="flex items-center mb-4">
                    <img src="https://www.medibuddy.in/assets/icons/corpLabs/labs-reports-tat.svg" alt="Reports" className="w-6 h-6 mr-2" />
                    <span className="text-blue-500">{pkg.reportsTatText}</span>
                  </div>

                  {/* 2/3 for tests, 1/3 for radiology */}
                  <div className="grid grid-cols-3 gap-4">
                    <div className="col-span-2">
                      <div className="text-sm text-gray-800 mb-4">
                        <p className="font-bold">{pkg.testCount} Tests</p>
                        <ul className="list-disc pl-6">
                          {pkg.testsSummary.map((test, testIndex) => (
                            <li key={testIndex}>{test}</li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    {pkg.isRadiologyIncluded && (
                      <div className="col-span-1 flex flex-col items-center p-4 rounded-md">
                        <span className="text-center text-sm text-gray-800 font-bold">
                          <span>Includes:</span>
                        </span>
                        <div className="flex items-center space-x-2">
                          <img src="https://views.medibuddy.in/labs/HomeScreenIcons/radiology.png" alt="Radiology" className="w-6 h-6" />
                          <span className="text-sm text-gray-600">Radiology</span>
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="flex justify-between items-center p-2 rounded-md mb-4 text-gray-600" style={{ backgroundColor: '#f8f8f8' }}>
                    <span className="flex items-center text-sm">
                      Available at: <img src="https://www.medibuddy.in/assets/icons/ahc/home-sample.svg" alt="Home" className="w-4 h-4 mr-2" /> Home
                    </span>
                    <span className="text-sm">Fasting: {pkg.fastingHoursText}</span>
                  </div>

                  <div className="flex justify-between items-center">
                    <span className="text-lg text-gray-900 font-semibold">₹{pkg.price}</span>
                    {/* Quantity Adjuster */}
                    {quantities[index] && quantities[index] > 0 ? (
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => handleQuantityChange(index, "decrement")}
                          className="text-sm text-white bg-blue-500 px-4 py-2 rounded-md hover:bg-blue-600"
                        >
                          -
                        </button>
                        <span className="text-lg text-gray-900 font-semibold">{quantities[index] || 0}</span>
                        <button
                          onClick={() => handleQuantityChange(index, "increment")}
                          className="text-sm text-white bg-blue-500 px-4 py-2 rounded-md hover:bg-blue-600"
                        >
                          +
                        </button>
                      </div>
                    ) : (
                      <button
                        onClick={() => handleQuantityChange(index, "increment")}
                        className="text-sm text-white bg-blue-500 px-4 py-2 rounded-md hover:bg-blue-600"
                      >
                        Add
                      </button>
                    )}
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Features;
