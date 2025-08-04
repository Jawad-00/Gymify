import {
  FaUsers,
  FaUserPlus,
  FaExclamationTriangle,
  FaChartLine,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

export default function AdminHome() {
  const navigate = useNavigate();
  const isLoggedIn = !!localStorage.getItem("token");

  // Redirect to login if not logged in
  useEffect(() => {
    if (!isLoggedIn) navigate("/login");
  }, [isLoggedIn, navigate]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  const options = [
    {
      title: "View Members",
      icon: <FaUsers className="text-blue-600 text-3xl" />,
      onClick: () => navigate("/members"),
    },
    {
      title: "Add Member",
      icon: <FaUserPlus className="text-green-600 text-3xl" />,
      onClick: () => navigate("/members/add"),
    },
    {
      title: "Overdue Members",
      icon: <FaExclamationTriangle className="text-red-600 text-3xl" />,
      onClick: () => navigate("/members/overdue"),
    },
    {
      title: "Dashboard",
      icon: <FaChartLine className="text-pink-600 text-3xl" />,
      onClick: () => navigate("/dashboard"),
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navbar */}
      <nav className="bg-white shadow px-6 py-4 flex justify-between items-center">
        <h1 className="text-xl font-bold text-gray-800">Gym Admin Panel</h1>
        <button
          onClick={isLoggedIn ? handleLogout : () => navigate("/login")}
          className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-xl transition"
        >
          {isLoggedIn ? "Logout" : "Login"}
        </button>
      </nav>

      {/* Panel Options */}
      <div className="p-6 max-w-7xl mx-auto">
        <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 mt-8">
          {options.map((item, index) => (
            <div
              key={index}
              onClick={item.onClick}
              className="cursor-pointer bg-white p-6 rounded-2xl shadow-md hover:shadow-xl transition duration-300 flex flex-col items-center justify-center text-center hover:scale-105"
            >
              <div className="mb-3">{item.icon}</div>
              <h2 className="text-lg font-medium text-gray-700">{item.title}</h2>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
