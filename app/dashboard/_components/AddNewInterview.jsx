"use client";
import React, { useState } from "react";
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
import { chatSession } from "@/utils/GeminiAiModel";
import { Loader2 } from "lucide-react";
import { db } from "@/utils/db";
import { MockInterview } from "@/utils/schema";
import { v4 as uuidv4 } from "uuid";
import { useUser } from "@clerk/nextjs";
import moment from "moment";
import { useRouter } from "next/navigation";

const AddNewInterview = () => {
  const [openD, setOpenD] = useState(false);
  const [jobPosition, setJobPosition] = useState("");
  const [jobDesc, setDesc] = useState("");
  const [jobExperience, setJobExperience] = useState("");
  const [loading, setLoading] = useState(false);
  const { user } = useUser();
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const InputPrompt = `You are an AI assistant designed to conduct job interviews based on the provided job description, job position, and years of experience. The interview should start with an introductory question, followed by a behavioral question, and then three technical questions tailored to the skills mentioned in the job description. The difficulty of the technical questions should be proportional to the years of experience. Give result in JSON format and include the answers. Give a total of 5 questions. Job Position: ${jobPosition}, Description: ${jobDesc}, Years of Experience: ${jobExperience}. Give the answer according to you too. Provide the JSON response in the following format: ${JSON.stringify(
      [
        { Question: "give questions", Answer: "give answer" },
        { Question: "give questions", Answer: "give answer" },
        { Question: "give questions", Answer: "give answer" },
        { Question: "give questions", Answer: "give answer" },
        { Question: "give questions", Answer: "give answer" },
      ]
    )}`;

    try {
      const result = await chatSession.sendMessage(InputPrompt);
      const mockJsonResp = result.response
        .text()
        .replace("```json", "")
        .replace("```", "");
      const parsedResp = JSON.parse(mockJsonResp);

      if (parsedResp) {
        const resp = await db
          .insert(MockInterview)
          .values({
            mockId: uuidv4(),
            jsonMockResp: mockJsonResp,
            jobPosition,
            jobDesc,
            jobExperience,
            createdBy: user?.primaryEmailAddress?.emailAddress,
            createdAt: moment().format("DD-MM-yyyy"),
          })
          .returning({ mockId: MockInterview.mockId });

        if (resp && resp[0]?.mockId) {
          setOpenD(false);
          router.push(`/dashboard/interview/${resp[0].mockId}`);
        }
      }
    } catch (error) {
      console.error("Error generating interview content:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <Button
        onClick={() => setOpenD(true)}
        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg transition duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
      >
        + Create New Interview
      </Button>
      <Dialog open={openD} onOpenChange={setOpenD}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Create New Interview</DialogTitle>
            <DialogDescription>
              Add details about the job position and your experience to generate
              a tailored mock interview.
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label
                htmlFor="jobPosition"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300"
              >
                Job Position
              </label>
              <Input
                id="jobPosition"
                value={jobPosition}
                onChange={(e) => setJobPosition(e.target.value)}
                placeholder="e.g., Full Stack Developer"
                required
              />
            </div>
            <div>
              <label
                htmlFor="jobDesc"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300"
              >
                Job Description / Tech Stack
              </label>
              <Textarea
                id="jobDesc"
                value={jobDesc}
                onChange={(e) => setDesc(e.target.value)}
                placeholder="e.g., React, Node.js, MongoDB"
                required
              />
            </div>
            <div>
              <label
                htmlFor="jobExperience"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300"
              >
                Years of Experience
              </label>
              <Input
                id="jobExperience"
                type="number"
                value={jobExperience}
                onChange={(e) => setJobExperience(e.target.value)}
                placeholder="e.g., 2"
                min="0"
                max="50"
                required
              />
            </div>
            <div className="flex justify-end space-x-2">
              <Button
                type="button"
                variant="outline"
                onClick={() => setOpenD(false)}
              >
                Cancel
              </Button>
              <Button type="submit" disabled={loading}>
                {loading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Generating...
                  </>
                ) : (
                  "Start Interview"
                )}
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AddNewInterview;
