import React from "react";
import Footer from "./Footer";
import Header from "./Header";
import Features from "./Features";
import { useNavigate } from "react-router-dom";

const Hero = () => {
	const navigate = useNavigate();

	const handleStart = () => {
		navigate("/signup");
	};

	return (
		<section className="sandwitch">
			<section
				className="flex flex-col items-start justify-center text-left py-5 px-5 bg-cover bg-center text-white h-200"
				style={{ backgroundImage: "url('/background.jpeg')" }}
			>
				{" "}
				<Header />
				<h1 className="text-4xl md:text-3xl sm:text-2xl mt-24 md:mt-20 sm:mt-16 mb-8 font-bold">
					Welcome to eChess, the ultimate online chess platform.
				</h1>
				<p className="text-xl md:text-lg sm:text-base mt-2 mb-12">
					Join us and experience the thrill of competitive chess,
					connect with fellow players, and showcase your skills.
				</p>
				<button
					className="bg-transparent text-white-700 py-2 px-4 border border-white-500 cursor-pointer rounded text-lg w-full md:w-auto my-0 md:my-0 transition duration-300 ease-in-out hover:bg-purple-500 hover:text-white hover:border-transparent"
					onClick={handleStart}
				>
					Get Started
				</button>
			</section>

			<Features />
			<Footer />
		</section>
	);
};

export default Hero;
