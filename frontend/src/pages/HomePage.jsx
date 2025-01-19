import React from "react";
import { Link } from "react-router-dom";
import image1 from "../assets/image1.png";

const HomePage = () => {
  return (
    <div className="h-screen flex flex-col items-center justify-center bg-gradient-to-b from-red-500 to-yellow-500 text-white">
      <div className="flex flex-col items-center space-y-6 w-full max-w-md">
        <img
          src={image1}
          alt="Hero image"
          className="rounded-lg shadow-lg w-full object-cover"
        />

        <div className="text-center">
          <h2 className="text-3xl font-medium">Welcome to</h2>
          <h1 className="text-4xl font-bold">PickAt</h1>
        </div>

        <Link
          to="/login"
          className="inline-block px-4 py-2 bg-black text-white font-bold text-sm rounded-md hover:bg-gray-800 transition"
        >
          Continue
        </Link>
      </div>
    </div>
  );
};

export default HomePage;
