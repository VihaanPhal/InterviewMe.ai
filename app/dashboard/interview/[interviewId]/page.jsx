"use client";
import { db } from "@/utils/db";
import { MockInterview } from "@/utils/schema";
import React, { useEffect, useState } from "react";
import { eq } from "drizzle-orm";
import { Lightbulb, Camera, Mic, MicOff, CameraOff } from "lucide-react";
import dynamic from "next/dynamic";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";

const Webcam = dynamic(() => import("react-webcam"), { ssr: false });

const Interview = ({ params }) => {
  const [interviewData, setInterviewData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [webcamEnabled, setWebcamEnabled] = useState(false);
  const [micEnabled, setMicEnabled] = useState(false);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    GetInterviewDetails();
    setIsClient(true);
  }, []);

  const GetInterviewDetails = async () => {
    try {
      const result = await db
        .select()
        .from(MockInterview)
        .where(eq(MockInterview.mockId, params.interviewId));
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
        <div className="text-lg">Loading interview details...</div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Prepare for Your Interview</h1>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="space-y-6">
          {interviewData && (
            <Card>
              <CardHeader>
                <CardTitle>Interview Details</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <h3 className="font-semibold text-lg">Job Position</h3>
                    <p className="text-gray-700">{interviewData.jobPosition}</p>
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg">Job Description</h3>
                    <p className="text-gray-700">{interviewData.jobDesc}</p>
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg">
                      Experience Required
                    </h3>
                    <Badge variant="secondary">
                      {interviewData.jobExperience} years
                    </Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
          <Card className="bg-yellow-50 border-yellow-200">
            <CardHeader>
              <CardTitle className="flex items-center text-yellow-700">
                <Lightbulb className="mr-2" />
                Important Information
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-yellow-700">
                {process.env.NEXT_PUBLIC_INFORMATION}
              </p>
            </CardContent>
          </Card>
        </div>
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Camera Preview</CardTitle>
            </CardHeader>
            <CardContent>
              {isClient && (
                <div className="relative aspect-video bg-gray-900 rounded-lg overflow-hidden">
                  {webcamEnabled ? (
                    <Webcam
                      mirrored={true}
                      className="absolute inset-0 w-full h-full object-cover"
                      onUserMedia={() => console.log("Webcam accessed")}
                      onUserMediaError={(error) =>
                        console.error("Webcam error", error)
                      }
                    />
                  ) : (
                    <div className="absolute inset-0 flex flex-col items-center justify-center">
                      <Camera className="h-16 w-16 text-gray-500 mb-4" />
                      <p className="text-gray-500">Camera is disabled</p>
                    </div>
                  )}
                </div>
              )}
              <div className="flex justify-center mt-4 space-x-4">
                <Button
                  variant={webcamEnabled ? "destructive" : "default"}
                  onClick={() => setWebcamEnabled(!webcamEnabled)}
                >
                  {webcamEnabled ? (
                    <>
                      <CameraOff className="mr-2 h-4 w-4" />
                      Disable Camera
                    </>
                  ) : (
                    <>
                      <Camera className="mr-2 h-4 w-4" />
                      Enable Camera
                    </>
                  )}
                </Button>
                <Button
                  variant={micEnabled ? "destructive" : "default"}
                  onClick={() => setMicEnabled(!micEnabled)}
                >
                  {micEnabled ? (
                    <>
                      <MicOff className="mr-2 h-4 w-4" />
                      Disable Microphone
                    </>
                  ) : (
                    <>
                      <Mic className="mr-2 h-4 w-4" />
                      Enable Microphone
                    </>
                  )}
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
      <motion.div
        className="flex justify-end mt-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
      >
        <Link href={`/dashboard/interview/${params.interviewId}/start`}>
          <Button size="lg">Start Interview</Button>
        </Link>
      </motion.div>
    </div>
  );
};

export default Interview;
