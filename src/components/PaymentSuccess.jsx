import React from "react";
import Lottie from "react-lottie";

const PaymentSuccess = () => {
  const defaultOptions = {
    loop: true,
    autoplay: true,
    path: "/payment-success-animation.json",
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  const handleDashboardRedirect = () => {
    console.log("Redirecting to the dashboard...");
    window.location.href = "/player-dashboard";
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="w-80 h-80">
        <Lottie options={defaultOptions} />
      </div>
      <h1 className="text-3xl font-bold text-green-600 mt-4">
        Payment Successful
      </h1>
      <button
        onClick={handleDashboardRedirect}
        className="mt-14 px-6 py-3 bg-blue text-white text-lg font-medium rounded-md hover:bg-sky-500"
      >
        Go to Dashboard
      </button>
    </div>
  );
};

export default PaymentSuccess;
