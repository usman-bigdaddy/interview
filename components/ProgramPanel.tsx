
import { ExperienceItem } from '../types';
interface ProgramPanelProps {
  experience: ExperienceItem;
  onClose: () => void;
}

export default function ProgramPanel({ experience, onClose }: ProgramPanelProps) {
  return (
    <div className="mt-6 border-t border-gray-200 pt-6 animate-fade-in">
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="text-lg font-medium text-gray-900">{experience.position}</h3>
          <p className="text-sm text-gray-600">{experience.organization}</p>
        </div>
        <button
          onClick={onClose}
          className="text-gray-400 hover:text-gray-500 p-1 rounded-full hover:bg-gray-100"
          aria-label="Close panel"
        >
          <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <div>
          <p className="text-sm text-gray-500">Location</p>
          <p className="text-sm text-gray-900 font-medium">{experience.location}</p>
        </div>
        <div>
          <p className="text-sm text-gray-500">Date</p>
          <p className="text-sm text-gray-900 font-medium">{experience.date}</p>
        </div>
      </div>
      
      {experience.description && (
        <div className="mb-4">
          <p className="text-sm text-gray-500">Description</p>
          <p className="text-sm text-gray-900 mt-1">{experience.description}</p>
        </div>
      )}
      
      {experience.tags && experience.tags.length > 0 && (
        <div>
          <p className="text-sm text-gray-500">Tags</p>
          <div className="flex flex-wrap gap-2 mt-2">
            {experience.tags.map((tag) => (
              <span 
                key={tag} 
                className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}