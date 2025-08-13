import { ArrowRight, ShoppingBag, Users, Truck, Leaf } from "lucide-react";
import { Link } from "react-router-dom";
import React from "react";

export default function Home() {
  return (
    <div className="bg-gradient-to-b from-green-50 via-white to-green-100 text-gray-800">
      {/* Hero Section */}
      <section
        className="relative overflow-hidden py-10 text-center text-white w-full"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1606788075761-977d78c8792b?auto=format&fit=crop&w=1400&q=80')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        {/* Dark green gradient overlay with radial vignette */}
        <div className="absolute inset-0 bg-gradient-to-t from-green-900/80 via-green-800/60 to-green-900/90 pointer-events-none"></div>
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(circle at center, transparent 40%, rgba(4, 120, 87, 0.7) 100%)",
          }}
        ></div>

        <div className="relative z-10 px-6">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold leading-tight drop-shadow-lg animate-fadeInUp">
            Middleman-Free Mandi Platform
          </h1>
          <p className="mt-3 text-base sm:text-lg text-green-100 max-w-none animate-fadeInUp delay-150">
           Connecting farmers directly to buyers — hotels, processors, exporters — for fair prices, no middlemen, and transparent bulk crop deals.
Empowering farmers with technology to ensure transparency, timely payments, and access to a wider market. Experience hassle-free crop selling with real-time deal tracking and trusted logistics support — all designed to maximize your income and strengthen agricultural communities.
          </p>
          <div className="mt-8 flex justify-center gap-6 flex-wrap animate-fadeInUp delay-300">
            <Link
              to="/register"
              className="inline-flex items-center gap-3 bg-gradient-to-r from-green-500 to-green-700 hover:from-green-600 hover:to-green-800 px-6 py-2.5 rounded-full font-semibold shadow-xl transition-transform duration-300 hover:scale-105"
            >
              Get Started <ArrowRight size={20} />
            </Link>
            <Link
              to="/about"
              className="inline-flex items-center gap-3 border-2 border-green-100 px-6 py-2.5 rounded-full font-semibold shadow-md hover:bg-green-100 hover:text-green-900 transition-colors duration-300 hover:scale-105"
            >
              Learn More
            </Link>
          </div>
        </div>

        {/* Floating subtle green circles */}
        <div className="pointer-events-none absolute top-6 left-6 w-16 h-16 rounded-full bg-green-600 opacity-30 blur-3xl animate-floatSlow"></div>
        <div className="pointer-events-none absolute bottom-8 right-10 w-24 h-24 rounded-full bg-green-700 opacity-25 blur-3xl animate-floatSlow delay-3000"></div>
      </section>

      {/* Features */}
      <section className="py-16 px-6">
        <h2 className="text-3xl font-bold text-center text-green-700">Why Choose Us?</h2>
        <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 max-w-6xl mx-auto">
          <FeatureCard
            bg="from-green-100 to-green-200"
            icon={<ShoppingBag className="w-12 h-12 text-green-800" />}
            title="Direct Crop Deals"
            desc="Sell your produce directly to buyers without paying extra commissions."
          />
          <FeatureCard
            bg="from-yellow-100 to-yellow-200"
            icon={<Users className="w-12 h-12 text-yellow-800" />}
            title="Verified Buyers & Farmers"
            desc="We verify all members to ensure secure and fair transactions."
          />
          <FeatureCard
            bg="from-blue-100 to-blue-200"
            icon={<Truck className="w-12 h-12 text-blue-800" />}
            title="Logistics Support"
            desc="Easily arrange transportation for bulk crop deliveries."
          />
          <FeatureCard
            bg="from-pink-100 to-pink-200"
            icon={<Leaf className="w-12 h-12 text-pink-800" />}
            title="Contract Farming"
            desc="Connect with buyers for long-term, stable income opportunities."
          />
        </div>
      </section>

      {/* How It Works */}
      <section
        className="py-16 px-6"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=1400&q=80')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="bg-white/80 rounded-2xl max-w-5xl mx-auto p-10 shadow-xl">
          <h2 className="text-3xl font-bold text-center text-green-700">How It Works</h2>
          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <StepCard
              step="1"
              title="Sign Up"
              desc="Create your account as a farmer or buyer."
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
              desc="Agree on price, arrange logistics, and complete the deal."
              color="from-blue-100 to-blue-200"
            />
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="bg-green-200 py-8 px-6 flex flex-col items-center text-center text-green-900 rounded-xl shadow-inner max-w-7xl mx-auto mt-6 mb-6">
        <h2 className="text-3xl md:text-4xl font-extrabold drop-shadow-sm max-w-3xl">
          Join the Mandi Revolution Today
        </h2>
        <p className="mt-4 text-lg max-w-2xl text-green-900/90">
          Empower farmers. Get fair prices. Make agriculture sustainable.
        </p>
        <Link
          to="/register"
          className="mt-8 inline-block bg-gradient-to-r from-green-400 to-green-600 hover:from-green-500 hover:to-green-700 text-white font-semibold px-8 py-3 rounded-full shadow-md transition-transform duration-300 hover:scale-105"
        >
          Register Now
        </Link>
      </section>
    </div>
  );
}

function FeatureCard({ icon, title, desc, bg }) {
  return (
    <div
      className={`relative bg-gradient-to-br ${bg} rounded-xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 hover:scale-105 overflow-hidden`}
    >
      {/* Folded corner */}
      <div className="absolute top-0 right-0 w-10 h-10 bg-white bg-opacity-30 backdrop-blur-sm clip-corner"></div>
      <div className="absolute top-0 right-0 w-0 h-0 border-t-[40px] border-t-transparent border-l-[40px] border-l-white border-opacity-50"></div>

      <div className="flex justify-center mb-4 transition-transform duration-300 hover:scale-125">{icon}</div>
      <h3 className="text-lg font-bold text-gray-800">{title}</h3>
      <p className="mt-2 text-gray-700">{desc}</p>
    </div>
  );
}

function StepCard({ step, title, desc, color }) {
  return (
    <div
      className={`relative bg-gradient-to-br ${color} rounded-xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 hover:scale-105 overflow-hidden`}
    >
      {/* Folded corner */}
      <div className="absolute top-0 right-0 w-10 h-10 bg-white bg-opacity-30 backdrop-blur-sm clip-corner"></div>
      <div className="absolute top-0 right-0 w-0 h-0 border-t-[40px] border-t-transparent border-l-[40px] border-l-white border-opacity-50"></div>

      <div className="w-14 h-14 mx-auto rounded-full bg-white/80 text-green-700 flex items-center justify-center text-xl font-bold shadow-inner border border-green-300">
        {step}
      </div>
      <h3 className="mt-4 text-lg font-bold text-gray-800">{title}</h3>
      <p className="mt-2 text-gray-700">{desc}</p>
    </div>
  );
}
