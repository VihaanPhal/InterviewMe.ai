import { Lightbulb, Volume2 } from "lucide-react";
import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";

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
        <div className="mb-4 bg-gray-200 rounded-full h-2.5">
          <div
            className="bg-blue-600 h-2.5 rounded-full"
            style={{
              width: `${
                ((activeQuestionIndex + 1) / mockInterviewQuestions.length) *
                100
              }%`,
            }}
          ></div>
        </div>
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">
            Question {activeQuestionIndex + 1} of{" "}
            {mockInterviewQuestions.length}
          </h2>
          {isClient && (
            <Button
              onClick={() =>
                textToSpeech(
                  mockInterviewQuestions[activeQuestionIndex]?.Question
                )
              }
            >
              <Volume2 className="h-4 w-4 mr-2" />
              Read Aloud
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
