import { ComponentMetadata } from "./types";
import { coolerAirIcon, coolerLiquidIcon } from "./iconTemplates";

const COOLERMASTER_PURPLE = "#7C3AED";
const CORSAIR_YELLOW = "#FBBF24";

export const coolerComponents: ComponentMetadata[] = [
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
    image: "/images/components/laminar-rm1.png",
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
    id: "cooler_coolermaster_h212",
    name: "Cooler Master Hyper 212 Black Edition",
    type: "Cooler",
    manufacturer: "Cooler Master",
    model: "Hyper 212 Black Edition",
    difficulty: "Beginner",
    specs: {
      "Type": "Single-Tower Air Cooler",
      "Height": 159, // mm
      "Fan Size": "120 mm",
      "TDP Support": "150W",
      "Compatible Sockets": "LGA1700, AM5, AM4"
    },
    description: "One of the most popular budget aftermarket coolers ever made, offering a big upgrade over stock coolers at a low price.",
    purpose: "Gives budget builders a meaningful cooling upgrade over a stock cooler, unlocking better sustained performance.",
    howItWorks: "Four direct-contact heatpipes carry heat away from the CPU into a wide aluminum fin stack, cooled by a single 120mm fan.",
    whereItConnects: "Mounts over the CPU socket using a backplate and brand-specific mounting bracket. Fan connects to the CPU_FAN header.",
    facts: "The Hyper 212 has stayed in production with only minor revisions for over a decade because its price-to-performance ratio remains hard to beat.",
    mistakes: "Forgetting to install the correct socket-specific mounting bracket (LGA1700 vs AM4/AM5 brackets differ) before attaching the cooler.",
    color: "from-purple-800 to-violet-600",
    image: "/images/components/hyper-212-black.png",
    renderSvg: coolerAirIcon(COOLERMASTER_PURPLE, "212"),
    quiz: [
      {
        question: "Why might a budget aftermarket cooler like the Hyper 212 require a different mounting bracket for an Intel vs AMD CPU?",
        options: [
          "Aftermarket coolers only work with one CPU brand ever",
          "Different sockets have different hole patterns and mounting mechanisms",
          "AMD CPUs don't need any cooler bracket"
        ],
        answer: 1,
        explanation: "Intel and AMD sockets use different physical mounting hole layouts, so universal aftermarket coolers ship with swappable brackets for each platform."
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
    image: "/images/components/nh-d15.png",
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
    id: "cooler_corsair_h100i",
    name: "Corsair iCUE H100i Elite AIO Liquid Cooler",
    type: "Cooler",
    manufacturer: "Corsair",
    model: "iCUE H100i Elite",
    difficulty: "Expert",
    specs: {
      "Type": "240mm AIO Liquid Cooler",
      "Radiator Size": "240 mm",
      "Fan Size": "2x 120 mm",
      "TDP Support": "250W+",
      "Compatible Sockets": "LGA1700, AM5, AM4"
    },
    description: "An all-in-one (AIO) liquid cooler with a 240mm radiator, giving flagship CPUs strong, quiet cooling headroom.",
    purpose: "Handles the very high heat output of flagship or overclocked CPUs more effectively than most air coolers can.",
    howItWorks: "A water block on the CPU absorbs heat into coolant, which a pump circulates to a radiator where two fans blow the heat away.",
    whereItConnects: "The pump/water block mounts on the CPU socket; the radiator mounts to a case fan area (usually the top or front) using screws.",
    facts: "AIO liquid coolers are sealed, maintenance-free units — unlike custom loop cooling, you never need to add or replace coolant yourself.",
    mistakes: "Mounting the radiator with the tubes pointing the wrong direction, forcing them to stretch or kink awkwardly to reach the CPU block.",
    color: "from-yellow-500 to-amber-400",
    image: "/images/components/icue-h100i-elite.png",
    renderSvg: coolerLiquidIcon(CORSAIR_YELLOW, "H100i AIO"),
    quiz: [
      {
        question: "Do you need to periodically add or replace coolant in a sealed AIO liquid cooler?",
        options: [
          "Yes, every few months like a car radiator",
          "No, AIO units are sealed and maintenance-free for their lifespan",
          "Yes, but only once a year"
        ],
        answer: 1,
        explanation: "AIO (all-in-one) coolers are factory-sealed closed loops. Unlike custom water-cooling loops, they require no manual coolant top-ups."
      }
    ]
  }
];
