import React, { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import { getPlayersByPaymentStatus } from "../state/player-api";
import {
	acceptPlayerRegistration,
	revokePlayerRegistration,
} from "../state/tournament-api";

const OrganizerPaymentPage = () => {
	const location = useLocation();
	const isOrganizerPayment = location.pathname === "/opay";

	const params = useParams();
	const tournamentId = params.id;
	const [paidPlayers, setPaidPlayers] = useState([]);
	const [unpaidPlayers, setUnpaidPlayers] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);
	const [activeTab, setActiveTab] = useState("Paid");
	const [searchTerm, setSearchTerm] = useState("");
	const [filters, setFilters] = useState({
		district: "",
		club: "",
		entry: "",
	});
	const [isDropdownOpen, setIsDropdownOpen] = useState(false);
	const [userId, setUserId] = useState(null);

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

	const handleFilterChange = (key, value) => {
		setFilters((prevFilters) => ({ ...prevFilters, [key]: value }));
	};

	const handleRevokeClick = async (playerId) => {
		try {
			await revokePlayerRegistration(tournamentId, playerId);
			setUnpaidPlayers((prev) =>
				prev.filter((player) => player.playerId !== playerId)
			);
		} catch (err) {
			console.error("Error revoking player registration: ", err);
		}
	};

	const handleAcceptClick = async (playerId) => {
		try {
			await acceptPlayerRegistration(tournamentId, playerId);
			setUnpaidPlayers((prev) =>
				prev.filter((player) => player.playerId !== playerId)
			);
			setPaidPlayers((prev) => [
				...prev,
				{
					...unpaidPlayers.find(
						(player) => player.playerId === playerId
					),
				},
			]);
		} catch (err) {
			console.error("Error accepting player: ", err);
		}
	};

	const toggleDropdown = () => {
		setIsDropdownOpen(!isDropdownOpen);
	};

	const closeDropdown = () => {
		setIsDropdownOpen(false);
	};

	const handleLogout = (e) => {
		e.preventDefault();
		localStorage.removeItem("token");
		navigate("/login");
	};

	if (loading) return <div>Loading...</div>;
	if (error) return <div>{error}</div>;

	return (
		<div className="bg-gray-100 min-h-screen p-6">
			{/* Navbar */}
			<nav className="bg-gray-200 p-4 flex justify-between items-center rounded-md shadow mb-8">
				<h1 className="text-xl font-semibold text-gray-800 flex items-center">
					<img
						src="/LogoB.png"
						alt="eChess Logo"
						className="h-10 mr-4"
					/>
				</h1>
				<div className="flex space-x-8">
					<a
						href="/create-tournament"
						className="text-gray-800 font-medium"
					>
						Create
					</a>
					<a
						href="/organizer-dashboard"
						className="text-gray-800 font-medium"
					>
						Tournaments
					</a>
					<a
						href="#"
						className={`text-gray-800 font-medium ${
							isOrganizerPayment ? "font-extrabold" : ""
						}`}
					>
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
				{players.length === 0 ? (
					<div className="text-center text-gray-500 py-4">
						No players available...
					</div>
				) : (
					players
						.filter(player => 
							player.nameWithInitials.toLowerCase().includes(searchTerm.toLowerCase()) || 
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
										<p className="text-gray-600">
											FIDE ID: {player.fideId}
										</p>
										<p className="text-gray-600">
											FIDE Rating: {player.fideRating}
										</p>
									</div>
								</div>
								{activeTab === "Unpaid" ? (
									<div className="flex flex-col sm:flex-row sm:space-x-4 space-y-4 sm:space-y-0 justify-center items-center">
										<button
											onClick={() =>
												handleRevokeClick(player.playerId)
											}
											className="px-4 py-2 bg-red-500 text-white rounded-lg w-24"
										>
											Reject
										</button>
										<button
											onClick={() =>
												handleAcceptClick(player.playerId)
											}
											className="px-4 py-2 bg-green-500 text-white rounded-lg w-24"
										>
											Accept
										</button>
									</div>
								) : (
									<button className="text-green-500 font-medium">
										Paid
									</button>
								)}
							</div>
						))
				)}
			</div>
		</div>
	);
};

export default OrganizerPaymentPage;