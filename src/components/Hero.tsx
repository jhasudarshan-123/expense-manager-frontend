import React from "react";
import { Button } from "@/components/ui/button";
import { ArrowDown } from "lucide-react";
import heroimage from "@/assets/HeroImage.jpg";

const Hero = () => {
  const scrollToSection = (sectionId: string) => {
    const section = document.querySelector(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
     <section id="top" className="relative pt-20 md:pt-32 pb-16 md:pb-24 overflow-hidden bg-gradient-to-b from-brand-soft-blue/30 to-white">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="w-full md:w-1/2 animate-fade-in">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 text-gray-800">
              <span className="text-brand-blue">Unify</span>
              <span className="text-brand-yellow">Patients</span>
              <span className="block mt-2">Heal Naturally. Grow Together.</span>
            </h1>

            <p className="text-lg md:text-xl text-gray-600 mb-8 max-w-xl">
              A trusted community where patients and caregivers share real success stories from Ayurveda, Yoga, Naturopathy, and other natural healing methods—so you can make confident, well-informed health decisions.
            </p>

            <Button
              variant="ghost"
              className="mt-4 flex items-center gap-2 text-brand-blue hover:text-brand-blue/80"
              onClick={() => scrollToSection("#about")}
            >
              Learn More
              <ArrowDown className="h-4 w-4 animate-bounce" />
            </Button>
          </div>

          {/* RIGHT IMAGE */}
          <div className="w-full md:w-1/2 animate-fade-in-right">
            <div className="relative w-full max-w-md mx-auto hover:scale-105 transition-transform duration-300 cursor-pointer">
              
              {/* Floating bubbles */}
              <div className="absolute -top-6 -right-6 w-48 h-48 bg-brand-yellow rounded-full opacity-20 animate-pulse"></div>
              <div className="absolute -bottom-8 -left-8 w-48 h-48 bg-brand-blue rounded-full opacity-20 animate-pulse"></div>

              {/* Main Image Card */}
              <div className="relative rounded-2xl overflow-hidden shadow-2xl border-4 border-white">
                <img
                  src={heroimage}
                  alt="Diverse group of people connecting through UnifyPatients"
                  className="w-full h-auto object-cover"
                />
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* Decorative Bottom Wave */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1440 320"
          className="w-full"
        >
          <path
            fill="#FFFFFF"
            d="M0,224L48,213.3C96,203,192,181,288,154.7C384,128,480,96,576,106.7C672,117,768,171,864,197.3C960,224,1056,224,1152,208C1248,192,1344,160,1392,144L1440,128V320H0Z"
          ></path>
        </svg>
      </div>
    </section>
  );
};

export default Hero;
