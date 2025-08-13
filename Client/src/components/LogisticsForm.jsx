import { useState } from "react";
import { FaCalendarAlt, FaMapMarkerAlt, FaMoneyBillWave, FaPhone, FaUser } from "react-icons/fa";
import axios from "../api/axios";
import { useAuth } from "../context/AuthContext";

export default function LogisticsForm({ crop, bid, onBooked }) {
  const [name, setName] = useState("");
  const [mobile, setMobile] = useState("");
  const [pickupLocation, setPickupLocation] = useState("");
  const [deliveryLocation, setDeliveryLocation] = useState("");
  const [expectedDate, setExpectedDate] = useState("");
  const [paymentMode, setPaymentMode] = useState("UPI");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [details, setDetails] = useState(null);
  const { token } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const res = await axios.post(
        "/logistics/book",
        {
          cropId: crop._id,
          bidId: bid._id,
          name,
          mobile,
          pickupLocation,
          deliveryLocation,
          expectedDate,
          paymentMode
        },
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      );
      setLoading(false);
      setSubmitted(true);
      setDetails(res.data.logistics);
      if (onBooked) onBooked(res.data.logistics);
    } catch (err) {
      setLoading(false);
      setError("Failed to book logistics.");
    }
  };

  // Show details if submitted
  if (submitted && details) {
    return (
      <div className="bg-white p-6 rounded-xl shadow-md mt-6 max-w-md mx-auto border border-gray-200">
        <h3 className="text-xl font-bold mb-4 text-gray-800 flex items-center gap-2">
          <FaMapMarkerAlt className="text-gray-400" /> Logistics Details
        </h3>
        <div className="mb-2 flex items-center gap-2"><FaUser className="text-gray-400" /> <span>{details.name}</span></div>
        <div className="mb-2 flex items-center gap-2"><FaPhone className="text-gray-400" /> <span>{details.mobile}</span></div>
        <div className="mb-2 flex items-center gap-2"><FaMapMarkerAlt className="text-gray-400" /> <span>{details.pickupLocation}</span></div>
        <div className="mb-2 flex items-center gap-2"><FaMapMarkerAlt className="text-gray-400" /> <span>{details.deliveryLocation}</span></div>
        <div className="mb-2 flex items-center gap-2"><FaCalendarAlt className="text-gray-400" /> <span>{details.expectedDate && new Date(details.expectedDate).toLocaleDateString()}</span></div>
        <div className="mb-2 flex items-center gap-2"><FaMoneyBillWave className="text-gray-400" /> <span>{details.paymentMode}</span></div>
        <div className="mt-3 text-green-600 font-semibold">Logistics booked successfully!</div>
      </div>
    );
  }

  // Show form if not submitted
  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded-xl shadow-md mt-6 max-w-md mx-auto border border-gray-200">
      <h3 className="text-xl font-bold mb-4 text-gray-800 flex items-center gap-2">
        <FaMapMarkerAlt className="text-gray-400" /> Logistics Details
      </h3>
      <div className="mb-4 flex items-center gap-2">
        <FaUser className="text-gray-400" />
        <input
          type="text"
          value={name}
          onChange={e => setName(e.target.value)}
          required
          placeholder="Your Name"
          className="border border-gray-300 rounded px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-200"
        />
      </div>
      <div className="mb-4 flex items-center gap-2">
        <FaPhone className="text-gray-400" />
        <input
          type="tel"
          value={mobile}
          onChange={e => setMobile(e.target.value)}
          required
          placeholder="Mobile Number"
          pattern="[0-9]{10}"
          maxLength={10}
          className="border border-gray-300 rounded px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-200"
        />
      </div>
      <div className="mb-4 flex items-center gap-2">
        <FaMapMarkerAlt className="text-gray-400" />
        <input
          type="text"
          value={pickupLocation}
          onChange={e => setPickupLocation(e.target.value)}
          required
          placeholder="Pickup Location"
          className="border border-gray-300 rounded px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-200"
        />
      </div>
      <div className="mb-4 flex items-center gap-2">
        <FaMapMarkerAlt className="text-gray-400" />
        <input
          type="text"
          value={deliveryLocation}
          onChange={e => setDeliveryLocation(e.target.value)}
          required
          placeholder="Delivery Location"
          className="border border-gray-300 rounded px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-200"
        />
      </div>
      <div className="mb-4 flex items-center gap-2">
        <FaCalendarAlt className="text-gray-400" />
        <input
          type="date"
          value={expectedDate}
          onChange={e => setExpectedDate(e.target.value)}
          required
          className="border border-gray-300 rounded px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-200"
        />
      </div>
      <div className="mb-6 flex items-center gap-2">
        <FaMoneyBillWave className="text-gray-400" />
        <select
          value={paymentMode}
          onChange={e => setPaymentMode(e.target.value)}
          className="border border-gray-300 rounded px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-200"
        >
          <option value="UPI">UPI</option>
          <option value="Cash on Delivery">Cash on Delivery</option>
        </select>
      </div>
      <button
        type="submit"
        className="bg-blue-500 hover:bg-blue-600 text-white font-semibold px-6 py-2 rounded-lg shadow transition w-full"
        disabled={loading}
      >
        {loading ? "Booking..." : "Book Logistics"}
      </button>
      {error && <div className="text-red-600 mt-3">{error}</div>}
    </form>
  );
}