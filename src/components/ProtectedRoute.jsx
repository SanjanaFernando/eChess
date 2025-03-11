import React from "react";
import { Navigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";

const ProtectedRoute = ({ element, roles }) => {
	const { user, loading } = useAuth();
	// console.log("User from the protected route: ", user);

	if (loading) {
		return <div>Loading...</div>;
	}

	if (!user) {
		return <Navigate to="/login" />;
	}

	if (roles && !roles.includes(user.role)) {
		return <Navigate to="/" />;
	}

	return element;
};

export default ProtectedRoute;
