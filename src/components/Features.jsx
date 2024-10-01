import React from "react";

const Features = () => {
	return (
		<section className="text-left p-16 ">
			<div className="text-center text-4xl text-black  mb-12">
				<h1 className="font-bold">
					Experience the Thrill of Online Chess and Tournament
					Registration
				</h1>
				<p className="text-center text-2xl text-black">
					Join eChess and enjoy the convenience of playing chess
					online and registering for tournaments all in one place.
				</p>
			</div>
			<div className="flex flex-wrap justify-center gap-5 mb-10">
				<div className="w-full sm:w-auto flex-1 p-5 bg-white/20 backdrop-blur-lg rounded-lg shadow-lg border border-white/30 text-center">
					<img
						src="/box.gif"
						alt="Box GIF"
						className="mx-auto mb-4 h-16 w-16"
					/>
					<h2 className="text-2xl mb-2 text-black">Online Play</h2>
					<p className="text-base text-black">
						Play chess with players from around the world anytime,
						anywhere, and sharpen your skills.
					</p>
				</div>
				<div className="w-full sm:w-auto flex-1 p-5 bg-white/20 backdrop-blur-lg rounded-lg shadow-lg border border-white/30 text-center">
					<img
						src="/box.gif"
						alt="Box GIF"
						className="mx-auto mb-4 h-16 w-16"
					/>
					<h2 className="text-2xl mb-2 text-black">
						Tournament Registration
					</h2>
					<p className="text-base text-black">
						Register for exciting chess tournaments and compete
						against top players for glory and prizes.
					</p>
				</div>
			</div>

			<div className="text-center text-4xl text-black mb-12">
				<h1 className="font-bold">
					Simplify Your Chess Experience with eChess
				</h1>
			</div>
			<div className="flex flex-wrap justify-center gap-5 mb-10">
				<div className="flex-1 min-w-[250px] max-w-[350px] p-5 bg-white/20 backdrop-blur-lg rounded-lg shadow-lg border border-white/30">
					<img
						src="/box.gif"
						alt="Box GIF"
						className="mx-auto mb-4 h-16 w-16"
					/>
					<h2 className="text-2xl mb-2 text-black text-center">
						Organize and Play Tournaments with Ease
					</h2>
					<p className="text-center text-black">
						Join our platform to register as a player or organize
						chess tournaments effortlessly.
					</p>
				</div>
				<div className="flex-1 min-w-[250px] max-w-[350px] p-5 bg-white/20 backdrop-blur-lg rounded-lg shadow-lg border border-white/30">
					<img
						src="/box.gif"
						alt="Box GIF"
						className="mx-auto mb-4 h-16 w-16"
					/>
					<h2 className="text-2xl mb-2 text-black text-center">
						Compete Against Skilled Players in Real-Time
					</h2>
					<p className="text-center text-black">
						Challenge opponents from around the world and test your
						chess skills online.
					</p>
				</div>
				<div className="flex-1 min-w-[250px] max-w-[350px] p-5 bg-white/20 backdrop-blur-lg rounded-lg shadow-lg border border-white/30">
					<img
						src="/box.gif"
						alt="Box GIF"
						className="mx-auto mb-4 h-16 w-16"
					/>
					<h2 className="text-2xl mb-2 text-black text-center">
						Stay Updated with Live Tournament Updates
					</h2>
					<p className="text-center text-black">
						Get real-time updates, player rankings, and tournament
						details at your fingertips.
					</p>
				</div>
			</div>
		</section>
	);
};

export default Features;
