// src/components/Navbar.jsx
import { Link, useNavigate } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <nav className="bg-white shadow-md p-4 flex flex-wrap justify-between items-center">
      <div className="text-2xl font-bold text-blue-600">Gym Admin Panel</div>
      <div className="flex flex-wrap items-center gap-4 text-gray-700 text-sm md:text-base">
        <Link to="/members" className="hover:text-blue-500 transition">View Members</Link>
        <Link to="/members/add" className="hover:text-blue-500 transition">Add Member</Link>
        <Link to="/members/overdue" className="hover:text-blue-500 transition">Overdue Members</Link>
        <button 
          onClick={handleLogout}
          className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition"
        >
          Logout
        </button>
      </div>
    </nav>
  );
}
