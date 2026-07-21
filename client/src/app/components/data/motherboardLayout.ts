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
 * Per-board drop-zone overrides, keyed by the motherboard's `id`. Each zone here
 * replaces the ATX/Micro-ATX default for that board. Values are percentages of
 * the real product photo, hand-calibrated to each board's actual socket/slot
 * positions. Only the interactive zones are listed (chipset/cmos/rearIO/sata are
 * decorative and drawn only on the SVG fallback, so they inherit the defaults).
 */
export const MOBO_ZONE_OVERRIDES: Record<string, Partial<MoboZones>> = {
  // ASUS Prime Z790-A (ATX · LGA1700) — prime-z790-a.png
  mobo_z790: {
    cpuPower: { top: 4, left: 24, width: 12, height: 6 },
    cpuSocket: { top: 22, left: 44, width: 18, height: 20 },
    paste: { top: 24, left: 46, width: 14, height: 16 },
    cooler: { top: 19, left: 40, width: 26, height: 26 },
    ram: { top: 9, left: 68, width: 16, height: 42 },
    atxPower: { top: 40, left: 83, width: 7, height: 17 },
    pcieX16: { top: 56, left: 27, width: 38, height: 5 },
    m2: { top: 62, left: 28, width: 30, height: 4 },
    pcieX1Net: { top: 68, left: 27, width: 28, height: 4 },
    pcieX1Snd: { top: 84, left: 27, width: 28, height: 4 }
  },
  // ASUS ROG Strix B650E-F (ATX · AM5) — rog-strix-b650e-f.png
  mobo_asus_b650e: {
    cpuPower: { top: 4, left: 21, width: 12, height: 5 },
    cpuSocket: { top: 18, left: 43, width: 23, height: 28 },
    paste: { top: 21, left: 45, width: 19, height: 22 },
    cooler: { top: 15, left: 39, width: 31, height: 34 },
    ram: { top: 9, left: 76, width: 15, height: 45 },
    atxPower: { top: 21, left: 93, width: 6, height: 17 },
    pcieX16: { top: 58, left: 11, width: 50, height: 5 },
    m2: { top: 51, left: 25, width: 38, height: 5 },
    pcieX1Net: { top: 80, left: 21, width: 13, height: 4 },
    pcieX1Snd: { top: 87, left: 21, width: 13, height: 4 }
  },
  // MSI MAG B650 Tomahawk (ATX · AM5) — mag-b650-tomahawk.png
  mobo_b650: {
    cpuPower: { top: 2, left: 19, width: 20, height: 8 },
    cpuSocket: { top: 17, left: 42, width: 21, height: 22 },
    paste: { top: 19, left: 44, width: 17, height: 18 },
    cooler: { top: 14, left: 38, width: 29, height: 28 },
    ram: { top: 9, left: 68, width: 19, height: 33 },
    atxPower: { top: 24, left: 89, width: 8, height: 18 },
    pcieX16: { top: 56, left: 15, width: 49, height: 5 },
    m2: { top: 64, left: 16, width: 45, height: 5 },
    pcieX1Net: { top: 76, left: 15, width: 40, height: 5 },
    pcieX1Snd: { top: 85, left: 15, width: 40, height: 5 }
  },
  // MSI PRO Z690-A (ATX · LGA1700) — pro-z690-a.png
  mobo_msi_z690: {
    cpuPower: { top: 1, left: 22, width: 17, height: 7 },
    cpuSocket: { top: 15, left: 39, width: 18, height: 21 },
    paste: { top: 17, left: 41, width: 14, height: 17 },
    cooler: { top: 12, left: 35, width: 26, height: 27 },
    ram: { top: 9, left: 71, width: 17, height: 31 },
    atxPower: { top: 23, left: 92, width: 7, height: 18 },
    pcieX16: { top: 52, left: 11, width: 47, height: 5 },
    m2: { top: 60, left: 12, width: 45, height: 5 },
    pcieX1Net: { top: 68, left: 11, width: 40, height: 4 },
    pcieX1Snd: { top: 79, left: 11, width: 40, height: 4 }
  },
  // Gigabyte B650 AORUS Elite AX (ATX · AM5) — b650-aorus-elite-ax.png
  mobo_gigabyte_b650: {
    cpuPower: { top: 7, left: 27, width: 15, height: 5 },
    cpuSocket: { top: 21, left: 45, width: 19, height: 23 },
    paste: { top: 23, left: 47, width: 15, height: 19 },
    cooler: { top: 18, left: 41, width: 27, height: 29 },
    ram: { top: 15, left: 69, width: 18, height: 35 },
    atxPower: { top: 34, left: 90, width: 6, height: 20 },
    pcieX16: { top: 60, left: 16, width: 47, height: 5 },
    m2: { top: 54, left: 22, width: 36, height: 5 },
    pcieX1Net: { top: 82, left: 16, width: 30, height: 4 },
    pcieX1Snd: { top: 89, left: 16, width: 30, height: 4 }
  },
  // Gigabyte H610M H (Micro-ATX · LGA1700) — h610m-h.png
  mobo_h610: {
    cpuPower: { top: 13, left: 20, width: 14, height: 8 },
    cpuSocket: { top: 19, left: 40, width: 26, height: 30 },
    paste: { top: 22, left: 43, width: 20, height: 24 },
    cooler: { top: 15, left: 35, width: 34, height: 38 },
    ram: { top: 15, left: 84, width: 13, height: 39 },
    atxPower: { top: 32, left: 92, width: 7, height: 22 },
    pcieX16: { top: 67, left: 9, width: 58, height: 5 },
    m2: { top: 58, left: 15, width: 40, height: 5 },
    pcieX1Net: { top: 56, left: 9, width: 28, height: 4 },
    pcieX1Snd: { top: 76, left: 9, width: 28, height: 4 }
  },
  // ASUS Prime A520M-K (Micro-ATX · AM4) — prime-a520m-k.png
  mobo_asus_a520m: {
    cpuPower: { top: 1, left: 18, width: 14, height: 6 },
    cpuSocket: { top: 32, left: 52, width: 20, height: 24 },
    paste: { top: 34, left: 54, width: 16, height: 20 },
    cooler: { top: 27, left: 47, width: 28, height: 32 },
    ram: { top: 5, left: 82, width: 12, height: 34 },
    atxPower: { top: 22, left: 88, width: 8, height: 20 },
    pcieX16: { top: 69, left: 7, width: 53, height: 5 },
    m2: { top: 82, left: 27, width: 36, height: 4 },
    pcieX1Net: { top: 58, left: 7, width: 28, height: 4 },
    pcieX1Snd: { top: 90, left: 7, width: 28, height: 4 }
  }
};

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
