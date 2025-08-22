// src/pages/Blogs.jsx
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { FaArrowRight, FaSearch, FaTimes } from "react-icons/fa";

const sampleBlogs = [
	{
		id: 1,
		title: "Agriculture Pricing Strategies",
		excerpt:
			"Explore effective pricing strategies for agricultural products to maximize profits and stay competitive in the market.",
		content:
			"This blog covers various pricing strategies such as cost-plus pricing, value-based pricing, and competitive pricing. Learn how to analyze market trends, set optimal prices, and negotiate better deals for your crops. Discover real-world examples and tips from successful farmers.",
		image: "/blogs/ai-pricing.jpg",
		date: "12 Aug 2025",
		author: "Amit Sharma",
		category: "Farming Tips",
	},
	{
		id: 2,
		title: "Direct Sales in Agriculture",
		excerpt:
			"Learn how direct-to-consumer sales can boost your farming business by cutting out middlemen.",
		content:
			"Direct sales allow farmers to connect with consumers, increase profit margins, and build lasting relationships. This blog explains how to set up direct sales channels, market your produce, and manage logistics for maximum efficiency.",
		image: "/blogs/direct-sale.jpg",
		date: "10 Aug 2025",
		author: "Priya Verma",
		category: "Marketing",
	},
	{
		id: 3,
		title: "Organic Farming: A Beginner’s Guide",
		excerpt:
			"Step-by-step guide to starting organic farming and selling your produce.",
		content:
			"Organic farming is gaining popularity for its health and environmental benefits. Learn how to transition to organic methods, get certifications, and find buyers for your organic produce. Includes tips on soil management, pest control, and marketing.",
		image: "/blogs/organic.jpg",
		date: "8 Aug 2025",
		author: "Ravi Kumar",
		category: "Organic",
	},
];

export default function Blogs() {
	const [search, setSearch] = useState("");
	const [selectedBlog, setSelectedBlog] = useState(null);

	const filteredBlogs = sampleBlogs.filter((blog) =>
		blog.title.toLowerCase().includes(search.toLowerCase())
	);

	return (
		<div className="bg-gradient-to-b from-green-50 via-white to-green-100 min-h-screen py-12 px-6 md:px-16">
			{/* Title */}
			<motion.h1
				className="text-4xl md:text-5xl font-extrabold text-center mb-8 text-green-800 drop-shadow-lg"
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
							whileHover={{
								scale: 1.04,
								boxShadow: "0 8px 32px rgba(34,197,94,0.15)",
							}}
							className="group bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 border border-green-100"
						>
							<div className="relative overflow-hidden">
								<img
									src={blog.image}
									alt={blog.title}
									loading="eager"
									className="w-full h-52 object-cover transition-transform duration-500 group-hover:scale-105 group-hover:blur-0 blur-[2px]"
									style={{ filter: "blur(0px)" }}
								/>
								<div className="absolute top-4 left-4 bg-gradient-to-r from-green-500 via-green-400 to-green-600 text-white px-4 py-1 rounded-full text-sm shadow-lg font-semibold tracking-wide">
									{blog.category}
								</div>
								<div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
							</div>

							<div className="p-6">
								<h2 className="text-xl font-bold text-green-700 mb-2 group-hover:text-green-900 transition-colors">
									{blog.title}
								</h2>
								<p className="text-gray-600 mb-4 line-clamp-3">
									{blog.excerpt}
								</p>
								<div className="flex items-center justify-between text-sm text-gray-500 mb-4">
									<span>📅 {blog.date}</span>
									<span>✍ {blog.author}</span>
								</div>
								<button
									className="flex items-center gap-2 text-green-600 font-semibold hover:text-green-800 transition-colors group"
									onClick={() => setSelectedBlog(blog)}
								>
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

			{/* Modal for Read More */}
			<AnimatePresence>
				{selectedBlog && (
					<motion.div
						className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center"
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						exit={{ opacity: 0 }}
					>
						<motion.div
							className="bg-white rounded-2xl shadow-2xl max-w-lg w-full p-8 relative"
							initial={{ scale: 0.8, opacity: 0 }}
							animate={{ scale: 1, opacity: 1 }}
							exit={{ scale: 0.8, opacity: 0 }}
							transition={{ duration: 0.3 }}
						>
							<button
								className="absolute top-4 right-4 text-green-600 hover:text-green-800 text-xl"
								onClick={() => setSelectedBlog(null)}
							>
								<FaTimes />
							</button>
							<img
								src={selectedBlog.image}
								alt={selectedBlog.title}
								className="w-full h-56 object-cover rounded-xl mb-4"
								loading="eager"
							/>
							<div className="mb-2">
								<span className="bg-gradient-to-r from-green-500 via-green-400 to-green-600 text-white px-3 py-1 rounded-full text-xs shadow font-semibold">
									{selectedBlog.category}
								</span>
							</div>
							<h2 className="text-2xl font-bold text-green-700 mb-2">
								{selectedBlog.title}
							</h2>
							<div className="flex items-center justify-between text-sm text-gray-500 mb-4">
								<span>📅 {selectedBlog.date}</span>
								<span>✍ {selectedBlog.author}</span>
							</div>
							<p className="text-gray-700 mb-2">{selectedBlog.content}</p>
						</motion.div>
					</motion.div>
				)}
			</AnimatePresence>
		</div>
	);
}
