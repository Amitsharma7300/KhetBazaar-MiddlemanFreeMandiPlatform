import React from "react";
import { motion } from "framer-motion";
import { FaMapMarkerAlt, FaPhoneAlt, FaEnvelope, FaClock, FaHandshake } from "react-icons/fa";

const Contact = () => {
  return (
    <section className="min-h-screen bg-gradient-to-b from-white to-[#e6f4ea] py-16 px-6 sm:px-12">
      <div className="max-w-6xl mx-auto text-center">
        {/* Header */}
        <motion.h2
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-4xl sm:text-5xl font-extrabold text-green-900 mb-6 tracking-tight"
        >
          Contact Us
        </motion.h2>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="text-green-800 max-w-3xl mx-auto mb-14 text-lg sm:text-xl"
        >
          We’d love to hear from you! Fill out the form below or reach us directly using the contact information.
        </motion.p>

        <div className="grid md:grid-cols-2 gap-12 items-start">
          {/* Contact Form */}
          <motion.form
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="bg-white shadow-xl rounded-2xl p-10 space-y-7 hover:shadow-2xl transition-shadow duration-500"
          >
            <input
              type="text"
              placeholder="Your Name"
              className="w-full p-4 border border-green-300 rounded-xl placeholder-green-400 text-green-900 font-medium shadow-inner focus:outline-none focus:ring-4 focus:ring-green-300 hover:shadow-md transition-all duration-300"
            />
            <input
              type="email"
              placeholder="Your Email"
              className="w-full p-4 border border-green-300 rounded-xl placeholder-green-400 text-green-900 font-medium shadow-inner focus:outline-none focus:ring-4 focus:ring-green-300 hover:shadow-md transition-all duration-300"
            />
            <textarea
              rows="6"
              placeholder="Your Message"
              className="w-full p-4 border border-green-300 rounded-xl placeholder-green-400 text-green-900 font-medium shadow-inner focus:outline-none focus:ring-4 focus:ring-green-300 hover:shadow-md transition-all duration-300 resize-none"
            ></textarea>
            <motion.button
              whileHover={{ scale: 1.07, boxShadow: "0 8px 20px rgba(34,197,94,0.6)" }}
              whileTap={{ scale: 0.95 }}
              type="submit"
              className="w-full bg-gradient-to-r from-green-500 via-green-600 to-green-700 text-white font-extrabold py-4 rounded-xl shadow-lg hover:from-green-600 hover:to-green-800 transition-colors duration-300 tracking-wide uppercase text-lg"
            >
              Send Message
            </motion.button>
          </motion.form>

          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="relative bg-gradient-to-br from-[#d9f1d9] to-[#a6dba6] p-10 rounded-2xl shadow-xl text-left space-y-8 overflow-hidden"
          >
            {/* subtle diagonal stripes */}
            <div
              aria-hidden="true"
              className="absolute inset-0 opacity-10"
              style={{
                background:
                  "repeating-linear-gradient(45deg, rgba(255,255,255,0.2) 0, rgba(255,255,255,0.2) 10px, transparent 10px, transparent 20px)",
                pointerEvents: "none",
              }}
            />
            <h3 className="text-3xl font-extrabold text-green-900 mb-2 relative z-10">Get in Touch</h3>
            <p className="text-green-900 relative z-10 text-lg font-semibold">
              Have questions or need help? Reach out to us and we’ll get back to you as soon as possible.
            </p>
            <div className="space-y-6 text-green-900 relative z-10 text-lg font-medium">
              <div className="flex items-center gap-4">
                <FaMapMarkerAlt className="text-green-700 text-2xl" />
                <p>Village Tech Center, Bharatpur, Rajasthan, India</p>
              </div>
              <div className="flex items-center gap-4">
                <FaPhoneAlt className="text-green-700 text-2xl" />
                <p>+91 9876543210</p>
              </div>
              <div className="flex items-center gap-4">
                <FaEnvelope className="text-green-700 text-2xl" />
                <p>support@mandiplatform.com</p>
              </div>
              <div className="flex items-center gap-4">
                <FaClock className="text-green-700 text-2xl" />
                <p>Mon - Fri: 9AM - 6PM</p>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Middleman-Free Vision */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.7 }}
          className="mt-20 bg-white shadow-2xl rounded-2xl p-10 max-w-4xl mx-auto"
        >
          <div className="flex items-center gap-5 mb-6">
            <motion.div
              animate={{ y: [0, -8, 0] }}
              transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
            >
              <FaHandshake className="text-green-600 text-4xl" />
            </motion.div>
            <h3 className="text-3xl font-extrabold text-green-900">Our Middleman-Free Promise</h3>
          </div>
          <p className="text-green-800 leading-relaxed text-lg font-semibold">
            At Mandi Platform, we believe in creating a direct bridge between suppliers and buyers.
            By removing unnecessary middlemen, we ensure fair pricing, faster transactions, and
            stronger trust between both parties. Every connection you make here is genuine,
            transparent, and beneficial for all — no hidden cuts, no extra costs.
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default Contact;
