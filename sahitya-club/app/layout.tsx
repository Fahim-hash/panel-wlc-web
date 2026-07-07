// app/layout.tsx
import type { Metadata } from "next";
import { Hind_Siliguri } from "next/font/google"; 
import "./globals.css";

const hindSiliguri = Hind_Siliguri({
  subsets: ["bengali", "latin"],
  weight: ["300", "400", "500", "600", "700"],
});

// 🔒 Internal Panel Metadata & Security Setup
export const metadata: Metadata = {
  title: "উইল্‌স সাহিত্য ক্লাব - প্যানেল ড্যাশবোর্ড",
  description: "উইল্‌স লিটল ফ্লাওয়ার স্কুল অ্যান্ড কলেজের অফিশিয়াল সাহিত্য ক্লাব ইন্টারনাল প্যানেল।",
  // 🚫 সার্চ ইঞ্জিন ক্রলিং এবং ইনডেক্সিং ব্লক করার জন্য:
  robots: {
    index: false,
    follow: false,
  },
  icons: {
    icon: "/logo.png", 
    shortcut: "/logo.png",
    apple: "/logo.png",
  },
};

export default function RootLayout({
  children,
  popup, // 👈 প্যারালাল রুট স্লট প্রপ্স
}: {
  children: React.ReactNode;
  popup: React.ReactNode; 
}) {
  return (
    <html lang="bn" className="h-full">
      <body className={`${hindSiliguri.className} bg-stone-50 text-stone-900 min-h-screen flex flex-col selection:bg-rose-100 selection:text-rose-900 antialiased overflow-x-hidden`}>

        {/* ================= MAIN CONTENT AREA ================= */}
        <main className="flex-grow w-full block relative z-10">
          {children}
        </main>

        {/* 👈 পপ-আপ স্লট রেন্ডার */}
        {popup} 

      </body>
    </html>
  );
}
