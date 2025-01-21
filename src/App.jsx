import React from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import Hero from "./components/Hero";
import Login from "./components/Login";
import Signup from "./components/Signup";
import Payment from "./components/Payment";
import ChessGame from "./components/ChessGame";
import "./App.css";
import SignupOrganizer from "./components/SignupOrganizer";
import PlayerDashboard from "./components/Playerdashboard";
import TournamentRegistration from "./components/TournamentRegistration";
import Organizerdashboardnew from "./components/Organizerdashboard";
import CreateTournament from "./components/CreateTournament";
import UpdateTournament from "./components/UpdateTournament";
import PlayerProfile from "./components/PlayerProfile";
import OrganizerPaymentPage from "./components/OrganizerPayment";
import PlayerExpensePage from "./components/PlayerExpense";
import PaymentSuccess from "./components/PaymentSuccess";
import PaymentCancel from "./components/PaymentCancel";
import ForgotPassword from "./components/ForgotPassword";
import ResetPassword from "./components/ResetPassword";

const App = () => {
	return (
		<Router>
			<div>
				<main>
					<Routes>
						<Route path="/" element={<Hero />} />
						<Route path="/login" element={<Login />} />
						<Route
							path="/forgot-password"
							element={<ForgotPassword />}
						/>
						<Route
							path="reset-password/:token"
							element={<ResetPassword />}
						/>
						<Route path="/signup" element={<Signup />} />
						<Route path="/payment" element={<Payment />} />
						<Route path="/chessgame" element={<ChessGame />} />
						<Route
							path="/player-dashboard"
							element={<PlayerDashboard />}
						/>
						<Route
							path="/signup-organizer"
							element={<SignupOrganizer />}
						/>
						<Route
							path="/payment-success"
							element={<PaymentSuccess />}
						/>
						<Route
							path="/payment-cancel"
							element={<PaymentCancel />}
						/>
						<Route
							path="/tournament-registration/:id"
							element={<TournamentRegistration />}
						/>
						<Route
							path="/organizer-dashboard"
							element={<Organizerdashboardnew />}
						/>
						<Route
							path="/create-tournament"
							element={<CreateTournament />}
						/>
						<Route
							path="/update-tournament"
							element={<UpdateTournament />}
						/>
						<Route
							path="/profile/:id"
							element={<PlayerProfile />}
						/>
						<Route
							path="/organizer-payments/:id"
							element={<OrganizerPaymentPage />}
						/>
						<Route path="/ppay" element={<PlayerExpensePage />} />
					</Routes>
				</main>
			</div>
		</Router>
	);
};

export default App;
