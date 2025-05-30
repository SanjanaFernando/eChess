import React, { useState, useEffect } from "react";
import { useLocation, useParams, useNavigate } from "react-router-dom";
import { getPlayersByPaymentStatus } from "../../state/player-api"; // Ensure this import is correct
import colomboImage from "../../assets/colombo.jpg";
import { tokenDecode } from "../../utils/token";// Import tokenDecode for decoding the token
const UpcomingTournamentOrganizerView = () => {
  const params = useParams();
  const tournamentId = params.id;
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isTournamentsTab, setIsTournamentsTab] = useState(true);
  const [paidPlayers, setPaidPlayers] = useState([]);
  const [unpaidPlayers, setUnpaidPlayers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState("Paid");
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

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
    },
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

  const [sections, setSections] = useState([
    { ageGroup: "", yearRange: "", fee: "" },
  ]);

  const addSection = () => {
    setSections([...sections, { ageGroup: "", yearRange: "", fee: "" }]);
  };

  // Fetch players by payment status based on tournament ID
  useEffect(() => {
    const fetchPlayers = async () => {
      try {
        const res = await getPlayersByPaymentStatus(tournamentId);
        setPaidPlayers(res.COMPLETED);
        setUnpaidPlayers(res.PENDING);
      } catch (err) {
        setError("Error fetching players by payment status");
      } finally {
        setLoading(false);
      }
    };

    fetchPlayers();
  }, [tournamentId]);

  const players = activeTab === "Paid" ? paidPlayers : unpaidPlayers;

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleViewButtonClick = (tournamentId) => {
    navigate(`/todu/${tournamentId}`); // This should match the defined route
  };

  const handleDeleteTournament = () => {
    if (window.confirm("Are you sure you want to delete this tournament?")) {
        // Add your delete logic here, e.g., API call to delete the tournament
        console.log("Tournament deleted"); // Placeholder for actual delete logic
    }
  };

  return (
    <div className="font-sans antialiased text-gray-900">
      {/* Navbar */}
      <nav className="bg-gray-200 p-4 flex justify-between items-center mb-8 rounded-md shadow">
        <h1 className="text-xl font-semibold text-gray-800 flex items-center">
          <div className="flex items-center">
            <img src="/LogoB.png" alt="eChess Logo" className="h-10 mr-4" />
          </div>
        </h1>
        {/* Navigation Links */}
        <div className="flex space-x-8">
          <a
            href="/chess-game-setup"
            className="text-gray-800 font-medium hover:text-gray-600"
          >
            Play
          </a>
          <a
            href="/organizer-dashboard"
            className={`text-gray-800 font-medium hover:text-gray-600 ${
              isTournamentsTab ? "font-extrabold" : ""
            }`}
          >
            Tournaments
          </a>
          
        </div>
        {/* Dropdown */}
        <div className="relative">
          <div
            className="mt-4 sm:mt-0 flex items-center cursor-pointer"
            onClick={(e) => {
              e.stopPropagation();
              toggleDropdown();
            }}
          >
            <img src="/User.png" alt="User Icon" className="h-10 mr-4" />
          </div>
          {isDropdownOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-10">
              <ul className="py-1">
                <li>
                  <a
                    className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                    onClick={handleProfileView}
                    href="/profile"
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
          <div className="bg-gray-200 rounded-lg h-64 md:h-auto">
            <img
              src={colomboImage}
              alt="Tournament"
              className="w-full h-full object-cover rounded-lg"
            />
          </div>
        </div>
      </section>
      {/* Search Bar Section */}
      <div className="bg-pink-100 p-4 rounded-md mt-4">
        <h2 className="text-lg font-semibold text-gray-700 mb-4">
          Search for Players
        </h2>
        <div className="flex items-center space-x-4">
          <div className="relative w-full max-w-md">
            <input
              type="text"
              placeholder="Search by Name or Fide ID"
              value={searchTerm}
              onChange={handleSearchChange}
              className="bg-white p-2 rounded-full border border-gray-300 text-gray-600 w-full"
            />
            <button className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500">
              🔍
            </button>
          </div>
        </div>
      </div>

      {/* Tab Navigation Bar */}
      <div className="bg-gray-200 p-4 flex justify-center space-x-8">
        {["Paid", "Unpaid"].map((tab) => (
          <button
            key={tab}
            onClick={() => handleTabClick(tab)}
            className={`text-gray-700 font-medium pb-2 ${
              activeTab === tab
                ? "border-b-2 border-gray-700 text-gray-900"
                : "text-gray-500"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Player Cards */}
      <div className="space-y-4 mt-6">
        {loading ? (
          <div>Loading...</div>
        ) : error ? (
          <div>{error}</div>
        ) : players.length === 0 ? (
          <div className="text-center text-gray-500 py-4">
            No players available...
          </div>
        ) : (
          players
            .filter(
              (player) =>
                player.nameWithInitials
                  .toLowerCase()
                  .includes(searchTerm.toLowerCase()) ||
                player.fideId.toLowerCase().includes(searchTerm.toLowerCase())
            )
            .map((player, index) => (
              <div
                key={index}
                className="bg-white p-4 rounded-md shadow flex justify-between items-center"
              >
                <div className="flex items-center">
                  <div className="bg-gray-200 rounded-full p-4">
                    <img
                      src="/User2.png"
                      alt="User Icon"
                      className="h-10 w-10 rounded-full"
                    />
                  </div>
                  <div className="ml-4">
                    <p className="font-semibold text-gray-800">
                      {player.nameWithInitials}
                    </p>
                    <p className="text-gray-600">FIDE ID: {player.fideId}</p>
                    <p className="text-gray-600">
                      FIDE Rating: {player.fideRating}
                    </p>
                  </div>
                </div>
                {activeTab === "Unpaid" ? (
                  <div className="flex flex-col sm:flex-row sm:space-x-4 space-y-4 sm:space-y-0 justify-center items-center">
                    <button
                      onClick={() => handleRevokeClick(player.playerId)}
                      className="px-4 py-2 bg-red-500 text-white rounded-lg w-24"
                    >
                      Reject
                    </button>
                    <button
                      onClick={() => handleAcceptClick(player.playerId)}
                      className="px-4 py-2 bg-green-500 text-white rounded-lg w-24"
                    >
                      Accept
                    </button>
                  </div>
                ) : (
                  <button className="text-green-500 font-medium">Paid</button>
                )}
              </div>
            ))
        )}
      </div>

      {/* Tournament Details Section */}
      <section className=" py-12 mt-8" style={{ backgroundColor: "#F2D7D9" }}>
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-extrabold text-gray-900 mb-8 text-center">
            Tournament Details
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {/* Payments */}
            <div className="text-center">
              <div className="flex items-center justify-center h-16">
                <img
                  src="/credit-card 1.png"
                  alt="Payments Icon"
                  className="h-10"
                />
              </div>
              <p className="font-bold">Payments</p>
              <p>Paid</p>
            </div>

            {/* Date */}
            <div className="text-center">
              <div className="flex items-center justify-center h-16">
                <img src="/date.png" alt="Date Icon" className="h-10" />
              </div>
              <p className="font-bold">Date</p>
              <p>July 15-20, 2025</p>
            </div>

            {/* Location */}
            <div className="text-center">
              <div className="flex items-center justify-center h-16">
                <img src="/location.png" alt="Location Icon" className="h-10" />
              </div>
              <p className="font-bold">Location</p>
              <p>Colombo</p>
            </div>

            {/* Format */}
            <div className="text-center">
              <div className="flex items-center justify-center h-16">
                <img src="/format.png" alt="Format Icon" className="h-10" />
              </div>
              <p className="font-bold">Format</p>
              <p>Blitz and Rapid</p>
            </div>
          </div>
        </div>
      </section>

      {/* Edit Tournament Details Section */}
      <section className="py-16 mt-8 bg-gray-100">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-extrabold text-gray-900 mb-8 text-center">
            Edit Tournament Details
          </h2>
          <form className="max-w-lg mx-auto">
            <div className="mb-4">
              <label
                className="block text-gray-700 font-semibold mb-2"
                htmlFor="tournamentName"
              >
                Tournament Name
              </label>
              <input
                type="text"
                id="tournamentName"
                placeholder="Tournament Name"
                className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-200"
                required
              />
            </div>

            <div className="mb-4">
              <label
                className="block text-gray-700 font-semibold mb-2"
                htmlFor="tournamentDescription"
              >
                Tournament Description
              </label>
              <textarea
                id="tournamentDescription"
                placeholder="Description"
                className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-200"
                rows="3"
                required
              />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label
                  className="block text-gray-700 font-semibold mb-2"
                  htmlFor="startDate"
                >
                  Start Date
                </label>
                <input
                  type="text"
                  id="startDate"
                  placeholder="DD/MM/YY"
                  className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-200"
                  required
                />
              </div>
              <div>
                <label
                  className="block text-gray-700 font-semibold mb-2"
                  htmlFor="endDate"
                >
                  End Date
                </label>
                <input
                  type="text"
                  id="endDate"
                  placeholder="DD/MM/YY"
                  className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-200"
                  required
                />
              </div>
            </div>

            {sections.map((section, index) => (
              <div
                key={index}
                className="grid grid-cols-3 gap-4 items-start mb-4"
              >
                <div>
                  <label
                    className="block text-gray-700 font-semibold mb-2"
                    htmlFor={`ageGroup${index}`}
                  >
                    Age Group
                  </label>
                  <input
                    type="text"
                    id={`ageGroup${index}`}
                    placeholder="Under 8"
                    className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-200"
                    value={section.ageGroup}
                    onChange={(e) => {
                      const updatedSections = [...sections];
                      updatedSections[index].ageGroup = e.target.value;
                      setSections(updatedSections);
                    }}
                  />
                </div>
                <div>
                  <label
                    className="block text-gray-700 font-semibold mb-2"
                    htmlFor={`yearRange${index}`}
                  >
                    Year Range
                  </label>
                  <input
                    type="text"
                    id={`yearRange${index}`}
                    placeholder="Before 2016 January"
                    className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-200"
                    value={section.yearRange}
                    onChange={(e) => {
                      const updatedSections = [...sections];
                      updatedSections[index].yearRange = e.target.value;
                      setSections(updatedSections);
                    }}
                  />
                </div>
                <div className="flex flex-col">
                  <label
                    className="block text-gray-700 font-semibold mb-2"
                    htmlFor={`fee${index}`}
                  >
                    Fee
                  </label>
                  <input
                    type="text"
                    id={`fee${index}`}
                    placeholder="00"
                    className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-200"
                    value={section.fee}
                    onChange={(e) => {
                      const updatedSections = [...sections];
                      updatedSections[index].fee = e.target.value;
                      setSections(updatedSections);
                    }}
                  />
                </div>
                {/* Add Button */}
                {index === sections.length - 1 && (
                  <button
                    type="button"
                    onClick={addSection}
                    className="p-2 bg-blue text-white rounded-full hover:bg-blue-700 transition"
                  >
                    +
                  </button>
                )}
              </div>
            ))}

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label
                  className="block text-gray-700 font-semibold mb-2"
                  htmlFor="gameType"
                >
                  Game Type
                </label>
                <select
                  id="gameType"
                  className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-200"
                >
                  <option>Variant</option>
                  <option>Standard</option>
                  <option>Blitz</option>
                </select>
              </div>
              <div>
                <label
                  className="block text-gray-700 font-semibold mb-2"
                  htmlFor="rounds"
                >
                  Rounds
                </label>
                <input
                  type="text"
                  id="rounds"
                  placeholder="00"
                  className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-200"
                />
              </div>
            </div>

            <div>
              <label
                className="block text-gray-700 font-semibold mb-2"
                htmlFor="contactNo"
              >
                Contact No.
              </label>
              <input
                type="text"
                id="contactNo"
                placeholder="Contact No."
                className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-200"
                required
              />
            </div>
            <div>
              <label
                className="block text-gray-700 font-semibold mb-2"
                htmlFor="location"
              >
                Location
              </label>
              <input
                type="text"
                id="location"
                placeholder="Location"
                className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-200"
                required
              />
            </div>
            {/* Add Image */}
            <div className="mb-4">
              <label className="block text-gray-700 font-semibold mb-2">
                Add Image
              </label>
              <div className="border-2 border-dashed border-gray-300 bg-gray-100 rounded-lg p-6 flex flex-col items-center justify-center cursor-pointer hover:border-blue-400">
                <img
                  src="/upload 1.png"
                  alt="Upload Icon"
                  className="h-12 mb-2"
                />
                <p className="text-gray-600">Drag and Drop here</p>
                <p className="text-blue-500 cursor-pointer">
                  or <span className="underline">Browse</span>
                </p>
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={(e) => handleImageUpload(e)}
                />
              </div>
            </div>

            <p className="text-sm text-gray-500 mt-4">
              By submitting this form, you confirm that the tournament details
              provided are accurate and comply with the Terms and Conditions of
              ECHESS.com. As the organizer, you agree to adhere to ECHESS.com's
              guidelines for tournament management, ensuring a fair and secure
              experience for all participants.
            </p>

            <button
              type="submit"
              className="w-full bg-blue text-white p-4 rounded-md hover:bg-blue focus:outline-none focus:ring focus:ring-blue"
            >
              Update Tournament
            </button>
            {/* Delete Tournament Button */}
            <button
              type="button"
              onClick={handleDeleteTournament}
              className="w-full bg-red-500 text-white p-4 rounded-md hover:bg-red-600 focus:outline-none focus:ring focus:ring-red-300 mt-4"
            >
              Delete Tournament
            </button>
          </form>
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
                    className={`w-3 h-3 rounded-full transition-all ${
                      currentIndex === index ? "bg-gray-900" : "bg-gray-400"
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

export default UpcomingTournamentOrganizerView;
