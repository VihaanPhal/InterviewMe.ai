"use client";

import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import Image from "next/image";
import { useRouter } from "next/navigation";
import {
  ArrowRight,
  MessageSquare,
  Zap,
  User,
  ChevronRight,
  Github,
  Linkedin,
  Instagram,
} from "lucide-react";

export default function Home() {
  const router = useRouter();
  const [scrolled, setScrolled] = useState(false);
  const sectionsRef = useRef([]);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);

      sectionsRef.current.forEach((section) => {
        const rect = section.getBoundingClientRect();
        if (rect.top < window.innerHeight * 0.75 && rect.bottom > 0) {
          section.classList.add("animate-fade-in-up");
        }
      });
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-black text-white overflow-hidden">
      {/* Header */}
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled ? "bg-black/50 backdrop-blur-md" : ""
        }`}
      >
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold">
            InterviewMe<span className="text-blue-500">.AI</span>
          </h1>
          <nav className="hidden md:flex space-x-8">
            <Button
              variant="link"
              className="text-white hover:text-blue-400 transition-colors"
            >
              Features
            </Button>
            <Button
              variant="link"
              className="text-white hover:text-blue-400 transition-colors"
            >
              About
            </Button>
            <Button
              variant="link"
              className="text-white hover:text-blue-400 transition-colors"
            >
              Contact
            </Button>
          </nav>
          <Button
            onClick={() => router.push("/sign-up")}
            className="bg-blue-500 text-white hover:bg-blue-600 transition-colors"
          >
            Get Started
          </Button>
        </div>
      </header>

      {/* Hero Section */}
      <section
        className="min-h-screen flex items-center justify-center relative overflow-hidden"
        ref={(el) => (sectionsRef.current[0] = el)}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 via-purple-500/20 to-pink-500/20 animate-gradient-xy"></div>
        <div className="container mx-auto px-4 text-center relative z-10">
          <h2 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
            Master Your Interviews with{" "}
            <span className="text-blue-500">AI</span>
          </h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto text-gray-300">
            Personalized mock interviews and real-time feedback to help you land
            your dream job.
          </p>
          <Button
            onClick={() => router.push("/sign-up")}
            className="bg-blue-500 text-white hover:bg-blue-600 transition-colors text-lg px-8 py-3 rounded-full animate-pulse"
          >
            Start Practicing Now <ArrowRight className="ml-2" />
          </Button>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-black to-transparent"></div>
      </section>

      {/* Features Section */}
      <section
        className="py-20 bg-gradient-to-b from-black to-gray-900"
        ref={(el) => (sectionsRef.current[1] = el)}
      >
        <div className="container mx-auto px-4">
          <h3 className="text-3xl font-bold mb-12 text-center">How It Works</h3>
          <div className="grid md:grid-cols-3 gap-8">
            <FeatureCard
              icon={<MessageSquare className="w-12 h-12 mb-4 text-blue-400" />}
              title="AI-Powered Questions"
              description="Tailored interview questions based on your field and experience."
            />
            <FeatureCard
              icon={<Zap className="w-12 h-12 mb-4 text-yellow-400" />}
              title="Real-time Feedback"
              description="Instant insights to improve your interview performance."
            />
            <FeatureCard
              icon={<User className="w-12 h-12 mb-4 text-green-400" />}
              title="Personalized Coaching"
              description="Custom strategies to boost your interview skills."
            />
          </div>
        </div>
      </section>

      {/* Creator Section */}
      <section
        className="py-20 bg-black relative overflow-hidden"
        ref={(el) => (sectionsRef.current[2] = el)}
      >
        <div className="absolute inset-0 bg-gradient-to-tr from-blue-500/10 via-purple-500/10 to-pink-500/10 animate-gradient-xy"></div>
        <div className="container mx-auto px-4 relative z-10">
          <h3 className="text-3xl font-bold mb-12 text-center">
            Meet the Creator
          </h3>
          <Card className="bg-gradient-to-br from-gray-800 to-gray-900 border-none p-8 max-w-4xl mx-auto rounded-2xl shadow-2xl overflow-hidden">
            <div className="flex flex-col md:flex-row items-center">
              <div className="md:w-1/2 mb-6 md:mb-0 relative group">
                <Image
                  src="/123.png"
                  alt="Project Preview"
                  width={400}
                  height={300}
                  className="rounded-lg shadow-lg transition-transform duration-300 group-hover:scale-105"
                />
                <div className="absolute inset-0 rounded-lg transition-opacity duration-300 group-hover:opacity-30"></div>
              </div>
              <div className="md:w-1/2 md:pl-8">
                <h4 className="text-2xl font-bold mb-4">Vihaan Phal</h4>
                <p className="mb-4 text-gray-300">
                  Passionate about leveraging technology to help people succeed
                  in their careers.
                </p>
                <Button
                  onClick={() =>
                    window.open("https://vihaanphal.vercel.app", "_blank")
                  }
                  className="bg-blue-500 hover:bg-blue-600 text-white transition-colors group"
                >
                  View Portfolio
                  <ChevronRight className="ml-2 transition-transform duration-300 group-hover:translate-x-1" />
                </Button>
              </div>
            </div>
          </Card>
        </div>
      </section>

      {/* CTA Section */}
      <section
        className="py-20 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 relative overflow-hidden"
        ref={(el) => (sectionsRef.current[4] = el)}
      >
        <div className="absolute inset-0 bg-black opacity-50"></div>
        <div className="container mx-auto px-4 text-center relative z-10">
          <h3 className="text-4xl font-bold mb-6">
            Ready to Ace Your Next Interview?
          </h3>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Join thousands of job seekers who have improved their interview
            skills with InterviewMe.AI.
          </p>
          <Button
            onClick={() => router.push("/sign-up")}
            className="bg-white text-blue-600 hover:bg-gray-100 transition-colors text-lg px-8 py-3 rounded-full shadow-lg hover:shadow-xl transform hover:-translate-y-1"
          >
            Get Started for Free <ArrowRight className="ml-2" />
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 bg-black text-sm">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h2 className="text-2xl font-bold mb-4">
                InterviewMe<span className="text-blue-500">.AI</span>
              </h2>
              <p className="text-gray-400">
                Empowering job seekers with AI-driven interview preparation.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Product</h3>
              <ul className="space-y-2">
                <li>
                  <a
                    href="#"
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    Features
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    Pricing
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    FAQ
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Company</h3>
              <ul className="space-y-2">
                <li>
                  <a
                    href="#"
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    About
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    Careers
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    Contact
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Connect</h3>
              <div className="flex space-x-4">
                <SocialIcon
                  href="https://github.com/VihaanPhal"
                  icon={<Github />}
                />
                <SocialIcon
                  href="https://www.linkedin.com/in/VihaanPhal"
                  icon={<Linkedin />}
                />
                <SocialIcon
                  href="https://www.instagram.com/yourinstagram"
                  icon={<Instagram />}
                />
              </div>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-gray-800 text-center">
            <p className="text-gray-400">
              &copy; 2024 InterviewMe.AI. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

function FeatureCard({ icon, title, description }) {
  return (
    <Card className="bg-gray-800 border-none p-6 text-center rounded-xl hover:shadow-lg transition-all transform hover:-translate-y-1">
      <div className="flex justify-center">{icon}</div>
      <h4 className="text-xl font-semibold mb-2">{title}</h4>
      <p className="text-gray-400">{description}</p>
    </Card>
  );
}

function TestimonialCard({ quote, author, role }) {
  return (
    <Card className="bg-gray-800 border-none p-6 rounded-xl hover:shadow-lg transition-all transform hover:-translate-y-1">
      <p className="mb-4 italic text-gray-300">"{quote}"</p>
      <p className="font-semibold">{author}</p>
      <p className="text-sm text-gray-400">{role}</p>
    </Card>
  );
}

function SocialIcon({ href, icon }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="text-gray-400 hover:text-white transition-colors transform hover:scale-110"
    >
      {icon}
    </a>
  );
}
