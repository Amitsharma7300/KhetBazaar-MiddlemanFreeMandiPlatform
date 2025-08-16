import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import api from "../api/axios";
import {
  FiUser,
  FiMail,
  FiLock,
  FiUserCheck,
  FiPhone,
  FiHome,
  FiCreditCard,
  FiEye,
  FiEyeOff,
} from "react-icons/fi";

export default function RegisterPage() {
  const [form, setForm] = useState({
    name: "",
    mobile: "",
    aadhaar: "",
    pan: "",
    address: "",
    email: "",
    password: "",
    role: "buyer",
  });
  const [otp, setOtp] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "aadhaar") {
      const cleaned = value.replace(/\D/g, "");
      if (cleaned.length <= 12) setForm({ ...form, aadhaar: cleaned });
      return;
    }
    if (name === "mobile") {
      const cleaned = value.replace(/\D/g, "");
      if (cleaned.length <= 10) setForm({ ...form, mobile: cleaned });
      return;
    }
    if (name === "pan") {
      const upper = value.toUpperCase();
      if (upper.length <= 10) setForm({ ...form, pan: upper });
      return;
    }
    setForm({ ...form, [name]: value });
  };

  const handleSendOtp = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      await api.post("/api/auth/register", form);
      setOtpSent(true);
    } catch (err) {
      setError(err.response?.data?.message || "Registration failed");
    }
    setLoading(false);
  };

  const handleVerifyOtp = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const res = await api.post("/api/auth/verify-otp", {
        email: form.email,
        otp,
      });
      login(res.data.user, res.data.token);
      navigate(`/${res.data.user.role}`);
    } catch (err) {
      setError(err.response?.data?.message || "Invalid OTP");
    }
    setLoading(false);
  };

  return (
    <div className="min-h-[90vh] flex items-center justify-center bg-gradient-to-br from-green-100 via-white to-green-50 p-6">
      <form className="w-full max-w-3xl bg-white/80 backdrop-blur-lg rounded-3xl shadow-lg p-8 border border-green-200/50 space-y-6">
        <h2 className="text-4xl font-bold text-green-800 text-center mb-4">
          🌱 Register for <span className="text-green-900">KhetBazaar</span>
        </h2>

        {error && <ErrorMsg message={error} />}

        {/* Personal Info */}
        <div>
          <h3 className="text-lg font-semibold text-green-700 mb-3">👤 Personal Information</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <InputField icon={<FiUser />} placeholder="Full Name" name="name" value={form.name} onChange={handleChange} />
            <InputField icon={<FiPhone />} placeholder="Mobile Number" type="tel" name="mobile" value={form.mobile} onChange={handleChange} pattern="\d{10}" title="Enter a valid 10-digit mobile number" />
            <InputField icon={<FiMail />} placeholder="Email Address" type="email" name="email" value={form.email} onChange={handleChange} />
            <InputField icon={<FiHome />} placeholder="Address" name="address" value={form.address} onChange={handleChange} />
          </div>
        </div>

        {/* Identification */}
        <div>
          <h3 className="text-lg font-semibold text-green-700 mb-3">🆔 Identification</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <InputField icon={<FiCreditCard />} placeholder="Aadhaar Number" name="aadhaar" value={form.aadhaar} onChange={handleChange} pattern="\d{12}" title="Enter a valid 12-digit Aadhaar number" />
            <InputField icon={<FiCreditCard />} placeholder="PAN Number" name="pan" value={form.pan} onChange={handleChange} pattern="[A-Z]{5}[0-9]{4}[A-Z]{1}" title="Enter a valid PAN number" />
          </div>
        </div>

        {/* Account Info */}
        <div>
          <h3 className="text-lg font-semibold text-green-700 mb-3">🔑 Account Information</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="relative">
              <span className="absolute left-3 top-3 text-green-600"><FiLock /></span>
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                value={form.password}
                onChange={handleChange}
                placeholder="Password"
                className="pl-10 pr-10 border border-green-300 rounded-lg px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-green-400 placeholder-green-400 bg-white/70"
                required
              />
              {form.password.length > 0 && (
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-3 text-green-600 hover:text-green-800"
                >
                  {showPassword ? <FiEyeOff /> : <FiEye />}
                </button>
              )}
            </div>
            <div className="relative">
              <FiUserCheck className="absolute left-3 top-3 text-green-600" />
              <select
                name="role"
                value={form.role}
                onChange={handleChange}
                className="pl-10 pr-10 border border-green-300 rounded-lg px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-green-400 bg-white/70"
              >
                <option value="buyer">🛒 Buyer</option>
                <option value="farmer">🌾 Farmer</option>
              </select>
              <span className="absolute right-3 top-3 text-green-500 pointer-events-none"></span>
            </div>
          </div>
        </div>

        {/* OTP Section */}
        {!otpSent ? (
          <button
            onClick={handleSendOtp}
            className="w-full bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white font-bold py-3 rounded-xl shadow-md transition-transform transform hover:scale-105"
            disabled={loading}
          >
            {loading ? "Sending OTP..." : "Send OTP"}
          </button>
        ) : (
          <div className="space-y-4">
            <div className="text-center">
              <label className="block text-green-700 font-semibold mb-2">Enter OTP</label>
              <input
                type="text"
                name="otp"
                value={otp}
                onChange={(e) => {
                  const val = e.target.value.replace(/\D/g, "");
                  if (val.length <= 6) setOtp(val);
                }}
                maxLength={6}
                placeholder="6-digit OTP"
                className="mx-auto text-center text-xl font-bold tracking-widest w-44 border-2 border-green-400 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500 bg-green-50"
                required
              />
            </div>
            <button
              onClick={handleVerifyOtp}
              className="w-full bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white font-bold py-3 rounded-xl shadow-md transition-transform transform hover:scale-105"
              disabled={loading}
            >
              {loading ? "Verifying OTP..." : "Verify OTP"}
            </button>
          </div>
        )}
      </form>
    </div>
  );
}

function InputField({ icon, placeholder, type = "text", name, value, onChange, pattern, title }) {
  return (
    <div className="relative">
      {icon && <span className="absolute left-3 top-3 text-green-600">{icon}</span>}
      <input
        className="pl-10 border border-green-300 rounded-lg px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-green-400 placeholder-green-400 bg-white/70 transition-all duration-200"
        placeholder={placeholder}
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        pattern={pattern}
        title={title}
        required
      />
    </div>
  );
}

function ErrorMsg({ message }) {
  return (
    <div className="text-red-700 bg-red-50 border border-red-200 rounded-lg px-3 py-2 text-sm text-center shadow-sm">
      {message}
    </div>
  );
    }
            
