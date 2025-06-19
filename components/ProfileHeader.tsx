import { User } from "@/types";
import { HiCheck, HiLocationMarker } from "react-icons/hi";

interface ProfileHeaderProps {
  user: User;
}

export default function ProfileHeader({ user }: ProfileHeaderProps) {
  return (
    <div className="bg-white shadow rounded-lg p-6 mb-6">
      <div className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-6">
        <div className="relative self-start sm:self-auto">
          <img
            className="h-20 w-20 rounded-full object-cover ring-4 ring-white shadow"
            src={`https://ui-avatars.com/api/?name=${encodeURIComponent(
              user.name
            )}&background=random`}
            alt={user.name}
          />
          <span className="absolute bottom-0 right-0 bg-blue-500 text-white rounded-full p-1 shadow-sm flex items-center justify-center">
            <HiCheck className="h-3 w-3" />
          </span>
        </div>
        <div className="flex-1">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">{user.name}</h1>
              <p className="text-gray-600 flex items-center mt-1">
                <HiLocationMarker className="h-4 w-4 mr-1 flex-shrink-0" />
                <span className="truncate">
                  {user.address.city}, {user.address.street}
                </span>
              </p>
            </div>
            <div className="flex items-center gap-2 mt-2 sm:mt-0">
              <span className="text-xs sm:text-sm bg-blue-100 text-blue-800 px-2 py-1 rounded-full">
                Verified
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
