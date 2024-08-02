import { Lightbulb, Volume2 } from "lucide-react";
import React from "react";
import { useEffect, useState } from "react";

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
      <div className="p-5 border rounded-lg my-10">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
          {mockInterviewQuestions.map((question, index) => (
            <div key={index}>
              <h2
                className={`p-2 rounded-full text-xs md:text-sm text-center cursor-pointer ${
                  activeQuestionIndex === index
                    ? "bg-primary text-primary-foreground"
                    : "bg-secondary text-secondary-foreground"
                }`}
              >
                Question #{index + 1}
              </h2>
            </div>
          ))}
        </div>
        <h2 className="my-5 text-md md:text-lg">
          <span className="font-bold">Question</span>:{" "}
          {mockInterviewQuestions[activeQuestionIndex]?.Question}
        </h2>

        {isClient && (
          <Volume2
            className="cursor-pointer"
            onClick={() =>
              textToSpeech(
                mockInterviewQuestions[activeQuestionIndex]?.Question
              )
            }
          />
        )}

        <div className="border rounded-lg p-5 bg-blue-100 text-blue-900 mt-20 my-10">
          <h2 className="flex gap-2">
            <Lightbulb />
            <strong>Note:</strong>
          </h2>
          <h2 className="text-sm text-blue-600">
            {process.env.NEXT_PUBLIC_QUESTION_NOTE}
          </h2>
        </div>
      </div>
    )
  );
};

export default QuestionsSection;
