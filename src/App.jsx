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
import TournamentDashboardOn from "./components/player/Tournament_player_dashboard_ongoing";
import TournamentDashboardUp from "./components/player/Tournament_player_dashboard_upcommng";
import TournamentFinished from "./components/TournamentFinish";
import ProtectedRoute from "./components/ProtectedRoute";

const App = () => {
	return (
		<Router>
			<div>
				<main>
					<Routes>
						<Route path="/" element={<Hero />} />
						<Route
							path="/forgot-password"
							element={<ForgotPassword />}
						/>
						<Route
							path="reset-password/:token"
							element={<ResetPassword />}
						/>
						<Route path="/login" element={<Login />} />
						<Route path="/signup" element={<Signup />} />
						<Route path="/payment" element={<Payment />} />
						<Route
							path="/chessgame"
							element={
								<ProtectedRoute
									element={<ChessGame />}
									roles={["PLAYER"]}
								/>
							}
						/>
						<Route
							path="/player-dashboard"
							element={
								<ProtectedRoute
									element={<PlayerDashboard />}
									roles={["PLAYER"]}
								/>
							}
						/>
						<Route
							path="/signup-organizer"
							element={
								<ProtectedRoute
									element={<SignupOrganizer />}
									roles={["ORGANIZER"]}
								/>
							}
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
							element={
								<ProtectedRoute
									element={<TournamentRegistration />}
									roles={["PLAYER"]}
								/>
							}
						/>
						<Route
							path="/organizer-dashboard"
							element={
								<ProtectedRoute
									element={<Organizerdashboardnew />}
									roles={["ORGANIZER"]}
								/>
							}
						/>
						<Route
							path="/create-tournament"
							element={
								<ProtectedRoute
									element={<CreateTournament />}
									roles={["ORGANIZER"]}
								/>
							}
						/>
						<Route
							path="/update-tournament"
							element={
								<ProtectedRoute
									element={<UpdateTournament />}
									roles={["ORGANIZER"]}
								/>
							}
						/>
						<Route path="/pp" element={<PlayerProfile />} />
						<Route
							path="/opay"
							element={
								<ProtectedRoute
									element={<OrganizerPaymentPage />}
									roles={["ORGANIZER"]}
								/>
							}
						/>
						<Route
							path="/ppay"
							element={
								<ProtectedRoute
									element={<PlayerExpensePage />}
									roles={["PLAYER"]}
								/>
							}
						/>
						<Route
							path="/tpdu"
							element={<TournamentDashboardUp />}
						/>
						<Route
							path="/tpdo"
							element={<TournamentDashboardOn />}
						/>
						<Route path="/tf" element={<TournamentFinished />} />
					</Routes>
				</main>
			</div>
		</Router>
	);
};

export default App;
