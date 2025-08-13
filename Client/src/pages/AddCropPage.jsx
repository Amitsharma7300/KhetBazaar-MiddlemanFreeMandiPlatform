import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../api/axios";
import { useAuth } from "../context/AuthContext";
import {
  FaSeedling,
  FaRupeeSign,
  FaMapMarkerAlt,
  FaLeaf,
  FaWarehouse,
  FaCalendarAlt,
  FaTractor,
  FaWater,
  FaMountain,
  FaInfoCircle,
  FaClipboardList,
  FaImage,
} from "react-icons/fa";

export default function AddCropPage() {
  const [form, setForm] = useState({
    title: "",
    cropType: "",
    variety: "",
    grade: "",
    quantity: "",
    unit: "kg",
    price: "",
    harvestDate: "",
    location: "",
    mandiName: "",
    district: "",
    state: "",
    irrigationType: "",
    soilType: "",
    moistureContent: "",
    qualityGrade: "",
    storageCondition: "",
    organic: false,
    description: "",
    image: "",
  });

  const { token } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios.post("/crops", form, {
      headers: { Authorization: `Bearer ${token}` },
    });
    navigate("/farmer");
  };

  const Section = ({ icon, title, children }) => (
    <div className="bg-emerald-50/80 backdrop-blur-md rounded-xl shadow-sm border border-emerald-200 p-5 space-y-4 hover:shadow-md transition-shadow">
      <h3 className="text-lg font-semibold text-emerald-800 flex items-center gap-2">
        {icon} {title}
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">{children}</div>
    </div>
  );

  const Input = ({ label, icon, ...props }) => (
    <div className="space-y-1">
      <label className="text-sm font-medium text-emerald-900 flex items-center gap-1">
        {icon} {label}
      </label>
      <input
        {...props}
        className="border border-emerald-200 p-3 rounded-lg w-full outline-none focus:ring-2 focus:ring-emerald-400 bg-white/90 transition"
      />
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-emerald-100 py-10 px-4">
      <form
        onSubmit={handleSubmit}
        className="max-w-5xl mx-auto space-y-8"
      >
        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-emerald-900 flex items-center justify-center gap-2">
            <FaSeedling /> Add New Crop
          </h2>
          <p className="text-emerald-600 mt-1">
            Provide detailed information to attract the best buyers
          </p>
        </div>

        {/* Basic Details */}
        <Section icon={<FaTractor />} title="Basic Details">
          <Input label="Crop Title" name="title" value={form.title} onChange={handleChange} icon={<FaClipboardList />} placeholder="Enter crop name" />
          <Input label="Crop Type" name="cropType" value={form.cropType} onChange={handleChange} icon={<FaSeedling />} placeholder="e.g. Wheat, Rice" />
          <Input label="Variety" name="variety" value={form.variety} onChange={handleChange} icon={<FaInfoCircle />} placeholder="e.g. Basmati" />
          <Input label="Grade" name="grade" value={form.grade} onChange={handleChange} icon={<FaWarehouse />} placeholder="A, B, Premium" />
        </Section>

        {/* Quantity & Price */}
        <Section icon={<FaRupeeSign />} title="Quantity & Pricing">
          <Input type="number" label="Quantity" name="quantity" value={form.quantity} onChange={handleChange} icon={<FaClipboardList />} placeholder="Enter quantity" />
          <div>
            <label className="text-sm font-medium text-emerald-900">Unit</label>
            <select
              name="unit"
              value={form.unit}
              onChange={handleChange}
              className="border border-emerald-200 p-3 rounded-lg w-full outline-none focus:ring-2 focus:ring-emerald-400 bg-white/90"
            >
              <option value="kg">Kilograms</option>
              <option value="ton">Tons</option>
              <option value="quintal">Quintals</option>
            </select>
          </div>
          <Input type="number" label="Price per Unit" name="price" value={form.price} onChange={handleChange} icon={<FaRupeeSign />} placeholder="Enter price" />
        </Section>

        {/* Harvest & Location */}
        <Section icon={<FaCalendarAlt />} title="Harvest & Location">
          <Input type="date" label="Harvest Date" name="harvestDate" value={form.harvestDate} onChange={handleChange} icon={<FaCalendarAlt />} />
          <Input label="Location" name="location" value={form.location} onChange={handleChange} icon={<FaMapMarkerAlt />} placeholder="Village/City" />
          <Input label="Mandi Name" name="mandiName" value={form.mandiName} onChange={handleChange} icon={<FaWarehouse />} placeholder="Nearest mandi" />
          <Input label="District" name="district" value={form.district} onChange={handleChange} icon={<FaMapMarkerAlt />} placeholder="District" />
          <Input label="State" name="state" value={form.state} onChange={handleChange} icon={<FaMapMarkerAlt />} placeholder="State" />
        </Section>

        {/* Agronomic Info */}
        <Section icon={<FaWater />} title="Agronomic Information">
          <Input label="Irrigation Type" name="irrigationType" value={form.irrigationType} onChange={handleChange} icon={<FaWater />} placeholder="e.g. Drip, Flood" />
          <Input label="Soil Type" name="soilType" value={form.soilType} onChange={handleChange} icon={<FaMountain />} placeholder="e.g. Loamy" />
          <Input type="number" label="Moisture Content (%)" name="moistureContent" value={form.moistureContent} onChange={handleChange} icon={<FaWater />} placeholder="%" />
        </Section>

        {/* Quality & Storage */}
        <Section icon={<FaWarehouse />} title="Quality & Storage">
          <Input label="Quality Grade" name="qualityGrade" value={form.qualityGrade} onChange={handleChange} icon={<FaWarehouse />} placeholder="Quality grade" />
          <Input label="Storage Condition" name="storageCondition" value={form.storageCondition} onChange={handleChange} icon={<FaWarehouse />} placeholder="e.g. Cold storage" />
        </Section>

        {/* Organic Checkbox */}
        <div className="bg-emerald-50/80 backdrop-blur-md p-5 rounded-xl border border-emerald-200 shadow-sm flex items-center gap-3">
          <input
            type="checkbox"
            name="organic"
            checked={form.organic}
            onChange={handleChange}
            className="w-5 h-5 text-emerald-600 focus:ring-emerald-400"
          />
          <label className="text-emerald-900 font-medium flex items-center gap-1">
            <FaLeaf /> Organic Produce
          </label>
        </div>

        {/* Description & Image */}
        <Section icon={<FaInfoCircle />} title="Description & Media">
          <div className="md:col-span-2">
            <label className="text-sm font-medium text-emerald-900 flex items-center gap-1">
              <FaInfoCircle /> Description
            </label>
            <textarea
              name="description"
              value={form.description}
              onChange={handleChange}
              placeholder="Enter crop description"
              className="border border-emerald-200 p-3 rounded-lg w-full outline-none focus:ring-2 focus:ring-emerald-400 bg-white/90 min-h-[100px]"
            />
          </div>
          <Input label="Image URL" name="image" value={form.image} onChange={handleChange} icon={<FaImage />} placeholder="Paste image link" />
        </Section>

        {/* Submit */}
        <div className="text-center">
          <button
            type="submit"
            className="px-10 py-4 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold rounded-lg shadow-md transform transition hover:scale-105"
          >
            Add Crop 🚜
          </button>
        </div>
      </form>
    </div>
  );
}
