import { useState } from "react";
import axios from "../api/axios";
import { useAuth } from "../context/AuthContext";

export default function AIMatching() {
  const { token } = useAuth();
  const [form, setForm] = useState({ cropType: "", location: "", volume: "" });
  const [matches, setMatches] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await axios.post("/match", form, { headers: { Authorization: `Bearer ${token}` } });
    setMatches(res.data);
  };

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h2 className="text-2xl font-bold mb-6 text-blue-800">AI Buyer-Farmer Matching</h2>
      <form onSubmit={handleSubmit} className="mb-6 grid grid-cols-1 md:grid-cols-3 gap-4">
        <input
          type="text"
          placeholder="Crop Type"
          value={form.cropType}
          onChange={e => setForm({ ...form, cropType: e.target.value })}
          className="border rounded px-3 py-2"
        />
        <input
          type="text"
          placeholder="Location"
          value={form.location}
          onChange={e => setForm({ ...form, location: e.target.value })}
          className="border rounded px-3 py-2"
        />
        <input
          type="number"
          placeholder="Volume"
          value={form.volume}
          onChange={e => setForm({ ...form, volume: e.target.value })}
          className="border rounded px-3 py-2"
        />
        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded col-span-1 md:col-span-3">Find Matches</button>
      </form>
      <div className="space-y-4">
        {matches.map(match => (
          <div key={match._id} className="bg-white rounded-xl shadow p-4">
            <div className="font-semibold text-green-700">{match.cropName}</div>
            <div className="text-gray-600">Farmer: {match.farmer?.name}</div>
            <div className="text-gray-600">Location: {match.location}</div>
            <div className="text-gray-600">Volume: {match.quantityInQuintals} Quintals</div>
            <div className="text-gray-600">Price: ₹{match.expectedPricePerQuintal}</div>
          </div>
        ))}
      </div>
    </div>
  );
}