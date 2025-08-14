import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import axios from "axios"

function ProtectedRoute({ children }) {
  const [admin, setAdmin] = useState(null)
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (!token) {
      setAdmin(false)
      return
    }

    axios.get('http://localhost:3000/admin/data', {
      headers: { token }
    }).then(function (user) {
      setAdmin(true)
    }).catch(err => {
      setAdmin(false)
    });
  }, [token]);

  if (admin === null) {
    return (
      <div className="flex items-center justify-center min-h-screen text-white">
        Checking access...
      </div>
    );
  }


  if (!token || !admin) {
    return <Navigate to="/admin/signin" replace />;
  }

  return children;
}

export default ProtectedRoute;
