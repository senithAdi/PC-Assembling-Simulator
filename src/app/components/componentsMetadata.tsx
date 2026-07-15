import React from "react";

export interface ComponentMetadata {
  id: string;
  name: string;
  type: string; // "CPU" | "Motherboard" | "RAM" | "GPU" | "PSU" | "SSD" | "HDD" | "Cooler" | "Case" | "Fan" | "Optical" | "Network" | "Sound" | "Paste" | "Cables"
  manufacturer: string;
  model: string;
  difficulty: "Beginner" | "Intermediate" | "Expert";
  specs: Record<string, string | number>;
  description: string;
  purpose: string;
  howItWorks: string;
  whereItConnects: string;
  facts: string;
  mistakes: string;
  color: string;
  renderSvg: (className?: string) => React.ReactNode;
  quiz: {
    question: string;
    options: string[];
    answer: number; // Index of correct option
    explanation: string;
  }[];
}

export const componentsRegistry: ComponentMetadata[] = [
  {
    id: "cpu_intel",
    name: "Intel Core i5-13600K",
    type: "CPU",
    manufacturer: "Intel",
    model: "Core i5-13600K",
    difficulty: "Beginner",
    specs: {
      "Cores": "14 (6 P-cores + 8 E-cores)",
      "Threads": 20,
      "Socket": "LGA1700",
      "Power Draw": 125, // Watts
      "Gen": "13th Gen",
      "Integrated Graphics": "Intel UHD 770"
    },
    description: "High-performance processor with LGA1700 socket, ideal for gaming and multitasking.",
    purpose: "The CPU (Central Processing Unit) is the 'brain' of the computer. It executes instructions, processes data, and coordinates all hardware components.",
    howItWorks: "It retrieves instructions from RAM, decodes them, performs arithmetic or logical operations, and writes the output back to memory millions of times per second.",
    whereItConnects: "Plugs directly into the Motherboard CPU Socket. Secured by a load lever bracket.",
    facts: "Modern CPUs contain billions of microscopic transistors etched onto a silicon die smaller than a postage stamp.",
    mistakes: "Touching the gold pads on the underside of the CPU, or placing it in the socket backwards, which bends the motherboard pins.",
    color: "from-blue-600 to-blue-400",
    renderSvg: (className = "size-16") => (
      <svg className={className} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="10" y="10" width="80" height="80" rx="6" fill="#1E293B" stroke="#3B82F6" strokeWidth="3" />
        <rect x="25" y="25" width="50" height="50" rx="3" fill="#64748B" stroke="#94A3B8" strokeWidth="2" />
        <circle cx="50" cy="50" r="12" fill="#E2E8F0" opacity="0.8" />
        <rect x="18" y="18" width="8" height="8" rx="1" fill="#D97706" />
        <line x1="12" y1="20" x2="12" y2="80" stroke="#F59E0B" strokeWidth="2" strokeDasharray="3 3" />
        <line x1="88" y1="20" x2="88" y2="80" stroke="#F59E0B" strokeWidth="2" strokeDasharray="3 3" />
        <line x1="20" y1="12" x2="80" y2="12" stroke="#F59E0B" strokeWidth="2" strokeDasharray="3 3" />
        <line x1="20" y1="88" x2="80" y2="88" stroke="#F59E0B" strokeWidth="2" strokeDasharray="3 3" />
        <text x="35" y="42" fill="#1E3A8A" fontSize="7" fontWeight="bold">Intel</text>
        <text x="33" y="65" fill="#0F172A" fontSize="5" fontWeight="bold">LGA1700</text>
      </svg>
    ),
    quiz: [
      {
        question: "What does the CPU socket type (e.g. LGA1700) determine?",
        options: [
          "The maximum size of RAM supported",
          "Physical compatibility with the motherboard socket",
          "The speed of the PCIe slots"
        ],
        answer: 1,
        explanation: "The socket type determines the physical layout and pin count, ensuring the CPU fits correctly into the motherboard socket without damage."
      }
    ]
  },
  {
    id: "cpu_amd",
    name: "AMD Ryzen 5 7600X",
    type: "CPU",
    manufacturer: "AMD",
    model: "Ryzen 5 7600X",
    difficulty: "Beginner",
    specs: {
      "Cores": "6",
      "Threads": 12,
      "Socket": "AM5",
      "Power Draw": 105, // Watts
      "Gen": "Zen 4",
      "Integrated Graphics": "Radeon Graphics"
    },
    description: "Next-gen processor based on the AM5 socket, utilizing high-efficiency Zen 4 architecture.",
    purpose: "Executes calculations, coordinates computer actions, and processes instructions for games and operating systems.",
    howItWorks: "It processes instructions in cycles (measured in GHz). Higher clock speeds mean faster execution for single programs.",
    whereItConnects: "Mounts inside the AM5 socket on the motherboard. Land Grid Array design with pins on the motherboard socket.",
    facts: "AMD's AM5 platform is their first desktop socket to use LGA (pins on motherboard) rather than PGA (pins on CPU).",
    mistakes: "Forgetting that AM5 motherboards only accept DDR5 RAM, and buying older DDR4 RAM by mistake.",
    color: "from-orange-600 to-orange-400",
    renderSvg: (className = "size-16") => (
      <svg className={className} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="10" y="10" width="80" height="80" rx="6" fill="#1E293B" stroke="#EA580C" strokeWidth="3" />
        <polygon points="50,22 78,50 50,78 22,50" fill="#475569" stroke="#94A3B8" strokeWidth="2" />
        <circle cx="50" cy="50" r="10" fill="#E2E8F0" />
        <line x1="12" y1="20" x2="12" y2="80" stroke="#F97316" strokeWidth="2" strokeDasharray="2 2" />
        <line x1="88" y1="20" x2="88" y2="80" stroke="#F97316" strokeWidth="2" strokeDasharray="2 2" />
        <text x="38" y="44" fill="#7C2D12" fontSize="8" fontWeight="bold">AMD</text>
        <text x="39" y="62" fill="#0F172A" fontSize="6" fontWeight="bold">AM5</text>
      </svg>
    ),
    quiz: [
      {
        question: "Which RAM type is strictly required by AMD Ryzen 7000 (AM5) processors?",
        options: [
          "DDR4 only",
          "DDR5 only",
          "Both DDR4 and DDR5"
        ],
        answer: 1,
        explanation: "AMD AM5 platform transitioned exclusively to DDR5 memory support for enhanced speed and performance."
      }
    ]
  },
  {
    id: "mobo_z790",
    name: "ASUS Prime Z790-A WiFi",
    type: "Motherboard",
    manufacturer: "ASUS",
    model: "Prime Z790-A",
    difficulty: "Intermediate",
    specs: {
      "Socket": "LGA1700",
      "RAM Support": "DDR5",
      "Max RAM": "128GB",
      "PCIe Version": "PCIe 5.0",
      "M.2 Slots": 4,
      "SATA Ports": 4,
      "Form Factor": "ATX"
    },
    description: "Premium ATX motherboard supporting Intel LGA1700 CPUs, DDR5 RAM, and high-speed PCIe 5.0 expansion.",
    purpose: "The Motherboard is the main circuit board. It connects the CPU, memory, hard drives, optical drives, video cards, and sound cards directly or via cables.",
    howItWorks: "It provides power distribution paths and communication tracks (buses) that route electric signals between all internal components.",
    whereItConnects: "Mounted inside the computer case using metal screws called standoffs.",
    facts: "A motherboard has layers (up to 10 or 12) of fiberglass and copper traces stacked together to create complex routing circuits.",
    mistakes: "Installing the motherboard directly onto the metal chassis without standoffs, which immediately short-circuits and destroys the board.",
    color: "from-indigo-900 to-indigo-700",
    renderSvg: (className = "size-16") => (
      <svg className={className} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="5" y="5" width="90" height="90" rx="4" fill="#0F172A" stroke="#4F46E5" strokeWidth="3" />
        <rect x="15" y="15" width="25" height="25" fill="#1E293B" stroke="#94A3B8" strokeWidth="2" />
        <line x1="50" y1="12" x2="50" y2="40" stroke="#475569" strokeWidth="4" strokeDasharray="2 2" />
        <line x1="58" y1="12" x2="58" y2="40" stroke="#475569" strokeWidth="4" strokeDasharray="2 2" />
        <rect x="15" y="50" width="70" height="8" fill="#1E293B" stroke="#6366F1" strokeWidth="2" />
        <circle cx="75" cy="25" r="8" fill="#D1D5DB" />
        <rect x="52" y="52" width="28" height="4" fill="#E2E8F0" />
        <text x="18" y="30" fill="#94A3B8" fontSize="5" fontWeight="bold">SOCKET</text>
        <text x="52" y="24" fill="#94A3B8" fontSize="4">DIMM</text>
        <text x="25" y="56" fill="#FFFFFF" fontSize="5" fontWeight="bold">PCIe x16</text>
      </svg>
    ),
    quiz: [
      {
        question: "Why must you install metal standoffs in the case before mounting the motherboard?",
        options: [
          "To keep the motherboard cool",
          "To prevent the motherboard from touching the metal case and causing a short circuit",
          "To make the case look prettier"
        ],
        answer: 1,
        explanation: "Standoffs raise the motherboard off the metal case body, preventing electrical components and solder joints on the back from shorting."
      }
    ]
  },
  {
    id: "mobo_b650",
    name: "MSI MAG B650 Tomahawk WiFi",
    type: "Motherboard",
    manufacturer: "MSI",
    model: "MAG B650 Tomahawk",
    difficulty: "Intermediate",
    specs: {
      "Socket": "AM5",
      "RAM Support": "DDR5",
      "Max RAM": "192GB",
      "PCIe Version": "PCIe 4.0",
      "M.2 Slots": 3,
      "SATA Ports": 6,
      "Form Factor": "ATX"
    },
    description: "Heavy-duty AM5 motherboard featuring durable heatsinks, AMD EXPO DDR5 support, and outstanding power delivery.",
    purpose: "Acts as the communication spine connecting AMD CPUs, high-speed RAM, graphics cards, and NVMe SSDs.",
    howItWorks: "Utilizes the AMD B650 chipset to manage data flow between the processor, SATA storage, USB ports, and network interfaces.",
    whereItConnects: "Mounted in the PC Case using screws. Connects to power supply via 24-pin ATX and dual 8-pin EPS connectors.",
    facts: "Tomahawk boards are named after military missiles, reflecting their design focus on extreme reliability and rugged aesthetics.",
    mistakes: "Using excessive force when locking down the CPU retention bracket, which could warp the socket.",
    color: "from-slate-800 to-slate-600",
    renderSvg: (className = "size-16") => (
      <svg className={className} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="5" y="5" width="90" height="90" rx="4" fill="#1C1917" stroke="#78716C" strokeWidth="3" />
        <rect x="15" y="15" width="25" height="25" fill="#292524" stroke="#D6D3D1" strokeWidth="2" />
        <line x1="52" y1="12" x2="52" y2="40" stroke="#44403C" strokeWidth="3" strokeDasharray="1 1" />
        <line x1="60" y1="12" x2="60" y2="40" stroke="#44403C" strokeWidth="3" strokeDasharray="1 1" />
        <rect x="15" y="50" width="70" height="8" fill="#292524" stroke="#78716C" strokeWidth="2" />
        <rect x="15" y="65" width="50" height="4" fill="#292524" stroke="#78716C" />
        <text x="19" y="30" fill="#D6D3D1" fontSize="5" fontWeight="bold">AM5</text>
        <text x="40" y="56" fill="#FFFFFF" fontSize="5" fontWeight="bold">PCIe</text>
      </svg>
    ),
    quiz: [
      {
        question: "What is the primary role of the motherboard chipset?",
        options: [
          "To render high-end graphics",
          "To control communications between the CPU, memory, and peripheral components",
          "To store permanently all user files and applications"
        ],
        answer: 1,
        explanation: "The chipset is the controller hub on the motherboard that manages data routes between the CPU and other devices."
      }
    ]
  },
  {
    id: "mobo_h610",
    name: "Gigabyte H610M H DDR4",
    type: "Motherboard",
    manufacturer: "Gigabyte",
    model: "H610M H",
    difficulty: "Beginner",
    specs: {
      "Socket": "LGA1700",
      "RAM Support": "DDR4",
      "Max RAM": "64GB",
      "PCIe Version": "PCIe 4.0",
      "M.2 Slots": 1,
      "SATA Ports": 4,
      "Form Factor": "Micro-ATX"
    },
    description: "Compact and budget-friendly Micro-ATX motherboard. Supports Intel LGA1700 CPUs and standard DDR4 RAM.",
    purpose: "Provides a compact, value-driven foundation for building budget-oriented office or gaming PCs.",
    howItWorks: "Leverages the H610 chipset. It supports basic overclocking and standard operations with fewer PCIe lanes.",
    whereItConnects: "Screws into a Micro-ATX or larger case. Ideal for small-form-factor builds.",
    facts: "Micro-ATX motherboards are smaller than ATX, usually measuring 9.6 x 9.6 inches compared to ATX's 12 x 9.6 inches.",
    mistakes: "Trying to install DDR5 RAM into its slots; DDR4 slots are physically keyed differently.",
    color: "from-cyan-900 to-cyan-700",
    renderSvg: (className = "size-16") => (
      <svg className={className} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="10" y="10" width="80" height="80" rx="4" fill="#0E1726" stroke="#06B6D4" strokeWidth="3" />
        <rect x="20" y="20" width="20" height="20" fill="#1C2333" stroke="#94A3B8" strokeWidth="2" />
        <line x1="50" y1="18" x2="50" y2="38" stroke="#334155" strokeWidth="3" />
        <line x1="56" y1="18" x2="56" y2="38" stroke="#334155" strokeWidth="3" />
        <rect x="20" y="55" width="60" height="6" fill="#1C2333" stroke="#06B6D4" />
        <text x="22" y="32" fill="#94A3B8" fontSize="4" fontWeight="bold">LGA1700</text>
        <text x="40" y="75" fill="#06B6D4" fontSize="4">mATX</text>
      </svg>
    ),
    quiz: [
      {
        question: "Can a DDR4 RAM stick fit into a DDR5 motherboard slot?",
        options: [
          "Yes, they are identical",
          "No, the notch in the gold contacts is in a different position",
          "Yes, if forced carefully"
        ],
        answer: 1,
        explanation: "DDR4 and DDR5 RAM sticks are physically keyed (notched) differently to prevent users from accidentally installing incompatible memory modules."
      }
    ]
  },
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
    id: "gpu_rtx4060",
    name: "NVIDIA RTX 4060 8GB",
    type: "GPU",
    manufacturer: "NVIDIA",
    model: "GeForce RTX 4060",
    difficulty: "Intermediate",
    specs: {
      "VRAM": "8GB GDDR6",
      "PCIe Version": "PCIe 4.0",
      "Power Draw": 115, // Watts
      "Length": 240, // mm
      "Required PSU": "550W"
    },
    description: "Efficient mid-range gaming GPU, supporting DLSS 3 and real-time Ray Tracing.",
    purpose: "The GPU (Graphics Processing Unit) renders visual outputs (3D assets, shadows, game environments) and outputs them to the monitor.",
    howItWorks: "It contains thousands of small processor cores designed to perform mathematical calculations in parallel, making it highly specialized for images and AI.",
    whereItConnects: "Plugs into the primary PCIe x16 Slot on the motherboard and screws into the rear case bracket slots.",
    facts: "NVIDIA RTX cards feature Tensor Cores designed to accelerate AI calculations and Ray Tracing Cores for realistic lighting.",
    mistakes: "Connecting the monitor cable into the Motherboard HDMI port rather than the GPU ports, resulting in poor frame rates.",
    color: "from-emerald-600 to-emerald-400",
    renderSvg: (className = "size-16") => (
      <svg className={className} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="5" y="25" width="90" height="50" rx="4" fill="#0F172A" stroke="#10B981" strokeWidth="2.5" />
        <circle cx="32" cy="50" r="14" fill="#1E293B" stroke="#64748B" strokeWidth="2" />
        <circle cx="68" cy="50" r="14" fill="#1E293B" stroke="#64748B" strokeWidth="2" />
        <line x1="32" y1="36" x2="32" y2="64" stroke="#94A3B8" />
        <line x1="18" y1="50" x2="46" y2="50" stroke="#94A3B8" />
        <line x1="68" y1="36" x2="68" y2="64" stroke="#94A3B8" />
        <line x1="54" y1="50" x2="82" y2="50" stroke="#94A3B8" />
        <rect x="25" y="75" width="50" height="3" fill="#D97706" />
        <text x="36" y="20" fill="#FFFFFF" fontSize="6" fontWeight="bold">NVIDIA RTX</text>
      </svg>
    ),
    quiz: [
      {
        question: "Where should your monitor's display cable (HDMI/DisplayPort) be connected?",
        options: [
          "The HDMI port on the motherboard back panel",
          "The ports directly on the Graphics Card (GPU)",
          "Any available USB port on the front of the case"
        ],
        answer: 1,
        explanation: "To utilize the processing power of the dedicated GPU, the display cable must plug directly into the GPU, not the motherboard."
      }
    ]
  },
  {
    id: "gpu_rtx4080",
    name: "NVIDIA RTX 4080 Super 16GB",
    type: "GPU",
    manufacturer: "NVIDIA",
    model: "GeForce RTX 4080 Super",
    difficulty: "Expert",
    specs: {
      "VRAM": "16GB GDDR6X",
      "PCIe Version": "PCIe 4.0",
      "Power Draw": 320, // Watts
      "Length": 310, // mm
      "Required PSU": "750W"
    },
    description: "High-end powerhouse GPU. Offers extreme 4K gaming performance, huge VRAM, and requires significant clearance.",
    purpose: "Delivers maximum graphics processing capacity for high-resolution 4K gaming, 3D modeling, and local machine learning tasks.",
    howItWorks: "Combines 16GB of rapid GDDR6X memory with high-wattage power draw to render complex, hyper-realistic game assets.",
    whereItConnects: "PCIe x16 Slot. Requires connecting the new 12VHPWR 16-pin power cable from the power supply.",
    facts: "The RTX 4080 Super requires a three-slot clearance on the back plate due to its massive cooling heatsink.",
    mistakes: "Using a weak 500W power supply, causing the PC to shut down under heavy workloads due to power overload.",
    color: "from-teal-600 to-teal-400",
    renderSvg: (className = "size-16") => (
      <svg className={className} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="5" y="20" width="90" height="60" rx="4" fill="#090D16" stroke="#14B8A6" strokeWidth="3" />
        <circle cx="30" cy="50" r="16" fill="#1F2937" stroke="#4B5563" strokeWidth="2.5" />
        <circle cx="70" cy="50" r="16" fill="#1F2937" stroke="#4B5563" strokeWidth="2.5" />
        <line x1="15" y1="80" x2="85" y2="80" stroke="#F59E0B" strokeWidth="4" />
        <text x="35" y="15" fill="#FFFFFF" fontSize="7" fontWeight="bold">RTX 4080 SUPER</text>
      </svg>
    ),
    quiz: [
      {
        question: "What happens if a GPU is physically longer than the case's maximum GPU clearance?",
        options: [
          "It will run at half speed",
          "It will not fit inside the case, blocked by drive bays or the front radiator mount",
          "It will require more power from the PSU"
        ],
        answer: 1,
        explanation: "Clearance is a physical dimension. If a card is too long, you will not be able to close the case or physically slot it into the motherboard."
      }
    ]
  },
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
    id: "ssd_m2",
    name: "Samsung 980 Pro 1TB M.2 NVMe SSD",
    type: "SSD",
    manufacturer: "Samsung",
    model: "980 Pro 1TB",
    difficulty: "Beginner",
    specs: {
      "Capacity": "1 TB",
      "Interface": "M.2 NVMe (PCIe Gen 4)",
      "Read Speed": "7000 MB/s",
      "Form Factor": "M.2 2280"
    },
    description: "Extremely fast solid-state storage. Plugs directly into motherboard M.2 slots, eliminating the need for cables.",
    purpose: "SSD (Solid State Drive) is non-volatile permanent storage. It stores the operating system, games, apps, and student files.",
    howItWorks: "It utilizes flash memory chips to store data. With no moving parts, it is incredibly fast compared to traditional HDDs.",
    whereItConnects: "Plugs directly into the Motherboard M.2 Slot at a 30-degree angle, pressed flat, and secured with a tiny screw or latch.",
    facts: "NVMe SSDs communicate directly with the CPU using PCIe lanes, allowing speeds up to 10-15 times faster than older SATA SSDs.",
    mistakes: "Forgetting to peel the protective plastic sticker off the motherboard's thermal M.2 pad before covering the SSD.",
    color: "from-sky-700 to-sky-500",
    renderSvg: (className = "size-16") => (
      <svg className={className} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="5" y="42" width="90" height="16" rx="1" fill="#0F172A" stroke="#0EA5E9" strokeWidth="1.5" />
        <rect x="12" y="45" width="12" height="10" fill="#334155" />
        <rect x="30" y="45" width="15" height="10" fill="#334155" />
        <rect x="50" y="45" width="15" height="10" fill="#334155" />
        <circle cx="85" cy="50" r="2.5" fill="#E2E8F0" stroke="#0F172A" />
        <line x1="5" y1="46" x2="5" y2="54" stroke="#FBBF24" strokeWidth="2.5" />
        <text x="68" y="52" fill="#FFFFFF" fontSize="3">980 PRO</text>
      </svg>
    ),
    quiz: [
      {
        question: "Why are NVMe M.2 SSDs preferred over SATA SSDs for operating system drives?",
        options: [
          "They are physically larger and easier to fit",
          "They connect directly to the CPU via PCIe, offering vastly superior read/write speeds",
          "They use standard power cables which are easier to run"
        ],
        answer: 1,
        explanation: "NVMe M.2 SSDs bypass slow SATA buses and connect to high-bandwidth PCIe slots, reducing boot times and file load speeds."
      }
    ]
  },
  {
    id: "ssd_sata",
    name: "Crucial MX500 1TB SATA 2.5\" SSD",
    type: "SSD",
    manufacturer: "Crucial",
    model: "MX500 2.5\"",
    difficulty: "Beginner",
    specs: {
      "Capacity": "1 TB",
      "Interface": "SATA III (6Gb/s)",
      "Read Speed": "560 MB/s",
      "Form Factor": "2.5 Inch"
    },
    description: "Reliable 2.5-inch SATA SSD. Great secondary storage option for gaming libraries and documents.",
    purpose: "Provides durable, silent permanent storage for computers without M.2 slots, or as extra drive capacity.",
    howItWorks: "Uses flash memory but connects via SATA cables, capping maximum speed at around 550-600 MB/s.",
    whereItConnects: "Mounted in the case's 2.5\" drive brackets. Requires a SATA data cable to the motherboard and a SATA power cable from the PSU.",
    facts: "2.5-inch SSDs are completely shock-resistant; dropping them will not damage the data inside unlike classic HDDs.",
    mistakes: "Forgetting that a 2.5\" SATA SSD requires two cables (Data and Power) to function, not just one.",
    color: "from-blue-800 to-blue-600",
    renderSvg: (className = "size-16") => (
      <svg className={className} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="20" y="20" width="60" height="60" rx="3" fill="#374151" stroke="#2563EB" strokeWidth="2.5" />
        <rect x="20" y="20" width="60" height="15" fill="#1F2937" />
        <circle cx="28" cy="28" r="2" fill="#10B981" />
        <text x="32" y="30" fill="#9CA3AF" fontSize="5" fontWeight="bold">SATA SSD</text>
        <line x1="30" y1="80" x2="45" y2="80" stroke="#FBBF24" strokeWidth="2" />
        <line x1="50" y1="80" x2="70" y2="80" stroke="#E5E7EB" strokeWidth="2" />
      </svg>
    ),
    quiz: [
      {
        question: "How many connections are required for a 2.5\" SATA SSD to function?",
        options: [
          "No cables (it plugs directly into the motherboard socket)",
          "One SATA Data cable only",
          "Two cables: one SATA Power from the PSU, and one SATA Data to the motherboard"
        ],
        answer: 2,
        explanation: "Unlike M.2 drives, 2.5\" SATA drives need individual lines for power (from PSU) and data transfer (to motherboard)."
      }
    ]
  },
  {
    id: "hdd_seagate",
    name: "Seagate BarraCuda 2TB HDD",
    type: "HDD",
    manufacturer: "Seagate",
    model: "BarraCuda 2TB",
    difficulty: "Beginner",
    specs: {
      "Capacity": "2 TB",
      "Interface": "SATA III (6Gb/s)",
      "RPM": 7200,
      "Cache": "256MB",
      "Form Factor": "3.5 Inch"
    },
    description: "High-capacity mechanical hard drive, perfect for storing large media archives and back-up files.",
    purpose: "The HDD (Hard Disk Drive) provides low-cost, high-capacity long-term storage.",
    howItWorks: "It stores data magnetically on spinning metal platters. A mechanical read/write arm hovers microns above the platter to read data.",
    whereItConnects: "Mounted in the 3.5\" drive cages inside the case. Connects using SATA data and SATA power cables.",
    facts: "7200 RPM means the magnetic disks inside spin at 7,200 revolutions per minute, which is 120 times every single second!",
    mistakes: "Installing the operating system on an HDD in a modern PC. It makes the system feel incredibly slow compared to using an SSD.",
    color: "from-lime-800 to-lime-600",
    renderSvg: (className = "size-16") => (
      <svg className={className} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="20" y="15" width="60" height="70" rx="4" fill="#4B5563" stroke="#84CC16" strokeWidth="3" />
        <circle cx="50" cy="45" r="22" fill="#9CA3AF" stroke="#D1D5DB" strokeWidth="2" />
        <circle cx="50" cy="45" r="4" fill="#374151" />
        <path d="M50,45 L35,68" stroke="#1F2937" strokeWidth="2.5" strokeLinecap="round" />
        <rect x="68" y="78" width="8" height="4" fill="#FBBF24" />
        <text x="25" y="80" fill="#E5E7EB" fontSize="5" fontWeight="bold">SEAGATE</text>
      </svg>
    ),
    quiz: [
      {
        question: "Why are mechanical HDDs slower than Solid State Drives (SSDs)?",
        options: [
          "They are physically heavier",
          "They rely on physical spinning platters and moving read/write heads, creating physical latency",
          "They cannot connect to the SATA ports"
        ],
        answer: 1,
        explanation: "Because HDDs have mechanical parts that must physically move to find data, they are limited by physics and are much slower than electronic flash SSDs."
      }
    ]
  },
  {
    id: "cooler_noctua",
    name: "Noctua NH-D15 Air Cooler",
    type: "Cooler",
    manufacturer: "Noctua",
    model: "NH-D15",
    difficulty: "Intermediate",
    specs: {
      "Type": "Dual-Tower Air Cooler",
      "Height": 165, // mm
      "Fan Size": "140 mm",
      "TDP Support": "220W+",
      "Compatible Sockets": "LGA1700, AM5, AM4"
    },
    description: "Premium dual-tower CPU air cooler. Features massive cooling capacity and quiet operations.",
    purpose: "The CPU Cooler dissipates the high heat generated by the processor, keeping it within safe operating temperatures.",
    howItWorks: "Heat transfers from CPU heat spreader into the copper baseplate, flows up heatpipes into aluminum fin towers, and is blown away by the fans.",
    whereItConnects: "Mounts directly over the CPU socket on the motherboard. Fan connects to the CPU_FAN header.",
    facts: "Noctua is famous for its iconic brown/tan color scheme and engineering focus on high-efficiency aerodynamic fans.",
    mistakes: "Leaving the transparent protective plastic cover on the bottom of the heatsink base before mounting it to the CPU.",
    color: "from-amber-800 to-amber-700",
    renderSvg: (className = "size-16") => (
      <svg className={className} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="20" y="15" width="60" height="25" fill="#94A3B8" stroke="#475569" strokeWidth="2" />
        <rect x="20" y="48" width="60" height="25" fill="#94A3B8" stroke="#475569" strokeWidth="2" />
        <circle cx="50" cy="44" r="16" fill="#78350F" opacity="0.8" />
        <line x1="50" y1="10" x2="50" y2="90" stroke="#1E293B" strokeWidth="3" />
        <text x="44" y="47" fill="#FFFFFF" fontSize="6" fontWeight="bold">140mm</text>
      </svg>
    ),
    quiz: [
      {
        question: "What is the critical step to do before installing the heatsink on top of the CPU?",
        options: [
          "Apply thermal paste to the CPU surface",
          "Wash the bottom of the cooler with water",
          "Turn on the computer to heat it up"
        ],
        answer: 0,
        explanation: "Thermal paste is required to fill microscopic air gaps between the CPU and cooler surfaces, ensuring efficient heat transfer."
      }
    ]
  },
  {
    id: "cooler_intel",
    name: "Intel Laminar RM1 Stock Cooler",
    type: "Cooler",
    manufacturer: "Intel",
    model: "Laminar RM1",
    difficulty: "Beginner",
    specs: {
      "Type": "Stock Low-Profile Air Cooler",
      "Height": 47, // mm
      "Fan Size": "80 mm",
      "TDP Support": "65W",
      "Compatible Sockets": "LGA1700"
    },
    description: "Standard boxed CPU cooler included with entry-level Intel processors. Low profile and easy to mount.",
    purpose: "Provides basic cooling for lower-power CPUs, keeping installation simple and cost-effective.",
    howItWorks: "Direct-contact aluminum core moves heat up to circular fins where a top-down fan pushes air through.",
    whereItConnects: "Secured using four push-pins that click directly into matching holes around the LGA1700 motherboard socket. Plugs into CPU_FAN.",
    facts: "Stock coolers usually come with pre-applied thermal paste on the bottom, simplifying assembly for beginners.",
    mistakes: "Using a stock cooler on high-end processors (like i7 or i9), causing the CPU to overheat and thermal throttle.",
    color: "from-blue-700 to-blue-500",
    renderSvg: (className = "size-16") => (
      <svg className={className} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="50" cy="50" r="35" fill="#334155" stroke="#3B82F6" strokeWidth="3" />
        <circle cx="50" cy="50" r="20" fill="#1E293B" />
        <line x1="50" y1="20" x2="50" y2="80" stroke="#94A3B8" strokeWidth="2.5" />
        <line x1="20" y1="50" x2="80" y2="50" stroke="#94A3B8" strokeWidth="2.5" />
        <text x="40" y="53" fill="#3B82F6" fontSize="8" fontWeight="bold">Intel</text>
      </svg>
    ),
    quiz: [
      {
        question: "Why should you avoid using a stock cooler with a high-end Intel Core i9 processor?",
        options: [
          "The cooler will draw too much electrical power",
          "High-end CPUs produce more heat than a stock cooler can dissipate, leading to thermal throttling",
          "The stock cooler cannot physically fit LGA1700 motherboards"
        ],
        answer: 1,
        explanation: "High-end CPUs generate massive heat under load. A stock cooler lacks the thermal dissipation capacity required, causing safety thermal throttling (slowdowns)."
      }
    ]
  },
  {
    id: "case_nzxt",
    name: "NZXT H510 Mid-Tower Case",
    type: "Case",
    manufacturer: "NZXT",
    model: "H510",
    difficulty: "Beginner",
    specs: {
      "Form Factor": "Mid-Tower ATX",
      "Motherboard Support": "ATX, Micro-ATX, Mini-ITX",
      "Max GPU Clearance": 325, // mm
      "Max Cooler Height": 165, // mm
      "Included Fans": 2
    },
    description: "Sleek mid-tower PC cabinet with a tempered glass side panel and a cable management bar.",
    purpose: "Houses, organizes, and protects all computer components. Directs cooling airflow and shields parts from dust.",
    howItWorks: "Provides mounting trays for motherboard, PSU, fans, and storage. Grounded chassis structure prevents electrostatic damage.",
    whereItConnects: "Sits on your desk. Everything else mounts inside it.",
    facts: "The H510 features a signature clean cable management bar that hides unsightly power wires running to the motherboard.",
    mistakes: "Buying an E-ATX (Extra Large) motherboard and finding out it won't physically fit into this ATX Mid-Tower case.",
    color: "from-violet-600 to-violet-500",
    renderSvg: (className = "size-16") => (
      <svg className={className} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="15" y="10" width="70" height="80" rx="3" fill="#18181B" stroke="#8B5CF6" strokeWidth="3" />
        <rect x="22" y="18" width="56" height="64" fill="#27272A" opacity="0.9" />
        <rect x="22" y="18" width="56" height="42" fill="#09090B" stroke="#4B5563" />
        <circle cx="70" cy="74" r="3" fill="#3B82F6" />
        <line x1="28" y1="14" x2="72" y2="14" stroke="#4B5563" strokeWidth="2" />
        <text x="26" y="30" fill="#FFFFFF" fontSize="5" fontWeight="bold">NZXT</text>
      </svg>
    ),
    quiz: [
      {
        question: "What motherboard sizes will physically fit inside an ATX Mid-Tower Case?",
        options: [
          "ATX, Micro-ATX, and Mini-ITX",
          "Only full-sized ATX motherboards",
          "Only E-ATX and server motherboards"
        ],
        answer: 0,
        explanation: "Case compatibility is backwards-compatible. A standard ATX case has screw standoffs and space for smaller Micro-ATX and Mini-ITX boards."
      }
    ]
  },
  {
    id: "case_corsair",
    name: "Corsair 4000D Airflow ATX Case",
    type: "Case",
    manufacturer: "Corsair",
    model: "4000D Airflow",
    difficulty: "Beginner",
    specs: {
      "Form Factor": "Mid-Tower ATX",
      "Motherboard Support": "ATX, Micro-ATX, Mini-ITX",
      "Max GPU Clearance": 360, // mm
      "Max Cooler Height": 170, // mm
      "Included Fans": 2
    },
    description: "Outstanding high-airflow mid-tower case featuring a triangular-grid front steel panel.",
    purpose: "Acts as the protective exterior shell of the computer, providing optimized high-ventilation paths.",
    howItWorks: "Triangular front ventilation panel allows front fans to pull massive amounts of cold air directly into the system.",
    whereItConnects: "Standalone chassis. Houses components, power supplies, and liquid cooling setups.",
    facts: "The 4000D contains Corsair's RapidRoute cable management system, which holds cables in a dedicated channel on the back.",
    mistakes: "Failing to clean the dust filters, causing air paths to plug and components to run hot.",
    color: "from-yellow-600 to-yellow-500",
    renderSvg: (className = "size-16") => (
      <svg className={className} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="15" y="10" width="70" height="80" rx="3" fill="#2D2D2D" stroke="#EAB308" strokeWidth="3" />
        <rect x="18" y="15" width="10" height="70" fill="#1A1A1A" stroke="#EAB308" />
        <rect x="34" y="18" width="46" height="50" fill="#141414" />
        <text x="38" y="32" fill="#EAB308" fontSize="4" fontWeight="bold">CORSAIR</text>
        <line x1="20" y1="20" x2="26" y2="20" stroke="#FFFFFF" />
        <line x1="20" y1="30" x2="26" y2="30" stroke="#FFFFFF" />
      </svg>
    ),
    quiz: [
      {
        question: "Why is a mesh front panel generally preferred over a solid glass front panel on a PC case?",
        options: [
          "It makes the PC lighter to carry",
          "It provides far superior airflow for intake fans, keeping components cooler",
          "It blocks all RGB lighting"
        ],
        answer: 1,
        explanation: "Mesh panels feature hundreds of small holes that allow intake fans to draw cool air directly, reducing thermal buildup."
      }
    ]
  },
  {
    id: "fan_case",
    name: "Corsair SP120 120mm Fan",
    type: "Fan",
    manufacturer: "Corsair",
    model: "SP120 PWM",
    difficulty: "Beginner",
    specs: {
      "Size": "120 mm",
      "Connector": "4-pin PWM",
      "Max Speed": "1500 RPM",
      "Airflow": "52 CFM"
    },
    description: "Standard 120mm cooling fan with Pulse Width Modulation (PWM) for dynamic speed control.",
    purpose: "Maintains optimal chassis temperatures by pulling cool air in (intake) or pushing hot air out (exhaust).",
    howItWorks: "Electric motor spins curved blades to create static pressure, forcing air directionally through the case.",
    whereItConnects: "Mounts onto designated case metal grids. Connects to Motherboard SYS_FAN or CHA_FAN headers.",
    facts: "Case fans have small arrows printed on their side frames indicating the direction of fan rotation and airflow.",
    mistakes: "Installing all fans facing inwards, resulting in high pressure, zero exhaust paths, and trapped hot air.",
    color: "from-neutral-700 to-neutral-500",
    renderSvg: (className = "size-16") => (
      <svg className={className} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="15" y="15" width="70" height="70" rx="4" fill="#1E293B" stroke="#64748B" strokeWidth="2.5" />
        <circle cx="50" cy="50" r="30" fill="#0F172A" stroke="#475569" />
        <circle cx="50" cy="50" r="8" fill="#64748B" />
        <path d="M50,42 C40,30 30,50 50,50 C70,50 60,70 50,58" fill="#475569" stroke="#64748B" />
        <path d="M42,50 C30,60 50,70 50,50 C50,30 70,40 58,50" fill="#475569" stroke="#64748B" />
      </svg>
    ),
    quiz: [
      {
        question: "How do you identify which direction a case fan will blow air?",
        options: [
          "It always blows towards the side with the brand logo sticker",
          "There are small molded arrows on the side of the plastic frame indicating airflow direction",
          "It blows air in both directions simultaneously"
        ],
        answer: 1,
        explanation: "Almost all PC cooling fans have tiny directional arrows on their plastic outer frames showing the spin direction and airflow direction."
      }
    ]
  },
  {
    id: "optical_asus",
    name: "ASUS 24X DVD Writer",
    type: "Optical",
    manufacturer: "ASUS",
    model: "DRW-24F1ST",
    difficulty: "Beginner",
    specs: {
      "Type": "Internal DVD/CD Burner",
      "Interface": "SATA",
      "Form Factor": "5.25 Inch"
    },
    description: "Classic 5.25\" internal optical drive for reading and writing CDs and DVDs.",
    purpose: "Allows reading and writing CD-ROM/DVD disks, used for old software installation, database backups, or media playback.",
    howItWorks: "Uses a semiconductor laser diode to scan microscopic pits on the reflective surface of a spinning optical disk.",
    whereItConnects: "Slides into the front 5.25\" drive bay of compatible cases. Connects via SATA data and SATA power cables.",
    facts: "Optical drives were standard in almost all PCs in the 2000s, but have been largely replaced by USB drives and high-speed internet.",
    mistakes: "Buying an optical drive for a modern case that has a solid mesh front panel with no 5.25\" drive slots.",
    color: "from-sky-900 to-sky-700",
    renderSvg: (className = "size-16") => (
      <svg className={className} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="10" y="25" width="80" height="50" rx="2" fill="#262626" stroke="#404040" strokeWidth="2.5" />
        <rect x="18" y="35" width="64" height="6" fill="#171717" />
        <circle cx="28" cy="55" r="3" fill="#D4D4D4" />
        <circle cx="72" cy="55" r="2" fill="#22C55E" />
        <text x="38" y="60" fill="#D4D4D4" fontSize="6" fontWeight="bold">ASUS DVD</text>
      </svg>
    ),
    quiz: [
      {
        question: "Why do most modern PC cases no longer feature optical drive bays?",
        options: [
          "Optical drives draw too much electricity",
          "Digital distribution (downloads) and USB flash drives have replaced CDs and DVDs",
          "Optical drives overheat the CPU"
        ],
        answer: 1,
        explanation: "With high-speed internet, cloud storage, and large USB flash drives, mechanical CD/DVD media is rarely used, allowing cases to prioritize airflow and liquid cooling space."
      }
    ]
  },
  {
    id: "net_tplink",
    name: "TP-Link PCIe Archer WiFi Card",
    type: "Network",
    manufacturer: "TP-Link",
    model: "Archer TX50E",
    difficulty: "Beginner",
    specs: {
      "Interface": "PCIe x1 Slot",
      "Standard": "WiFi 6 & Bluetooth 5.2",
      "Max Speed": "2402 Mbps"
    },
    description: "PCI Express wireless network adapter card, adding high-speed dual-band WiFi and Bluetooth to your motherboard.",
    purpose: "Enables the PC to connect to wireless home networks (WiFi) and wireless accessories (Bluetooth headphones, controllers).",
    howItWorks: "Decodes wireless radio frequencies from home routers into digital signals, sending them through the motherboard's PCIe bus to the CPU.",
    whereItConnects: "Plugs into a small PCIe x1 slot (or a larger x16 slot) on the motherboard. Antennas screw onto the rear bracket.",
    facts: "High-end motherboards often have WiFi chips built directly into their rear I/O, but expansion cards allow older boards to upgrade.",
    mistakes: "Forgetting to plug the card's included USB cable into a motherboard USB header, which is required for Bluetooth to function.",
    color: "from-blue-900 to-blue-700",
    renderSvg: (className = "size-16") => (
      <svg className={className} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="25" y="25" width="55" height="40" rx="2" fill="#065F46" stroke="#047857" strokeWidth="2" />
        <rect x="15" y="15" width="10" height="60" fill="#94A3B8" />
        <line x1="12" y1="12" x2="12" y2="78" stroke="#64748B" strokeWidth="2.5" />
        <rect x="35" y="32" width="20" height="20" fill="#374151" />
        <line x1="5" y1="20" x2="15" y2="20" stroke="#000000" strokeWidth="3" />
        <line x1="5" y1="30" x2="15" y2="30" stroke="#000000" strokeWidth="3" />
        <text x="38" y="44" fill="#FFFFFF" fontSize="4" fontWeight="bold">TP-LINK</text>
      </svg>
    ),
    quiz: [
      {
        question: "Which slot type is most commonly used for installing a wireless network card on a motherboard?",
        options: [
          "M.2 SSD Slot",
          "PCIe Slot (such as PCIe x1)",
          "SATA Port"
        ],
        answer: 1,
        explanation: "Expansion cards like dedicated sound and WiFi adapters plug into the motherboard's PCIe expansion slots (commonly PCIe x1)."
      }
    ]
  },
  {
    id: "sound_creative",
    name: "Creative Sound Blaster PCIe Card",
    type: "Sound",
    manufacturer: "Creative",
    model: "Sound Blaster Audigy",
    difficulty: "Beginner",
    specs: {
      "Interface": "PCIe x1 Slot",
      "Audio Quality": "24-bit / 192KHz",
      "Channels": "5.1 Surround Sound"
    },
    description: "Dedicated audio card offering cinematic surround sound, high-fidelity audio output, and clean microphone recordings.",
    purpose: "Processes and amplifies audio signals, providing superior sound output for studio headphones and professional microphones.",
    howItWorks: "Uses a dedicated digital-to-analog converter (DAC) chip to process audio signals, shielding the output from internal electrical noise.",
    whereItConnects: "Plugs into any available PCIe slot (usually PCIe x1) on the motherboard.",
    facts: "Dedicated sound cards help prevent electrical buzz or static noise caused by high-power components like GPUs.",
    mistakes: "Installing a sound card directly underneath a massive graphics card, blocking the GPU fans and causing high temps.",
    color: "from-rose-900 to-rose-700",
    renderSvg: (className = "size-16") => (
      <svg className={className} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="25" y="25" width="55" height="40" rx="2" fill="#1C1917" stroke="#DC2626" strokeWidth="2" />
        <rect x="15" y="15" width="10" height="60" fill="#94A3B8" />
        <circle cx="10" cy="22" r="2.5" fill="#3B82F6" />
        <circle cx="10" cy="30" r="2.5" fill="#EF4444" />
        <circle cx="10" cy="38" r="2.5" fill="#10B981" />
        <text x="35" y="44" fill="#EF4444" fontSize="4" fontWeight="bold">SOUND</text>
      </svg>
    ),
    quiz: [
      {
        question: "What is a main benefit of using a dedicated sound card instead of standard motherboard audio?",
        options: [
          "It makes the computer boot up faster",
          "It provides isolation from motherboard electrical interference, resulting in cleaner, high-fidelity audio",
          "It runs all games at higher frames per second"
        ],
        answer: 1,
        explanation: "Motherboards have complex electrical components that generate radio noise. A dedicated sound card shields its DAC, reducing buzz and delivering purer audio."
      }
    ]
  },
  {
    id: "paste_arctic",
    name: "Arctic MX-6 Thermal Paste",
    type: "Paste",
    manufacturer: "Arctic",
    model: "MX-6",
    difficulty: "Beginner",
    specs: {
      "Type": "Non-Conductive Carbon Paste",
      "Viscosity": "45,000 Poise",
      "Weight": "4 Grams"
    },
    description: "High-thermal-conductivity compound. Essential for maximizing heat transfer from CPU to heatsink.",
    purpose: "Fills microscopic air gaps and scratches between the CPU lid and cooler baseplate. Air is a poor conductor of heat; thermal paste conducts heat effectively.",
    howItWorks: "Fills empty spaces with dense, heat-conductive paste, creating a solid thermal bridge between components.",
    whereItConnects: "Applied directly on the metallic top center surface of the CPU lid before attaching the cooler.",
    facts: "Thermal paste does not act as glue. The heatsink is held in place by metal brackets, not by the paste itself.",
    mistakes: "Applying an entire syringe of paste at once, which oozes down onto the motherboard and makes a massive mess.",
    color: "from-teal-800 to-teal-600",
    renderSvg: (className = "size-16") => (
      <svg className={className} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
        <line x1="10" y1="50" x2="80" y2="50" stroke="#475569" strokeWidth="8" strokeLinecap="round" />
        <line x1="80" y1="50" x2="90" y2="50" stroke="#94A3B8" strokeWidth="3" strokeLinecap="round" />
        <rect x="25" y="44" width="30" height="12" fill="#06B6D4" rx="1" />
        <line x1="8" y1="42" x2="8" y2="58" stroke="#1E293B" strokeWidth="3" />
        <text x="30" y="52" fill="#FFFFFF" fontSize="4" fontWeight="bold">MX-6</text>
      </svg>
    ),
    quiz: [
      {
        question: "What is the primary function of thermal paste?",
        options: [
          "To permanently glue the cooler onto the processor",
          "To seal the socket and prevent dust from getting under the CPU pins",
          "To fill microscopic air gaps between the CPU and cooler, maximizing heat conductivity"
        ],
        answer: 2,
        explanation: "Metal surfaces look smooth to the eye but have microscopic ridges. Thermal paste fills these air pockets, improving cooling efficiency."
      }
    ]
  },
  {
    id: "cables_generic",
    name: "Braided Power & Data Cable Kit",
    type: "Cables",
    manufacturer: "Premium",
    model: "SATA & PSU Extension Kit",
    difficulty: "Intermediate",
    specs: {
      "Included Cables": "24-pin ATX, 8-pin CPU, SATA Power, SATA Data",
      "Sleeve Material": "High-Density Braided Nylon",
      "Colors": "Carbon Black"
    },
    description: "Set of standard power and data cables required to connect the power supply and storage drives to the motherboard.",
    purpose: "Cables route electrical power from the PSU to the Motherboard/GPU, and transmit digital data between storage drives and the SATA ports.",
    howItWorks: "Copper wires inside insulated protective sleeves conduct high-speed digital signals and electrical currents.",
    whereItConnects: "24-pin plugs into the motherboard side. 8-pin plugs into top motherboard. SATA data plugs motherboard to SSD/HDD/Optical.",
    facts: "Modern SATA III data cables have locking metal latches on the connectors to prevent them from slipping out due to fan vibrations.",
    mistakes: "Forgetting to connect the CPU 8-pin power cable at the top-left of the motherboard, which will result in the fans spinning but the computer refusing to boot.",
    color: "from-zinc-900 to-zinc-700",
    renderSvg: (className = "size-16") => (
      <svg className={className} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M10,30 Q30,60 50,30 T90,30" fill="none" stroke="#27272A" strokeWidth="4" />
        <path d="M10,40 Q30,70 50,40 T90,40" fill="none" stroke="#52525B" strokeWidth="3" />
        <rect x="5" y="25" width="10" height="18" fill="#18181B" rx="1" />
        <rect x="85" y="25" width="10" height="18" fill="#18181B" rx="1" />
        <text x="35" y="22" fill="#E4E4E7" fontSize="5" fontWeight="bold">CABLE KIT</text>
      </svg>
    ),
    quiz: [
      {
        question: "What will happen if you connect all storage SATA drives but forget to plug in the motherboard's main 24-pin ATX power cable?",
        options: [
          "The computer will run slower",
          "The computer will not receive any main power and will fail to turn on at all",
          "The GPU will take over and power the system"
        ],
        answer: 1,
        explanation: "The 24-pin ATX cable is the main power connector for the motherboard. Without it, the board receives no electricity and the PC remains dead."
      }
    ]
  }
];

