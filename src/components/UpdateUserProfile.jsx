import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getUser, updateUser } from "../state/user-api";
import { getPlayerByUser, updatePlayer } from "../state/player-api";
import { getOrganizerByUser, updateOrganizer } from "../state/organizer-api";
import { fetchCountries } from "../utils/countries";

const UpdateUserProfile = () => {
	const navigate = useNavigate();
	const { id: userId } = useParams();

	const [user, setUser] = useState(null);
	const [player, setPlayer] = useState(null);
	const [organizer, setOrganizer] = useState(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);

	const [countries, setCountries] = useState([]);

	useEffect(() => {
		const fetchProfile = async () => {
			try {
				const user = await getUser(userId);
				setUser(user);

				if (user.role === "PLAYER") {
					const player = await getPlayerByUser(userId);
					setPlayer(player);
				} else if (user.role === "ORGANIZER") {
					const organizer = await getOrganizerByUser(userId);
					setOrganizer(organizer);
				}
			} catch (error) {
				console.error(`Error fetching profile: ${error}`);
			} finally {
				setLoading(false);
			}
		};

		fetchProfile();
	}, [userId]);

	useEffect(() => {
		const getCountries = async () => {
			try {
				const countries = await fetchCountries();
				setCountries(countries);
			} catch (error) {
				console.error("Error fetching countries: ", error);
			}
		};

		getCountries();
	}, []);

	const handleInputChange = async (e) => {
		const { name, value } = e.target;
		setUser((prevUser) => ({ ...prevUser, [name]: value }));

		if (player) {
			setPlayer((prevPlayer) => ({ ...prevPlayer, [name]: value }));
		}

		if (organizer) {
			setPlayer((prevOrganizer) => ({ ...prevOrganizer, [name]: value }));
		}
	};

	const handleSubmit = async (e) => {
		e.preventDefault();

		try {
			await updateUser(userId, user);

			if (player) {
				await updatePlayer(userId, player);
			}

			if (organizer) {
				await updateOrganizer(userId, organizer);
			}

			alert("Profile updated successfully!");
			navigate(`/user-profile/${userId}`);
		} catch (error) {
			console.error("Error updating profile: ", error);
			setError(error.message);
		}
	};

	const formatDate = (date) => {
		const d = new Date(date);
		const month = `0${d.getMonth() + 1}`.slice(-2);
		const day = `0${d.getDate()}`.slice(-2);
		const year = d.getFullYear();
		return `${year}-${month}-${day}`;
	};

	if (loading) return <div>Loading Profile Data...</div>;

	if (error) return <div>{error}</div>;

	return (
		<div className="bg-gray-100 min-h-screen p-6">
			<div className="max-w-4xl mx-auto bg-white p-6 rounded-lg shadow-md">
				<h2 className="text-2xl font-semibold text-gray-800 mb-4">
					Update Profile
				</h2>
				<form onSubmit={handleSubmit}>
					<div className="grid grid-cols-2 gap-4">
						<div>
							<label className="block text-gray-700">
								First Name
							</label>
							<input
								type="text"
								name="firstName"
								value={user.firstName}
								onChange={handleInputChange}
								className="w-full p-2 border border-gray-300 rounded mt-1"
							/>
						</div>
						<div>
							<label className="block text-gray-700">
								Last Name
							</label>
							<input
								type="text"
								name="lastName"
								value={user.lastName}
								onChange={handleInputChange}
								className="w-full p-2 border border-gray-300 rounded mt-1"
							/>
						</div>
						<div>
							<label className="block text-gray-700">Email</label>
							<input
								type="email"
								name="email"
								value={user.email}
								onChange={handleInputChange}
								className="w-full p-2 border border-gray-300 rounded mt-1"
							/>
						</div>
						{player && (
							<>
								<div>
									<label className="block text-gray-700">
										FIDE ID
									</label>
									<input
										type="text"
										name="fideId"
										value={player.fideId}
										onChange={handleInputChange}
										className="w-full p-2 border border-gray-300 rounded mt-1"
									/>
								</div>
								<div>
									<label className="block text-gray-700">
										FIDE Rating
									</label>
									<input
										type="number"
										name="fideRating"
										value={player.fideRating}
										onChange={handleInputChange}
										className="w-full p-2 border border-gray-300 rounded mt-1"
									/>
								</div>
								<div>
									<label className="block text-gray-700">
										Sex
									</label>
									<div className="flex items-center mt-1">
										<label className="mr-4">
											<input
												type="radio"
												name="sex"
												value="Male"
												checked={player.sex === "Male"}
												onChange={handleInputChange}
												className="mr-2"
											/>
											Male
										</label>
										<label>
											<input
												type="radio"
												name="sex"
												value="Female"
												checked={
													player.sex === "Female"
												}
												onChange={handleInputChange}
												className="mr-2"
											/>
											Female
										</label>
									</div>
								</div>
								<div>
									<label className="block text-gray-700">
										Birthday
									</label>
									<input
										type="date"
										name="birthday"
										value={formatDate(player.birthday)}
										onChange={handleInputChange}
										className="w-full p-2 border border-gray-300 rounded mt-1"
									/>
								</div>
								<div>
									<label className="block text-gray-700">
										Country
									</label>
									<select
										name="country"
										value={player.country}
										onChange={handleInputChange}
										className="w-full p-2.5 border border-gray-300 rounded mt-1"
									>
										<option value="" disabled>
											Select Your Country
										</option>
										{countries.map((country) => (
											<option
												key={country.iso3}
												value={country.name}
											>
												{country.name}
											</option>
										))}
									</select>
									{/* <input
										type="text"
										name="country"
										value={player.country}
										onChange={handleInputChange}
										className="w-full p-2 border border-gray-300 rounded mt-1"
									/> */}
								</div>
							</>
						)}
						{organizer && (
							<>
								<div>
									<label className="block text-gray-700">
										Club Name
									</label>
									<input
										type="text"
										name="clubName"
										value={organizer.clubName}
										onChange={handleInputChange}
										className="w-full p-2 border border-gray-300 rounded mt-1"
									/>
								</div>
							</>
						)}
					</div>
					<div className="mt-6">
						<button
							type="submit"
							className="bg-blue text-white px-4 py-2 rounded-md hover:bg-black"
						>
							Update Profile
						</button>
					</div>
				</form>
			</div>
		</div>
	);
};

export default UpdateUserProfile;
