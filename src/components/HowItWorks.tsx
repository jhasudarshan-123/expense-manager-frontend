import React from "react";
import { useNavigate } from "react-router-dom";

const steps = [
  {
    number: "01",
    title: "Join for Free",
    description: "Create an account with just a few details.",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26"
        viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
        strokeLinecap="round" strokeLinejoin="round">
        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
        <circle cx="12" cy="7" r="4"></circle>
      </svg>
    )
  },
  {
    number: "02",
    title: "Personalize Your Journey",
    description: "Choose your conditions, healing interests, and treatment preferences.",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26"
        viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
        strokeLinecap="round" strokeLinejoin="round">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
        <circle cx="9" cy="7" r="4"></circle>
        <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
        <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
      </svg>
    )
  },
  {
    number: "03",
    title: "Learn & Connect",
    description: "Read stories, share your journey, and find support.",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26"
        viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
        strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
      </svg>
    )
  }
];

const HowItWorks = () => {
  const navigate = useNavigate();

  // 👉 Step 01 click par signup page navigate karega
  const handleClick = (index) => {
    if (index === 0) {
      navigate("/signup");
    }
  };

  return (
    <section
      id="how-it-works"
      className="section-container relative overflow-hidden bg-gradient-to-b from-white to-brand-soft-blue/20"
    >
      {/* Background Blobs */}
      <div className="absolute top-20 left-10 w-64 h-64 bg-brand-yellow/25 blur-3xl rounded-full"></div>
      <div className="absolute bottom-20 right-10 w-64 h-64 bg-brand-green/25 blur-3xl rounded-full"></div>

      <div className="relative z-10">
        <h2 className="section-title">How It Works</h2>

        <p className="section-subtitle">
          Getting started is simple. Follow these steps to begin your healing journey.
        </p>

        {/* STEPS GRID */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mt-16">
          {steps.map((step, index) => (
            <div
              key={index}
              className="relative flex flex-col items-center text-center cursor-pointer"
              onClick={() => handleClick(index)}
            >
              {/* CARD */}
              <div
                className="
                  bg-white rounded-2xl border border-gray-100 shadow-md 
                  hover:shadow-xl hover:border-brand-blue transition-all duration-300
                  p-8 w-full max-w-sm mx-auto relative hover:-translate-y-1
                "
              >
                {/* Number & Title */}
                <div className="flex flex-col items-center mb-4">
                  <div
                    className="
                      h-14 w-14 rounded-full bg-brand-green text-white shadow 
                      flex items-center justify-center font-bold text-xl
                    "
                  >
                    {step.number}
                  </div>

                  <h3 className="text-xl font-semibold mt-3 text-gray-800">
                    {step.title}
                  </h3>
                </div>

                {/* Description */}
                <p className="text-gray-600 leading-relaxed">
                  {step.description}
                </p>

                {/* Icon watermark */}
                <div className="absolute -right-2 -bottom-2 h-16 w-16 opacity-20 text-brand-green">
                  {step.icon}
                </div>
              </div>

              {/* Connector line */}
              {index < steps.length - 1 && (
                <div className="hidden md:block absolute top-1/2 left-full w-full h-1 bg-gray-200"></div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
