"use client";
import { db } from "@/utils/db";
import { MockInterview } from "@/utils/schema";
import React, { useEffect, useState } from "react";
import { eq } from "drizzle-orm";
import { Lightbulb, WebcamIcon, CircleStop, Mic } from "lucide-react";
import dynamic from "next/dynamic";
import { Button } from "@/components/ui/button";
import Link from "next/link";

// Dynamically import the Webcam component to ensure it only renders on the client side
const Webcam = dynamic(() => import("react-webcam"), { ssr: false });

const Interview = ({ params }) => {
  const [interviewData, setInterviewData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [webcamEnabled, setWebcamEnabled] = useState(false);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    console.log(params.interviewId);
    GetInterviewDetails();
    setIsClient(true);
  }, []);

  const GetInterviewDetails = async () => {
    try {
      const result = await db
        .select()
        .from(MockInterview)
        .where(eq(MockInterview.mockId, params.interviewId));
      console.log(result);
      setInterviewData(result[0]);
    } catch (error) {
      console.error("Error fetching interview details:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-lg">Loading...</div>
      </div>
    );
  }

  return (
    <div className="my-10 mx-5 md:mx-20">
      <h2 className="font-bold text-2xl mb-5">Let's Get Started</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        {interviewData && (
          <div className="flex flex-col my-5 gap-5">
            <div className="flex flex-col rounded-lg border p-5 bg-white shadow-sm">
              <h2 className="text-lg mb-2">
                <strong>Job Role/Job Position:</strong>{" "}
                {interviewData.jobPosition}
              </h2>
              <h2 className="text-lg mb-2">
                <strong>Job Description:</strong> {interviewData.jobDesc}
              </h2>
              <h2 className="text-lg">
                <strong>Experience:</strong> {interviewData.jobExperience}
              </h2>
            </div>
            <div className="p-5 border rounded-lg border-yellow-300 bg-yellow-100 shadow-sm">
              <h2 className="flex items-center text-yellow-400 gap-2">
                <Lightbulb />
                <strong>Information</strong>
              </h2>
              <h2 className="mt-3 text-yellow-500">
                {process.env.NEXT_PUBLIC_INFORMATION}
              </h2>
            </div>
          </div>
        )}
        <div className="flex flex-col items-center">
          {isClient && (
            <div className="relative flex justify-center items-center bg-gray-800 rounded-lg overflow-hidden w-full h-72">
              {webcamEnabled ? (
                <Webcam
                  mirrored={true}
                  className="absolute z-20 border-8 border-black rounded-lg"
                  style={{
                    height: "100%",
                    width: "100%",
                    objectFit: "cover",
                  }}
                  onUserMedia={() => console.log("Webcam accessed")}
                  onUserMediaError={(error) =>
                    console.error("Webcam error", error)
                  }
                />
              ) : (
                <div className="absolute z-10 flex flex-col items-center justify-center w-full h-full bg-gray-800">
                  <WebcamIcon className="h-20 w-20 text-gray-500" />
                </div>
              )}
            </div>
          )}
          <Button
            variant="outline"
            className="mt-5"
            onClick={() => setWebcamEnabled(!webcamEnabled)}
          >
            {webcamEnabled ? (
              <div className="flex items-center space-x-2">
                <CircleStop className="w-5 h-5 text-red-600" />
                <span>Disable Webcam and Microphone</span>
              </div>
            ) : (
              <div className="flex items-center space-x-2">
                <Mic className="w-5 h-5 text-green-600" />
                <span>Enable Webcam and Microphone</span>
              </div>
            )}
          </Button>
        </div>
      </div>
      <div className="flex justify-end mt-10">
        <Link href={"/dashboard/interview/" + params.interviewId + "/start"}>
          <Button>Start Interview</Button>
        </Link>
      </div>
    </div>
  );
};

export default Interview;
