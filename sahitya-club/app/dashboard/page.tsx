"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

interface UserSession {
  name: string;
  email: string;
  position: string;
  allowedPages?: string[];
}

export default function DashboardPage() {
  const [user, setUser] = useState<UserSession | null>(null);
  const router = useRouter();

  useEffect(() => {
    const sessionData = localStorage.getItem("userSession");
    if (!sessionData) {
      router.push("/");
    } else {
      setUser(JSON.parse(sessionData));
    }
  }, [router]);

  if (!user) return <div className="min-h-screen bg-stone-950 flex items-center justify-center text-xs text-stone-500">Loading Dashboard...</div>;

  // পারমিশন চেক করার হেল্পার ফাংশন
  const hasAccess = (pageId: string) => user.allowedPages?.includes(pageId) || false;

  return (
    <div className="min-h-screen bg-stone-950 text-stone-100 p-6 md:p-12 selection:bg-rose-500 selection:text-white">
      
      {/* টপ হেডার বার */}
      <div className="max-w-5xl mx-auto flex justify-between items-center border-b border-stone-800 pb-6 mb-8">
        <div>
          <h1 className="text-xl font-bold tracking-tight text-white">{user.name} ভাই-এর ড্যাশবোর্ড</h1>
          <p className="text-xs text-stone-400 mt-0.5">অফিশিয়াল মেম্বার পোর্টাল • WLC</p>
        </div>
        <button 
          onClick={() => { localStorage.removeItem("userSession"); router.push("/"); }} 
          className="px-4 py-2 bg-stone-900 border border-stone-800 hover:border-rose-900/50 hover:text-rose-400 text-xs font-semibold rounded-xl transition-all"
        >
          Logout ➔
        </button>
      </div>

      <div className="max-w-5xl mx-auto space-y-8">
        
        {/* ১. মেম্বারশিপ ও অ্যাডমিন ম্যানেজমেন্ট ক্যাটাগরি */}
        {(hasAccess("member-input") || hasAccess("member-list") || hasAccess("approve") || hasAccess("member-form")) && (
          <div>
            <h3 className="text-xs font-bold text-stone-400 uppercase tracking-widest mb-4">Management & Operations</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              
              {hasAccess("member-input") && (
                <Link href="/member-input" className="p-4 bg-stone-900 border border-stone-800/80 rounded-xl hover:border-rose-900/40 transition-all block">
                  <p className="text-xs font-bold text-stone-200">/member-input</p>
                  <p className="text-[10px] text-stone-500 mt-1">ম্যানুয়াল মেম্বার ডাটা এন্ট্রি</p>
                </Link>
              )}

              {hasAccess("member-list") && (
                <Link href="/member-list" className="p-4 bg-stone-900 border border-stone-800/80 rounded-xl hover:border-rose-900/40 transition-all block">
                  <p className="text-xs font-bold text-stone-200">/member-list</p>
                  <p className="text-[10px] text-stone-500 mt-1">মেম্বার ডাটাবেজ তালিকা</p>
                </Link>
              )}

              {hasAccess("approve") && (
                <Link href="/approve" className="p-4 bg-stone-900 border border-stone-800/80 rounded-xl hover:border-rose-900/40 transition-all block">
                  <p className="text-xs font-bold text-stone-200">/approve</p>
                  <p className="text-[10px] text-stone-500 mt-1">প্যানেল রিকোয়েস্ট এপ্রুভাল পোর্টাল</p>
                </Link>
              )}

              {hasAccess("member-form") && (
                <Link href="/member-form" className="p-4 bg-stone-900 border border-stone-800/80 rounded-xl hover:border-rose-900/40 transition-all block">
                  <p className="text-xs font-bold text-stone-200">/member-form</p>
                  <p className="text-[10px] text-stone-500 mt-1">Google Form Response হাব</p>
                </Link>
              )}

            </div>
          </div>
        )}

        {/* ২. এডিটরিয়াল ডিপার্টমেন্ট ও কন্টেন্ট ক্যাটাগরি */}
        {(hasAccess("editorial") || hasAccess("written") || hasAccess("spoken") || hasAccess("adobe-assets") || hasAccess("canva") || hasAccess("pngs")) && (
          <div>
            <h3 className="text-xs font-bold text-rose-400 uppercase tracking-widest mb-4">Editorial & Creative Studio</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">

              {hasAccess("editorial") && (
                <Link href="/editorial" className="p-4 bg-stone-900 border border-stone-800/80 rounded-xl hover:border-rose-900/40 transition-all block md:col-span-1">
                  <p className="text-xs font-bold text-rose-400">/editorial</p>
                  <p className="text-[10px] text-stone-500 mt-1">মূল এডিটরিয়াল প্যারেন্ট হাব</p>
                </Link>
              )}

              {hasAccess("written") && (
                <Link href="/editorial/written" className="p-4 bg-stone-900 border border-stone-800/80 rounded-xl hover:border-rose-900/40 transition-all block">
                  <p className="text-xs font-bold text-stone-200">/written</p>
                  <p className="text-[10px] text-stone-500 mt-1">লিখিত কন্টেন্ট ও ড্রাফট</p>
                </Link>
              )}

              {hasAccess("spoken") && (
                <Link href="/editorial/spoken" className="p-4 bg-stone-900 border border-stone-800/80 rounded-xl hover:border-rose-900/40 transition-all block">
                  <p className="text-xs font-bold text-stone-200">/spoken</p>
                  <p className="text-[10px] text-stone-500 mt-1">বাচনভঙ্গি ও স্পোকেন সোর্স</p>
                </Link>
              )}

              {hasAccess("canva") && (
                <Link href="/editorial/canva" className="p-4 bg-stone-900 border border-stone-800/80 rounded-xl hover:border-rose-900/40 transition-all block">
                  <p className="text-xs font-bold text-amber-500">/canva</p>
                  <p className="text-[10px] text-stone-500 mt-1">ক্যানভা টেমপ্লেট ও শেয়ার লিংক</p>
                </Link>
              )}

              {hasAccess("pngs") && (
                <Link href="/editorial/pngs" className="p-4 bg-stone-900 border border-stone-800/80 rounded-xl hover:border-rose-900/40 transition-all block">
                  <p className="text-xs font-bold text-stone-200">/pngs</p>
                  <p className="text-[10px] text-stone-500 mt-1">ট্রান্সপারেন্ট পিএনজি ও ওভারলে</p>
                </Link>
              )}

            </div>
          </div>
        )}

        {/* ৩. অ্যাডোবি স্পেসিফিক অ্যাসেটস (সাব-রুটস) */}
        {(hasAccess("adobe-assets") || hasAccess("photoshop") || hasAccess("illustrator")) && (
          <div className="bg-stone-900/40 border border-stone-800 rounded-2xl p-5">
            <h4 className="text-xs font-bold text-blue-400 uppercase tracking-widest mb-3">Adobe Creative Suite</h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
              
              {hasAccess("adobe-assets") && (
                <Link href="/editorial/adobe-assets" className="p-3.5 bg-stone-950 border border-stone-800 rounded-xl hover:border-blue-900/40 transition-all block">
                  <p className="text-xs font-bold text-stone-300">/adobe-assets</p>
                  <p className="text-[10px] text-stone-500 mt-0.5">সব অ্যাডোবি সোর্স প্রজেক্ট</p>
                </Link>
              )}

              {hasAccess("photoshop") && (
                <Link href="/editorial/adobe-assets/photoshop" className="p-3.5 bg-stone-950 border border-stone-800 rounded-xl hover:border-blue-900/40 transition-all block">
                  <p className="text-xs font-bold text-stone-300">/photoshop (PSDs)</p>
                  <p className="text-[10px] text-stone-500 mt-0.5">ফটোশপ র ফাইল ও ড্রাফটস</p>
                </Link>
              )}

              {hasAccess("illustrator") && (
                <Link href="/editorial/adobe-assets/illustrator" className="p-3.5 bg-stone-950 border border-stone-800 rounded-xl hover:border-blue-900/40 transition-all block">
                  <p className="text-xs font-bold text-stone-300">/illustrator (AIs)</p>
                  <p className="text-[10px] text-stone-500 mt-0.5">ভেক্টর ও ইলাস্ট্রেটর ডিজাইন</p>
                </Link>
              )}

            </div>
          </div>
        )}

        {/* ৪. এআই টুলস ও কমিউনিকেশন */}
        {(hasAccess("sahitto-ai") || hasAccess("chat")) && (
          <div>
            <h3 className="text-xs font-bold text-stone-400 uppercase tracking-widest mb-4">Intelligence & Discussion</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

              {hasAccess("sahitto-ai") && (
                <Link href="/Sahitto-AI" className="p-5 bg-gradient-to-br from-stone-900 to-rose-950/20 border border-rose-900/30 rounded-xl hover:border-rose-700/60 transition-all block group">
                  <p className="text-xs font-bold text-stone-100 group-hover:text-rose-400 transition-colors">/Sahitto-AI 🌟</p>
                  <p className="text-[10px] text-stone-400 mt-1">WLC কাস্টম সাহিত্য ও স্ক্রিপ্ট রাইটিং এআই মডেল</p>
                </Link>
              )}

              {hasAccess("chat") && (
                <Link href="/chat" className="p-5 bg-stone-900 border border-stone-800 rounded-xl hover:border-rose-900/40 transition-all block">
                  <p className="text-xs font-bold text-stone-200">/chat 💬</p>
                  <p className="text-[10px] text-stone-500 mt-1">অভ্যন্তরীণ প্যানেল মেম্বারদের রিয়েল-টাইম চ্যাট রুম</p>
                </Link>
              )}

            </div>
          </div>
        )}

        {/* কোনো পারমিশন না থাকলে */}
        {(!user.allowedPages || user.allowedPages.length === 0) && (
          <div className="text-xs text-stone-500 text-center py-12 border border-dashed border-stone-800 rounded-2xl">
            আপনাকে এখনও কোনো পেজের অ্যাক্সেস দেওয়া হয়নি ভাই। এডমিনের সাথে যোগাযোগ করুন।
          </div>
        )}

      </div>
    </div>
  );
}
