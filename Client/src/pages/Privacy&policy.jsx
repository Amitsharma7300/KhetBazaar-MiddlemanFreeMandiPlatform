import { ShieldCheck, Lock, Eye, FileText, Cookie, Users, Globe, Mail } from "lucide-react";
import { Helmet } from "react-helmet-async";

export default function PrivacyPolicy() {
  return (
    <>
      <Helmet>
        <title>Privacy Policy - MandiFree</title>
        <meta
          name="description"
          content="Learn how MandiFree collects, uses, and protects your personal data. Your privacy is our priority."
        />
        <meta name="keywords" content="Privacy Policy, MandiFree, Data Protection, User Rights, Cookies" />
      </Helmet>

      <div className="min-h-screen bg-gradient-to-b from-green-50 via-white to-green-100 py-12 px-6">
        <div className="max-w-4xl mx-auto bg-white rounded-3xl shadow-xl p-10 border border-green-100">
          
          {/* Header */}
          <header className="flex flex-col items-center text-center gap-3 mb-10">
            <ShieldCheck className="w-12 h-12 text-green-600" aria-hidden="true" />
            <h1 className="text-4xl font-extrabold bg-gradient-to-r from-green-600 to-emerald-500 bg-clip-text text-transparent">
              Privacy Policy
            </h1>
            <p className="text-gray-600 max-w-2xl">
              Your privacy matters to us. This policy explains how we collect, use, and protect your personal data while using our platform.
            </p>
          </header>

          {/* Sections */}
          <main className="space-y-6">
            
            {/* Data Collection */}
            <PolicySection
              icon={<FileText />}
              title="Information We Collect"
              text="We collect personal details such as name, email, phone number, and any information you provide while using our services. We also gather device information, IP address, and usage data to improve your experience."
            />

            {/* Usage */}
            <PolicySection
              icon={<Eye />}
              title="How We Use Your Data"
              text="Your data is used for account management, order processing, service improvements, sending important updates, and ensuring a personalized user experience. We never sell your personal information to third parties."
            />

            {/* Cookies */}
            <PolicySection
              icon={<Cookie />}
              title="Cookies & Tracking"
              text="We use cookies and similar tracking technologies to remember your preferences, understand user behavior, and improve site performance. You can disable cookies in your browser settings, but some features may not work properly."
            />

            {/* Third Party */}
            <PolicySection
              icon={<Users />}
              title="Third-Party Services"
              text="We may work with third-party partners for analytics, payment processing, or delivery services. These partners are bound by confidentiality agreements and cannot use your data for unrelated purposes."
            />

            {/* Security */}
            <PolicySection
              icon={<Lock />}
              title="Data Protection"
              text="We implement industry-standard security measures, including encryption and secure servers, to protect your personal information from unauthorized access, alteration, or disclosure."
            />

            {/* User Rights */}
            <PolicySection
              icon={<Globe />}
              title="Your Rights"
              text="You have the right to access, correct, or delete your personal data. You may also withdraw consent for certain processing activities at any time by contacting us."
            />

          </main>

          {/* Footer */}
          <footer className="mt-10 text-center border-t pt-6">
            <p className="text-gray-500 text-sm">Last updated: August 14, 2025</p>
            <p className="text-gray-600 mt-2 flex justify-center items-center gap-2">
              <Mail className="w-4 h-4 text-green-600" aria-hidden="true" /> 
              Contact us at <span className="text-green-600 font-medium">support@mandiplatform.com</span>
            </p>
          </footer>
        </div>
      </div>
    </>
  );
}

function PolicySection({ icon, title, text }) {
  return (
    <section className="bg-green-50 p-6 rounded-2xl shadow-sm flex gap-4 items-start hover:shadow-md transition">
      <span className="w-8 h-8 text-green-600 mt-1">{icon}</span>
      <div>
        <h2 className="text-2xl font-semibold text-green-700">{title}</h2>
        <p className="text-gray-600 mt-2">{text}</p>
      </div>
    </section>
  );
}
