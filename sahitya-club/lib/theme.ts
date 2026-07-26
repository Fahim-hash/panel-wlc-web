// lib/theme.ts

export const WLC_THEME = {
  pageContainer: "min-h-screen bg-stone-900 flex flex-col justify-center items-center p-4 relative overflow-hidden selection:bg-rose-500 selection:text-white",
  glowTopLeft: "absolute top-[-10%] left-[-10%] w-[500px] h-[500px] rounded-full bg-rose-900/20 blur-[120px] pointer-events-none",
  glowBottomRight: "absolute bottom-[-10%] right-[-10%] w-[500px] h-[500px] rounded-full bg-amber-600/10 blur-[120px] pointer-events-none",
  glassCard: "w-full max-w-md bg-stone-950/40 backdrop-blur-xl border border-stone-800/80 rounded-3xl p-6 md:p-8 shadow-2xl relative z-10",
  title: "text-xl font-bold text-white tracking-tight",
  subtitle: "text-xs text-stone-400 mt-1",
  label: "block text-xs font-semibold text-stone-300 uppercase tracking-wider mb-2",
  input: "w-full px-4 py-3 bg-stone-900/60 border border-stone-800 rounded-xl text-sm text-white placeholder-stone-500 focus:outline-none focus:border-rose-700 focus:ring-1 focus:ring-rose-700 transition-all",
  primaryButton: "w-full py-3 bg-gradient-to-r from-rose-700 to-rose-900 hover:from-rose-600 hover:to-rose-800 text-white font-bold text-xs uppercase tracking-widest rounded-xl transition-all disabled:opacity-50 flex items-center justify-center gap-2",
  errorAlert: "bg-rose-950/30 border border-rose-900/40 text-rose-400 text-xs p-3 rounded-xl mb-5 text-center font-medium",
  successAlert: "bg-emerald-950/30 border border-emerald-900/40 text-emerald-400 text-xs p-4 rounded-xl mb-5 text-center font-medium",
  linkText: "text-[11px] text-rose-400 hover:text-rose-300 transition-colors font-medium",
  backLink: "mt-6 text-xs text-stone-500 hover:text-stone-300 transition-colors relative z-10"
};
