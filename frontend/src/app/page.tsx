"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { GlassPanel } from "@/components/glass-panel";
import { StickyFeatureNav } from "@/components/sticky-feature-nav";
import { FAQ } from "@/components/faq";
import { Navbar } from "@/components/navbar";
import { ArrowRight, Sparkles } from "lucide-react";

const FEATURES = [
  {
    id: "smart-analysis",
    title: "Smart Analysis",
    description:
      "Our AI doesn’t just read; it understands. Using advanced semantic search, we extract the core meaning of your documents, providing answers that are grounded in actual context.",
    visual: " la-dark-block",
  },
  {
    id: "multi-doc-sync",
    title: "Multi-Doc Sync",
    description:
      "Query across multiple PDFs simultaneously. The system synthesizes information from diverse sources to give you a comprehensive overview of your library.",
    visual: "la-blueprint",
  },
  {
    id: "secure-vault",
    title: "Secure Vault",
    description:
      "Enterprise-grade encryption for your private documents. Your data is stored securely and is only accessible to you through authenticated sessions.",
    visual: "la-security",
  },
];

const TESTIMONIALS = [
  {
    name: "Alex Rivers",
    handle: "@arivers_dev",
    quote:
      "The precision of the document retrieval is uncanny. It has completely changed how I handle research papers.",
    avatar: "https://i.pravatar.cc/150?u=alex",
  },
  {
    name: "Sarah Chen",
    handle: "@schen_ai",
    quote:
      "Finally, a PDF tool that actually understands context instead of just keyword matching. Truly premium feel.",
    avatar: "https://i.pravatar.cc/150?u=sarah",
  },
  {
    name: "Marcus Thorne",
    handle: "@mthorne_ops",
    quote:
      "Sleek design and blazing fast responses. The glassmorphic UI is just the cherry on top of a powerful engine.",
    avatar: "https://i.pravatar.cc/150?u=marcus",
  },
];

const FAQS = [
  {
    question: "How does the AI handle large PDFs?",
    answer:
      "We use a recursive character splitter to break documents into optimized chunks, which are then embedded into a high-dimensional vector space for efficient retrieval.",
  },
  {
    question: "Is my data private?",
    answer:
      "Absolutely. Documents are stored in private buckets and vector namespaces are isolated per user to ensure zero leakage between accounts.",
  },
  {
    question: "Which PDF formats are supported?",
    answer:
      "We support all standard PDF versions. For best results, we recommend text-based PDFs rather than scanned images.",
  },
];

const FRAMEWORKS = [
  { name: "FastAPI", icon: "⚡", color: "from-green-500/20 to-emerald-500/20" },
  {
    name: "LangChain",
    icon: "🦜",
    color: "from-orange-500/20 to-amber-500/20",
  },
  { name: "Next.js", icon: "▲", color: "from-white/20 to-slate-500/20" },
  { name: "Pinecone", icon: "🌲", color: "from-teal-500/20 to-cyan-500/20" },
  { name: "Gemini AI", icon: "✨", color: "from-blue-500/20 to-indigo-500/20" },
  { name: "PostgreSQL", icon: "🐘", color: "from-blue-600/20 to-sky-500/20" },
];

const INTEGRATIONS = [
  { name: "Pinecone", icon: "🌲" },
  { name: "Gemini 2.5", icon: "✨" },
  { name: "Cloudinary", icon: "☁️" },
  { name: "LangChain", icon: "🦜" },
  { name: "OpenAI", icon: "🧠" },
  { name: "Docker", icon: "🐳" },
  { name: "AWS EC2", icon: "☁️" },
  { name: "FastAPI", icon: "⚡" },
];

