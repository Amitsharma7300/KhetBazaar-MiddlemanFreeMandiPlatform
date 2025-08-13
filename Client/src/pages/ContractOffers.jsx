import { useEffect, useState } from "react";
import api from "../api/axios";
import { useAuth } from "../context/AuthContext";

export default function ContractOffers() {
  const { token, user } = useAuth();
  const [contracts, setContracts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get("/contracts", { headers: { Authorization: `Bearer ${token}` } })
      .then(res => {
        setContracts(res.data);
        setLoading(false);
      })
      .catch(err => {
        setLoading(false);
        // Optionally show error message
        console.error("Error fetching contracts:", err);
      });
  }, [token]);

  if (loading) return <div className="p-8 text-center">Loading...</div>;

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h2 className="text-2xl font-bold mb-6 text-green-800">Active Agreements</h2>
      {contracts.length === 0 ? (
        <div className="bg-yellow-50 text-yellow-700 p-6 rounded-xl shadow text-center">
          No contracts found.
        </div>
      ) : (
        <div className="space-y-4">
          {contracts.map(contract => (
            <div key={contract._id} className="bg-white rounded-xl shadow p-4 border-l-4 border-green-500">
              <div className="font-semibold text-green-700 text-lg">{contract.cropType}</div>
              <div className="text-gray-600">Volume: <b>{contract.volume}</b> Quintals</div>
              <div className="text-gray-600">Price: <b>₹{contract.price}</b></div>
              <div className="text-gray-600">Duration: <b>{contract.duration}</b></div>
              <div className="text-gray-600">Status: <span className="font-bold text-green-600">{contract.status}</span></div>
              <div className="mt-2 text-sm text-gray-500">
                <span>Farmer: <b>{contract.farmer?.name}</b></span> | 
                <span> Buyer: <b>{contract.buyer?.name}</b></span>
              </div>
              <div className="mt-2 text-xs text-gray-400">
                Agreement from accepted bid: <b>{contract.bid}</b>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}