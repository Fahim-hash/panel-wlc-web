// app/login/page.tsx
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
  const [error, setError] = useState(''); 
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    const cleanEmail = email.toLowerCase().trim();
    const cleanPassword = password.trim();

    console.log("🔍 Attempting login for:", cleanEmail);

    try {
      // 🔑 Firestore থেকে ইউজার খোঁজা
      const q = query(
        collection(db, "panel_requests"),
        where("email", "==", cleanEmail),
        where("password", "==", cleanPassword),
        where("status", "==", "approved")
      );

      const querySnapshot = await getDocs(q);

      if (!querySnapshot.empty) {
        console.log("✅ User found in Firestore!");
        const memberDoc = querySnapshot.docs[0].data();

        // 💾 সেশন ডাটা স্টোর
        localStorage.setItem("userRole", memberDoc.position || ""); 
        localStorage.setItem("userName", memberDoc.name || "");
        localStorage.setItem("userEmail", memberDoc.email || "");
        
        const pagesArray = memberDoc.allowedPages || [];
        localStorage.setItem("allowedPages", JSON.stringify(pagesArray));

        // 🔥 ট্রিক: router.push এর বদলে হার্ড রিডাইরেক্ট করছি যাতে মিডলওয়্যার সাথে সাথে সেশন পায়
        window.location.href = "/dashboard";
      } else {
        console.warn("❌ No matching approved user found.");
        setError("ভুল ইমেইল/পাসওয়ার্ড অথবা অ্যাকাউন্টটি এখনও অ্যাপ্রুভ করা হয়নি ভাই!");
      }
    } catch (err: any) {
      console.error("🚨 Login Detailed Error:", err);
      setError(`সিস্টেম এরর: ${err.message || "আবার চেষ্টা করুন ভাই।"}`);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-stone-900 flex flex-col justify-center items-center p-4 relative overflow-hidden selection:bg-rose-500 selection:text-white">
      <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] rounded-full bg-rose-900/20 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[500px] h-[500px] rounded-full bg-amber-600/10 blur-[120px] pointer-events-none" />

      <div className="w-full max-w-md bg-stone-950/40 backdrop-blur-xl border border-stone-800/80 rounded-3xl p-6 md:p-8 shadow-2xl relative z-10">
        <div className="flex flex-col items-center text-center mb-6">
          <div className="relative w-14 h-14 mb-3">
            <Image src="/logo.png" alt="WLC Logo" fill className="object-contain" />
          </div>
          <h1 className="text-xl font-bold text-white tracking-tight">WLC Internal Panel Portal</h1>
          <p className="text-xs text-stone-400 mt-1">Club Management System</p>
        </div>

        {error && (
          <div className="bg-rose-950/30 border border-rose-900/40 text-rose-400 text-xs p-3 rounded-xl mb-5 text-center font-medium">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-xs font-semibold text-stone-300 uppercase tracking-wider mb-2">Email Address</label>
            <input 
              type="email" 
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="admin@wlc.pro.bd"
              className="w-full px-4 py-3 bg-stone-900/60 border border-stone-800 rounded-xl text-sm text-white placeholder-stone-500 focus:outline-none focus:border-rose-700 focus:ring-1 focus:ring-rose-700 transition-all"
            />
          </div>

          <div>
            <div className="flex justify-between items-center mb-2">
              <label className="block text-xs font-semibold text-stone-300 uppercase tracking-wider">Password</label>
              <Link href="/register" className="text-[11px] text-rose-400 hover:text-rose-300 transition-colors font-medium">Apply for Account?</Link>
            </div>
            <input 
              type="password" 
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full px-4 py-3 bg-stone-900/60 border border-stone-800 rounded-xl text-sm text-white placeholder-stone-500 focus:outline-none focus:border-rose-700 focus:ring-1 focus:ring-rose-700 transition-all"
            />
          </div>

          <button 
            type="submit"
            disabled={isLoading}
            className="w-full py-3 bg-gradient-to-r from-rose-700 to-rose-900 hover:from-rose-600 hover:to-rose-800 text-white font-bold text-xs uppercase tracking-widest rounded-xl transition-all disabled:opacity-50 flex items-center justify-center gap-2"
          >
            {isLoading ? "Verifying..." : "Enter Panel ➔"}
          </button>
        </form>

        <div className="mt-6 pt-4 border-t border-stone-900 text-center">
          <p className="text-[10px] text-stone-500 font-mono tracking-tight">SECURE PROTECTED PORTAL</p>
        </div>
      </div>

      <Link href="https://wlc.pro.bd" className="mt-6 text-xs text-stone-500 hover:text-stone-300 transition-colors relative z-10">
        ← Back to main site
      </Link>
    </div>
  );
}
