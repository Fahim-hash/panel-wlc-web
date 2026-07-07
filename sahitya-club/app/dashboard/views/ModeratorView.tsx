export default function ModeratorView() {
  return (
    <div className="space-y-6">
      <div className="bg-stone-900 border border-stone-800 rounded-xl p-6">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h2 className="text-sm font-bold uppercase tracking-wider text-stone-300">মেম্বার ডেটা এন্ট্রি ও মডারেশন পোর্টাল</h2>
            <p className="text-xs text-stone-500 mt-1">সাধারণ সদস্য এবং প্রতিযোগীদের ডাটাবেজ আপডেট করুন।</p>
          </div>
          <button className="bg-stone-100 hover:bg-stone-200 text-stone-950 px-3 py-1.5 rounded-lg text-xs font-bold">
            + New Entry
          </button>
        </div>
        
        {/* মডারেশন টেবিল প্লেসহোল্ডার */}
        <div className="border border-stone-800 rounded-xl overflow-hidden text-xs">
          <div className="bg-stone-950 p-3 text-stone-400 font-semibold grid grid-cols-3">
            <span>Name</span>
            <span>Class/Batch</span>
            <span>Actions</span>
          </div>
          <div className="p-3 grid grid-cols-3 border-t border-stone-800 items-center">
            <span>Rahat Ahmed</span>
            <span>Class 10</span>
            <span className="space-x-2">
              <button className="text-amber-500 hover:underline">Edit</button>
              <button className="text-rose-500 hover:underline">Remove</button>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
