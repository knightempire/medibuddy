"use client";

import { useEffect, useState } from "react";

const Hero = () => {
  const [pageConfig, setPageConfig] = useState(null);
  const [bannerConfig, setBannerConfig] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0); 
  const [isLargeScreen, setIsLargeScreen] = useState(false);

  useEffect(() => {
    // Fetch data from API
    const fetchData = async () => {
      try {
        const response = await fetch(
          "https://677f757b0476123f76a68a42.mockapi.io/api/labs/v1/page_config/"
        );
        const data = await response.json();

    
        const item = data[0]?.page_config.find(item => item.id === "1");
        setPageConfig(item);


        const bannerItem = data[0]?.page_config.find(item => item.id === "2");
        setBannerConfig(bannerItem);

      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

 
  useEffect(() => {
    const interval = setInterval(() => {
      if (bannerConfig) {
        setCurrentIndex(prevIndex => {
          const totalBanners = bannerConfig.props.length;
          const totalBannersToShow = 3; // We want to display 3 banners at once on large screens


          // This ensures smooth cycling of sets and no empty space
          let nextIndex = prevIndex + 1;

          if (nextIndex + totalBannersToShow > totalBanners) {
            nextIndex = 0; 
          }

          return nextIndex;
        });
      }
    }, 2000); // Change banners every 2 seconds 

    return () => clearInterval(interval); 
  }, [bannerConfig]);

  // Handle screen size change
  useEffect(() => {
    const handleResize = () => {
      setIsLargeScreen(window.innerWidth >= 1024); // Check if the screen width is larger than 1024px (adjust as needed)
    };

    window.addEventListener("resize", handleResize);
    handleResize(); 

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <section
      id="home"
      className="relative z-10 overflow-hidden bg-white pb-16 pt-[20px]"
    >
      {pageConfig ? (
        <div>
          <div className="grid grid-cols-3 gap-8 px-4 sm:px-8">
            {pageConfig.props.map((item, index) => (
              item.isActive && (
                <div key={index} className="text-center">
                  <a href={item.deeplink} target="_blank" rel="noopener noreferrer">
                    <img
                      src={item.iconUrl}
                      alt={item.iconText}
                      className="w-16 h-16 mx-auto"
                    />
                    <p className="mt-2 text-black">{item.iconText}</p>
                  </a>
                </div>
              )
            ))}
          </div>
        </div>
      ) : (
        <p>Loading...</p>
      )}

      {bannerConfig ? (
        <div className="mt-8">
          {/* Responsive Grid: 1 for small screens, 3 for larger screens */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 px-4">
    
            {isLargeScreen
              ? bannerConfig.props
                  .slice(currentIndex, currentIndex + 3) // Show 3 banners at a time
                  .map((banner, index) => (
                    banner.isActive && (
                      <a key={index} href={banner.deeplink} target="_blank" rel="noopener noreferrer">
                        <img
                          src={banner.bannerUrl}
                          alt={`Banner ${index + 1}`}
                          className="w-full h-auto"
                        />
                      </a>
                    )
                  ))
              : bannerConfig.props
                  .slice(currentIndex, currentIndex + 1) // Show 1 banner on smaller screens
                  .map((banner, index) => (
                    banner.isActive && (
                      <a key={index} href={banner.deeplink} target="_blank" rel="noopener noreferrer">
                        <img
                          src={banner.bannerUrl}
                          alt={`Banner ${index + 1}`}
                          className="w-full h-auto"
                        />
                      </a>
                    )
                  ))
            }
          </div>
        </div>
      ) : (
        <p>Loading banners...</p>
      )}
    </section>
  );
};

export default Hero;

