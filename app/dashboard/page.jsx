import { UserButton } from "@clerk/nextjs";
import React from "react";
import AddNewInterview from "./_components/AddNewInterview";
import InterviewList from "./_components/InterviewList";

const Dashboard = () => {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
              Dashboard
            </h1>
            <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
              Create and manage your AI Mock Interviews
            </p>
          </div>
          <UserButton />
        </div>
        <div className="bg-white dark:bg-gray-800 shadow-sm rounded-lg p-6 mb-8">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
            Start a New Interview
          </h2>
          <AddNewInterview />
        </div>
        <div className="bg-white dark:bg-gray-800 shadow-sm rounded-lg p-6">
          <InterviewList />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
