import { useEffect, useState } from "react";
import { FaHandshake, FaSearchDollar } from "react-icons/fa";
import { GiPriceTag } from "react-icons/gi";
import axios from "../api/axios";
import CropCard from "../components/CropCard";
import { useAuth } from "../context/AuthContext";
import AIMatching from "./AIMatching";
import ContractOffers from "./ContractOffers";
import PricePrediction from "./PricePrediction";

export default function BuyerDashboard() {
  const [crops, setCrops] = useState([]);
  const [tab, setTab] = useState("contracts");
  const { token } = useAuth();

  useEffect(() => {
    const fetchCrops = async () => {
      const res = await axios.get("/crops", {
        headers: { Authorization: `Bearer ${token}` }
      });
      setCrops(res.data);
    };

    fetchCrops();
  }, [token]);

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
    </div>
  );
}
