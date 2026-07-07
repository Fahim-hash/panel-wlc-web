// app/dashboard/page.tsx
"use client";

import React, { useState } from "react";
import Link from "next/link";

// ৪টি আলাদা রোলের জন্য ৪টি সাব-কম্পোনেন্ট নিচে ডিফাইন করা হয়েছে
import AdminView from "./views/AdminView";
import ModeratorView from "./views/ModeratorView";
import EditorialView from "./views/EditorialView";
import ExecutiveView from "./views/ExecutiveView";

type Role = "Admin" | "Moderator" | "Editorial" | "Executive";

export default function DashboardPage() {
  // বাস্তব প্রজেক্টে এই রোলটি ফায়ারবেস বা লোকালস্টোরেজ থেকে রিড হবে
  // আপাতত টেস্ট করার জন্য আমরা একটি স্টেট নিচ্ছি যাতে সহজেই সুইচ করে দেখা যায়
  const [userRole, setUserRole] = useState<Role>("Admin");
  const [userName, setUserName] = useState("Syed Fahim");

  return (
    <div className="min-h-screen bg-stone-950 text-stone-100 flex">
      
      {/* বাম পাশের সাইডবার (Sidebar) */}
      <aside className="w-64 bg-stone-900 border-r border-stone-800 p-6 flex flex-col justify-between hidden md:flex">
        <div>
          <div className="mb-8">
            <h2 className="text-sm font-bold tracking-wider text-rose-500 uppercase">WLC Panel</h2>
            <p className="text-xs text-stone-400">ড্যাশবোর্ড কন্ট্রোল</p>
          </div>

          {/* রোল সিলেকশন ড্রপডাউন (শুধুমাত্র আপনার ডেভেলপমেন্ট বা টেস্টিং সুবিধার জন্য রাখা হয়েছে) */}
          <div className="mb-6 p-3 bg-stone-950 rounded-xl border border-stone-800">
            <label className="block text-[10px] text-stone-500 uppercase font-bold mb-1">Test Another Role:</label>
            <select 
              value={userRole} 
              onChange={(e) => setUserRole(e.target.value as Role)}
              className="bg-transparent text-xs text-stone-200 focus:outline-none w-full cursor-pointer"
            >
              <option value="Admin">1. Admin Panel</option>
              <option value="Moderator">2. Data Entry / Mod</option>
              <option value="Editorial">3. Editorial Panel</option>
              <option value="Executive">4. Executive Panel</option>
            </select>
          </div>

          <nav className="space-y-2 text-sm text-stone-400">
            <div className="px-3 py-2 bg-stone-800 text-stone-200 rounded-lg font-medium">❖ Overview</div>
            <div className="px-3 py-2 hover:bg-stone-800/40 hover:text-stone-300 rounded-lg cursor-pointer transition-colors">📋 Notices</div>
            <div className="px-3 py-2 hover:bg-stone-800/40 hover:text-stone-300 rounded-lg cursor-pointer transition-colors">⚙️ Settings</div>
          </nav>
        </div>

        <div>
          <div className="border-t border-stone-800 pt-4 mb-4">
            <p className="text-xs font-semibold text-stone-300">{userName}</p>
            <p className="text-[10px] text-rose-400/80 uppercase tracking-wider">{userRole}</p>
          </div>
          <Link href="https://wlc.pro.bd" className="text-xs text-stone-500 hover:text-stone-400 transition-colors">
            ← Logout / Exit
          </Link>
        </div>
      </aside>

      {/* মেইন কনটেন্ট এরিয়া */}
      <main className="flex-1 p-6 md:p-10 overflow-y-auto">
        <header className="flex justify-between items-center mb-8 pb-4 border-b border-stone-900">
          <div>
            <h1 className="text-xl md:text-2xl font-bold tracking-tight">স্বাগতম, {userName}!</h1>
            <p className="text-xs text-stone-400 mt-1">প্যানেল রোল: <span className="text-rose-400 font-semibold">{userRole}</span></p>
          </div>
          <div className="text-right text-xs text-stone-500 hidden sm:block">
            Willes Literary Club Dashboard v2.0
          </div>
        </header>

        {/* 🛠️ রোল অনুযায়ী ডাইনামিক ভিউ লোড করা হচ্ছে */}
        <div className="animate-fade-in">
          {userRole === "Admin" && <AdminView />}
          {userRole === "Moderator" && <ModeratorView />}
          {userRole === "Editorial" && <EditorialView />}
          {userRole === "Executive" && <ExecutiveView />}
        </div>
      </main>

    </div>
  );
}
