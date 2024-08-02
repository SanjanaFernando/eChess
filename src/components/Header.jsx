import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <header className="flex flex-col md:flex-row justify-between items-center p-5 bg-black text-white">
      <div className="logo">Logo</div>
      <nav className="flex flex-col md:flex-row items-center w-full md:w-auto">
        <a href="#" className="mx-4 text-white no-underline text-base w-full md:w-auto text-center">Play</a>
        <a href="#" className="mx-4 text-white no-underline text-base w-full md:w-auto text-center">Organize</a>
        <a href="#" className="mx-4 text-white no-underline text-base w-full md:w-auto text-center">Tournaments</a>
      </nav>
      <div className="flex flex-col md:flex-row items-center w-full md:w-auto mt-5 md:mt-0">
        <Link to="/signup">
          <button className="bg-blue-500 text-white border-none py-2 px-4 cursor-pointer rounded text-lg w-full md:w-auto my-2 md:my-0">
            Sign Up
          </button>
        </Link>
      </div>
    </header>
  );
};

export default Header;
