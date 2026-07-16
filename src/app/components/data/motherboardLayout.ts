import type { CSSProperties } from "react";

export interface ZoneRect {
  top: number;
  left: number;
  width: number;
  height: number;
}

/**
 * Single source of truth for where every socket/slot lives on the motherboard
 * illustration, as percentages of a 100x100 box. MotherboardIllustration.tsx
 * draws its graphics at these exact coordinates (its SVG viewBox is 0 0 100 100,
 * so these numbers plug in directly), and PCSimulator.tsx positions the
 * interactive drop-zone overlays at the same coordinates via rectStyle() below.
 * That keeps the drawn socket and the actual drop target pixel-aligned.
 */
export const MOBO_ZONES = {
  cpuPower: { top: 5, left: 25, width: 14, height: 8 },
  cpuSocket: { top: 18, left: 20, width: 25, height: 30 },
  paste: { top: 20, left: 22, width: 21, height: 26 },
  cooler: { top: 15, left: 16, width: 33, height: 36 },
  ram: { top: 18, left: 55, width: 18, height: 30 },
  atxPower: { top: 22, left: 82, width: 8, height: 26 },
  pcieX16: { top: 55, left: 15, width: 50, height: 12 },
  m2: { top: 48, left: 20, width: 20, height: 6 },
  pcieX1Net: { top: 72, left: 15, width: 35, height: 8 },
  pcieX1Snd: { top: 82, left: 15, width: 35, height: 8 },
  chipset: { top: 52, left: 68, width: 15, height: 20 },
  cmos: { top: 68, left: 55, width: 12, height: 15 },
  rearIO: { top: 18, left: 2, width: 6, height: 38 },
  /** Decorative only - SATA ports aren't a drop target (HDD/SATA-SSD are mounted via the drive-cage bay cards). */
  sata: { top: 84, left: 68, width: 27, height: 11 }
} as const satisfies Record<string, ZoneRect>;

export function rectStyle(rect: ZoneRect): CSSProperties {
  return {
    position: "absolute",
    top: `${rect.top}%`,
    left: `${rect.left}%`,
    width: `${rect.width}%`,
    height: `${rect.height}%`
  };
}

export function isAmSocket(socket: string | number | undefined) {
  return typeof socket === "string" && socket.toUpperCase().startsWith("AM");
}

export function clamp(value: number, min: number, max: number) {
  return Math.min(max, Math.max(min, value));
}
