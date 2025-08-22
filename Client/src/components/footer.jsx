import { FaFacebookF, FaInstagram, FaLinkedin, FaTwitter } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-gradient-to-r from-green-400 via-yellow-100 to-purple-200 text-green-900 shadow-2xl font-sans relative">
      <div className="max-w-7xl mx-auto px-4 py-5">
        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 bg-white/60 backdrop-blur-md rounded-2xl shadow-lg p-4">
          
          {/* Brand Info */}
          <div>
            <h2 className="text-2xl font-extrabold mb-2 text-green-800 tracking-wide drop-shadow-lg">
              KhetBazaar
            </h2>
            <p className="text-xs text-green-700 leading-relaxed tracking-wide">
              Empowering farmers and buyers through a transparent,{" "}
              <span className="font-semibold text-green-900">middleman-free</span>{" "}
              mandi system. <br />
              <span className="text-green-800 font-bold">Join us in revolutionizing agriculture!</span>
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-bold mb-2 text-green-800 tracking-wider uppercase text-base drop-shadow">
              Quick Links
            </h3>
            <ul className="space-y-1 text-xs">
              {[
                { name: "Home", href: "/" },
                { name: "About Us", href: "/about" },
                { name: "Contact", href: "/contact" },
                { name: "Privacy & Policies", href: "/Privacy-Policy" }
              ].map((link, index) => (
                <li key={index}>
                  <a
                    href={link.href}
                    className="block px-2 py-1 rounded transition-all duration-300 hover:bg-green-500 hover:text-white hover:shadow-lg font-medium tracking-wide"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="font-bold mb-2 text-green-800 tracking-wider uppercase text-base drop-shadow">
              Contact Info
            </h3>
            <ul className="text-xs space-y-1 text-green-700 tracking-wide">
              <li>
                <span className="font-semibold">Email:</span> support@mandifree.com
              </li>
              <li>
                <span className="font-semibold">Phone:</span> +91 98765 43210
              </li>
              <li>
                <span className="font-semibold">Location:</span> Bharat, India
              </li>
            </ul>
            <div className="mt-2 border-t border-green-300 pt-2">
              <span className="text-xs text-green-800 font-semibold">Open: Mon-Sat 9am-6pm</span>
            </div>
          </div>

          {/* Social Links */}
          <div>
            <h3 className="font-bold mb-2 text-green-800 tracking-wider uppercase text-base drop-shadow">
              Follow Us
            </h3>
            <div className="flex gap-3">
              {[
                { icon: <FaFacebookF />, link: "https://www.facebook.com/" },
                { icon: <FaInstagram />, link: "https://www.instagram.com/" },
                { icon: <FaTwitter />, link: "https://www.twitter.com/" },
                { icon: <FaLinkedin />, link: "https://www.linkedin.com/" },
              ].map((social, idx) => (
                <a
                  key={idx}
                  href={social.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-white/80 p-2 rounded-full shadow-md transition-all duration-300 hover:bg-green-600 hover:text-white hover:shadow-xl transform hover:scale-110"
                  aria-label={`Follow us on ${social.link.split('//')[1].split('.')[0]}`}
                >
                  <span className="transition-transform duration-300 group-hover:scale-125">{social.icon}</span>
                </a>
              ))}
            </div>
            <div className="mt-3 text-xs text-green-700 font-semibold">
              <span className="inline-block bg-green-100 px-2 py-1 rounded-full shadow">#MandiRevolution</span>
            </div>
          </div>
        </div>

        {/* Bottom Footer */}
        <div className="text-center text-xs text-green-700 mt-8 border-t border-green-300 pt-4 tracking-wide font-semibold drop-shadow-sm">
          &copy; {new Date().getFullYear()} <span className="font-extrabold">MandiConnect</span>. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
