import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { getTournamentsByStatus } from "../state/tournament-api";
import { playerTournaments } from "../state/player-api";
import { tokenDecode } from "../utils/token";

const PlayerDashboard = () => {
	const location = useLocation();
	const isTournamentsTab = location.pathname === "/player-dashboard";

	const [activeTab, setActiveTab] = useState("Upcoming");
	const [tournaments, setTournaments] = useState([]);
	const [loading, setLoading] = useState(true);
	const [isDropdownOpen, setIsDropdownOpen] = useState(false);
	const navigate = useNavigate();
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
			await new Promise((resolve) => setTimeout(resolve, 1000)); // Simulate network delay

			const token = localStorage.getItem("token");
			const decodedToken = tokenDecode(token);

			// Fetch data from APIs
			const upcomingTournamentsRaw = await getTournamentsByStatus({
				status: "UPCOMING",
				userId: decodedToken.id,
			});
			const registeredTournaments = await playerTournaments({
				userId: decodedToken.id,
			});

			// Add the same image to all tournament objects
			const upcomingTournaments = upcomingTournamentsRaw.map(
				(tournament) => ({
					...tournament,
					img: "/trophy.png",
				})
			);

			const registeredTournamentsWithImages = registeredTournaments.map(
				(tournament) => ({
					...tournament,
					img: "/trophy.png",
				})
			);

			// Mock data for other tabs
			const ongoingTournaments = [
				{
					name: "74th Oregon Open",
					club: "Oregon Chess Federation",
					entryType: "Paid",
					img: "/trophy.png",
				},
			];

			const finishedTournaments = [
				{
					name: "2023 Winter Chess Championship",
					club: "California Chess Club",
					entryType: "Free",
					img: "/trophy.png",
				},
			];

			// Combine data for all tabs
			const data = {
				Upcoming: upcomingTournaments,
				Registered: registeredTournamentsWithImages,
				Ongoing: ongoingTournaments,
				Finished: finishedTournaments,
			};

			setTournaments(data[tab] || []);
		} catch (error) {
			console.error("Error fetching tournaments: ", error);
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
			// console.log("Navigating to tournament dashboard");
			navigate("/tpdu");
		}
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
		const matchesEntryType = entryType === "Entry Type" || tournament.entryType === entryType;
		const matchesSearchQuery = tournament.name.toLowerCase().includes(searchQuery.toLowerCase());
		return matchesEntryType && matchesSearchQuery;
	});

	return (
		<div className="bg-gray-100 min-h-screen p-6" onClick={closeDropdown}>
			{/* Navbar */}
			<nav className="bg-gray-200 p-4 flex justify-between items-center mb-8 rounded-md shadow">
				<h1 className="text-xl font-semibold text-gray-800 flex items-center">
					<div className="flex items-center">
						<img
							src="/LogoB.png"
							alt="eChess Logo"
							className="h-10 mr-4"
						/>
					</div>
				</h1>
				<div className="flex space-x-8">
					<a
						href="/chess-game-setup"
						className="text-gray-800 font-medium"
					>
						Play
					</a>
					<a href="/ppay" className="text-gray-800 font-medium">
						Payments
					</a>
				</div>
				<div className="relative">
					<div
						className="mt-4 sm:mt-0 flex items-center cursor-pointer"
						onClick={(e) => {
							e.stopPropagation();
							toggleDropdown();
						}}
					>
						<img
							src="/User.png"
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
			<div className="bg-pink-100 p-4 rounded-md mt-4">
				<h2 className="text-lg font-semibold text-gray-700 mb-4">
					Search for Tournaments
				</h2>
				<div className="flex items-center space-x-4">
					<select
						className="bg-white p-2 rounded-full border border-gray-300 text-gray-600 w-48"
						value={entryType}
						onChange={(e) => setEntryType(e.target.value)}
					>
						<option>Entry Type</option>
						<option>Free</option>
						<option>Paid</option>
					</select>
					<div className="relative w-full max-w-md">
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
			<div className="flex space-x-4 mt-6">
				{["Upcoming", "Registered", "Ongoing", "Finished"].map(
					(tab) => (
						<button
							key={tab}
							onClick={() => handleTabClick(tab)}
							className={`font-medium px-4 py-2 rounded-t-md ${
								activeTab === tab
									? "text-gray-700 border-b-2 border-gray-700"
									: "text-gray-500"
							}`}
						>
							{tab}
						</button>
					)
				)}
			</div>

			{/* Tournament List */}
			<div className="mt-4 space-y-4">
				{loading ? (
					<p className="text-center text-gray-500">
						Loading tournaments...
					</p>
				) : filteredTournaments.length > 0 ? (
					filteredTournaments.map((tournament, index) => (
						<div
							key={index}
							className="flex items-center justify-between bg-white p-4 rounded-md shadow-md border border-gray-200"
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
									<p className="text-gray-600">
										{tournament.organizerName}
									</p>
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
							<button
								onClick={() =>
									handleTournamentButtonClick(tournament)
								}
								className={`${
									tournament.isPlayerRegistered
										? "bg-green-500 px-7"
										: "bg-blue"
								} text-white px-4 py-2 rounded-md font-semibold`}
							>
								{activeTab === "Upcoming"
									? tournament.isPlayerRegistered
										? "View"
										: "Register"
									: "View"}
							</button>
						</div>
					))
				) : (
					<p className="text-center text-gray-500">
						No tournaments available in this tab.
					</p>
				)}
			</div>
		</div>
	);
};

export default PlayerDashboard;
