import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <header className="top-0 flex flex-col md:flex-row justify-between items-center p-2 bg-transparent text-white w-full">
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
        

      </div>
    </header>
  );
};

export default Header;

        /*<Link to="/signuporganizer">
          <button className="bg-blue-700 text-white py-2 px-4 cursor-pointer rounded text-lg w-full md:w-auto my-2 md:my-0">
            Sign Up as Organizer
          </button>
        </Link>*/
