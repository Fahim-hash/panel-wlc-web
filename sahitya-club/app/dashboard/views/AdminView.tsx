export default function AdminView() {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-stone-900 border border-stone-800 p-5 rounded-xl">
          <h3 className="text-xs font-semibold text-stone-400 uppercase tracking-wider">Pending Approvals</h3>
          <p className="text-2xl font-bold mt-2 text-rose-500">১২ জন</p>
        </div>
        <div className="bg-stone-900 border border-stone-800 p-5 rounded-xl">
          <h3 className="text-xs font-semibold text-stone-400 uppercase tracking-wider">Total Panel Members</h3>
          <p className="text-2xl font-bold mt-2">৪৫ জন</p>
        </div>
        <div className="bg-stone-900 border border-stone-800 p-5 rounded-xl">
          <h3 className="text-xs font-semibold text-stone-400 uppercase tracking-wider">System Logs</h3>
          <p className="text-xs text-stone-400 mt-3 text-emerald-400">● Database Online</p>
        </div>
      </div>

      <div className="bg-stone-900 border border-stone-800 rounded-xl p-6">
        <h2 className="text-sm font-bold uppercase tracking-wider text-stone-300 mb-4">পেন্ডিং প্যানেল রিকোয়েস্ট (Admin Action Required)</h2>
        <div className="text-xs text-stone-400 py-8 text-center border border-dashed border-stone-800 rounded-xl">
          ফায়ারবেস থেকে `panel_requests` কালেকশন এখানে লোড হবে এবং Approve/Reject বাটন থাকবে।
        </div>
      </div>
    </div>
  );
}
