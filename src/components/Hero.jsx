import React from 'react';
import Footer from './Footer';
import Header from './Header';
import Features from './Features';

const Hero = () => {
  return (
    <section className="sandwitch">
      
      <section
   className="flex flex-col items-start justify-center text-left py-5 px-5 bg-cover bg-center text-white h-200"
   style={{ backgroundImage: "url('/background.jpeg')" }}
> <Header />
  <h1 className="text-4xl md:text-3xl sm:text-2xl mt-24 md:mt-20 sm:mt-16 mb-8 font-bold">
    Welcome to eChess, the ultimate online chess platform.
  </h1>

  <p className="text-xl md:text-lg sm:text-base mt-2 mb-12">
    Join us and experience the thrill of competitive chess, connect with fellow players, and showcase your skills.
  </p>

  <button className="h-100 bg-blue-700 text-white py-2 px-4 text-xl md:text-lg sm:text-base cursor-pointer rounded">
    Get Started
  </button>
</section>

      <Features />
      <Footer />
    </section>
  );
};

export default Hero;
