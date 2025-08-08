import React from "react";

function AdminDashboard() {
  const recentActivity = [
    { id: 1, text: '✅ User "JohnDoe" signed up', time: "2 mins ago" },
    { id: 2, text: '🔄 Password reset for "JaneSmith"', time: "10 mins ago" },
    { id: 3, text: "⚠️ Report #45 marked as resolved", time: "1 hr ago" },
  ];

  return (
    <div className="flex h-screen bg-gray-100 font-sans">
      {/* Sidebar */}
      <aside className="w-64 bg-black text-white flex flex-col p-6">
        <h1 className="text-2xl font-bold mb-6">Admin Panel</h1>
        <nav className="space-y-3">
          <a href="#" className="block py-2 px-3 rounded hover:bg-gray-800">Dashboard</a>
          <a href="#" className="block py-2 px-3 rounded hover:bg-gray-800">Users</a>
          <a href="#" className="block py-2 px-3 rounded hover:bg-gray-800">Reports</a>
          <a href="#" className="block py-2 px-3 rounded hover:bg-gray-800">Settings</a>
          <a href="#" className="block py-2 px-3 rounded text-red-400 hover:bg-gray-800">Logout</a>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8 overflow-y-auto">
        <h2 className="text-3xl font-bold mb-6">Welcome, Admin!</h2>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-indigo-100 p-6 rounded-lg shadow hover:bg-indigo-200 cursor-pointer transition">
            <h3 className="text-lg font-semibold">Manage Users</h3>
            <p className="text-gray-700">View, edit, or remove users</p>
          </div>
          <div className="bg-purple-100 p-6 rounded-lg shadow hover:bg-purple-200 cursor-pointer transition">
            <h3 className="text-lg font-semibold">View Reports</h3>
            <p className="text-gray-700">Check system reports and logs</p>
          </div>
          <div className="bg-green-100 p-6 rounded-lg shadow hover:bg-green-200 cursor-pointer transition">
            <h3 className="text-lg font-semibold">System Settings</h3>
            <p className="text-gray-700">Manage platform configurations</p>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-xl font-bold mb-4">Recent Activity</h3>
          <ul className="space-y-3">
            {recentActivity.map((item) => (
              <li key={item.id} className="flex justify-between text-gray-700">
                <span>{item.text}</span>
                <span className="text-sm text-gray-500">{item.time}</span>
              </li>
            ))}
          </ul>
        </div>
      </main>
    </div>
  );
}

export default AdminDashboard;
