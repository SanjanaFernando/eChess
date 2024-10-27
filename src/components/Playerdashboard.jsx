import React, { useState } from 'react';

const PlayerDashboard = () => {
	const [activeTab, setActiveTab] = useState('Upcoming');

	// Tournament data for each tab
	const tournamentsData = {
		Upcoming: [
			{
				name: '2024 Michigan Upper Peninsula Open',
				club: 'Utah Chess Association',
				entryType: 'Paid',
				img: 'https://via.placeholder.com/50', // Replace with actual image URL
			},
			{
				name: 'Roger Hale Chess Celebration',
				club: 'Chess Castle of Minnesota',
				entryType: 'Free',
				img: 'https://via.placeholder.com/50',
			},
		],
		Registered: [
			{
				name: '2024 Farewell Bobby Fischer',
				club: 'Utah Chess Association',
				entryType: 'Paid',
				img: 'https://via.placeholder.com/50',
			},
		],
		Ongoing: [
			{
				name: '74th Oregon Open',
				club: 'Oregon Chess Federation',
				entryType: 'Paid',
				img: 'https://via.placeholder.com/50',
			},
		],
		Finished: [
			{
				name: '2023 Winter Chess Championship',
				club: 'California Chess Club',
				entryType: 'Free',
				img: 'https://via.placeholder.com/50',
			},
		],
	};

	const tournaments = tournamentsData[activeTab] || [];

	return (
		<div className="bg-gray-100 min-h-screen p-6">
			{/* Navbar */}
			<nav className="bg-gray-200 p-4 flex justify-between items-center">
			<div className="flex items-center">
            <img src="/LogoB.png" alt="eChess Logo" className="h-10 mr-4" />
          </div>
				<div className="flex space-x-8">
					<a href="#" className="text-gray-800 font-medium">Play</a>
					<a href="#" className="text-gray-800 font-medium">Tournaments</a>
					<a href="#" className="text-gray-800 font-medium">Payments</a>
				</div>
				<div className="mt-4 sm:mt-0 flex items-center">
          <img src="/User.png" alt="User Icon" className="h-10 mr-4" />
        </div>
			</nav>

			{/* Search and Filters */}
			<div className="bg-pink-100 p-4 rounded-md mt-4">
				<h2 className="text-lg font-semibold text-gray-700 mb-4">Search for Tournaments</h2>
				<div className="flex items-center space-x-4">
					<select className="bg-white p-2 rounded-full border border-gray-300 text-gray-600 w-48">
						<option>District</option>
						<option>North District</option>
						<option>South District</option>
						<option>East District</option>
						<option>West District</option>
					</select>
					<select className="bg-white p-2 rounded-full border border-gray-300 text-gray-600 w-48">
						<option>Club</option>
						<option>Chess Club A</option>
						<option>Chess Club B</option>
						<option>Chess Club C</option>
					</select>
					<select className="bg-white p-2 rounded-full border border-gray-300 text-gray-600 w-48">
						<option>Entry Type</option>
						<option>Free</option>
						<option>Paid</option>
					</select>
					<div className="relative w-full max-w-md">
						<input
							type="text"
							placeholder="Search"
							className="bg-white p-2 rounded-full border border-gray-300 text-gray-600 w-full"
						/>
						<button className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500">
							🔍
						</button>
					</div>
				</div>
			</div>

			{/* Tabs */}
			<div className="flex space-x-4 mt-6">
				{['Upcoming', 'Registered', 'Ongoing', 'Finished'].map((tab) => (
					<button
						key={tab}
						onClick={() => setActiveTab(tab)}
						className={`font-medium px-4 py-2 rounded-t-md ${activeTab === tab ? 'text-gray-700 border-b-2 border-gray-700' : 'text-gray-500'
							}`}
					>
						{tab}
					</button>
				))}
			</div>

			{/* Tournament List */}
			<div className="mt-4 space-y-4">
				{tournaments.length > 0 ? (
					tournaments.map((tournament, index) => (
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
									<h3 className="text-gray-800 font-semibold">{tournament.name}</h3>
									<p className="text-gray-600">{tournament.club}</p>
									<span
										className={`text-white text-sm px-2 py-1 rounded-md ${tournament.entryType === 'Paid' ? 'bg-red-500' : 'bg-green-500'
											}`}
									>
										{tournament.entryType}
									</span>
								</div>
							</div>
							<button className="bg-blue-500 text-white px-4 py-2 rounded-md font-semibold">
								{activeTab === 'Upcoming' ? 'Register' : 'View'}
							</button>
						</div>
					))
				) : (
					<p className="text-center text-gray-500">No tournaments available in this tab.</p>
				)}
			</div>
		</div>
	);
};

export default PlayerDashboard;
