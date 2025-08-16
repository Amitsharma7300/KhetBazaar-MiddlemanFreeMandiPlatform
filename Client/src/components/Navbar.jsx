import { useState } from "react";
import { NavLink } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { FaBars, FaTimes } from "react-icons/fa";

export default function Navbar() {
  const { user, logout } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const closeMenu = () => setIsMenuOpen(false);

  return (
    <nav className="bg-gradient-to-r from-green-50 to-green-100 shadow-md px-6 py-4 flex items-center justify-between border-b border-green-200">
      {/* Logo */}
      <NavLink
        to="/"
        className="flex items-center gap-2 hover:opacity-90 transition-all"
      >
        <span className="text-3xl">🌾</span>
        <h1 className="font-extrabold text-2xl text-green-800 tracking-wide">
          KhetBazaar
        </h1>
      </NavLink>

      {/* Desktop Links */}
      <div className="hidden md:flex items-center gap-8">
        <NavLinks user={user} logout={logout} closeMenu={closeMenu} />
      </div>

      {/* Mobile Hamburger */}
      <div className="md:hidden">
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="text-green-800 text-3xl focus:outline-none hover:scale-110 transition-transform"
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
        className={`fixed top-0 right-0 h-full w-72 bg-white shadow-xl z-50 transform transition-transform duration-300 rounded-l-2xl ${
          isMenuOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex flex-col p-8 gap-6">
          <NavLinks user={user} logout={logout} closeMenu={closeMenu} />
        </div>
      </div>
    </nav>
  );
}

function NavLinks({ user, logout, closeMenu }) {
  const linkStyle = ({ isActive }) =>
    `relative font-semibold transition-all duration-300 pb-1 ${
      isActive
        ? "text-green-700 after:absolute after:left-0 after:bottom-0 after:h-[2px] after:w-full after:bg-green-600"
        : "text-green-900 hover:text-green-600 hover:after:w-full after:absolute after:left-0 after:bottom-0 after:h-[2px] after:w-0 after:bg-green-600 after:transition-all"
    }`;

  const btnLogin =
    "bg-green-600 text-white font-semibold px-5 py-2 rounded-full shadow hover:bg-green-700 transition-colors";
  const btnRegister =
    "bg-white text-green-700 font-semibold px-5 py-2 rounded-full border-2 border-green-400 hover:bg-green-100 shadow transition-colors";
  const btnLogout =
    "bg-red-50 text-red-600 font-semibold px-5 py-2 rounded-full border border-red-200 hover:bg-red-100 transition-colors";

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
        <div className="flex gap-4">
          <NavLink to="/login" className={btnLogin} onClick={closeMenu}>
            Login
          </NavLink>
          <NavLink to="/register" className={btnRegister} onClick={closeMenu}>
            Register
          </NavLink>
        </div>
      )}
    </>
  );
}
