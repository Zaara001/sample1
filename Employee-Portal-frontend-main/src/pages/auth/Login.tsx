import { useNavigate } from "react-router-dom";
import { useState } from "react";

function Login() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username,
          password,
        }),
      });

      if (!response.ok) {
        throw new Error("Invalid credentials");
      }

      const data = await response.json();

      // ✅ Store real token
      localStorage.setItem("token", data.token);
      localStorage.setItem("role", data.role);

      // ✅ Navigate based on role
      if (data.role === "admin") {
        navigate("/admin/dashboard");
      } else {
        navigate("/employee/dashboard");
      }
    } catch (error) {
      alert("Login failed. Please check credentials.");
      console.error(error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-300 flex items-center justify-center px-4">
      <div className="w-lg  bg-white rounded-2xl shadow-xl py-10 pl-14 flex-col items-center justify-center">
        {/* Logo Section */}
        <div className="flex items-center gap-4 mb-10">
          <div className="w-14 h-14 bg-blue-600 rounded-2xl flex items-center justify-center text-2xl text-white">
            ✋
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">AttendX</h1>
            <p className="text-gray-500 text-sm">Biometric Attendance Portal</p>
          </div>
        </div>

        {/* Welcome Section */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-3">Welcome</h2>
          <p className="text-gray-500 text-md">
            Sign in to view your attendance records
          </p>
        </div>

        {/* Username */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Organization Username
          </label>
          <input
            type="text"
            placeholder="Enter the username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-96 px-3 py-2 border border-gray-300 rounded-md bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Password */}
        <div className="mb-8">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Password
          </label>
          <input
            type="password"
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-96 px-3 py-2 border border-gray-300 rounded-md bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* LDAP Button */}
        <button
          onClick={handleLogin}
          className="w-96 bg-blue-600 text-white py-4 rounded-xl text-md font-semibold hover:bg-blue-700 transition duration-200"
        >
          Sign In with LDAP →
        </button>
      </div>
    </div>
  );
}

export default Login;
