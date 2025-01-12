"use client";

import { ChevronRight, Check } from 'lucide-react';

const BookedLab = () => {
  return (
    <section id="BookedLab" className="py-8 sm:py-16 relative bg-[#ffffff]">
      <div className="container mx-auto px-4">
        {/* Heading and View All Button */}
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-lg sm:text-2xl md:text-3xl font-semibold text-left" style={{ color: "#050a4e" }}>
            Booked Lab Tests
          </h2>
          <button className="text-blue-500 font-semibold text-sm sm:text-base">
            View All
          </button>
        </div>

        {/* Custom Card Container */}
        <div className="w-full sm:max-w-2xl md:max-w-3xl p-4 sm:p-6 cursor-pointer hover:shadow-lg transition-shadow border border-gray-300 shadow-md rounded-2xl mx-auto">


          {/* Header with Avatar and Name */}
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              {/* Avatar */}
              <div className="h-8 w-8 sm:h-10 sm:w-10 rounded-full overflow-hidden">
                <img src="https://www.medibuddy.in/assets/icons/profile.svg" alt="User Avatar" className="h-full w-full object-cover" />
              </div>
              <h3 className="text-xs sm:text-md font-semibold text-[#1E2F6F]">Mr. Suresh Gaikwad</h3>
            </div>
            <ChevronRight className="text-blue-500 h-5 sm:h-6 w-5 sm:w-6" />
          </div>

          {/* Appointment Status */}
          <div className="flex items-center gap-2 mb-4">
            <Check className="text-green-600 h-4 sm:h-5 w-4 sm:w-5" />
            <span className="text-[#1E2F6F] font-semibold text-xs sm:text-lg">Appointment Confirmed</span>
          </div>

          {/* Appointment Details Box with new Background Color */}
          <div className="bg-[#d6e8ff] rounded-xl p-4 flex flex-col sm:flex-row items-center justify-between">
            {/* Date, Time, and Lab Tests Sections in a single row */}
            <div className="flex w-full justify-between sm:gap-8">
              {/* Date Section */}
              <div className="text-center sm:text-left sm:w-1/3">
                <div className="text-black font-bold text-xs sm:text-md">03 Nov&apos;22</div>
                <div className="text-black text-xs sm:text-sm">Wednesday</div>
              </div>
              <div className="border-l border-white mx-4 sm:mx-8 h-12"></div>
              {/* Time and Service Section */}
              <div className="text-center sm:text-left sm:w-1/3">
                <div className="text-black font-bold text-xs sm:text-md">09:00 - 10:00 AM</div>
                <div className="text-black text-xs sm:text-sm">Home Sample Collection</div>
              </div>
              <div className="border-l border-white mx-4 sm:mx-8 h-12"></div>
              {/* Lab Tests Section */}
              <div className="text-center sm:text-left sm:w-1/3">
                <span className="text-black font-bold text-xs sm:text-md">03</span>
                <span className="text-black text-xs sm:text-sm ml-2">Lab Tests</span>
              </div>
            </div>
          </div>

          {/* Pagination Dots (visible only on small devices) */}
          <div className="flex justify-center gap-2 mt-6 sm:hidden">
            <div className="h-2 w-2 rounded-full bg-blue-500"></div>
            <div className="h-2 w-2 rounded-full bg-gray-200"></div>
            <div className="h-2 w-2 rounded-full bg-gray-200"></div>
            <div className="h-2 w-2 rounded-full bg-gray-200"></div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default BookedLab;
