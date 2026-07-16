import { ComponentMetadata } from "./types";
import { ramIcon } from "./iconTemplates";

const KINGSTON_RED = "#DC2626";
const GSKILL_AMBER = "#F59E0B";

export const ramComponents: ComponentMetadata[] = [
  {
    id: "ram_ddr5",
    name: "Corsair Vengeance 32GB DDR5 5600MHz",
    type: "RAM",
    manufacturer: "Corsair",
    model: "Vengeance DDR5",
    difficulty: "Beginner",
    specs: {
      "Type": "DDR5",
      "Capacity": "32GB (2 x 16GB)",
      "Speed": "5600 MHz",
      "Voltage": "1.25V",
      "Form Factor": "DIMM"
    },
    description: "Ultra-fast DDR5 dual-channel memory kit providing massive bandwidth for high-end systems.",
    purpose: "RAM (Random Access Memory) is short-term, temporary storage. It holds active data and programs for immediate CPU access.",
    howItWorks: "It reads/writes data at gigabytes-per-second speeds. When programs run, their critical data is loaded here. When power is shut down, RAM loses all data.",
    whereItConnects: "Snaps into the Motherboard DIMM Slots. Locked by tab clips on the ends.",
    facts: "DDR5 operates at much higher speeds and lower voltage than DDR4, and features on-die ECC (Error Correction Code) directly on the chip.",
    mistakes: "Installing RAM into adjacent slots rather than spacing them out (e.g. slots 2 and 4) to enable dual-channel performance.",
    color: "from-purple-600 to-purple-400",
    image: "/images/components/ram/corsair/vengeance-ddr5-32gb.png",
    renderSvg: (className = "size-16") => (
      <svg className={className} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="5" y="35" width="90" height="30" rx="3" fill="#1E293B" stroke="#A855F7" strokeWidth="2" />
        <rect x="15" y="42" width="10" height="16" fill="#475569" />
        <rect x="30" y="42" width="10" height="16" fill="#475569" />
        <rect x="45" y="42" width="10" height="16" fill="#475569" />
        <rect x="60" y="42" width="10" height="16" fill="#475569" />
        <rect x="75" y="42" width="10" height="16" fill="#475569" />
        <line x1="5" y1="65" x2="95" y2="65" stroke="#FBBF24" strokeWidth="3" strokeDasharray="2 1" />
        <text x="35" y="52" fill="#FFFFFF" fontSize="5" fontWeight="bold">DDR5 32GB</text>
      </svg>
    ),
    quiz: [
      {
        question: "Why should you install RAM in dual-channel mode (e.g., placing two sticks in slots 2 and 4)?",
        options: [
          "It makes the RAM use less power",
          "It doubles the data bus width, significantly increasing communication speed with the CPU",
          "It increases the storage size of the SSD"
        ],
        answer: 1,
        explanation: "Dual-channel mode doubles the bandwidth of data transfer between the RAM and the CPU, boosting speed."
      }
    ]
  },
  {
    id: "ram_gskill_ddr5",
    name: "G.Skill Trident Z5 32GB DDR5 6000MHz",
    type: "RAM",
    manufacturer: "G.Skill",
    model: "Trident Z5",
    difficulty: "Intermediate",
    specs: {
      "Type": "DDR5",
      "Capacity": "32GB (2 x 16GB)",
      "Speed": "6000 MHz",
      "Voltage": "1.35V",
      "Form Factor": "DIMM"
    },
    description: "High-performance DDR5 kit tuned to the popular 6000MHz 'sweet spot' speed favored by AMD Ryzen and Intel builders alike.",
    purpose: "Provides class-leading memory bandwidth and low latency for gaming and productivity workloads.",
    howItWorks: "Ships with an XMP/EXPO profile that automatically configures the ideal speed, timings, and voltage with one BIOS setting.",
    whereItConnects: "Snaps into the Motherboard DIMM Slots, secured by clip locks on either end of the slot.",
    facts: "6000MHz is often called the DDR5 'sweet spot' for AMD Ryzen 7000/9000 CPUs, because it matches the CPU's internal memory controller ratio for the best efficiency.",
    mistakes: "Buying RAM rated far above the motherboard's official supported speed and expecting it to 'just work' at full speed without any BIOS tuning.",
    color: "from-amber-600 to-yellow-400",
    image: "/images/components/ram/gskill/trident-z5-ddr5-32gb.png",
    renderSvg: ramIcon(GSKILL_AMBER, "DDR5 32GB", 5),
    quiz: [
      {
        question: "What does an XMP/EXPO profile on a RAM kit do?",
        options: [
          "Physically overclocks the CPU",
          "Automatically configures the RAM's advertised speed, timings, and voltage with one BIOS setting",
          "Increases the RAM's storage capacity"
        ],
        answer: 1,
        explanation: "RAM ships running at a conservative default speed. Enabling the XMP (Intel) or EXPO (AMD) profile in BIOS applies the manufacturer's tested faster settings automatically."
      }
    ]
  },
  {
    id: "ram_ddr4",
    name: "Corsair Vengeance LPX 16GB DDR4 3200MHz",
    type: "RAM",
    manufacturer: "Corsair",
    model: "Vengeance LPX",
    difficulty: "Beginner",
    specs: {
      "Type": "DDR4",
      "Capacity": "16GB (2 x 8GB)",
      "Speed": "3200 MHz",
      "Voltage": "1.35V",
      "Form Factor": "DIMM"
    },
    description: "Reliable and high-performance DDR4 dual-channel RAM kit with black aluminum heat spreaders.",
    purpose: "Provides high-speed system memory for operating systems, games, and heavy software applications.",
    howItWorks: "Temporarily holds files required by active software. Much faster than SSDs/HDDs, but volatile (resets on power off).",
    whereItConnects: "Plugs into Motherboard DIMM Slots. Match notch on the stick with the key inside the slot.",
    facts: "DDR4 has been the standard memory form factor since 2014, known for its reliability and excellent power efficiency.",
    mistakes: "Failing to push the RAM stick down firmly until the side locking clips automatically snap shut with a click.",
    color: "from-pink-600 to-pink-400",
    image: "/images/components/ram/corsair/vengeance-lpx-ddr4-16gb.png",
    renderSvg: (className = "size-16") => (
      <svg className={className} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="5" y="35" width="90" height="30" rx="3" fill="#1C1917" stroke="#F43F5E" strokeWidth="2" />
        <rect x="15" y="42" width="8" height="16" fill="#44403C" />
        <rect x="28" y="42" width="8" height="16" fill="#44403C" />
        <rect x="41" y="42" width="8" height="16" fill="#44403C" />
        <rect x="54" y="42" width="8" height="16" fill="#44403C" />
        <rect x="67" y="42" width="8" height="16" fill="#44403C" />
        <rect x="80" y="42" width="8" height="16" fill="#44403C" />
        <line x1="5" y1="65" x2="95" y2="65" stroke="#FBBF24" strokeWidth="3" strokeDasharray="3 1" />
        <text x="35" y="52" fill="#FFFFFF" fontSize="5" fontWeight="bold">DDR4 16GB</text>
      </svg>
    ),
    quiz: [
      {
        question: "What happens to the data stored in RAM when you shut down the computer?",
        options: [
          "It is saved permanently to the drive",
          "It is completely lost because RAM is volatile memory",
          "It remains stored until you turn on the computer again"
        ],
        answer: 1,
        explanation: "RAM is volatile memory, meaning it requires electricity to keep data. Once power is off, all contents are wiped."
      }
    ]
  },
  {
    id: "ram_kingston_ddr4",
    name: "Kingston FURY Beast 16GB DDR4 3600MHz",
    type: "RAM",
    manufacturer: "Kingston",
    model: "FURY Beast",
    difficulty: "Beginner",
    specs: {
      "Type": "DDR4",
      "Capacity": "16GB (2 x 8GB)",
      "Speed": "3600 MHz",
      "Voltage": "1.35V",
      "Form Factor": "DIMM"
    },
    description: "A budget-friendly DDR4 kit with a low-profile heat spreader, great for tight case clearances near large CPU coolers.",
    purpose: "Provides solid everyday memory performance for budget gaming and productivity builds still using DDR4 platforms.",
    howItWorks: "Stores actively-used program data for fast CPU access, with the 3600MHz speed offering a noticeable step up over base 2133MHz DDR4.",
    whereItConnects: "Plugs into Motherboard DIMM Slots, aligned by the notch that matches the slot's key position.",
    facts: "Kingston's 'low-profile' heat spreader design helps the RAM fit under large tower air coolers that can overhang the first DIMM slot.",
    mistakes: "Buying tall, heatsink-heavy RAM modules without checking clearance against a large air cooler, causing a physical fitment conflict.",
    color: "from-red-700 to-red-500",
    image: "/images/components/ram/kingston/fury-beast-ddr4-16gb.png",
    renderSvg: ramIcon(KINGSTON_RED, "DDR4 16GB", 6),
    quiz: [
      {
        question: "Why might a builder specifically choose 'low-profile' RAM modules?",
        options: [
          "Low-profile RAM is always faster",
          "It avoids clearance conflicts with large tower-style CPU air coolers",
          "It uses less electricity than tall RAM"
        ],
        answer: 1,
        explanation: "Large air coolers can overhang the first RAM slot. Low-profile RAM has a shorter heat spreader, avoiding physical collisions with the cooler."
      }
    ]
  }
];
