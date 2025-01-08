import React from "react";
import { useLocation } from "react-router-dom";

const PlayerExpensePage = () => {
	const location = useLocation();
	const isPlayerPaymentTab = location.pathname === "/ppay";
	const registeredTournaments = [
		{ name: "Chess Tournament A", fee: 1500 },
		{ name: "Chess Tournament B", fee: 2000 },
		{ name: "Chess Tournament C", fee: 1200 },
	];

	const totalExpenses = registeredTournaments.reduce(
		(total, tournament) => total + tournament.fee,
		0
	);

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
					<a href="/chessgame" className="text-gray-800 font-medium">
						Play
					</a>
					<a
						href="/player-dashboard"
						className="text-gray-800 font-medium"
					>
						Tournaments
					</a>
					<a
						href="#"
						className={`text-gray-800 font-medium ${
							isPlayerPaymentTab ? "font-extrabold" : ""
						}`}
					>
						Payments
					</a>
				</div>
				<div className="relative">
					<img src="/User.png" alt="User Icon" className="h-10" />
				</div>
			</nav>

			{/* Expense Tracking Section */}
			<div className="bg-white p-6 rounded-md shadow">
				<h2 className="text-lg font-semibold text-gray-700 mb-4">
					Registered Tournament Expenses
				</h2>
				<div className="space-y-4">
					{registeredTournaments.map((tournament, index) => (
						<div
							key={index}
							className="flex justify-between items-center bg-gray-100 p-4 rounded-md shadow-sm"
						>
							<div>
								<p className="font-medium text-gray-800">
									{tournament.name}
								</p>
							</div>
							<div>
								<p className="text-gray-600">
									Fee: Rs.{tournament.fee}
								</p>
							</div>
						</div>
					))}
				</div>
				<div className="mt-6 border-t pt-4">
					<h3 className="text-lg font-semibold text-gray-800">
						Total Expenses: Rs.{totalExpenses}
					</h3>
				</div>
			</div>
		</div>
	);
};

export default PlayerExpensePage;
