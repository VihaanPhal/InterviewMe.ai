"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import dynamic from "next/dynamic";
import { Button } from "@/components/ui/button";
import useSpeechToText from "react-hook-speech-to-text";
import { CircleStop, Mic } from "lucide-react";
import { toast } from "sonner";
import { chatSession } from "@/utils/GeminiAiModel";
import { db } from "@/utils/db";
import moment from "moment";

import { UserAnswer } from "@/utils/schema";
import { useUser } from "@clerk/nextjs";

// Dynamically import the Webcam component to ensure it only renders on the client side
const Webcam = dynamic(() => import("react-webcam"), { ssr: false });

function RecordAnswerSection({
  mockInterviewQuestions,
  activeQuestionIndex,
  interviewData,
}) {
  // Correct destructuring
  const {
    error,
    interimResult,
    isRecording,
    results,
    startSpeechToText,
    stopSpeechToText,
    setResults,
  } = useSpeechToText({
    continuous: true,
    useLegacyResults: false,
  });

  const { user } = useUser();
  const [isClient, setIsClient] = useState(false);
  const [userAnswer, setUserAnswer] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, [interviewData]);

  useEffect(() => {
    if (!isRecording && userAnswer.length > 10) {
      UpdateUserAnswer();
    }
  }, [userAnswer]);

  useEffect(() => {
    results.map((result) =>
      setUserAnswer((prevAns) => prevAns + result?.transcript)
    );
  }, [results]);

  const StartStopRecording = async () => {
    if (isRecording) {
      stopSpeechToText();
    } else {
      startSpeechToText();
    }
  };

  const UpdateUserAnswer = async () => {
    console.log(userAnswer);
    setLoading(true);
    const feedbackPrompt =
      "Question" +
      mockInterviewQuestions[activeQuestionIndex]?.Question +
      ", User Answer: " +
      userAnswer +
      "depending on question and user answer for given interview question please give us rating for answer and feedback as area for improvement if any in just 3-5 lines to improve it in JSON format with rating field and feedback field. just give feedback nothing else";
    const result = await chatSession.sendMessage(feedbackPrompt);
    const mockJsonResp = result.response
      .text()
      .replace("```json", "")
      .replace("```", "");

    console.log(mockJsonResp);
    const JsonFeedbackResp = JSON.parse(mockJsonResp);

    const resp = await db.insert(UserAnswer).values({
      mockIdRef: interviewData?.mockId, // Ensure correct key usage
      question: mockInterviewQuestions[activeQuestionIndex]?.Question,
      correctAns: mockInterviewQuestions[activeQuestionIndex]?.Answer,
      userAns: userAnswer,
      feedback: JsonFeedbackResp.feedback,
      rating: JsonFeedbackResp.rating,
      userEmail: user?.primaryEmailAddress?.emailAddress,
      createdAt: moment().format("DD-MM-yyyy"),
    });
    if (resp) {
      toast("User Answer recorded successfully");
      setUserAnswer("");
      setResults([]);
    }
    setUserAnswer([]);
    setLoading(false);
  };

  return (
    <div className="flex items-center justify-center flex-col">
      <div
        className="relative flex flex-col justify-center items-center bg-gray-200 rounded-lg p-5 my-5"
        style={{ height: 400, width: "100%" }}
      >
        {isClient ? (
          <div className="relative flex justify-center items-center bg-gray-800 rounded-lg overflow-hidden w-full h-full">
            <Image
              src="/webcam.png"
              width={200}
              height={200}
              alt="Webcam Icon"
              className="absolute z-10"
            />
            <Webcam
              mirrored={true}
              className="absolute z-20 border-8 border-black rounded-lg"
              style={{
                height: "100%",
                width: "100%",
                objectFit: "cover",
              }}
              onUserMedia={() => console.log("Webcam accessed")}
              onUserMediaError={(error) => console.error("Webcam error", error)}
            />
          </div>
        ) : (
          <div style={{ width: 200, height: 200 }} /> // Placeholder to maintain layout
        )}
      </div>
      <Button
        disabled={loading}
        onClick={StartStopRecording}
        className={`flex items-center justify-center w-48 px-4 py-2 text-white font-semibold rounded-md transition-all duration-300 ${
          isRecording
            ? "bg-red-600 hover:bg-red-700"
            : "bg-red-500 hover:bg-red-600"
        }`}
        variant="outline"
      >
        {isRecording ? (
          <div className="flex items-center space-x-2">
            <CircleStop className="w-5 h-5 text-white" />
            <span>Recording ...</span>
          </div>
        ) : (
          <div className="flex items-center space-x-2">
            <Mic className="w-5 h-5 text-white" />
            <span>Record Answer</span>
          </div>
        )}
      </Button>
    </div>
  );
}

export default RecordAnswerSection;
