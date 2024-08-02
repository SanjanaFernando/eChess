import React from 'react';
import Footer from './Footer';
import Header from './Header';
import Features from './Features';

const Hero = () => {
  return (
    <section className='sandwitch'>
      <Header />
      <section className="text-left py-24 px-5 bg-cover bg-center text-white" style={{ backgroundImage: "url('/background.jpeg')" }}>
        <h1 className="text-4xl md:text-3xl sm:text-2xl mt-36 mb-12">
          Welcome to eChess, the ultimate online chess platform.
        </h1>
        <p className="text-2xl md:text-xl sm:text-lg mt-2 mb-24 relative">
          Join us and experience the thrill of competitive chess, connect with fellow players, and showcase your skills.
        </p>
        <button className="bg-blue-500 text-white border-none py-2 px-4 text-2xl md:text-xl sm:text-lg cursor-pointer rounded my-24">
          Get Started
        </button>
      </section>
      <Features />
      <Footer />
    </section>
  );
};

export default Hero;
