import React from "react";

// Reusable placeholder-icon factories. Each returns a renderSvg-compatible function.
// These stand in for real product photos until an image is supplied via the `image` field
// (see ComponentImage.tsx, which prefers a real photo and falls back to these SVGs).

export function cpuIcon(accent: string, label: string, sublabel: string) {
  return (className = "size-16") => (
    <svg className={className} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="10" y="10" width="80" height="80" rx="6" fill="#1E293B" stroke={accent} strokeWidth="3" />
      <rect x="25" y="25" width="50" height="50" rx="3" fill="#64748B" stroke="#94A3B8" strokeWidth="2" />
      <circle cx="50" cy="50" r="12" fill="#E2E8F0" opacity="0.8" />
      <rect x="18" y="18" width="8" height="8" rx="1" fill="#D97706" />
      <line x1="12" y1="20" x2="12" y2="80" stroke={accent} strokeWidth="2" strokeDasharray="3 3" />
      <line x1="88" y1="20" x2="88" y2="80" stroke={accent} strokeWidth="2" strokeDasharray="3 3" />
      <line x1="20" y1="12" x2="80" y2="12" stroke={accent} strokeWidth="2" strokeDasharray="3 3" />
      <line x1="20" y1="88" x2="80" y2="88" stroke={accent} strokeWidth="2" strokeDasharray="3 3" />
      <text x="32" y="45" fill="#0F172A" fontSize="9" fontWeight="bold">{label}</text>
      <text x="30" y="63" fill="#1E293B" fontSize="6" fontWeight="bold">{sublabel}</text>
    </svg>
  );
}

export function gpuIcon(accent: string, label: string) {
  return (className = "size-16") => (
    <svg className={className} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="5" y="25" width="90" height="50" rx="4" fill="#0F172A" stroke={accent} strokeWidth="2.5" />
      <circle cx="32" cy="50" r="14" fill="#1E293B" stroke="#64748B" strokeWidth="2" />
      <circle cx="68" cy="50" r="14" fill="#1E293B" stroke="#64748B" strokeWidth="2" />
      <line x1="32" y1="36" x2="32" y2="64" stroke="#94A3B8" />
      <line x1="18" y1="50" x2="46" y2="50" stroke="#94A3B8" />
      <line x1="68" y1="36" x2="68" y2="64" stroke="#94A3B8" />
      <line x1="54" y1="50" x2="82" y2="50" stroke="#94A3B8" />
      <rect x="25" y="75" width="50" height="3" fill="#D97706" />
      <text x="50" y="20" textAnchor="middle" fill="#FFFFFF" fontSize="6" fontWeight="bold">{label}</text>
    </svg>
  );
}

export function moboIcon(accent: string, socketLabel: string) {
  return (className = "size-16") => (
    <svg className={className} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="5" y="5" width="90" height="90" rx="4" fill="#0F172A" stroke={accent} strokeWidth="3" />
      <rect x="15" y="15" width="25" height="25" fill="#1E293B" stroke="#94A3B8" strokeWidth="2" />
      <line x1="50" y1="12" x2="50" y2="40" stroke="#475569" strokeWidth="4" strokeDasharray="2 2" />
      <line x1="58" y1="12" x2="58" y2="40" stroke="#475569" strokeWidth="4" strokeDasharray="2 2" />
      <rect x="15" y="50" width="70" height="8" fill="#1E293B" stroke={accent} strokeWidth="2" />
      <circle cx="75" cy="25" r="8" fill="#D1D5DB" />
      <rect x="52" y="52" width="28" height="4" fill="#E2E8F0" />
      <text x="16" y="30" fill="#94A3B8" fontSize="4.5" fontWeight="bold">{socketLabel}</text>
      <text x="25" y="56" fill="#FFFFFF" fontSize="5" fontWeight="bold">PCIe x16</text>
    </svg>
  );
}

export function ramIcon(accent: string, label: string, sticks = 5) {
  const width = 60 / sticks;
  const rects = Array.from({ length: sticks }, (_, i) => (
    <rect key={i} x={15 + i * (width + 3)} y="42" width={width - 2} height="16" fill="#475569" />
  ));
  return (className = "size-16") => (
    <svg className={className} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="5" y="35" width="90" height="30" rx="3" fill="#1E293B" stroke={accent} strokeWidth="2" />
      {rects}
      <line x1="5" y1="65" x2="95" y2="65" stroke="#FBBF24" strokeWidth="3" strokeDasharray="2 1" />
      <text x="50" y="52" textAnchor="middle" fill="#FFFFFF" fontSize="4.5" fontWeight="bold">{label}</text>
    </svg>
  );
}

export function ssdIcon(accent: string, label: string) {
  return (className = "size-16") => (
    <svg className={className} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="5" y="42" width="90" height="16" rx="1" fill="#0F172A" stroke={accent} strokeWidth="1.5" />
      <rect x="12" y="45" width="12" height="10" fill="#334155" />
      <rect x="30" y="45" width="15" height="10" fill="#334155" />
      <rect x="50" y="45" width="15" height="10" fill="#334155" />
      <circle cx="85" cy="50" r="2.5" fill="#E2E8F0" stroke="#0F172A" />
      <line x1="5" y1="46" x2="5" y2="54" stroke="#FBBF24" strokeWidth="2.5" />
      <text x="68" y="52" fill="#FFFFFF" fontSize="3">{label}</text>
    </svg>
  );
}

