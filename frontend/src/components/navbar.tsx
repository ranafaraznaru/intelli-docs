"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  ArrowRight,
  ChevronDown,
  LayoutDashboard,
  LogIn,
  LogOut,
} from "lucide-react";
import { useAuth } from "@/context/auth-context";
import { BrandMark } from "@/components/brand-mark";

interface NavbarProps {
  variant?: "landing" | "auth-login" | "auth-register";
}

export const Navbar: React.FC<NavbarProps> = ({ variant = "landing" }) => {
  const { isAuthenticated, user, logout } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);

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
          {isAuthenticated ? (
            <Link
              href="/dashboard"
              className="text-sm text-slate-300 hover:text-white transition-colors duration-300 font-sans"
            >
              Dashboard
            </Link>
          ) : (
            <Link
              href="/auth/login"
              className="text-sm text-slate-300 hover:text-white transition-colors duration-300 font-sans"
            >
              Sign In
            </Link>
          )}
        </div>
      )}

      <div className="flex items-center gap-3">
        {isAuthenticated ? (
          <div className="relative">
            <button
              onClick={() => setMenuOpen((prev) => !prev)}
              className="flex items-center gap-2 glass-soft rounded-full pl-1.5 pr-3 py-1.5 hover:bg-white/10 transition-all duration-300"
              aria-label="Account menu"
              aria-expanded={menuOpen}
            >
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white text-sm font-semibold">
                {user?.name?.charAt(0).toUpperCase() ?? "U"}
              </div>
              <ChevronDown
                size={16}
                className={`text-slate-300 transition-transform duration-300 ${
                  menuOpen ? "rotate-180" : ""
                }`}
              />
            </button>

            {menuOpen && (
              <>
                {/* Click-outside catcher */}
                <div
                  className="fixed inset-0 z-40"
                  onClick={() => setMenuOpen(false)}
                />
                <div className="absolute right-0 top-full mt-2 w-56 glass-strong rounded-2xl py-2 z-50 animate-slide-down">
                  <div className="px-4 py-3 border-b border-white/10">
                    <p className="text-white text-sm font-medium truncate">
                      {user?.name ?? "User"}
                    </p>
                    <p className="text-slate-400 text-xs truncate">
                      {user?.email}
                    </p>
                  </div>
                  <Link
                    href="/dashboard"
                    onClick={() => setMenuOpen(false)}
                    className="flex items-center gap-3 px-4 py-3 text-sm text-slate-300 hover:text-white hover:bg-white/5 transition-colors"
                  >
                    <LayoutDashboard size={16} />
                    Dashboard
                  </Link>
                  <button
                    onClick={() => {
                      setMenuOpen(false);
                      logout();
                    }}
                    className="w-full flex items-center gap-3 px-4 py-3 text-sm text-red-400 hover:text-red-300 hover:bg-red-500/10 transition-colors"
                  >
                    <LogOut size={16} />
                    Sign Out
                  </button>
                </div>
              </>
            )}
          </div>
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
