import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { tokenDecode } from "../../utils/token";
import { getTournament } from "../../state/tournament-api";

const FinishedTournamentPage = () => {
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

	const totalSlides = tournament?.news?.length || 0;

	useEffect(() => {
		if (totalSlides > 0) {
			const interval = setInterval(() => {
				setCurrentIndex((prevIndex) => (prevIndex + 1) % totalSlides);
			}, 3000);
			return () => clearInterval(interval);
		}
	}, [totalSlides]);

	const nextSlide = () => {
		setCurrentIndex((prevIndex) => (prevIndex + 1) % totalSlides);
	};

	const prevSlide = () => {
		setCurrentIndex((prevIndex) =>
			prevIndex === 0 ? totalSlides - 1 : prevIndex - 1
		);
	};

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
			<section className="bg-[#F4E3E3] py-12 mt-8">
				<div className="container mx-auto px-4">
					<h2 className="text-2xl font-extrabold text-gray-900 mb-8 text-center">
						Tournament Results
					</h2>
					<div className="grid grid-cols-1 gap-8">
						<div className="text-center">
							<div className="flex flex-col items-center">
								<img
									src="/trophy.png"
									alt="Tournament Finished Icon"
									className="h-32 mb-4 animate-bounce"
								/>
								<h1 className="text-4xl font-bold animate-pulse">
									🏆 Tournament Completed 🏆
								</h1>
							</div>
							<div className="mt-8">
								<h3 className="text-xl font-semibold mb-4">
									Final Rankings
								</h3>
								{tournament.standings ? (
									<div className="max-w-2xl mx-auto">
										<table className="w-full bg-white rounded-lg shadow">
											<thead className="bg-gray-100">
												<tr>
													<th className="px-4 py-2">
														Rank
													</th>
													<th className="px-4 py-2">
														Player
													</th>
													<th className="px-4 py-2">
														Points
													</th>
												</tr>
											</thead>
											<tbody>
												{tournament.standings.map(
													(standing, index) => (
														<tr
															key={index}
															className="border-t"
														>
															<td className="px-4 py-2 text-center">
																{standing.rank}
															</td>
															<td className="px-4 py-2">
																{
																	standing.playerName
																}
															</td>
															<td className="px-4 py-2 text-center">
																{
																	standing.points
																}
															</td>
														</tr>
													)
												)}
											</tbody>
										</table>
									</div>
								) : (
									<p className="text-gray-600">
										Final rankings not available
									</p>
								)}
							</div>
							<div className="mt-8">
								<button
									onClick={() =>
										window.open(
											"https://chess-results.com/",
											"_blank"
										)
									}
									className="bg-blue-500 hover:bg-blue-700 text-gray-800 hover:text-gray-500 font-bold py-2 px-4 rounded"
								>
									View Detailed Results
								</button>
							</div>
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
							No news available for this tournament.
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

export default FinishedTournamentPage;
