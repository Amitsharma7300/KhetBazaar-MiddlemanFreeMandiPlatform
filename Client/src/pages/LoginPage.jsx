import { useState } from "react";
import axios from "axios";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { FaEnvelope, FaLock, FaEye, FaEyeSlash } from "react-icons/fa";

export default function LoginPage() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false); // 👈 added
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const res = await axios.post("http://localhost:5000/api/auth/login", form);
      login(res.data.user, res.data.token);
      navigate(`/${res.data.user.role}`);
    } catch (err) {
      setError("Invalid email or password.");
    }
    setLoading(false);
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center bg-gradient-to-br from-green-300 via-green-100 to-white p-4">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md bg-white/50 backdrop-blur-lg rounded-2xl shadow-2xl p-8 border border-green-200/50 transform transition-all duration-300 hover:shadow-green-300"
      >
        <h2 className="text-3xl font-extrabold text-green-800 mb-6 text-center tracking-wider">
          🌱 Login to <span className="text-green-900">MandiFree</span>
        </h2>

        {error && (
          <div className="mb-4 text-red-700 bg-red-50 border border-red-200 rounded-lg px-3 py-2 text-sm text-center shadow-sm">
            {error}
          </div>
        )}

        {/* Email */}
        <div className="mb-4 relative">
          <FaEnvelope className="absolute left-3 top-3 text-green-600" />
          <input
            className="pl-10 border border-green-300 rounded-lg px-4 py-2 w-full 
                       focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-green-400 
                       transition-all duration-200 placeholder-green-400 bg-white/70"
            placeholder="Enter your email"
            type="email"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            required
          />
        </div>

        {/* Password with press-to-see */}
<div className="mb-6 relative">
  <FaLock className="absolute left-3 top-3 text-green-600" />
  <input
    className="pl-10 pr-10 border border-green-300 rounded-lg px-4 py-2 w-full 
               focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-green-400 
               transition-all duration-200 placeholder-green-400 bg-white/70"
    placeholder="Enter your password"
    type={showPassword ? "text" : "password"}
    value={form.password}
    onChange={(e) => setForm({ ...form, password: e.target.value })}
    required
  />
  
  {/* Show eye only if password has text */}
  {form.password.length > 0 && (
    <button
      type="button"
      onMouseDown={() => setShowPassword(true)}
      onMouseUp={() => setShowPassword(false)}
      onMouseLeave={() => setShowPassword(false)}
      onTouchStart={() => setShowPassword(true)}
      onTouchEnd={() => setShowPassword(false)}
      className="absolute right-3 top-3 text-green-600 hover:text-green-800"
    >
      {showPassword ? <FaEyeSlash /> : <FaEye />}
    </button>
  )}
</div>


        {/* Submit Button */}
        <button
          className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-2.5 rounded-lg 
                     transition-all duration-300 shadow-md hover:shadow-xl hover:scale-[1.03] active:scale-100"
          disabled={loading}
        >
          {loading ? "Logging in..." : "Login"}
        </button>

        {/* Register Link */}
        <div className="mt-4 text-center text-sm text-green-700">
          Don't have an account?{" "}
          <a
            href="/register"
            className="text-green-900 font-semibold underline hover:text-green-600 transition-colors duration-200"
          >
            Register
          </a>
        </div>
      </form>
    </div>
  );
}
