import React, { useState } from "react";
import { resetPassword } from "../state/user-api";
import { useParams } from "react-router-dom";

const ResetPassword = () => {
	const { token } = useParams();
	const [password, setPassword] = useState("");
	const [message, setMessage] = useState("");
	const [error, setError] = useState("");

	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			await resetPassword(token, password);
			setMessage("Password has been reset successfully.");
			setError("");
		} catch (err) {
			setError("Error resetting password. Please try again.");
			setMessage("");
		}
	};

	return (
		<div className="min-h-screen flex items-center justify-center bg-gray-100">
			<div className="bg-white p-6 rounded-md shadow-md w-full max-w-md">
				<h2 className="text-2xl font-semibold text-gray-800 mb-4">
					Reset Password
				</h2>
				<form onSubmit={handleSubmit}>
					<div className="mb-4">
						<label className="block text-gray-700">
							New Password
						</label>
						<input
							type="password"
							value={password}
							onChange={(e) => setPassword(e.target.value)}
							className="w-full px-3 py-2 border rounded-md"
							required
						/>
					</div>
					<button
						type="submit"
						className="w-full bg-blue text-white py-2 rounded-md hover:bg-sky-700"
					>
						Reset Password
					</button>
				</form>
				{message && <p className="text-green-500 mt-4">{message}</p>}
				{error && <p className="text-red-500 mt-4">{error}</p>}
			</div>
		</div>
	);
};

export default ResetPassword;
