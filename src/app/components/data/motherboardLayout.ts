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

export type MoboZones = Record<keyof typeof MOBO_ZONES, ZoneRect>;

// Default drop-zone layout for a full-size ATX board photographed straight-on.
// (Same coordinates the SVG illustration uses.)
export const ATX_ZONES: MoboZones = MOBO_ZONES;

// Default drop-zone layout for a Micro-ATX board. These boards are shorter
// top-to-bottom, so the PCIe / M.2 / SATA rows sit higher and closer together.
export const MATX_ZONES: MoboZones = {
  cpuPower: { top: 6, left: 26, width: 14, height: 8 },
  cpuSocket: { top: 19, left: 22, width: 26, height: 30 },
  paste: { top: 21, left: 24, width: 22, height: 26 },
  cooler: { top: 16, left: 18, width: 34, height: 36 },
  ram: { top: 19, left: 57, width: 17, height: 30 },
  atxPower: { top: 22, left: 83, width: 8, height: 26 },
  pcieX16: { top: 56, left: 16, width: 50, height: 12 },
  m2: { top: 50, left: 22, width: 20, height: 6 },
  pcieX1Net: { top: 70, left: 16, width: 35, height: 8 },
  pcieX1Snd: { top: 80, left: 16, width: 35, height: 8 },
  chipset: { top: 54, left: 68, width: 15, height: 20 },
  cmos: { top: 68, left: 55, width: 12, height: 15 },
  rearIO: { top: 16, left: 3, width: 6, height: 38 },
  sata: { top: 82, left: 68, width: 27, height: 11 }
};

/**
 * Per-board drop-zone overrides, keyed by the motherboard's `id`. Fill these in
 * to pixel-align the zones to a specific board's real photo — any zone you list
 * here replaces the ATX/Micro-ATX default for that board. Leave empty to use the
 * form-factor default. Example:
 *   mobo_z790: { cpuSocket: { top: 17, left: 21, width: 24, height: 29 } }
 */
export const MOBO_ZONE_OVERRIDES: Record<string, Partial<MoboZones>> = {};

/** Returns the drop-zone layout to use for a given mounted motherboard. */
export function getBoardZones(mobo: { id?: string; specs?: Record<string, string | number> } | undefined): MoboZones {
  const formFactor = String(mobo?.specs?.["Form Factor"] ?? "ATX");
  const base = /micro|matx|m-atx/i.test(formFactor) ? MATX_ZONES : ATX_ZONES;
  const overrides = (mobo?.id && MOBO_ZONE_OVERRIDES[mobo.id]) || {};
  return { ...base, ...overrides };
}

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
