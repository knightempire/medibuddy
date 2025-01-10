"use client"; 

const Header = () => { 
  return ( 
    <header className="bg-white shadow-md"> 
      {/* First Row - Logo */} 
      <div className="flex flex-col sm:flex-row justify-between items-center p-4"> 
        {/* Logo on the left */} 
        <div className="flex items-center mb-2 sm:mb-0"> 
          <img 
            src="https://www.medibuddy.in/assets/logos/medibuddyWithName.svg" 
            alt="Medibuddy Logo" 
            className="h-8" 
          /> 
        </div> 
        
        {/* Links on the right (only visible on large screens) */} 
        <div className="flex space-x-6 justify-center items-center hidden sm:flex"> 
          {/* Wallet Icon */} 
          <a href="#" aria-label="Wallet"> 
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-wallet text-black" viewBox="0 0 16 16"> 
              <path d="M0 3a2 2 0 0 1 2-2h13.5a.5.5 0 0 1 0 1H15v2a1 1 0 0 1 1 1v8.5a1.5 1.5 0 0 1-1.5 1.5h-12A2.5 2.5 0 0 1 0 12.5zm1 1.732V12.5A1.5 1.5 0 0 0 2.5 14h12a.5.5 0 0 0 .5-.5V5H2a2 2 0 0 1-1-.268M1 3a1 1 0 0 0 1 1h12V2H2a1 1 0 0 0-1 1"/> 
            </svg> 
          </a> 
          
          {/* Cart Icon */} 
          <a href="#" aria-label="Cart"> 
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-cart text-black" viewBox="0 0 16 16"> 
              <path d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .491.592l-1.5 8A.5.5 0 0 1 13 12H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5M3.102 4l1.313 7h8.17l1.313-7zM5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4m7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4m-7 1a1 1 0 1 1 0 2 1 1 0 0 1 0-2m7 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2"/> 
            </svg> 
          </a> 
        </div> 
      </div> 

      {/* Second Row - Place Name and Geo Icon */}
      <div className="flex justify-between items-center p-4 border-t"> 
        {/* Left side: Place name (Chennai) and Geo Icon */} 
        <div className="flex items-center space-x-2"> 
          <span className="text-black text-lg font-medium">Chennai</span> 
          {/* Geo Icon */} 
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-geo-alt-fill text-black" viewBox="0 0 16 16"> 
            <path d="M8 16s6-5.686 6-10A6 6 0 0 0 2 6c0 4.314 6 10 6 10m0-7a3 3 0 1 1 0-6 3 3 0 0 1 0 6"/> 
          </svg> 
        </div> 

        {/* Links on the right (only visible on small screens) */} 
        <div className="flex space-x-6 justify-center items-center sm:hidden"> 
          {/* Wallet Icon */} 
          <a href="#" aria-label="Wallet"> 
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-wallet text-black" viewBox="0 0 16 16"> 
              <path d="M0 3a2 2 0 0 1 2-2h13.5a.5.5 0 0 1 0 1H15v2a1 1 0 0 1 1 1v8.5a1.5 1.5 0 0 1-1.5 1.5h-12A2.5 2.5 0 0 1 0 12.5zm1 1.732V12.5A1.5 1.5 0 0 0 2.5 14h12a.5.5 0 0 0 .5-.5V5H2a2 2 0 0 1-1-.268M1 3a1 1 0 0 0 1 1h12V2H2a1 1 0 0 0-1 1"/> 
            </svg> 
          </a> 
          
          {/* Cart Icon */} 
          <a href="#" aria-label="Cart"> 
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-cart text-black" viewBox="0 0 16 16"> 
              <path d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .491.592l-1.5 8A.5.5 0 0 1 13 12H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5M3.102 4l1.313 7h8.17l1.313-7zM5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4m7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4m-7 1a1 1 0 1 1 0 2 1 1 0 0 1 0-2m7 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2"/> 
            </svg> 
          </a> 
        </div> 
        <div className="hidden sm:block w-1/3 flex justify-center items-center">
  <input
    type="text"
    placeholder="Search..."
    className="w-full px-4 py-2 border border-gray-300 rounded-lg"
  />
</div>

      </div> 

      {/* Third Row - Search Bar (only visible on small screens) */} 
      <div className="sm:hidden p-4"> 
        <input 
          type="text" 
          placeholder="Search..." 
          className="w-full px-4 py-2 border border-gray-300 rounded-lg" 
        /> 
      </div> 
    </header> 
  ); 
}; 

export default Header;
