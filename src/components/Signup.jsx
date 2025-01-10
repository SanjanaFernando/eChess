import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { registerPlayer } from "../state/player-api";
import { registerUser } from "../state/user-api";

const Signup = () => {
  const navigate = useNavigate();

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSignUp = async (event) => {
    event.preventDefault();
    try {
      const response = await registerUser({
        firstName,
        lastName,
        email,
        password,
      });

      if (response) {
        navigate("/login");
      }

      console.log("Registration Successful");
    } catch (error) {
      console.error("Registration failed", error);
    }
  };

  return (
    <div className="flex flex-col font-light items-center justify-center min-h-screen bg-[#F1F0EE]">
      {/* Logo Section */}
      <div className="mb-8">
        <img src="/LogoB.png" alt="Logo" className="h-14 w-auto" />
      </div>

      <div className="flex flex-col backdrop-blur-lg md:flex-row items-center justify-evenly w-full bg-[#F1F0EE]">
        {/* Signup Form */}
        <div className="bg-white  p-6  w-full max-w-md mb-5 border border-white border-opacity-30 mx-4 md:w-2/5 rounded-lg ">
          <h2 className="mb-8 mt-5 font-semibold text-4xl text-black">
            Sign up
          </h2>
          <form onSubmit={handleSignUp}>
            <div className="mb-4">
              <label htmlFor="firstName" className="block font-light mb-2">
                First name
              </label>
              <input
                type="text"
                id="firstName"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                placeholder="First name"
                required
                className="w-full mt-1 p-3 rounded bg-gray-100"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="lastName" className="block font-light mb-2">
                Last name
              </label>
              <input
                type="text"
                id="lastName"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                placeholder="Last name"
                required
                className="w-full mt-1 p-3 rounded bg-gray-100"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="email" className="block font-light mb-2">
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
            <div className="mb-4">
              <label htmlFor="password" className="block font-light mb-2">
                Password
              </label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                required
                className="w-full mt-1 p-3 rounded bg-gray-100"
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="confirmPassword"
                className="block font-light mb-2"
              >
                Confirm password
              </label>
              <input
                type="password"
                id="confirmPassword"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Confirm password"
                required
                className="w-full mt-1 p-3 rounded bg-gray-100"
              />
            </div>
            <button
              type="submit"
              className="w-full p-2 font-medium bg-blue text-white rounded hover:bg-sky-500"
            >
              Sign up
            </button>
          </form>
          <div className="border border-t-0 border-gray-300 mt-5"></div>
          <div className="flex justify-between items-center mt-4">
            <span>Already have an account?</span>
            <Link to="/login">
              <button className="border border-gray-700 font-light text-blue-600 py-2 px-6 rounded  hover:bg-blue hover:text-white hover:border-none">
                Login
              </button>
            </Link>
          </div>
        </div>

        {/* Quote Section */}
        <div className="hidden md:flex flex-col items-center justify-center text-center w-full md:w-2/5 bg-transparent rounded-lg  min-h-screen">
          <div
            className="rounded-full mb-4 h-32 w-32 bg-cover bg-center"
            style={{ backgroundImage: "url('/magnus.jpeg')" }}
          ></div>
          <p className="italic text-2xl text-black mb-2">
            If you want to get to the top, there's always <br /> the risk that
            it will isolate you from other <br /> people.
          </p>
          <p className="font-bold text-black">@Magnus Carlsen</p>
        </div>
      </div>
    </div>
  );
};

export default Signup;
