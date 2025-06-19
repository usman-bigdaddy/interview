"use client";

import { useState } from "react";
import ExperienceCard from "./ExperienceCard";
import ProgramPanel from "./ProgramPanel";
import { ExperienceItem } from "../types";
interface ExperienceTabsProps {
  experiences: ExperienceItem[];
}

export default function ExperienceTabs({ experiences }: ExperienceTabsProps) {
  const [activeTab, setActiveTab] = useState("training");
  const [selectedExperience, setSelectedExperience] =
    useState<ExperienceItem | null>(null);

  const tabs = [
    { id: "all", label: "All" },
    { id: "performance", label: "Performance" },
    { id: "training", label: "Training" },
    { id: "accolades", label: "Accolades" },
    { id: "education", label: "Education" },
    { id: "job", label: "Job Titles" },
    { id: "commissions", label: "Commissions" },
    { id: "masterclass", label: "Masterclass" },
  ];

  const filteredExperiences =
    activeTab === "all"
      ? experiences
      : experiences.filter((exp) => exp.type === activeTab);

  return (
    <div className="bg-white shadow rounded-lg p-6">
      <h2 className="text-xl font-bold text-gray-900 mb-4">Experience</h2>

      <div className="border-b border-gray-200 mb-6 overflow-x-auto">
        <nav className="-mb-px flex space-x-8">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === tab.id
                  ? "border-blue-500 text-blue-600"
                  : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </nav>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredExperiences.map((experience) => (
          <ExperienceCard
            key={experience.id}
            experience={experience}
            onClick={() => setSelectedExperience(experience)}
            isSelected={selectedExperience?.id === experience.id}
          />
        ))}
      </div>

      {selectedExperience && (
        <ProgramPanel
          experience={selectedExperience}
          onClose={() => setSelectedExperience(null)}
        />
      )}
    </div>
  );
}
