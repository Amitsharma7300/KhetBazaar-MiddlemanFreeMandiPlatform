import { FaFacebookF, FaInstagram, FaLinkedin, FaTwitter } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-gradient-to-r from-green-300 via-green-200 to-green-100 text-green-900 shadow-lg font-sans">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
          
          {/* Brand Info */}
          <div>
            <h2 className="text-3xl font-extrabold mb-3 text-green-800 tracking-wide drop-shadow-md">
              KhetBazaar
            </h2>
            <p className="text-sm text-green-700 leading-relaxed tracking-wide">
              Empowering farmers and buyers through a transparent,{" "}
              <span className="font-semibold text-green-900">middleman-free</span>{" "}
              mandi system. Join us in revolutionizing agriculture with fair prices and direct deals.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-bold mb-3 text-green-800 tracking-wider uppercase text-lg drop-shadow-sm">
              Quick Links
            </h3>
            <ul className="space-y-2 text-sm">
              {[
                { name: "Home", href: "/" },
                { name: "About Us", href: "/about" },
                { name: "Contact", href: "/contact" },
                { name: "Privacy & Policies", href: "/Privacy-Policy" }
              ].map((link, index) => (
                <li key={index}>
                  <a
                    href={link.href}
                    className="block px-2 py-1 rounded transition-all duration-300 hover:bg-green-500 hover:text-white hover:shadow-md font-medium tracking-wide"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="font-bold mb-3 text-green-800 tracking-wider uppercase text-lg drop-shadow-sm">
              Contact Info
            </h3>
            <ul className="text-sm space-y-2 text-green-700 tracking-wide">
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
          </div>

          {/* Social Links */}
          <div>
            <h3 className="font-bold mb-3 text-green-800 tracking-wider uppercase text-lg drop-shadow-sm">
              Follow Us
            </h3>
            <div className="flex gap-4">
              {[
                { icon: <FaFacebookF />, link: "https://www.facebook.com/" },
                { icon: <FaInstagram />, link: "https://www.instagram.com/" },
                { icon: <FaTwitter />, link: "https://www.twitter.com/" },
                { icon: <FaLinkedin />, link: "https://www.linkedin.com/" },
              ].map((social, idx) => (
                <a
                  key={idx}
                  href={social.link}
                  className="bg-white p-3 rounded-full shadow-md transition-all duration-300 hover:bg-green-600 hover:text-white hover:shadow-lg transform hover:scale-110"
                  aria-label={`Follow us on ${social.link.split('//')[1].split('.')[0]}`}
                >
                  {social.icon}
                </a>
              ))}
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
98c2e4c187df51e6b3d07zzz
