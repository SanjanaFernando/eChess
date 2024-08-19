import React from 'react';
import { Link } from 'react-router-dom';

const SignupOrganizer = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-[#F1F0EE]">
      <div className="mb-8">
        <img src="/LogoB.png" alt="Logo" className="h-18 w-auto" />
      </div>



      {/* Main Content */}
      <div className="flex flex-col md:flex-row items-center justify-center w-full">
         <div className="bg-white  backdrop-filter backdrop-blur-lg p-6 rounded-lg shadow-lg w-full max-w-md mb-5 border border-white border-opacity-30 mx-4 md:w-2/5 ">
          <h2 className="text-2xl font-bold mb-5">Sign up</h2>
          <form>
            <div className="mb-4">
              <label htmlFor="clubName" className="block font-semibold mb-2">Club name</label>
              <input type="text" id="clubName" placeholder="Club name" required className="w-full p-2 border border-gray-300 rounded" />
            </div>
            <div className="mb-4">
              <label htmlFor="email" className="block font-bold mb-2">Email</label>
              <input type="email" id="email" placeholder="Email address" required className="w-full p-2 border border-gray-300 rounded" />
            </div>
            <div className="mb-4">
              <label htmlFor="password" className="block font-bold mb-2">Password</label>
              <input type="password" id="password" placeholder="Password" required className="w-full p-2 border border-gray-300 rounded" />
            </div>
            <div className="mb-8">
              <label htmlFor="confirmPassword" className="block font-bold mb-2">Confirm password</label>
              <input type="password" id="confirmPassword" placeholder="Confirm password" required className="w-full p-2 border border-gray-300 rounded" />
            </div>
            <button type="submit" className="w-full p-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700">Sign up</button>
          </form>

          <div className="flex justify-between items-center mt-6">
            <span className="text-sm">Already have an account?</span>
            <Link to="/login">
              <button className="bg-transparent border border-blue-600 text-blue-600 py-2 px-4 rounded-lg font-semibold hover:bg-blue-600 hover:text-white">Login</button>
            </Link>
          </div>
        </div>

        {/* Quote Section */}
        <div className="hidden md:flex flex-col items-center text-center w-full md:w-1/5 bg-white bg-opacity-15 backdrop-filter backdrop-blur-lg p-6 rounded-lg shadow-lg border border-white border-opacity-30 mx-4">
          <div className="rounded-full mb-4 h-32 w-32 bg-cover bg-center" style={{ backgroundImage: "url('/Hikaru.png')" }}></div>
          <p className="italic text-lg text-black mb-2">Chess is a game where all different sorts of people can come together, not a game in which people are divided because of their religion or country of origin.</p>
          <p className="font-bold text-white">@Hikaru Nakamura</p>
        </div>
      </div>
    </div>
  );
};

export default SignupOrganizer;
