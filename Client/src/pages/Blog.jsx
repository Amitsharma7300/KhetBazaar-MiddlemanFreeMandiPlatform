// src/pages/Blogs.jsx
import React, { useState } from "react";
import { motion } from "framer-motion";
import { FaSearch, FaArrowRight } from "react-icons/fa";

const sampleBlogs = [
  {
    id: 1,
    title: "Agriculture Pricing Strategies",
    excerpt:
      "Explore effective pricing strategies for agricultural products to maximize profits and stay competitive in the market.",
    image: "/blogs/ai-pricing.jpg", // from public/blogs/
    date: "12 Aug 2025",
    author: "Amit Sharma",
    category: "Farming Tips",
  },
  {
    id: 2,
    title: "Direct Sales in Agriculture",
    excerpt:
      "Learn how direct-to-consumer sales can boost your farming business by cutting out middlemen.",
    image: "/blogs/direct-sale.jpg", // from public/blogs/
    date: "10 Aug 2025",
    author: "Priya Verma",
    category: "Marketing",
  },
  {
    id: 3,
    title: "Organic Farming: A Beginner’s Guide",
    excerpt:
      "Step-by-step guide to starting organic farming and selling your produce.",
    image: "/blogs/organic.jpg", // from public/blogs/
    date: "8 Aug 2025",
    author: "Ravi Kumar",
    category: "Organic",
  },
];

export default function Blogs() {
  const [search, setSearch] = useState("");

  const filteredBlogs = sampleBlogs.filter((blog) =>
    blog.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="bg-gradient-to-b from-green-50 via-white to-green-100 min-h-screen py-12 px-6 md:px-16">
      {/* Title */}
      <motion.h1
        className="text-4xl md:text-5xl font-extrabold text-center mb-8 text-green-800"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        🌱 Farming Blogs & Tips
      </motion.h1>

      {/* Search */}
      <div className="flex justify-center mb-10">
        <div className="relative w-full max-w-lg">
          <input
            type="text"
            placeholder="Search blogs..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full border border-green-300 rounded-full py-3 px-5 pr-12 focus:outline-none focus:ring-2 focus:ring-green-400 shadow-sm"
          />
          <FaSearch className="absolute right-4 top-3.5 text-green-500 text-lg" />
        </div>
      </div>

      {/* Blogs Grid */}
      <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-3">
        {filteredBlogs.length > 0 ? (
          filteredBlogs.map((blog, index) => (
            <motion.div
              key={blog.id}
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.15, duration: 0.5 }}
              whileHover={{ scale: 1.03 }}
              className="group bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300"
            >
              <div className="relative overflow-hidden">
                <img
                  src={blog.image}
                  alt={blog.title}
                  className="w-full h-52 object-cover transform group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute top-4 left-4 bg-green-600 text-white px-3 py-1 rounded-full text-sm shadow-md">
                  {blog.category}
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              </div>

              <div className="p-6">
                <h2 className="text-xl font-bold text-green-700 mb-2 group-hover:text-green-900 transition-colors">
                  {blog.title}
                </h2>
                <p className="text-gray-600 mb-4 line-clamp-3">{blog.excerpt}</p>
                <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                  <span>📅 {blog.date}</span>
                  <span>✍ {blog.author}</span>
                </div>
                <button className="flex items-center gap-2 text-green-600 font-semibold hover:text-green-800 transition-colors group">
                  Read More
                  <FaArrowRight className="transform group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </motion.div>
          ))
        ) : (
          <p className="text-center text-gray-500 col-span-full">
            No blogs found.
          </p>
        )}
      </div>
    </div>
  );
}
