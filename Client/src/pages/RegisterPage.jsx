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
import { Helmet } from "react-helmet-async";

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
    <>
      {/* SEO Meta */}
      <Helmet>
        <title>Register - MandiFree | Farmer & Buyer Platform</title>
        <meta
          name="description"
          content="Register on MandiFree to connect directly with farmers and buyers without middlemen. Secure, fast, and transparent agricultural marketplace."
        />
        <meta name="keywords" content="mandi register, farmer register, buyer register, agriculture platform, mandi free" />
      </Helmet>

      <div className="min-h-[80vh] flex items-center justify-center bg-gradient-to-br from-green-300 via-green-100 to-white p-4">
        <form
          className="w-full max-w-md bg-white/50 backdrop-blur-lg rounded-2xl shadow-2xl p-8 border border-green-200/50 transform transition-all duration-300 hover:shadow-green-300"
          aria-label="Register Form"
        >
          <h1 className="text-3xl font-extrabold text-green-800 mb-6 text-center tracking-wider">
            🌱 Register for <span className="text-green-900">MandiFree</span>
          </h1>

          {error && <ErrorMsg message={error} />}

          <InputField icon={<FiUser />} placeholder="Full Name" name="name" value={form.name} onChange={handleChange} />
          <InputField icon={<FiMail />} placeholder="Email Address" type="email" name="email" value={form.email} onChange={handleChange} />
          <InputField icon={<FiPhone />} placeholder="Mobile Number" type="tel" name="mobile" value={form.mobile} onChange={handleChange} pattern="\d{10}" title="Enter a valid 10-digit mobile number" />
          <InputField icon={<FiCreditCard />} placeholder="Aadhaar Number" name="aadhaar" value={form.aadhaar} onChange={handleChange} pattern="\d{12}" title="Enter a valid 12-digit Aadhaar number" />
          <InputField icon={<FiCreditCard />} placeholder="PAN Number" name="pan" value={form.pan} onChange={handleChange} pattern="[A-Z]{5}[0-9]{4}[A-Z]{1}" title="Enter a valid PAN number" />
          <InputField icon={<FiHome />} placeholder="Address" name="address" value={form.address} onChange={handleChange} />

          <div className="mb-4 relative">
            <span className="absolute left-3 top-3 text-green-600"><FiLock /></span>
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              value={form.password}
              onChange={handleChange}
              placeholder="Password"
              className="pl-10 pr-10 border border-green-300 rounded-lg px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-green-400 transition-all duration-200 placeholder-green-400 bg-white/70"
              required
            />
            {form.password.length > 0 && (
              <button type="button" onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-3 text-green-600 hover:text-green-800"
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? <FiEyeOff /> : <FiEye />}
              </button>
            )}
          </div>

          {/* Role */}
          <div className="mb-6 relative">
            <FiUserCheck className="absolute left-3 top-3 text-green-600" />
            <select name="role" value={form.role} onChange={handleChange}
              className="pl-10 pr-10 border border-green-300 rounded-lg px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-green-400 transition-all duration-200 bg-white/70 appearance-none cursor-pointer"
              aria-label="Select role"
            >
              <option value="buyer">🛒 Buyer</option>
              <option value="farmer">🌾 Farmer</option>
            </select>
            <span className="absolute right-3 top-3 text-green-500 pointer-events-none">▼</span>
          </div>

          {!otpSent ? (
            <button onClick={handleSendOtp} className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-2.5 rounded-lg" disabled={loading}>
              {loading ? "Sending OTP..." : "Send OTP"}
            </button>
          ) : (
            <div className="mt-4">
              <div className="mb-6 text-center">
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
                  className="mx-auto text-center text-xl font-bold tracking-widest w-40 border-2 border-green-400 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 placeholder-green-400 bg-green-50 transition-all duration-200"
                  required
                />
              </div>
              <button onClick={handleVerifyOtp} className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-2.5 rounded-lg shadow-md transition-all duration-200 transform hover:scale-105" disabled={loading}>
                {loading ? "Verifying OTP..." : "Verify OTP"}
              </button>
            </div>
          )}
        </form>
      </div>
    </>
  );
}

function InputField({ icon, placeholder, type = "text", name, value, onChange, pattern, title }) {
  return (
    <div className="mb-4 relative">
      {icon && <span className="absolute left-3 top-3 text-green-600">{icon}</span>}
      <input
        className="pl-10 border border-green-300 rounded-lg px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-green-400 transition-all duration-200 placeholder-green-400 bg-white/70"
        placeholder={placeholder}
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        pattern={pattern}
        title={title}
        required
        aria-label={placeholder}
      />
    </div>
  );
}

function ErrorMsg({ message }) {
  return (
    <div role="alert" className="mb-4 text-red-700 bg-red-50 border border-red-200 rounded-lg px-3 py-2 text-sm text-center shadow-sm">
      {message}
    </div>
  );
}
