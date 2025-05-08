import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { tokenDecode } from "../../utils/token";
import { getTournament } from "../../state/tournament-api";

const TournamentDashboard = () => {
	const navigate = useNavigate();
	const { id: tournamentId } = useParams();
	const [isDropdownOpen, setIsDropdownOpen] = useState(false);
	const [isTournamentsTab, setIsTournamentsTab] = useState(true);
	const [tournament, setTournament] = useState(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);
	const [currentIndex, setCurrentIndex] = useState(0);

	useEffect(() => {
		const fetchTournamentData = async () => {
			try {
				setLoading(true);
				const data = await getTournament(tournamentId);
				setTournament(data);
			} catch (error) {
				console.error("Error fetching tournament:", error);
				setError("Failed to load tournament data");
			} finally {
				setLoading(false);
			}
		};

		fetchTournamentData();
	}, [tournamentId]);

	const toggleDropdown = () => {
		setIsDropdownOpen(!isDropdownOpen);
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

	// Auto-slide for news
	const totalSlides = tournament?.news?.length || 0;

	useEffect(() => {
		if (totalSlides > 0) {
			const interval = setInterval(() => {
				setCurrentIndex((prevIndex) => (prevIndex + 1) % totalSlides);
			}, 3000);
			return () => clearInterval(interval);
		}
	}, [totalSlides]);

	if (loading) {
		return (
			<div className="text-center py-8">
				Loading tournament details...
			</div>
		);
	}

	if (error) {
		return <div className="text-center py-8 text-red-600">{error}</div>;
	}

	if (!tournament) {
		return <div className="text-center py-8">Tournament not found</div>;
	}

	return (
		<div className="font-sans antialiased text-gray-900">
			{/* Navbar */}
			<nav className="bg-gray-200 p-4 flex justify-between items-center mb-8 rounded-md shadow">
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
				<div className="flex space-x-8">
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
				<div className="relative">
					<div
						className="mt-4 sm:mt-0 flex items-center cursor-pointer"
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
			<section className="bg-gray-50 py-12">
				<div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-2 gap-8">
					<div>
						<h1 className="text-3xl font-extrabold text-gray-900 mb-4">
							{tournament.name}
						</h1>
						<p className="text-gray-700 mb-6">
							{tournament.description}
						</p>
					</div>
					<div className="bg-gray-200 rounded-lg h-64">
						<img
							src={
								tournament.coverImage ||
								"/default-tournament.jpg"
							}
							alt={tournament.name}
							className="w-full h-full object-cover rounded-lg"
						/>
					</div>
				</div>
			</section>

			{/* Tournament Details Section */}
			<section className="bg-[#F4E3E3] py-12">
				<div className="container mx-auto px-4">
					<h2 className="text-2xl font-extrabold text-gray-900 mb-8 text-center">
						Tournament Details
					</h2>
					<div className="grid grid-cols-1 md:grid-cols-3 gap-8">
						{/* Current Round */}
						<div className="text-center">
							<div className="flex items-center justify-center h-16">
								<img
									src="/format.png"
									alt="Round Icon"
									className="h-10"
								/>
							</div>
							<p className="font-bold">Current Round</p>
							<p>{tournament.onGoingRound}</p>
						</div>

						{/* Next Round */}
						<div className="text-center">
							<div className="flex items-center justify-center h-16">
								<img
									src="/clock.png"
									alt="Clock Icon"
									className="h-10"
								/>
							</div>
							<p className="font-bold">Next Round</p>
							<p>
								{tournament.nextRoundStartingDateTime
									? new Date(
											tournament.nextRoundStartingDateTime
									  ).toLocaleTimeString()
									: "Not scheduled"}
							</p>
						</div>

						{/* Live Results */}
						<div className="text-center">
							<div className="flex items-center justify-center h-16">
								<img
									src="/frame.png"
									alt="Results Icon"
									className="h-10"
								/>
							</div>
							<p className="font-bold">Live</p>
							<button
								className="text-blue-600 hover:text-blue-800"
								onClick={() =>
									navigate(`https://chess-results.com/`)
								}
							>
								View Results
							</button>
						</div>
					</div>
				</div>
			</section>

			{/* Media Updates Section */}
			<section className="bg-gray-50 py-12 mt-8">
				<div className="container mx-auto px-4">
					<h2 className="text-2xl font-extrabold text-gray-900 mb-8 text-center">
						Tournament News
					</h2>
					{tournament.news && tournament.news.length > 0 ? (
						<div className="relative w-full max-w-5xl mx-auto">
							<div className="overflow-hidden rounded-lg">
								<div
									className="flex transition-transform duration-500 ease-in-out"
									style={{
										transform: `translateX(-${
											currentIndex * 20
										}%)`,
										width: `${
											tournament.news.length * 50
										}%`,
									}}
								>
									{tournament.news.map((newsItem, index) => (
										<div
											key={index}
											className="w-full flex-shrink-0 px-2"
											style={{ width: "20%" }}
										>
											<div className="w-100 h-100 mx-auto rounded-lg shadow-md">
												<img
													src={
														newsItem.image ||
														"/default-news.jpg"
													}
													alt={newsItem.title}
													className="w-full h-60 object-cover rounded-t-lg"
												/>
												<div className="p-4">
													<h3 className="font-bold text-lg">
														{newsItem.title}
													</h3>
													<p className="text-gray-600 mt-2">
														{newsItem.description}
													</p>
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
											onClick={() =>
												setCurrentIndex(index)
											}
											className={`w-3 h-3 rounded-full transition-all ${
												currentIndex === index
													? "bg-gray-900"
													: "bg-gray-400"
											}`}
										></button>
									))}
								</div>
							</div>
						</div>
					) : (
						<div className="text-center text-gray-600">
							No news available for this tournament yet.
						</div>
					)}
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

export default TournamentDashboard;
