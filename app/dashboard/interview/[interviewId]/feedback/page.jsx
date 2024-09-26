"use client";
import { db } from "@/utils/db";
import { UserAnswer } from "@/utils/schema";
import { eq } from "drizzle-orm";
import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { Progress } from "@/components/ui/progress";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle2, XCircle, AlertCircle } from "lucide-react";

const FeedbackPage = ({ params }) => {
  const [feedbackList, setFeedbackList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [overallRating, setOverallRating] = useState(0);
  const router = useRouter();

  useEffect(() => {
    fetchFeedback();
  }, []);

  const fetchFeedback = async () => {
    try {
      const result = await db
        .select()
        .from(UserAnswer)
        .where(eq(UserAnswer.mockIdRef, params.interviewId))
        .orderBy(UserAnswer.id);
      setFeedbackList(result);
      calculateOverallRating(result);
    } catch (error) {
      console.error("Error fetching feedback:", error);
    } finally {
      setLoading(false);
    }
  };

  const calculateOverallRating = (feedback) => {
    const totalRating = feedback.reduce(
      (sum, item) => sum + Math.floor(parseFloat(item.rating)),
      0
    );
    const calculatedRating =
      feedback.length > 0 ? (10 * totalRating) / (feedback.length * 5) : 0;
    setOverallRating(calculatedRating);
  };

  const getRatingColor = (rating) => {
    if (rating <= 2) return "text-red-500";
    if (rating <= 3) return "text-yellow-500";
    return "text-green-500";
  };

  const getOverallRatingColor = (rating) => {
    if (rating <= 4) return "bg-red-500";
    if (rating < 6) return "bg-yellow-500";
    return "bg-green-500";
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-lg">Loading feedback...</div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Interview Feedback</h1>

      {feedbackList.length === 0 ? (
        <Card>
          <CardContent className="pt-6">
            <h2 className="text-2xl font-semibold mb-2">
              No Interview Record Found
            </h2>
            <p className="text-gray-600">
              It seems you haven't completed an interview yet.
            </p>
          </CardContent>
        </Card>
      ) : (
        <>
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Overall Performance</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between mb-2">
                <span className="text-2xl font-bold">
                  {overallRating.toFixed(1)}/10
                </span>
                <span className="text-sm text-gray-500">
                  Based on {feedbackList.length} questions
                </span>
              </div>
              <Progress
                value={overallRating * 10}
                className={`h-2 ${getOverallRatingColor(overallRating)}`}
              />
            </CardContent>
          </Card>

          <div className="space-y-6">
            {feedbackList.map((item, index) => (
              <Card key={index}>
                <CardHeader>
                  <CardTitle className="text-lg">
                    Question {index + 1}: {item.question}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-4">
                    <div>
                      <h3 className="font-semibold mb-1">Your Answer:</h3>
                      <p className="text-gray-700 bg-gray-100 p-3 rounded">
                        {item.userAns}
                      </p>
                    </div>
                    <div>
                      <h3 className="font-semibold mb-1">Correct Answer:</h3>
                      <p className="text-gray-700 bg-green-100 p-3 rounded">
                        {item.correctAns}
                      </p>
                    </div>
                    <div>
                      <h3 className="font-semibold mb-1">Feedback:</h3>
                      <p className="text-gray-700 bg-blue-100 p-3 rounded">
                        {item.feedback}
                      </p>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="font-semibold">Rating:</span>
                      <span
                        className={`font-bold ${getRatingColor(
                          Math.floor(parseFloat(item.rating))
                        )}`}
                      >
                        {item.rating}/5
                      </span>
                    </div>
                    <Progress
                      value={parseFloat(item.rating) * 20}
                      className={`h-2 ${getOverallRatingColor(
                        parseFloat(item.rating) * 2
                      )}`}
                    />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </>
      )}

      <div className="mt-8">
        <Button onClick={() => router.replace("/dashboard")}>
          Return to Dashboard
        </Button>
      </div>
    </div>
  );
};

export default FeedbackPage;
