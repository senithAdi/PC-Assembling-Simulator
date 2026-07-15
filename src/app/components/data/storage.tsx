import { ComponentMetadata } from "./types";
import { ssdIcon, hddIcon } from "./iconTemplates";

const WD_BLUE = "#2563EB";

export const storageComponents: ComponentMetadata[] = [
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
    image: "/images/components/ssd/samsung/980-pro-1tb.png",
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
    id: "ssd_wd_sn580",
    name: "WD Blue SN580 1TB M.2 NVMe SSD",
    type: "SSD",
    manufacturer: "WD",
    model: "Blue SN580 1TB",
    difficulty: "Beginner",
    specs: {
      "Capacity": "1 TB",
      "Interface": "M.2 NVMe (PCIe Gen 4)",
      "Read Speed": "4150 MB/s",
      "Form Factor": "M.2 2280"
    },
    description: "A budget-friendly NVMe drive that still comfortably beats any SATA SSD, ideal for cost-conscious builds.",
    purpose: "Provides fast, cable-free storage for the operating system and games without the premium price of top-tier NVMe drives.",
    howItWorks: "Uses PCIe Gen4 lanes and flash memory to deliver strong sequential speeds at a lower cost than flagship NVMe drives.",
    whereItConnects: "Plugs directly into the Motherboard's M.2 slot at an angle, then is pressed flat and secured with a small screw.",
    facts: "Even a 'budget' NVMe drive like the SN580 is typically 5-8 times faster than a traditional SATA SSD for everyday tasks like booting Windows.",
    mistakes: "Installing the M.2 SSD in a slot that shares bandwidth with a SATA port, unknowingly disabling one of the motherboard's SATA connectors.",
    color: "from-blue-700 to-sky-400",
    image: "/images/components/ssd/wd/blue-sn580-1tb.png",
    renderSvg: ssdIcon(WD_BLUE, "WD BLUE"),
    quiz: [
      {
        question: "What is a hidden risk of installing an M.2 SSD into certain motherboard M.2 slots?",
        options: [
          "The SSD will run slower than advertised",
          "It may share bandwidth with a SATA port, disabling that port when occupied",
          "It will void the motherboard warranty automatically"
        ],
        answer: 1,
        explanation: "Some motherboard M.2 slots share electrical lanes with SATA ports. Check the manual — populating certain M.2 slots can disable specific SATA ports."
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
    image: "/images/components/ssd/crucial/mx500-1tb.png",
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
    image: "/images/components/hdd/seagate/barracuda-2tb.png",
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
    id: "hdd_wd_black",
    name: "WD Black 2TB Performance HDD",
    type: "HDD",
    manufacturer: "WD",
    model: "Black 2TB",
    difficulty: "Intermediate",
    specs: {
      "Capacity": "2 TB",
      "Interface": "SATA III (6Gb/s)",
      "RPM": 7200,
      "Cache": "64MB",
      "Form Factor": "3.5 Inch"
    },
    description: "A performance-tuned mechanical drive built for gaming libraries and workstations that need fast bulk storage.",
    purpose: "Serves as a large, affordable secondary drive for storing big game libraries or media alongside a fast SSD boot drive.",
    howItWorks: "Spins its magnetic platters at 7200 RPM with tuned firmware for lower latency under multitasking workloads.",
    whereItConnects: "Mounted in the case's 3.5\" drive cage. Needs both a SATA data cable to the motherboard and a SATA power cable from the PSU.",
    facts: "WD Black drives use a dual-actuator-ready design and reinforced internals aimed at handling more read/write cycles than standard consumer HDDs.",
    mistakes: "Relying on a single HDD as the only backup for important files — mechanical drives can fail suddenly, so backups should never depend on one drive alone.",
    color: "from-neutral-900 to-neutral-700",
    image: "/images/components/hdd/wd/black-2tb.png",
    renderSvg: hddIcon(WD_BLUE, "WD BLACK"),
    quiz: [
      {
        question: "Why shouldn't a single HDD ever be your only backup of important files?",
        options: [
          "HDDs cannot store important files, only games",
          "Mechanical drives can fail suddenly, so a single copy is a single point of failure",
          "HDDs automatically delete files after a year"
        ],
        answer: 1,
        explanation: "Any single storage device can fail without warning. Good backup practice means keeping copies on at least one additional drive or cloud service."
      }
    ]
  }
];
