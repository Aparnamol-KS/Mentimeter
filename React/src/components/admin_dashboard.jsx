import { Link, Outlet, useNavigate } from "react-router-dom";

function AdminDashboard() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token"); 
    navigate("/");
  };

   return (
    <div className="flex h-screen bg-gray-900 font-['Montserrat'] text-white">
      {/* Sidebar */}
      <aside className="w-64 bg-black text-white flex flex-col p-8">
        <h1 className="text-2xl font-bold mb-5">Admin Panel</h1>
        <nav className="space-y-3">
          <Link to="create_quiz" className="block py-2 hover:text-red-400">Create Quiz</Link>
          <Link to="." className="block py-2 hover:text-red-400">View All Quizzes</Link>
          <Link to="leaderboard" className="block py-2 hover:text-red-400">Leaderboard</Link>
          <button
            onClick={handleLogout}
            className="block py-2 text-left hover:text-red-400 w-full"
          >
            Logout
          </button>
        </nav>
      </aside>

      <main className="flex-1 p-8 overflow-y-auto bg-gray-900">
        <Outlet /> 
      </main>
    </div>
  );
}

export default AdminDashboard;
