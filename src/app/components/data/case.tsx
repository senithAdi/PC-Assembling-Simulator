import { ComponentMetadata } from "./types";
import { caseIcon } from "./iconTemplates";

const FRACTAL_GRAY = "#94A3B8";
const LIANLI_TEAL = "#14B8A6";

export const caseComponents: ComponentMetadata[] = [
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
    image: "/images/components/h510.png",
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
    id: "case_fractal_meshify",
    name: "Fractal Design Meshify C",
    type: "Case",
    manufacturer: "Fractal Design",
    model: "Meshify C",
    difficulty: "Beginner",
    specs: {
      "Form Factor": "Compact Mid-Tower ATX",
      "Motherboard Support": "ATX, Micro-ATX, Mini-ITX",
      "Max GPU Clearance": 315, // mm
      "Max Cooler Height": 172, // mm
      "Included Fans": 2
    },
    description: "A compact, angular mesh-front case designed to maximize airflow without sacrificing a clean, minimalist look.",
    purpose: "Balances a small footprint with strong airflow, ideal for a tidy desk setup that still needs solid cooling.",
    howItWorks: "The distinctive angular mesh front panel pulls in cool air with minimal restriction compared to solid front panels.",
    whereItConnects: "Sits on your desk or floor. All internal components — motherboard, PSU, drives, fans — mount inside it.",
    facts: "Fractal Design pioneered the 'Nanomesh' front filter used on the Meshify line, designed to block dust while barely restricting airflow.",
    mistakes: "Removing the included dust filters completely to 'improve airflow', which actually just lets dust build up faster inside the case.",
    color: "from-slate-500 to-slate-400",
    image: "/images/components/meshify-c.png",
    renderSvg: caseIcon(FRACTAL_GRAY, "MESHIFY"),
    quiz: [
      {
        question: "What is the purpose of the mesh front panel on cases like the Fractal Design Meshify C?",
        options: [
          "It blocks all airflow to keep dust out completely",
          "It maximizes intake airflow while a fine mesh filter still catches dust",
          "It is purely decorative and has no function"
        ],
        answer: 1,
        explanation: "Mesh front panels are designed to let air flow in with minimal restriction, while a fine dust filter behind the mesh still traps dust particles."
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
    image: "/images/components/4000d-airflow.png",
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
    id: "case_lianli_o11",
    name: "Lian Li O11 Dynamic",
    type: "Case",
    manufacturer: "Lian Li",
    model: "O11 Dynamic",
    difficulty: "Expert",
    specs: {
      "Form Factor": "Premium Mid-Tower ATX",
      "Motherboard Support": "E-ATX, ATX, Micro-ATX, Mini-ITX",
      "Max GPU Clearance": 420, // mm
      "Max Cooler Height": 155, // mm
      "Included Fans": 0
    },
    description: "A showcase-style dual-chamber case beloved by enthusiasts for custom loops and elaborate builds behind curved glass.",
    purpose: "Designed for builders who want to show off their components and cable routing through large tempered-glass panels.",
    howItWorks: "A dual-chamber layout separates the motherboard/GPU area from the PSU and cables, hiding clutter while keeping the main chamber pristine.",
    whereItConnects: "Sits on your desk or floor. Its extra-large GPU clearance and radiator mounts support high-end multi-radiator liquid cooling setups.",
    facts: "The O11 Dynamic ships with zero pre-installed fans, since enthusiasts almost always plan a fully custom fan and radiator layout for it.",
    mistakes: "Buying this case without budgeting for extra fans separately, since — unlike most cases — it doesn't include enough fans to be functional out of the box.",
    color: "from-teal-700 to-cyan-500",
    image: "/images/components/o11-dynamic.png",
    renderSvg: caseIcon(LIANLI_TEAL, "O11"),
    quiz: [
      {
        question: "What is notable about how many fans the Lian Li O11 Dynamic includes out of the box?",
        options: [
          "It includes 6 pre-installed RGB fans",
          "It ships with zero fans, expecting the builder to add their own",
          "It doesn't support any fans at all"
        ],
        answer: 1,
        explanation: "The O11 Dynamic is aimed at enthusiasts who plan custom fan/radiator layouts, so unlike most cases it ships without any pre-installed fans."
      }
    ]
  }
];
