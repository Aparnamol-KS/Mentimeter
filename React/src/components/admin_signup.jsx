import axios from "axios";
import { useNavigate } from "react-router-dom";

function AdminSignUp() {
  const navigate = useNavigate();

  function addAdmin() {
    axios
      .post("http://localhost:3000/signup/admin", {
        username: document.getElementById("username").value,
        name: document.getElementById("name").value,
        email: document.getElementById("email").value,
        password: document.getElementById("password").value,
      })
      .then(() => {
        navigate("/admin/signin");
      })
      .catch(() => {
        alert("Some error occurred!!");
      });
  }

  return (
    <div className="h-screen w-full flex flex-col items-center justify-center bg-gradient-to-br from-indigo-400 to-purple-500 text-white font-['Montserrat']">
      <div className="bg-white text-gray-800 rounded-lg shadow-lg p-10 w-full max-w-md">
        <h1 className="text-4xl font-bold mb-6 text-center">Admin Sign Up</h1>

        <input
          type="text"
          id="username"
          placeholder="Username"
          className="w-full mb-4 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
        />

        <input
          type="email"
          id="email"
          placeholder="Email"
          className="w-full mb-4 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
        />

        <input
          type="text"
          id="name"
          placeholder="Name"
          className="w-full mb-4 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
        />

        <input
          type="password"
          id="password"
          placeholder="Password"
          className="w-full mb-6 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
        />

        <button
          onClick={addAdmin}
          className="w-full bg-indigo-500 hover:bg-indigo-600 text-white font-medium py-3 rounded-lg shadow-md transition-transform transform hover:scale-105"
        >
          Sign Up
        </button>

        <p className="mt-6 text-center text-gray-600">
          Already have an account?{" "}
          <a
            href="/admin/signin"
            className="text-indigo-500 font-semibold hover:underline"
          >
            Sign In
          </a>
        </p>
      </div>
    </div>
  );
}

export default AdminSignUp;
