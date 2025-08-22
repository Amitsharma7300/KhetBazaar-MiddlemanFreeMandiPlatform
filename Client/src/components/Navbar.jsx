import { useState } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import { NavLink } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Navbar() {
  const { user, logout } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const closeMenu = () => setIsMenuOpen(false);

  return (
    <nav className="bg-gradient-to-r from-green-50 via-yellow-50 to-purple-100 shadow-lg px-6 py-2 flex items-center justify-between border-b border-green-200 rounded-b-2xl">
      {/* Logo */}
      <NavLink to="/" className="flex items-center gap-2 hover:opacity-90 transition-opacity">
        <span className="text-3xl drop-shadow">🌾</span>
        <h1 className="font-extrabold text-2xl text-green-800 tracking-wide drop-shadow-lg">KhetBazaar</h1>
      </NavLink>

      {/* Desktop Links */}
      <div className="hidden md:flex items-center gap-3">
        <NavLinks user={user} logout={logout} closeMenu={closeMenu} />
      </div>

      {/* Mobile Hamburger */}
      <div className="md:hidden">
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="text-green-800 text-2xl focus:outline-none transition-transform hover:scale-110"
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
        className={`fixed top-0 right-0 h-full w-64 bg-gradient-to-br from-green-50 via-yellow-50 to-purple-100 shadow-2xl z-50 transform transition-transform duration-300 rounded-l-2xl ${
          isMenuOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex flex-col p-6 gap-3">
          <NavLinks user={user} logout={logout} closeMenu={closeMenu} />
        </div>
      </div>
    </nav>
  );
}

function NavLinks({ user, logout, closeMenu }) {
  const linkStyle = ({ isActive }) =>
    `font-semibold transition-colors duration-200 px-2 py-1 rounded-lg ${
      isActive
        ? "text-green-700 bg-green-100 shadow"
        : "text-green-800 hover:text-green-700 hover:bg-green-50"
    }`;

  const btnLogin =
    "bg-green-600 text-white font-semibold px-4 py-1 rounded-lg shadow hover:bg-green-700 transition-colors";
  const btnRegister =
    "bg-green-100 text-green-800 font-semibold px-4 py-1 rounded-lg border border-green-300 hover:bg-green-200 transition-colors";
  const btnLogout =
    "bg-red-100 text-red-600 font-semibold px-4 py-1 rounded-lg hover:bg-red-200 transition-colors";

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
