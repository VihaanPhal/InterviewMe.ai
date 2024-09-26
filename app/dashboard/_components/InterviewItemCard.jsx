import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import React from "react";
import { Calendar, Clock } from "lucide-react";

const InterviewItemCard = ({ interview }) => {
  const router = useRouter();

  return (
    <div className="bg-white dark:bg-gray-800 shadow-sm rounded-lg p-6 transition duration-300 ease-in-out transform hover:shadow-md">
      <h2 className="font-bold text-xl text-gray-900 dark:text-white mb-2">
        {interview?.jobPosition}
      </h2>
      <div className="flex items-center text-sm text-gray-600 dark:text-gray-400 mb-2">
        <Clock className="w-4 h-4 mr-1" />
        <span>{interview.jobExperience} Years of Experience</span>
      </div>
      <div className="flex items-center text-xs text-gray-500 dark:text-gray-500 mb-4">
        <Calendar className="w-4 h-4 mr-1" />
        <span>Created on: {interview.createdAt}</span>
      </div>
      <div className="flex space-x-2">
        <Button
          size="sm"
          variant="default"
          className="w-full"
          onClick={() =>
            router.push(`/dashboard/interview/${interview.mockId}/feedback`)
          }
        >
          View Feedback
        </Button>
      </div>
    </div>
  );
};

export default InterviewItemCard;
