import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <header className="top-0 flex flex-col md:flex-row justify-between items-center p-2 bg-transparent text-white w-full">
<<<<<<< HEAD
<div className="flex items-center mb-5 md:mb-0">
  <nav className="flex flex-col md:flex-row items-center w-full md:w-auto">
    <img
      src="/LogoW.png"
      alt="Logo"
      className="h-10 w-auto mr-4 transition duration-300 ease-in-out transform hover:scale-110"
    />
    <Link
      to="/playerdashboard"
      className="mx-4 text-white no-underline text-base text-center transition duration-300 ease-in-out hover:text-blue-500 hover:scale-105"
    >
      Play
    </Link>
    <a
      href="#"
      className="mx-4 text-white no-underline text-base text-center transition duration-300 ease-in-out hover:text-blue-500 hover:scale-105"
    >
      Organize
    </a>
    <a
      href="#"
      className="mx-4 text-white no-underline text-base text-center transition duration-300 ease-in-out hover:text-blue-500 hover:scale-105"
    >
      Tournaments
    </a>
    <Link
      to="/Payment"
      className="mx-4 text-white no-underline text-base text-center transition duration-300 ease-in-out hover:text-blue-500 hover:scale-105"
    >
      Payments
    </Link>
  </nav>
</div>

<div className="flex flex-col md:flex-row items-center w-full md:w-auto mt-0 md:mt-0 space-x-4">
  <Link to="/signup">
    <button className="bg-transparent text-purple-700 py-2 px-4 border border-purple-500 cursor-pointer rounded text-lg w-full md:w-auto my-0 md:my-0 transition duration-300 ease-in-out hover:bg-purple-500 hover:text-white hover:border-transparent">
      Sign Up
    </button>
  </Link>
  <Link to="/login">
    <button className="bg-transparent text-purple-700 py-2 px-4 border border-purple-500 cursor-pointer rounded text-lg w-full md:w-auto my-0 md:my-0 transition duration-300 ease-in-out hover:bg-purple-500 hover:text-white hover:border-transparent">
      Login
    </button>
  </Link>
</div>
=======
      <div className="flex items-center mb-5 md:mb-0">
        
        
        <nav className="flex flex-col md:flex-row items-center w-full md:w-auto">
        <img src="/LogoW.png" alt="Logo" className="h-10 w-auto mr-4" />
          <Link to="/chessgame" className="mx-4 text-white no-underline text-base text-center">Play</Link>
          <a href="#" className="mx-4 text-white no-underline text-base text-center">Organize</a>
          <a href="#" className="mx-4 text-white no-underline text-base text-center">Tournaments</a>
          <Link to="/Payment" className="mx-4 text-white no-underline text-base text-center">Payments</Link>
        </nav>
      </div>
      
      <div className="flex flex-col md:flex-row items-center w-full md:w-auto mt-0 md:mt-0">
      
        <Link to="/signup">
          <button className="bg-blue-700 text-white py-2 px-4 cursor-pointer rounded text-lg w-full md:w-auto my-0 md:my-0 mr-2">
            Sign Up as Player
          </button>
        </Link>
        <Link to="/signuporganizer">
          <button className="bg-blue-700 text-white py-2 px-4 cursor-pointer rounded text-lg w-full md:w-auto my-2 md:my-0">
            Sign Up as Organizer
          </button>
        </Link>
        
>>>>>>> 2312ae873a591e37125bf24207fa1dd74237369e

    </header>
  );
};

export default Header;

/*<Link to="/signuporganizer">
  <button className="bg-blue-700 text-white py-2 px-4 cursor-pointer rounded text-lg w-full md:w-auto my-2 md:my-0">
    Sign Up as Organizer
  </button>
</Link>*/
