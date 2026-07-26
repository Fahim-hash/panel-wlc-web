'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { WLC_THEME } from '@/lib/theme';

export default function ThemeShowcasePage() {
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  const copyToClipboard = (key: string, value: string) => {
    navigator.clipboard.writeText(value);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  return (
    <div className={WLC_THEME.pageContainer}>
      {/* Background Ambience */}
      <div className={WLC_THEME.glowTopLeft} />
      <div className={WLC_THEME.glowBottomRight} />

      <div className="w-full max-w-4xl relative z-10 py-12 px-4 space-y-8">
        {/* Header */}
        <div className="text-center space-y-2">
          <div className="relative w-16 h-16 mx-auto mb-2">
            <Image src="/logo.png" alt="WLC Logo" fill className="object-contain" />
          </div>
          <h1 className="text-3xl font-extrabold text-white tracking-tight">WLC Theme & Design System</h1>
          <p className="text-sm text-stone-400">
            Centralized UI components, tokens, and Tailwind utility presets for developers.
          </p>
        </div>

        {/* 1. Color Palette Tokens */}
        <div className="bg-stone-950/60 backdrop-blur-xl border border-stone-800/80 rounded-3xl p-6 shadow-xl space-y-4">
          <h2 className="text-base font-semibold text-rose-400 uppercase tracking-wider">01. Color Palette</h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs font-mono">
            <div className="bg-stone-900 border border-stone-800 p-3 rounded-xl space-y-2">
              <div className="w-full h-10 bg-stone-900 rounded-lg border border-stone-700" />
              <p className="text-stone-200 font-bold">Background</p>
              <p className="text-stone-500">stone-900 (#1c1917)</p>
            </div>
            <div className="bg-stone-900 border border-stone-800 p-3 rounded-xl space-y-2">
              <div className="w-full h-10 bg-stone-950/80 rounded-lg border border-stone-800" />
              <p className="text-stone-200 font-bold">Glass Card</p>
              <p className="text-stone-500">stone-950/40</p>
            </div>
            <div className="bg-stone-900 border border-stone-800 p-3 rounded-xl space-y-2">
              <div className="w-full h-10 bg-rose-700 rounded-lg" />
              <p className="text-stone-200 font-bold">Primary Accent</p>
              <p className="text-stone-500">rose-700 (#be123c)</p>
            </div>
            <div className="bg-stone-900 border border-stone-800 p-3 rounded-xl space-y-2">
              <div className="w-full h-10 bg-rose-900 rounded-lg" />
              <p className="text-stone-200 font-bold">Secondary Accent</p>
              <p className="text-stone-500">rose-900 (#881337)</p>
            </div>
          </div>
        </div>

        {/* 2. Interactive Components Showcase */}
        <div className="bg-stone-950/60 backdrop-blur-xl border border-stone-800/80 rounded-3xl p-6 shadow-xl space-y-6">
          <h2 className="text-base font-semibold text-rose-400 uppercase tracking-wider">02. Live Components Preview</h2>
          
          <div className="grid md:grid-cols-2 gap-6">
            {/* Form Elements */}
            <div className="space-y-4 bg-stone-900/40 p-5 rounded-2xl border border-stone-800/50">
              <h3 className="text-xs font-bold text-stone-300 uppercase">Input Fields & Buttons</h3>
              
              <div>
                <label className={WLC_THEME.label}>Sample Input Label</label>
                <input 
                  type="text" 
                  placeholder="Enter text here..." 
                  className={WLC_THEME.input} 
                  readOnly 
                />
              </div>

              <button className={WLC_THEME.primaryButton}>
                Primary Action ➔
              </button>
            </div>

            {/* Notifications & Links */}
            <div className="space-y-4 bg-stone-900/40 p-5 rounded-2xl border border-stone-800/50">
              <h3 className="text-xs font-bold text-stone-300 uppercase">Alerts & Typography</h3>
              
              <div className={WLC_THEME.errorAlert}>
                🚨 Error Alert Box Preset
              </div>

              <div className={WLC_THEME.successAlert}>
                ✅ Success Alert Box Preset
              </div>

              <div className="flex justify-between items-center pt-2">
                <Link href="#" className={WLC_THEME.linkText}>Sample Link Text</Link>
                <span className="text-[10px] text-stone-500 font-mono uppercase">Version 1.0.0</span>
              </div>
            </div>
          </div>
        </div>

        {/* 3. Theme Code Dictionary */}
        <div className="bg-stone-950/60 backdrop-blur-xl border border-stone-800/80 rounded-3xl p-6 shadow-xl space-y-4">
          <h2 className="text-base font-semibold text-rose-400 uppercase tracking-wider">03. Copy Class Tokens (`@/lib/theme`)</h2>
          
          <div className="space-y-3 font-mono text-xs">
            {Object.entries(WLC_THEME).map(([key, value]) => (
              <div 
                key={key} 
                className="flex flex-col sm:flex-row sm:items-center justify-between bg-stone-900/80 border border-stone-800/80 p-3 rounded-xl gap-2 hover:border-rose-900/50 transition-colors"
              >
                <div className="overflow-hidden">
                  <span className="text-rose-400 font-bold">{key}:</span>
                  <p className="text-stone-400 truncate text-[11px] mt-0.5">{value}</p>
                </div>
                <button
                  onClick={() => copyToClipboard(key, value)}
                  className="self-end sm:self-center px-3 py-1.5 bg-stone-800 hover:bg-stone-700 text-stone-200 text-[10px] rounded-lg transition-all font-sans whitespace-nowrap"
                >
                  {copiedKey === key ? '✓ Copied' : 'Copy Classes'}
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Footer Link */}
        <div className="text-center pt-4">
          <Link href="/login" className={WLC_THEME.backLink}>
            ← Back to Login Portal
          </Link>
        </div>
      </div>
    </div>
  );
}
