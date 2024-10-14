import React from "react";
import { Link } from "react-router-dom";

const Header = () => {
	return (
		<header className="top-0 flex flex-col md:flex-row justify-between items-center p-2 bg-transparent text-white w-full ">
<div className="flex items-center mb-5 md:mb-0">
    <nav className="flex flex-col md:flex-row items-center w-full md:w-auto">
        {/* Logo with a hover animation */}
        <img
            src="/LogoW.png"
            alt="Logo"
            className="h-10 w-auto mr-4 transition-transform duration-300 ease-in-out hover:scale-110"
        />

        {/* Navigation Links with hover effects */}
        <Link
            to="/login"
            className="mx-4 text-white no-underline text-base text-center transition-transform duration-300 ease-in-out hover:text-purple-300 hover:scale-105"
        >
            Play
        </Link>
        <Link
            to="/login"
            className="mx-4 text-white no-underline text-base text-center transition-transform duration-300 ease-in-out hover:text-purple-300 hover:scale-105"
        >
            Organize
        </Link>
        <Link
            to="/login"
            className="mx-4 text-white no-underline text-base text-center transition-transform duration-300 ease-in-out hover:text-purple-300 hover:scale-105"
        >
            Tournaments
        </Link>
        <Link
            to="/Payment"
            className="mx-4 text-white no-underline text-base text-center transition-transform duration-300 ease-in-out hover:text-purple-300 hover:scale-105"
        >
            Payments
        </Link>
    </nav>
</div>


			<div className="space-x-8 flex flex-col md:flex-row items-center w-full md:w-auto mt-0 md:mt-0">
				<Link to="/signup">
					<button className="bg-transparent text-white-700 py-2 px-4 border border-white-500 cursor-pointer rounded text-lg w-full md:w-auto my-0 md:my-0 transition duration-300 ease-in-out hover:bg-purple-500 hover:text-white hover:border-transparent">
						Sign up
					</button>
				</Link>
				<Link to="/Login">
					<button className="bg-transparent text-white-700 py-2 px-4 border border-white-500 cursor-pointer rounded text-lg w-full md:w-auto my-0 md:my-0 transition duration-300 ease-in-out hover:bg-purple-500 hover:text-white hover:border-transparent">
						Login
					</button>
				</Link>
			</div>
		</header>
	);
};

export default Header;

/*<Link to="/signuporganizer">
          <button className="bg-blue-700 text-white py-2 px-4 cursor-pointer rounded text-lg w-full md:w-auto my-2 md:my-0">
            Sign Up as Organizer
          </button>
        </Link>*/
