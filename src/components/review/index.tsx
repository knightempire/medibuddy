"use client";

import { useEffect, useState } from "react";

const Review = () => {
  const [currentReviewIndex, setCurrentReviewIndex] = useState(0);

  const reviews = [
    {
      id: 1,
      text: "The service was exceptional! The attention to detail and customer care went above and beyond my expectations. I particularly appreciated the quick response times and professional communication throughout the entire process.",
      username: "John Smith",
      location: "New York, USA",
    },
    {
      id: 2,
      text: "Absolutely fantastic experience. Everything was top-notch, and the team was very attentive to my needs. Highly recommend!",
      username: "Jane Doe",
      location: "San Francisco, USA",
    },
    {
      id: 3,
      text: "Great service! They were quick and responsive, and the overall experience was seamless. Will definitely return.",
      username: "Mark Lee",
      location: "Los Angeles, USA",
    },
    {
      id: 4,
      text: "I had an amazing experience. The team was professional, and the service was delivered exactly as promised. Highly satisfied!",
      username: "Emily Davis",
      location: "Chicago, USA",
    },
    {
      id: 5,
      text: "I am very pleased with the service provided. The communication was clear and the execution was flawless. Will be back again.",
      username: "Chris Brown",
      location: "Miami, USA",
    },
    {
      id: 6,
      text: "One of the best experiences I've had. Fast, efficient, and friendly service. Highly recommended for anyone looking for quality service.",
      username: "Jessica Wong",
      location: "Austin, USA",
    },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentReviewIndex((prevIndex) => (prevIndex + 1) % reviews.length);
    }, 3000); // Slide every 3 seconds

    return () => clearInterval(interval); // Cleanup on component unmount
  }, []);

  // Function to handle reviews display for small devices
  const displaySmallDeviceReviews = () => {
    // Slice to show only one review at a time
    const currentReview = reviews[currentReviewIndex];
    return [currentReview]; // Only show one review per time on small screens
  };

  // Function to handle reviews display for large devices
  const displayLargeDeviceReviews = () => {
    // To create the desired sliding effect, we will slice the reviews array dynamically.
    return [
      reviews[(currentReviewIndex + 0) % reviews.length],
      reviews[(currentReviewIndex + 1) % reviews.length],
      reviews[(currentReviewIndex + 2) % reviews.length],
    ];
  };

  return (
    <section
      id="Review"
      className="py-16 relative bg-[#ffffff]"
    >
      <div className="container mx-auto px-4">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold text-left text-black" style={{ color: "#050a4e" }}>
          What Our Users Say
        </h2>

        <div className="mt-8">
          {/* Displaying small device reviews */}
          <div className="block sm:hidden">
            {displaySmallDeviceReviews().map((review) => (
              <div
                key={review.id}
                className="w-full flex-grow bg-white rounded-xl shadow-lg p-6 space-y-4   hover:shadow-xl transition-shadow duration-300 mb-4"
              >
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                  <div className="flex items-center space-x-1">
                    {/* Filled Star (gold) */}
                    {[...Array(5)].map((_, index) => (
                      <svg
                        key={index}
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        fill="gold"
                        className="bi bi-star-fill"
                        viewBox="0 0 16 16"
                      >
                        <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z" />
                      </svg>
                    ))}
                    <span className="ml-2 text-gray-600 text-sm">4 days ago</span>
                  </div>
                  <div className="flex items-center space-x-4">
                    <span className="text-gray-600 text-sm font-medium flex items-center">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        fill="currentColor"
                        className="bi bi-geo-alt"
                        viewBox="0 0 16 16"
                      >
                        <path d="M12.166 8.94c-.524 1.062-1.234 2.12-1.96 3.07A32 32 0 0 1 8 14.58a32 32 0 0 1-2.206-2.57c-.726-.95-1.436-2.008-1.96-3.07C3.304 7.867 3 6.862 3 6a5 5 0 0 1 10 0c0 .862-.305 1.867-.834 2.94M8 16s6-5.686 6-10A6 6 0 0 0 2 6c0 4.314 6 10 6 10" />
                      </svg>
                      New York
                    </span>
                  </div>
                </div>
                <div className="pt-4">
                  <div className="flex items-start space-x-4">
                    <div className="flex-1">
                      <p className="text-gray-600 mt-1 leading-relaxed">{review.text}</p>
                    </div>
                  </div>
                </div>
                <div className="flex justify-between items-center pt-4 border-t">
                  <div className="flex items-center space-x-4">
                    <button className="flex items-center space-x-2 text-gray-600 hover:text-blue-600 transition-colors">
                      <img src="https://www.medibuddy.in/assets/icons/profile.svg" alt="" />
                      <span>{review.username}</span>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Displaying large device reviews */}
          <div className="hidden sm:block overflow-x-auto">
            <div className="flex flex-nowrap gap-x-4">
              {displayLargeDeviceReviews().map((review) => (
                <div
                  key={review.id}
                  className="w-1/3 sm:w-1/3 lg:w-1/3 xl:w-1/5 flex-grow bg-white rounded-xl shadow-lg p-6 space-y-4   hover:shadow-xl transition-shadow duration-300 mb-4"
                >
                  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                    <div className="flex items-center space-x-1">
                      {/* Filled Star (gold) */}
                      {[...Array(5)].map((_, index) => (
                        <svg
                          key={index}
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          fill="gold"
                          className="bi bi-star-fill"
                          viewBox="0 0 16 16"
                        >
                          <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z" />
                        </svg>
                      ))}
                      <span className="ml-2 text-gray-600 text-sm">4 days ago</span>
                    </div>
                    <div className="flex items-center space-x-4">
                      <span className="text-gray-600 text-sm font-medium flex items-center">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          fill="currentColor"
                          className="bi bi-geo-alt"
                          viewBox="0 0 16 16"
                        >
                          <path d="M12.166 8.94c-.524 1.062-1.234 2.12-1.96 3.07A32 32 0 0 1 8 14.58a32 32 0 0 1-2.206-2.57c-.726-.95-1.436-2.008-1.96-3.07C3.304 7.867 3 6.862 3 6a5 5 0 0 1 10 0c0 .862-.305 1.867-.834 2.94M8 16s6-5.686 6-10A6 6 0 0 0 2 6c0 4.314 6 10 6 10" />
                        </svg>
                        New York
                      </span>
                    </div>
                  </div>
                  <div className="pt-4">
                    <div className="flex items-start space-x-4">
                      <div className="flex-1">
                        <p className="text-gray-600 mt-1 leading-relaxed">{review.text}</p>
                      </div>
                    </div>
                  </div>
                  <div className="flex justify-between items-center pt-4 border-t">
                    <div className="flex items-center space-x-4">
                      <button className="flex items-center space-x-2 text-gray-600 hover:text-blue-600 transition-colors">
                        <img src="https://www.medibuddy.in/assets/icons/profile.svg" alt="" />
                        <span>{review.username}</span>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Blue Dot Indicator */}
        <div className="flex justify-center mt-4">
          <div className="w-2.5 h-2.5 mx-1 bg-blue-500 rounded-full animate-pulse"></div>
          <div className="w-2.5 h-2.5 mx-1 bg-blue-500 rounded-full animate-pulse"></div>
        </div>
      </div>
    </section>
  );
};

export default Review;
