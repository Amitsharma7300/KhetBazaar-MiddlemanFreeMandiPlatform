import { ShieldCheck, Lock, Eye, FileText, Cookie, Users, Mail, Globe } from "lucide-react";

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 via-white to-green-100 py-12 px-6">
      <div className="max-w-4xl mx-auto bg-white rounded-3xl shadow-xl p-10 border border-green-100">
        
        {/* Header */}
        <div className="flex flex-col items-center text-center gap-3 mb-10">
          <ShieldCheck className="w-12 h-12 text-green-600" />
          <h1 className="text-4xl font-extrabold bg-gradient-to-r from-green-600 to-emerald-500 bg-clip-text text-transparent">
            Privacy Policy
          </h1>
          <p className="text-gray-600 max-w-2xl">
            Your privacy matters to us. This policy explains how we collect, use, and protect your personal data while you use our platform.
          </p>
        </div>

        {/* Sections */}
        <div className="space-y-6">
          
          {/* Data Collection */}
          <div className="bg-green-50 p-6 rounded-2xl shadow-sm flex gap-4 items-start hover:shadow-md transition">
            <FileText className="w-8 h-8 text-green-600 mt-1" />
            <div>
              <h2 className="text-2xl font-semibold text-green-700">Information We Collect</h2>
              <p className="text-gray-600 mt-2">
                We collect personal details such as name, email, phone number, and any information you provide while using our services. We also gather device information, IP address, and usage data to improve your experience.
              </p>
            </div>
          </div>

          {/* Usage */}
          <div className="bg-green-50 p-6 rounded-2xl shadow-sm flex gap-4 items-start hover:shadow-md transition">
            <Eye className="w-8 h-8 text-green-600 mt-1" />
            <div>
              <h2 className="text-2xl font-semibold text-green-700">How We Use Your Data</h2>
              <p className="text-gray-600 mt-2">
                Your data is used for account management, order processing, service improvements, sending important updates, and ensuring a personalized user experience. We never sell your personal information to third parties.
              </p>
            </div>
          </div>

          {/* Cookies */}
          <div className="bg-green-50 p-6 rounded-2xl shadow-sm flex gap-4 items-start hover:shadow-md transition">
            <Cookie className="w-8 h-8 text-green-600 mt-1" />
            <div>
              <h2 className="text-2xl font-semibold text-green-700">Cookies & Tracking</h2>
              <p className="text-gray-600 mt-2">
                We use cookies and similar tracking technologies to remember your preferences, understand user behavior, and improve site performance. You can disable cookies in your browser settings, but some features may not work properly.
              </p>
            </div>
          </div>

          {/* Third Party */}
          <div className="bg-green-50 p-6 rounded-2xl shadow-sm flex gap-4 items-start hover:shadow-md transition">
            <Users className="w-8 h-8 text-green-600 mt-1" />
            <div>
              <h2 className="text-2xl font-semibold text-green-700">Third-Party Services</h2>
              <p className="text-gray-600 mt-2">
                We may work with third-party partners for analytics, payment processing, or delivery services. These partners are bound by confidentiality agreements and cannot use your data for unrelated purposes.
              </p>
            </div>
          </div>

          {/* Security */}
          <div className="bg-green-50 p-6 rounded-2xl shadow-sm flex gap-4 items-start hover:shadow-md transition">
            <Lock className="w-8 h-8 text-green-600 mt-1" />
            <div>
              <h2 className="text-2xl font-semibold text-green-700">Data Protection</h2>
              <p className="text-gray-600 mt-2">
                We implement industry-standard security measures, including encryption and secure servers, to protect your personal information from unauthorized access, alteration, or disclosure.
              </p>
            </div>
          </div>

          {/* User Rights */}
          <div className="bg-green-50 p-6 rounded-2xl shadow-sm flex gap-4 items-start hover:shadow-md transition">
            <Globe className="w-8 h-8 text-green-600 mt-1" />
            <div>
              <h2 className="text-2xl font-semibold text-green-700">Your Rights</h2>
              <p className="text-gray-600 mt-2">
                You have the right to access, correct, or delete your personal data. You may also withdraw consent for certain processing activities at any time by contacting us.
              </p>
            </div>
          </div>

        </div>

        {/* Footer */}
        <div className="mt-10 text-center border-t pt-6">
          <p className="text-gray-500 text-sm">
            Last updated: August 12, 2025
          </p>
          <p className="text-gray-600 mt-2 flex justify-center items-center gap-2">
            <Mail className="w-4 h-4 text-green-600" /> 
            Contact us at <span className="text-green-600 font-medium">support@yourplatform.com</span>
          </p>
        </div>
      </div>
    </div>
  );
}
