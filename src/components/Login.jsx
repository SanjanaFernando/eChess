import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { login } from "../state/player-api";
import { tokenDecode } from "../utils/token";
import { loginUser } from "../state/user-api";

const Login = () => {
	const navigate = useNavigate();

	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	const handleLogin = async (event) => {
		event.preventDefault();
		try {
			const response = await login({ email, password });

			if (response) {
				localStorage.setItem("token", response.token);
				const decodedToken = tokenDecode(response.token);
				const userRole = decodedToken.role;
				userRole == "ORGANIZER"
					? navigate("/organizer-dashboard")
					: navigate("/player-dashboard");
			}

			console.log("Logged in successfully");
		} catch (error) {
			console.error("Login failed", error);
		}
	};

	return (
		<div className="flex flex-col items-center justify-center min-h-screen bg-[#F1F0EE]">
			{/* Logo Section */}
			<div className="mb-8">
				<img src="/LogoB.png" alt="Logo" className="h-18 w-auto" />
			</div>

			<div className="bg-white backdrop-blur-lg p-8 rounded-lg shadow-lg w-full max-w-sm sm:w-4/5 md:w-1/2 lg:w-1/3 border border-white/30 ">
				<h2 className="mb-5 font-bold text-2xl text-black">Log in</h2>
				<form onSubmit={handleLogin}>
					<div className="mb-4 ">
						<label
							htmlFor="email"
							className="block font-bold mb-1 text-black"
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
							className="w-full p-2 border border-gray-300 rounded bg-gray-100"
						/>
					</div>
					<div className="mb-4">
						<label
							htmlFor="password"
							className="block font-bold mb-1 text-black"
						>
							Password{" "}
							<a href="#" className="text-blue-900 ml-2">
								Forgot password?
							</a>
						</label>
						<input
							type="password"
							id="password"
							value={password}
							onChange={(e) => setPassword(e.target.value)}
							placeholder="Password"
							required
							className="w-full p-2 border border-gray-300 rounded bg-gray-100"
						/>
					</div>
					<button
						type="submit"
						className="w-full p-2 bg-blue-500 text-white rounded mt-4 hover:bg-blue-700"
					>
						Log in
					</button>
				</form>
				<div className="flex justify-between items-center mt-5">
					<span className="text-white">Don't have an account?</span>
					<Link to="/Signup">
						<button className="border border-blue-500 text-blue-500 py-2 px-4 rounded hover:bg-blue-500 hover:text-white">
							Sign Up
						</button>
					</Link>
				</div>
			</div>
		</div>
	);
};

export default Login;
