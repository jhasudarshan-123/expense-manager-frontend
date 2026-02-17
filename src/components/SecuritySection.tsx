import React from 'react';
import { Card, CardContent } from "@/components/ui/card";

const securityFeatures = [
  {
    title: "End-to-End Encryption",
    description: "Your personal conversations and health data are protected with advanced encryption technology.",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect width="18" height="11" x="3" y="11" rx="2" ry="2"></rect>
        <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
      </svg>
    )
  },
  {
    title: "Secure Authentication",
    description: "Multi-factor authentication options to ensure only you can access your account.",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
      </svg>
    )
  },
  {
    title: "Privacy Controls",
    description: "Granular privacy settings let you control exactly what you share and with whom.",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M14.5 9.5 9 4"></path>
        <path d="m9 9.5 5.5-5.5"></path>
        <path d="M3 20h18"></path>
        <path d="M12 2v18"></path>
      </svg>
    )
  }
];

const SecuritySection = () => {
  return (
    <section id="security" className="py-20 bg-gradient-to-b from-white to-brand-soft-yellow/25">
      <div className="container mx-auto px-4">

        {/* Heading */}
        <p className="text-brand-green font-semibold text-lg text-center mb-2">
          Your Safety Comes First
        </p>

        <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-800 mb-4">
          Security & Privacy
        </h2>

        <p className="text-center text-gray-600 max-w-2xl mx-auto mb-14">
          Your trust is our priority. UnifyPatients is built with industry-leading security measures.
        </p>

        {/* GRID */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {securityFeatures.map((feature, index) => (
            <div key={index} className="bg-white rounded-xl p-6 shadow-md hover-lift">
              <div className="h-12 w-12 rounded-full bg-brand-green/10 flex items-center justify-center text-brand-green mb-4">
                {feature.icon}
              </div>
              <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default SecuritySection;
