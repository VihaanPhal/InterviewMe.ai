import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import React from "react";
import Interview from "../interview/[interviewId]/page";

const InterviewItemCard = ({ interview }) => {
  const router = useRouter();
  const onStart = () => {
    router.push("/dashboard/interview/" + interview.mockId);
  };

  return (
    <div className="border shadow-sm rounded=lg p-3">
      <h2 className="font-bold text-primary">{interview?.jobPosition}</h2>

      <h2 className="text-sm text-gray-600">
        {interview.jobExperience} Years of Experience
      </h2>
      <h2 className="text-xs text-gray-400">
        Created at: {interview.createdAt}
      </h2>
      <div className="justify-between mt-2 flex gap-5">
        <Button
          size="sm"
          variant="outline"
          className="w-full hover:bg-black hover:text-white"
          onClick={() =>
            router.push(
              "/dashboard/interview/" + interview.mockId + "/feedback"
            )
          }
        >
          Feedback
        </Button>
      </div>
    </div>
  );
};

export default InterviewItemCard;
