"use client";
import { db } from "@/utils/db";
import { MockInterview } from "@/utils/schema";
import { useUser } from "@clerk/nextjs";
import { desc, eq } from "drizzle-orm";
import React, { useState, useEffect } from "react";
import InterviewItemCard from "./InterviewItemCard";

const InterviewList = () => {
  const [interviewList, setinterviewList] = useState();
  const { user } = useUser();
  useEffect(() => {
    user && GetInterviewList();
  }, [user]);

  const GetInterviewList = async () => {
    const result = await db
      .select()
      .from(MockInterview)
      .where(
        eq(MockInterview.createdBy, user?.primaryEmailAddress.emailAddress)
      )
      .orderBy(desc(MockInterview.id));
    console.log(result);
    setinterviewList(result);
  };

  return (
    <div>
      <h2 className="text-xl font-medium">Previous mock interview</h2>
      <div className="grid grid-col-1 md:grid-cols-2 lg grid-cols-3 gap-5 my-3">
        {interviewList &&
          interviewList.map((interview, index) => (
            <InterviewItemCard interview={interview} key={index} />
          ))}
      </div>
    </div>
  );
};

export default InterviewList;
