import { ComponentMetadata } from "./types";
import { cpuIcon } from "./iconTemplates";

const INTEL_BLUE = "#3B82F6";
const AMD_ORANGE = "#EA580C";

export const cpuComponents: ComponentMetadata[] = [
  // ---------- INTEL · 12th Gen (Alder Lake) ----------
  {
    id: "cpu_intel_i5_12400f",
    name: "Intel Core i5-12400F",
    type: "CPU",
    manufacturer: "Intel",
    model: "Core i5-12400F",
    difficulty: "Beginner",
    generation: "12th Gen (Alder Lake)",
    generationOrder: 12,
    specs: {
      "Cores": "6 (6 P-cores)",
      "Threads": 12,
      "Socket": "LGA1700",
      "Power Draw": 65,
      "Gen": "12th Gen",
      "Integrated Graphics": "None (requires a GPU)"
    },
    description: "Budget-friendly 6-core processor. The 'F' means it has no built-in graphics, so a dedicated GPU is required.",
    purpose: "A great entry-level CPU for gaming and everyday tasks when paired with a discrete graphics card.",
    howItWorks: "Runs six full-performance cores at up to 4.4GHz, handling everyday multitasking and gaming workloads efficiently.",
    whereItConnects: "Plugs directly into the Motherboard's LGA1700 CPU Socket.",
    facts: "The 'F' suffix on Intel CPUs always means the on-chip graphics silicon has been disabled or removed, lowering the price.",
    mistakes: "Building a PC with an 'F' series CPU and forgetting to buy a separate graphics card, resulting in no video output at all.",
    color: "from-blue-500 to-blue-300",
    image: "/images/components/cpu/intel/i5-12400f.png",
    renderSvg: cpuIcon(INTEL_BLUE, "Intel", "LGA1700"),
    quiz: [
      {
        question: "Why does the Intel Core i5-12400F need a dedicated graphics card to display anything on screen?",
        options: [
          "It has too many cores to run integrated graphics",
          "The 'F' suffix means it ships with no integrated graphics chip",
          "It only works with laptops"
        ],
        answer: 1,
        explanation: "Intel 'F' series CPUs have their integrated graphics disabled or physically absent, so a discrete GPU is mandatory for video output."
      }
    ]
  },
  {
    id: "cpu_intel_i7_12700k",
    name: "Intel Core i7-12700K",
    type: "CPU",
    manufacturer: "Intel",
    model: "Core i7-12700K",
    difficulty: "Intermediate",
    generation: "12th Gen (Alder Lake)",
    generationOrder: 12,
    specs: {
      "Cores": "12 (8 P-cores + 4 E-cores)",
      "Threads": 20,
      "Socket": "LGA1700",
      "Power Draw": 125,
      "Gen": "12th Gen",
      "Integrated Graphics": "Intel UHD 770"
    },
    description: "Intel's first hybrid-core desktop chip, mixing fast Performance-cores with efficient Background-cores.",
    purpose: "Delivers strong gaming and content-creation performance by pairing heavy-lifting cores with power-sipping background cores.",
    howItWorks: "The scheduler assigns demanding tasks (like games) to P-cores and background tasks (like Discord or antivirus) to E-cores automatically.",
    whereItConnects: "Plugs directly into the Motherboard's LGA1700 CPU Socket. The 'K' means it can be overclocked.",
    facts: "12th Gen was the first mainstream desktop CPU generation to introduce a hybrid 'big.LITTLE' style core design to Intel desktops.",
    mistakes: "Assuming all 12 cores are equally powerful — E-cores are much slower than P-cores and are meant for background tasks, not gaming.",
    color: "from-blue-600 to-blue-400",
    image: "/images/components/cpu/intel/i7-12700k.png",
    renderSvg: cpuIcon(INTEL_BLUE, "Intel", "LGA1700"),
    quiz: [
      {
        question: "What is the difference between a P-core and an E-core on a 12th Gen Intel CPU?",
        options: [
          "P-cores are for gaming performance, E-cores are smaller, power-efficient cores for background tasks",
          "P-cores only work with AMD motherboards",
          "There is no real difference, it's just marketing"
        ],
        answer: 0,
        explanation: "Performance-cores (P-cores) handle demanding single-threaded work like games, while Efficiency-cores (E-cores) handle lighter background tasks using far less power."
      }
    ]
  },
  // ---------- INTEL · 13th Gen (Raptor Lake) ----------
  {
    id: "cpu_intel",
    name: "Intel Core i5-13600K",
    type: "CPU",
    manufacturer: "Intel",
    model: "Core i5-13600K",
    difficulty: "Beginner",
    generation: "13th Gen (Raptor Lake)",
    generationOrder: 13,
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
    image: "/images/components/cpu/intel/i5-13600k.png",
    renderSvg: cpuIcon(INTEL_BLUE, "Intel", "LGA1700"),
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
    id: "cpu_intel_i9_13900k",
    name: "Intel Core i9-13900K",
    type: "CPU",
    manufacturer: "Intel",
    model: "Core i9-13900K",
    difficulty: "Expert",
    generation: "13th Gen (Raptor Lake)",
    generationOrder: 13,
    specs: {
      "Cores": "24 (8 P-cores + 16 E-cores)",
      "Threads": 32,
      "Socket": "LGA1700",
      "Power Draw": 253,
      "Gen": "13th Gen",
      "Integrated Graphics": "Intel UHD 770"
    },
    description: "Intel's flagship 13th Gen desktop chip with a massive 24-core count for extreme multitasking and gaming.",
    purpose: "Built for enthusiasts who need maximum single-core gaming speed and heavy multi-core rendering/streaming power at the same time.",
    howItWorks: "Combines 8 high-clock P-cores for gaming with 16 E-cores for background rendering, encoding, or compiling tasks running simultaneously.",
    whereItConnects: "Plugs directly into the Motherboard's LGA1700 CPU Socket. Needs a high-end cooler due to very high heat output.",
    facts: "At full load the i9-13900K can briefly draw over 250 Watts of power — more than some entire budget PCs.",
    mistakes: "Pairing this CPU with a budget stock cooler or a weak motherboard VRM, causing severe thermal throttling under sustained load.",
    color: "from-blue-700 to-blue-500",
    image: "/images/components/cpu/intel/i9-13900k.png",
    renderSvg: cpuIcon(INTEL_BLUE, "Intel", "LGA1700"),
    quiz: [
      {
        question: "Why does a flagship CPU like the i9-13900K need a stronger cooler than a budget CPU?",
        options: [
          "It is physically bigger and heavier",
          "It can draw over 250W and generate much more heat that must be removed to avoid throttling",
          "It requires cooling to boot up at all"
        ],
        answer: 1,
        explanation: "High core-count, high-clock CPUs draw far more power and generate more heat. Without adequate cooling, the CPU automatically slows itself down (thermal throttling) to stay safe."
      }
    ]
  },
  // ---------- INTEL · 14th Gen (Raptor Lake Refresh) ----------
  {
    id: "cpu_intel_i5_14600k",
    name: "Intel Core i5-14600K",
    type: "CPU",
    manufacturer: "Intel",
    model: "Core i5-14600K",
    difficulty: "Intermediate",
    generation: "14th Gen (Raptor Lake Refresh)",
    generationOrder: 14,
    specs: {
      "Cores": "14 (6 P-cores + 8 E-cores)",
      "Threads": 20,
      "Socket": "LGA1700",
      "Power Draw": 181,
      "Gen": "14th Gen",
      "Integrated Graphics": "Intel UHD 770"
    },
    description: "A refined refresh of the 13600K with slightly higher clock speeds, offering excellent price-to-performance for gaming.",
    purpose: "A popular mid-range choice for gaming builds that still leaves room in the budget for a stronger graphics card.",
    howItWorks: "Uses the same hybrid P-core/E-core layout as 13th Gen, with tuned clock speeds and power delivery for slightly better performance.",
    whereItConnects: "Plugs directly into the Motherboard's LGA1700 CPU Socket, compatible with the same boards as 12th and 13th Gen.",
    facts: "14th Gen desktop CPUs use the exact same LGA1700 socket as 12th and 13th Gen, so many existing motherboards work with a simple BIOS update.",
    mistakes: "Buying an old motherboard with an out-of-date BIOS that doesn't yet recognize 14th Gen CPUs, causing the PC to fail to boot until updated.",
    color: "from-blue-600 to-sky-400",
    image: "/images/components/cpu/intel/i5-14600k.png",
    renderSvg: cpuIcon(INTEL_BLUE, "Intel", "LGA1700"),
    quiz: [
      {
        question: "Why might a brand-new 14th Gen CPU fail to boot in an older LGA1700 motherboard straight out of the box?",
        options: [
          "14th Gen CPUs are not actually compatible with LGA1700",
          "The motherboard's BIOS/firmware may need an update to recognize the newer CPU",
          "14th Gen CPUs require liquid cooling to power on"
        ],
        answer: 1,
        explanation: "Motherboards ship with a certain BIOS version. Newer CPU generations on the same socket often need a BIOS update before the board will recognize and boot them."
      }
    ]
  },
  {
    id: "cpu_intel_i7_14700k",
    name: "Intel Core i7-14700K",
    type: "CPU",
    manufacturer: "Intel",
    model: "Core i7-14700K",
    difficulty: "Expert",
    generation: "14th Gen (Raptor Lake Refresh)",
    generationOrder: 14,
    specs: {
      "Cores": "20 (8 P-cores + 12 E-cores)",
      "Threads": 28,
      "Socket": "LGA1700",
      "Power Draw": 253,
      "Gen": "14th Gen",
      "Integrated Graphics": "Intel UHD 770"
    },
    description: "A high-core-count 14th Gen chip that adds extra E-cores over the 12700K for stronger multitasking and content creation.",
    purpose: "Aimed at gamers and creators who also render video, stream, or compile code alongside gaming.",
    howItWorks: "20 total cores split work between fast P-cores for the active game and a large pool of E-cores for background encoding or compiling.",
    whereItConnects: "Plugs directly into the Motherboard's LGA1700 CPU Socket. Recommended with a high-airflow case and a strong tower or AIO cooler.",
    facts: "The extra E-cores on the 14700K compared to the 12700K come almost entirely from more efficiency cores, not more performance cores.",
    mistakes: "Choosing a Micro-ATX motherboard with a weak power delivery (VRM) for this power-hungry CPU, leading to overheating VRMs under sustained load.",
    color: "from-blue-700 to-indigo-500",
    image: "/images/components/cpu/intel/i7-14700k.png",
    renderSvg: cpuIcon(INTEL_BLUE, "Intel", "LGA1700"),
    quiz: [
      {
        question: "Who benefits most from the extra E-cores on a CPU like the i7-14700K?",
        options: [
          "Someone who only plays one game at a time with nothing else open",
          "Someone who games while also streaming, recording, or compiling code in the background",
          "No one, extra E-cores never help performance"
        ],
        answer: 1,
        explanation: "E-cores excel at handling multiple background tasks in parallel, so users running several demanding programs at once benefit the most."
      }
    ]
  },
  // ---------- AMD · Ryzen 5000 Series (Zen 3, AM4) ----------
  {
    id: "cpu_amd_5600x",
    name: "AMD Ryzen 5 5600X",
    type: "CPU",
    manufacturer: "AMD",
    model: "Ryzen 5 5600X",
    difficulty: "Beginner",
    generation: "Ryzen 5000 Series (Zen 3)",
    generationOrder: 5000,
    specs: {
      "Cores": "6",
      "Threads": 12,
      "Socket": "AM4",
      "Power Draw": 65,
      "Gen": "Zen 3",
      "Integrated Graphics": "None (requires a GPU)"
    },
    description: "A hugely popular budget gaming CPU on the long-lived AM4 platform, praised for its efficiency and value.",
    purpose: "Delivers strong 1080p gaming performance at a low price point, ideal for a first budget gaming build.",
    howItWorks: "Six Zen 3 cores with a redesigned unified cache deliver a big generational leap in gaming speed over previous Ryzen chips.",
    whereItConnects: "Mounts inside the AM4 socket on the motherboard. Pin Grid Array design with pins on the underside of the CPU itself.",
    facts: "AM4 was AMD's mainstream desktop socket for over 6 years (2017-2023), letting people upgrade CPUs for years without changing motherboards.",
    mistakes: "Forgetting that unlike Intel, AMD AM4 CPUs have delicate pins on the CPU itself, not the motherboard — bending them is very easy if mishandled.",
    color: "from-orange-500 to-orange-300",
    image: "/images/components/cpu/amd/ryzen5-5600x.png",
    renderSvg: cpuIcon(AMD_ORANGE, "AMD", "AM4"),
    quiz: [
      {
        question: "On an AMD AM4 CPU like the Ryzen 5 5600X, where are the delicate physical pins located?",
        options: [
          "On the motherboard socket only",
          "On the underside of the CPU itself",
          "There are no pins at all on AM4"
        ],
        answer: 1,
        explanation: "AM4 uses a Pin Grid Array (PGA) design, meaning the pins are on the CPU. This is the opposite of Intel and AMD's newer AM5 platform, which put pins on the motherboard."
      }
    ]
  },
  {
    id: "cpu_amd_5800x3d",
    name: "AMD Ryzen 7 5800X3D",
    type: "CPU",
    manufacturer: "AMD",
    model: "Ryzen 7 5800X3D",
    difficulty: "Intermediate",
    generation: "Ryzen 5000 Series (Zen 3)",
    generationOrder: 5000,
    specs: {
      "Cores": "8",
      "Threads": 16,
      "Socket": "AM4",
      "Power Draw": 105,
      "Gen": "Zen 3 + 3D V-Cache",
      "Integrated Graphics": "None (requires a GPU)"
    },
    description: "A legendary 'last hurrah' AM4 CPU that stacks extra cache directly on the die for a massive gaming performance boost.",
    purpose: "One of the best gaming CPUs of its era, letting older AM4 systems compete with much newer hardware in games.",
    howItWorks: "A large 3D V-Cache chiplet is stacked vertically on top of the compute cores, giving the CPU a huge pool of ultra-fast memory to pull from during gaming.",
    whereItConnects: "Mounts inside the AM4 socket, but cannot be overclocked like a standard X-series chip due to the delicate stacked cache.",
    facts: "The 5800X3D's extra cache chip is physically bonded on top of the CPU cores using advanced 3D-stacking manufacturing, similar to stacking floors of a building.",
    mistakes: "Trying to manually overclock the core frequency, which AMD disabled on X3D chips because the stacked cache is sensitive to excess heat and voltage.",
    color: "from-orange-600 to-red-400",
    image: "/images/components/cpu/amd/ryzen7-5800x3d.png",
    renderSvg: cpuIcon(AMD_ORANGE, "AMD", "AM4"),
    quiz: [
      {
        question: "What makes the Ryzen 7 5800X3D special compared to a normal Ryzen 7 5800X?",
        options: [
          "It has extra 3D-stacked cache memory that greatly boosts gaming performance",
          "It has double the number of CPU cores",
          "It runs on a completely different, newer socket"
        ],
        answer: 0,
        explanation: "3D V-Cache technology stacks extra cache memory on top of the CPU die, giving games faster access to data and a significant frame-rate boost."
      }
    ]
  },
  // ---------- AMD · Ryzen 7000 Series (Zen 4, AM5) ----------
  {
    id: "cpu_amd",
    name: "AMD Ryzen 5 7600X",
    type: "CPU",
    manufacturer: "AMD",
    model: "Ryzen 5 7600X",
    difficulty: "Beginner",
    generation: "Ryzen 7000 Series (Zen 4)",
    generationOrder: 7000,
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
    image: "/images/components/cpu/amd/ryzen5-7600x.png",
    renderSvg: cpuIcon(AMD_ORANGE, "AMD", "AM5"),
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
    id: "cpu_amd_7800x3d",
    name: "AMD Ryzen 7 7800X3D",
    type: "CPU",
    manufacturer: "AMD",
    model: "Ryzen 7 7800X3D",
    difficulty: "Expert",
    generation: "Ryzen 7000 Series (Zen 4)",
    generationOrder: 7000,
    specs: {
      "Cores": "8",
      "Threads": 16,
      "Socket": "AM5",
      "Power Draw": 120,
      "Gen": "Zen 4 + 3D V-Cache",
      "Integrated Graphics": "Radeon Graphics"
    },
    description: "The AM5-generation successor to the legendary 5800X3D, widely regarded as one of the best gaming CPUs available.",
    purpose: "Built specifically to maximize gaming frame rates by combining Zen 4 cores with a huge stacked cache.",
    howItWorks: "Stacked 3D V-Cache sits on top of the 8 Zen 4 cores, feeding games with data far faster than normal cache layouts allow.",
    whereItConnects: "Mounts inside the AM5 socket. Requires a DDR5 motherboard, unlike the older AM4-based 5800X3D.",
    facts: "Despite its gaming-focused cache, the 7800X3D also runs notably cooler and more efficiently than AMD's clock-speed-focused flagship chips.",
    mistakes: "Pairing this CPU with slow, budget DDR5 RAM. The 3D V-Cache reduces (but doesn't eliminate) the CPU's sensitivity to RAM speed, so cheap RAM is fine — but users sometimes still overspend expecting huge gains from RAM upgrades.",
    color: "from-orange-600 to-rose-400",
    image: "/images/components/cpu/amd/ryzen7-7800x3d.png",
    renderSvg: cpuIcon(AMD_ORANGE, "AMD", "AM5"),
    quiz: [
      {
        question: "What socket and RAM type does the Ryzen 7 7800X3D require?",
        options: [
          "AM4 socket with DDR4 RAM",
          "AM5 socket with DDR5 RAM",
          "LGA1700 socket with DDR5 RAM"
        ],
        answer: 1,
        explanation: "The 7800X3D is a Ryzen 7000-series chip, which uses AMD's AM5 socket and exclusively supports DDR5 memory."
      }
    ]
  },
  // ---------- AMD · Ryzen 9000 Series (Zen 5, AM5) ----------
  {
    id: "cpu_amd_9600x",
    name: "AMD Ryzen 5 9600X",
    type: "CPU",
    manufacturer: "AMD",
    model: "Ryzen 5 9600X",
    difficulty: "Intermediate",
    generation: "Ryzen 9000 Series (Zen 5)",
    generationOrder: 9000,
    specs: {
      "Cores": "6",
      "Threads": 12,
      "Socket": "AM5",
      "Power Draw": 65,
      "Gen": "Zen 5",
      "Integrated Graphics": "Radeon Graphics"
    },
    description: "An efficient entry point into AMD's latest Zen 5 architecture, staying on the same AM5 socket as previous Ryzen generations.",
    purpose: "A great mid-range CPU for gaming and productivity that keeps power draw and heat output low.",
    howItWorks: "Zen 5 cores improve instructions-per-clock over Zen 4, delivering more performance at the same clock speed and power limit.",
    whereItConnects: "Mounts inside the AM5 socket — the same socket used since Ryzen 7000, so many existing AM5 motherboards support it with a BIOS update.",
    facts: "AMD has committed to supporting the AM5 socket through multiple CPU generations, so upgrading from a 7000-series to a 9000-series chip often just means a BIOS flash.",
    mistakes: "Assuming any AM5 board automatically supports the newest CPUs without checking — very old AM5 motherboards may need a BIOS update first.",
    color: "from-orange-500 to-amber-300",
    image: "/images/components/cpu/amd/ryzen5-9600x.png",
    renderSvg: cpuIcon(AMD_ORANGE, "AMD", "AM5"),
    quiz: [
      {
        question: "Why has AMD's AM5 socket been popular with long-term PC builders?",
        options: [
          "AMD guarantees multiple CPU generations will work on the same AM5 motherboards",
          "AM5 motherboards are always the cheapest on the market",
          "AM5 boards can also accept Intel CPUs"
        ],
        answer: 0,
        explanation: "AMD has pledged extended platform support for AM5, letting builders upgrade CPUs across generations without replacing their motherboard."
      }
    ]
  },
  {
    id: "cpu_amd_9950x",
    name: "AMD Ryzen 9 9950X",
    type: "CPU",
    manufacturer: "AMD",
    model: "Ryzen 9 9950X",
    difficulty: "Expert",
    generation: "Ryzen 9000 Series (Zen 5)",
    generationOrder: 9000,
    specs: {
      "Cores": "16",
      "Threads": 32,
      "Socket": "AM5",
      "Power Draw": 170,
      "Gen": "Zen 5",
      "Integrated Graphics": "Radeon Graphics"
    },
    description: "AMD's flagship desktop CPU, packing 16 full-performance Zen 5 cores for extreme multitasking, rendering, and gaming.",
    purpose: "Built for professionals and enthusiasts who need top-tier performance in both heavily-threaded workloads and gaming.",
    howItWorks: "Unlike Intel's hybrid design, all 16 cores are identical full-performance cores, giving consistent power across every type of workload.",
    whereItConnects: "Mounts inside the AM5 socket. Recommended with a high-end motherboard with strong VRM cooling and a capable 240mm+ liquid cooler.",
    facts: "Unlike Intel's P-core/E-core hybrid design, every one of the 9950X's 16 cores is a full-performance core with no efficiency-only cores.",
    mistakes: "Underestimating cooling needs — running this CPU with a basic air cooler in a poorly-ventilated case will cause it to throttle well below its rated speeds.",
    color: "from-orange-700 to-red-500",
    image: "/images/components/cpu/amd/ryzen9-9950x.png",
    renderSvg: cpuIcon(AMD_ORANGE, "AMD", "AM5"),
    quiz: [
      {
        question: "How does AMD's core design on the Ryzen 9 9950X differ from Intel's hybrid CPUs like the i9-13900K?",
        options: [
          "AMD uses only efficiency cores, Intel uses only performance cores",
          "All of AMD's cores are identical full-performance cores, while Intel mixes P-cores and E-cores",
          "There is no difference, both use the exact same core design"
        ],
        answer: 1,
        explanation: "AMD's Ryzen 9000 series uses a uniform core design where every core has full performance capability, unlike Intel's hybrid P-core/E-core approach."
      }
    ]
  }
];
