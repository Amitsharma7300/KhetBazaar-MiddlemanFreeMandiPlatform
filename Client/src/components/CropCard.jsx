import { useState } from "react";
import api from "../api/axios";
import { useAuth } from "../context/AuthContext";
import LogisticsForm from "./LogisticsForm";

export default function CropCard({ crop, dashboardType, isBuyer, onBidAction }) {
  const { token, user } = useAuth();
  const [actionLoading, setActionLoading] = useState(null);
  const [showBidForm, setShowBidForm] = useState(false);
  const [bidAmount, setBidAmount] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const bids = crop.bids || [];
  const myBid = bids.find((bid) => bid.buyer?._id === user?._id);

  const acceptedBidId = bids.find((bid) => bid.status === "accepted")?._id;

  const displayBids =
    dashboardType === "buyer"
      ? bids.filter((bid) => bid.buyer?._id === user?._id)
      : bids;

  const handleBidAction = async (bidId, action) => {
    setActionLoading(bidId + action);
    try {
      await api.post(
        `/crops/${crop._id}/bids/${bidId}/${action}`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setActionLoading(null);
      if (onBidAction) onBidAction();
    } catch (err) {
      setActionLoading(null);
      alert("Failed to update bid status.");
    }
  };

  const handleBid = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      await api.post(
        `/crops/${crop._id}/bid`,
        { amount: bidAmount },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setShowBidForm(false);
      setBidAmount("");
      if (onBidAction) onBidAction();
    } catch (err) {
      setError("Failed to place bid.");
    }
    setLoading(false);
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-5 space-y-3">
      {/* Title */}
      <h2 className="text-lg font-semibold">{crop.title}</h2>

      {/* Basic Crop Info */}
      <div className="flex flex-wrap gap-2 text-sm">
        <span className="bg-green-50 px-2 py-1 rounded">Type: <b>{crop.cropType}</b></span>
        {crop.variety && <span className="bg-purple-50 px-2 py-1 rounded">Variety: <b>{crop.variety}</b></span>}
        {crop.grade && <span className="bg-pink-50 px-2 py-1 rounded">Grade: <b>{crop.grade}</b></span>}
        <span className="bg-green-50 px-2 py-1 rounded">Quantity: <b>{crop.quantity} {crop.unit || "kg"}</b></span>
        <span className="bg-blue-50 px-2 py-1 rounded">Price: <b>₹{crop.price}/{crop.unit || "kg"}</b></span>
        {crop.location && <span className="bg-yellow-50 px-2 py-1 rounded">Location: <b>{crop.location}</b></span>}
        {crop.irrigationType && <span className="bg-teal-50 px-2 py-1 rounded">Irrigation: <b>{crop.irrigationType}</b></span>}
        {crop.soilType && <span className="bg-orange-50 px-2 py-1 rounded">Soil: <b>{crop.soilType}</b></span>}
        {crop.storage && <span className="bg-gray-50 px-2 py-1 rounded">Storage: <b>{crop.storage}</b></span>}
        {crop.moistureContent !== undefined && (
          <span className="bg-cyan-50 px-2 py-1 rounded">Moisture: <b>{crop.moistureContent}%</b></span>
        )}
      </div>

      {/* Harvest Date */}
      {crop.harvestDate && (
        <p className="text-gray-500">Harvest Date: <b>{new Date(crop.harvestDate).toLocaleDateString()}</b></p>
      )}

      {/* Organic & Description */}
      {crop.organic && <p className="text-green-600 font-semibold">🌱 Organic</p>}
      {crop.description && <p className="text-gray-700">{crop.description}</p>}

      {/* Date Posted */}
      {crop.datePosted && (
        <p className="text-xs text-gray-400">Posted on: {new Date(crop.datePosted).toLocaleDateString()}</p>
      )}

      {/* Bid Button */}
      {dashboardType === "buyer" && !myBid && (
        <div className="mt-2">
          <button
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
            onClick={() => setShowBidForm(true)}
          >
            Bid
          </button>
        </div>
      )}

      {/* Bid Form */}
      {showBidForm && (
        <form onSubmit={handleBid} className="mt-2 bg-gray-100 p-3 rounded">
          <label>
            Bid Amount (₹):{" "}
            <input
              type="number"
              value={bidAmount}
              onChange={(e) => setBidAmount(e.target.value)}
              required
              min={1}
              className="border px-2 py-1 rounded"
            />
          </label>
          <button
            type="submit"
            className="ml-2 bg-green-600 text-white px-3 py-1 rounded"
            disabled={loading}
          >
            {loading ? "Bidding..." : "Submit Bid"}
          </button>
          <button
            type="button"
            className="ml-2 text-red-600"
            onClick={() => setShowBidForm(false)}
          >
            Cancel
          </button>
          {error && <div className="text-red-600 mt-1">{error}</div>}
        </form>
      )}

      {/* Bids */}
      {displayBids.length > 0 && (
        <div className="mt-4">
          <h3 className="font-semibold mb-2">Bids:</h3>
          <ul className="space-y-2">
            {displayBids.map((bid) => {
              let status = bid.status;
              if (acceptedBidId) {
                status = bid._id === acceptedBidId ? "accepted" : "rejected";
              }
              return (
                <li key={bid._id} className="flex items-center justify-between bg-gray-50 p-2 rounded">
                  <span>
                    ₹{bid.amount} by {bid.buyer?.name || "You"}
                    <span
                      className={`ml-2 px-2 py-1 rounded text-xs ${
                        status === "accepted"
                          ? "bg-green-200 text-green-800"
                          : status === "rejected"
                          ? "bg-red-200 text-red-800"
                          : "bg-gray-200 text-gray-800"
                      }`}
                    >
                      {status === "accepted"
                        ? "Accepted"
                        : status === "rejected"
                        ? "Rejected"
                        : "Pending"}
                    </span>
                    {bid.createdAt && (
                      <span className="ml-2 text-xs text-gray-500">
                        Placed: {new Date(bid.createdAt).toLocaleString()}
                      </span>
                    )}
                  </span>
                  {dashboardType === "farmer" &&
                    status === "pending" &&
                    !acceptedBidId && (
                      <div className="flex gap-2">
                        <button
                          className="bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700"
                          disabled={actionLoading === bid._id + "accept"}
                          onClick={() => handleBidAction(bid._id, "accept")}
                        >
                          {actionLoading === bid._id + "accept" ? "Accepting..." : "Accept"}
                        </button>
                        <button
                          className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700"
                          disabled={actionLoading === bid._id + "reject"}
                          onClick={() => handleBidAction(bid._id, "reject")}
                        >
                          {actionLoading === bid._id + "reject" ? "Rejecting..." : "Reject"}
                        </button>
                      </div>
                    )}
                </li>
              );
            })}
          </ul>
        </div>
      )}

      {/* Logistics Details */}
      {crop.logistics && (
        <div className="mt-4 bg-blue-50 p-3 rounded">
          <h3 className="font-semibold mb-2">Logistics Details:</h3>
          <div><b>Status:</b> {crop.logistics.status}</div>
          <div><b>Pickup Location:</b> {crop.logistics.pickupLocation}</div>
          <div><b>Delivery Location:</b> {crop.logistics.deliveryLocation}</div>
          <div>
            <b>Expected Delivery Date:</b>{" "}
            {crop.logistics.expectedDate && new Date(crop.logistics.expectedDate).toLocaleString()}
          </div>
          <div><b>Payment Mode:</b> {crop.logistics.paymentMode}</div>
          <div><b>Buyer Name:</b> {crop.logistics.name}</div>
          <div><b>Buyer Mobile:</b> {crop.logistics.mobile}</div>
        </div>
      )}

      {/* Logistics Form */}
      {dashboardType === "buyer" && myBid && myBid.status === "accepted" && !crop.logistics && (
        <LogisticsForm
          crop={crop}
          bid={myBid}
          onBooked={() => {
            if (onBidAction) onBidAction();
          }}
        />
      )}
    </div>
  );
}
