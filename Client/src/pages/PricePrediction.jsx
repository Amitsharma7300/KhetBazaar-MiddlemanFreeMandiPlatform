import axios from "axios";
import { useState } from "react";
import { GiWheat } from "react-icons/gi";

export default function CropPrices() {
  const [prices, setPrices] = useState([]);
  const [loading, setLoading] = useState(false);

  // Filters
  const [state, setState] = useState("");
  const [district, setDistrict] = useState("");
  const [market, setMarket] = useState("");
  const [commodity, setCommodity] = useState("");

  const fetchPrices = async () => {
    try {
      setLoading(true);
      const res = await axios.get("http://localhost:5000/api/price-prediction", {
        params: {
          state: state || undefined,
          district: district || undefined,
          market: market || undefined,
          commodity: commodity || undefined,
          limit: 20,
          offset: 0,
        },
      });
      setPrices(res.data.records);
    } catch (err) {
      console.error("Error fetching prices:", err.message);
      setPrices([]);
    } finally {
      setLoading(false);
    }
  };

  // Remove useEffect that auto-fetches

  return (
    <div className="p-4 md:p-8 min-h-screen bg-gradient-to-br from-green-50 via-yellow-50 to-purple-50">
      <h1 className="text-4xl font-extrabold mb-8 text-green-800 text-center drop-shadow-lg">🌾 Real-Time Mandi Prices</h1>

      {/* Responsive Search Filters */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <input
          type="text"
          placeholder="State"
          value={state}
          onChange={(e) => setState(e.target.value)}
          className="border p-2 rounded-lg w-full shadow focus:ring-2 focus:ring-green-300"
        />
        <input
          type="text"
          placeholder="District"
          value={district}
          onChange={(e) => setDistrict(e.target.value)}
          className="border p-2 rounded-lg w-full shadow focus:ring-2 focus:ring-green-300"
        />
        <input
          type="text"
          placeholder="Market (Mandi)"
          value={market}
          onChange={(e) => setMarket(e.target.value)}
          className="border p-2 rounded-lg w-full shadow focus:ring-2 focus:ring-green-300"
        />
        <input
          type="text"
          placeholder="Commodity (Crop)"
          value={commodity}
          onChange={(e) => setCommodity(e.target.value)}
          className="border p-2 rounded-lg w-full shadow focus:ring-2 focus:ring-green-300"
        />
      </div>

      <div className="flex justify-center mb-8">
        <button
          onClick={fetchPrices}
          className="bg-gradient-to-r from-green-500 via-yellow-400 to-purple-500 text-white px-8 py-2 rounded-xl shadow-lg hover:scale-105 transition font-bold"
        >
          🔍 Search
        </button>
      </div>

      {/* Attractive Card Grid */}
      {loading ? (
        <p className="text-center text-green-700 font-semibold animate-pulse">Loading prices...</p>
      ) : prices.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {prices.map((item, idx) => (
            <div
              key={idx}
              className="bg-white rounded-2xl shadow-xl p-6 border-l-8 border-green-400 hover:scale-105 transition-all duration-200 group"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <GiWheat className="text-3xl text-yellow-600 group-hover:animate-bounce" />
                  <span className="font-bold text-green-700 text-xl">{item.commodity}</span>
                </div>
                <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full font-semibold">{item.variety}</span>
              </div>
              <div className="text-gray-600 mb-1">
                <span className="font-semibold">State:</span> {item.state}
              </div>
              <div className="text-gray-600 mb-1">
                <span className="font-semibold">District:</span> {item.district}
              </div>
              <div className="text-gray-600 mb-1">
                <span className="font-semibold">Market:</span> {item.market}
              </div>
              <div className="flex gap-4 mt-4 justify-center">
                <div className="bg-green-100 rounded-xl px-4 py-3 text-center shadow">
                  <div className="text-xs text-green-700 font-semibold">Min</div>
                  <div className="text-xl font-bold text-green-800">₹{item.min_price}</div>
                </div>
                <div className="bg-yellow-100 rounded-xl px-4 py-3 text-center shadow">
                  <div className="text-xs text-yellow-700 font-semibold">Max</div>
                  <div className="text-xl font-bold text-yellow-800">₹{item.max_price}</div>
                </div>
                <div className="bg-purple-100 rounded-xl px-4 py-3 text-center shadow">
                  <div className="text-xs text-purple-700 font-semibold">Modal</div>
                  <div className="text-xl font-bold text-purple-800">₹{item.modal_price}</div>
                </div>
              </div>
              <div className="mt-4 text-sm text-gray-500 text-center">
                <span className="font-semibold">Date:</span> {item.arrival_date}
              </div>
            </div>
          ))}
        </div>
      ) : (
        prices.length === 0 && (
          <div className="bg-yellow-100 text-yellow-800 p-6 rounded-xl text-center font-semibold shadow-lg">
            No results found.
          </div>
        )
      )}
    </div>
  );
}
