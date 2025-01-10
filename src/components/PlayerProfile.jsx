import React, { useEffect, useState } from "react";
import { getPlayerByUser } from "../state/player-api";
import { useNavigate, useParams } from "react-router-dom";
import { getUser } from "../state/user-api";

const PlayerProfile = () => {
	const navigate = useNavigate();

	const [isDropdownOpen, setIsDropdownOpen] = useState(false);

	const { id: userId } = useParams();

	const [user, setUser] = useState(null);
	const [player, setPlayer] = useState(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);

	useEffect(() => {
		const fetchProfile = async () => {
			try {
				const user = await getUser(userId);
				// console.log("User: ", user);
				setUser(user);
				const player = await getPlayerByUser(userId);
				// console.log("Player", player);
				setPlayer(player);
			} catch (err) {
				console.error(`Error fetching profile: `, err);
				setError(error);
			} finally {
				setLoading(false);
			}
		};

		fetchProfile();
	}, [userId]);

	const toggleDropdown = () => {
		setIsDropdownOpen(!isDropdownOpen);
	};

	const handleLogout = (e) => {
		e.preventDefault();
		localStorage.removeItem("token");
		navigate("/login");
	};

	const getBirthYear = (birthday) => {
		const date = new Date(birthday);
		return date.getFullYear();
	};

	if (loading) return <div>Loading Profile Data...</div>;

	if (error) return <div>{error}</div>;

	return (
		<div className="bg-gray-100 min-h-screen">
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
										href="/player-dashboard"
										className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
									>
										Player Dashboard
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

			{/* Profile Section */}
			<div className="flex justify-center items-center">
				<div className="max-w-4xl w-full p-4">
					{/* Back Button */}
					<div className="flex items-center mb-6">
						<button
							className="text-gray-600 hover:text-gray-900 flex items-center space-x-2"
							onClick={() => navigate(-1)}
						>
							<img
								src="/Arrow 1.png"
								alt="Back"
								className="w-4 h-4"
							/>
							<span className="text-sm">Back</span>
						</button>
					</div>

					{/* Profile Card */}
					<div className="bg-white shadow-md rounded-lg p-6 flex">
						{/* Profile Picture */}
						<div>
							<img
								src="/playerpic.PNG"
								alt="Profile"
								className="w-[450px] h-[450px] rounded-lg object-cover"
							/>
						</div>

						{/* Player Details and Ratings */}
						<div className="flex-1 ml-6">
							{/* Player Details */}
							<div className="flex items-center justify-between mb-4">
								<h2 className="text-2xl font-semibold text-gray-800">
									{user.lastName}, {user.firstName}
								</h2>
								<button className="text-gray-600 hover:text-gray-900">
									<img
										src="/edit icon.png"
										alt="Edit"
										className="w-5 h-5"
									/>
								</button>
							</div>
							<div className="grid grid-cols-2 gap-y-2 gap-x-4 text-gray-600 mt-4">
								<p className="font-medium">Email:</p>
								<p>{user.email}</p>
								<p className="font-medium">FIDE ID:</p>
								<p>{player.fideId}</p>
								<p className="font-medium">B-Year:</p>
								<p>{getBirthYear(player.birthday)}</p>
								<p className="font-medium">Sex:</p>
								<p>{player.sex}</p>
								<p className="font-medium">Federation:</p>
								<p>{player.country}</p>
							</div>

							{/* Ratings */}
							<div className="mt-6">
								<h3 className="font-semibold text-gray-800 mb-2">
									Rating
								</h3>
								<div className="grid grid-cols-1 gap-4">
									<div className="bg-gray-100 rounded-md p-4 text-center">
										<p className="text-gray-600 text-sm">
											Standard
										</p>
										<p className="text-xl font-semibold text-gray-800">
											{player.fideRating}
										</p>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default PlayerProfile;
