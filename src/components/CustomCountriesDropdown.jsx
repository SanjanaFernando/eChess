import React from "react";

const CustomCountriesDropdown = ({ countries, value, id, onChange }) => {
	return (
		<div className="relative">
			<select
				id={id}
				value={value}
				onChange={onChange}
				className="w-full p-3 border border-gray-300 rounded appearance-none"
			>
				<option value="" disabled>
					Select Your Country
				</option>
				{countries.map((country) => (
					<option key={country.iso3} value={country.name}>
						{country.name}
					</option>
				))}
			</select>
			<div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
				<svg
					className="w-4 h-4 fill-current text-gray-500"
					viewBox="0 0 20 20"
				>
					<path d="M7 10l5 5 5-5H7z" />
				</svg>
			</div>
			<div className="absolute inset-y-0 left-0 flex items-center px-2 pointer-events-none">
				{countries.map((country) => (
					<img
						key={country.iso3}
						src={country.flags}
						alt={country.name}
						className="w-6 h-4 mr-2"
					/>
				))}
			</div>
		</div>
	);
};

export default CustomCountriesDropdown;
