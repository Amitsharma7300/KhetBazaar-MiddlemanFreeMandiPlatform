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

      {/* Main Content */}
      <motion.div
        className="max-w-4xl mx-auto text-lg leading-relaxed text-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.9 }}
      >
        <p className="mb-4">
          Welcome to <span className="font-semibold text-green-600">Middleman-Free Mandi</span> —
          a platform built to empower farmers by eliminating the middleman, ensuring fair prices,
          and connecting them directly with buyers such as hotels, processors, and exporters.
        </p>
        <p className="mb-4">
          We are passionate about revolutionizing the agricultural market through technology,
          transparency, and trust. By cutting unnecessary intermediaries, we make sure farmers
          get the maximum value for their produce while buyers receive fresh, quality goods at fair rates.
        </p>
        <p className="mb-4">
          Our vision is to create a sustainable, transparent, and profitable agricultural ecosystem where
          every farmer has equal access to markets and opportunities.
        </p>
      </motion.div>

      {/* Features */}
      <div className="grid md:grid-cols-3 gap-8 mt-14 max-w-6xl mx-auto">
        {[
          {
            icon: <FaSeedling size={40} className="text-white" />,
            title: "Fair Pricing",
            desc: "Ensuring farmers receive the right value for their produce without exploitation.",
            bg: "from-green-400 to-green-600",
          },
          {
            icon: <FaHandshake size={40} className="text-white" />,
            title: "Direct Deals",
            desc: "Connecting farmers directly with genuine buyers to foster trust and long-term partnerships.",
            bg: "from-yellow-400 to-yellow-600",
          },
          {
            icon: <FaTruck size={40} className="text-white" />,
            title: "Logistics Support",
            desc: "Providing smooth transportation solutions for hassle-free deliveries.",
            bg: "from-blue-400 to-blue-600",
          }
        ].map((feature, index) => (
          <motion.div
            key={index}
            className={`p-6 rounded-xl shadow-lg text-center cursor-pointer bg-gradient-to-br ${feature.bg} hover:from-opacity-90 hover:to-opacity-90 transition duration-300`}
            whileHover={{ scale: 1.05 }}
          >
            <div className="mb-4 flex justify-center">{feature.icon}</div>
            <h3 className="text-xl font-semibold mb-2 text-white">{feature.title}</h3>
            <p className="text-white text-opacity-90">{feature.desc}</p>
          </motion.div>
        ))}
      </div>

      {/* Our Impact Section */}
      <motion.div
        className="mt-20 py-12 px-6 rounded-2xl shadow-lg bg-gradient-to-tr from-green-100 to-green-200"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <h2 className="text-3xl font-bold text-center text-green-800 mb-10">🌱 Our Impact</h2>
        <div className="grid md:grid-cols-4 gap-8 text-center max-w-6xl mx-auto">
          {[
            { icon: <FaUsers size={35} className="text-green-700" />, value: "10,000+", label: "Farmers Empowered", bg: "bg-green-50" },
            { icon: <FaHandshake size={35} className="text-yellow-700" />, value: "5,000+", label: "Successful Deals", bg: "bg-yellow-50" },
            { icon: <FaTruck size={35} className="text-blue-700" />, value: "1,200+", label: "Deliveries Made", bg: "bg-blue-50" },
            { icon: <FaSeedling size={35} className="text-teal-700" />, value: "95%", label: "Fair Price Achieved", bg: "bg-teal-50" }
          ].map((impact, index) => (
            <motion.div
              key={index}
              className={`${impact.bg} p-6 rounded-xl shadow-md hover:shadow-xl transition cursor-pointer`}
              whileHover={{ scale: 1.05 }}
            >
              <div className="mb-2 flex justify-center">{impact.icon}</div>
              <h3 className="text-2xl font-bold" style={{color: impact.bg.includes("green") ? "#166534" : undefined}}>{impact.value}</h3>
              <p className="text-gray-700">{impact.label}</p>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
