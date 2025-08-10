import axios from "axios";
import { useNavigate } from "react-router-dom";

function AdminSignIn() {
  const navigate = useNavigate();

  function signin() {
    axios
      .post("http://localhost:3000/signin/admin", {
        username: document.getElementById("username").value,
        password: document.getElementById("password").value,
      })
      .then(function (response) {
        let token = response.data.token;
        localStorage.setItem("token", token);
        navigate("/admin/dashboard");
      })
      .catch(() => {
        alert("Some error occurred!!");
      });
  }

  return (
    <div className="h-screen w-full flex flex-col items-center justify-center bg-gradient-to-br from-indigo-400 to-purple-500 text-white font-['Montserrat']">
      <div className="bg-white text-gray-800 rounded-lg shadow-lg p-10 w-full max-w-md">
        <h1 className="text-4xl font-bold mb-6 text-center">Admin Sign In</h1>

        <input
          type="text"
          id="username"
          placeholder="Username"
          className="w-full mb-4 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
        />

        <input
          type="password"
          id="password"
          placeholder="Password"
          className="w-full mb-6 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
        />

        <button
          onClick={signin}
          className="w-full bg-indigo-500 hover:bg-indigo-600 text-white font-medium py-3 rounded-lg shadow-md transition-transform transform hover:scale-105"
        >
          Sign In
        </button>

        <p className="mt-6 text-center text-gray-600">
          Already have an account?{" "}
          <a
            href="/admin/signup"
            className="text-indigo-500 font-semibold hover:underline"
          >
            Sign Up
          </a>
        </p>
      </div>
    </div>
  );
}

export default AdminSignIn;
