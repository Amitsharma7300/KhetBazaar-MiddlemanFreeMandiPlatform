import { Navigate, Route, Routes, useLocation } from "react-router-dom";

import Navbar from "./components/Navbar";
import { useAuth } from "./context/AuthContext";
import About from "./pages/About";
import AddCropPage from "./pages/AddCropPage";
import BuyerDashboard from "./pages/BuyerDashboard";
import Contact from "./pages/Contact";
import FarmerDashboard from "./pages/FarmerDashboard";
import Home from "./pages/Home";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import AdminDashboard from "./pages/AdminDashboard";
import PrivacyPolicy from "./pages/Privacy&policy";
import Blog from "./pages/Blog";

import Footer from "./components/Footer";
function App() {
  const { user } = useAuth();
  const location = useLocation();

  // List of paths where the footer should be shown
  const showFooter = ["/", "/about", "/contact"].includes(location.pathname);

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      <Navbar />
      <div className="flex-1">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/blogs" element={<Blog />} />
          <Route path="/admin" element={<AdminDashboard/>} />
          <Route
            path="/farmer"
            element={
              user?.role === "farmer" ? (
                <FarmerDashboard />
              ) : (
                <Navigate to="/login" />
              )
            }
          />
          <Route
            path="/farmer/add-crop"
            element={
              user?.role === "farmer" ? <AddCropPage /> : <Navigate to="/login" />
            }
          />
          <Route
            path="/buyer"
            element={
              user?.role === "buyer" ? (
                <BuyerDashboard />
              ) : (
                <Navigate to="/login" />
              )
            }
          />
          {/* Add other routes as needed */}
        </Routes>
      </div>
      {showFooter && <Footer />}
    </div>
  );
}

export default App;
