"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight, LayoutDashboard, LogIn } from "lucide-react";
import { useAuth } from "@/context/auth-context";
import { BrandMark } from "@/components/brand-mark";

interface NavbarProps {
  variant?: "landing" | "auth-login" | "auth-register";
}

export const Navbar: React.FC<NavbarProps> = ({ variant = "landing" }) => {
  const { isAuthenticated } = useAuth();

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between gap-3 px-4 py-5 sm:px-6 sm:py-6">
      <Link href="/" className="flex items-center gap-2 group">
        <BrandMark />
      </Link>

      {variant === "landing" && (
        <div className="hidden md:flex items-center bg-white/10 backdrop-blur-md border border-white/10 rounded-full px-6 py-2 gap-8">
          <a
            href="#features"
            className="text-sm text-slate-300 hover:text-white transition-colors duration-300 font-sans"
          >
            Features
          </a>
          <a
            href="#faq"
            className="text-sm text-slate-300 hover:text-white transition-colors duration-300 font-sans"
          >
            FAQ
          </a>
          <Link
            href="/auth/login"
            className="text-sm text-slate-300 hover:text-white transition-colors duration-300 font-sans"
          >
            Sign In
          </Link>
        </div>
      )}

      <div className="flex items-center gap-3">
        {isAuthenticated ? (
          <Link
            href="/dashboard"
            className="px-4 py-2 sm:px-5 bg-indigo-600 text-white rounded-full text-sm font-semibold shadow-lg shadow-indigo-500/20 hover:bg-indigo-700 transition-all duration-300 active:scale-95 flex items-center gap-2"
          >
            <LayoutDashboard size={16} />
            <span className="hidden sm:inline">Dashboard</span>
          </Link>
        ) : (
          <Link
            href={variant === "auth-register" ? "/auth/login" : "/auth/register"}
            className="px-4 py-2 sm:px-5 bg-white text-slate-900 rounded-full text-sm font-semibold shadow-[0_0_20px_rgba(255,255,255,0.2)] hover:bg-slate-100 transition-all duration-300 active:scale-95 flex items-center gap-2 whitespace-nowrap"
          >
            {variant === "auth-register" ? (
              <>
                <LogIn size={16} /> Sign In
              </>
            ) : variant === "auth-login" ? (
              <>
                Sign Up <ArrowRight size={16} />
              </>
            ) : (
              <>
                Open Vault <ArrowRight size={16} />
              </>
            )}
          </Link>
        )}
      </div>
    </nav>
  );
};
