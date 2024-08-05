"use client";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  const handleSignup = () => {
    router.push("/dashboard");
  };

  return (
    <div className="min-h-screen flex flex-col bg-black text-white">
      {/* Header Section */}
      <header className="py-4 border-b border-gray-700">
        <div className="container mx-auto px-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold bg-gradient-to-r from-green-200 via-blue-200 to-purple-200 text-transparent bg-clip-text animate-gradient">
            InterviewMe.AI
          </h1>
          <div className="flex space-x-4 items-center">
            <Button
              onClick={() =>
                (window.location.href = "https://vihaanphal.vercel.app")
              }
              className="text-white bg-black transition-all hover:text-black hover:bg-gradient-to-r hover:from-green-200 hover:via-blue-200 hover:to-purple-200"
            >
              Meet the Creator
            </Button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="flex-1 flex items-center justify-center relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 via-green-400 to-yellow-500 opacity-40 blur-lg"></div>
        <div className="container mx-auto px-4 text-center py-20 relative z-10">
          <h2 className="text-4xl font-extrabold mb-4 bg-gradient-to-r from-green-200 via-blue-200 to-purple-200 text-transparent bg-clip-text animate-gradient">
            Ace Your Next Interview with AI
          </h2>
          <p className="text-lg mb-8">
            Get mock interviews and personalized feedback to help you prepare
            for your dream job.
          </p>
          <Button
            onClick={handleSignup}
            className="bg-white text-black hover:bg-gray-200"
          >
            Sign Up
          </Button>
        </div>
      </section>

      {/* Footer Section */}
      <footer className="py-4 md:py-3 border-t border-gray-700 text-sm md:text-xs bg-black">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-between mb-4">
            <div className="text-center md:text-left mb-4 md:mb-0">
              <h2 className="text-lg font-bold mb-2">Contact Me</h2>
              <p>Email: phal.vihaan@gmail.com</p>
            </div>
            <div className="flex space-x-4">
              <a
                href="https://www.instagram.com/yourinstagram"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Image
                  src="/instagram.png"
                  alt="Instagram"
                  width={32}
                  height={32}
                  className="rounded-full transition-all transform hover:scale-110"
                />
              </a>
              <a
                href="https://www.linkedin.com/in/VihaanPhal"
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-full transition-all transform hover:scale-110"
              >
                <Image
                  src="/linkedin.png"
                  alt="LinkedIn"
                  width={32}
                  height={32}
                  className="rounded-full"
                />
              </a>
              <a
                href="https://github.com/VihaanPhal"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Image
                  src="/github-white.png"
                  alt="GitHub"
                  width={32}
                  height={32}
                  className="rounded-full transition-all transform hover:scale-110"
                />
              </a>
            </div>
          </div>
          <div className="flex justify-center">
            <p>&copy; 2024 InterviewMe.AI. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
