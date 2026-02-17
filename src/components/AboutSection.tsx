import React from "react";
import { Button } from "@/components/ui/button";
import { ExternalLink } from "lucide-react";
import community from "@/assets/Community.jpg";

const AboutSection = () => {
  return (
    <section
      id="about"
      className="relative py-20 md:py-28 bg-gradient-to-b from-white to-brand-softBlue/20"
    >
      <div className="container mx-auto px-4">
        {/* HEADING */}
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-4">
          About <span className="text-brand-blue">Unify</span>
          <span className="text-brand-yellow">Patients</span>
        </h2>

        <p className="text-gray-600 text-center text-lg md:text-xl mb-14 max-w-2xl mx-auto">
          We're on a mission to transform healthcare experiences through the
          power of community.
        </p>

        {/* MAIN FLEX BOX (Same as HERO layout) */}
        <div className="bg-brand-soft-blue/100 rounded-2xl p-8 shadow-lg animate-fade-in hover:shadow-xl transition-shadow duration-300">
          <div className="flex flex-col md:flex-row gap-8 items-center">
            <div className="w-full md:w-1/2">
              <h3 className="text-2xl font-bold text-gray-800 mb-4">
                A Community of Support
              </h3>
              <p className="text-gray-600 mb-4">
                UnifyPatients is more than just an app—it's a supportive digital
                ecosystem where patients, caregivers, and healthcare
                professionals come together to share experiences, knowledge, and
                encouragement.
              </p>
              <p className="text-gray-600 mb-6">
                Through personalized communities based on conditions,
                treatments, and wellness goals, we create spaces where everyone
                can find understanding, empathy, and practical advice from those
                who truly understand your journey.
              </p>

              <Button variant="outline" className="gap-2 group">
                Learn Our Story
                <ExternalLink className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Button>
            </div>

            <div className="w-full md:w-1/2">
              <div className="w-full h-72 md:h-96 rounded-2xl overflow-hidden">
                <img
                  src={community}
                  alt="Community"
                  className="w-full h-full object-cover object-center"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
