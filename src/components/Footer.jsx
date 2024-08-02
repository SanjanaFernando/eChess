import React from 'react';
import { Link } from 'react-router-dom';
const Footer = () => {
  return (
    <footer className="text-center p-10 bg-black text-white bg-cover bg-center bg-no-repeat" style={{ backgroundImage: "url('footerbcg.jpeg')" }}>
      <p>Join the Chess Community Today</p>
      <Link to = "/signup">
      <button className="bg-blue-500 text-white border-none py-2 px-4 m-2 cursor-pointer rounded text-lg">
        Sign Up
      </button>
      </Link>
      <Link to = "/Login">
      <button className="bg-blue-500 text-white border-none py-2 px-4 m-2 cursor-pointer rounded text-lg">
        Login
      </button>
      </Link>

      <div className="flex justify-center flex-wrap mt-5">
        <a href="#" className="m-2 text-white text-2xl no-underline">Facebook</a>
        <a href="#" className="m-2 text-white text-2xl no-underline">Twitter</a>
        <a href="#" className="m-2 text-white text-2xl no-underline">Instagram</a>
        <a href="#" className="m-2 text-white text-2xl no-underline">LinkedIn</a>
      </div>
      <p>© 2024 eChess. All rights reserved.</p>
    </footer>
  );
};

export default Footer;
