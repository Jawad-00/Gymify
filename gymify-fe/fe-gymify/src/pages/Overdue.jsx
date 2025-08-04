import { useEffect, useState } from "react";
import axios from "../services/api";

export default function OverdueFees() {
  const [overdueMembers, setOverdueMembers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchOverdueMembers();
  }, []);

  const fetchOverdueMembers = async () => {
    setLoading(true);
    setError("");
    try {
      const res = await axios.get("/api/members/overdue-fees");
      setOverdueMembers(res.data);
    } catch (err) {
      setError("Failed to load overdue members.");
    }
    setLoading(false);
  };

  const markFeePaidToday = async (id) => {
    try {
      await axios.put(`/api/members/${id}/update-fee-date`, {
        feeSubmissionDate: new Date().toISOString(),
      });
      // Refresh list after update
      fetchOverdueMembers();
    } catch {
      alert("Failed to update fee submission date.");
    }
  };

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <h1 className="text-3xl font-semibold mb-6 text-center">Members with Overdue Fees</h1>

      {loading ? (
        <p className="text-center text-gray-600">Loading overdue members...</p>
      ) : error ? (
        <p className="text-center text-red-600">{error}</p>
      ) : overdueMembers.length === 0 ? (
        <p className="text-center text-gray-600">No overdue members found.</p>
      ) : (
        <div className="overflow-x-auto rounded-lg border border-gray-200 shadow-sm">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                {[
                  "Name",
                  "Email",
                  "Phone",
                  "Gender",
                  "Membership",
                  "Last Fee Submission",
                  "Actions",
                ].map((header) => (
                  <th
                    key={header}
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    {header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {overdueMembers.map((member) => (
                <tr key={member._id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {member.name}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {member.email}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {member.phone}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {member.gender}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {member.membershipType}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {new Date(member.feeSubmissionDate).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <button
                      onClick={() => markFeePaidToday(member._id)}
                      className="px-3 py-1 bg-green-600 text-white rounded hover:bg-green-700 transition"
                    >
                      Mark Fee Paid Today
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
