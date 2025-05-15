import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { getTournamentsByStatus } from "../state/tournament-api";
import { playerTournaments } from "../state/player-api";
import { tokenDecode } from "../utils/token";

const PlayerDashboard = () => {
  const location = useLocation();
  const isTournamentsTab = location.pathname === "/player-dashboard";
  const navigate = useNavigate();

  const [activeTab, setActiveTab] = useState("Upcoming");
  const [tournaments, setTournaments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [entryType, setEntryType] = useState("Entry Type");
  const [searchQuery, setSearchQuery] = useState("");

  // Toggle the dropdown menu
  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  // Close the dropdown when clicking outside
  const closeDropdown = () => {
    setIsDropdownOpen(false);
  };

  // Fetch tournament data
  const fetchTournamentData = async (tab) => {
    try {
      setLoading(true);
      const token = localStorage.getItem("token");
      const decodedToken = tokenDecode(token);

      const statusMap = {
        Upcoming: "UPCOMING",
        Ongoing: "ONGOING",
        Finished: "COMPLETED",
        Registered: "REGISTERED",
      };

      const tournaments = await getTournamentsByStatus({
        status: statusMap[tab],
        userId: decodedToken.id,
      });

      // Add default images to tournaments
      const tournamentsWithImages = tournaments.map((tournament) => ({
        ...tournament,
        img: "/trophy.png",
      }));

      setTournaments(tournamentsWithImages);
    } catch (error) {
      console.error("Error fetching tournaments: ", error);
      setTournaments([]);
    } finally {
      setLoading(false);
    }
  };

  // Fetch data whenever the active tab changes
  useEffect(() => {
    fetchTournamentData(activeTab);
  }, [activeTab]);

  // Handle tab click
  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  // Handle tournament button click
  const handleTournamentButtonClick = (tournament) => {
    if (!tournament.isPlayerRegistered) {
      navigate(`/tournament-registration/${tournament._id}`);
    } else {
      navigate("/tpdu");
    }
  };

  const handleViewOngoing = (tournamentId) => () => {
    navigate(`/tpdo/${tournamentId}`);
  };

  const handleViewFinished = (tournamentId) => () => {
    navigate(`/tpf/${tournamentId}`);
  };

  const handleProfileView = (e) => {
    const token = localStorage.getItem("token");
    const decodedToken = tokenDecode(token);
    e.preventDefault();
    navigate(`/profile/${decodedToken.id}`);
  };

  const handleLogout = (e) => {
    e.preventDefault();
    localStorage.removeItem("token");
    navigate("/login");
  };

  const filteredTournaments = tournaments.filter((tournament) => {
    const matchesEntryType =
      entryType === "Entry Type" || tournament.entryType === entryType;
    const matchesSearchQuery = tournament.name
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    return matchesEntryType && matchesSearchQuery;
  });

  return (
    <div className="bg-gray-100 min-h-screen " onClick={closeDropdown}>
      {/* Navbar */}
      <nav className="bg-gray-200 p-4 flex flex-col sm:flex-row justify-between items-center mb-0 rounded-md shadow">
        <h1 className="text-xl font-semibold text-gray-800 flex items-center">
          <div className="flex items-center">
            <img src="/LogoB.png" alt="eChess Logo" className="h-10 mr-4" />
          </div>
        </h1>
        <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-8">
          <a href="/chess-game-setup" className="text-gray-800 font-medium">
            Play
          </a>
          <a href="/ppay" className="text-gray-800 font-medium">
            Payments
          </a>
        </div>
        <div className="relative mt-4 sm:mt-0">
          <div
            className="flex items-center cursor-pointer"
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

      {/* Search and Filters */}
      <div className="bg-pink-100 p-4 rounded-md mt-0">
        <h2 className="text-lg font-semibold text-gray-700 mb-4">
          Search for Tournaments
        </h2>
        <div className="flex flex-col sm:flex-row items-center space-x-0 sm:space-x-4">
          <select
            className="bg-white p-2 rounded-full border border-gray-300 text-gray-600 w-full sm:w-48"
            value={entryType}
            onChange={(e) => setEntryType(e.target.value)}
          >
            <option>Entry Type</option>
            <option>Free</option>
            <option>Paid</option>
          </select>
          <div className="relative w-full max-w-md mt-2 sm:mt-0">
            <input
              type="text"
              placeholder="Search"
              className="bg-white p-2 rounded-full border border-gray-300 text-gray-600 w-full"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <button className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500">
              🔍
            </button>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex flex-wrap ml-1 space-x-4 mt-2">
        {["Upcoming", "Registered", "Ongoing", "Finished"].map((tab) => (
          <button
            key={tab}
            onClick={() => handleTabClick(tab)}
            className={`font-medium px-4 py-2 rounded-md ${
              activeTab === tab
                ? "text-gray-700 !border-b-4 !border-gray-700" // Selected tab underline with !important
                : "text-gray-500 !border-b-4 !border-transparent"
            } hover:bg-transparent hover:text-gray-700 hover:!border-b-4 hover:!border-gray-700`} // Hover effect with !important
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Tournament List */}
      <div className="m-4 space-y-4">
        {loading ? (
          <p className="text-center text-gray-500">Loading tournaments...</p>
        ) : filteredTournaments.length > 0 ? (
          filteredTournaments.map((tournament, index) => (
            <div
              key={index}
              className="flex flex-col sm:flex-row items-center justify-between bg-white p-4 rounded-md shadow-md border border-gray-200"
            >
              <div className="flex items-center">
                <img
                  src={tournament.img}
                  alt={`${tournament.name} logo`}
                  className="w-12 h-12 rounded-full mr-4"
                />
                <div>
                  <h3 className="text-gray-800 font-semibold">
                    {tournament.name}
                  </h3>
                  <p className="text-gray-600">{tournament.organizerName}</p>
                  <span
                    className={`text-white text-sm px-2 py-1 rounded-md ${
                      tournament.entryType === "Paid"
                        ? "bg-red-500"
                        : "bg-green-500"
                    }`}
                  >
                    {tournament.entryType}
                  </span>
                </div>
              </div>
              <div className="flex space-x-2 mt-2 sm:mt-0">
                {activeTab === "Upcoming" && (
                  <>
                    {tournament.isPlayerRegistered ? (
                      <button
                        onClick={() => navigate(`/tpdu/${tournament._id}`)}
                        className="bg-green-500 text-white px-4 py-2 rounded-md font-semibold"
                      >
                        View
                      </button>
                    ) : (
                      <>
                        <button
                          onClick={() => navigate(`/tpdu/${tournament._id}`)}
                          className="bg-green-500 text-white px-4 py-2 rounded-md font-semibold"
                        >
                          View
                        </button>
                        <button
                          onClick={() =>
                            handleTournamentButtonClick(tournament)
                          }
                          className="bg-blue text-white px-4 py-2 rounded-md font-semibold"
                        >
                          Register
                        </button>
                      </>
                    )}
                  </>
                )}
                {activeTab === "Ongoing" && (
                  <button
                    onClick={handleViewOngoing(tournament._id)}
                    className="bg-green-500 text-white px-4 py-2 rounded-md font-semibold"
                  >
                    View
                  </button>
                )}
                {activeTab === "Finished" && (
                  <button
                    onClick={handleViewFinished(tournament._id)}
                    className="bg-green-500 text-white px-4 py-2 rounded-md font-semibold"
                  >
                    View
                  </button>
                )}
                {activeTab === "Registered" && (
                  <button
                    onClick={() => navigate(`/tpdu/${tournament._id}`)}
                    className="bg-green-500 text-white px-4 py-2 rounded-md font-semibold"
                  >
                    View
                  </button>
                )}
              </div>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-500">
            {activeTab === "Upcoming"
              ? "No upcoming tournaments available."
              : activeTab === "Registered"
              ? "You haven't registered for any tournaments yet."
              : `No ${activeTab.toLowerCase()} tournaments found.`}
          </p>
        )}
      </div>
    </div>
  );
};

export default PlayerDashboard;
