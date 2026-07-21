import { ComponentMetadata } from "./types";
import { fanIcon } from "./iconTemplates";

const NOCTUA_TAN = "#B45309";

export const fanComponents: ComponentMetadata[] = [
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
    image: "/images/components/sp120-pwm.png",
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
    id: "fan_noctua_nfa12",
    name: "Noctua NF-A12x25 120mm Fan",
    type: "Fan",
    manufacturer: "Noctua",
    model: "NF-A12x25",
    difficulty: "Intermediate",
    specs: {
      "Size": "120 mm",
      "Connector": "4-pin PWM",
      "Max Speed": "2000 RPM",
      "Airflow": "60.1 CFM"
    },
    description: "A premium 120mm fan renowned for exceptional airflow-to-noise performance, popular for both cases and radiators.",
    purpose: "Delivers high airflow while staying remarkably quiet, ideal for builders prioritizing acoustics as much as cooling.",
    howItWorks: "Advanced aerodynamic blade design and a custom motor reduce turbulence noise while maintaining strong static pressure.",
    whereItConnects: "Mounts onto case fan brackets or radiator screw holes. Connects to a Motherboard fan header (SYS_FAN, CHA_FAN, or PUMP header).",
    facts: "Noctua's brown and cream color scheme has become instantly recognizable in the PC building community as a mark of premium engineering.",
    mistakes: "Paying a premium price for these fans in a system where airflow is already bottlenecked elsewhere (like a nearly-solid front panel), wasting their performance advantage.",
    color: "from-amber-700 to-yellow-600",
    image: "/images/components/nf-a12x25.png",
    renderSvg: fanIcon(NOCTUA_TAN),
    quiz: [
      {
        question: "What is Noctua's NF-A12x25 fan generally known for among PC builders?",
        options: [
          "Being the cheapest fan option available",
          "An excellent balance of high airflow and low noise",
          "Only working with liquid cooling radiators"
        ],
        answer: 1,
        explanation: "Noctua fans are prized for delivering strong airflow and static pressure while running quieter than many competing fans at the same speed."
      }
    ]
  }
];

export const miscComponents: ComponentMetadata[] = [
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
    image: "/images/components/drw-24f1st.png",
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
    image: "/images/components/archer-tx50e.png",
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
    image: "/images/components/sound-blaster-audigy.png",
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
    image: "/images/components/mx-6.png",
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
    image: "/images/components/braided-extension-kit.png",
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
