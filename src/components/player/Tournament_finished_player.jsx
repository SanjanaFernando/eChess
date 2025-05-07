import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate for navigation
import { tokenDecode } from "../../utils/token";// Import tokenDecode for decoding the token

const FinishedTournamentPage = () => {
  const navigate = useNavigate(); // Initialize useNavigate for navigation
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isTournamentsTab, setIsTournamentsTab] = useState(true);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleProfileView = (e) => {
    const token = localStorage.getItem("token");
    const decodedToken = tokenDecode(token);
    e.preventDefault();
    navigate(`/profile/${decodedToken.id}`); // Navigate to the user's profile
  };

  const handleLogout = (e) => {
    e.preventDefault();
    localStorage.removeItem("token"); // Remove the token from local storage
    navigate("/login"); // Navigate to the login page
  };

  const [currentIndex, setCurrentIndex] = useState(0);
   const mediaUpdates = [
     {
       img: "/news1.png",
       title: "GM Alireza Firouzja wins Division I of Chess.com Classic 2024",
     },
     {
       img: "/news2.png",
       title: "$300,000 PRIZE FUND",
     },
     {
       img: "/news3.png",
       title: "Carlsen, Nepo, and more in Division 1",
     },
     {
       img: "/news4.png",
       title: "New Chess Rules for 2025 Announced",
     },
     {
       img: "/news5.png",
       title: "World Chess Championship to be held in Dubai",
     }
 
   ];
 
   const totalSlides = mediaUpdates.length;
 
   // Auto-slide every 3 seconds
   useEffect(() => {
     const interval = setInterval(() => {
       setCurrentIndex((prevIndex) => (prevIndex + 1) % totalSlides);
     }, 3000);
 
     return () => clearInterval(interval);
   }, [totalSlides]);
 
   // Handle manual slide change
   const nextSlide = () => {
     setCurrentIndex((prevIndex) => (prevIndex + 1) % totalSlides);
   };
 
   const prevSlide = () => {
     setCurrentIndex((prevIndex) =>
       prevIndex === 0 ? totalSlides - 1 : prevIndex - 1
     );
   };
  return (
    <div className="font-sans antialiased text-gray-900 p-4">
      {/* Navbar */}
      <nav className="bg-gray-200 p-4 flex flex-col sm:flex-row justify-between items-center mb-8 rounded-md shadow">
        <h1 className="text-xl font-semibold text-gray-800 flex items-center">
          <div className="flex items-center">
            <img
              src="/LogoB.png" // Replace with your logo path
              alt="eChess Logo"
              className="h-10 mr-4"
            />
          </div>
        </h1>
        {/* Navigation Links */}
        <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-8">
          <a
            href="/chess-game-setup"
            className="text-gray-800 font-medium hover:text-gray-600"
          >
            Play
          </a>
          <a
            href="/player-dashboard"
            className={`text-gray-800 font-medium hover:text-gray-600 ${
              isTournamentsTab ? "font-extrabold" : ""
            }`}
          >
            Tournaments
          </a>
          <a
            href="/ppay"
            className="text-gray-800 font-medium hover:text-gray-600"
          >
            Payments
          </a>
        </div>
        {/* Dropdown */}
        <div className="relative mt-4 sm:mt-0">
          <div
            className="flex items-center cursor-pointer"
            onClick={(e) => {
              e.stopPropagation();
              toggleDropdown();
            }}
          >
            <img
              src="/User.png" // Replace with your user icon path
              alt="User Icon"
              className="h-10 mr-4"
            />
          </div>
          {isDropdownOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-10">
              <ul className="py-1">
                <li>
                  <a
                    className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                    onClick={handleProfileView}
                    href="/profile" // Replace with your actual profile link
                  >
                    Profile
                  </a>
                </li>
                <li>
                  <button
                    onClick={handleLogout}
                    className="w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100"
                  >
                    Logout
                  </button>
                </li>
              </ul>
            </div>
          )}
        </div>
      </nav>

      {/* Hero Section */}
      <section className="bg-gray-50 py-12 mt-8">
        <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Text Content */}
          <div>
            <h1 className="text-3xl font-extrabold text-gray-900 mb-4">
              Colombo Rapid Chess Open
            </h1>
            <p className="text-gray-700 mb-6">
              The Colombo Rapid Chess Open is a dynamic and fast-paced
              tournament that brings together chess enthusiasts from across Sri
              Lanka. This open event welcomes players of all skill levels, from
              seasoned grandmasters to enthusiastic beginners. With rapid time
              controls, the action is non- stop, offering exciting games and a
              chance to test your quick-thinking strategies. Compete for prize
              money, rating points, and the coveted title of Colombo Rapid Chess
              Open Champion! Join us for a day of thrilling chess in the heart
              of Colombo.
            </p>

          </div>

          {/* Image Placeholder */}
          <div className="bg-gray-200 rounded-lg h-64">
            <img
              src="colombo.jpg"
              alt="Tournament"
              className="w-full h-full object-cover rounded-lg"
            />
          </div>
        </div>
      </section>

      {/* Tournament Details Section */}
      <section className=" bg-[#F4E3E3] py-12 mt-8">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-extrabold text-gray-900 mb-8 text-center">
            Tournament Details
          </h2>
          <div className="grid grid-cols-1  gap-8">
            {/* Tournament Finished */}
            <div className="text-center">
              {/* Payment Icon */}
              <div className="flex flex-col items-center">
          <img src="/trophy.png" alt="Tournament Finished Icon" className="h-32 mb-4 animate-bounce" />
          <h1 className="text-4xl font-bold animate-pulse">🏆 Tournament Finished 🏆</h1>
        </div>
              <p>View Results</p>
            </div>
          </div>
        </div>
      </section>

      
      {/* Media Updates Section */}
      <section className="bg-gray-50 py-12 mt-8">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-extrabold text-gray-900 mb-8 text-center">
            Media Updates
          </h2>
          <div className="relative w-full max-w-5xl mx-auto">
            <div className="overflow-hidden rounded-lg">
              <div
                className="flex transition-transform duration-500 ease-in-out"
                style={{
                  transform: `translateX(-${currentIndex * 20}%)`,
                  width: `${totalSlides * 50}%`,
                }}
              >
                {mediaUpdates.map((update, index) => (
                  <div
                    key={index}
                    className="w-full flex-shrink-0 px-2"
                    style={{ width: "20%" }}
                  >
                    <div className="w-100 h-100 mx-auto rounded-lg shadow-md">
                      <img
                        src={update.img}
                        alt={`Media Update ${index + 1}`}
                        className="w-full h-60 object-cover rounded-t-lg"
                      />
                      <div className="p-4">
                        <h3 className="font-bold text-lg">{update.title}</h3>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Previous Button */}
            <button
              onClick={prevSlide}
              className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-white rounded-full shadow-md p-2"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15.75 19.5L8.25 12l7.5-7.5"
                />
              </svg>
            </button>

            {/* Next Button */}
            <button
              onClick={nextSlide}
              className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-white rounded-full shadow-md p-2"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M8.25 4.5l7.5 7.5-7.5 7.5"
                />
              </svg>
            </button>

            {/* Indicators */}
            <div className="absolute bottom-2 left-0 w-full flex justify-center">
              <div className="flex space-x-2">
                {mediaUpdates.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentIndex(index)}
                    className={`w-3 h-3 rounded-full transition-all ${currentIndex === index ? "bg-gray-900" : "bg-gray-400"
                      }`}
                  ></button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-4 mt-8">
        <div className="container mx-auto px-4 text-center">
          <p>&copy; 2025 eChess. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default FinishedTournamentPage;
