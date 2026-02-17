import React, { useState } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Check } from 'lucide-react';

const features = [
  {
    title: "Success Stories",
    description:
      "Access real patient journeys showing improvement in conditions like PCOD, obesity, and high BP using natural healing methods.",
    longDescription:
      "Explore verified success stories from real patients who transformed their health through holistic approaches. Learn about their healing paths, treatments, and real results.",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2">
        <circle cx="12" cy="12" r="10"></circle>
        <path d="m9 12 2 2 4-4"></path>
      </svg>
    ),
  },
  {
    title: "Focused Community Platform",
    description:
      "Join a supportive healthcare community designed to share experiences, ask questions, and guide each other.",
    longDescription:
      "Engage with a community committed to natural wellness. Share your journey, learn from peers, and find guidance in a safe moderated space.",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2">
        <circle cx="9" cy="7" r="4"></circle>
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
      </svg>
    ),
  },
  {
    title: "Personalized Recommendations",
    description:
      "Get suggestions tailored to your health profile, conditions, and interest areas.",
    longDescription:
      "Our smart recommendation engine analyzes your inputs and suggests relevant healing stories, treatment approaches, and communities.",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M12 2l3 6 7 1-5 5 1 7-6-3-6 3 1-7-5-5 7-1 3-6z"></path>
      </svg>
    ),
  },
];

const FeaturesSection = () => {
  const [selectedFeature, setSelectedFeature] = useState<number | null>(null);
  const [open, setOpen] = useState(false);

  const openFeatureDialog = (i: number) => {
    setSelectedFeature(i);
    setOpen(true);
  };

  return (
    <section id="features" className="py-20 bg-gradient-to-b from-white to-brand-soft-yellow/25">
      <div className="container mx-auto px-4">

        {/* HEADINGS */}
        {/* <p className="text-brand-green font-semibold text-lg text-center mb-2">
          Real Results. Real People. Real Healing.
        </p> */}

        <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-800 mb-4">
          Key Features
        </h2>

        <p className="text-gray-600 text-center text-lg md:text-xl mb-14 max-w-2xl mx-auto">
          Discover how our platform connects you with real success stories and a supportive community for natural healing.
        </p>

        {/* FEATURES GRID */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <Card
              key={index}
              className="p-1 rounded-2xl shadow-md hover:shadow-xl transition-all cursor-pointer bg-white group"
              onClick={() => openFeatureDialog(index)}
            >
              <CardContent className="p-8 h-full flex flex-col">
                
                <div className="h-14 w-14 rounded-full bg-brand-blue/10 flex items-center justify-center text-brand-blue mb-5 group-hover:bg-brand-blue group-hover:text-white transition-all">
                  {feature.icon}
                </div>

                <h3 className="text-xl font-semibold text-gray-800 mb-3">
                  {feature.title}
                </h3>

                <p className="text-gray-600 flex-grow">
                  {feature.description}
                </p>

                <div className="mt-6 text-brand-blue flex items-center font-medium opacity-0 group-hover:opacity-100 transition-opacity">
                  Learn more <Check className="h-4 w-4 ml-2" />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* FEATURE DETAIL DIALOG */}
      <Dialog open={open} onOpenChange={setOpen}>
        {selectedFeature !== null && (
          <DialogContent className="sm:max-w-lg rounded-xl">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-full bg-brand-blue/10 flex items-center justify-center text-brand-blue">
                  {features[selectedFeature].icon}
                </div>
                {features[selectedFeature].title}
              </DialogTitle>

              <DialogDescription className="mt-4 space-y-4 text-gray-700 leading-relaxed">
                <p>{features[selectedFeature].longDescription}</p>

                <div className="bg-brand-soft-blue/20 p-4 rounded-md border border-brand-soft-blue/40">
                  <p className="text-sm italic text-gray-600">
                    “This feature was designed with real patient feedback to solve real problems.”
                  </p>
                </div>
              </DialogDescription>
            </DialogHeader>
          </DialogContent>
        )}
      </Dialog>
    </section>
  );
};

export default FeaturesSection;
