"use client";

import { useEffect, useState } from "react";

// Define the component
const Lab = () => {
  const [currentReviewIndex, setCurrentReviewIndex] = useState(0);
  const [reviews, setReviews] = useState([]);

  // Replace API fetch with locally declared review data
  useEffect(() => {
    const localReviews = [
      {
        rating: 4.5,
        ratingsCount: 120,
        location: "Bangalore",
        name: "John Doe",
      },
      {
        rating: 5,
        ratingsCount: 80,
        location: "Mumbai",
        name: "Jane Smith",
      },
      {
        rating: 3,
        ratingsCount: 45,
        location: "Delhi",
        name: "Amit Kumar",
      },
    ];

    setReviews(localReviews); // Set the locally declared reviews
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

  // Function to generate the next available time slot
  const getNextSlot = () => {
    const now = new Date();
    const nextSlot = new Date(now);
    nextSlot.setHours(7, 30, 0, 0); // Set next slot at 07:30 AM
    if (now.getHours() >= 7 && now.getMinutes() >= 30) {
      nextSlot.setDate(nextSlot.getDate() + 1); // If after 07:30, set for tomorrow
    }

    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    return `Next Slot - 07:30 AM, Tomorrow`;
  };

  return (
    <section id="Lab" className="relative bg-[#ffffff]">
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
                className="w-full h-auto bg-white rounded-xl shadow-lg p-6 space-y-4 hover:shadow-xl transition-shadow duration-300 mb-4"
              >
                <div className="relative">
                  {/* Image with rating in the bottom-right corner */}
                  <img
                    src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS0diB7MFBQdkgwnuh9TfyKSD7yA3hZVfR3Wg&s"
                    alt="Review Image"
                    className="w-full h-48 object-cover rounded-lg"
                  />

                  {/* Rating at the bottom-right, no gap */}
                  <div className="absolute bottom-0 right-0 bg-black text-white px-2 py-1 rounded-bl-lg text-xs flex items-center space-x-1">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="gold" className="bi bi-star-fill" viewBox="0 0 16 16">
                      <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z" />
                    </svg>
                    <span>{review?.rating} / 5</span>
                    <span className="ml-1">({review?.ratingsCount} ratings)</span>
                  </div>
                </div>

                {/* Heading */}
                <h3 className="text-lg font-semibold text-gray-800">{review?.name}</h3>

                {/* Location */}
                <div className="text-sm text-gray-600 flex items-center space-x-2">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-geo-alt" viewBox="0 0 16 16">
                    <path d="M12.166 8.94c-.524 1.062-1.234 2.12-1.96 3.07A32 32 0 0 1 8 14.58a32 32 0 0 1-2.206-2.57c-.726-.95-1.436-2.008-1.96-3.07C3.304 7.867 3 6.862 3 6a5 5 0 0 1 10 0c0 .862-.305 1.867-.834 2.94M8 16s6-5.686 6-10A6 6 0 0 0 2 6c0 4.314 6 10 6 10" />
                  </svg>
                  <span>{review?.location || "Bangalore"}</span>
                </div>

                {/* Updated Timing with clock icon */}
                <div className="text-sm text-gray-600 flex items-center space-x-2">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-clock" viewBox="0 0 16 16">
                    <path d="M8 3.5a.5.5 0 0 0-1 0V9a.5.5 0 0 0 .252.434l3.5 2a.5.5 0 0 0 .496-.868L8 8.71z"/>
                    <path d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16m7-8A7 7 0 1 1 1 8a7 7 0 0 1 14 0"/>
                  </svg>
                  <span>{getNextSlot()}</span>
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
                  className="w-1/3 sm:w-1/3 lg:w-1/3 xl:w-1/5 flex-grow h-auto bg-white rounded-xl shadow-lg p-6 space-y-4 hover:shadow-xl transition-shadow duration-300 mb-4"
                >
                  <div className="relative">
                    {/* Image with rating in the bottom-right corner */}
                    <img
                      src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS0diB7MFBQdkgwnuh9TfyKSD7yA3hZVfR3Wg&s"
                      alt="Review Image"
                      className="w-full h-48 object-cover rounded-lg"
                    />

                    {/* Rating at the bottom-right, no gap */}
                    <div className="absolute bottom-0 right-0 bg-black text-white px-2 py-1 rounded-bl-lg text-xs flex items-center space-x-1">
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="gold" className="bi bi-star-fill" viewBox="0 0 16 16">
                        <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z" />
                      </svg>
                      <span>{review?.rating} / 5</span>
                      <span className="ml-1">({review?.ratingsCount} ratings)</span>
                    </div>
                  </div>

                  {/* Heading */}
                  <h3 className="text-lg font-semibold text-gray-800">{review?.name}</h3>

                  {/* Location */}
                  <div className="text-sm text-gray-600 flex items-center space-x-2">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-geo-alt" viewBox="0 0 16 16">
                      <path d="M12.166 8.94c-.524 1.062-1.234 2.12-1.96 3.07A32 32 0 0 1 8 14.58a32 32 0 0 1-2.206-2.57c-.726-.95-1.436-2.008-1.96-3.07C3.304 7.867 3 6.862 3 6a5 5 0 0 1 10 0c0 .862-.305 1.867-.834 2.94M8 16s6-5.686 6-10A6 6 0 0 0 2 6c0 4.314 6 10 6 10" />
                    </svg>
                    <span>{review?.location || "Bangalore"}</span>
                  </div>

                  {/* Updated Timing with clock icon */}
                  <div className="text-sm text-gray-600 flex items-center space-x-2">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-clock" viewBox="0 0 16 16">
                      <path d="M8 3.5a.5.5 0 0 0-1 0V9a.5.5 0 0 0 .252.434l3.5 2a.5.5 0 0 0 .496-.868L8 8.71z"/>
                      <path d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16m7-8A7 7 0 1 1 1 8a7 7 0 0 1 14 0"/>
                    </svg>
                    <span>{getNextSlot()}</span>
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
