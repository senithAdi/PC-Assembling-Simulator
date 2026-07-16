import { ComponentMetadata } from "./types";
import { moboIcon } from "./iconTemplates";

const ASUS_INDIGO = "#4F46E5";
const MSI_RED = "#DC2626";
const GIGABYTE_ORANGE = "#F97316";

export const motherboardComponents: ComponentMetadata[] = [
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
    image: "/images/components/motherboard/asus/prime-z790-a.png",
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
    id: "mobo_asus_b650e",
    name: "ASUS ROG Strix B650E-F Gaming WiFi",
    type: "Motherboard",
    manufacturer: "ASUS",
    model: "ROG Strix B650E-F",
    difficulty: "Intermediate",
    specs: {
      "Socket": "AM5",
      "RAM Support": "DDR5",
      "Max RAM": "128GB",
      "PCIe Version": "PCIe 5.0",
      "M.2 Slots": 4,
      "SATA Ports": 4,
      "Form Factor": "ATX"
    },
    description: "Gaming-focused AM5 motherboard with reinforced PCIe slots and strong power delivery for high-end Ryzen builds.",
    purpose: "Pairs modern AMD Ryzen CPUs with fast DDR5 memory and PCIe 5.0 expansion for enthusiast gaming rigs.",
    howItWorks: "The B650E chipset manages high-speed data traffic between the CPU, storage, and PCIe devices while ASUS's power stages keep voltage stable under load.",
    whereItConnects: "Mounted in the case using standoffs. Connects to the PSU via 24-pin ATX and 8-pin EPS CPU power connectors.",
    facts: "The 'E' in B650E signals that the chipset supports full PCIe 5.0 bandwidth on both the M.2 slot and graphics slot, unlike the base B650 chipset.",
    mistakes: "Confusing B650 and B650E boards — only 'E' boards guarantee PCIe 5.0 speeds on the primary GPU slot.",
    color: "from-indigo-800 to-violet-600",
    image: "/images/components/motherboard/asus/rog-strix-b650e-f.png",
    renderSvg: moboIcon(ASUS_INDIGO, "AM5"),
    quiz: [
      {
        question: "What does the 'E' suffix mean on an AMD B650E motherboard?",
        options: [
          "It is an entry-level, cheaper version of the board",
          "It guarantees full PCIe 5.0 bandwidth support on key slots",
          "It only works with Intel CPUs"
        ],
        answer: 1,
        explanation: "AMD's naming convention uses 'E' to mark chipsets that support the full PCIe 5.0 standard, while boards without it may be limited to PCIe 4.0 speeds."
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
    image: "/images/components/motherboard/msi/mag-b650-tomahawk.png",
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
    id: "mobo_gigabyte_b650",
    name: "Gigabyte B650 AORUS Elite AX",
    type: "Motherboard",
    manufacturer: "Gigabyte",
    model: "B650 AORUS Elite AX",
    difficulty: "Intermediate",
    specs: {
      "Socket": "AM5",
      "RAM Support": "DDR5",
      "Max RAM": "128GB",
      "PCIe Version": "PCIe 4.0",
      "M.2 Slots": 3,
      "SATA Ports": 4,
      "Form Factor": "ATX"
    },
    description: "A well-rounded AM5 board with built-in WiFi 6E, twin M.2 heatsinks, and a stylish AORUS design.",
    purpose: "Balances price and features for mainstream Ryzen gaming builds, including fast wireless networking out of the box.",
    howItWorks: "The B650 chipset routes data between the CPU and expansion devices, while onboard WiFi 6E hardware handles wireless networking directly.",
    whereItConnects: "Mounted in the case with standoffs. The antenna bracket for WiFi screws onto the rear I/O panel.",
    facts: "Built-in WiFi 6E support means the board can use the newer 6GHz wireless band, which has far less interference than older 2.4GHz and 5GHz bands.",
    mistakes: "Forgetting to screw on the included WiFi antenna before powering on, resulting in weak or no wireless signal.",
    color: "from-orange-900 to-amber-700",
    image: "/images/components/motherboard/gigabyte/b650-aorus-elite-ax.png",
    renderSvg: moboIcon(GIGABYTE_ORANGE, "AM5"),
    quiz: [
      {
        question: "What advantage does the 6GHz WiFi 6E band have over the older 2.4GHz and 5GHz bands?",
        options: [
          "It uses less electricity",
          "It has significantly less interference from other devices",
          "It only works with Gigabyte motherboards"
        ],
        answer: 1,
        explanation: "The 6GHz band is newer and far less crowded than 2.4GHz/5GHz, so WiFi 6E devices experience less interference and often faster, more stable connections."
      }
    ]
  },
  {
    id: "mobo_msi_z690",
    name: "MSI PRO Z690-A WiFi",
    type: "Motherboard",
    manufacturer: "MSI",
    model: "PRO Z690-A",
    difficulty: "Intermediate",
    specs: {
      "Socket": "LGA1700",
      "RAM Support": "DDR5",
      "Max RAM": "128GB",
      "PCIe Version": "PCIe 5.0",
      "M.2 Slots": 4,
      "SATA Ports": 6,
      "Form Factor": "ATX"
    },
    description: "A reliable Intel Z690 chipset board offering full CPU overclocking support and DDR5 memory compatibility.",
    purpose: "Provides a flexible platform for Intel 12th, 13th, and 14th Gen CPUs, letting builders choose K-series overclockable chips.",
    howItWorks: "The Z-series chipset unlocks CPU multiplier overclocking and provides more PCIe lanes than budget H- or B-series boards.",
    whereItConnects: "Mounted in the case using standoffs. The 24-pin and 8-pin EPS connectors deliver power from the PSU.",
    facts: "Only motherboards with a 'Z' chipset (like Z690 or Z790) allow overclocking unlocked 'K' series Intel CPUs — B- and H-series boards lock the multiplier.",
    mistakes: "Buying a 'K' series unlocked CPU and pairing it with a budget H610 board, which cannot actually overclock it.",
    color: "from-red-950 to-red-700",
    image: "/images/components/motherboard/msi/pro-z690-a.png",
    renderSvg: moboIcon(MSI_RED, "LGA1700"),
    quiz: [
      {
        question: "Why would a builder specifically choose a Z-series Intel motherboard chipset instead of a cheaper H- or B-series board?",
        options: [
          "Z-series boards are required just to power on any CPU",
          "Only Z-series chipsets unlock CPU overclocking on unlocked 'K' series CPUs",
          "Z-series boards use a completely different, incompatible socket"
        ],
        answer: 1,
        explanation: "Overclocking an unlocked Intel 'K' CPU requires a Z-series chipset; cheaper H- and B-series boards lock the CPU multiplier and disable overclocking."
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
    image: "/images/components/motherboard/gigabyte/h610m-h.png",
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
    id: "mobo_asus_a520m",
    name: "ASUS Prime A520M-K",
    type: "Motherboard",
    manufacturer: "ASUS",
    model: "Prime A520M-K",
    difficulty: "Beginner",
    specs: {
      "Socket": "AM4",
      "RAM Support": "DDR4",
      "Max RAM": "64GB",
      "PCIe Version": "PCIe 3.0",
      "M.2 Slots": 1,
      "SATA Ports": 4,
      "Form Factor": "Micro-ATX"
    },
    description: "An affordable Micro-ATX board for AMD's long-running AM4 socket, perfect for budget Ryzen builds.",
    purpose: "Gives budget builders an entry point into AMD's AM4 ecosystem, compatible with several generations of Ryzen CPUs.",
    howItWorks: "The A520 chipset provides basic connectivity and power delivery, without support for CPU overclocking.",
    whereItConnects: "Screws into a Micro-ATX or larger case. Connects to the PSU via 24-pin ATX and 4/8-pin CPU power.",
    facts: "The AM4 socket was used across five Ryzen CPU generations (1000 through 5000 series), giving A520 boards exceptional CPU upgrade flexibility.",
    mistakes: "Expecting to overclock a Ryzen CPU on an A520 board — the A-series chipset does not support CPU multiplier overclocking.",
    color: "from-indigo-950 to-slate-700",
    image: "/images/components/motherboard/asus/prime-a520m-k.png",
    renderSvg: moboIcon(ASUS_INDIGO, "AM4"),
    quiz: [
      {
        question: "What is a key limitation of AMD's budget A520 chipset compared to a B550 or X570 board?",
        options: [
          "It cannot use any Ryzen CPU at all",
          "It does not support CPU overclocking",
          "It only has one RAM slot"
        ],
        answer: 1,
        explanation: "AMD's A-series chipsets are entry-level and omit overclocking support, which is reserved for B- and X-series boards."
      }
    ]
  }
];
