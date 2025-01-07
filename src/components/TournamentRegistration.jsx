import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getTournament, playerResitration } from "../state/tournament-api";
import { tokenDecode } from "../utils/token";

const TournamentRegistration = () => {
  const { id: tournamentId } = useParams();
  const navigate = useNavigate();

  const token = localStorage.getItem("token");
  const decodedToken = tokenDecode(token);
  const userId = decodedToken.id;

  const [tournament, setTournament] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  const [formData, setFormData] = useState({
    nameWithInitials: "",
    birthday: "",
    fideId: "",
    sex: "",
    fideRating: "",
    ageGroup: "",
    address: "",
    country: "",
    paymentAmount: "",
    paymentMethod: "",
    paymentStatus: "PENDING",
  });

  useEffect(() => {
    const fetchTournament = async () => {
      try {
        const data = await getTournament(tournamentId);
        // console.log("Tournament data: ", data);
        setTournament(data);
        // console.log("Tournament data: ", tournament);
      } catch (err) {
        setError("Failed to load tournament data.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchTournament();
  }, [tournamentId]);

  const handleAgeGroupChange = (event) => {
    const selectedAgeGroup = event.target.value;
    const ageDetail = tournament?.ageDetails.find(
      (detail) => detail.ageGroup === selectedAgeGroup
    );

    setFormData({
      ...formData,
      ageGroup: selectedAgeGroup,
      paymentAmount: ageDetail?.registrationFee || "",
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    console.log(formData);

    const payload = {
      userId,
      ...formData,
    };

    try {
      await playerResitration(tournamentId, payload);
      console.log("Player registration Successful");
      window.alert("Player Registration Successful!");

      if (formData.paymentMethod === "MANUAL") {
        navigate("/player-dashboard");
      } else {
        try {
          const response = await fetch("/create-checkout-session", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              items: [
                { id: 1, quantity: 3 },
                { id: 2, quantity: 1 },
              ],
            }),
          });

          if (!response.ok) {
            const errorData = await response.json();
            throw new Error(
              errorData.error || "Failed to create checkout session"
            );
          }

          const { url } = await response.json();
          window.location = url;
        } catch (fetchError) {
          console.log("Error creating checkout session:", fetchError.message);
          window.alert("Failed to initiate payment. Please try again.");
        }
      }
    } catch (err) {
      console.log("Error registering for tournament: ", err.message);
      window.alert("Registration failed. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <p className="text-center text-gray-500">Loading tournament data...</p>
    );
  }

  if (error) {
    return <p className="text-center text-red-500">{error}</p>;
  }

  return (
    <div className="min-h-screen bg-gray-100 p-4 sm:p-8">
      {/* Header Section */}
      <header className="bg-gray-200 p-4 flex flex-col sm:flex-row justify-between items-center">
        <div className="flex items-center">
          <img src="/LogoB.png" alt="eChess Logo" className="h-10 mr-4" />
        </div>
        <nav className="mt-4 sm:mt-0">
          <ul className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-16">
            <li>
              <a href="#" className="text-black hover:underline">
                Tournaments
              </a>
            </li>
            <li>
              <a href="#" className="text-black hover:underline">
                Payments
              </a>
            </li>
          </ul>
        </nav>
        <div className="mt-4 sm:mt-0 flex items-center">
          <img src="/User.png" alt="User Icon" className="h-10" />
        </div>
      </header>

      {/* Tournament Details */}
      <section className="bg-red-100 p-6 rounded-lg shadow-lg mt-6">
        <h2 className="text-xl sm:text-2xl font-bold mb-4 flex justify-center items-center text-center">
          <img src="/trophy.png" alt="Trophy" className="h-10 mr-3" />
          {tournament.name}
        </h2>
        <ul className="text-sm sm:text-lg space-y-2">
          <li className="flex flex-wrap">
            <strong className="w-1/3">Start Date</strong>
            <span className="w-auto">:</span>
            <span className="w-full ml-5 sm:w-1/2">{tournament.startDate}</span>
          </li>
          <li className="flex flex-wrap">
            <strong className="w-1/3">Close Date</strong>
            <span className="w-auto">:</span>
            <span className="w-full ml-5 sm:w-1/2">{tournament.endDate}</span>
          </li>
          <li className="flex flex-wrap">
            <strong className="w-1/3">Venue</strong>
            <span className="w-auto">:</span>
            <span className="w-full ml-5 sm:w-1/2">{tournament.location}</span>
          </li>
          <li className="flex flex-wrap">
            <strong className="w-1/3">Contact</strong>
            <span className="w-auto">:</span>
            <span className="w-full ml-5 sm:w-1/2">
              {tournament.contactNumber}
            </span>
          </li>
        </ul>
      </section>

      {/* Registration Form */}
      <section className="mt-8 bg-white p-6 sm:p-8 rounded-lg shadow-lg max-w-2xl mx-auto">
        <h2 className="text-2xl font-bold mb-6 text-center">
          Tournament Registration
        </h2>
        <form onSubmit={handleSubmit}>
          {/* NAME ENTRY */}
          <div className="mb-6">
            <label
              htmlFor="name"
              className="block text-gray-700 font-semibold mb-2"
            >
              Name with initials
            </label>
            <input
              type="text"
              id="name"
              placeholder="Name"
              name="nameWithInitials"
              value={formData.nameWithInitials}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded"
              required
            />
          </div>

          {/* BIRTHDAY ENTRY */}
          <div className="mb-6">
            <label
              htmlFor="birthday"
              className="block text-gray-700 font-semibold mb-2"
            >
              Date of Birth
            </label>
            <input
              type="text"
              id="birthday"
              placeholder="Date of Birth (DD/MM/YYYY)"
              name="birthday"
              value={formData.birthday}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded"
              required
            />
          </div>

          {/* FIDE ID ENTRY */}
          <div className="mb-6">
            <label
              htmlFor="fideID"
              className="block text-gray-700 font-semibold mb-2"
            >
              FIDE ID
            </label>
            <input
              type="text"
              id="fideID"
              placeholder="FIDE ID"
              name="fideId"
              value={formData.fideId}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded"
              required
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
            {/* GENDER ENTRY */}
            <div>
              <label
                htmlFor="sex"
                className="block text-gray-700 font-semibold mb-2"
              >
                Sex
              </label>
              <select
                id="sex"
                name="sex"
                value={formData.sex}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded"
                required
              >
                <option value="" disabled selected>
                  Select Gender
                </option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
              </select>
            </div>

            {/* FIDE RATING ENTRY */}
            <div>
              <label
                htmlFor="fideRating"
                className="block text-gray-700 font-semibold mb-2"
              >
                FIDE Rating
              </label>
              <input
                type="number"
                id="fideRating"
                name="fideRating"
                value={formData.fideRating}
                placeholder="1500"
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded"
                required
              />
            </div>
          </div>

          {/* AGE GROUP ENTRY */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
            <div>
              <label
                htmlFor="ageGroup"
                className="block text-gray-700 font-semibold mb-2"
              >
                Age Group
              </label>
              <select
                id="ageGroup"
                name="ageGroup"
                value={formData.ageGroup}
                className="w-full p-3 border border-gray-300 rounded"
                onChange={handleAgeGroupChange}
                required
              >
                <option value="" disabled selected>
                  Select Age Group
                </option>
                {tournament?.ageDetails.map((detail) => (
                  <option key={detail.ageGroup} value={detail.ageGroup}>
                    {detail.ageGroup} ({detail.ageDescription})
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label
                htmlFor="fee"
                className="block text-gray-700 font-semibold mb-2"
              >
                Fee
              </label>
              <input
                type="text"
                id="fee"
                name="paymentAmount"
                value={formData.paymentAmount}
                placeholder="Fee will be displayed here"
                className="w-full p-3 border border-gray-300 rounded"
                onChange={handleChange}
                readOnly
              />
            </div>
          </div>

          <div className="mb-6">
            <label
              htmlFor="address"
              className="block text-gray-700 font-semibold mb-2"
            >
              Address
            </label>
            <input
              type="text"
              id="address"
              name="address"
              value={formData.address}
              placeholder="Address"
              className="w-full p-3 border border-gray-300 rounded"
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-6">
            <label
              htmlFor="country"
              className="block text-gray-700 font-semibold mb-2"
            >
              Country
            </label>
            <input
              type="text"
              id="country"
              name="country"
              value={formData.country}
              placeholder="Sri Lanka"
              className="w-full p-3 border border-gray-300 rounded"
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-6">
            <label
              htmlFor="paymentMethod"
              className="block text-gray-700 font-semibold mb-2"
            >
              Payment Method
            </label>
            <div className="flex flex-row justify-center items-center gap-20">
              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  name="paymentMethod"
                  value="ONLINE"
                  className="h-4 w-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                  onChange={handleChange}
                  required
                />
                <span className="text-gray-700">Online</span>
              </label>
              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  name="paymentMethod"
                  value="MANUAL"
                  className="h-4 w-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                  onChange={handleChange}
                />
                <span className="text-gray-700">Manual</span>
              </label>
            </div>
          </div>

          <p className="text-sm text-gray-500 mb-6 text-center">
            After successful completion of payment, you will receive an SMS from
            "ECHESS" and an email from "payment-report@payu.lk" as proof of
            confirmation, mentioning the Payment ID, without which the entry is
            not confirmed.
          </p>

          <button
            type="submit"
            className="w-full bg-blue text-white p-4 rounded-lg font-bold hover:bg-blue-800 transition duration-300"
            disabled={submitting}
          >
            {submitting ? "Submitting..." : "Next"}
          </button>
        </form>
      </section>
    </div>
  );
};

export default TournamentRegistration;
