"use client";
import { SignIn } from "@clerk/nextjs";
import { useRouter } from "next/navigation";

export default function Signin() {
  const router = useRouter();

  return (
    <div className="min-h-screen flex flex-col bg-black text-white relative">
      {/* Signin Section */}
      <section className="flex-1 flex items-center justify-center relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-teal-400 via-indigo-500 to-pink-500 opacity-50 blur-xl"></div>
        <div className="container mx-auto px-4 text-center py-20 relative z-10 flex flex-col items-center">
          <h2 className="text-4xl font-extrabold mb-4">
            Sign In to Your Account
          </h2>
          <p className="text-lg mb-8">
            Sign in to continue with mock interviews and personalized feedback.
          </p>
          <div className="w-full max-w-md bg-white p-6 rounded-lg shadow-lg">
            <SignIn />
          </div>
        </div>
      </section>
    </div>
  );
}