export default function LandingPage() {
  return (
    <main className="min-h-screen">
      <Navbar />
      {/* --- HERO SECTION --- */}
      <section className="relative min-h-[760px] h-[110vh] flex items-center justify-center overflow-hidden px-4">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-slate-900 opacity-80 z-10" />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-slate-900 z-20" />
          <Image
            src="https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=2070"
            className="object-cover"
            alt="Background"
            fill
            priority
            sizes="100vw"
          />
        </div>

        <div className="relative z-30 text-center w-full max-w-5xl flex flex-col items-center gap-6 sm:gap-8">
          <div className="px-4 py-1 rounded-full bg-indigo-500/20 border border-indigo-500/30 text-indigo-400 text-xs font-display uppercase tracking-widest">
            Now with AI-Powered Chat
          </div>

          <h1 className="font-serif text-4xl sm:text-6xl md:text-8xl text-white tracking-tight leading-tight max-w-5xl">
            Understand your{" "}
            <span className="italic text-indigo-400">knowledge</span> <br /> in
            a new dimension.
          </h1>

          <div className="text-slate-300 text-base sm:text-xl md:text-2xl font-sans max-w-2xl animate-typing">
            Experience the next generation of document intelligence.
          </div>

          {/* CTA Buttons - Direct users to sign in */}
          <div className="flex flex-col sm:flex-row items-center gap-4 mt-4">
            <Link
              href="/auth/register"
              className="flex items-center gap-2 px-8 py-4 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-semibold text-lg transition-all duration-300 shadow-lg shadow-indigo-500/30 hover:shadow-indigo-500/50"
            >
              <Sparkles size={20} />
              Get Started Free
              <ArrowRight size={18} />
            </Link>
            <Link
              href="/auth/login"
              className="flex items-center gap-2 px-8 py-4 bg-white/10 hover:bg-white/20 text-white border border-white/20 rounded-xl font-semibold text-lg transition-all duration-300"
            >
              Sign In
            </Link>
          </div>

          <p className="text-slate-400 text-sm font-sans max-w-md">
            Upload your PDFs and start asking questions in seconds.
          </p>
        </div>

        {/* Integration Bar */}
        <div className="absolute bottom-6 sm:bottom-10 left-1/2 -translate-x-1/2 z-30 w-full max-w-4xl px-4">
          <GlassPanel
            variant="soft"
            className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 sm:gap-0 p-4 rounded-2xl overflow-hidden"
          >
            <div className="flex items-center justify-between sm:justify-start gap-4 px-1 sm:px-4">
              <span className="text-xs font-display uppercase tracking-widest text-slate-400">
                Powered By
              </span>
              <div className="flex gap-2 opacity-90">
                {FRAMEWORKS.slice(0, 4).map((fw) => (
                  <div
                    key={fw.name}
                    className={`flex items-center gap-1.5 px-3 py-1.5 bg-gradient-to-r ${fw.color} border border-white/10 rounded-lg hover:scale-105 transition-transform cursor-pointer`}
                    title={fw.name}
                  >
                    <span className="text-base">{fw.icon}</span>
                    <span className="text-xs text-white font-medium hidden sm:inline">
                      {fw.name}
                    </span>
                  </div>
                ))}
              </div>
            </div>
            <div className="hidden sm:block h-8 w-px bg-white/10" />
            <div className="flex items-center gap-4 px-1 sm:px-4 overflow-hidden w-full sm:max-w-sm">
              <span className="text-xs font-display uppercase tracking-widest text-slate-400 shrink-0">
                Integrations
              </span>
              <div className="relative overflow-hidden w-full">
                <div className="flex gap-6 animate-marquee whitespace-nowrap">
                  {/* Duplicate items for seamless loop */}
                  {[...INTEGRATIONS, ...INTEGRATIONS].map((int, idx) => (
                    <span
                      key={`${int.name}-${idx}`}
                      className="inline-flex items-center gap-1.5 text-sm text-slate-300 hover:text-indigo-400 transition-colors cursor-pointer"
                    >
                      <span>{int.icon}</span>
                      {int.name}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </GlassPanel>
        </div>
      </section>

      {/* --- FEATURE SCROLL-SPY --- */}
      <section
        className="bg-[#f8f9fa] py-16 sm:py-24 px-4 sm:px-8 lg:px-20"
        id="features"
      >
        <div className="max-w-7xl mx-auto flex gap-20">
          <div className="hidden lg:block w-1/4">
            <StickyFeatureNav features={FEATURES} />
          </div>

          <div className="w-full lg:w-3/4 flex flex-col gap-20 sm:gap-32">
            {FEATURES.map((f) => (
              <div
                key={f.id}
                id={f.id}
                className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center"
              >
                <div className="space-y-6">
                  <h3 className="font-serif text-3xl sm:text-4xl text-slate-900 tracking-tight">
                    {f.title}
                  </h3>
                  <p className="text-slate-600 text-lg leading-relaxed font-sans">
                    {f.description}
                  </p>
                </div>
                <div className="bg-slate-900 rounded-2xl h-64 w-full overflow-hidden shadow-2xl relative group">
                  <div className="absolute inset-0 bg-indigo-500/10 opacity-0 group-hover:opacity-100 transition-opacity" />
                  <div className="p-6 font-mono text-xs text-indigo-300 overflow-auto h-full">
                    <pre>{`// Intelligence logic for ${f.title}\nconst analyze = (doc) => {\n  return vectorIndex.query({\n    id: doc.id,\n    topK: 4,\n    filter: { user_id: current_user }\n  });\n};`}</pre>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* --- TESTIMONIALS --- */}
      <section className="bg-slate-900 py-16 sm:py-24 px-4 overflow-hidden">
        <div className="max-w-7xl mx-auto text-center mb-12 sm:mb-16">
          <h2 className="font-serif text-4xl sm:text-5xl text-white tracking-tight">
            Loved by visionaries.
          </h2>
        </div>
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
          {TESTIMONIALS.map((t, i) => (
            <GlassPanel
              key={i}
              variant="strong"
              className="p-8 rounded-3xl text-left"
            >
              <p className="text-slate-200 text-sm leading-relaxed mb-8 italic">
                &ldquo;{t.quote}&rdquo;
              </p>
              <div className="flex items-center gap-4">
                <Image
                  src={t.avatar}
                  className="w-10 h-10 rounded-full border border-white/20"
                  alt={t.name}
                  width={40}
                  height={40}
                />
                <div className="flex flex-col">
                  <span className="text-white font-medium text-sm">
                    {t.name}
                  </span>
                  <span className="text-slate-400 text-xs">{t.handle}</span>
                </div>
              </div>
            </GlassPanel>
          ))}
        </div>
      </section>

      {/* --- FAQ --- */}
      <section className="bg-white py-24" id="faq">
        <FAQ items={FAQS} />
      </section>

      <footer className="bg-slate-900 py-12 border-t border-white/10 text-center">
        <div className="text-slate-500 text-sm font-display tracking-tight">
          &copy; {new Date().getFullYear()} Intelli Docs. All rights reserved.
        </div>
      </footer>
    </main>
  );
}
