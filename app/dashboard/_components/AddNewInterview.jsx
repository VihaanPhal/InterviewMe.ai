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
import { LoaderCircle } from "lucide-react";
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
  const [jsonResp, setjsonResp] = useState(false);
  const { user } = useUser();
  const router = useRouter();

  const handleSubmit = async (e) => {
    setLoading(true);
    e.preventDefault();
    console.log(jobPosition, jobDesc, jobExperience);
    const InputPrompt =
      "You are an AI assistant designed to conduct job interviews based on the provided job description, job position, and years of experience. The interview should start with an introductory question, followed by a behavioral question, and then three technical questions tailored to the skills mentioned in the job description. The difficulty of the technical questions should be proportional to the years of experience. Give result in JSON format and include the answers. Give a total of 5 questions. Job Position: " +
      jobPosition +
      ", Description: " +
      jobDesc +
      ", Years of Experience: " +
      jobExperience +
      ". Give the answer according to you too. Provide the JSON response in the following format: " +
      JSON.stringify([
        { Question: "give questions", Answer: "give answer" },
        { Question: "give questions", Answer: "give answer" },
        { Question: "give questions", Answer: "give answer" },
        { Question: "give questions", Answer: "give answer" },
        { Question: "give questions", Answer: "give answer" },
      ]);

    try {
      const result = await chatSession.sendMessage(InputPrompt);
      const responseText = await result.response.text();
      const mockJsonResp = result.response
        .text()
        .replace("```json", "")
        .replace("```", "");
      console.log(JSON.parse(mockJsonResp));
      setjsonResp(mockJsonResp);

      if (mockJsonResp) {
        const resp = await db
          .insert(MockInterview)
          .values({
            mockId: uuidv4(),
            jsonMockResp: mockJsonResp,
            jobPosition: jobPosition,
            jobDesc: jobDesc,
            jobExperience: jobExperience,
            createdBy: user?.primaryEmailAddress?.emailAddress,
            createdAt: moment().format("DD-MM-yyyy"),
          })
          .returning({ mockId: MockInterview.mockId });
        console.log("inserted ID", resp);
        if (resp) {
          setOpenD(false);
          router.push("/dashboard/interview/" + resp[0]?.mockId);
        }
      } else {
        console.log("ERROR");
      }

      setLoading(false);
    } catch (error) {
      console.error("Error generating interview content:", error);
    }
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
                  <Button type="submit" disabled={loading}>
                    {loading ? (
                      <>
                        <LoaderCircle className="animate-spin" />
                        Generating from AI
                      </>
                    ) : (
                      "Start Interview"
                    )}
                  </Button>
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
