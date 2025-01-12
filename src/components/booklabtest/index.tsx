"use client";
import { useEffect, useState } from "react";

const TestCard = ({ title, price, discount, isCashless }) => (
  <div className="bg-white rounded-[20px] shadow-lg p-0 mb-6 w-full relative">
    {/* Cashless Button */}
    <div className="flex justify-end mt-0 p-2">
      <button className="text-blue-500 font-semibold text-xs sm:text-sm md:text-base px-2 sm:px-3 py-1 sm:py-2">
        {isCashless && (
          <span className="bg-[#4CAF50] text-white rounded-bl-[20px] rounded-tr-[20px] text-xs sm:text-sm md:text-base px-3 sm:px-4 py-1 sm:py-2 mr-0">
            ✓ Cashless
          </span>
        )}
      </button>
    </div>

    {/* Title */}
    <div className="mt-2 p-4">
      <h2 className="text-lg sm:text-2xl md:text-3xl font-semibold text-left" style={{ color: "#050a4e" }}>
        {title}
      </h2>
    </div>

    {/* Details and Pricing */}
    <div className="flex flex-col sm:flex-row justify-between items-start p-4">
      <div className="space-y-4 mb-4 sm:mb-0">
        <div className="flex items-center gap-2">
          <img src="https://www.medibuddy.in/assets/icons/corpLabs/labs-reports-tat.svg" alt="Reports" className="w-6 h-6 mr-2" />
          <span className="text-[15px] text-gray-700">Reports in 10-12 hrs</span>
        </div>

        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2">
            <img src="https://www.medibuddy.in/assets/icons/ahc/home-sample.svg" alt="Home" className="w-4 h-4 mr-2" /> 
            <span className="text-[15px] text-gray-600">Home</span>
          </div>
          <div className="flex items-center gap-2">
            <img src="https://www.medibuddy.in/assets/icons/ahc/lab-sample.svg" alt="Radiology" className="w-6 h-6" />
            <span className="text-[15px] text-gray-600">Lab</span>
          </div>
        </div>
      </div>

      <div className="text-right w-full sm:w-auto p-4 mt-2 sm:mt-0">
        <div className="space-y-2 mb-2 sm:mb-4">
          <div className="flex items-center justify-end gap-3">
            <span className="text-gray-400 line-through text-[15px]">₹{price}/-</span>
            <span className="text-[#4CAF50] font-semibold text-[15px]">{discount}% OFF</span>
          </div>
          <div className="flex items-center justify-end gap-1">
            <span className="text-[22px] font-bold text-[#1E2F6F]">
              ₹{Math.round(price * (1 - discount / 100))}/-
            </span>
            <span className="text-gray-500 text-[15px] ml-1">Onwards</span>
          </div>
        </div>
        <button 
          className="bg-[#2196F3] hover:bg-blue-600 text-white rounded-full px-8 py-2 text-[16px] font-medium"
        >
          Add
        </button>
      </div>
    </div>
  </div>
);




// BookLabTest Component
const BookLabTest = () => {
  const testData = [
    { title: "Complete Blood Count (CBC) - EDTA Whole Blood", price: 800, discount: 55, isCashless: true },
    { title: "Lipid Profile", price: 600, discount: 40, isCashless: false },
    { title: "Thyroid Function Test (T3, T4, TSH)", price: 1200, discount: 50, isCashless: true },
  ];
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
<section id="BookLabTest" className="py-16 relative bg-[#ffffff]">
  <div className="container mx-auto px-4">
    <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold text-left mb-8" style={{ color: "#050a4e" }}>
      Book Lab Test
    </h2>
    
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

    {/* Cards Section - Display 2 cards per row on large screens */}
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6 py-8">
      {testData.map((test, index) => (
        <TestCard key={index} {...test} />
      ))}
    </div>
  </div>
</section>

  );
};

export default BookLabTest;
