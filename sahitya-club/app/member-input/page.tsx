"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

interface UserSession {
  name: string;
  allowedPages?: string[];
}

export default function MemberInputPage() {
  const router = useRouter();
  const [isAdmin, setIsAdmin] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [generatedId, setGeneratedId] = useState("");

  // ফর্ম স্টেটসমূহ
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    classLevel: "Class 10",
    version: "Bangla Version",
    generation: "3",
  });

  // সিকিউরিটি ও পারমিশন চেক
  useEffect(() => {
    const sessionData = localStorage.getItem("userSession");
    if (!sessionData) {
      router.push("/");
      return;
    }
    const user: UserSession = JSON.parse(sessionData);
    if (!user.allowedPages?.includes("member-input")) {
      alert("আপনার এই পেজে অ্যাক্সেস করার পারমিশন নেই ভাই!");
      router.push("/dashboard");
    } else {
      setIsAdmin(true);
    }
  }, [router]);

  // 🎯 সিরিয়াল অনুযায়ী ইউনিক আইডি জেনারেটর (SheetDB থেকে লেটেস্ট ডাটা চেক করবে)
  const getNextSerialClubId = async (selectedGen: string) => {
    try {
      // গুগল শিট থেকে শেষ ১০টি ডাটা রিড করার ট্রাই করছি (আইডি খোঁজার জন্য)
      const res = await fetch("https://sheetdb.io/api/v1/g5ekqy0wxn9lp?limit=10&sort_by=clubId&sort_order=desc");
      if (res.ok) {
        const data = await res.json();
        
        if (data && data.length > 0 && data[0].clubId) {
          // শেষ যে আইডিটা আছে (যেমন: WL3005) সেটা থেকে শুধু লাস্টের ৩ ডিজিট নাম্বারটা নিব
          const lastIdStr = data[0].clubId; // "WL3005"
          const lastNumberStr = lastIdStr.replace(`WL${selectedGen}`, ""); // "005"
          const lastNumber = parseInt(lastNumberStr, 10);

          if (!isNaN(lastNumber)) {
            const nextNumber = (lastNumber + 1).toString().padStart(3, "0"); // "006"
            return `WL${selectedGen}${nextNumber}`;
          }
        }
      }
    } catch (err) {
      console.error("Error fetching sequence, falling back to 001:", err);
    }
    
    // যদি শিট একদম খালি থাকে বা কোনো আইডি না পায়, তাহলে সিরিয়াল শুরু হবে 001 থেকে
    return `WL${selectedGen}001`;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setSuccessMessage("");
    setGeneratedId("");

    try {
      // ১. লাইভ গুগল শিট থেকে চেক করে একদম ফ্রেশ নেক্সট সিরিয়াল আইডি নিয়ে আসা
      const clubId = await getNextSerialClubId(formData.generation);

      // ২. গুগল শিটের কলামের নাম অনুযায়ী অবজেক্ট তৈরি
      const dataToSend = {
        name: formData.name,
        phone: formData.phone,
        email: formData.email,
        class: formData.classLevel,
        version: formData.version,
        clubId: clubId,
        timestamp: new Date().toLocaleString("en-US", { timeZone: "Asia/Dhaka" }),
      };

      // ৩. SheetDB-তে ডাটা পুশ
      const response = await fetch("https://sheetdb.io/api/v1/g5ekqy0wxn9lp", {
        method: "POST",
        headers: { 
          "Content-Type": "application/json" 
        },
        body: JSON.stringify({ data: dataToSend }),
      });

      if (!response.ok) {
        throw new Error("Failed to save data to SheetDB");
      }

      console.log("Data pushed with Serial ID:", clubId);

      setGeneratedId(clubId);
      setSuccessMessage(`মেম্বার ডাটা সফলভাবে সিরিয়াল অনুযায়ী সেভ করা হয়েছে ভাই!`);

      // ফর্ম রিলিজ (নাম, ফোন, ইমেইল ক্লিয়ার হবে)
      setFormData({ ...formData, name: "", phone: "", email: "" });

    } catch (error) {
      console.error("Submission error:", error);
      alert("ডাটা সেভ করতে বা সিরিয়াল আইডি জেনারেট করতে সমস্যা হয়েছে ভাই।");
    } finally {
      setIsLoading(false);
    }
  };

  if (!isAdmin) return <div className="min-h-screen bg-stone-950 flex items-center justify-center text-xs text-stone-500 font-mono">Verifying Access Auth...</div>;

  return (
    <div className="min-h-screen bg-stone-950 text-stone-100 p-6 md:p-12 selection:bg-rose-500 selection:text-white">

      {/* নেভিগেশন হেডার */}
      <div className="max-w-xl mx-auto flex justify-between items-center mb-10 border-b border-stone-900 pb-5">
        <Link href="/dashboard" className="text-xs text-stone-400 hover:text-white transition-colors flex items-center gap-1.5">
          ← ড্যাশবোর্ডে ফিরুন
        </Link>
        <span className="text-[10px] font-mono uppercase bg-stone-900 px-3 py-1 text-stone-400 border border-stone-800 rounded-full">
          Operations Portal
        </span>
      </div>

      <div className="max-w-xl mx-auto">
        <div className="mb-6">
          <h1 className="text-lg font-bold tracking-tight text-white">ম্যানুয়াল মেম্বার ডাটা এন্ট্রি</h1>
          <p className="text-xs text-stone-500 mt-1">নতুন মেম্বার যুক্ত করুন। আইডি ফরম্যাট অটোমেটিক সিরিয়াল হবে: <span className="font-mono text-stone-300">WL[Gen][Serial]</span> (যেমন: WL3001, WL3002)</p>
        </div>

        {/* সাকসেস নোটিফিকেশন */}
        {successMessage && (
          <div className="mb-6 p-4 bg-gradient-to-br from-stone-900 to-emerald-950/20 border border-emerald-900/40 rounded-xl">
            <p className="text-xs text-emerald-400 font-medium">{successMessage}</p>
            {generatedId && (
              <div className="mt-3 pt-3 border-t border-stone-800 flex justify-between items-center">
                <span className="text-[10px] uppercase text-stone-500 font-mono">Generated Serial ID:</span>
                <span className="text-xs font-mono font-bold text-emerald-400 bg-stone-950 px-3 py-1 border border-emerald-900/30 rounded-md tracking-wider">
                  {generatedId}
                </span>
              </div>
            )}
          </div>
        )}

        {/* এন্ট্রি ফর্ম */}
        <form onSubmit={handleSubmit} className="space-y-5 bg-stone-900/40 border border-stone-900 p-6 rounded-2xl">

          <div>
            <label className="block text-xs font-semibold text-stone-400 mb-2 uppercase tracking-wide">Full Name</label>
            <input
              type="text"
              required
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              placeholder="মেম্বারের পুরো নাম"
              className="w-full px-4 py-3 bg-stone-950 border border-stone-800 rounded-xl text-xs text-white focus:outline-none focus:border-rose-900 transition-all placeholder:text-stone-700"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-stone-400 mb-2 uppercase tracking-wide">WhatsApp Number</label>
            <input
              type="tel"
              required
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              placeholder="01XXXXXXXXX"
              className="w-full px-4 py-3 bg-stone-950 border border-stone-800 rounded-xl text-xs text-white font-mono focus:outline-none focus:border-rose-900 transition-all placeholder:text-stone-700"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-stone-400 mb-2 uppercase tracking-wide">Email Address</label>
            <input
              type="email"
              required
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              placeholder="member@wlc.pro.bd"
              className="w-full px-4 py-3 bg-stone-950 border border-stone-800 rounded-xl text-xs text-white focus:outline-none focus:border-rose-900 transition-all placeholder:text-stone-700"
            />
          </div>

          {/* স্কুল ও কলেজ ক্লাস সিলেক্টর */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-stone-400 mb-2 uppercase tracking-wide">Class / Academic Year</label>
              <select
                value={formData.classLevel}
                onChange={(e) => setFormData({ ...formData, classLevel: e.target.value })}
                className="w-full px-4 py-3 bg-stone-950 border border-stone-800 rounded-xl text-xs text-white focus:outline-none focus:border-rose-900 transition-all"
              >
                <option value="Class 5">Class 5</option>
                <option value="Class 6">Class 6</option>
                <option value="Class 7">Class 7</option>
                <option value="Class 8">Class 8</option>
                <option value="Class 9">Class 9</option>
                <option value="Class 10">Class 10</option>
                <option value="College 1st Year">College 1st Year</option>
                <option value="College 2nd Year">College 2nd Year</option>
              </select>
            </div>

            {/* ভার্সন সিলেক্টর */}
            <div>
              <label className="block text-xs font-semibold text-stone-400 mb-2 uppercase tracking-wide">Version / Medium</label>
              <select
                value={formData.version}
                onChange={(e) => setFormData({ ...formData, version: e.target.value })}
                className="w-full px-4 py-3 bg-stone-950 border border-stone-800 rounded-xl text-xs text-white focus:outline-none focus:border-rose-900 transition-all"
              >
                <option value="Bangla Version">Bangla Version</option>
                <option value="English Version">English Version</option>
                <option value="English Medium">English Medium</option>
              </select>
            </div>
          </div>

          {/* জেনারেশন কন্ট্রোল */}
          <div>
            <label className="block text-xs font-semibold text-stone-400 mb-2 uppercase tracking-wide">Club Generation (Prefix Controls)</label>
            <select
              value={formData.generation}
              onChange={(e) => setFormData({ ...formData, generation: e.target.value })}
              className="w-full px-4 py-3 bg-stone-950 border border-stone-800 rounded-xl text-xs text-white focus:outline-none focus:border-rose-900 transition-all"
            >
              <option value="3">Generation 3 (WL3xxx)</option>
            </select>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-3 mt-2 bg-stone-100 hover:bg-white text-stone-950 font-bold text-xs uppercase tracking-widest rounded-xl transition-all disabled:opacity-40 flex items-center justify-center gap-2 shadow-lg shadow-black/40"
          >
            {isLoading ? "Checking Serial & Pushing..." : "Generate Next Serial ID & Push ➔"}
          </button>

        </form>
      </div>
    </div>
  );
}
