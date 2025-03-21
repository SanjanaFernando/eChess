import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="text-center text-white">
      <div
        className="bg-cover bg-center bg-no-repeat min-h-screen text-left flex flex-col justify-center px-20"
        style={{ backgroundImage: "url('chessboard1.jpg')" }}
      >
        <div className="bg-white/20 backdrop-blur-lg rounded-2xl shadow-lg shadow-gray-500/50 p-10 text-center">
          <p className="font-bold text-7xl">Join the Chess Community Today</p>
          <p className="my-8 text-xl">
            Experience the thrill of online chess tournaments and connect with
            fellow players.
          </p>
          <div className="flex my-8 justify-center">
            <Link to="/signup">
              <button className="bg-blue text-white border-none py-3 px-10 cursor-pointer rounded text-lg transition duration-300 ease-in-out hover:bg-sky-500 hover:text-white">
                Sign Up
              </button>
            </Link>
            <Link to="/Login">
              <button className="bg-transparent text-white border-solid border-2 py-3 px-10 mx-5 cursor-pointer rounded text-lg transition duration-300 ease-in-out hover:bg-sky-500 hover:text-white">
                Login
              </button>
            </Link>
          </div>
        </div>
      </div>
      <div className="mt-24 mb-10">
        <div className="flex items-center justify-center w-full md:w-auto mb-5 md:mb-0 mt-10">
          <img src="/DarkLogo.png" alt="Logo" className="h-14 w-auto" />
        </div>
        <div className="flex justify-center flex-wrap mt-5">
          <a href="https://www.facebook.com/">
            <img src="/facebook.png" alt="Logo" className="h-10 w-auto mr-4" />
          </a>
          <a href="https://www.x.com/">
            <img src="/twitter.png" alt="Logo" className="h-10 w-auto mr-4" />
          </a>
          <a href="https://www.instagram.com/">
            <img src="/instagram.png" alt="Logo" className="h-10 w-auto mr-4" />
          </a>
          <a href="https://www.linkedin.com/">
            <img src="/linkedin.png" alt="Logo" className="h-10 w-auto mr-4" />
          </a>
        </div>
        <div className="border-t border-neutral-600 mx-10 mt-16 mb-10"></div>
        <p style={{ fontSize: "1rem", color: "black" }}>
          &copy; 2025 eChess. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
