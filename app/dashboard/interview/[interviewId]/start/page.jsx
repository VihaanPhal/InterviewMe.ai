"use client";
import { db } from "@/utils/db";
import { MockInterview } from "@/utils/schema";
import React, { useEffect, useState } from "react";
import { eq } from "drizzle-orm";
import QuestionsSection from "./_component/QuestionsSection";
import RecordAnswerSection from "./_component/RecordAnswerSection";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const StartInterview = ({ params }) => {
  const [interviewData, setInterviewData] = useState(null);
  const [mockInterviewQuestions, setMockInterviewQuestions] = useState([]);
  const [activeQuestionIndex, setActiveQuestionIndex] = useState(0);
  const [isCameraOn, setIsCameraOn] = useState(true);

  useEffect(() => {
    GetInterviewDetails();
  }, []);

  const GetInterviewDetails = async () => {
    const result = await db
      .select()
      .from(MockInterview)
      .where(eq(MockInterview.mockId, params.interviewId));

    const jsonMockResp = JSON.parse(result[0].jsonMockResp);
    setMockInterviewQuestions(jsonMockResp);
    setInterviewData(result[0]);
  };

  const handleCameraToggle = (isOn) => {
    setIsCameraOn(isOn);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Interview in Progress</h1>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white shadow-md rounded-lg p-6">
          <QuestionsSection
            mockInterviewQuestions={mockInterviewQuestions}
            activeQuestionIndex={activeQuestionIndex}
          />
        </div>
        <div className="bg-white shadow-md rounded-lg p-6">
          {interviewData && interviewData.mockId ? (
            <RecordAnswerSection
              mockInterviewQuestions={mockInterviewQuestions}
              activeQuestionIndex={activeQuestionIndex}
              interviewData={interviewData}
              isCameraOn={isCameraOn}
              onCameraToggle={handleCameraToggle}
            />
          ) : (
            <p>Loading interview data...</p>
          )}
        </div>
      </div>
      <div className="flex justify-between mt-8">
        <Button
          onClick={() => setActiveQuestionIndex(activeQuestionIndex - 1)}
          disabled={activeQuestionIndex === 0}
        >
          Previous
        </Button>
        {activeQuestionIndex !== mockInterviewQuestions?.length - 1 ? (
          <Button
            onClick={() => setActiveQuestionIndex(activeQuestionIndex + 1)}
          >
            Next
          </Button>
        ) : (
          <Link href={`/dashboard/interview/${interviewData?.mockId}/feedback`}>
            <Button>End Interview</Button>
          </Link>
        )}
      </div>
    </div>
  );
};

export default StartInterview;
