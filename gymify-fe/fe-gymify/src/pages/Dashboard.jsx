import { useEffect, useState } from "react";
import axios from "../services/api";
import { FaUsers, FaMale, FaFemale, FaMoneyBillWave } from "react-icons/fa";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

export default function Dashboard() {
  const [stats, setStats] = useState(null);
  const [monthlyData, setMonthlyData] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await axios.get("/api/members/stats");
        setStats(res.data);
      } catch (err) {
        console.error("Failed to fetch dashboard stats:", err);
        setError("Failed to load dashboard stats.");
      }
    };

    const fetchMonthlyEarnings = async () => {
      try {
        const res = await axios.get("/api/members/monthly-earnings");
        console.log("Monthly Earnings API response:", res.data);

        // Transform if data is an object instead of array
        const data = res.data;
        const transformedData = Array.isArray(data)
          ? data
          : Object.entries(data).map(([month, totalFee]) => ({ month, totalFee }));

        setMonthlyData(transformedData);
      } catch (err) {
        console.error("Failed to fetch monthly earnings:", err);
        setError("Failed to load monthly earnings.");
      }
    };

    fetchStats();
    fetchMonthlyEarnings();
  }, []);

  if (error) {
    return (
      <div className="p-6 max-w-7xl mx-auto text-center text-red-600">
        <h2 className="text-xl font-semibold mb-4">Error loading dashboard</h2>
        <p>{error}</p>
      </div>
    );
  }

  if (!stats) {
    return <div className="text-center mt-10">Loading dashboard...</div>;
  }

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div>
    <h1 className="text-3xl font-semibold mb-8 text-center">Admin Dashboard</h1>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <StatCard
            title="Total Members"
            value={stats.totalMembers}
            icon={<FaUsers className="text-blue-600" />}
          />
          <StatCard
            title="Male Members"
            value={stats.maleCount}
            icon={<FaMale className="text-green-600" />}
          />
          <StatCard
            title="Female Members"
            value={stats.femaleCount}
            icon={<FaFemale className="text-pink-600" />}
          />
          <StatCard
            title="Today's Fees"
            value={`Rs. ${stats.todayCollectedFee}`}
            icon={<FaMoneyBillWave className="text-yellow-600" />}
          />
          <StatCard
            title="Monthly Fees"
            value={`Rs. ${stats.monthlyCollectedFee}`}
            icon={<FaMoneyBillWave className="text-purple-600" />}
          />
          <StatCard
            title="Past Month Fees"
            value={`Rs. ${stats.pastMonthsCollectedFee}`}
            icon={<FaMoneyBillWave className="text-gray-600" />}
          />
        </div>

        <div className="mt-10 p-6 bg-white rounded-2xl shadow">
          <h2 className="text-xl font-semibold mb-4">📊 Monthly Earnings Overview</h2>

          {monthlyData.length === 0 ? (
            <p className="text-center text-gray-500">No monthly earnings data available.</p>
          ) : (
            <ResponsiveContainer width="100%" height={300}>
              <LineChart
                data={monthlyData}
                margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Line
                  type="monotone"
                  dataKey="totalFee"
                  stroke="#4f46e5"
                  strokeWidth={3}
                />
              </LineChart>
            </ResponsiveContainer>
          )}
        </div>
      </div>
    </div>
  );
}

function StatCard({ title, value, icon }) {
  return (
    <div className="bg-white p-5 rounded-2xl shadow flex items-center space-x-4 hover:shadow-lg transition">
      <div className="text-3xl">{icon}</div>
      <div>
        <h2 className="text-sm text-gray-500">{title}</h2>
        <p className="text-xl font-bold text-gray-800">{value}</p>
      </div>
    </div>
  );
}
