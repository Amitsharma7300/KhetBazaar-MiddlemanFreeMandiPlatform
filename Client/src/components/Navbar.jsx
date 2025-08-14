import { useState } from "react";
import { NavLink } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { FaBars, FaTimes } from "react-icons/fa";

export default function Navbar() {
  const { user, logout } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const closeMenu = () => setIsMenuOpen(false);

  return (
    <nav className="bg-white shadow-md px-6 py-3 flex items-center justify-between border-b border-green-200">
      {/* Logo */}
      <NavLink to="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
        <span className="text-3xl">🌾</span>
        <h1 className="font-bold text-2xl text-green-800">KhetBazaar</h1>
      </NavLink>

      {/* Desktop Links */}
      <div className="hidden md:flex items-center gap-6">
        <NavLinks user={user} logout={logout} closeMenu={closeMenu} />
      </div>

      {/* Mobile Hamburger */}
      <div className="md:hidden">
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="text-green-800 text-2xl focus:outline-none"
        >
          {isMenuOpen ? <FaTimes /> : <FaBars />}
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      <div
        className={`fixed inset-0 bg-black/40 transition-opacity duration-300 z-40 ${
          isMenuOpen ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
        onClick={closeMenu}
      ></div>

      {/* Mobile Slide Menu */}
      <div
        className={`fixed top-0 right-0 h-full w-64 bg-white shadow-lg z-50 transform transition-transform duration-300 ${
          isMenuOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex flex-col p-6 gap-6">
          <NavLinks user={user} logout={logout} closeMenu={closeMenu} />
        </div>
      </div>
    </nav>
  );
}

function NavLinks({ user, logout, closeMenu }) {
  const linkStyle = ({ isActive }) =>
    `font-medium transition-colors duration-200 ${
      isActive ? "text-green-600 border-b-2 border-green-600" : "text-green-800 hover:text-green-600"
    }`;

  const btnLogin =
    "bg-green-600 text-white font-medium px-4 py-1 rounded hover:bg-green-700 transition-colors";
  const btnRegister =
    "bg-green-100 text-green-800 font-medium px-4 py-1 rounded border border-green-300 hover:bg-green-200 transition-colors";
  const btnLogout =
    "bg-red-100 text-red-600 font-medium px-4 py-1 rounded hover:bg-red-200 transition-colors";

  return (
    <>
      <NavLink to="/" className={linkStyle} onClick={closeMenu}>
        Home
      </NavLink>
      <NavLink to="/about" className={linkStyle} onClick={closeMenu}>
        About
      </NavLink>
      <NavLink to="/contact" className={linkStyle} onClick={closeMenu}>
        Contact
      </NavLink>
      {/* ✅ New Blogs link */}
      <NavLink to="/blogs" className={linkStyle} onClick={closeMenu}>
        Blogs
      </NavLink>

      {user ? (
        <>
          {user.role === "farmer" && (
            <NavLink to="/farmer" className={linkStyle} onClick={closeMenu}>
              Dashboard
            </NavLink>
          )}
          {user.role === "buyer" && (
            <NavLink to="/buyer" className={linkStyle} onClick={closeMenu}>
              Dashboard
            </NavLink>
          )}
          <button
            onClick={() => {
              logout();
              closeMenu();
            }}
            className={btnLogout}
          >
            Logout
          </button>
        </>
      ) : (
        <>
          <NavLink to="/login" className={btnLogin} onClick={closeMenu}>
            Login
          </NavLink>
          <NavLink to="/register" className={btnRegister} onClick={closeMenu}>
            Register
          </NavLink>
        </>
      )}
    </>
  );
}