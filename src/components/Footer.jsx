import React from 'react';
import { Link } from 'react-router-dom';
const Footer = () => {
  return (
    <footer className="text-center p-20 bg-black text-white bg-cover bg-center bg-no-repeat" style={{ backgroundImage: "url('footerbcg.jpeg')" }}>
      <div>
        <p className='font-bold'style={{ fontSize: '2rem' }}>Join the Chess Community Today</p>
        <p>Experience the thrill of online chess tournaments and connect with fellow players.</p>
        <Link to="/signup">
          <button className="bg-blue-700 text-white border-none py-2 px-4 m-2 cursor-pointer rounded text-lg">
            Sign Up
          </button>
        </Link>
        <Link to="/Login">
          <button className="bg-blue-700 text-white border-none py-2 px-4 m-2 cursor-pointer rounded text-lg">
            Login
          </button>
        </Link>
      </div>
      <div>
        <div className="flex justify-center flex-wrap mt-5">
          <a href="#" ><img src="/fbw.png" alt="Logo" className="h-10 w-auto mr-4" /></a>
          <a href="#"><img src="/twitter.png" alt="Logo" className="h-10 w-auto mr-4" /></a>
          <a href="#"><img src="/inster.png" alt="Logo" className="h-10 w-auto mr-4" /></a>
          <a href="#"><img src="/linkedin.png" alt="Logo" className="h-10 w-auto mr-4" /></a>
        </div>
        <div className="flex items-center justify-center w-full md:w-auto mb-5 md:mb-0">
          <img src="/LogoW.png" alt="Logo" className="h-15 w-auto mr-4" />
        </div>
        <p style={{ fontSize: '2rem' }}>© 2024 eChess. All rights reserved.</p>
      </div>

    </footer>
  );
};

export default Footer;
