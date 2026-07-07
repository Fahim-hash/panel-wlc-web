// app/dashboard/views/AdminView.tsx
"use client";

import React, { useEffect, useState } from "react";
import { db } from "@/lib/firebase";
import { collection, onSnapshot, doc, updateDoc, deleteDoc, query, where } from "firebase/firestore";

interface PanelRequest {
  id: string;
  name: string;
  position: string;
  email: string;
  number: string;
  whatsapp: string;
  batch: string;
  profilePicUrl?: string;
  status: string;
}

export default function AdminView() {
  const [requests, setRequests] = useState<PanelRequest[]>([]);
  const [loading, setLoading] = useState(true);
  const [totalMembers, setTotalMembers] = useState(0);

  useEffect(() => {
    // ১. শুধুমাত্র 'pending' রিকোয়েস্টগুলো লাইভ নিয়ে আসার কুয়েরি
    const q = query(collection(db, "panel_requests"), where("status", "==", "pending"));
    
    const unsubscribePending = onSnapshot(q, (snapshot) => {
      const pendingData: PanelRequest[] = [];
      snapshot.forEach((doc) => {
        pendingData.push({ id: doc.id, ...doc.data() } as PanelRequest);
      });
      setRequests(pendingData);
      setLoading(false);
    }, (error) => {
      console.error("Error fetching requests: ", error);
      setLoading(false);
    });

    // ২. টোটাল কতজন অ্যাপ্রুভড মেম্বার আছে তার কাউন্ট ট্র্যাকিং
    const qApproved = query(collection(db, "panel_requests"), where("status", "==", "approved"));
    const unsubscribeApproved = onSnapshot(qApproved, (snapshot) => {
      setTotalMembers(snapshot.size);
    });

    return () => {
      unsubscribePending();
      unsubscribeApproved();
    };
  }, []);

  // ৩. রিকোয়েস্ট অ্যাপ্রুভ করার ফাংশন (status -> approved)
  const handleApprove = async (id: string) => {
    try {
      const docRef = doc(db, "panel_requests", id);
      await updateDoc(docRef, {
        status: "approved",
        approvedAt: new Date().toISOString()
      });
    } catch (error) {
      console.error("Error approving request: ", error);
      alert("অ্যাপ্রুভ করতে সমস্যা হয়েছে!");
    }
  };

  // ৪. রিকোয়েস্ট রিজেক্ট/ডিলিট করার ফাংশন
  const handleReject = async (id: string) => {
    if (confirm("আপনি কি নিশ্চিত যে এই রিকোয়েস্টটি ডিলিট করতে চান?")) {
      try {
        const docRef = doc(db, "panel_requests", id);
        await deleteDoc(docRef);
      } catch (error) {
        console.error("Error rejecting request: ", error);
        alert("রিজেক্ট করতে সমস্যা হয়েছে!");
      }
    }
  };

  return (
    <div className="space-y-6">
      {/* স্ট্যাটাস কার্ডসমূহ */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-stone-900 border border-stone-800 p-5 rounded-xl">
          <h3 className="text-xs font-semibold text-stone-400 uppercase tracking-wider">Pending Approvals</h3>
          <p className="text-2xl font-bold mt-2 text-rose-500">{requests.length} জন</p>
        </div>
        <div className="bg-stone-900 border border-stone-800 p-5 rounded-xl">
          <h3 className="text-xs font-semibold text-stone-400 uppercase tracking-wider">Total Approved Members</h3>
          <p className="text-2xl font-bold mt-2 text-stone-100">{totalMembers} জন</p>
        </div>
        <div className="bg-stone-900 border border-stone-800 p-5 rounded-xl flex items-center shadow-inner">
          <div>
            <h3 className="text-xs font-semibold text-stone-400 uppercase tracking-wider">System Logs</h3>
            <p className="text-xs text-emerald-400 mt-2 flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              Firestore Connected
            </p>
          </div>
        </div>
      </div>

      {/* রিকোয়েস্ট লিস্ট কন্টেইনার */}
      <div className="bg-stone-900 border border-stone-800 rounded-xl p-6">
        <h2 className="text-sm font-bold uppercase tracking-wider text-stone-300 mb-4">
          পেন্ডিং প্যানেল রিকোয়েস্ট ({requests.length})
        </h2>

        {loading ? (
          <div className="text-xs text-stone-500 py-12 text-center">লোডিং হচ্ছে...</div>
        ) : requests.length === 0 ? (
          <div className="text-xs text-stone-500 py-12 text-center border border-dashed border-stone-800 rounded-xl">
            বর্তমানে কোনো পেন্ডিং রিকোয়েস্ট নেই ভাই!
          </div>
        ) : (
          <div className="space-y-4">
            {requests.map((request) => (
              <div 
                key={request.id} 
                className="flex flex-col sm:flex-row sm:items-center justify-between p-4 bg-stone-950 rounded-xl border border-stone-800/60 gap-4"
              >
                {/* মেম্বার প্রোফাইল ও ইনফো */}
                <div className="flex items-center gap-4">
                  {request.profilePicUrl ? (
                    <img 
                      src={request.profilePicUrl} 
                      alt={request.name} 
                      className="w-12 h-12 rounded-full object-cover border border-stone-800"
                    />
                  ) : (
                    <div className="w-12 h-12 rounded-full bg-stone-800 flex items-center justify-center text-stone-400 font-bold text-sm">
                      {request.name.charAt(0)}
                    </div>
                  )}
                  <div>
                    <h4 className="text-sm font-bold text-stone-100">{request.name}</h4>
                    <p className="text-xs text-stone-400">
                      <span className="text-rose-400 font-medium">{request.position}</span> • {request.batch}
                    </p>
                    <div className="text-[11px] text-stone-500 mt-0.5 space-x-2">
                      <span>✉ {request.email}</span>
                      <span>📞 {request.number}</span>
                    </div>
                  </div>
                </div>

                {/* অ্যাকশন বাটনসমূহ */}
                <div className="flex items-center gap-2 self-end sm:self-center">
                  <button
                    onClick={() => handleReject(request.id)}
                    className="px-3 py-1.5 rounded-lg text-xs font-semibold border border-stone-800 text-stone-400 hover:bg-rose-950/30 hover:text-rose-400 hover:border-rose-900/40 transition-all"
                  >
                    Reject
                  </button>
                  <button
                    onClick={() => handleApprove(request.id)}
                    className="px-3 py-1.5 bg-stone-100 hover:bg-stone-200 text-stone-950 rounded-lg text-xs font-bold transition-all shadow-md"
                  >
                    Approve ✓
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
