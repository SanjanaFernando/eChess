import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { getClassifiedTournaments, deleteTournament } from "../state/tournament-api";
import { tokenDecode } from "../utils/token";

const TournamentsPage = () => {
	const location = useLocation();
	const navigate = useNavigate();

	const isTournamentsTab = location.pathname === "/organizer-dashboard";

	const [userId, setUserId] = useState(null);
	const [activeTab, setActiveTab] = useState("Upcoming");
	const [searchTerm, setSearchTerm] = useState("");
	const [selectedFilters, setSelectedFilters] = useState({
		district: "",
		club: "",
		entry: "",
	});
	const [isDropdownOpen, setIsDropdownOpen] = useState(false);
	const [tournamentData, setTournamentData] = useState({
		Upcoming: [],
		Ongoing: [],
		Completed: [],
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
	};

	const handleSearchChange = (e) => {
		setSearchTerm(e.target.value);
	};

	const handleFilterChange = (filterType, value) => {
		setSelectedFilters({
			...selectedFilters,
			[filterType]: value,
		});
	};

	const getFilteredTournaments = () => {
		return tournamentData[activeTab].filter((tournament) => {
			return (
				(!selectedFilters.district ||
					tournament.district === selectedFilters.district) &&
				(!selectedFilters.club ||
					tournament.club === selectedFilters.club) &&
				(!selectedFilters.entry ||
					tournament.entry === selectedFilters.entry) &&
				(!searchTerm ||
					tournament.name
						.toLowerCase()
						.includes(searchTerm.toLowerCase()))
			);
		});
	};

	const handleEditClick = (tournamentName) => {
		console.log(`Editing tournament: ${tournamentName}`);
	};

	const handleLogout = (e) => {
		e.preventDefault();
		localStorage.removeItem("token");
		navigate("/login");
	};

	const handleCreatePress = () => {
		navigate("/create-tournament");
	};

	const handleViewButtonClick = (tournamentId) => {
		if (activeTab === "Completed") {
			navigate("/tpf");
		} else if (activeTab === "Ongoing") {
			navigate("/todo");
		} else {
			navigate(`/todu/${tournamentId}`);
		}
	};

	const handleStartTournament = (tournamentId) => {
		console.log(`Starting tournament: ${tournamentId}`);
		// Add logic to start the tournament
	};

	const handleFinishTournament = (tournamentId) => {
		console.log(`Finishing tournament: ${tournamentId}`);
		// Add logic to finish the tournament
	};

	const handleDeleteTournament = async (tournamentId) => {
		try {
			// Remove any potential trailing :1 from the ID
			const cleanTournamentId = tournamentId.split(':')[0];
			await deleteTournament(cleanTournamentId);
			// Refresh the tournaments data
			const tournaments = await getClassifiedTournaments();
			setTournamentData(tournaments);
			// Show success message
			alert('Tournament deleted successfully');
		} catch (error) {
			console.error("Error deleting tournament:", error);
			alert('Failed to delete tournament. Please try again.');
		}
	};

	const TournamentTable = ({ tournaments }) => (
		<div className="bg-white mt-4 p-6 rounded-md shadow-md">
			<table className="min-w-full border border-gray-300">
				<thead className="bg-pink-100">
					<tr>
						<th className="text-left p-4 text-gray-600 font-semibold border-b">
							Tournament Name
						</th>
						{activeTab === "Ongoing" ? (
							<>
								<th className="text-left p-4 text-gray-600 font-semibold border-b">
									End Date
								</th>
								<th className="text-left p-4 text-gray-600 font-semibold border-b">
									Active Players
								</th>
								<th className="text-left p-4 text-gray-600 font-semibold border-b">
									Ongoing Round
								</th>
							</>
						) : activeTab === "Completed" ? (
							<>
								<th className="text-left p-4 text-gray-600 font-semibold border-b">
									Starting Date
								</th>
								<th className="text-left p-4 text-gray-600 font-semibold border-b">
									End Date
								</th>
								<th className="text-left p-4 text-gray-600 font-semibold border-b">
									Participations
								</th>
							</>
						) : (
							<>
								<th className="text-left p-4 text-gray-600 font-semibold border-b">
									Starting Date
								</th>
								<th className="text-left p-4 text-gray-600 font-semibold border-b">
									End Date
								</th>
								<th className="text-left p-4 text-gray-600 font-semibold border-b">
									Entry Type
								</th>
							</>
						)}
						<th className="p-4 border-b"></th>
					</tr>
				</thead>
				<tbody>
					{tournaments.map((tournament, index) => (
						<tr key={index} className="border-t">
							<td className="p-4 text-gray-700">
								{tournament.name}
							</td>
							{activeTab === "Ongoing" ? (
								<>
									<td className="p-4 text-gray-700">
										{tournament.endDate}
									</td>
									<td className="p-4 text-gray-700">
										{tournament.participations}
									</td>
									<td className="p-4 text-gray-700">
										{tournament.ongoingRound}
									</td>
								</>
							) : activeTab === "Completed" ? (
								<>
									<td className="p-4 text-gray-700">
										{tournament.startDate}
									</td>
									<td className="p-4 text-gray-700">
										{tournament.endDate}
									</td>
									<td className="p-4 text-gray-700">
										{tournament.participations}
									</td>
								</>
							) : (
								<>
									<td className="p-4 text-gray-700">
										{tournament.startDate}
									</td>
									<td className="p-4 text-gray-700">
										{tournament.endDate}
									</td>
									<td className="p-4 text-gray-700">
										{tournament.entry}
									</td>
								</>
							)}
							<td className="p-4 text-blue-500 text-right">
								<div className="flex items-center space-x-2">
									{activeTab === "Upcoming" && (
										<button
											onClick={() => handleStartTournament(tournament.id)}
											className="flex items-center space-x-1"
										>
											<span className="text-2xl">▶️</span>
											<span>Start</span>
										</button>
									)}
									{activeTab === "Ongoing" && (
										<button
											onClick={() => handleFinishTournament(tournament.id)}
											className="flex items-center space-x-1"
										>
											<span className="text-2xl">⏹️</span>
											<span>Finish</span>
										</button>
									)}
									<button
										onClick={() => handleViewButtonClick(tournament.id)}
										className="flex items-center space-x-1"
									>
										<span className="text-2xl">ℹ️</span>
										<span>View</span>
									</button>
									<button
										onClick={() => handleDeleteTournament(tournament.id)}
										className="flex items-center space-x-1 text-red-500 hover:text-red-700"
									>
										<span className="text-2xl">🗑️</span>
										<span>Delete</span>
									</button>
								</div>
							</td>
						</tr>
					))}
				</tbody>
			</table>
		</div>
	);

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

			<div className="bg-pink-100 p-4 rounded-md mt-4">
				<h2 className="text-lg font-semibold text-gray-700 mb-4">
					Search for Tournaments
				</h2>
				<div className="flex items-center space-x-4">
					

					<select
						onChange={(e) =>
							handleFilterChange("entry", e.target.value)
						}
						className="bg-white p-2 rounded-full border border-gray-300 text-gray-600 w-48"
					>
						<option value="">Entry Type</option>
						<option value="Free">Free</option>
						<option value="Paid">Paid</option>
					</select>

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
				{["Upcoming", "Ongoing", "Completed"].map((tab) => (
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

			<TournamentTable tournaments={getFilteredTournaments()} />
		</div>
	);
};

export default TournamentsPage;
