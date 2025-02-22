"use client";

import { useEffect, useState } from "react";
import { Button } from "./ui/button"; // Keep the Button import

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Add scroll event listener
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Generate particles
  useEffect(() => {
    const header = document.querySelector("header");
    const particleContainer = document.createElement("div");
    particleContainer.classList.add("header-particles");
    header?.appendChild(particleContainer);

    for (let i = 0; i < 50; i++) {
      const particle = document.createElement("div");
      particle.classList.add("particle");
      particle.style.left = `${Math.random() * 100}%`;
      particle.style.top = `${Math.random() * 100}%`;
      particle.style.animationDuration = `${Math.random() * 3 + 2}s`;
      particleContainer.appendChild(particle);
    }

    return () => {
      header?.removeChild(particleContainer);
    };
  }, []);

  return (
    <header
      className={`fixed top-2.5 left-0 right-0 z-50 backdrop-blur-md transition-all duration-500 ${
        isScrolled
          ? "py-3 px-6 shadow-[0_4px_25px_rgba(0,255,255,0.6)]"
          : "py-5 px-12 shadow-[0_4px_15px_rgba(0,255,255,0.2)]"
      }`}
      style={{
        background: "linear-gradient(135deg, rgba(20,20,50,0.9), rgba(5,5,20,0.9))",
        borderBottom: "1px solid rgba(255,255,255,0.2)",
      }}
    >
      {/* Logo */}
      <div className="logo text-3xl font-bold cursor-pointer">
        <span className="bg-gradient-to-r from-[#4763ED] via-[#00d4ff] to-[#FEFEFE] bg-clip-text text-transparent">
          Budget <span>Budd</span>
        </span>
      </div>

      {/* Navigation Menu */}
      <nav className={`${isMenuOpen ? "flex" : "hidden"} md:flex`}>
        <ul className="flex flex-col md:flex-row gap-8 items-center">
          <li>
            <a
              href="#transactions-main"
              className="text-white hover:text-[#00d4ff] transition-all duration-500 relative"
            >
              Transactions
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#00d4ff] transition-all duration-500 hover:w-full"></span>
            </a>
          </li>
          <li>
            <a
              href="#charts"
              className="text-white hover:text-[#00d4ff] transition-all duration-500 relative"
            >
              Charts
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#00d4ff] transition-all duration-500 hover:w-full"></span>
            </a>
          </li>
          <li>
            <a
              href="#dashboard"
              className="text-white hover:text-[#00d4ff] transition-all duration-500 relative"
            >
              Dashboard
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#00d4ff] transition-all duration-500 hover:w-full"></span>
            </a>
          </li>
          <li>
            <a
              href="#budgeting"
              className="text-white hover:text-[#00d4ff] transition-all duration-500 relative"
            >
              Budgeting
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#00d4ff] transition-all duration-500 hover:w-full"></span>
            </a>
          </li>
        </ul>
      </nav>

      {/* Mobile Menu Toggle */}
      <Button
        className="menu-toggle md:hidden cursor-pointer"
        onClick={() => setIsMenuOpen(!isMenuOpen)}
      >
        <div className={`bar w-7 h-0.5 bg-white transition-all duration-500 ${isMenuOpen ? "rotate-45 translate-y-1.5" : ""}`}></div>
        <div className={`bar w-7 h-0.5 bg-white my-1.5 transition-all duration-500 ${isMenuOpen ? "opacity-0" : ""}`}></div>
        <div className={`bar w-7 h-0.5 bg-white transition-all duration-500 ${isMenuOpen ? "-rotate-45 -translate-y-1.5" : ""}`}></div>
      </Button>
    </header>
  );
}