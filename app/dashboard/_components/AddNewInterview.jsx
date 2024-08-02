"use client";
import React from "react";
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

const AddNewInterview = () => {
  const [openD, setOpenD] = useState(false);
  const [jobPosition, setJobPosition] = useState();
  const [jobDesc, setDesc] = useState();
  const [jobExperience, setJobExperience] = useState();

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission here, e.g., send data to your server
    // You can validate and process the form data here before closing the dialog
    console.log(jobPosition, jobDesc, jobExperience);
    const InputPrompt =
      "You are an AI assistant designed to conduct job interviews based on the provided job description, job position, and years of experience. The interview should start with an introductory question, followed by a behavioral question, and then three technical questions tailored to the skills mentioned in the job description. The difficulty of the technical questions should be proportional to the years of experience. Give result in json format GIve total of " +
      process.env.NEXT_PUBLIC_COUNT +
      ".Job Position: " +
      jobPosition +
      ",Description: " +
      jobDesc +
      ", Years of Experience: " +
      jobExperience;

    


    setOpenD(false);
  };

  return (
    <div>
      <div
        className="p-10 border rounded-lg bg-secondary hover:scale-105 hover:shadow-md cursor-pointer transition-all"
        onClick={() => setOpenD(true)}
      >
        <h2 className="text-lg text-center">+ Add New</h2>
      </div>
      <Dialog open={openD} onOpenChange={setOpenD}>
        <DialogContent className="max-w-2xl mx-auto p-6 bg-white dark:bg-gray-800 rounded-lg shadow-lg">
          <form onSubmit={handleSubmit}>
            <DialogHeader>
              <DialogTitle className="text-2xl font-bold text-gray-800 dark:text-white">
                Tell us more about your job interview
              </DialogTitle>
              <DialogDescription className="mt-4">
                <div>
                  <h2 className="text-lg font-medium text-gray-600 dark:text-gray-300">
                    Add details about your job position/role and years of
                    experience
                  </h2>
                  <div className="mt-7 my-3">
                    <div className="flex">
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-200">
                        Job Role/Position
                      </label>
                      <label className="text-red-600">*</label>
                    </div>
                    <Input
                      placeholder="Ex. Full Stack Developer"
                      className="mt-1 block w-full border-gray-300 dark:border-gray-700 rounded-md shadow-sm"
                      required
                      onChange={(event) => setJobPosition(event.target.value)}
                    />
                  </div>
                  <div className="my-3">
                    <div className="flex">
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-200">
                        Job Description/Tech Stack (in Short)
                      </label>
                      <label className="text-red-600">*</label>
                    </div>
                    <Textarea
                      onChange={(event) => setDesc(event.target.value)}
                      placeholder="Ex. React, NodeJs, Angular etc..."
                      className="mt-1 block w-full border-gray-300 dark:border-gray-700 rounded-md shadow-sm"
                      required
                    />
                  </div>
                  <div className="my-3">
                    <div className="flex">
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-200">
                        Years of Experience
                      </label>
                      <label className="text-red-600">*</label>
                    </div>
                    <Input
                      onChange={(event) => setJobExperience(event.target.value)}
                      placeholder="Ex. 2"
                      max="50"
                      type="number"
                      className="mt-1 block w-full border-gray-300 dark:border-gray-700 rounded-md shadow-sm"
                      required
                    />
                  </div>
                </div>
                <div className="flex gap-5 justify-end mt-6">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setOpenD(false)}
                  >
                    Cancel
                  </Button>
                  <Button type="submit">Start Interview</Button>
                </div>
              </DialogDescription>
            </DialogHeader>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AddNewInterview;
