"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { WLC_THEME } from "@/lib/theme";

export default function ThemeShowcasePage() {
  const [activeTab, setActiveTab] = useState<"website" | "panel">("website");
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  // 🌐 Main Website Colors (Light)
  const websiteColors = [
    { name: "Primary Rose", hex: "#9F1239", tailwind: "bg-rose-800", text: "text-white" },
    { name: "Secondary Rose", hex: "#BE123C", tailwind: "bg-rose-700", text: "text-white" },
    { name: "Deep Stone", hex: "#1C1917", tailwind: "bg-stone-900", text: "text-white" },
    { name: "Muted Gray", hex: "#6B7280", tailwind: "bg-gray-500", text: "text-white" },
    { name: "Background Light", hex: "#FAFAFA", tailwind: "bg-[#FAFAFA]", text: "text-gray-800" },
    { name: "Pure White", hex: "#FFFFFF", tailwind: "bg-white", text: "text-gray-800" },
  ];

  // 🔐 Internal Panel Colors (Dark)
  const panelColors = [
    { name: "Dark Base (Bg)", hex: "#1C1917", tailwind: "bg-stone-900", text: "text-stone-300" },
    { name: "Glass Card Base", hex: "#0C0A09", tailwind: "bg-stone-950/80", text: "text-stone-300" },
    { name: "Primary Accent", hex: "#BE123C", tailwind: "bg-rose-700", text: "text-white" },
    { name: "Deep Accent", hex: "#881337", tailwind: "bg-rose-900", text: "text-white" },
    { name: "Glow Ambient", hex: "#D97706", tailwind: "bg-amber-600", text: "text-white" },
    { name: "Card Border", hex: "#2C2826", tailwind: "bg-stone-800", text: "text-stone-300" },
  ];

  const copyToClipboard = (key: string, value: string) => {
    navigator.clipboard.writeText(value);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  return (
    <div className={`min-h-screen transition-colors duration-300 ${activeTab === "panel" ? "bg-stone-900 text-white" : "bg-[#FAFAFA] text-gray-800"}`}>
      
      {/* 🔘 Tab Switcher Navigation */}
      <div className="sticky top-0 z-50 backdrop-blur-md bg-stone-950/80 border-b border-stone-800 py-3 px-4">
        <div className="max-w-5xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="relative w-6 h-6">
              <Image src="/logo.png" alt="WLC Logo" fill className="object-contain" />
            </div>
            <span className="text-xs font-bold font-mono text-stone-300 tracking-wider uppercase">WLC Design System</span>
          </div>

          <div className="flex bg-stone-900 p-1 rounded-xl border border-stone-800">
            <button
              onClick={() => setActiveTab("website")}
              className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-all ${
                activeTab === "website" ? "bg-rose-700 text-white shadow-md" : "text-stone-400 hover:text-stone-200"
              }`}
            >
              🌐 Main Website Theme
            </button>
            <button
              onClick={() => setActiveTab("panel")}
              className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-all ${
                activeTab === "panel" ? "bg-rose-700 text-white shadow-md" : "text-stone-400 hover:text-stone-200"
              }`}
            >
              🔐 Internal Panel Theme
            </button>
          </div>
        </div>
      </div>

      {/* =========================================================
          TAB 1: MAIN WEBSITE THEME (LIGHT MODE)
         ========================================================= */}
      {activeTab === "website" && (
        <main className="font-sans p-6 md:p-12 max-w-5xl mx-auto animate-fadeIn">
          {/* 🔮 হেডার */}
          <header className="border-b border-gray-200 pb-8 mb-12">
            <span className="text-rose-700 text-sm font-bold uppercase tracking-widest bg-rose-50 px-3 py-1 rounded-full border border-rose-100">
              Design System
            </span>
            <h1 className="text-4xl font-bold font-serif text-gray-900 mt-3 mb-2">Style Guide & UI Tokens</h1>
            <p className="text-gray-500 text-sm md:text-base">উইল্‌স সাহিত্য ক্লাবের মূল ওয়েবসাইটের ভিজ্যুয়াল কন্সিস্টেন্সি বজায় রাখার গাইডলাইন।</p>
          </header>

          {/* 🎨 ১. কালার প্যালেট */}
          <section className="mb-16">
            <h2 className="text-xl font-bold font-serif text-gray-900 mb-6 border-l-4 border-rose-800 pl-3">১. কালার প্যালেট (Brand Colors)</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4">
              {websiteColors.map((color, idx) => (
                <div key={idx} className="bg-white border border-gray-200 rounded-2xl p-3 shadow-sm">
                  <div className={`w-full aspect-square rounded-xl mb-3 ${color.tailwind} flex items-end p-2`}>
                    <span className={`text-[10px] font-mono font-bold px-1.5 py-0.5 bg-black/20 backdrop-blur-sm rounded ${color.text}`}>
                      {color.hex}
                    </span>
                  </div>
                  <h3 className="font-bold text-xs text-gray-900">{color.name}</h3>
                  <p className="text-[10px] text-gray-400 font-mono mt-0.5">{color.tailwind}</p>
                </div>
              ))}
            </div>
          </section>

          {/* ✍️ ২. টাইপোগ্রাফি */}
          <section className="mb-16 bg-white border border-gray-200 rounded-3xl p-6 md:p-8 shadow-sm">
            <h2 className="text-xl font-bold font-serif text-gray-900 mb-6 border-l-4 border-rose-800 pl-3">২. টাইপোগ্রাফি (Fonts & Sizes)</h2>
            <div className="space-y-6">
              <div className="border-b border-gray-100 pb-4">
                <span className="text-[10px] font-mono text-gray-400">Font Serif (শিরোনামের জন্য)</span>
                <h1 className="text-3xl md:text-4xl font-bold font-serif text-gray-900 mt-1">উইলস সাহিত্য ক্লাব ২০২৬</h1>
              </div>
              <div className="border-b border-gray-100 pb-4">
                <span className="text-[10px] font-mono text-gray-400">Font Sans (বডি টেক্সটের জন্য)</span>
                <p className="text-base text-gray-600 mt-1 leading-relaxed">
                  সৃজনশীল লেখনী ও সাহিত্যের এক অপূর্ব মেলবন্ধন। আমাদের সব সাধারণ বডি টেক্সট এবং বিবরণ এই ফন্টে রেন্ডার হবে।
                </p>
              </div>
            </div>
          </section>

          {/* 🔘 ৩. বাটন ও ইন্টারঅ্যাকশন */}
          <section className="mb-16">
            <h2 className="text-xl font-bold font-serif text-gray-900 mb-6 border-l-4 border-rose-800 pl-3">৩. বাটনসমূহ (Buttons)</h2>
            <div className="flex flex-wrap gap-4 items-center bg-white border border-gray-200 rounded-3xl p-6 shadow-sm">
              <div>
                <span className="block text-[10px] font-mono text-gray-400 mb-2">Primary Button</span>
                <button className="bg-stone-950 text-white font-semibold text-xs px-5 py-2.5 rounded-xl hover:bg-rose-900 transition-colors shadow-sm">
                  Primary Action ➔
                </button>
              </div>
              <div>
                <span className="block text-[10px] font-mono text-gray-400 mb-2">Secondary Button</span>
                <button className="bg-white border border-gray-200 text-stone-800 font-semibold text-xs px-5 py-2.5 rounded-xl hover:bg-stone-50 transition-colors">
                  Secondary Action
                </button>
              </div>
              <div>
                <span className="block text-[10px] font-mono text-gray-400 mb-2">Status Badge</span>
                <span className="text-xs text-rose-700 font-bold bg-rose-50 border border-rose-100 px-3 py-1 rounded-full uppercase">
                  রেজিস্ট্রেশন চলছে
                </span>
              </div>
            </div>
          </section>

          {/* 🏷️ ৪. লোগো ও ব্র্যান্ডিং */}
          <section className="mb-16">
            <h2 className="text-xl font-bold font-serif text-gray-900 mb-6 border-l-4 border-rose-800 pl-3">
              ৪. লোগো ও ব্র্যান্ডিং (Logos & Asset)
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="bg-white border border-gray-200 rounded-3xl p-6 shadow-sm flex flex-col items-center justify-center text-center">
                <span className="text-[10px] font-mono text-gray-400 mb-4 self-start">Path: /logo.png</span>
                <div className="relative w-36 h-36 mb-4 bg-[#FAFAFA] rounded-2xl p-4 border border-gray-100 flex items-center justify-center group hover:border-rose-200 transition-colors">
                  <Image src="/logo.png" alt="WLC Club Logo" width={120} height={120} className="object-contain" priority />
                </div>
                <p className="text-sm font-bold text-gray-800">উইলস সাহিত্য ক্লাব লোগো</p>
                <p className="text-[11px] text-gray-400 mt-1 leading-relaxed">
                  নেভিগেশন বার, ব্র্যান্ডিং এলিমেন্ট এবং মেইন ডক্সের জন্য ব্যবহৃত প্রাথমিক অ্যাসেট।
                </p>
              </div>

              <div className="bg-white border border-gray-200 rounded-3xl p-6 shadow-sm flex flex-col items-center justify-center text-center">
                <span className="text-[10px] font-mono text-gray-400 mb-4 self-start">Path: /wlfsc.png</span>
                <div className="relative w-36 h-36 mb-4 bg-[#FAFAFA] rounded-2xl p-4 border border-gray-100 flex items-center justify-center group hover:border-rose-200 transition-colors">
                  <Image src="/wlfsc.png" alt="WLFSC School Logo" width={120} height={120} className="object-contain" priority />
                </div>
                <p className="text-sm font-bold text-gray-800">WLFSC অফিশিয়াল মনোগ্রাম</p>
                <p className="text-[11px] text-gray-400 mt-1 leading-relaxed">
                  মাদার ইনস্টিটিউশন বা প্রাতিষ্ঠানিক পরিচয় এবং ফুটার সেকশনের ক্রেডিটে ব্যবহারের জন্য।
                </p>
              </div>
            </div>
          </section>
        </main>
      )}

      {/* =========================================================
          TAB 2: INTERNAL PANEL THEME (DARK MODE)
         ========================================================= */}
      {activeTab === "panel" && (
        <div className="p-6 md:p-12 max-w-5xl mx-auto space-y-10 animate-fadeIn relative overflow-hidden">
          {/* Background Glows */}
          <div className={WLC_THEME.glowTopLeft} />
          <div className={WLC_THEME.glowBottomRight} />

          {/* Header */}
          <div className="border-b border-stone-800 pb-6 relative z-10">
            <span className="text-rose-400 text-xs font-bold uppercase tracking-widest bg-rose-950/50 px-3 py-1 rounded-full border border-rose-900/50">
              Panel Theme Tokens
            </span>
            <h1 className="text-3xl font-extrabold text-white tracking-tight mt-3">Internal Management Theme</h1>
            <p className="text-stone-400 text-sm mt-1">
              লগইন, ড্যাশবোর্ড ও ক্লাউড প্যানেলে ব্যবহৃত Dark Glassmorphism ডিজাইন গাইড।
            </p>
          </div>

          {/* 🎨 ১. ইন্টারনাল কালার প্যালেট */}
          <div className="bg-stone-950/60 backdrop-blur-xl border border-stone-800/80 rounded-3xl p-6 shadow-2xl relative z-10 space-y-4">
            <h2 className="text-sm font-bold text-rose-400 uppercase tracking-wider">01. Panel Color Palette</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4">
              {panelColors.map((color, idx) => (
                <div key={idx} className="bg-stone-900/90 border border-stone-800 rounded-2xl p-3 shadow-sm">
                  <div className={`w-full aspect-square rounded-xl mb-3 ${color.tailwind} border border-stone-700/50 flex items-end p-2`}>
                    <span className={`text-[10px] font-mono font-bold px-1.5 py-0.5 bg-black/40 backdrop-blur-sm rounded ${color.text}`}>
                      {color.hex}
                    </span>
                  </div>
                  <h3 className="font-bold text-xs text-stone-200 truncate">{color.name}</h3>
                  <p className="text-[10px] text-stone-500 font-mono mt-0.5 truncate">{color.tailwind}</p>
                </div>
              ))}
            </div>
          </div>

          {/* 🧪 ২. প্রিভিউ কমপোনেন্টস */}
          <div className="bg-stone-950/60 backdrop-blur-xl border border-stone-800/80 rounded-3xl p-6 shadow-2xl relative z-10 space-y-6">
            <h2 className="text-sm font-bold text-rose-400 uppercase tracking-wider">02. Live Panel Components Preview</h2>
            
            <div className="grid md:grid-cols-2 gap-6">
              {/* Form Controls */}
              <div className="space-y-4 bg-stone-900/40 p-5 rounded-2xl border border-stone-800/50">
                <h3 className="text-xs font-bold text-stone-300 uppercase">Input Fields & Action Button</h3>
                <div>
                  <label className={WLC_THEME.label}>Email Address</label>
                  <input type="email" placeholder="admin@wlc.pro.bd" className={WLC_THEME.input} readOnly />
                </div>
                <button className={WLC_THEME.primaryButton}>Enter Panel ➔</button>
              </div>

              {/* Status Alerts */}
              <div className="space-y-4 bg-stone-900/40 p-5 rounded-2xl border border-stone-800/50">
                <h3 className="text-xs font-bold text-stone-300 uppercase">Alert Messages</h3>
                <div className={WLC_THEME.errorAlert}>🚨 ভুল ইমেইল/পাসওয়ার্ড দেওয়া হয়েছে!</div>
                <div className={WLC_THEME.successAlert}>✅ আবেদন সফলভাবে অ্যাপ্রুভ করা হয়েছে।</div>
              </div>
            </div>
          </div>

          {/* 🏷️ ৩. টোকেন কোড ডিকশনারি */}
          <div className="bg-stone-950/60 backdrop-blur-xl border border-stone-800/80 rounded-3xl p-6 shadow-2xl relative z-10 space-y-4">
            <h2 className="text-sm font-bold text-rose-400 uppercase tracking-wider">03. Reusable Token Classes (`@/lib/theme`)</h2>
            <div className="space-y-3 font-mono text-xs">
              {Object.entries(WLC_THEME).map(([key, value]) => (
                <div key={key} className="flex flex-col sm:flex-row sm:items-center justify-between bg-stone-900/80 border border-stone-800/80 p-3 rounded-xl gap-2 hover:border-rose-900/50 transition-colors">
                  <div className="overflow-hidden">
                    <span className="text-rose-400 font-bold">{key}:</span>
                    <p className="text-stone-400 truncate text-[11px] mt-0.5">{value}</p>
                  </div>
                  <button
                    onClick={() => copyToClipboard(key, value)}
                    className="self-end sm:self-center px-3 py-1.5 bg-stone-800 hover:bg-stone-700 text-stone-200 text-[10px] rounded-lg transition-all font-sans whitespace-nowrap"
                  >
                    {copiedKey === key ? "✓ Copied" : "Copy Classes"}
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
