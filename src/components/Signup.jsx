import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { registerPlayer } from "../state/player-api";
import { registerUser } from "../state/user-api";

const Signup = () => {
	const navigate = useNavigate();

	const [firstName, setFirstName] = useState("");
	const [lastName, setLastName] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");

	const handleSignUp = async (event) => {
		event.preventDefault();
		try {
			const response = await registerUser({
				firstName,
				lastName,
				email,
				password,
			});

			if (response) {
				navigate("/login");
			}

			console.log("Registration Successful");
		} catch (error) {
			console.error("Registration failed", error);
		}
	};

	return (
		<div className="flex flex-col items-center justify-center min-h-screen bg-[#F1F0EE]">
			{/* Logo Section */}
			<div className="mb-8">
				<img src="/LogoB.png" alt="Logo" className="h-18 w-auto" />
			</div>

			<div className="flex flex-col md:flex-row items-center justify-center w-full bg-[#F1F0EE]">
				{/* Signup Form */}
				<div className="bg-white  backdrop-filter backdrop-blur-lg p-6 rounded-lg shadow-lg w-full max-w-md mb-5 border border-white border-opacity-30 mx-4 md:w-2/5 ">
					<h2 className="text-2xl font-bold mb-5">Sign up</h2>
					<form onSubmit={handleSignUp}>
						<div className="mb-4">
							<label
								htmlFor="firstName"
								className="block font-bold mb-2"
							>
								First name
							</label>
							<input
								type="text"
								id="firstName"
								value={firstName}
								onChange={(e) => setFirstName(e.target.value)}
								placeholder="First name"
								required
								className="w-full p-2 border border-gray-300 rounded"
							/>
						</div>
						<div className="mb-4">
							<label
								htmlFor="lastName"
								className="block font-bold mb-2"
							>
								Last name
							</label>
							<input
								type="text"
								id="lastName"
								value={lastName}
								onChange={(e) => setLastName(e.target.value)}
								placeholder="Last name"
								required
								className="w-full p-2 border border-gray-300 rounded"
							/>
						</div>
						<div className="mb-4">
							<label
								htmlFor="email"
								className="block font-bold mb-2"
							>
								Email
							</label>
							<input
								type="email"
								id="email"
								value={email}
								onChange={(e) => setEmail(e.target.value)}
								placeholder="Email address"
								required
								className="w-full p-2 border border-gray-300 rounded"
							/>
						</div>
						<div className="mb-4">
							<label
								htmlFor="password"
								className="block font-bold mb-2"
							>
								Password
							</label>
							<input
								type="password"
								id="password"
								value={password}
								onChange={(e) => setPassword(e.target.value)}
								placeholder="Password"
								required
								className="w-full p-2 border border-gray-300 rounded"
							/>
						</div>
						<div className="mb-4">
							<label
								htmlFor="confirmPassword"
								className="block font-bold mb-2"
							>
								Confirm password
							</label>
							<input
								type="password"
								id="confirmPassword"
								value={confirmPassword}
								onChange={(e) =>
									setConfirmPassword(e.target.value)
								}
								placeholder="Confirm password"
								required
								className="w-full p-2 border border-gray-300 rounded"
							/>
						</div>
						<button
							type="submit"
							className="w-full p-2 bg-blue-500 text-white rounded hover:bg-blue-700"
						>
							Sign up
						</button>
					</form>
					<div className="flex justify-between items-center mt-4">
						<span>Already have an account?</span>
						<Link to="/login">
							<button className="bg-transparent border border-blue-500 text-blue-500 py-1 px-3 rounded hover:bg-blue-500 hover:text-white">
								Login
							</button>
						</Link>
					</div>
				</div>

				{/* Quote Section */}
				<div className="hidden md:flex flex-col items-center text-center w-full md:w-1/5 bg-white bg-opacity-15 backdrop-filter backdrop-blur-lg p-6 rounded-lg shadow-lg  mx-4">
					<div
						className="rounded-full mb-4 h-32 w-32 bg-cover bg-center"
						style={{ backgroundImage: "url('/magnus.jpeg')" }}
					></div>
					<p className="italic text-lg text-black mb-2">
						If you want to get to the top, there's always the risk
						that it will isolate you from other people.
					</p>
					<p className="font-bold text-white">@Magnus Carlsen</p>
				</div>
			</div>
		</div>
	);
};

export default Signup;
