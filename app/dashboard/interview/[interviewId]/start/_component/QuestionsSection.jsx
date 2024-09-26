import { Lightbulb, Volume2 } from "lucide-react";
import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";

const QuestionsSection = ({ mockInterviewQuestions, activeQuestionIndex }) => {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const textToSpeech = (text) => {
    if (isClient && "speechSynthesis" in window) {
      const speech = new SpeechSynthesisUtterance(text);
      window.speechSynthesis.speak(speech);
    } else {
      alert("Sorry, your browser does not support text to speech.");
    }
  };

  return (
    mockInterviewQuestions && (
      <div>
        <Progress
          value={
            (activeQuestionIndex + 1) * (100 / mockInterviewQuestions.length)
          }
          className="mb-4"
        />
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">
            Question {activeQuestionIndex + 1} of{" "}
            {mockInterviewQuestions.length}
          </h2>
          {isClient && (
            <Button
              variant="outline"
              size="icon"
              onClick={() =>
                textToSpeech(
                  mockInterviewQuestions[activeQuestionIndex]?.Question
                )
              }
            >
              <Volume2 className="h-4 w-4" />
            </Button>
          )}
        </div>
        <p className="text-lg mb-8">
          {mockInterviewQuestions[activeQuestionIndex]?.Question}
        </p>
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <div className="flex items-center gap-2 mb-2">
            <Lightbulb className="text-blue-500" />
            <strong className="text-blue-700">Note:</strong>
          </div>
          <p className="text-sm text-blue-600">
            {process.env.NEXT_PUBLIC_QUESTION_NOTE}
          </p>
        </div>
      </div>
    )
  );
};

export default QuestionsSection;
