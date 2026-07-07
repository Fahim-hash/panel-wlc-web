export default function EditorialView() {
  return (
    <div className="space-y-6">
      <div className="bg-stone-900 border border-stone-800 rounded-xl p-6">
        <h2 className="text-sm font-bold uppercase tracking-wider text-stone-300 mb-2">সাহিত্য ক্লাবের ব্লগ ও প্রকাশনা পোর্টাল</h2>
        <p className="text-xs text-stone-500 mb-6">নতুন কবিতা, গল্প, ম্যাগাজিন আর্টিকেল বা নোটিশ রাইটিং প্যানেল।</p>

        <div className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-stone-400 mb-2">Article / Poem Title</label>
            <input type="text" className="w-full bg-stone-950 border border-stone-800 rounded-xl px-4 py-2.5 text-xs text-stone-100 focus:outline-none" placeholder="লেখার শিরোনাম লিখুন..." />
          </div>
          <div>
            <label className="block text-xs font-semibold text-stone-400 mb-2">Content Body</label>
            <textarea rows={5} className="w-full bg-stone-950 border border-stone-800 rounded-xl px-4 py-2.5 text-xs text-stone-100 focus:outline-none" placeholder="মূল সাহিত্যকর্মটি এখানে লিখুন বা পেস্ট করুন..."></textarea>
          </div>
          <button className="bg-rose-900/40 hover:bg-rose-900/60 border border-rose-800/80 px-4 py-2 rounded-xl text-xs font-medium transition-colors">
            Publish Content
          </button>
        </div>
      </div>
    </div>
  );
}
