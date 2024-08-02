import React from 'react';

const Payment = () => {
  return (
    
    <div className="flex  items-center justify-around min-h-screen bg-gray-200 bg-cover bg-center" style={{ backgroundImage: "url('/paymentbg.png')" }}>
      <div className="bg-white bg-opacity-15 backdrop-filter backdrop-blur-lg p-5 rounded-lg shadow-lg w-full max-w-lg mb-5 sm:w-4/5 md:w-1/3 lg:w-1/4 border border-white border-opacity-20 mx-4">
        <button className="text-blue-500 text-lg mb-5">← Back</button>
        <h2 className="text-2xl mb-5">Register to Tournament</h2>
        <p className="text-lg mb-2">LKR 5000.00 <span className="text-sm text-gray-300">per one person</span></p>
        <div className="flex justify-between mb-2">
          <p>Tournament</p>
          <p>LKR 5000.00</p>
        </div>
        <button className="text-blue-500 text-sm mb-5">Add promotion code</button>
        <hr className="mb-5" />
        <div className="flex justify-between mb-5">
          <p>Total</p>
          <p>LKR 5000.00</p>
        </div>
      </div>
      <div className="bg-white bg-opacity-15 backdrop-filter backdrop-blur-lg p-5 rounded-lg shadow-lg w-full max-w-lg mb-5 sm:w-4/5 md:w-1/3 lg:w-1/4 border border-white border-opacity-30 mx-4">
        <h2 className="text-2xl mb-5">Pay with card</h2>
        <form>
          <div className="mb-4">
            <label htmlFor="email" className="block mb-2">Email</label>
            <input type="email" id="email" placeholder="Email address" required className="w-full p-2 border border-gray-300 rounded" />
          </div>
          <div className="mb-4">
            <label htmlFor="cardNumber" className="block mb-2">Card number</label>
            <input type="text" id="cardNumber" placeholder="1234 1234 1234 1234" required className="w-full p-2 border border-gray-300 rounded" />
          </div>
          <div className="mb-4 flex flex-wrap">
            <div className="w-full sm:w-1/2 mb-4 sm:mb-0 sm:mr-4">
              <label htmlFor="expiration" className="block mb-2">Expiration</label>
              <input type="text" id="expiration" placeholder="MM / YY" required className="w-full p-2 border border-gray-300 rounded" />
            </div>
            <div className="w-full sm:w-1/2">
              <label htmlFor="cvc" className="block mb-2">CVC</label>
              <input type="text" id="cvc" placeholder="CVC" required className="w-full p-2 border border-gray-300 rounded" />
            </div>
          </div>
          <div className="mb-4">
            <label htmlFor="country" className="block mb-2">Country</label>
            <input type="text" id="country" placeholder="Sri Lanka" required className="w-full p-2 border border-gray-300 rounded" />
          </div>
          <button type="submit" className="w-full p-2 bg-blue-500 text-white rounded hover:bg-blue-700">Pay</button>
        </form>
        <p className="text-sm text-black mt-5">
          By providing your card information, you allow eChess to charge your card for make payments in accordance with their terms.
        </p>
      </div>
    </div>
  );
};

export default Payment;
