import { ArrowRight, ShoppingBag, Users, Truck, Leaf } from "lucide-react";
import { Link } from "react-router-dom";
import React from "react";

export default function Home() {
  return (
    <div className="bg-gradient-to-b from-green-50 via-white to-green-100 text-gray-800 font-inter">
      {/* Hero Section */}
      <section
        className="relative overflow-hidden py-16 text-center text-white w-full"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1606788075761-977d78c8792b?auto=format&fit=crop&w=1600&q=80')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-green-900/80 via-green-800/60 to-green-900/90 backdrop-blur-sm"></div>

        <div className="relative z-10 px-6 max-w-4xl mx-auto">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold leading-tight drop-shadow-lg bg-gradient-to-r from-green-200 via-white to-green-200 bg-clip-text text-transparent animate-fadeInUp">
            Middleman-Free Mandi Platform
          </h1>
          <p className="mt-4 text-lg sm:text-xl text-green-100 animate-fadeInUp delay-150 leading-relaxed">
            Connecting farmers directly to buyers — hotels, processors, exporters — for fair
            prices, no middlemen, and transparent bulk crop deals.  
            Empowering farmers with technology for transparency, timely payments, and wider
            market access.
          </p>
          <div className="mt-10 flex justify-center gap-6 flex-wrap animate-fadeInUp delay-300">
            <Link
              to="/register"
              className="inline-flex items-center gap-3 bg-gradient-to-r from-green-400 to-green-600 hover:from-green-500 hover:to-green-700 px-7 py-3 rounded-full font-semibold shadow-lg hover:shadow-green-700/40 transition-all duration-300 hover:scale-110"
            >
              Get Started <ArrowRight size={20} />
            </Link>
            <Link
              to="/about"
              className="inline-flex items-center gap-3 border-2 border-green-200 px-7 py-3 rounded-full font-semibold shadow-lg hover:bg-green-100 hover:text-green-900 transition-all duration-300 hover:scale-110"
            >
              Learn More
            </Link>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 px-6">
        <h2 className="text-4xl font-extrabold text-center bg-gradient-to-r from-green-600 to-green-800 bg-clip-text text-transparent">
          Why Choose Us?
        </h2>
        <div className="mt-14 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10 max-w-7xl mx-auto">
          <FeatureCard
            bg="from-green-100 to-green-200"
            icon={<ShoppingBag className="w-12 h-12 text-green-700" />}
            title="Direct Crop Deals"
            desc="Sell directly to buyers without commissions."
          />
          <FeatureCard
            bg="from-yellow-100 to-yellow-200"
            icon={<Users className="w-12 h-12 text-yellow-700" />}
            title="Verified Members"
            desc="Secure & trusted transactions with verified farmers and buyers."
          />
          <FeatureCard
            bg="from-blue-100 to-blue-200"
            icon={<Truck className="w-12 h-12 text-blue-700" />}
            title="Logistics Support"
            desc="Get help with bulk transportation and deliveries."
          />
          <FeatureCard
            bg="from-pink-100 to-pink-200"
            icon={<Leaf className="w-12 h-12 text-pink-700" />}
            title="Contract Farming"
            desc="Long-term partnerships for stable income."
          />
        </div>
      </section>

      {/* How It Works */}
      <section
        className="py-20 px-6 relative"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=1600&q=80')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="bg-white/80 backdrop-blur-md rounded-3xl max-w-6xl mx-auto p-12 shadow-2xl">
          <h2 className="text-4xl font-extrabold text-center text-green-700">
            How It Works
          </h2>
          <div className="mt-14 grid grid-cols-1 md:grid-cols-3 gap-10 text-center">
            <StepCard
              step="1"
              title="Sign Up"
              desc="Create your account as farmer or buyer."
              color="from-green-100 to-green-200"
            />
            <StepCard
              step="2"
              title="Post or Browse Deals"
              desc="Farmers post crops, buyers place bulk orders."
              color="from-yellow-100 to-yellow-200"
            />
            <StepCard
              step="3"
              title="Finalize & Deliver"
              desc="Agree on price, arrange logistics, complete deal."
              color="from-blue-100 to-blue-200"
            />
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="bg-gradient-to-r from-green-300 via-green-400 to-green-500 py-16 px-6 flex flex-col items-center text-center text-green-900 rounded-3xl shadow-2xl max-w-6xl mx-auto mt-10 mb-10">
        <h2 className="text-4xl md:text-5xl font-extrabold text-white drop-shadow-lg">
          Join the Mandi Revolution Today 🚜
        </h2>
        <p className="mt-6 text-xl text-white/90 max-w-3xl">
          Empower farmers. Get fair prices. Make agriculture sustainable.
        </p>
        <Link
          to="/register"
          className="mt-10 inline-block bg-gradient-to-r from-green-700 to-green-900 hover:from-green-800 hover:to-green-950 text-white font-bold px-10 py-4 rounded-full shadow-lg transition-all duration-300 hover:scale-110 hover:shadow-green-900/50"
        >
          Register Now
        </Link>
      </section>
    </div>
  );
}

/* Feature Card */
function FeatureCard({ icon, title, desc, bg }) {
  return (
    <div
      className={`relative bg-gradient-to-br ${bg} rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-3 hover:scale-110 overflow-hidden backdrop-blur-sm`}
    >
      {/* Decorative folded corner */}
      <div className="absolute top-0 right-0 w-10 h-10 bg-white/30 clip-corner"></div>
      <div className="flex justify-center mb-4 transition-transform duration-500 hover:scale-125">
        {icon}
      </div>
      <h3 className="text-lg font-bold text-gray-800">{title}</h3>
      <p className="mt-2 text-gray-700">{desc}</p>
    </div>
  );
}

/* Step Card */
function StepCard({ step, title, desc, color }) {
  return (
    <div
      className={`relative bg-gradient-to-br ${color} rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-500 transform hover:-translate-y-3 hover:scale-110 overflow-hidden backdrop-blur-sm`}
    >
      <div className="w-14 h-14 mx-auto rounded-full bg-white/90 text-green-700 flex items-center justify-center text-xl font-extrabold shadow-inner border border-green-300">
        {step}
      </div>
      <h3 className="mt-4 text-lg font-bold text-gray-800">{title}</h3>
      <p className="mt-2 text-gray-700">{desc}</p>
    </div>
  );
}
