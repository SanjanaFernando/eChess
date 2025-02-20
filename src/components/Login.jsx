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
				if (userRole === "ORGANIZER") {
					navigate("/organizer-dashboard");
				} else if (userRole === "PLAYER") {
					navigate("/player-dashboard");
				}
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
				<img src="/LogoB.png" alt="Logo" className="h-16 w-auto" />
			</div>

			<div className="bg-white backdrop-blur-lg p-8 rounded-lg shadow-lg sm:w-4/5 md:w-2/6 border border-white/30 ">
				<h2 className="mb-10 mt-5 font-semibold text-4xl text-black">
					Log in
				</h2>
				<form onSubmit={handleLogin}>
					<div className="font-light">
						<label
							htmlFor="email"
							className="block mb-1 text-black"
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
							className="w-full mt-1 p-3 rounded bg-gray-100"
						/>
					</div>
					<div className="font-light mb-6">
						<div className="flex justify-between mt-6">
							<label
								htmlFor="password"
								className="block mb-1 text-black"
							>
								Password{" "}
							</label>
							<div className="mt-4">
								<Link
									to="/forgot-password"
									className="text-blue hover:text-sky-700"
								>
									Forgot Password?
								</Link>
							</div>
						</div>
						<input
							type="password"
							id="password"
							value={password}
							onChange={(e) => setPassword(e.target.value)}
							placeholder="Password"
							required
							className="w-full mt-1 p-3  rounded bg-gray-100"
						/>
					</div>
					<button
						type="submit"
						className="w-full p-2 bg-blue text-white rounded mt-4  hover:bg-sky-500"
					>
						Log in
					</button>
				</form>
				<div className="border border-t-0 border-gray-300 mt-5"></div>
				<div className="flex justify-between items-center mt-3 font-light">
					<span className="text-black">Don't have an account?</span>
					<Link to="/Signup">
						<button className="border border-gray-700 font-light text-blue-600 py-2 px-6 rounded hover:bg-blue-500  hover:bg-blue hover:text-white hover:border-none">
							Sign Up
						</button>
					</Link>
				</div>
			</div>
		</div>
	);
};

export default Login;
