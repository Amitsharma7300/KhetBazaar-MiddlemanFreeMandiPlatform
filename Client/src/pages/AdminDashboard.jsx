import { useEffect, useState } from "react";
import { FaBan, FaChartBar, FaLock, FaMapMarkerAlt, FaSeedling, FaUnlock, FaUsers } from "react-icons/fa";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Legend,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis, YAxis
} from "recharts";
import api from "../api/axios";
import { useAuth } from "../context/AuthContext";

export default function AdminDashboard() {
  const { token } = useAuth();
  const [users, setUsers] = useState([]);
  const [crops, setCrops] = useState([]);
  const [analytics, setAnalytics] = useState({});
  const [locationData, setLocationData] = useState([]);
  const [typeData, setTypeData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [tab, setTab] = useState("analytics");

  useEffect(() => {
    const fetchData = async () => {
      const [usersRes, cropsRes, analyticsRes, locationRes, typeRes] = await Promise.all([
        api.get("/admin/users", { headers: { Authorization: `Bearer ${token}` } }),
        api.get("/admin/crops", { headers: { Authorization: `Bearer ${token}` } }),
        api.get("/admin/analytics", { headers: { Authorization: `Bearer ${token}` } }),
        api.get("/admin/location-analytics", { headers: { Authorization: `Bearer ${token}` } }),
        api.get("/admin/type-analytics", { headers: { Authorization: `Bearer ${token}` } }),
      ]);
      setUsers(usersRes.data);
      setCrops(cropsRes.data);
      setAnalytics(analyticsRes.data);
      setLocationData(locationRes.data.map(loc => ({
        name: loc._id || "Unknown",
        value: loc.count
      })));
      setTypeData(typeRes.data.map(type => ({
        name: type._id || "Unknown",
        value: type.count
      })));
      setLoading(false);
    };
    fetchData();
  }, [token]);

  const handleBlockUser = async (id) => {
    await api.patch(`/admin/users/${id}/block`, {}, { headers: { Authorization: `Bearer ${token}` } });
    setUsers(users => users.map(u => u._id === id ? { ...u, blocked: true } : u));
  };

  const handleUnblockUser = async (id) => {
    await api.patch(`/admin/users/${id}/unblock`, {}, { headers: { Authorization: `Bearer ${token}` } });
    setUsers(users => users.map(u => u._id === id ? { ...u, blocked: false } : u));
  };

  const handleBlockCrop = async (id) => {
    await api.patch(`/admin/crops/${id}/block`, {}, { headers: { Authorization: `Bearer ${token}` } });
    setCrops(crops => crops.map(c => c._id === id ? { ...c, status: "blocked" } : c));
  };

  const analyticsData = [
    { name: "Crops", value: analytics.totalCrops || 0 },
    { name: "Volume", value: analytics.totalVolume || 0 },
    { name: "Revenue", value: analytics.revenue || 0 },
  ];

  const COLORS = ["#16a34a", "#2563eb", "#f59e42"];

  if (loading) return <div className="p-8 text-center">Loading...</div>;

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <h2 className="text-4xl font-extrabold mb-8 text-green-800 flex items-center gap-3">
        <FaChartBar className="text-green-600" /> Admin Dashboard
      </h2>
      <div className="flex gap-4 mb-8">
        <button onClick={() => setTab("analytics")} className={`flex items-center gap-2 px-5 py-2 rounded-lg font-semibold shadow transition ${tab === "analytics" ? "bg-green-600 text-white scale-105" : "bg-gray-100 hover:bg-green-50 text-green-700"}`}>
          <FaChartBar /> Analytics
        </button>
        <button onClick={() => setTab("users")} className={`flex items-center gap-2 px-5 py-2 rounded-lg font-semibold shadow transition ${tab === "users" ? "bg-green-600 text-white scale-105" : "bg-gray-100 hover:bg-green-50 text-green-700"}`}>
          <FaUsers /> Users
        </button>
        <button onClick={() => setTab("crops")} className={`flex items-center gap-2 px-5 py-2 rounded-lg font-semibold shadow transition ${tab === "crops" ? "bg-green-600 text-white scale-105" : "bg-gray-100 hover:bg-green-50 text-green-700"}`}>
          <FaSeedling /> Crops
        </button>
      </div>

      {tab === "analytics" && (
        <div className="mb-10">
          <h3 className="text-2xl font-bold mb-6 text-green-700 flex items-center gap-2">
            <FaChartBar /> Platform Analytics
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Bar Chart Card */}
            <div className="bg-gradient-to-br from-green-50 to-blue-50 rounded-2xl shadow-lg p-6 flex flex-col items-center">
              <h4 className="text-lg font-semibold mb-4 text-green-800">Overview</h4>
              <ResponsiveContainer width="100%" height={250}>
                <BarChart data={analyticsData} barSize={50}>
                  <defs>
                    <linearGradient id="barGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#16a34a" stopOpacity={0.8} />
                      <stop offset="100%" stopColor="#2563eb" stopOpacity={0.7} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" tick={{ fontWeight: 600, fill: "#166534" }} />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="value" fill="url(#barGradient)" radius={[10, 10, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
            {/* Pie Chart Card */}
            <div className="bg-gradient-to-br from-yellow-50 to-green-50 rounded-2xl shadow-lg p-6 flex flex-col items-center">
              <h4 className="text-lg font-semibold mb-4 text-yellow-700">Distribution</h4>
              <ResponsiveContainer width="100%" height={250}>
                <PieChart>
                  <Pie
                    data={analyticsData}
                    dataKey="value"
                    nameKey="name"
                    cx="50%"
                    cy="50%"
                    outerRadius={80}
                    innerRadius={40}
                    label={({ name, percent }) =>
                      `${name}: ${(percent * 100).toFixed(0)}%`
                    }
                  >
                    {analyticsData.map((entry, idx) => (
                      <Cell key={`cell-${idx}`} fill={COLORS[idx % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Location Analytics Section */}
          <div className="mt-10">
            <h3 className="text-2xl font-bold mb-6 text-green-700 flex items-center gap-2">
              <FaMapMarkerAlt /> Location Analytics
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Location Pie Chart Card */}
              <div className="bg-gradient-to-br from-red-50 to-yellow-50 rounded-2xl shadow-lg p-6 flex flex-col items-center">
                <h4 className="text-lg font-semibold mb-4 text-red-700">User Distribution by Location</h4>
                <ResponsiveContainer width="100%" height={250}>
                  <PieChart>
                    <Pie
                      data={locationData}
                      dataKey="value"
                      nameKey="name"
                      cx="50%"
                      cy="50%"
                      outerRadius={80}
                      innerRadius={40}
                      label={({ name, percent }) =>
                        `${name}: ${(percent * 100).toFixed(0)}%`
                      }
                    >
                      {locationData.map((entry, idx) => (
                        <Cell key={`cell-${idx}`} fill={COLORS[idx % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>

          {/* Type Analytics Section */}
          <div className="mt-10">
            <h3 className="text-2xl font-bold mb-6 text-green-700 flex items-center gap-2">
              <FaSeedling /> Crop Type Analytics
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Type Pie Chart Card */}
              <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl shadow-lg p-6 flex flex-col items-center">
                <h4 className="text-lg font-semibold mb-4 text-purple-700">Crop Distribution by Type</h4>
                <ResponsiveContainer width="100%" height={250}>
                  <PieChart>
                    <Pie
                      data={typeData}
                      dataKey="value"
                      nameKey="name"
                      cx="50%"
                      cy="50%"
                      outerRadius={80}
                      innerRadius={40}
                      label={({ name, percent }) =>
                        `${name}: ${(percent * 100).toFixed(0)}%`
                      }
                    >
                      {typeData.map((entry, idx) => (
                        <Cell key={`cell-${idx}`} fill={COLORS[idx % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        </div>
      )}
{tab === "users" && (
  <div>
    <h3 className="text-2xl font-bold mb-6 text-green-700 flex items-center gap-2">
      <FaUsers /> All Users
    </h3>
    <div className="overflow-x-auto rounded-xl shadow">
      <table className="w-full bg-white">
        <thead>
          <tr className="bg-green-100 text-green-900">
            <th className="p-3">#</th>
            <th className="p-3">Avatar</th>
            <th className="p-3">Name</th>
            <th className="p-3">Email</th>
            <th className="p-3">Mobile</th>
            <th className="p-3">Aadhaar</th>
            <th className="p-3">PAN</th>
            <th className="p-3">Role</th>
            <th className="p-3">Blocked</th>
            <th className="p-3">Joined</th>
            <th className="p-3">Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((u, idx) => (
            <tr key={u._id} className="border-b hover:bg-green-50 transition">
              <td className="p-3 text-gray-500">{idx + 1}</td>
              <td className="p-3">
                <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center text-green-700 font-bold text-lg shadow-inner">
                  {u.name?.[0]?.toUpperCase() || "U"}
                </div>
              </td>
              <td className="p-3 font-semibold">{u.name}</td>
              <td className="p-3">{u.email}</td>
              <td className="p-3">{u.mobile || "—"}</td>
              <td className="p-3">{u.aadhaarNumber || "—"}</td>
              <td className="p-3">{u.panNumber || "—"}</td>
              <td className="p-3">
                <span className={`px-2 py-1 rounded-full text-xs font-bold
                  ${u.role === "admin" ? "bg-yellow-200 text-yellow-800" :
                    u.role === "farmer" ? "bg-green-200 text-green-800" :
                    "bg-blue-200 text-blue-800"}`}>
                  {u.role}
                </span>
              </td>
              <td className="p-3">
                {u.blocked
                  ? <span className="bg-red-100 text-red-700 px-2 py-1 rounded-full text-xs font-bold flex items-center gap-1"><FaBan /> Blocked</span>
                  : <span className="bg-green-100 text-green-700 px-2 py-1 rounded-full text-xs font-bold">Active</span>
                }
              </td>
              <td className="p-3 text-gray-500">
                {u.createdAt ? new Date(u.createdAt).toLocaleDateString() : "—"}
              </td>
              <td className="p-3">
                {u.blocked ? (
                  <button
                    onClick={() => handleUnblockUser(u._id)}
                    className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded flex items-center gap-1"
                  >
                    <FaUnlock /> Unblock
                  </button>
                ) : (
                  <button
                    onClick={() => handleBlockUser(u._id)}
                    className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded flex items-center gap-1"
                  >
                    <FaLock /> Block
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
)}


    {tab === "crops" && (
  <div>
    <h3 className="text-2xl font-bold mb-6 text-green-700 flex items-center gap-2">
      <FaSeedling /> All Crops
    </h3>
    <div className="overflow-x-auto rounded-2xl shadow-lg">
      <table className="w-full bg-white">
        <thead>
          <tr className="bg-gradient-to-r from-green-100 to-green-200 text-green-900">
            <th className="p-4">#</th>
            <th className="p-4">Image</th>
            <th className="p-4">Title</th>
            
            <th className="p-4">Variety</th>
            <th className="p-4">Grade</th>
            <th className="p-4">Quantity (kg)</th>
            <th className="p-4">Price / Unit</th>
            <th className="p-4">Harvest Date</th>
            <th className="p-4">Location</th>
            <th className="p-4">Logistics</th>
            <th className="p-4">Status</th>
            <th className="p-4">Farmer</th>
            <th className="p-4">Actions</th>
          </tr>
        </thead>
        <tbody>
          {crops.map((crop, idx) => (
            <tr
              key={crop._id}
              className="border-b hover:bg-green-50 transition-all duration-200"
            >
              <td className="p-4 text-gray-400 font-bold">{idx + 1}</td>
              <td className="p-4">
                <div className="w-16 h-12 rounded-xl overflow-hidden shadow-md border-2 border-green-200 bg-green-50 flex items-center justify-center">
                  <img
                    src={
                      crop.image && crop.image.trim() !== ""
                        ? crop.image
                        : "https://via.placeholder.com/60x40?text=Crop"
                    }
                    alt={crop.title}
                    className="w-full h-full object-cover"
                  />
                </div>
              </td>
              <td className="p-4 font-semibold text-green-800">{crop.title}</td>
              
              <td className="p-4">{crop.variety}</td>
              <td className="p-4">{crop.grade}</td>
              <td className="p-4">{crop.quantity} kg</td>
              <td className="p-4 font-medium text-green-700">₹{crop.price}</td>
              <td className="p-4">
                {crop.harvestDate
                  ? new Date(crop.harvestDate).toLocaleDateString()
                  : "—"}
              </td>
              <td className="p-4">{crop.location}</td>
              <td className="p-4 text-sm">
                {crop.logisticsRequired ? (
                  <div className="flex flex-col text-green-700">
                    <span>🚚 {crop.transportType || "N/A"}</span>
                    <span>📦 {crop.storageType || "N/A"}</span>
                  </div>
                ) : (
                  <span className="text-gray-400">No</span>
                )}
              </td>
              <td className="p-4">
                <span
                  className={`
                    px-3 py-1 rounded-full text-xs font-bold shadow-sm
                    ${
                      crop.status === "blocked"
                        ? "bg-red-100 text-red-700"
                        : crop.status === "open"
                        ? "bg-green-100 text-green-700"
                        : "bg-yellow-100 text-yellow-700"
                    }
                  `}
                >
                  {crop.status}
                </span>
              </td>
              <td className="p-4">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-green-200 flex items-center justify-center font-bold text-green-800 shadow-inner">
                    {crop.farmer?.name?.[0]?.toUpperCase() || "F"}
                  </div>
                  <span className="text-sm">{crop.farmer?.name}</span>
                </div>
              </td>
              <td className="p-4">
                {crop.status === "blocked" ? (
                  <span className="text-red-500 font-semibold flex items-center gap-1">
                    <FaBan /> Blocked
                  </span>
                ) : (
                  <button
                    onClick={() => handleBlockCrop(crop._id)}
                    className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded flex items-center gap-1 shadow"
                  >
                    <FaBan /> Block
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
)}

    </div>
  );
}
