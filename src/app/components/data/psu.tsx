import { ComponentMetadata } from "./types";
import { psuIcon } from "./iconTemplates";

const MSI_RED = "#DC2626";

export const psuComponents: ComponentMetadata[] = [
  {
    id: "psu_500w",
    name: "EVGA 500 W1 500W",
    type: "PSU",
    manufacturer: "EVGA",
    model: "500 W1",
    difficulty: "Intermediate",
    specs: {
      "Wattage": 500,
      "Efficiency": "80 Plus White",
      "Modular": "Non-Modular",
      "Form Factor": "ATX"
    },
    description: "Compact 500W power supply, ideal for budget office computers and entry-level graphics configurations.",
    purpose: "The PSU (Power Supply Unit) converts high-voltage alternating current (AC) power from the wall outlet into regulated direct current (DC) power for all internal components.",
    howItWorks: "Filters and steps down high-voltage utility power into stable +3.3V, +5V, and +12V electrical rails.",
    whereItConnects: "Mounted in the designated PSU chamber at the bottom or top of the case. Connects cables to motherboard and drive power ports.",
    facts: "Non-modular PSUs have all cables permanently soldered inside. Unused cables must be tucked away neatly in the case.",
    mistakes: "Buying a generic, uncertified power supply, which can fail under stress and destroy other expensive hardware.",
    color: "from-zinc-700 to-zinc-500",
    image: "/images/components/500-w1.png",
    renderSvg: (className = "size-16") => (
      <svg className={className} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="15" y="15" width="70" height="70" rx="5" fill="#18181B" stroke="#71717A" strokeWidth="3" />
        <circle cx="50" cy="50" r="22" fill="#27272A" stroke="#52525B" strokeWidth="2" />
        <line x1="35" y1="35" x2="65" y2="65" stroke="#71717A" strokeWidth="2" />
        <line x1="65" y1="35" x2="35" y2="65" stroke="#71717A" strokeWidth="2" />
        <rect x="75" y="65" width="15" height="15" rx="2" fill="#E4E4E7" />
        <text x="25" y="30" fill="#22C55E" fontSize="5" fontWeight="bold">500W</text>
      </svg>
    ),
    quiz: [
      {
        question: "What is a main disadvantage of a non-modular power supply?",
        options: [
          "It has lower electrical efficiency",
          "Unused cables cannot be detached, cluttering the case and blocking airflow",
          "It does not support modern CPUs"
        ],
        answer: 1,
        explanation: "Non-modular PSUs have all cables pre-attached. Unused cables cannot be removed, which makes cable management harder."
      }
    ]
  },
  {
    id: "psu_msi_650",
    name: "MSI MAG A650BN 650W",
    type: "PSU",
    manufacturer: "MSI",
    model: "MAG A650BN",
    difficulty: "Intermediate",
    specs: {
      "Wattage": 650,
      "Efficiency": "80 Plus Bronze",
      "Modular": "Non-Modular",
      "Form Factor": "ATX"
    },
    description: "A dependable mid-wattage power supply with 80 Plus Bronze efficiency, suited to mainstream gaming builds.",
    purpose: "Supplies enough stable power for a mid-range CPU and GPU combination without overspending on unnecessary wattage.",
    howItWorks: "Converts AC wall power into clean DC voltage rails, with Bronze-rated internals kept efficient even under sustained gaming loads.",
    whereItConnects: "Mounted in the case's PSU bay with screws. Delivers power to the motherboard, GPU, and drives via built-in cables.",
    facts: "80 Plus Bronze certification guarantees at least 82% efficiency at typical load, meaning less wasted heat than an uncertified unit.",
    mistakes: "Pairing a 650W Bronze unit with a power-hungry flagship GPU that actually needs an 850W+ supply, causing instability under full load.",
    color: "from-red-800 to-red-600",
    image: "/images/components/mag-a650bn.png",
    renderSvg: psuIcon(MSI_RED, "650W"),
    quiz: [
      {
        question: "What does an 80 Plus Bronze certification guarantee about a power supply?",
        options: [
          "It is physically painted bronze",
          "It maintains at least roughly 82% power efficiency at typical loads",
          "It only works with bronze-colored cases"
        ],
        answer: 1,
        explanation: "80 Plus ratings (White, Bronze, Silver, Gold, Platinum, Titanium) measure efficiency tiers; Bronze guarantees a solid baseline of about 82%+ efficiency."
      }
    ]
  },
  {
    id: "psu_750w",
    name: "Corsair RM750x 750W",
    type: "PSU",
    manufacturer: "Corsair",
    model: "RM750x",
    difficulty: "Intermediate",
    specs: {
      "Wattage": 750,
      "Efficiency": "80 Plus Gold",
      "Modular": "Fully Modular",
      "Form Factor": "ATX"
    },
    description: "Quiet and efficient 750W power supply, featuring fully modular flat cables and 80 Plus Gold certification.",
    purpose: "Provides reliable and clean power for gaming rigs and productivity workstations with dedicated graphics cards.",
    howItWorks: "Fully modular design lets you plug in only the specific power cables your components need, simplifying building.",
    whereItConnects: "Case PSU shroud, secured with 4 screws. Connects to Motherboard, GPU, and SATA drives via individual modular cables.",
    facts: "80 Plus Gold certification guarantees the PSU operates at a minimum of 80% to 90% efficiency under various workloads.",
    mistakes: "Using modular cables from a different PSU model, which can have different pinouts and instantly fry your hardware.",
    color: "from-amber-600 to-amber-500",
    image: "/images/components/rm750x.png",
    renderSvg: (className = "size-16") => (
      <svg className={className} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="15" y="15" width="70" height="70" rx="5" fill="#18181B" stroke="#D97706" strokeWidth="3" />
        <circle cx="50" cy="50" r="22" fill="#27272A" stroke="#D97706" strokeWidth="2" />
        <rect x="22" y="22" width="6" height="6" fill="#FBBF24" />
        <text x="35" y="80" fill="#FBBF24" fontSize="5" fontWeight="bold">RM750X GOLD</text>
        <circle cx="50" cy="50" r="14" fill="#09090B" />
      </svg>
    ),
    quiz: [
      {
        question: "What does an '80 Plus Gold' rating indicate about a power supply?",
        options: [
          "It is physically plated with real gold highlights",
          "It converts wall power to computer power with at least 87% to 90% efficiency",
          "It can only be used on motherboard gold tracks"
        ],
        answer: 1,
        explanation: "The 80 Plus rating system measures the efficiency of power conversion. Gold indicates high efficiency, reducing waste heat and electrical bills."
      }
    ]
  },
  {
    id: "psu_evga_850",
    name: "EVGA SuperNOVA 850 GT 850W",
    type: "PSU",
    manufacturer: "EVGA",
    model: "SuperNOVA 850 GT",
    difficulty: "Expert",
    specs: {
      "Wattage": 850,
      "Efficiency": "80 Plus Gold",
      "Modular": "Fully Modular",
      "Form Factor": "ATX"
    },
    description: "A high-wattage fully modular PSU built to comfortably power flagship CPU and GPU combinations.",
    purpose: "Provides the headroom needed for power-hungry high-end builds, like a top-tier CPU paired with a flagship GPU.",
    howItWorks: "High-quality internal components regulate large amounts of power smoothly, even during sudden spikes from a demanding GPU.",
    whereItConnects: "Mounted in the case's PSU bay. Fully modular cables connect individually to the motherboard, CPU, GPU, and storage drives.",
    facts: "High-wattage PSUs are actually most efficient when run at around 50% of their rated load, which is why enthusiasts often size up rather than cut it close.",
    mistakes: "Assuming a bigger wattage number always means more noise or wasted power — a quality high-wattage PSU run below its limit is often quieter and more efficient than a maxed-out smaller one.",
    color: "from-zinc-800 to-amber-600",
    image: "/images/components/supernova-850-gt.png",
    renderSvg: psuIcon("#F59E0B", "850W"),
    quiz: [
      {
        question: "Why might an enthusiast choose an 850W PSU even for a system that only draws around 500W under load?",
        options: [
          "PSUs are most efficient and run coolest around 50% load, and it leaves headroom for future upgrades",
          "Higher wattage PSUs are always required by law",
          "It makes the RGB lighting brighter"
        ],
        answer: 0,
        explanation: "Power supplies run most efficiently near the middle of their rated capacity, and extra headroom protects against power spikes and allows for future GPU upgrades."
      }
    ]
  }
];
