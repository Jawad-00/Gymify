import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "../services/api";
import Navbar from "../components/Navbar"; // ✅ navbar import
export default function MemberForm() {
  const { id } = useParams(); // member id if editing
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    gender: "",
    membershipType: "",
    feeSubmissionDate: "",
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // Fetch existing member data if editing
  useEffect(() => {
    if (id) {
      setLoading(true);
      axios
        .get(`/api/members/${id}`)
        .then((res) => {
          const data = res.data;
          setFormData({
            name: data.name || "",
            email: data.email || "",
            phone: data.phone || "",
            gender: data.gender || "",
            membershipType: data.membershipType || "",
            feeSubmissionDate: data.feeSubmissionDate
              ? new Date(data.feeSubmissionDate).toISOString().slice(0, 10)
              : "",
          });
        })
        .catch(() => setError("Failed to load member data"))
        .finally(() => setLoading(false));
    }
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    // Basic validation
    if (
      !formData.name.trim() ||
      !formData.email.trim() ||
      !formData.phone.trim() ||
      !formData.gender ||
      !formData.membershipType ||
      !formData.feeSubmissionDate
    ) {
      setError("Please fill in all fields.");
      return;
    }

    try {
      setLoading(true);
      if (id) {
        // Edit existing member
        await axios.put(`/api/members/${id}`, formData);
      } else {
        // Add new member
        await axios.post("/api/members/", formData);
      }
      navigate("/members");
    } catch (err) {
      setError("Failed to save member data.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar /> {/* ✅ Minimal impact addition */}
    <div className="p-6 max-w-xl mx-auto">
     

      {error && (
        <p className="mb-4 text-center text-red-600 font-semibold">{error}</p>
      )}

      {loading ? (
        <p className="text-center text-gray-600">Loading...</p>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-6 bg-white p-6 rounded-lg shadow">
          <Input label="Name" name="name" value={formData.name} onChange={handleChange} />
          <Input
            label="Email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
          />
          <Input label="Phone" name="phone" value={formData.phone} onChange={handleChange} />
          
          <Select
            label="Gender"
            name="gender"
            value={formData.gender}
            onChange={handleChange}
            options={["Male", "Female", "Other"]}
          />

          <Select
            label="Membership Type"
            name="membershipType"
            value={formData.membershipType}
            onChange={handleChange}
            options={["Basic", "Standard", "Premium"]}
          />

          <Input
            label="Fee Submission Date"
            name="feeSubmissionDate"
            type="date"
            value={formData.feeSubmissionDate}
            onChange={handleChange}
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition disabled:opacity-60"
          >
            {id ? "Update Member" : "Add Member"}
          </button>
        </form>
      )}
    </div>
    </>
  );
}

function Input({ label, name, type = "text", value, onChange }) {
  return (
    <div>
      <label htmlFor={name} className="block text-sm font-medium text-gray-700 mb-1">
        {label}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        required
      />
    </div>
  );
}

function Select({ label, name, value, onChange, options }) {
  return (
    <div>
      <label htmlFor={name} className="block text-sm font-medium text-gray-700 mb-1">
        {label}
      </label>
      <select
        id={name}
        name={name}
        value={value}
        onChange={onChange}
        className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        required
      >
        <option value="" disabled>
          Select {label.toLowerCase()}
        </option>
        {options.map((opt) => (
          <option key={opt} value={opt}>
            {opt}
          </option>
        ))}
      </select>
    </div>
  );
}
