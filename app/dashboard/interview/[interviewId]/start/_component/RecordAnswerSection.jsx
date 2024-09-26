"use client";
import React, { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import { Button } from "@/components/ui/button";
import useSpeechToText from "react-hook-speech-to-text";
import { Camera, CameraOff, CircleStop, Mic } from "lucide-react";
import { toast } from "sonner";
import { chatSession } from "@/utils/GeminiAiModel";
import { db } from "@/utils/db";
import moment from "moment";
import { UserAnswer } from "@/utils/schema";
import { useUser } from "@clerk/nextjs";

const Webcam = dynamic(() => import("react-webcam"), { ssr: false });

function RecordAnswerSection({
  mockInterviewQuestions,
  activeQuestionIndex,
  interviewData,
  isCameraOn,
  onCameraToggle,
}) {
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
    setLoading(true);
    const feedbackPrompt = `Question: ${mockInterviewQuestions[activeQuestionIndex]?.Question}, User Answer: ${userAnswer}. Please provide a rating and feedback for the answer in JSON format with 'rating' and 'feedback' fields. The feedback should be 3-5 lines long and focus on areas for improvement.`;

    try {
      const result = await chatSession.sendMessage(feedbackPrompt);
      const mockJsonResp = result.response
        .text()
        .replace("```json", "")
        .replace("```", "");

      const JsonFeedbackResp = JSON.parse(mockJsonResp);

      await db.insert(UserAnswer).values({
        mockIdRef: interviewData?.mockId,
        question: mockInterviewQuestions[activeQuestionIndex]?.Question,
        correctAns: mockInterviewQuestions[activeQuestionIndex]?.Answer,
        userAns: userAnswer,
        feedback: JsonFeedbackResp.feedback,
        rating: JsonFeedbackResp.rating,
        userEmail: user?.primaryEmailAddress?.emailAddress,
        createdAt: moment().format("DD-MM-yyyy"),
      });

      toast.success("Answer recorded successfully");
      setUserAnswer("");
      setResults([]);
    } catch (error) {
      console.error("Error updating user answer:", error);
      toast.error("Failed to record answer. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="aspect-video bg-gray-100 rounded-lg overflow-hidden">
        {isClient && isCameraOn ? (
          <Webcam
            mirrored
            className="w-full h-full object-cover"
            onUserMedia={() => console.log("Webcam accessed")}
            onUserMediaError={(error) => console.error("Webcam error", error)}
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gray-200">
            <CameraOff className="h-16 w-16 text-gray-400" />
          </div>
        )}
      </div>
      <div className="flex justify-between">
        <Button onClick={() => onCameraToggle(!isCameraOn)}>
          {isCameraOn ? (
            <>
              <CameraOff className="mr-2 h-4 w-4" /> Turn Camera Off
            </>
          ) : (
            <>
              <Camera className="mr-2 h-4 w-4" /> Turn Camera On
            </>
          )}
        </Button>
        <Button onClick={StartStopRecording} disabled={loading}>
          {isRecording ? (
            <>
              <CircleStop className="mr-2 h-4 w-4" /> Stop Recording
            </>
          ) : (
            <>
              <Mic className="mr-2 h-4 w-4" /> Start Recording
            </>
          )}
        </Button>
      </div>
      <textarea
        value={userAnswer}
        onChange={(e) => setUserAnswer(e.target.value)}
        placeholder="Your answer will appear here as you speak..."
        className="w-full h-32 p-2 border rounded-md"
      />
      {error && <p className="text-red-500">Error: {error}</p>}
    </div>
  );
}

export default RecordAnswerSection;
