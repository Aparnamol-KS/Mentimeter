import React from "react";
import { useNavigate } from "react-router-dom";

function Main() {
  const navigate = useNavigate();

  return (
    <div className="h-screen w-full flex flex-col items-center justify-center bg-gradient-to-br from-indigo-400 to-purple-500 text-white text-center relative overflow-hidden font-['Montserrat']">
      <div className="z-10">
        <h3 className="text-5xl md:text-6xl font-bold mb-4">Mini Menti Meter</h3>
        <p className="text-lg md:text-xl text-gray-200 mb-10 ">
          Create, Share, and Explore Amazing Quizzes
        </p>

        <div className="flex gap-4 justify-center">
          <button
            onClick={() => navigate("/admin/dashboard")}
            className="bg-white text-gray-800 font-medium py-3 px-6 rounded-lg shadow-md transition-transform transform hover:scale-105"
          >
            Admin
          </button>

          <button
            onClick={() => navigate("/user/dashboard")}
            className="bg-transparent border-2 border-white text-white font-medium py-3 px-6 rounded-lg shadow-md transition-transform transform hover:scale-105"
          >
            User
          </button>
        </div>
      </div>
    </div>
  );
}

export default Main;