export function sataSsdIcon(accent: string, label: string) {
  return (className = "size-16") => (
    <svg className={className} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="20" y="20" width="60" height="60" rx="3" fill="#374151" stroke={accent} strokeWidth="2.5" />
      <rect x="20" y="20" width="60" height="15" fill="#1F2937" />
      <circle cx="28" cy="28" r="2" fill="#10B981" />
      <text x="30" y="30" fill="#9CA3AF" fontSize="4.5" fontWeight="bold">{label}</text>
      <line x1="30" y1="80" x2="45" y2="80" stroke="#FBBF24" strokeWidth="2" />
      <line x1="50" y1="80" x2="70" y2="80" stroke="#E5E7EB" strokeWidth="2" />
    </svg>
  );
}

export function hddIcon(accent: string, label: string) {
  return (className = "size-16") => (
    <svg className={className} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="20" y="15" width="60" height="70" rx="4" fill="#4B5563" stroke={accent} strokeWidth="3" />
      <circle cx="50" cy="45" r="22" fill="#9CA3AF" stroke="#D1D5DB" strokeWidth="2" />
      <circle cx="50" cy="45" r="4" fill="#374151" />
      <path d="M50,45 L35,68" stroke="#1F2937" strokeWidth="2.5" strokeLinecap="round" />
      <rect x="68" y="78" width="8" height="4" fill="#FBBF24" />
      <text x="25" y="80" fill="#E5E7EB" fontSize="5" fontWeight="bold">{label}</text>
    </svg>
  );
}

export function psuIcon(accent: string, label: string) {
  return (className = "size-16") => (
    <svg className={className} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="15" y="15" width="70" height="70" rx="5" fill="#18181B" stroke={accent} strokeWidth="3" />
      <circle cx="50" cy="50" r="22" fill="#27272A" stroke="#52525B" strokeWidth="2" />
      <line x1="35" y1="35" x2="65" y2="65" stroke="#71717A" strokeWidth="2" />
      <line x1="65" y1="35" x2="35" y2="65" stroke="#71717A" strokeWidth="2" />
      <rect x="75" y="65" width="15" height="15" rx="2" fill="#E4E4E7" />
      <text x="24" y="30" fill={accent} fontSize="5.5" fontWeight="bold">{label}</text>
    </svg>
  );
}

export function coolerAirIcon(accent: string, label: string) {
  return (className = "size-16") => (
    <svg className={className} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="20" y="15" width="60" height="25" fill="#94A3B8" stroke="#475569" strokeWidth="2" />
      <rect x="20" y="48" width="60" height="25" fill="#94A3B8" stroke="#475569" strokeWidth="2" />
      <circle cx="50" cy="44" r="16" fill={accent} opacity="0.85" />
      <line x1="50" y1="10" x2="50" y2="90" stroke="#1E293B" strokeWidth="3" />
      <text x="50" y="47" textAnchor="middle" fill="#FFFFFF" fontSize="5.5" fontWeight="bold">{label}</text>
    </svg>
  );
}

export function coolerLiquidIcon(accent: string, label: string) {
  return (className = "size-16") => (
    <svg className={className} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="8" y="12" width="30" height="76" rx="3" fill="#1E293B" stroke={accent} strokeWidth="2.5" />
      <circle cx="23" cy="30" r="8" fill="#334155" />
      <circle cx="23" cy="70" r="8" fill="#334155" />
      <path d="M38,20 C60,20 55,50 78,50" fill="none" stroke={accent} strokeWidth="4" strokeLinecap="round" />
      <path d="M38,80 C60,80 55,50 78,50" fill="none" stroke="#475569" strokeWidth="4" strokeLinecap="round" />
      <circle cx="78" cy="50" r="16" fill="#0F172A" stroke="#64748B" strokeWidth="2" />
      <text x="50" y="97" textAnchor="middle" fill="#94A3B8" fontSize="4.5" fontWeight="bold">{label}</text>
    </svg>
  );
}

export function caseIcon(accent: string, label: string) {
  return (className = "size-16") => (
    <svg className={className} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="15" y="10" width="70" height="80" rx="3" fill="#18181B" stroke={accent} strokeWidth="3" />
      <rect x="22" y="18" width="56" height="64" fill="#27272A" opacity="0.9" />
      <rect x="22" y="18" width="56" height="42" fill="#09090B" stroke="#4B5563" />
      <circle cx="70" cy="74" r="3" fill={accent} />
      <line x1="28" y1="14" x2="72" y2="14" stroke="#4B5563" strokeWidth="2" />
      <text x="26" y="30" fill="#FFFFFF" fontSize="5" fontWeight="bold">{label}</text>
    </svg>
  );
}

export function fanIcon(accent: string) {
  return (className = "size-16") => (
    <svg className={className} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="15" y="15" width="70" height="70" rx="4" fill="#1E293B" stroke={accent} strokeWidth="2.5" />
      <circle cx="50" cy="50" r="30" fill="#0F172A" stroke="#475569" />
      <circle cx="50" cy="50" r="8" fill={accent} />
      <path d="M50,42 C40,30 30,50 50,50 C70,50 60,70 50,58" fill="#475569" stroke="#64748B" />
      <path d="M42,50 C30,60 50,70 50,50 C50,30 70,40 58,50" fill="#475569" stroke="#64748B" />
    </svg>
  );
}
