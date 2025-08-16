import { ArrowRight, ShoppingBag, Users, Truck, Leaf } from "lucide-react";
import { Link } from "react-router-dom";
import React from "react";

export default function Home() {
  return (
    <div className="bg-white text-gray-800">
      {/* Hero Section */}
      <section
        className="relative overflow-hidden min-h-[80vh] flex items-center justify-center text-center px-6"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1606788075761-977d78c8792b?auto=format&fit=crop&w=1400&q=80')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        {/* Glass overlay */}
        <div className="absolute inset-0 bg-black/40 backdrop-blur-sm"></div>

        <div className="relative z-10 max-w-3xl text-white">
          <h1 className="text-4xl md:text-6xl font-extrabold leading-tight drop-shadow-lg">
            Middleman-Free Mandi Platform
          </h1>
          <p className="mt-6 text-lg md:text-xl text-green-100">
            Connecting farmers directly to buyers — hotels, processors, exporters — for fair prices, transparent bulk crop deals, and hassle-free logistics.
          </p>

          <div className="mt-10 flex justify-center gap-6 flex-wrap">
            <Link
              to="/register"
              className="inline-flex items-center gap-2 bg-green-600 hover:bg-green-700 px-7 py-3 rounded-full font-semibold shadow-lg transition-transform duration-300 hover:scale-105"
            >
              Get Started <ArrowRight size={20} />
            </Link>
            <Link
              to="/about"
              className="inline-flex items-center gap-2 border border-green-200 px-7 py-3 rounded-full font-semibold shadow-md hover:bg-green-100 hover:text-green-800 transition duration-300"
            >
              Learn More
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gradient-to-b from-green-50 to-white px-6">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-green-700">
          Why Choose Us?
        </h2>
        <div className="mt-14 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 max-w-6xl mx-auto">
          <FeatureCard
            icon={<ShoppingBag className="w-10 h-10 text-green-700" />}
            title="Direct Crop Deals"
            desc="Sell your produce directly to buyers without paying extra commissions."
          />
          <FeatureCard
            icon={<Users className="w-10 h-10 text-yellow-700" />}
            title="Verified Buyers & Farmers"
            desc="We verify all members to ensure secure and fair transactions."
          />
          <FeatureCard
            icon={<Truck className="w-10 h-10 text-blue-700" />}
            title="Logistics Support"
            desc="Easily arrange transportation for bulk crop deliveries."
          />
          <FeatureCard
            icon={<Leaf className="w-10 h-10 text-pink-700" />}
            title="Contract Farming"
            desc="Connect with buyers for long-term, stable income opportunities."
          />
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20 bg-green-50 px-6">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-green-700">
            How It Works
          </h2>
          <div className="mt-14 grid grid-cols-1 md:grid-cols-3 gap-10">
            <StepCard
              step="1"
              title="Sign Up"
              desc="Create your account as a farmer or buyer."
            />
            <StepCard
              step="2"
              title="Post or Browse Deals"
              desc="Farmers post crops, buyers place bulk orders."
            />
            <StepCard
              step="3"
              title="Finalize & Deliver"
              desc="Agree on price, arrange logistics, and complete the deal."
            />
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="relative py-16 px-6 bg-gradient-to-r from-green-500 to-green-700 text-white text-center">
        <h2 className="text-3xl md:text-5xl font-extrabold max-w-3xl mx-auto">
          Join the Mandi Revolution Today
        </h2>
        <p className="mt-4 text-lg md:text-xl max-w-2xl mx-auto text-green-100">
          Empower farmers. Get fair prices. Make agriculture sustainable.
        </p>
        <Link
          to="/register"
          className="mt-8 inline-block bg-white text-green-700 font-semibold px-8 py-3 rounded-full shadow-lg transition-transform duration-300 hover:scale-110"
        >
          Register Now
        </Link>
      </section>
    </div>
  );
}

function FeatureCard({ icon, title, desc }) {
  return (
    <div className="bg-white rounded-2xl p-6 shadow-md hover:shadow-xl transition duration-300 text-center border border-gray-100">
      <div className="flex justify-center mb-4">{icon}</div>
      <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
      <p className="mt-2 text-gray-600 text-sm">{desc}</p>
    </div>
  );
}

function StepCard({ step, title, desc }) {
  return (
    <div className="bg-white rounded-xl p-8 shadow-md hover:shadow-xl transition duration-300 text-center border border-gray-100">
      <div className="w-14 h-14 mx-auto rounded-full bg-green-100 text-green-700 flex items-center justify-center text-xl font-bold mb-4">
        {step}
      </div>
      <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
      <p className="mt-2 text-gray-600 text-sm">{desc}</p>
    </div>
  );
}
