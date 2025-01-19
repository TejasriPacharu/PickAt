import React from "react";
import { Link } from "react-router-dom";

const LoginPage = () => {
  return (
    <div className="p-7">
      <form className="max-w-sm mx-auto">
        <div className="mb-5">
          <label
            for="email"
            className="block mb-2 text-2xl font-medium  text-gray-900"
          >
            what's your email?
          </label>
          <input
            type="email"
            id="email"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
            placeholder="name@example.com"
            required
          />
        </div>
        <div className="mb-5">
          <label
            for="password"
            className="block mb-2 text-2xl font-medium text-gray-900"
          >
            Your password
          </label>
          <input
            type="password"
            id="password"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            placeholder="password"
            required
          />
        </div>
        <div className="flex mb-3">
          <p>New Here?</p> <Link to="/signUp"> Create a new account</Link>
        </div>
        <button
          type="submit"
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center"
        >
          Login
        </button>

        <Link
          to="/driverLogin"
          className="text-white inline-block bg-green-700 my-5 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center"
        >
          Login as Driver
        </Link>
      </form>
    </div>
  );
};

export default LoginPage;
