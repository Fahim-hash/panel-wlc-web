export default function ExecutiveView() {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="bg-stone-900 border border-stone-800 p-6 rounded-xl">
          <h2 className="text-sm font-bold uppercase tracking-wider text-stone-300 mb-2">📅 আপকামিং ইভেন্টস</h2>
          <ul className="text-xs text-stone-400 space-y-2 mt-4">
            <li className="p-2 bg-stone-950 rounded-lg border border-stone-800/50">● বার্ষিক সাহিত্য উৎসব ২০২৬ - প্রিপারেশন মিটিং</li>
            <li className="p-2 bg-stone-950 rounded-lg border border-stone-800/50">● দেয়াল পত্রিকা প্রকাশনী - বাজেট ও প্ল্যানিং</li>
          </ul>
        </div>

        <div className="bg-stone-900 border border-stone-800 p-6 rounded-xl">
          <h2 className="text-sm font-bold uppercase tracking-wider text-stone-300 mb-2">📢 এক্সিকিউটিভ ইন্টারনাল নোটিশ</h2>
          <p className="text-xs text-stone-400 mt-4 leading-relaxed">
            সব এক্সিকিউটিভ মেম্বারদের আগামী সপ্তাহের মধ্যে নিজ নিজ ডিপার্টমেন্টের রিপোর্ট জমা দেওয়ার জন্য অনুরোধ করা হচ্ছে।
          </p>
        </div>
      </div>
    </div>
  );
}
