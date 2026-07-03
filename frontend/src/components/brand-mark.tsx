import React from "react";

interface BrandMarkProps {
  compact?: boolean;
  className?: string;
}

export function BrandMark({ compact = false, className = "" }: BrandMarkProps) {
  return (
    <div className={`flex items-center gap-2.5 ${className}`}>
      <div className="relative flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-slate-950 shadow-[0_0_0_1px_rgba(255,255,255,0.12),0_12px_30px_rgba(20,184,166,0.22)]">
        <svg
          viewBox="0 0 36 36"
          aria-hidden="true"
          className="h-7 w-7"
          fill="none"
        >
          <path
            d="M10 8.5h11.8L27 13.7v13.8H10V8.5Z"
            fill="url(#intelli-docs-page)"
          />
          <path
            d="M21.8 8.5v5.2H27"
            stroke="white"
            strokeOpacity="0.75"
            strokeWidth="1.6"
            strokeLinejoin="round"
          />
          <path
            d="M13.5 18.1h9M13.5 22h6.3"
            stroke="#E0F2FE"
            strokeWidth="1.8"
            strokeLinecap="round"
          />
          <path
            d="M8.5 24.5c2.2-3.1 4.8-4.8 7.7-4.8 2.6 0 4.6 1.2 6.1 3.5"
            stroke="#14B8A6"
            strokeWidth="2.2"
            strokeLinecap="round"
          />
          <circle cx="23.8" cy="23.7" r="3.7" fill="#6366F1" />
          <path
            d="m26.4 26.4 2.7 2.7"
            stroke="#C7D2FE"
            strokeWidth="2"
            strokeLinecap="round"
          />
          <defs>
            <linearGradient
              id="intelli-docs-page"
              x1="10"
              x2="28.5"
              y1="8.5"
              y2="27"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="#F8FAFC" />
              <stop offset="1" stopColor="#93C5FD" />
            </linearGradient>
          </defs>
        </svg>
      </div>
      {!compact && (
        <span className="font-display text-xl font-bold lowercase tracking-tight text-white">
          intelli-docs
        </span>
      )}
    </div>
  );
}
