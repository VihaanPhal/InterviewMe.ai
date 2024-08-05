"use client";
import { SignUp } from "@clerk/clerk-react";
import { useRouter } from "next/navigation";

export default function Signup() {
  const router = useRouter();

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-r from-blue-900 via-teal-700 to-green-500 text-white relative font-poppins">
      {/* Signup Section */}
      <section className="flex-1 flex items-center justify-center relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-900 via-teal-700 to-green-500 opacity-40 blur-md"></div>
        <div className="container mx-auto px-4 text-center py-20 relative z-10 flex flex-col items-center">
          <h2 className="text-4xl font-extrabold mb-4 sm:text-3xl md:text-5xl">
            Create Your Account
          </h2>
          <p className="text-lg mb-8 sm:text-base md:text-xl">
            Sign up to get started with mock interviews and personalized
            feedback.
          </p>

          <SignUp />
        </div>
      </section>
    </div>
  );
}
