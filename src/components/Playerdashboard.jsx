import React from "react";
import { Link } from "react-router-dom";

const PlayerDashboard = () => {
	return (
		<div className="bg-gray-100 min-h-screen">
			{/* Header */}
			<header className="bg-gray-200 p-4 flex justify-between items-center">
				<div className="flex items-center space-x-4">
					<img src="LogoB.png" alt="eChess Logo" className="h-10" />
					<nav className="space-x-6">
						<Link
							to="/chessgame"
							className="mx-4 text-black no-underline text-base text-center"
						>
							Play
						</Link>
						<a href="#" className="text-gray-700">
							Tournaments
						</a>
						<a href="#" className="text-gray-700">
							Payments
						</a>
					</nav>
				</div>
				<div className="flex items-center space-x-4">
					<img
						src="/avatar.png"
						alt="User Avatar"
						className="h-8 w-8 rounded-full"
					/>
				</div>
			</header>

			{/* Search Bar */}
			<div className="bg-pink-100 p-6">
				<div className="max-w-4xl mx-auto">
					<h2 className="text-2xl font-semibold text-gray-800 mb-4">
						Search for Tournaments
					</h2>
					<div className="flex space-x-4">
						<select className="w-1/3 p-2 border border-gray-300 rounded">
							<option>Colombo</option>
							<option>Gampaha</option>
						</select>
						<select className="w-1/3 p-2 border border-gray-300 rounded">
							<option>Lions</option>
							<option>Tigers</option>
						</select>
						<select className="w-1/3 p-2 border border-gray-300 rounded">
							<option>Paid</option>
							<option>Free</option>
						</select>
						<button className="p-2 border border-gray-300 rounded bg-white flex items-center justify-center">
							<svg
								className="h-6 w-6 text-gray-500"
								fill="none"
								viewBox="0 0 24 24"
								stroke="currentColor"
							>
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									strokeWidth={2}
									d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
								/>
							</svg>
						</button>
					</div>
				</div>
			</div>

			{/* Upcoming Tournaments */}
			<section className="p-6">
				<div className="max-w-4xl mx-auto">
					<h2 className="text-xl font-semibold text-gray-800 mb-4">
						Upcoming Tournaments
					</h2>
					<div className="bg-white shadow rounded-lg overflow-hidden">
						<table className="min-w-full bg-white">
							<thead>
								<tr className="bg-pink-100">
									<th className="py-2 px-4 text-left text-gray-700">
										Tournament Name
									</th>
									<th className="py-2 px-4 text-left text-gray-700">
										Club
									</th>
									<th className="py-2 px-4 text-left text-gray-700">
										District
									</th>
									<th className="py-2 px-4 text-left text-gray-700">
										Entry Type
									</th>
									<th className="py-2 px-4 text-right text-gray-700"></th>
								</tr>
							</thead>
							<tbody>
								<tr className="border-t">
									<td className="py-2 px-4 text-gray-700">
										2024 Michigan Upper Peninsula Open
									</td>
									<td className="py-2 px-4 text-gray-700">
										Utah Chess Association
									</td>
									<td className="py-2 px-4 text-gray-700">
										Utah
									</td>
									<td className="py-2 px-4 text-gray-700">
										Paid
									</td>
									<td className="py-2 px-4 text-right">
										<a href="#" className="text-blue-500">
											Register
										</a>
									</td>
								</tr>
								<tr className="border-t">
									<td className="py-2 px-4 text-gray-700">
										Roger Hale Chess Celebration
									</td>
									<td className="py-2 px-4 text-gray-700">
										Chess Castle of Minnesota
									</td>
									<td className="py-2 px-4 text-gray-700">
										Minnesota
									</td>
									<td className="py-2 px-4 text-gray-700">
										Free
									</td>
									<td className="py-2 px-4 text-right">
										<a href="#" className="text-blue-500">
											Register
										</a>
									</td>
								</tr>
								<tr className="border-t">
									<td className="py-2 px-4 text-gray-700">
										74th Oregon Open
									</td>
									<td className="py-2 px-4 text-gray-700">
										Oregon Chess Federation
									</td>
									<td className="py-2 px-4 text-gray-700">
										Oregon
									</td>
									<td className="py-2 px-4 text-gray-700">
										Paid
									</td>
									<td className="py-2 px-4 text-right">
										<a href="#" className="text-blue-500">
											Register
										</a>
									</td>
								</tr>
								<tr className="border-t">
									<td className="py-2 px-4 text-gray-700">
										2024 Farewell Bobby Fischer
									</td>
									<td className="py-2 px-4 text-gray-700">
										Utah Chess Association
									</td>
									<td className="py-2 px-4 text-gray-700">
										Utah
									</td>
									<td className="py-2 px-4 text-gray-700">
										Paid
									</td>
									<td className="py-2 px-4 text-right">
										<a href="#" className="text-blue-500">
											Register
										</a>
									</td>
								</tr>
							</tbody>
						</table>
					</div>
				</div>
			</section>

			{/* Registered Tournaments */}
			<section className="p-6">
				<div className="max-w-4xl mx-auto">
					<h2 className="text-xl font-semibold text-gray-800 mb-4">
						Registered Tournaments
					</h2>
					<div className="bg-white shadow rounded-lg overflow-hidden">
						<table className="min-w-full bg-white">
							<thead>
								<tr className="bg-pink-100">
									<th className="py-2 px-4 text-left text-gray-700">
										Tournament Name
									</th>
									<th className="py-2 px-4 text-left text-gray-700">
										Club
									</th>
									<th className="py-2 px-4 text-left text-gray-700">
										Players
									</th>
									<th className="py-2 px-4 text-left text-gray-700">
										Status
									</th>
									<th className="py-2 px-4 text-right text-gray-700"></th>
								</tr>
							</thead>
							<tbody>
								<tr className="border-t">
									<td className="py-2 px-4 text-gray-700">
										2024 Michigan Upper Peninsula Open
									</td>
									<td className="py-2 px-4 text-gray-700">
										Utah Chess Association
									</td>
									<td className="py-2 px-4 text-gray-700">
										112
									</td>
									<td className="py-2 px-4 text-green-500">
										Ongoing
									</td>
									<td className="py-2 px-4 text-right">
										<a href="#" className="text-blue-500">
											View
										</a>
									</td>
								</tr>
								<tr className="border-t">
									<td className="py-2 px-4 text-gray-700">
										Roger Hale Chess Celebration
									</td>
									<td className="py-2 px-4 text-gray-700">
										Chess Castle of Minnesota
									</td>
									<td className="py-2 px-4 text-gray-700">
										70
									</td>
									<td className="py-2 px-4 text-yellow-500">
										Upcoming
									</td>
									<td className="py-2 px-4 text-right">
										<a href="#" className="text-blue-500">
											View
										</a>
									</td>
								</tr>
								<tr className="border-t">
									<td className="py-2 px-4 text-gray-700">
										74th Oregon Open
									</td>
									<td className="py-2 px-4 text-gray-700">
										Oregon Chess Federation
									</td>
									<td className="py-2 px-4 text-gray-700">
										450
									</td>
									<td className="py-2 px-4 text-yellow-500">
										Upcoming
									</td>
									<td className="py-2 px-4 text-right">
										<a href="#" className="text-blue-500">
											View
										</a>
									</td>
								</tr>
								<tr className="border-t">
									<td className="py-2 px-4 text-gray-700">
										2024 Farewell Bobby Fischer
									</td>
									<td className="py-2 px-4 text-gray-700">
										Utah Chess Association
									</td>
									<td className="py-2 px-4 text-gray-700">
										162
									</td>
									<td className="py-2 px-4 text-red-500">
										Closed
									</td>
									<td className="py-2 px-4 text-right">
										<a href="#" className="text-blue-500">
											View
										</a>
									</td>
								</tr>
							</tbody>
						</table>
					</div>
				</div>
			</section>
		</div>
	);
};

export default PlayerDashboard;
