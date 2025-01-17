import React from 'react';
import { Link } from 'react-router-dom';

const HomePage = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <h1 className="text-4xl font-bold mb-8 text-sky-800">
        Welcome to Password Manager
      </h1>
      <p className="text-lg text-gray-600 mb-12">
        Securely manage your passwords and access them anytime, anywhere.
      </p>
      <div className="flex space-x-8">
        <Link
          to="/login"
          className="bg-sky-600 text-white px-6 py-3 rounded-lg shadow-md hover:bg-sky-700 transition duration-200"
        >
          Login
        </Link>
        <Link
          to="/register"
          className="bg-green-600 text-white px-6 py-3 rounded-lg shadow-md hover:bg-green-700 transition duration-200"
        >
          Register
        </Link>
      </div>
    </div>
  );
};

export default HomePage;
