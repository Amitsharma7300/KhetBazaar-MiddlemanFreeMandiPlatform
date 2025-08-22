import { useEffect, useState } from "react";
import { FaHandshake, FaSearchDollar } from "react-icons/fa";
import { GiPriceTag } from "react-icons/gi";
import api from "../api/axios";
import CropCard from "../components/CropCard";
import { useAuth } from "../context/AuthContext";
import AIMatching from "./AIMatching";
import ContractOffers from "./ContractOffers";
import PricePrediction from "./PricePrediction";
import LogisticsForm from "../components/LogisticsForm";

export default function BuyerDashboard() {
  const [crops, setCrops] = useState([]);
  const [tab, setTab] = useState("contracts");
  const { token } = useAuth();

  useEffect(() => {
    const fetchCrops = async () => {
      const res = await api.get("/api/crops", {
        headers: { Authorization: `Bearer ${token}` }
      });
      setCrops(res.data);
    };

    fetchCrops();
  }, [token]);

  // Example: acceptedBids is an array of bids with accepted status
  // Each bid should have crop and logistics info
  const acceptedBids = []; // Replace with actual data

  return (
    <div className="p-4 md:p-8 min-h-screen bg-gradient-to-br from-blue-100 via-green-50 to-yellow-100">
      <div className="flex flex-col items-center mb-8">
        <FaHandshake className="text-6xl text-blue-700 mb-2 drop-shadow" />
        <h2 className="text-4xl font-extrabold text-blue-800 text-center drop-shadow-lg">Welcome, Buyer!</h2>
        <p className="text-lg text-blue-700 mt-2 text-center font-medium">
          Discover contracts, match with farmers, and get real-time crop prices.
        </p>
      </div>
      <div className="flex flex-wrap gap-4 mb-10 justify-center">
        <button onClick={() => setTab("contracts")} className={`px-6 py-2 rounded-xl font-semibold shadow transition flex items-center gap-2 ${tab === "contracts" ? "bg-blue-600 text-white scale-105" : "bg-gray-200 text-blue-700 hover:bg-blue-100"}`}>
          <FaHandshake className="text-xl" /> Contract Offers
        </button>
        <button onClick={() => setTab("ai")} className={`px-6 py-2 rounded-xl font-semibold shadow transition flex items-center gap-2 ${tab === "ai" ? "bg-blue-600 text-white scale-105" : "bg-gray-200 text-blue-700 hover:bg-blue-100"}`}>
          <FaSearchDollar className="text-xl" /> AI Matching
        </button>
        <button onClick={() => setTab("price")} className={`px-6 py-2 rounded-xl font-semibold shadow transition flex items-center gap-2 ${tab === "price" ? "bg-blue-600 text-white scale-105" : "bg-gray-200 text-blue-700 hover:bg-blue-100"}`}>
          <GiPriceTag className="text-xl" /> Price Prediction
        </button>
      </div>
      <div className="mb-10">
        {tab === "contracts" && <ContractOffers />}
        {tab === "ai" && <AIMatching />}
        {tab === "price" && <PricePrediction />}
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {crops.map(crop => (
          <CropCard
            key={crop._id}
            crop={crop}
            dashboardType="buyer"
            isBuyer={true}
          />
        ))}
      </div>

      {/* Logistics Dashboard for accepted bids */}
      <div className="mt-10">
        <h2 className="text-2xl font-bold mb-4 text-blue-700">Logistics Dashboard</h2>
        {acceptedBids && acceptedBids.length > 0 ? (
          acceptedBids.map((bid) => (
            <div key={bid._id} className="mb-8">
              <div className="bg-white rounded-xl shadow p-4 mb-2">
                <h3 className="text-lg font-semibold text-green-700 mb-2">
                  Crop: {bid.crop.cropName}
                </h3>
                <div>Quantity: {bid.crop.quantityInQuintals} Quintals</div>
                <div>Farmer: {bid.crop.farmer?.name}</div>
              </div>
              {/* Show logistics details if present */}
              {bid.logistics ? (
                <div className="bg-blue-50 p-4 rounded shadow">
                  <h4 className="font-bold mb-2">Logistics Details</h4>
                  <div><b>Name:</b> {bid.logistics.name}</div>
                  <div><b>Mobile:</b> {bid.logistics.mobile}</div>
                  <div><b>Pickup Location:</b> {bid.logistics.pickupLocation}</div>
                  <div><b>Delivery Location:</b> {bid.logistics.deliveryLocation}</div>
                  <div><b>Expected Date:</b> {bid.logistics.expectedDate && new Date(bid.logistics.expectedDate).toLocaleDateString()}</div>
                  <div><b>Payment Mode:</b> {bid.logistics.paymentMode}</div>
                </div>
              ) : (
                // If logistics not filled, show form to fill
                <LogisticsForm crop={bid.crop} bid={bid} />
              )}
            </div>
          ))
        ) : (
          <div className="text-gray-500">No accepted bids yet.</div>
        )}
      </div>
    </div>
  );
}
