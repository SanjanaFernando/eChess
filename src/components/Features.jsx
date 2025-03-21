import React from "react";

const Features = () => {
  return (
    <section className="mb-8">
      <div className="flex flex-row mb-12">
        <div className="flex flex-col md:w-6/10 justify-center items-start py-32 mx-10">
          <div className="text-left text-5xl text-black mb-12">
            <h1 className="font-bold mb-5">
              Experience the Thrill of Online <br /> Chess and Tournament <br />
              Registration
            </h1>
            <p className="text-left text-lg text-black">
              Join eChess and enjoy the convenience of playing chess <br />
              online and registering for tournaments all in one place.
            </p>
          </div>
          <div className="flex flex-wrap justify-center gap-5 mb-10">
            <div className="w-full sm:w-auto flex-1 py-5 bg-white/20 backdrop-blur-lg rounded-2xl shadow-lg shadow-gray-500/50 text-left border border-purple-300">
              <img
                src="/box.gif"
                alt="Box GIF"
                className="mb-4 h-16 w-16 mx-auto"
              />
              <h2 className="text-2xl mb-2 text-black font-semibold text-center">
                Online Play
              </h2>
              <p className="text-lg text-black text-center">
                Play chess with players from around the world anytime,
                anywhere, and sharpen your skills.
              </p>
            </div>
            <div className="w-full sm:w-auto flex-1 py-5 bg-white/20 backdrop-blur-lg rounded-2xl shadow-lg shadow-gray-500/50 text-left border border-purple-300">
              <img
                src="/box.gif"
                alt="Box GIF"
                className="mb-4 h-16 w-16 mx-auto"
              />
              <h2 className="text-2xl mb-2 text-black font-semibold text-center">
                Tournament Registration
              </h2>
              <p className="text-lg text-black text-center">
                Register for exciting chess tournaments and compete
                against top players for glory and prizes.
              </p>
            </div>
          </div>
        </div>
        <div className="hidden md:block max-h-screen w-4/10 items-end overflow-hidden">
          <img
            src="/tournament.jpeg"
            alt="Logo"
            className="h-full w-full object-cover block transition-transform duration-300 ease-in-out hover:scale-110"
          />
        </div>
      </div>

      <div className="mb-28">
        <div className="text-center text-4xl text-black mb-12">
          <h1 className="font-bold">
            Simplify Your Chess Experience with eChess
          </h1>
        </div>
        <div className="flex flex-wrap justify-center gap-5 mb-10">
          <div className="flex-1 min-w-[250px] max-w-[350px] p-5 bg-white/20 backdrop-blur-lg rounded-2xl shadow-lg shadow-gray-500/50 border border-purple-300">
            <img
              src="/box.gif"
              alt="Box GIF"
              className="mx-auto mb-4 h-16 w-16"
            />
            <h2 className="text-2xl mb-2 text-black text-center font-semibold">
              Organize and Play Tournaments with Ease
            </h2>
            <p className="text-center text-black">
              Join our platform to register as a player or organize
              chess tournaments effortlessly.
            </p>
          </div>
          <div className="flex-1 min-w-[250px] max-w-[350px] p-5 bg-white/20 backdrop-blur-lg rounded-2xl shadow-lg shadow-gray-500/50 border border-purple-300">
            <img
              src="/box.gif"
              alt="Box GIF"
              className="mx-auto mb-4 h-16 w-16"
            />
            <h2 className="text-2xl mb-2 text-black text-center font-semibold">
              Compete Against Skilled Players in Real-Time
            </h2>
            <p className="text-center text-black">
              Challenge opponents from around the world and test your
              chess skills online.
            </p>
          </div>
          <div className="flex-1 min-w-[250px] max-w-[350px] p-5 bg-white/20 backdrop-blur-lg rounded-2xl shadow-lg shadow-gray-500/50 border border-purple-300">
            <img
              src="/box.gif"
              alt="Box GIF"
              className="mx-auto mb-4 h-16 w-16"
            />
            <h2 className="text-2xl mb-2 text-black text-center font-semibold">
              Stay Updated with Live Tournament Updates
            </h2>
            <p className="text-center text-black">
              Get real-time updates, player rankings, and tournament
              details at your fingertips.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Features;
