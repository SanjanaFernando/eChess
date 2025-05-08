import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { getClassifiedTournaments, deleteTournament } from "../state/tournament-api";
import { tokenDecode } from "../utils/token";

const PlayersPage = () => {
	const location = useLocation();
	const navigate = useNavigate();

    const [userId, setUserId] = useState(null);
	const [activeTab, setActiveTab] = useState("Under 8");
	const [activeGender, setActiveGender] = useState("Male");
	const [searchTerm, setSearchTerm] = useState("");
	const [isDropdownOpen, setIsDropdownOpen] = useState(false);

	// Dummy player data
	const players = [
		{ fullName: "Aluvihare S D", rating: 1500 },
		{ fullName: "Bandara E H G K T", rating: 1450 },
		{ fullName: "Bandara P M T G", rating: 1600 },
		{ fullName: "Dissanayaka D M P S", rating: 1550 },
		{ fullName: "Dissanayaka K D M S D B", rating: 1400 },
		{ fullName: "Edirisinghe S J", rating: 1480 },
		{ fullName: "Harshamal W P R", rating: 1520 },
		{ fullName: "Herath H M T B", rating: 1580 },
		{ fullName: "Hewage H T P", rating: 1420 },
		{ fullName: "Jayasi S D I S G", rating: 1490 },
		{ fullName: "Jayathilake A A S", rating: 1530 },
		{ fullName: "Niliwakke N M S S B", rating: 1470 },
		{ fullName: "Pathiraja W A L V P", rating: 1540 },
		{ fullName: "Perera W T D", rating: 1460 },
		{ fullName: "Rajakaruana D R A B", rating: 1510 },
		{ fullName: "Rodrigo W S G", rating: 1590 },
		{ fullName: "Rukshan P R C", rating: 1440 },
		{ fullName: "Sanjith A", rating: 1500 },
	];

	// Toggle the dropdown menu
	const toggleDropdown = () => {
		setIsDropdownOpen(!isDropdownOpen);
	};

	// Close the dropdown when clicking outside
	const closeDropdown = () => {
		setIsDropdownOpen(false);
	};

	const handleTabClick = (tab) => {
		setActiveTab(tab);
		setActiveGender("Male");
	};

	const handleGenderClick = (gender) => {
		setActiveGender(gender);
	};

	const handleSearchChange = (e) => {
		setSearchTerm(e.target.value);
	};

	// Filter players based on search term, active tab, and gender
	const filteredPlayers = players.filter((player) => {
		const isMatchingGender = activeGender === "Male" ? player.fullName.includes("A") : !player.fullName.includes("A");
		return (
			player.fullName.toLowerCase().includes(searchTerm.toLowerCase()) &&
			isMatchingGender
		);
	});
    useEffect(() => {
		const fetchTournaments = async () => {
			try {
				const token = localStorage.getItem("token");
				const decodedToken = tokenDecode(token);
				const userId = decodedToken.id;

				if (!userId) {
					throw new Error("User ID not found in token");
				}

				setUserId(userId);

				const tournaments = await getClassifiedTournaments();

				setTournamentData(tournaments);
			} catch (error) {
				console.error("Error fetching tournaments:", error);
			}
		};

		fetchTournaments();
	}, []);
    const handleCreatePress = () => {
		navigate("/create-tournament");
	};

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
						href="#"
						className="text-gray-800 font-medium"
						onClick={handleCreatePress}
					>
						Create
					</a>
					<a
						href="/pp"
						className="text-gray-800 font-medium"
					>
						Players
					</a>
					<a href="/opay" className="text-gray-800 font-medium">
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
										href={`/profile/${userId}`}
										className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
									>
										Profile
									</a>
								</li>
								<li>
									<button
										onClick={() => {
											localStorage.removeItem("token");
											navigate("/login");
										}}
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

			<div className="bg-pink-100 p-4 rounded-md mt-4">
				<h2 className="text-lg font-semibold text-gray-700 mb-4">
					Search for Players
				</h2>
				<div className="flex items-center space-x-4">
					<div className="relative w-full max-w-md">
						<input
							type="text"
							placeholder="Search"
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

			<div className="bg-gray-200 p-4 items-center flex space-x-8 mt-6">
				{["Under 8", "Under 10", "Under 12", "Under 14", "Under 16", "Under 18", "Above 18"].map((tab) => (
					<button
						key={tab}
						onClick={() => handleTabClick(tab)}
						className={`text-gray-700 font-medium ${
							activeTab === tab
								? "border-b-2 border-gray-700"
								: "text-gray-500"
						}`}
					>
						{tab}
					</button>
				))}
			</div>

			{/* Gender Tabs */}
			<div className="bg-gray-200 p-4 items-center flex justify-center space-x-8 mt-4">
				{["Male", "Female"].map((gender) => (
					<button
						key={gender}
						onClick={() => handleGenderClick(gender)}
						className={`text-gray-700 font-medium ${
							activeGender === gender
								? "border-b-2 border-gray-700"
								: "text-gray-500"
						}`}
					>
						{gender}
					</button>
				))}
			</div>

			{/* Player List Display */}
			<div className="mt-6">
				<h3 className="text-lg font-semibold text-gray-700">
					Players in {activeTab} Category - {activeGender}
				</h3>
				<table className="min-w-full border border-gray-300 mt-4">
					<thead className="bg-gray-200">
						<tr>
							<th className="p-4 text-left border-b">Full Name</th>
							<th className="p-4 text-left border-b">Rating</th>
						</tr>
					</thead>
					<tbody>
						{filteredPlayers.map((player, index) => (
							<tr key={index} className="border-t">
								<td className="p-4 text-gray-700">{player.fullName}</td>
								<td className="p-4 text-gray-700">{player.rating}</td>
							</tr>
						))}
					</tbody>
				</table>
			</div>
		</div>
	);
};

export default PlayersPage;