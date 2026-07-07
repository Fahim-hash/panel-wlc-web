'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { db } from '@/lib/firebase';
import { collection, query, where, getDocs } from 'firebase/firestore';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(''); // এরর মেসেজ দেখানোর জন্য স্টেট
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      // 🔑 Firestore-এ ইমেইল, পাসওয়ার্ড এবং 'approved' স্ট্যাটাস চেক করার কুয়েরি
      const q = query(
        collection(db, "panel_requests"),
        where("email", "==", email.trim()),
        where("password", "==", password.trim()),
        where("status", "==", "approved")
      );

      const querySnapshot = await getDocs(q);

      if (!querySnapshot.empty) {
        // মেম্বার ম্যাচ করেছে
        const memberDoc = querySnapshot.docs[0].data();
        
        // সেশনে ডেটা ধরে রাখার জন্য লোকালস্টোরেজে ডাটা সেভ করা
        localStorage.setItem("userRole", memberDoc.position); 
        localStorage.setItem("userName", memberDoc.name);
        localStorage.setItem("userEmail", memberDoc.email);

        // সফল লগইন হলে ড্যাশবোর্ডে রিডাইরেক্ট
        router.push("/dashboard");
      } else {
        // ডেটা না মিললে বা রিকোয়েস্ট পেন্ডিং থাকলে
        setError("ভুল ইমেইল/পাসওয়ার্ড অথবা অ্যাকাউন্টটি এখনও অ্যাপ্রুভ করা হয়নি ভাই!");
      }
    } catch (err) {
      console.error("Login Error:", err);
      setError("লগইন করার সময় সিস্টেমে কোনো সমস্যা হয়েছে। আবার চেষ্টা করুন।");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-stone-900 flex flex-col justify-center items-center p-4 relative overflow-hidden selection:bg-rose-500 selection:text-white">

      {/* 🌌 Background Decorative Radial Glows (Testing Setup UI) */}
      <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] rounded-full bg-rose-900/20 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[500px] h-[500px] rounded-full bg-amber-600/10 blur-[120px] pointer-events-none" />

      {/* 📦 Main Login Card Container */}
      <div className="w-full max-w-md bg-stone-950/40 backdrop-blur-xl border border-stone-800/80 rounded-3xl p-6 md:p-8 shadow-2xl relative z-10 transition-all">

        {/* 🏷️ Header Block: Logo & Subtitle */}
        <div className="flex flex-col items-center text-center mb-6">
          <div className="relative w-14 h-14 mb-3 transition-transform duration-300 hover:scale-105">
            <Image 
              src="/logo.png" 
              alt="WLC Logo" 
              fill 
              className="object-contain drop-shadow-[0_4px_10px_rgba(255,255,255,0.05)]"
            />
          </div>
          <h1 className="text-xl font-bold text-white tracking-tight">
            WLC Internal Panel Portal
          </h1>
          <p className="text-xs text-stone-400 mt-1">
            Club Management System
          </p>
        </div>

        {/* ⚠️ এরর মেসেজ বক্স (ডিজাইনের সাথে ম্যাচ করে সুন্দর বর্ডার ও গ্লো দেওয়া হয়েছে) */}
        {error && (
          <div className="bg-rose-950/30 border border-rose-900/40 text-rose-400 text-xs p-3 rounded-xl mb-5 text-center animate-fade-in font-medium">
            {error}
          </div>
        )}

        {/* 📝 Login Form */}
        <form onSubmit={handleSubmit} className="space-y-5">

          {/* Email Input Field */}
          <div>
            <label className="block text-xs font-semibold text-stone-300 uppercase tracking-wider mb-2">
              Email Address
            </label>
            <input 
              type="email" 
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="admin@wlc.pro.bd"
              className="w-full px-4 py-3 bg-stone-900/60 border border-stone-800 rounded-xl text-sm text-white placeholder-stone-500 focus:outline-none focus:border-rose-700 focus:ring-1 focus:ring-rose-700 transition-all bg-opacity-50"
            />
          </div>

          {/* Password Input Field */}
          <div>
            <div className="flex justify-between items-center mb-2">
              <label className="block text-xs font-semibold text-stone-300 uppercase tracking-wider">
                Password
              </label>
              <Link href="/register" className="text-[11px] text-rose-400 hover:text-rose-300 transition-colors font-medium">
                Apply for Account?
              </Link>
            </div>
            <input 
              type="password" 
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full px-4 py-3 bg-stone-900/60 border border-stone-800 rounded-xl text-sm text-white placeholder-stone-500 focus:outline-none focus:border-rose-700 focus:ring-1 focus:ring-rose-700 transition-all bg-opacity-50"
            />
          </div>

          {/* 🔘 Submit Button */}
          <button 
            type="submit"
            disabled={isLoading}
            className="w-full py-3 bg-gradient-to-r from-rose-700 to-rose-900 hover:from-rose-600 hover:to-rose-800 text-white font-bold text-xs uppercase tracking-widest rounded-xl transition-all shadow-lg shadow-rose-900/20 active:scale-[0.99] disabled:opacity-50 disabled:pointer-events-none flex items-center justify-center gap-2"
          >
            {isLoading ? (
              <>
                <svg className="animate-spin h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                </svg>
                Verifying...
              </>
            ) : (
              'Enter Panel ➔'
            )}
          </button>
        </form>

        {/* 🔒 Footer Security Note */}
        <div className="mt-6 pt-4 border-t border-stone-900 text-center">
          <p className="text-[10px] text-stone-500 font-mono tracking-tight">
            SECURE PROTECTED PORTAL
          </p>
        </div>

      </div>

      {/* Back link to Home */}
      <Link 
        href="https://wlc.pro.bd" 
        className="mt-6 text-xs text-stone-500 hover:text-stone-300 transition-colors relative z-10 flex items-center gap-1"
      >
        ← Back to main site
      </Link>
    </div>
  );
}
