import React from "react";
import { Users, Heart, Stethoscope } from "lucide-react";
import caregiverImg from "@/assets/Caregiver12.jpg";
import patients from "@/assets/Patients1.jpg";
import doctors from "@/assets/Doctors.jpg";

const users = [
  {
    type: "Patients",
    description:
      "For individuals exploring natural and alternative healing methods, looking for trustworthy, experience-driven guidance from real people who overcame similar health challenges.",
    icon: Users,
    image: patients,
  },
  {
    type: "Caregivers",
    description:
      "For family members supporting loved ones on their wellness journey — connecting them to shared stories and guidance.",
    icon: Heart,
    image: caregiverImg,
    renderImage: (
      <div className="w-full h-64 rounded-2xl overflow-hidden">
        <img
          src={caregiverImg}
          alt="Caregiver"
          className="w-full h-full object-cover"
        />
      </div>
    ),
  },

  {
    type: "Healthcare Professionals",
    description:
      "For doctors, yoga therapists, naturopaths, nutritionists, and holistic experts who want to share knowledge, answer questions, and guide patients exploring natural healing.",
    icon: Stethoscope,
    image: doctors,
  },
];

const TargetUsers = () => {
  return (
    <section className="py-20 bg-gradient-to-b from-brand-softYellow/20 to-white">
      <div className="container mx-auto px-4">
        {/* Heading */}
        <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-800 mb-4">
          Who Uses <span className="text-brand-blue">Unify</span>
          <span className="text-brand-yellow">Patients</span>
        </h2>

        <p className="text-center text-gray-600 max-w-2xl mx-auto mb-14">
          A unified ecosystem that connects patients, caregivers, and experts
          for a complete, supportive healing experience.
        </p>

        {/* Section Blocks */}
        <div className="flex flex-col gap-20 md:gap-28">
          {users.map((user, index) => {
            const Icon = user.icon;
            const isEven = index % 2 === 0;

            return (
              <div
                key={index}
                className={`flex flex-col ${
                  isEven ? "md:flex-row" : "md:flex-row-reverse"
                } items-center gap-10`}
              >
                {/* IMAGE SECTION */}
                <div className="w-full md:w-1/2">
                  <div className="relative group">
                    <div
                      className={`absolute inset-0 bg-brand-blue/10 rounded-3xl blur-md scale-105 opacity-70 transition-all duration-200 ${
                        isEven
                          ? "translate-x-3 -translate-y-3"
                          : "-translate-x-3 translate-y-3"
                      }`}
                    ></div>

                    <img
  src={user.image}
  alt={user.type}
  className="relative rounded-3xl shadow-xl w-full max-h-80 object-cover transition-transform duration-300 group-hover:scale-105"
/>

                  </div>
                </div>

                {/* TEXT SECTION */}
                <div className="w-full md:w-1/2">
                  <div className="flex items-center gap-4 mb-5">
                    <div className="h-12 w-12 rounded-full bg-brand-green/10 flex items-center justify-center text-brand-green">
                      <Icon className="h-6 w-6" />
                    </div>

                    <h3 className="text-2xl md:text-3xl font-bold text-gray-800">
                      {user.type}
                    </h3>
                  </div>

                  <p className="text-gray-600 text-lg leading-relaxed">
                    {user.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default TargetUsers;
