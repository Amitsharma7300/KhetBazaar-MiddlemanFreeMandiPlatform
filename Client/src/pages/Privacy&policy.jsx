import { ShieldCheck, Lock, Eye, FileText } from "lucide-react";

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-white py-12 px-6">
      <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-lg p-8 border border-green-100">
        
        {/* Header */}
        <div className="flex items-center gap-3 mb-6">
          <ShieldCheck className="w-8 h-8 text-green-600" />
          <h1 className="text-3xl font-bold text-green-700">Privacy Policy</h1>
        </div>

        <p className="text-gray-600 mb-8">
          Your privacy matters to us. This Privacy Policy explains how we collect, use, and protect your personal information when you use our platform.
        </p>

        {/* Sections */}
        <div className="space-y-6">
          
          {/* Data Collection */}
          <div className="bg-green-50 p-5 rounded-lg shadow-sm flex gap-4 items-start">
            <FileText className="w-6 h-6 text-green-600 mt-1" />
            <div>
              <h2 className="text-xl font-semibold text-green-700">Information We Collect</h2>
              <p className="text-gray-600">
                We collect personal details like name, email, phone number, and any information you provide while using our services. We also gather usage data to improve your experience.
              </p>
            </div>
          </div>

          {/* Usage */}
          <div className="bg-green-50 p-5 rounded-lg shadow-sm flex gap-4 items-start">
            <Eye className="w-6 h-6 text-green-600 mt-1" />
            <div>
              <h2 className="text-xl font-semibold text-green-700">How We Use Your Data</h2>
              <p className="text-gray-600">
                Your data is used for account management, order processing, service improvement, and sending important updates. We never sell your information to third parties.
              </p>
            </div>
          </div>

          {/* Security */}
          <div className="bg-green-50 p-5 rounded-lg shadow-sm flex gap-4 items-start">
            <Lock className="w-6 h-6 text-green-600 mt-1" />
            <div>
              <h2 className="text-xl font-semibold text-green-700">Data Protection</h2>
              <p className="text-gray-600">
                We uses industry-standard security measures to safeguard your information from unauthorized access, alteration, or disclosure.
              </p>
            </div>
            
          </div>
        </div>
        

        {/* Footer */}
        <p className="mt-8 text-gray-500 text-sm text-center">
          Last updated: August 12, 2025  
          <br /> For any questions, contact us at <span className="text-green-600 font-semibold">support@yourplatform.com</span>
        </p>
      </div>
    </div>
  );
}
