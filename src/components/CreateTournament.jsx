import React, { useState } from "react";
import { createTournament } from "../state/tournament-api.js";
import { useLocation, useNavigate } from "react-router-dom";
import { getOrganizerByUser } from "../state/organizer-api.js";
import { tokenDecode } from "../utils/token.js";
import DatePicker from "react-datepicker";
import { format } from "date-fns";
import "react-datepicker/dist/react-datepicker.css";

const CreateTournament = () => {
	const locationPath = useLocation();
	const isTournamentCreateTab =
		locationPath.pathname === "/create-tournament";
	const [isDropdownOpen, setIsDropdownOpen] = useState(false);
	const [sections, setSections] = useState([
		{ ageGroup: "", yearRange: "", fee: "" },
	]);

	const [tournamentName, setTournamentName] = useState("");
	const [tournamentDescription, setTournamentDescription] = useState("");
	const [startDate, setStartDate] = useState("");
	const [endDate, setEndDate] = useState("");
	const [gameType, setGameType] = useState("");
	const [rounds, setRounds] = useState();
	const [contactNumber, setContact] = useState("");
	const [location, setLocation] = useState("");
	const navigate = useNavigate();

	// Toggle the dropdown menu
	const toggleDropdown = () => {
		setIsDropdownOpen(!isDropdownOpen);
	};

	// Close the dropdown when clicking outside
	const closeDropdown = () => {
		setIsDropdownOpen(false);
	};

	// Add a new row for age group, year range, and fee
	const addSection = () => {
		setSections([...sections, { ageGroup: "", yearRange: "", fee: "" }]);
	};

	// Handle start date change
	const handleStartDateChange = (date) => {
		const formattedDate = format(date, "dd/MM/yyyy");
		setStartDate(formattedDate);
	};

	// Handle end date change
	const handleEndDateChange = (date) => {
		const formattedDate = format(date, "dd/MM/yyyy");
		setEndDate(formattedDate);
	};

	const onSubmit = async (event) => {
		event.preventDefault();
		console.log("Creating tournament. . .");

		try {
			const token = localStorage.getItem("token");
			const decodedToken = tokenDecode(token);
			console.log(decodedToken.id);
			const userId = decodedToken.id;
			const organizer = await getOrganizerByUser(userId);
			console.log("Organizer: ", organizer);
			const organizerId = organizer._id;
			console.log("OrganizerId: ", organizerId);

			const ageDetails = sections
				.filter(
					(section) =>
						section.ageGroup && section.yearRange && section.fee
				)
				.map((section) => ({
					ageGroup: section.ageGroup,
					ageDescription: section.yearRange,
					registrationFee: section.fee,
				}));

			const res = await createTournament({
				organizerId,
				name: tournamentName,
				description: tournamentDescription,
				gameType,
				rounds,
				location,
				startDate,
				endDate,
				contactNumber,
				ageDetails,
			});

			console.log(res.data);
			if (res) navigate("/organizer-dashboard");
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<div className="bg-gray-100 min-h-screen p-6" onClick={closeDropdown}>
			{/* Navbar */}
			<nav className="bg-gray-200 p-4 flex justify-between items-center mb-8 rounded-md shadow">
				<h1 className="text-xl font-semibold text-gray-800 flex items-center">
					<div className="flex items-center">
						<img
							src="/LogoB.png"
							alt="eChess Logo"
							className="h-10 mr-4"
						/>
					</div>
				</h1>
				<div className="flex space-x-8">
					<a
						href="/create-tournament"
						className={`text-gray-800 font-medium ${
							isTournamentCreateTab ? "font-extrabold" : ""
						}`}
					>
						Create
					</a>
					<a
						href="/organizer-dashboard"
						className="text-gray-800 font-medium"
					>
						Tournaments
					</a>
					<a href="/opay" className="text-gray-800 font-medium">
						Payments
					</a>
				</div>
				<div className="relative">
					<div
						className="mt-4 sm:mt-0 flex items-center cursor-pointer"
						onClick={(e) => {
							e.stopPropagation();
							toggleDropdown();
						}}
					>
						<img
							src="/User.png"
							alt="User Icon"
							className="h-10 mr-4"
						/>
					</div>
					{isDropdownOpen && (
						<div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-10">
							<ul className="py-1">
								<li>
									<a
										href="/profile"
										className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
									>
										Profile
									</a>
								</li>
								<li>
									<button
										onClick={() =>
											console.log("Logout clicked")
										}
										className="w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100"
									>
										Logout
									</button>
								</li>
							</ul>
						</div>
					)}
				</div>
			</nav>

			{/* Form Section */}
			<div className="flex items-center justify-center">
				<div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-2xl">
					<h1 className="text-2xl font-bold mb-6 text-center">
						Create a new Tournament
					</h1>

					<form className="space-y-6" onSubmit={onSubmit}>
						<div>
							<label
								className="block text-gray-700 font-semibold mb-2"
								htmlFor="tournamentName"
							>
								Tournament Name
							</label>
							<input
								type="text"
								id="tournamentName"
								placeholder="Tournament Name"
								className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-200"
								required
								onChange={(event) => {
									setTournamentName(event.target.value);
								}}
							/>
						</div>

						<div>
							<label
								className="block text-gray-700 font-semibold mb-2"
								htmlFor="tournamentDescription"
							>
								Tournament Description
							</label>
							<textarea
								id="tournamentDescription"
								placeholder="Description"
								className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-200"
								rows="3"
								required
								onChange={(event) => {
									setTournamentDescription(
										event.target.value
									);
								}}
							/>
						</div>

						<div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
							<div>
								<label
									className="block text-gray-700 font-semibold mb-2"
									htmlFor="startDate"
								>
									Start Date
								</label>
								<DatePicker
									selected={
										startDate
											? new Date(
													startDate
														.split("/")
														.reverse()
														.join("-")
											  )
											: null
									}
									onChange={handleStartDateChange}
									dateFormat="dd/MM/yyyy"
									placeholderText="DD/MM/YYYY"
									className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue"
									required
								/>
								{/* <input
									type="text"
									id="startDate"
									placeholder="DD/ MM / YY"
									className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-200"
									required
									onChange={(event) => {
										setStartDate(event.target.value);
									}}
								/> */}
							</div>
							<div>
								<label
									className="block text-gray-700 font-semibold mb-2"
									htmlFor="endDate"
								>
									End Date
								</label>
								<DatePicker
									selected={
										endDate
											? new Date(
													endDate
														.split("/")
														.reverse()
														.join("-")
											  )
											: null
									}
									onChange={handleEndDateChange}
									dateFormat="dd/MM/yyyy"
									placeholderText="DD/MM/YYYY"
									className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue"
									required
								/>
								{/* <input
									type="text"
									id="endDate"
									placeholder="DD/ MM / YY"
									className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-200"
									required
									onChange={(event) => {
										setEndDate(event.target.value);
									}}
								/> */}
							</div>
						</div>

						{sections.map((section, index) => (
							<div
								key={index}
								className="grid grid-cols-3 gap-4 items-start mb-4"
							>
								<div>
									<label
										className="block text-gray-700 font-semibold mb-2"
										htmlFor={`ageGroup${index}`}
									>
										Age Group
									</label>
									<input
										type="text"
										id={`ageGroup${index}`}
										placeholder="Under 8"
										className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-200"
										value={section.ageGroup}
										onChange={(e) => {
											const updatedSections = [
												...sections,
											];
											updatedSections[index].ageGroup =
												e.target.value;
											setSections(updatedSections);
										}}
									/>
								</div>
								<div>
									<label
										className="block text-gray-700 font-semibold mb-2"
										htmlFor={`yearRange${index}`}
									>
										Year Range
									</label>
									<input
										type="text"
										id={`yearRange${index}`}
										placeholder="Before 2016 January"
										className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-200"
										value={section.yearRange}
										onChange={(e) => {
											const updatedSections = [
												...sections,
											];
											updatedSections[index].yearRange =
												e.target.value;
											setSections(updatedSections);
										}}
									/>
								</div>
								<div className="flex flex-col">
									<label
										className="block text-gray-700 font-semibold mb-2"
										htmlFor={`fee${index}`}
									>
										Fee
									</label>
									<input
										type="text"
										id={`fee${index}`}
										placeholder="00"
										className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-200"
										value={section.fee}
										onChange={(e) => {
											const updatedSections = [
												...sections,
											];
											updatedSections[index].fee =
												e.target.value;
											setSections(updatedSections);
										}}
									/>
								</div>
								{/* Add Button */}
								{index === sections.length - 1 && (
									<button
										type="button"
										onClick={addSection}
										className="p-2 bg-transparent text-black border border-5 border-black rounded-full hover:bg-blue hover:border-white hover:text-white transition"
									>
										+
									</button>
								)}
							</div>
						))}

						<div className="grid grid-cols-2 gap-4">
							<div>
								<label
									className="block text-gray-700 font-semibold mb-2"
									htmlFor="gameType"
								>
									Game Type
								</label>
								<select
									id="gameType"
									className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-200"
									onChange={(event) => {
										console.log(event.target.value);
										setGameType(event.target.value);
									}}
								>
									<option>Variant</option>
									<option value="standard">Standard</option>
									<option value="blitz">Blitz</option>
								</select>
							</div>
							<div>
								<label
									className="block text-gray-700 font-semibold mb-2"
									htmlFor="rounds"
								>
									Rounds
								</label>
								<input
									type="text"
									id="rounds"
									placeholder="00"
									className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-200"
									onChange={(event) => {
										setRounds(event.target.value);
									}}
								/>
							</div>
						</div>

						<div>
							<label
								className="block text-gray-700 font-semibold mb-2"
								htmlFor="contactNo"
							>
								Contact No.
							</label>
							<input
								type="text"
								id="contactNo"
								placeholder="Contact No."
								className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-200"
								required
								onChange={(event) => {
									setContact(event.target.value);
								}}
							/>
						</div>

						<div>
							<label
								className="block text-gray-700 font-semibold mb-2"
								htmlFor="location"
							>
								Location
							</label>
							<input
								type="text"
								id="location"
								placeholder="Location"
								className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-200"
								required
								onChange={(event) => {
									setLocation(event.target.value);
								}}
							/>
						</div>

						<p className="text-sm text-gray-500 mt-4">
							By submitting this form, you confirm that the
							tournament details provided are accurate and comply
							with the Terms and Conditions of ECHESS.com. As the
							organizer, you agree to adhere to ECHESS.com's
							guidelines for tournament management, ensuring a
							fair and secure experience for all participants.
						</p>

						<button
							type="submit"
							className="w-full bg-blue text-white p-4 rounded-lg font-bold hover:bg-sky-700 transition duration-300 mt-4"
						>
							Create
						</button>
					</form>
				</div>
			</div>
		</div>
	);
};

export default CreateTournament;
