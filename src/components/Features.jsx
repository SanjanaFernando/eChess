import React from 'react';

const Features = () => {
  return (
    <section className="text-left p-16 bg-cover bg-center bg-no-repeat " style={{ backgroundImage: "url('/background.png')" }}>
      <div className="text-center text-4xl text-purple-500 mb-12">
        <h1>Experience the Thrill of Online Chess and Tournament Registration</h1>
      </div>
      <div className="flex flex-wrap justify-center gap-5 mb-10">
        <div className="p-5 bg-white/20 backdrop-blur-lg rounded-lg shadow-lg border border-white/30">
          <h2 className="text-2xl mb-2 text-white text-center">Online Play</h2>
          <p className="text-base text-white">Play chess with players from around the world anytime, anywhere, and sharpen your skills.</p>
        </div>
        <div className="p-5 bg-white/20 backdrop-blur-lg rounded-lg shadow-lg border border-white/30">
          <h2 className="text-2xl mb-2 text-white text-center">Tournament Registration</h2>
          <p className="text-base text-white">Register for exciting chess tournaments and compete against top players for glory and prizes.</p>
        </div>
      </div>
      <div className="text-center text-4xl text-purple-500 mb-12">
        <h1>Simplify Your Chess Experience with eChess</h1>
      </div>
      <div className="flex flex-wrap justify-center gap-5 mb-10">
        <div className="p-5 bg-white/20 backdrop-blur-lg rounded-lg shadow-lg border border-white/30">
          <h2 className="text-2xl mb-2 text-white text-center">Organize and Play Tournaments with Ease</h2>
          <p className="text-base text-white">Join our platform to register as a player or organize chess tournaments effortlessly.</p>
        </div>
        <div className="p-5 bg-white/20 backdrop-blur-lg rounded-lg shadow-lg border border-white/30">
          <h2 className="text-2xl mb-2 text-white text-center">Compete Against Skilled Players in Real-Time</h2>
          <p className="text-base text-white">Challenge opponents from around the world and test your chess skills online.</p>
        </div>
        <div className="p-5 bg-white/20 backdrop-blur-lg rounded-lg shadow-lg border border-white/30">
          <h2 className="text-2xl mb-2 text-white text-center">Stay Updated with Live Tournament Updates</h2>
          <p className="text-base text-white">Get real-time updates, player rankings, and tournament details at your fingertips.</p>
        </div>
      </div>
    </section>
  );
};

export default Features;
