// app/register/page.tsx
"use client";

import React, { useState } from "react";
import Link from "next/link";

export default function PanelRegisterPage() {
  const [formData, setFormData] = useState({
    name: "",
    position: "Executive",
    email: "",
    number: "",
    whatsapp: "",
    batch: "",
  });
  const [profilePic, setProfilePic] = useState<File | null>(null);
  const [submitted, setSubmitted] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setProfilePic(e.target.files[0]);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const data = new FormData();
    data.append("name", formData.name);
    data.append("position", formData.position);
    data.append("email", formData.email);
    data.append("number", formData.number);
    data.append("whatsapp", formData.whatsapp);
    data.append("batch", formData.batch);
    if (profilePic) {
      data.append("profilePic", profilePic);
    }

    console.log("Submitting Panel Request...");
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-stone-950 text-stone-100 flex flex-col justify-center items-center px-4 py-12 relative overflow-hidden">
      
      {/* ব্যাকগ্রাউন্ড গ্লো ইফেক্ট */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-96 h-96 bg-rose-900/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="w-full max-w-lg bg-stone-900/40 backdrop-blur-md border border-stone-800/80 p-8 rounded-2xl shadow-2xl relative z-10">
        
        {/* প্যানেল পোর্টাল হেডার */}
        <div className="text-center mb-8">
          <div className="inline-block bg-stone-800/60 border border-stone-700/50 text-stone-400 text-[10px] tracking-widest uppercase font-semibold px-2.5 py-1 rounded-md mb-3">
            Internal Access Only
          </div>
          <h1 className="text-2xl md:text-3xl font-bold tracking-tight bg-gradient-to-r from-stone-100 to-stone-400 bg-clip-text text-transparent">
            অফিশিয়াল প্যানেল পোর্টাল
          </h1>
          <p className="text-stone-500 text-xs mt-1.5 tracking-wide uppercase font-medium">
            Willes Literary Club • ড্যাশবোর্ড অ্যাকাউন্ট তৈরি
          </p>
        </div>

        {submitted ? (
          <div className="text-center py-8 animate-fade-in">
            <div className="w-16 h-16 bg-emerald-950/50 border border-emerald-500/30 text-emerald-400 rounded-full flex items-center justify-center text-2xl mx-auto mb-4">
              ✓
            </div>
            <h2 className="text-xl font-bold text-stone-200">আবেদন জমা হয়েছে!</h2>
            <p className="text-stone-400 text-sm mt-2 max-w-sm mx-auto">
              আপনার প্যানেল রিকোয়েস্টটি পাঠানো হয়েছে। অ্যাডমিন অ্যাপ্রুভ করলে আপনার ড্যাশবোর্ড অ্যাক্সেস চালু হয়ে যাবে।
            </p>
            <Link
              href="/"
              className="mt-6 inline-block text-xs bg-stone-800 hover:bg-stone-700 text-stone-200 px-4 py-2 rounded-xl transition-all border border-stone-700"
            >
              Panel Login
            </Link>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-5">
            
            {/* ১. নাম (Name) */}
            <div>
              <label className="block text-xs font-semibold text-stone-400 uppercase tracking-wider mb-2">
                Full Name
              </label>
              <input
                type="text"
                required
                className="w-full bg-stone-950/60 border border-stone-800 focus:border-rose-900/60 rounded-xl px-4 py-3 text-sm text-stone-100 placeholder-stone-600 focus:outline-none transition-colors"
                placeholder="Syed Fahim"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* ২. প্যানেল পজিশন (Position) */}
              <div>
                <label className="block text-xs font-semibold text-stone-400 uppercase tracking-wider mb-2">
                  Panel Designation
                </label>
                <select
                  className="w-full bg-stone-950/60 border border-stone-800 focus:border-rose-900/60 rounded-xl px-3 py-3 text-sm text-stone-100 focus:outline-none transition-colors"
                  value={formData.position}
                  onChange={(e) => setFormData({ ...formData, position: e.target.value })}
                >
                  <option value="Executive Team">Executive Team</option>
                  <option value="Moderator Panel">Moderator Panel</option>
                  <option value="Advisory Board">Advisory Board</option>
                  <option value="Administrator">Administrator</option>
                </select>
              </div>

              {/* ৩. ব্যাচ (Batch) */}
              <div>
                <label className="block text-xs font-semibold text-stone-400 uppercase tracking-wider mb-2">
                  Batch
                </label>
                <input
                  type="text"
                  required
                  className="w-full bg-stone-950/60 border border-stone-800 focus:border-rose-900/60 rounded-xl px-4 py-3 text-sm text-stone-100 placeholder-stone-600 focus:outline-none transition-colors"
                  placeholder="HSC '26"
                  value={formData.batch}
                  onChange={(e) => setFormData({ ...formData, batch: e.target.value })}
                />
              </div>
            </div>

            {/* ৪. অফিশিয়াল ইমেইল (Email) */}
            <div>
              <label className="block text-xs font-semibold text-stone-400 uppercase tracking-wider mb-2">
                Official Email Address
              </label>
              <input
                type="email"
                required
                className="w-full bg-stone-950/60 border border-stone-800 focus:border-rose-900/60 rounded-xl px-4 py-3 text-sm text-stone-100 placeholder-stone-600 focus:outline-none transition-colors"
                placeholder="official@wlc.pro.bd"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* ৫. কন্ট্যাক্ট নাম্বার (Number) */}
              <div>
                <label className="block text-xs font-semibold text-stone-400 uppercase tracking-wider mb-2">
                  Contact Number
                </label>
                <input
                  type="tel"
                  required
                  className="w-full bg-stone-950/60 border border-stone-800 focus:border-rose-900/60 rounded-xl px-4 py-3 text-sm text-stone-100 placeholder-stone-600 focus:outline-none transition-colors"
                  placeholder="01XXXXXXXXX"
                  value={formData.number}
                  onChange={(e) => setFormData({ ...formData, number: e.target.value })}
                />
              </div>

              {/* ৬. হোয়াটসঅ্যাপ (WhatsApp) */}
              <div>
                <label className="block text-xs font-semibold text-stone-400 uppercase tracking-wider mb-2">
                  WhatsApp Number
                </label>
                <input
                  type="tel"
                  required
                  className="w-full bg-stone-950/60 border border-stone-800 focus:border-rose-900/60 rounded-xl px-4 py-3 text-sm text-stone-100 placeholder-stone-600 focus:outline-none transition-colors"
                  placeholder="01XXXXXXXXX"
                  value={formData.whatsapp}
                  onChange={(e) => setFormData({ ...formData, whatsapp: e.target.value })}
                />
              </div>
            </div>

            {/* ৭. প্রোফাইল ছবি (Profile Pic) */}
            <div>
              <label className="block text-xs font-semibold text-stone-400 uppercase tracking-wider mb-2">
                Official Avatar / Photo <span className="text-stone-600 font-normal">(Optional)</span>
              </label>
              <div className="relative w-full bg-stone-950/60 border border-stone-800 hover:border-stone-700 rounded-xl px-4 py-3 text-sm transition-colors flex items-center justify-between cursor-pointer">
                <input
                  type="file"
                  accept="image/*"
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-20"
                  onChange={handleFileChange}
                />
                <span className="text-stone-500 text-xs truncate max-w-[250px]">
                  {profilePic ? profilePic.name : "Upload official image..."}
                </span>
                <span className="text-xs bg-stone-800 text-stone-300 px-2.5 py-1 rounded-md border border-stone-700 relative z-10">
                  Browse
                </span>
              </div>
            </div>

            {/* সাবমিট বাটন */}
            <button
              type="submit"
              className="w-full mt-2 bg-gradient-to-r from-stone-100 to-stone-300 hover:from-stone-200 hover:to-stone-400 text-stone-950 font-bold py-3 px-4 rounded-xl text-sm transition-all shadow-md hover:scale-[1.01] active:scale-[0.99]"
            >
              Request Panel Access ➔
            </button>
          </form>
        )}

        {/* ব্যাক লিংক */}
        <div className="flex justify-center mt-6">
          <Link
            href="/"
            className="text-xs text-stone-600 hover:text-stone-400 transition-colors flex items-center gap-1"
          >
            ← Panel Login
          </Link>
        </div>

      </div>
    </div>
  );
}
