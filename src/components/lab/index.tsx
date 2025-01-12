"use client";


import { useEffect, useState } from "react";


// Define the component
const Lab = () => {
  const [currentReviewIndex, setCurrentReviewIndex] = useState(0);
  const [reviews, setReviews] = useState([]);

  // Fetch reviews from the API
  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await fetch('https://677f757b0476123f76a68a42.mockapi.io/api/labs/v1/page_config');
        const data = await response.json();
      
       
        const reviewData = data[0]?.page_config.find(config => config.title === "What our Users say")?.props || [];

        setReviews(reviewData);
      } catch (error) {
        console.error('Error fetching reviews:', error);
      }
    };

    fetchReviews();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentReviewIndex((prevIndex) => (prevIndex + 1) % reviews.length);
    }, 3000); // Slide every 3 seconds

    return () => clearInterval(interval); 
  }, [reviews]);

  // Function to handle reviews display for small devices
  const displaySmallDeviceReviews = () => {
    const currentReview = reviews[currentReviewIndex];
    return [currentReview]; 
  };

  // Function to handle reviews display for large devices
  const displayLargeDeviceReviews = () => {
    return [
      reviews[(currentReviewIndex + 0) % reviews.length],
      reviews[(currentReviewIndex + 1) % reviews.length],
      reviews[(currentReviewIndex + 2) % reviews.length],
    ];
  };


  return (
    <section
      id="Lab"
      className="py-16 md:py-20 lg:py-28 relative bg-[#ffffff]"
    >
   <div className="container mx-auto px-4 py-12">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold text-left text-black" style={{ color: "#050a4e" }}>
       Labs Visited
        </h2>

        <div className="mt-8">
       

          {/* Displaying small device reviews */}
          <div className="block sm:hidden">
            {displaySmallDeviceReviews().map((review, index) => (
              <div
                key={index}
                className="w-full h-80 bg-white rounded-xl shadow-lg p-6 space-y-4 hover:shadow-xl transition-shadow duration-300 mb-4"
              >
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                  <div className="flex items-center space-x-1">
                    {/* Filled Star (gold) */}
                    {[...Array(review?.rating || 0)].map((_, idx) => (
                      <svg key={idx} xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="gold" className="bi bi-star-fill" viewBox="0 0 16 16">
                        <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z" />
                      </svg>
                    ))}
                    <span className="ml-2 text-gray-600 text-sm">{review?.days}</span>
                  </div>
                  <div className="flex items-center space-x-4">
                    <span className="text-gray-600 text-sm font-medium flex items-center">
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-geo-alt" viewBox="0 0 16 16">
                        <path d="M12.166 8.94c-.524 1.062-1.234 2.12-1.96 3.07A32 32 0 0 1 8 14.58a32 32 0 0 1-2.206-2.57c-.726-.95-1.436-2.008-1.96-3.07C3.304 7.867 3 6.862 3 6a5 5 0 0 1 10 0c0 .862-.305 1.867-.834 2.94M8 16s6-5.686 6-10A6 6 0 0 0 2 6c0 4.314 6 10 6 10" />
                      </svg>
                      {review?.location || 'Banglore'}
                    </span>
                  </div>
                </div>
                <div className="pt-4">
                  <div className="flex items-start space-x-4">
                    <div className="flex-1">
                      <p className="text-gray-600 mt-1 leading-relaxed">{review?.content}</p>
                    </div>
                  </div>
                </div>
                <div className="flex justify-between items-center pt-4 border-t">
                  <div className="flex items-center space-x-4">
                    <button className="flex items-center space-x-2 text-gray-600 hover:text-blue-600 transition-colors">
                      <img src="https://www.medibuddy.in/assets/icons/profile.svg" alt="" />
                      <span>{review?.name}</span>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Displaying large device reviews */}
          <div className="hidden sm:block overflow-x-auto">
            <div className="flex flex-nowrap gap-x-4">
              {displayLargeDeviceReviews().map((review, index) => (
                <div
                  key={index}
                  className="w-1/3 sm:w-1/3 lg:w-1/3 xl:w-1/5 flex-grow h-80 bg-white rounded-xl shadow-lg p-6 space-y-4 hover:shadow-xl transition-shadow duration-300 mb-4"
                >
                  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                    <div className="flex items-center space-x-1">
                      {/* Filled Star (gold) */}
                      {[...Array(review?.rating || 0)].map((_, idx) => (
                        <svg key={idx} xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="gold" className="bi bi-star-fill" viewBox="0 0 16 16">
                          <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z" />
                        </svg>
                      ))}
                      <span className="ml-2 text-gray-600 text-sm">{review?.days}</span>
                    </div>
                    <div className="flex items-center space-x-4">
                      <span className="text-gray-600 text-sm font-medium flex items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-geo-alt" viewBox="0 0 16 16">
                          <path d="M12.166 8.94c-.524 1.062-1.234 2.12-1.96 3.07A32 32 0 0 1 8 14.58a32 32 0 0 1-2.206-2.57c-.726-.95-1.436-2.008-1.96-3.07C3.304 7.867 3 6.862 3 6a5 5 0 0 1 10 0c0 .862-.305 1.867-.834 2.94M8 16s6-5.686 6-10A6 6 0 0 0 2 6c0 4.314 6 10 6 10" />
                        </svg>
                        {review?.location || 'Banglore'}
                      </span>
                    </div>
                  </div>
                  <div className="pt-4">
                    <div className="flex items-start space-x-4">
                      <div className="flex-1">
                        <p className="text-gray-600 mt-1 leading-relaxed">{review?.content}</p>
                      </div>
                    </div>
                  </div>
                  <div className="flex justify-between items-center pt-4 border-t">
                    <div className="flex items-center space-x-4">
                      <button className="flex items-center space-x-2 text-gray-600 hover:text-blue-600 transition-colors">
                        <img src="https://www.medibuddy.in/assets/icons/profile.svg" alt="" />
                        <span>{review?.name}</span>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Lab;
