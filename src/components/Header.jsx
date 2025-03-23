import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { tokenDecode } from "../utils/token";

export default function Header() {

	const [isMenuOpen, setIsMenuOpen] = useState(false);
	const [user, setUser] = useState(null);
	const navigate = useNavigate();

	useEffect(() => {
		const token = localStorage.getItem("token");
		if (token) {
			const decodedToken = tokenDecode(token);
			setUser(decodedToken);
			console.log("Decoded Token: ", decodedToken);
		}
	}, []);

	const handleLogout = () => {
		localStorage.removeItem("token");
		setUser(null);
		navigate("/login");
	};

  return (
    <header className="top-0 flex flex-col md:flex-row justify-between items-center p-2 px-5 md:px-10 bg-transparent text-white w-full">
      {/* Logo and Navigation */}
      <div className="flex w-full md:w-auto">
        {/* Hamburger Menu for Mobile */}
        <button
          className="text-white md:hidden focus:outline-none"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M3 6h18M3 12h18M3 18h18"
            />
          </svg>
        </button>


				{/* Logo */}
				<img
					src="/LogoW.png"
					alt="Logo"
					className="h-8 w-auto md:h-14 transition-transform duration-300 ease-in-out hover:scale-110"
				/>
				<div className="md:hidden space-x-2 items-right">
					{!user && (
						<>
							<Link to="/Login">
								<button className="bg-transparent text-white-700 py-2 px-4 font-semibold border border-white-500 rounded text-sm transition duration-300 ease-in-out hover:bg-sky-500 hover:text-white">
									Login
								</button>
							</Link>
							<Link to="/signup">
								<button className="bg-blue text-white-700 py-2 px-4 font-semibold rounded text-sm transition duration-300 ease-in-out hover:bg-sky-500 hover:text-white">
									Sign up
								</button>
							</Link>
						</>
					)}
				</div>
			</div>

			{/* Navigation Links (Desktop Only) */}
			<nav className="hidden md:flex items-center font-semibold">
				<Link
					to={
						user
							? user.role === "ORGANIZER"
								? "/organizer-dashboard"
								: "/player-dashboard"
							: "/login"
					}
					className="ml-8 mr-6 text-white no-underline text-xl text-center transition-transform duration-300 ease-in-out hover:text-purple-300 hover:scale-105"
				>
					Play
				</Link>
				<Link
					to={
						user
							? user.role === "ORGANIZER"
								? "/organizer-dashboard"
								: "/player-dashboard"
							: "/login"
					}
					className="mx-6 text-white no-underline text-xl text-center transition-transform duration-300 ease-in-out hover:text-purple-300 hover:scale-105"
				>
					Organize
				</Link>
				<Link
					to={
						user
							? user.role === "ORGANIZER"
								? "/organizer-dashboard"
								: "/player-dashboard"
							: "/login"
					}
					className="mx-6 text-white no-underline text-xl text-center transition-transform duration-300 ease-in-out hover:text-purple-300 hover:scale-105"
				>
					Tournaments
				</Link>
				<Link
					to={
						user
							? user.role === "ORGANIZER"
								? "/organizer-dashboard"
								: "/player-dashboard"
							: "/login"
					}
					className="mx-6 text-white no-underline text-xl text-center transition-transform duration-300 ease-in-out hover:text-purple-300 hover:scale-105"
				>
					Payments
				</Link>
			</nav>

			{/* Login and Signup Buttons */}
			<div className="hidden md:flex space-x-8 items-center">
				{!user ? (
					<>
						<Link to="/Login">
							<button className="bg-transparent text-white-700 py-2 px-8 font-semibold border border-white-500 rounded text-lg transition duration-300 ease-in-out hover:bg-sky-500 hover:text-white">
								Login
							</button>
						</Link>
						<Link to="/signup">
							<button className="bg-blue text-white-700 py-2 px-8 font-semibold rounded text-lg transition duration-300 ease-in-out hover:bg-sky-500 hover:text-white">
								Sign up
							</button>
						</Link>
					</>
				) : (
					<button
						onClick={handleLogout}
						className="bg-transparent text-white-700 py-2 px-8 font-semibold border border-white-500 rounded text-lg transition duration-300 ease-in-out hover:bg-sky-500 hover:text-white"
					>
						Logout
					</button>
				)}
			</div>

			{/* Hamburger Menu Dropdown (Mobile Only) */}
			{isMenuOpen && (
				<nav className="absolute top-16 left-0 w-full bg-black bg-opacity-80 text-white p-4 z-50 md:hidden">
					<Link
						to={
							user
								? user.role === "ORGANIZER"
									? "/organizer-dashboard"
									: "/player-dashboard"
								: "/login"
						}
						className="block py-2 text-center text-lg hover:text-purple-300"
					>
						Play
					</Link>
					<Link
						to={
							user
								? user.role === "ORGANIZER"
									? "/organizer-dashboard"
									: "/player-dashboard"
								: "/login"
						}
						className="block py-2 text-center text-lg hover:text-purple-300"
					>
						Organize
					</Link>
					<Link
						to={
							user
								? user.role === "ORGANIZER"
									? "/organizer-dashboard"
									: "/player-dashboard"
								: "/login"
						}
						className="block py-2 text-center text-lg hover:text-purple-300"
					>
						Tournaments
					</Link>
					<Link
						to={
							user
								? user.role === "ORGANIZER"
									? "/organizer-dashboard"
									: "/player-dashboard"
								: "/login"
						}
						className="block py-2 text-center text-lg hover:text-purple-300"
					>
						Payments
					</Link>
				</nav>
			)}
		</header>
	);
}
