import React, { useState } from "react";
import { sendPasswordResetEmail } from "../state/user-api";

const ForgotPassword = () => {
	const [email, setEmail] = useState("");
	const [message, setMessage] = useState("");
	const [error, setError] = useState("");

	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			await sendPasswordResetEmail(email);
			setMessage("Password reset email sent. Check your inbox.");
			setError("");
		} catch (err) {
			setError("Error sending password reset email. Please try again.");
			setMessage("");
		}
	};
	return (
		<div className="min-h-screen flex items-center justify-center bg-gray-100">
			<div className="bg-white p-6 rounded-md shadow-md w-full max-w-md">
				<h2 className="text-2xl font-semibold text-gray-800 mb-4">
					Forgot Password?
				</h2>
				<p className="text-gray-500 mb-4">
					Further instructions for resetting the password and the link
					will be sent to your email.
				</p>
				<form onSubmit={handleSubmit}>
					<div className="mb-4">
						<label className="block text-gray-700">Email</label>
						<input
							type="email"
							value={email}
							onChange={(e) => setEmail(e.target.value)}
							className="w-full px-3 py-2 border rounded-md"
							required
						/>
					</div>
					<button
						type="submit"
						className="w-full bg-blue text-white py-2 rounded-md hover:bg-sky-700"
					>
						Send Reset Link
					</button>
				</form>
				{message && <p className="text-green-500 mt-4">{message}</p>}
				{error && <p className="text-red-500 mt-4">{error}</p>}
			</div>
		</div>
	);
};

export default ForgotPassword;
