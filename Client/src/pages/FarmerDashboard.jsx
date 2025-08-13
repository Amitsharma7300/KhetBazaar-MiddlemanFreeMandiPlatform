import { useEffect, useState } from "react";
import { FaSeedling } from "react-icons/fa";
import { GiFarmer, GiPlantRoots } from "react-icons/gi";
import api from "../api/axios";
import CropCard from "../components/CropCard";
import { useAuth } from "../context/AuthContext";
import AIMatching from "./AIMatching";
import ContractOffers from "./ContractOffers";
import PricePrediction from "./PricePrediction";
import { useNavigate } from "react-router-dom"; // ✅ for navigation

export default function FarmerDashboard() {
  const [crops, setCrops] = useState([]);
  const { token, user } = useAuth();
  const [tab, setTab] = useState("contracts");
  const navigate = useNavigate(); // ✅ for page redirect

  const fetchCrops = async () => {
    try {
      const res = await api.get("/crops", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setCrops(res.data);
    } catch (err) {
      console.error("Error fetching crops:", err);
    }
  };

  useEffect(() => {
    fetchCrops();
    // eslint-disable-next-line
  }, []);

  const myCrops = crops.filter(
    (crop) => crop.farmer?._id === user?._id
  );

  return (
    <div className="p-4 md:p-8 min-h-screen bg-gradient-to-br from-green-100 via-yellow-50 to-purple-100">
      {/* Welcome Header */}
      <div className="flex flex-col items-center mb-8">
        <GiFarmer className="text-6xl text-green-700 mb-2 drop-shadow" />
        <h2 className="text-4xl font-extrabold text-green-800 text-center drop-shadow-lg">
          Welcome, Farmer!
        </h2>
        <p className="text-lg text-green-700 mt-2 text-center font-medium">
          Manage your crops, contracts, and get smart insights for your farm.
        </p>
      </div>

      {/* Tabs */}
      <div className="flex flex-wrap gap-4 mb-10 justify-center">
        <button
          onClick={() => setTab("contracts")}
          className={`px-6 py-2 rounded-xl font-semibold shadow transition flex items-center gap-2 ${
            tab === "contracts"
              ? "bg-green-600 text-white scale-105"
              : "bg-gray-200 text-green-700 hover:bg-green-100"
          }`}
        >
          <FaSeedling className="text-xl" /> Contract Offers
        </button>
        <button
          onClick={() => setTab("ai")}
          className={`px-6 py-2 rounded-xl font-semibold shadow transition flex items-center gap-2 ${
            tab === "ai"
              ? "bg-green-600 text-white scale-105"
              : "bg-gray-200 text-green-700 hover:bg-green-100"
          }`}
        >
          <GiPlantRoots className="text-xl" /> AI Matching
        </button>
        <button
          onClick={() => setTab("price")}
          className={`px-6 py-2 rounded-xl font-semibold shadow transition flex items-center gap-2 ${
            tab === "price"
              ? "bg-green-600 text-white scale-105"
              : "bg-gray-200 text-green-700 hover:bg-green-100"
          }`}
        >
          <GiFarmer className="text-xl" /> Price Prediction
        </button>
      </div>

      {/* Tab Content */}
      <div className="mb-10">
        {tab === "contracts" && <ContractOffers />}
        {tab === "ai" && <AIMatching />}
        {tab === "price" && <PricePrediction />}
      </div>

      {/* Crops Section */}
      <div className="bg-white rounded-2xl shadow-xl p-6 mb-8 flex flex-col items-center w-full">
        <div className="flex justify-between items-center w-full mb-4">
          <h3 className="text-2xl font-bold text-green-700 flex items-center gap-2">
            <FaSeedling className="text-green-500" /> Your Crops
          </h3>
          <button
            onClick={() => navigate("/farmer/add-crop")} // ✅ redirect to new page
            className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg shadow"
          >
            Add Crop
          </button>
        </div>

        {/* Crops List */}
        {myCrops.length === 0 ? (
          <div className="text-yellow-700 font-semibold text-center">
            You have not added any crops yet. Start by adding your first crop!
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full">
            {myCrops.map((crop) => (
              <CropCard
                key={crop._id}
                crop={crop}
                dashboardType="farmer"
                onBidAction={fetchCrops}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
