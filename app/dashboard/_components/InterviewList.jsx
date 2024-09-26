"use client";
import { db } from "@/utils/db";
import { MockInterview } from "@/utils/schema";
import { useUser } from "@clerk/nextjs";
import { desc, eq } from "drizzle-orm";
import React, { useState, useEffect } from "react";
import InterviewItemCard from "./InterviewItemCard";

const InterviewList = () => {
  const [interviewList, setInterviewList] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useUser();

  useEffect(() => {
    if (user) {
      getInterviewList();
    }
  }, [user]);

  const getInterviewList = async () => {
    try {
      const result = await db
        .select()
        .from(MockInterview)
        .where(
          eq(MockInterview.createdBy, user?.primaryEmailAddress.emailAddress)
        )
        .orderBy(desc(MockInterview.id));
      setInterviewList(result);
    } catch (error) {
      console.error("Error fetching interview list:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="text-center py-4">Loading interviews...</div>;
  }

  if (interviewList.length === 0) {
    return (
      <div className="text-center py-4 text-gray-600 dark:text-gray-400">
        No previous interviews found.
      </div>
    );
  }

  return (
    <div>
      <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
        Previous Mock Interviews
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {interviewList.map((interview, index) => (
          <InterviewItemCard interview={interview} key={index} />
        ))}
      </div>
    </div>
  );
};

export default InterviewList;