export interface BuildScenario {
  id: string;
  title: string;
  description: string;
  difficulty: "Beginner" | "Intermediate" | "Expert";
  objectives: string[];
  validators: (components: Record<string, ComponentMetadata>) => { passed: boolean; reason?: string };
}

export const buildScenarios: BuildScenario[] = [
  {
    id: "office",
    title: "Budget Office PC",
    description: "Build an affordable, quiet, and power-efficient computer for school work and typing documents. The client has a tight budget and does not need dedicated graphics.",
    difficulty: "Beginner",
    objectives: [
      "Must have integrated graphics (No dedicated GPU needed)",
      "Uses a Micro-ATX motherboard to fit smaller desks",
      "Has a low-profile CPU cooler",
      "Power consumption is low (500W PSU is perfect)"
    ],
    validators: (components) => {
      const cpu = components.CPU;
      const mobo = components.Motherboard;
      const ram = components.RAM;
      const ssd = components.SSD;
      const psu = components.PSU;
      const cooler = components.Cooler;

      if (!cpu) return { passed: false, reason: "CPU is missing." };
      if (!mobo) return { passed: false, reason: "Motherboard is missing." };
      if (!ram) return { passed: false, reason: "RAM is missing." };
      if (!ssd && !components.HDD) return { passed: false, reason: "Storage (SSD/HDD) is missing." };
      if (!psu) return { passed: false, reason: "Power Supply (PSU) is missing." };

      if (components.GPU && components.GPU.id !== "integrated") {
        return { passed: false, reason: "Scenario specifies no dedicated GPU. This is an office PC!" };
      }
      if (mobo.specs["Form Factor"] !== "Micro-ATX") {
        return { passed: false, reason: "Choose a Micro-ATX motherboard for small office workspace compliance." };
      }
      if (cooler && cooler.id !== "cooler_intel") {
        return { passed: false, reason: "The Noctua NH-D15 is overkill and too expensive. Use the stock cooler." };
      }
      if (psu.specs["Wattage"] > 500) {
        return { passed: false, reason: "A 750W PSU is overkill. Use the 500W power supply." };
      }

      return { passed: true };
    }
  },
  {
    id: "gaming",
    title: "High-Performance Gaming PC",
    description: "Assemble a premium gaming rig capable of running modern games at high refresh rates. Requires high-end graphics and strong cooling capacity.",
    difficulty: "Intermediate",
    objectives: [
      "Requires a dedicated graphics card (NVIDIA RTX)",
      "Requires at least 32GB of modern DDR5 RAM",
      "Motherboard must support PCIe 5.0 or high-speed bandwidth",
      "Sufficient power supply (at least 750W PSU)",
      "High-airflow case to prevent overheating"
    ],
    validators: (components) => {
      const cpu = components.CPU;
      const mobo = components.Motherboard;
      const ram = components.RAM;
      const gpu = components.GPU;
      const psu = components.PSU;
      const cooler = components.Cooler;
      const cs = components.Case;

      if (!cpu) return { passed: false, reason: "CPU is missing." };
      if (!mobo) return { passed: false, reason: "Motherboard is missing." };
      if (!ram) return { passed: false, reason: "RAM is missing." };
      if (!gpu) return { passed: false, reason: "Dedicated GPU is missing." };
      if (!psu) return { passed: false, reason: "Power Supply (PSU) is missing." };
      if (!cooler) return { passed: false, reason: "CPU Cooler is missing." };

      if (ram.specs["Type"] !== "DDR5") {
        return { passed: false, reason: "Modern gaming requires fast DDR5 RAM. DDR4 is too slow for this build!" };
      }
      if (psu.specs["Wattage"] < 750) {
        return { passed: false, reason: "A 500W PSU is too weak for a high-end gaming GPU. Use the 750W power supply." };
      }
      if (cooler.id !== "cooler_noctua") {
        return { passed: false, reason: "The Intel stock cooler is insufficient for a gaming CPU. Use the dual-tower Noctua cooler." };
      }
      if (cs && cs.id !== "case_corsair") {
        return { passed: false, reason: "Gaming rigs require high airflow. Choose the Corsair Airflow case." };
      }

      return { passed: true };
    }
  },
  {
    id: "workstation",
    title: "AI & 3D Workstation",
    description: "Build a processing workstation for training deep learning models and compiling 3D rendering projects. Requires massive CPU cores, VRAM, and fast NVMe storage.",
    difficulty: "Expert",
    objectives: [
      "Maximum VRAM GPU (RTX 4080 Super with 16GB VRAM)",
      "High-speed NVMe M.2 SSD storage",
      "32GB of DDR5 RAM",
      "Liquid-cooling style tower CPU cooler",
      "At least 750W PSU"
    ],
    validators: (components) => {
      const cpu = components.CPU;
      const mobo = components.Motherboard;
      const ram = components.RAM;
      const gpu = components.GPU;
      const ssd = components.SSD;
      const psu = components.PSU;
      const cooler = components.Cooler;

      if (!cpu) return { passed: false, reason: "CPU is missing." };
      if (!mobo) return { passed: false, reason: "Motherboard is missing." };
      if (!ram) return { passed: false, reason: "RAM is missing." };
      if (!gpu) return { passed: false, reason: "GPU is missing." };
      if (!ssd) return { passed: false, reason: "M.2 NVMe SSD is missing." };
      if (!psu) return { passed: false, reason: "Power Supply (PSU) is missing." };

      if (gpu.id !== "gpu_rtx4080") {
        return { passed: false, reason: "Workstation tasks need at least 16GB of VRAM. The RTX 4080 Super is required!" };
      }
      if (ram.specs["Type"] !== "DDR5" || ram.specs["Capacity"] !== "32GB (2 x 16GB)") {
        return { passed: false, reason: "Requires 32GB of high-speed DDR5 memory." };
      }
      if (ssd.specs["Interface"] !== "M.2 NVMe (PCIe Gen 4)") {
        return { passed: false, reason: "SATA storage is too slow for compiling files. Use the M.2 NVMe SSD." };
      }
      if (psu.specs["Wattage"] < 750) {
        return { passed: false, reason: "The RTX 4080 Super requires a massive 750W+ PSU to prevent crashes under load." };
      }

      return { passed: true };
    }
  }
];
