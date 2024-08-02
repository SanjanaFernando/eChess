import React from 'react';
import { Link } from 'react-router-dom';

const Signup = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-200 bg-cover bg-center p-4 md:flex-row md:justify-between md:p-10" style={{ backgroundImage: "url('/signinbg.png')" }}>
      <div className="text-2xl font-bold mb-5 md:text-3xl md:mb-0">Logo</div>
      <div className="bg-white bg-opacity-15 backdrop-filter backdrop-blur-lg p-6 rounded-lg shadow-lg w-full max-w-md mb-5 border border-white border-opacity-30 mx-4 md:w-2/5 md:mb-0 md:mr-8">
        <h2 className="text-2xl mb-5">Sign up</h2>
        <form>
          <div className="mb-4">
            <label htmlFor="firstName" className="block font-bold mb-2">First name</label>
            <input type="text" id="firstName" placeholder="First name" required className="w-full p-2 border border-gray-300 rounded" />
          </div>
          <div className="mb-4">
            <label htmlFor="lastName" className="block font-bold mb-2">Last name</label>
            <input type="text" id="lastName" placeholder="Last name" required className="w-full p-2 border border-gray-300 rounded" />
          </div>
          <div className="mb-4">
            <label htmlFor="email" className="block font-bold mb-2">Email</label>
            <input type="email" id="email" placeholder="Email address" required className="w-full p-2 border border-gray-300 rounded" />
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="block font-bold mb-2">Password</label>
            <input type="password" id="password" placeholder="Password" required className="w-full p-2 border border-gray-300 rounded" />
          </div>
          <div className="mb-4">
            <label htmlFor="confirmPassword" className="block font-bold mb-2">Confirm password</label>
            <input type="password" id="confirmPassword" placeholder="Confirm password" required className="w-full p-2 border border-gray-300 rounded" />
          </div>
          <button type="submit" className="w-full p-2 bg-blue-500 text-white rounded hover:bg-blue-700">Sign up</button>
        </form>
        <div className="flex justify-between items-center mt-4">
          <span>Already have an account?</span>
          <Link to = "/Login">
          <button className="bg-transparent border border-blue-500 text-blue-500 py-1 px-3 rounded hover:bg-blue-500 hover:text-white">Login</button>
          </Link>
        </div>
      </div>
      <div className="hidden md:flex flex-col items-center text-center w-2/5 bg-white bg-opacity-15 backdrop-filter backdrop-blur-lg p-6 rounded-lg shadow-lg border border-white border-opacity-30 mx-4">
        <div className="rounded-full mb-4 h-32 w-32 bg-cover bg-center" style={{ backgroundImage: "url('/magnus.jpeg')" }}></div>
        <p className="italic text-lg text-white mb-2">If you want to get to the top, there's always the risk that it will isolate you from other people.</p>
        <p className="font-bold text-white">@Magnus Carlsen</p>
      </div>
    </div>
  );
};

export default Signup;
