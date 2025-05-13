import React from "react";
import Footer from "./Footer";
import Header from "./Header";
import Features from "./Features";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const Hero = () => {
  const navigate = useNavigate();

  const handleStart = () => {
    navigate("/signup");
  };

  return (
    <>
      <section
        className="flex flex-col items-start justify-start text-left py-5 px-5 bg-cover bg-center text-white min-h-screen w-full"
        style={{ backgroundImage: "url('/background.jpeg')" }}
      >
        <Header />
        <div className="flex flex-col justify-center items-start text-left px-5 md:px-10 min-h-screen">
          {/* Updated h1 with explicit text color and alignment */}
          <motion.h1
            className="text-4xl md:text-5xl mb-2 font-bold leading-snug text-white text-left"
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
          >
            Welcome to eChess,
            <br />
            the ultimate
            <br />
            online chess platform.
          </motion.h1>
          {/* Paragraph remains unchanged */}
          <motion.p
            className="text-lg md:text-xl mt-4 mb-8 leading-relaxed text-gray-200 text-left"
            initial={{ opacity: 0, x: -100 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, delay: 0.5 }}
          >
            Join us and experience the thrill of competitive
            <br />
            chess, connect with fellow players,
            <br />
            and showcase your skills.
          </motion.p>
          <motion.button
            className="bg-blue text-white py-3 px-6 font-semibold rounded text-lg w-full md:w-auto transition duration-300 ease-in-out hover:bg-sky-500 hover:text-white hover:border-transparent"
            onClick={handleStart}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{
              delay: 1,
              duration: 1,
              ease: [0.25, 0.8, 0.25, 1],
            }}
          >
            Get Started
          </motion.button>
        </div>
      </section>
      <Features />
      <Footer />
    </>
  );
};

export default Hero;
