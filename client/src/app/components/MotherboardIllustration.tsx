import { ComponentMetadata } from "./data/types";
import { MOBO_ZONES, isAmSocket, clamp } from "./data/motherboardLayout";

interface MotherboardIllustrationProps {
  /** The currently-mounted motherboard, if any. Drives socket shape/label and slot counts. */
  motherboard?: ComponentMetadata;
  /** false = dim "ghost" preview shown before a board is mounted; true = full detail. */
  installed: boolean;
}

const REAR_IO_COLORS = ["#2563eb", "#18181b", "#e11d48", "#16a34a"];

function PcieSlot({ x, y, width, height, label, color }: { x: number; y: number; width: number; height: number; label: string; color: string }) {
  return (
    <g>
      <rect x={x} y={y} width={width} height={height} rx={0.6} fill="#0f172a" stroke={color} strokeWidth={0.4} />
      <rect x={x + 1} y={y + height * 0.28} width={width - 2} height={height * 0.44} fill="#27272a" />
      <rect x={x + 1} y={y + 1} width={1.6} height={height - 2} fill={color} />
      <text x={x + width / 2} y={y - 1.2} textAnchor="middle" fontSize={2.4} fontWeight="bold" fill={color}>{label}</text>
    </g>
  );
}

export function MotherboardIllustration({ motherboard, installed }: MotherboardIllustrationProps) {
  const socketLabel = (motherboard?.specs?.["Socket"] as string) ?? "LGA1700";
  const formFactor = (motherboard?.specs?.["Form Factor"] as string) ?? "ATX";
  const m2Count = clamp(Number(motherboard?.specs?.["M.2 Slots"]) || 1, 1, 4);
  const sataCount = clamp(Number(motherboard?.specs?.["SATA Ports"]) || 4, 4, 6);
  const am = isAmSocket(socketLabel);
  const accent = am ? "#f97316" : "#3b82f6";

  const s = MOBO_ZONES.cpuSocket;
  const r = MOBO_ZONES.ram;
  const a = MOBO_ZONES.atxPower;
  const cp = MOBO_ZONES.cpuPower;
  const p16 = MOBO_ZONES.pcieX16;
  const pNet = MOBO_ZONES.pcieX1Net;
  const pSnd = MOBO_ZONES.pcieX1Snd;
  const m = MOBO_ZONES.m2;
  const c = MOBO_ZONES.chipset;
  const cm = MOBO_ZONES.cmos;
  const io = MOBO_ZONES.rearIO;
  const sa = MOBO_ZONES.sata;

  const m2SlotWidth = 6.5;
  const m2Gap = 1.6;

  return (
    <div className={`absolute inset-0 pointer-events-none transition-all duration-500 ${installed ? "opacity-100" : "opacity-35 grayscale"}`}>
      <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="size-full">
        <defs>
          <linearGradient id="pcbGradient" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#0b1220" />
            <stop offset="100%" stopColor="#111c33" />
          </linearGradient>
          <linearGradient id="chipsetGradient" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#312e81" />
            <stop offset="100%" stopColor="#1e1b4b" />
          </linearGradient>
        </defs>

        {/* Board base */}
        <rect x={1} y={1} width={98} height={98} rx={2.2} fill="url(#pcbGradient)" stroke={accent} strokeWidth={0.6} />

        {/* Decorative circuit traces */}
        <g opacity={0.3} stroke={accent} strokeWidth={0.25} fill="none">
          <path d="M9,9 L32,9 L32,16" />
          <path d="M70,6 L94,6 L94,20" />
          <path d="M6,92 L22,92 L22,78" />
          <path d="M94,94 L80,94 L80,86" />
          <circle cx={50} cy={50} r={44} strokeDasharray="1 3.5" />
        </g>

        {/* Mounting screw holes */}
        {[[4, 4], [96, 4], [4, 96], [96, 96]].map(([cx, cy]) => (
          <circle key={`${cx}-${cy}`} cx={cx} cy={cy} r={1.3} fill="#0f172a" stroke="#475569" strokeWidth={0.3} />
        ))}

        {/* Rear I/O panel */}
        <g>
          <rect x={io.left} y={io.top} width={io.width} height={io.height} rx={0.6} fill="#18181b" stroke="#3f3f46" strokeWidth={0.4} />
          {REAR_IO_COLORS.map((color, i) => (
            <rect
              key={color}
              x={io.left + io.width * 0.18}
              y={io.top + io.height * (0.06 + i * 0.23)}
              width={io.width * 0.64}
              height={io.height * 0.15}
              rx={0.3}
              fill={color}
            />
          ))}
        </g>

        {/* VRM heatsinks flanking the socket */}
        <rect x={s.left - 3.4} y={s.top - 1} width={2.6} height={s.height + 2} rx={0.5} fill="#3f3f46" stroke="#71717a" strokeWidth={0.3} />
        <rect x={s.left + s.width + 0.8} y={s.top - 1} width={2.6} height={s.height + 2} rx={0.5} fill="#3f3f46" stroke="#71717a" strokeWidth={0.3} />

        {/* CPU Socket */}
        <g>
          <rect x={s.left} y={s.top} width={s.width} height={s.height} rx={1} fill="#111827" stroke={accent} strokeWidth={0.6} />
          <rect x={s.left + 2} y={s.top + 2} width={s.width - 4} height={s.height - 4} rx={0.6} fill="#27272a" stroke="#52525b" strokeWidth={0.35} />
          {am ? (
            <polygon
              points={`${s.left + 3.5},${s.top + 3.5} ${s.left + 7},${s.top + 3.5} ${s.left + 3.5},${s.top + 7}`}
              fill={accent}
            />
          ) : (
            <g fill={accent} opacity={0.55}>
              {Array.from({ length: 36 }).map((_, i) => {
                const row = Math.floor(i / 6);
                const col = i % 6;
                return (
                  <circle
                    key={i}
                    cx={s.left + 4 + col * ((s.width - 8) / 5)}
                    cy={s.top + 4 + row * ((s.height - 8) / 5)}
                    r={0.35}
                  />
                );
              })}
            </g>
          )}
          <rect
            x={s.left + s.width - 1}
            y={s.top + s.height * 0.28}
            width={4.5}
            height={1.3}
            rx={0.4}
            fill="#a1a1aa"
            transform={`rotate(25 ${s.left + s.width} ${s.top + s.height * 0.28})`}
          />
          <text x={s.left + s.width / 2} y={s.top + s.height + 4.5} textAnchor="middle" fontSize={3.2} fontWeight="bold" fill={accent}>
            {socketLabel}
          </text>
        </g>

        {/* RAM DIMM slots */}
        <text x={r.left + r.width / 2} y={r.top - 2.5} textAnchor="middle" fontSize={2.6} fontWeight="bold" fill="#94a3b8">DIMM</text>
        {Array.from({ length: 4 }).map((_, i) => {
          const slotW = r.width / 4 - 1.6;
          const x = r.left + i * (r.width / 4) + 0.8;
          const color = i % 2 === 0 ? "#facc15" : "#38bdf8";
          return (
            <g key={i}>
              <rect x={x} y={r.top} width={slotW} height={r.height} fill="#18181b" stroke="#3f3f46" strokeWidth={0.3} />
              <rect x={x} y={r.top - 1.4} width={slotW} height={1.4} fill={color} />
              <rect x={x} y={r.top + r.height} width={slotW} height={1.4} fill={color} />
            </g>
          );
        })}

        {/* 24-pin ATX power */}
        <text x={a.left + a.width / 2} y={a.top - 1.5} textAnchor="middle" fontSize={2.2} fontWeight="bold" fill="#eab308">24P</text>
        <rect x={a.left} y={a.top} width={a.width} height={a.height} rx={0.6} fill="#18181b" stroke="#eab308" strokeWidth={0.5} />
        {Array.from({ length: 12 }).map((_, i) => {
          const row = Math.floor(i / 2);
          const col = i % 2;
          return (
            <rect
              key={i}
              x={a.left + 1 + col * (a.width / 2 - 0.5)}
              y={a.top + 1 + row * ((a.height - 2) / 6)}
              width={a.width / 2 - 1.5}
              height={(a.height - 2) / 6 - 0.6}
              fill="#eab308"
            />
          );
        })}

        {/* 8-pin CPU power */}
        <rect x={cp.left} y={cp.top} width={cp.width} height={cp.height} rx={0.6} fill="#18181b" stroke="#f97316" strokeWidth={0.5} />
        {Array.from({ length: 8 }).map((_, i) => {
          const row = Math.floor(i / 4);
          const col = i % 4;
          return (
            <rect
              key={i}
              x={cp.left + 1 + col * (cp.width / 4)}
              y={cp.top + 1 + row * ((cp.height - 2) / 2)}
              width={cp.width / 4 - 1}
              height={(cp.height - 2) / 2 - 0.6}
              fill="#f97316"
            />
          );
        })}
        <text x={cp.left + cp.width / 2} y={cp.top + cp.height + 3} textAnchor="middle" fontSize={2.2} fontWeight="bold" fill="#f97316">CPU PWR</text>

        {/* PCIe x16 (GPU) */}
        <PcieSlot x={p16.left} y={p16.top} width={p16.width} height={p16.height} label="PCIe x16" color="#a855f7" />

        {/* PCIe x1 slots */}
        <PcieSlot x={pNet.left} y={pNet.top} width={pNet.width} height={pNet.height} label="PCIe x1" color="#22c55e" />
        <PcieSlot x={pSnd.left} y={pSnd.top} width={pSnd.width} height={pSnd.height} label="PCIe x1" color="#f43f5e" />

        {/* M.2 slot(s) - first is the functional drop target, extras are decorative to reflect the board's slot count */}
        <text x={m.left} y={m.top - 1.4} fontSize={2.3} fontWeight="bold" fill="#22d3ee">M.2 x{m2Count}</text>
        {Array.from({ length: m2Count }).map((_, i) => {
          const x = m.left + i * (m2SlotWidth + m2Gap);
          return (
            <g key={i} opacity={i === 0 ? 1 : 0.6}>
              <rect x={x} y={m.top} width={m2SlotWidth} height={m.height} rx={0.4} fill="#111827" stroke="#22d3ee" strokeWidth={0.35} />
              <rect x={x} y={m.top + m.height * 0.2} width={m2SlotWidth * 0.3} height={m.height * 0.6} fill="#eab308" />
              <circle cx={x + m2SlotWidth - 0.8} cy={m.top + m.height / 2} r={0.5} fill="#71717a" />
            </g>
          );
        })}

        {/* SATA ports (decorative - drive-cage bay cards handle HDD/SATA-SSD mounting) */}
        <text x={sa.left} y={sa.top - 1.2} fontSize={2.3} fontWeight="bold" fill="#38bdf8">SATA x{sataCount}</text>
        {Array.from({ length: sataCount }).map((_, i) => {
          const portW = sa.width / sataCount - 1.2;
          const x = sa.left + i * (sa.width / sataCount);
          return (
            <g key={i}>
              <rect x={x} y={sa.top} width={portW} height={sa.height * 0.55} rx={0.3} fill="#18181b" stroke="#38bdf8" strokeWidth={0.3} />
              <rect x={x} y={sa.top - 1} width={portW} height={1} fill="#38bdf8" />
            </g>
          );
        })}

        {/* Chipset heatsink */}
        <rect x={c.left} y={c.top} width={c.width} height={c.height} rx={1} fill="url(#chipsetGradient)" stroke="#6366f1" strokeWidth={0.5} />
        {Array.from({ length: 4 }).map((_, i) => (
          <line
            key={i}
            x1={c.left + 2}
            y1={c.top + 3 + i * ((c.height - 6) / 3)}
            x2={c.left + c.width - 2}
            y2={c.top + 3 + i * ((c.height - 6) / 3)}
            stroke="#4338ca"
            strokeWidth={0.4}
          />
        ))}
        <text x={c.left + c.width / 2} y={c.top + c.height / 2 + 0.8} textAnchor="middle" fontSize={2.4} fontWeight="bold" fill="#c7d2fe">CHIPSET</text>

        {/* CMOS battery */}
        <circle cx={cm.left + cm.width / 2} cy={cm.top + cm.height / 2} r={Math.min(cm.width, cm.height) / 2} fill="#a1a1aa" stroke="#52525b" strokeWidth={0.6} />
        <text x={cm.left + cm.width / 2} y={cm.top + cm.height / 2 + 1} textAnchor="middle" fontSize={1.9} fontWeight="bold" fill="#27272a">CR2032</text>

        {/* Form factor label */}
        <text x={4} y={97} fontSize={2.4} fontWeight="bold" fill="#64748b">{formFactor}</text>
      </svg>
    </div>
  );
}
