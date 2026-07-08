"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

interface Member {
  name: string;
  phone: string;
  email: string;
  class: string;
  version: string;
  clubId: string;
  timestamp: string;
}

interface UserSession {
  name: string;
  allowedPages?: string[];
}

export default function MemberListPage() {
  const router = useRouter();
  const [isAdmin, setIsAdmin] = useState(false);
  const [members, setMembers] = useState<Member[]>([]);
  const [filteredMembers, setFilteredMembers] = useState<Member[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // সার্চ ও ফিল্টার স্টেটসমূহ
  const [searchTerm, setSearchTerm] = useState("");
  const [classFilter, setClassFilter] = useState("All");
  const [versionFilter, setVersionFilter] = useState("All");

  // সিকিউরিটি ও পারমিশন চেক
  useEffect(() => {
    const sessionData = localStorage.getItem("userSession");
    if (!sessionData) {
      router.push("/");
      return;
    }
    const user: UserSession = JSON.parse(sessionData);
    if (!user.allowedPages?.includes("member-list")) {
      alert("আপনার এই পেজে অ্যাক্সেস করার পারমিশন নেই ভাই!");
      router.push("/dashboard");
    } else {
      setIsAdmin(true);
      fetchMembers();
    }
  }, [router]);

  // 🚀 আপনার SheetDB API থেকে রিয়েল-টাইম ডাটা ফেচ করা
  const fetchMembers = async () => {
    try {
      setIsLoading(true);
      const res = await fetch("https://sheetdb.io/api/v1/g5ekqy0wxn9lp");
      if (res.ok) {
        const data = await res.json();
        // নতুন এন্ট্রিগুলোকে তালিকার সবার উপরে দেখানোর জন্য রিভার্স করা হলো
        const sortedData = data.reverse(); 
        setMembers(sortedData);
        setFilteredMembers(sortedData);
      } else {
        throw new Error("Failed to fetch data");
      }
    } catch (error) {
      console.error("Error fetching members:", error);
      alert("গুগল শিট থেকে ডাটা লোড করতে সমস্যা হয়েছে ভাই।");
    } finally {
      setIsLoading(false);
    }
  };

  // 🔍 সার্চ এবং ফিল্টারিং লজিক
  useEffect(() => {
    let result = members;

    // ১. নাম, ফোন বা ক্লাব আইডি দিয়ে সার্চ
    if (searchTerm.trim() !== "") {
      const lowerSearch = searchTerm.toLowerCase();
      result = result.filter(
        (m) =>
          m.name?.toLowerCase().includes(lowerSearch) ||
          m.phone?.includes(lowerSearch) ||
          m.clubId?.toLowerCase().includes(lowerSearch)
      );
    }

    // ২. ক্লাস ফিল্টার
    if (classFilter !== "All") {
      result = result.filter((m) => m.class === classFilter);
    }

    // ৩. ভার্সন ফিল্টার
    if (versionFilter !== "All") {
      result = result.filter((m) => m.version === versionFilter);
    }

    setFilteredMembers(result);
  }, [searchTerm, classFilter, versionFilter, members]);

  if (!isAdmin) return <div className="min-h-screen bg-stone-950 flex items-center justify-center text-xs text-stone-500 font-mono">Verifying Access Auth...</div>;

  return (
    <div className="min-h-screen bg-stone-950 text-stone-100 p-6 md:p-12 selection:bg-rose-500 selection:text-white">
      
      {/* নেভিগেশন হেডার */}
      <div className="max-w-6xl mx-auto flex justify-between items-center mb-10 border-b border-stone-900 pb-5">
        <Link href="/dashboard" className="text-xs text-stone-400 hover:text-white transition-colors flex items-center gap-1.5">
          ← ড্যাশবোর্ডে ফিরুন
        </Link>
        <div className="flex items-center gap-3">
          <button 
            onClick={fetchMembers} 
            className="text-xs font-mono bg-stone-900 border border-stone-800 hover:border-stone-700 px-3 py-1.5 rounded-lg text-stone-300 transition-all"
          >
            🔄 Refresh
          </button>
          <Link href="/member-input" className="text-xs bg-stone-100 hover:bg-white text-stone-950 font-bold px-3 py-1.5 rounded-lg transition-all">
            + Add Member
          </Link>
        </div>
      </div>

      <div className="max-w-6xl mx-auto">
        <div className="mb-8">
          <h1 className="text-xl font-bold tracking-tight text-white">মেম্বার ডাটাবেজ প্যানেল</h1>
          <p className="text-xs text-stone-500 mt-1">
            মোট রেজিস্টার্ড মেম্বার: <span className="font-mono text-emerald-400 font-bold">{filteredMembers.length}</span> জন
          </p>
        </div>

        {/* 🛠️ সার্চ এবং ফিল্টার এরিয়া */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <div className="md:col-span-2">
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="নাম, ফোন নম্বর বা ক্লাব আইডি দিয়ে খুঁজুন..."
              className="w-full px-4 py-2.5 bg-stone-900 border border-stone-800 rounded-xl text-xs text-white focus:outline-none focus:border-stone-700 transition-all placeholder:text-stone-600"
            />
          </div>

          <div>
            <select
              value={classFilter}
              onChange={(e) => setClassFilter(e.target.value)}
              className="w-full px-4 py-2.5 bg-stone-900 border border-stone-800 rounded-xl text-xs text-white focus:outline-none focus:border-stone-700 transition-all"
            >
              <option value="All">All Classes</option>
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

          <div>
            <select
              value={versionFilter}
              onChange={(e) => setVersionFilter(e.target.value)}
              className="w-full px-4 py-2.5 bg-stone-900 border border-stone-800 rounded-xl text-xs text-white focus:outline-none focus:border-stone-700 transition-all"
            >
              <option value="All">All Versions</option>
              <option value="Bangla Version">Bangla Version</option>
              <option value="English Version">English Version</option>
              <option value="English Medium">English Medium</option>
            </select>
          </div>
        </div>

        {/* 📊 ডাটা টেবিল */}
        {isLoading ? (
          <div className="py-20 text-center text-xs font-mono text-stone-500 animate-pulse">
            Loading Live Database Records...
          </div>
        ) : filteredMembers.length === 0 ? (
          <div className="py-20 text-center text-xs text-stone-600 border border-dashed border-stone-900 rounded-2xl bg-stone-900/10">
            কোনো মেম্বার ডাটা খুঁজে পাওয়া যায়নি ভাই।
          </div>
        ) : (
          <div className="overflow-x-auto border border-stone-900 rounded-2xl bg-stone-900/20 backdrop-blur-sm">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-stone-900 bg-stone-900/60 text-stone-400 text-[10px] uppercase font-mono tracking-wider">
                  <th className="py-3.5 px-4 font-semibold">Club ID</th>
                  <th className="py-3.5 px-4 font-semibold">Name</th>
                  <th className="py-3.5 px-4 font-semibold">WhatsApp</th>
                  <th className="py-3.5 px-4 font-semibold">Email</th>
                  <th className="py-3.5 px-4 font-semibold">Class</th>
                  <th className="py-3.5 px-4 font-semibold">Version</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-900 text-xs">
                {filteredMembers.map((member, index) => (
                  <tr key={index} className="hover:bg-stone-900/40 transition-colors group">
                    <td className="py-3.5 px-4 font-mono font-bold text-emerald-400 group-hover:text-emerald-300">
                      {member.clubId || "N/A"}
                    </td>
                    <td className="py-3.5 px-4 font-medium text-stone-200">
                      {member.name}
                    </td>
                    <td className="py-3.5 px-4 font-mono text-stone-400">
                      {member.phone}
                    </td>
                    <td className="py-3.5 px-4 text-stone-400 truncate max-w-[160px]">
                      {member.email}
                    </td>
                    <td className="py-3.5 px-4">
                      <span className="bg-stone-900 px-2 py-0.5 border border-stone-800 rounded text-[11px] text-stone-300">
                        {member.class}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 text-stone-400 text-[11px]">
                      {member.version}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
