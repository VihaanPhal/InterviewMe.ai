"use client";
import { db } from "@/utils/db";
import { UserAnswer } from "@/utils/schema";
import { eq } from "drizzle-orm";
import React, { useEffect, useState } from "react";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { ChevronsUpDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

const FeedbackPage = ({ params }) => {
  const [feedbackList, setFeedbackList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [color, setColor] = useState("black");
  const router = useRouter();
  const [total, setTotal] = useState(0);

  useEffect(() => {
    fetchFeedback();
    calculateTotalRating();
  }, []);

  useEffect(() => {
    if (feedbackList.length > 0) {
      calculateTotalRating();
    }
  }, [feedbackList]);

  const fetchFeedback = async () => {
    try {
      const result = await db
        .select()
        .from(UserAnswer)
        .where(eq(UserAnswer.mockIdRef, params.interviewId))
        .orderBy(UserAnswer.id);
      setFeedbackList(result);
    } catch (error) {
      console.error("Error fetching feedback:", error);
    } finally {
      setLoading(false);
    }
  };

  const calculateTotalRating = () => {
    var floor = Math.floor;

    const totalRating = feedbackList.reduce(
      (sum, item) => sum + floor(parseFloat(item.rating)),
      0
    );

    setTotal(
      feedbackList.length > 0
        ? (10 * totalRating) / (feedbackList.length * 5)
        : 0
    );

    if (total <= 4) {
      setColor("red-500");
    } else if (total < 6 && total > 3) {
      setColor("yellow-500");
    } else {
      setColor("green-500");
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-lg">Loading feedback...</div>
      </div>
    );
  }

  return (
    <div className="p-10">
      {feedbackList.length === 0 ? (
        <div>
          <h2 className="text-3xl font-bold text-green-500">Congratulations</h2>
          <h2 className="font-bold text-2xl">
            Here is your interview Feedback
          </h2>
          <h2 className="font-bold text-xl text-gray-500">
            No Interview Record Found
          </h2>
        </div>
      ) : (
        <div>
          <h2 className="text-primary text-lg my-3">
            Your overall interview rating:{" "}
            <strong className={`text-${color}`}>{total}/10</strong>
          </h2>
          <h2 className="text-sm text-gray-500">
            Find below interview questions with the correct answer, your answer,
            and feedback for improvement
          </h2>
          {feedbackList.map((item, index) => (
            <Collapsible key={index} className="mt-7">
              <CollapsibleTrigger className="p-2 bg-secondary flex justify-between rounded-lg my-2 text-left gap-7 w-full">
                {item.question}
                <ChevronsUpDown className="h-5 w-5" />
              </CollapsibleTrigger>
              <CollapsibleContent>
                <div className="flex flex-col gap-2">
                  <h2 className="text-red-500 p-2 border rounded-lg">
                    Rating: <strong>{item.rating}</strong>
                  </h2>
                  <h2 className="p-2 border rounded-lg bg-red-50 text-sm">
                    <strong>Your Answer: </strong>
                    {item.userAns}
                  </h2>
                  <h2 className="p-2 border rounded-lg bg-green-50 text-sm">
                    <strong>Correct Answer: </strong>
                    {item.correctAns}
                  </h2>
                  <h2 className="p-2 border rounded-lg bg-blue-50 text-sm">
                    <strong>Feedback: </strong>
                    {item.feedback}
                  </h2>
                </div>
              </CollapsibleContent>
            </Collapsible>
          ))}
        </div>
      )}
      <div className="mt-6">
        <Button onClick={() => router.replace("/dashboard")}>Go Home</Button>
      </div>
    </div>
  );
};

export default FeedbackPage;
