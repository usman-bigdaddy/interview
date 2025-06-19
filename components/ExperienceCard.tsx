import { ExperienceItem } from "../types";
import { FiMapPin, FiCalendar } from "react-icons/fi";

interface ExperienceCardProps {
  experience: ExperienceItem;
  onClick: () => void;
  isSelected: boolean;
}

export default function ExperienceCard({
  experience,
  onClick,
  isSelected,
}: ExperienceCardProps) {
  return (
    <div
      onClick={onClick}
      className={`border rounded-lg p-4 cursor-pointer transition-all ${
        isSelected
          ? "border-blue-500 ring-2 ring-blue-200 bg-blue-50"
          : "border-gray-200 hover:border-gray-300 hover:bg-gray-50"
      }`}
    >
      <div className="flex items-start">
        <div className="flex items-center justify-center h-10 w-10 rounded-full bg-blue-100 text-blue-600 font-bold mr-3 flex-shrink-0">
          {experience.position.charAt(0).toUpperCase()}
        </div>
        <div>
          <h3 className="font-semibold text-gray-900 text-md">
            {experience.position}
          </h3>
          <p className="text-sm text-gray-600">{experience.organization}</p>

          <div className="text-sm text-gray-500 mt-2 space-y-1">
            <div className="flex items-center gap-1">
              <FiMapPin className="text-blue-500" />
              <span>{experience.location}</span>
            </div>

            <div className="flex items-center gap-1">
              <FiCalendar className="text-blue-500" />
              <span>{experience.date}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
