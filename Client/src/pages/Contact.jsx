import React from "react";
import { motion } from "framer-motion";
import { Helmet } from "react-helmet";
import { FaMapMarkerAlt, FaPhoneAlt, FaEnvelope, FaClock, FaHandshake } from "react-icons/fa";

const Contact = () => {
  return (
    <section
      className="min-h-screen bg-gradient-to-b from-white to-[#e6f4ea] py-16 px-6 sm:px-12"
      aria-labelledby="contact-heading"
    >
      {/* ✅ Helmet SEO */}
      <Helmet>
        <title>Contact Us | KhetBazaar</title>
        <meta
          name="description"
          content="Get in touch with KhetBazaar for farmer support, buyer inquiries, and partnership opportunities. Call, email, or visit us directly."
        />
        <meta
          name="keywords"
          content="KhetBazaar contact, farmer support, agriculture help, mandi platform contact"
        />
      </Helmet>

      <div className="max-w-6xl mx-auto text-center">
        {/* ✅ Main Page Heading */}
        <motion.h1
          id="contact-heading"
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-4xl sm:text-5xl font-extrabold text-green-900 mb-6 tracking-tight"
        >
          Contact Us
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="text-green-800 max-w-3xl mx-auto mb-14 text-lg sm:text-xl"
        >
          We’d love to hear from you! Fill out the form below or reach us directly using the contact
          details provided.
        </motion.p>

        <div className="grid md:grid-cols-2 gap-12 items-start">
          {/* ✅ Contact Form */}
          <motion.form
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="bg-white shadow-xl rounded-2xl p-10 space-y-7 hover:shadow-2xl transition-shadow duration-500"
            aria-label="Contact form"
          >
            <label htmlFor="name" className="sr-only">
              Name
            </label>
            <input
              id="name"
              type="text"
              placeholder="Your Name"
              required
              className="w-full p-4 border border-green-300 rounded-xl placeholder-green-400 text-green-900 font-medium shadow-inner focus:outline-none focus:ring-4 focus:ring-green-300"
            />

            <label htmlFor="email" className="sr-only">
              Email
            </label>
            <input
              id="email"
              type="email"
              placeholder="Your Email"
              required
              className="w-full p-4 border border-green-300 rounded-xl placeholder-green-400 text-green-900 font-medium shadow-inner focus:outline-none focus:ring-4 focus:ring-green-300"
            />

            <label htmlFor="message" className="sr-only">
              Message
            </label>
            <textarea
              id="message"
              rows="6"
              placeholder="Your Message"
              required
              className="w-full p-4 border border-green-300 rounded-xl placeholder-green-400 text-green-900 font-medium shadow-inner focus:outline-none focus:ring-4 focus:ring-green-300 resize-none"
            ></textarea>

            <motion.button
              whileHover={{ scale: 1.07 }}
              whileTap={{ scale: 0.95 }}
              type="submit"
              className="w-full bg-gradient-to-r from-green-500 to-green-700 text-white font-extrabold py-4 rounded-xl shadow-lg hover:from-green-600 hover:to-green-800 uppercase text-lg"
            >
              Send Message
            </motion.button>
          </motion.form>

          {/* ✅ Contact Info Section */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="relative bg-gradient-to-br from-[#d9f1d9] to-[#a6dba6] p-10 rounded-2xl shadow-xl text-left space-y-8"
          >
            <h2 className="text-3xl font-extrabold text-green-900 mb-2">Get in Touch</h2>
            <p className="text-green-900 text-lg font-semibold">
              Have questions or need help? Reach out to us and we’ll get back to you quickly.
            </p>

            <ul className="space-y-6 text-green-900 text-lg font-medium">
              <li className="flex items-center gap-4">
                <FaMapMarkerAlt className="text-green-700 text-2xl" aria-hidden="true" />
                <span>Village Tech Center, Bharatpur, Rajasthan, India</span>
              </li>
              <li className="flex items-center gap-4">
                <FaPhoneAlt className="text-green-700 text-2xl" aria-hidden="true" />
                <a href="tel:+919876543210" className="hover:underline">
                  +91 9876543210
                </a>
              </li>
              <li className="flex items-center gap-4">
                <FaEnvelope className="text-green-700 text-2xl" aria-hidden="true" />
                <a href="mailto:support@mandiplatform.com" className="hover:underline">
                  support@mandiplatform.com
                </a>
              </li>
              <li className="flex items-center gap-4">
                <FaClock className="text-green-700 text-2xl" aria-hidden="true" />
                <span>Mon - Fri: 9AM - 6PM</span>
              </li>
            </ul>
          </motion.div>
        </div>

        {/* ✅ Middleman-Free Promise Section */}
        <motion.section
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.7 }}
          className="mt-20 bg-white shadow-2xl rounded-2xl p-10 max-w-4xl mx-auto"
        >
          <div className="flex items-center gap-5 mb-6">
            <FaHandshake className="text-green-600 text-4xl" aria-hidden="true" />
            <h2 className="text-3xl font-extrabold text-green-900">Our Middleman-Free Promise</h2>
          </div>
          <p className="text-green-800 leading-relaxed text-lg font-semibold">
            At KhetBazaar, we connect farmers directly with buyers. By removing unnecessary
            middlemen, we ensure fair pricing, faster transactions, and trust between both parties.
          </p>
        </motion.section>
      </div>
    </section>
  );
};

export default Contact;
