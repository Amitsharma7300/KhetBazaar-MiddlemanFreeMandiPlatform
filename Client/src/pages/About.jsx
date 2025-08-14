import React from "react";
import { motion } from "framer-motion";
import { FaSeedling, FaHandshake, FaTruck, FaUsers } from "react-icons/fa";

export default function AboutUs() {
  return (
    <div className="bg-gradient-to-b from-green-50 to-white text-gray-800 px-6 md:px-16 py-16">
      {/* Header Section */}
      <motion.h1
        className="text-5xl font-bold text-center mb-6 text-green-700"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
      >
        About Us
      </motion.h1>
      <motion.p
        className="text-lg text-center text-gray-600 mb-12 max-w-3xl mx-auto"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.9, delay: 0.2 }}
      >
        Building a <span className="font-semibold text-green-600">Middleman-Free Mandi</span> —
        a transparent platform that connects farmers directly with genuine buyers for fair,
        profitable, and sustainable trade.
      </motion.p>

      {/* Mission Section */}
      <motion.div
        className="max-w-4xl mx-auto text-lg leading-relaxed space-y-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 0.3 }}
      >
        <p>
          Our mission is simple yet powerful: empower farmers, eliminate middlemen, and
          ensure fair prices for every harvest. By leveraging technology, we bridge the
          gap between farmers and buyers such as hotels, processors, and exporters.
        </p>
        <p>
          We believe agriculture is the backbone of the economy. Our platform not only
          boosts farmer income but also provides buyers with fresh, quality produce at
          competitive rates — a win-win for everyone.
        </p>
        <p>
          Transparency, trust, and timely payments are the pillars on which we operate.
          Every deal on our platform is verified, secure, and designed to create lasting
          relationships in the agri-community.
        </p>
      </motion.div>

      {/* Core Values / Features */}
      <section className="grid md:grid-cols-3 gap-8 mt-16 max-w-6xl mx-auto">
        {[
          {
            icon: <FaSeedling size={40} className="text-white" />,
            title: "Fair Pricing",
            desc: "Farmers receive the right value for their produce without exploitation.",
            bg: "from-green-400 to-green-600",
          },
          {
            icon: <FaHandshake size={40} className="text-white" />,
            title: "Direct Deals",
            desc: "Farmers connect directly with buyers to build long-term trust.",
            bg: "from-yellow-400 to-yellow-600",
          },
          {
            icon: <FaTruck size={40} className="text-white" />,
            title: "Logistics Support",
            desc: "Smooth and affordable transport for hassle-free deliveries.",
            bg: "from-blue-400 to-blue-600",
          },
        ].map((feature, index) => (
          <motion.div
            key={index}
            className={`p-6 rounded-xl shadow-lg text-center bg-gradient-to-br ${feature.bg} transition duration-300`}
            whileHover={{ scale: 1.05 }}
          >
            <div className="mb-4 flex justify-center">{feature.icon}</div>
            <h3 className="text-xl font-semibold mb-2 text-white">{feature.title}</h3>
            <p className="text-white text-opacity-90">{feature.desc}</p>
          </motion.div>
        ))}
      </section>

      {/* Our Impact */}
      <motion.section
        className="mt-20 py-12 px-6 rounded-2xl shadow-lg bg-gradient-to-tr from-green-100 to-green-200"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <h2 className="text-3xl font-bold text-center text-green-800 mb-10">
          🌱 Our Impact in Numbers
        </h2>
        <div className="grid md:grid-cols-4 gap-8 text-center max-w-6xl mx-auto">
          {[
            { icon: <FaUsers size={35} className="text-green-700" />, value: "10,000+", label: "Farmers Empowered", bg: "bg-green-50" },
            { icon: <FaHandshake size={35} className="text-yellow-700" />, value: "5,000+", label: "Successful Deals", bg: "bg-yellow-50" },
            { icon: <FaTruck size={35} className="text-blue-700" />, value: "1,200+", label: "Deliveries Made", bg: "bg-blue-50" },
            { icon: <FaSeedling size={35} className="text-teal-700" />, value: "95%", label: "Fair Price Achieved", bg: "bg-teal-50" },
          ].map((impact, index) => (
            <motion.div
              key={index}
              className={`${impact.bg} p-6 rounded-xl shadow-md`}
              whileHover={{ scale: 1.05 }}
            >
              <div className="mb-2 flex justify-center">{impact.icon}</div>
              <h3 className="text-2xl font-bold">{impact.value}</h3>
              <p className="text-gray-700">{impact.label}</p>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* Call to Action */}
      <motion.div
        className="mt-16 bg-green-600 text-white py-10 px-6 rounded-2xl text-center shadow-xl"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
      >
        <h2 className="text-3xl font-bold mb-4">Join the Mandi Revolution 🌾</h2>
        <p className="mb-6 text-lg max-w-2xl mx-auto">
          Be part of a growing network that’s changing agriculture for the better.
          Sign up today and start trading directly with confidence.
        </p>
        <a
          href="/register"
          className="inline-block bg-white text-green-700 px-8 py-3 rounded-full font-semibold hover:bg-green-100 transition"
        >
          Get Started
        </a>
      </motion.div>
    </div>
  );
}
