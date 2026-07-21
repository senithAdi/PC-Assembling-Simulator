import { ComponentMetadata } from "./types";
import { gpuIcon } from "./iconTemplates";

const NVIDIA_GREEN = "#10B981";
const AMD_RED = "#DC2626";

export const gpuComponents: ComponentMetadata[] = [
  // ---------- NVIDIA · RTX 30 Series ----------
  {
    id: "gpu_rtx3060",
    name: "NVIDIA RTX 3060 12GB",
    type: "GPU",
    manufacturer: "NVIDIA",
    model: "GeForce RTX 3060",
    difficulty: "Beginner",
    generation: "RTX 30 Series",
    generationOrder: 30,
    specs: {
      "VRAM": "12GB GDDR6",
      "PCIe Version": "PCIe 4.0",
      "Power Draw": 170,
      "Length": 242,
      "Required PSU": "550W"
    },
    description: "A popular previous-generation card with a generous 12GB of VRAM, great for 1080p and light 1440p gaming.",
    purpose: "Delivers reliable, affordable performance for gamers who don't need the very latest ray-tracing horsepower.",
    howItWorks: "Uses thousands of CUDA cores to process 3D geometry and lighting in parallel, with its large VRAM buffer holding bigger game textures.",
    whereItConnects: "Plugs into the primary PCIe x16 Slot on the motherboard and screws into the rear case bracket slots.",
    facts: "The RTX 3060 actually has more VRAM (12GB) than some higher-tier cards from the same generation, making it popular for content creators too.",
    mistakes: "Assuming more VRAM alone means a faster card overall — VRAM capacity is only one part of graphics performance, not the whole picture.",
    color: "from-green-700 to-green-500",
    image: "/images/components/rtx-3060.png",
    renderSvg: gpuIcon(NVIDIA_GREEN, "RTX 3060"),
    quiz: [
      {
        question: "Does having more VRAM (video memory) automatically make a graphics card faster overall?",
        options: [
          "Yes, VRAM size is the only thing that matters for GPU speed",
          "No, VRAM capacity is just one factor; core count and architecture matter too",
          "No, VRAM has no effect on gaming performance at all"
        ],
        answer: 1,
        explanation: "VRAM stores textures and frame data, and running out causes stutters — but overall speed also depends on the number and architecture of processing cores."
      }
    ]
  },
  {
    id: "gpu_rtx3080",
    name: "NVIDIA RTX 3080 10GB",
    type: "GPU",
    manufacturer: "NVIDIA",
    model: "GeForce RTX 3080",
    difficulty: "Intermediate",
    generation: "RTX 30 Series",
    generationOrder: 30,
    specs: {
      "VRAM": "10GB GDDR6X",
      "PCIe Version": "PCIe 4.0",
      "Power Draw": 320,
      "Length": 285,
      "Required PSU": "750W"
    },
    description: "A former flagship card that remains a powerhouse for 1440p and 4K gaming with ray tracing enabled.",
    purpose: "Provides high frame rates at high resolutions, popular among enthusiasts who bought during the 30-series generation.",
    howItWorks: "A large number of CUDA and RT cores work together to render complex lighting and reflections in real time.",
    whereItConnects: "Plugs into the PCIe x16 Slot and requires two 8-pin PCIe power connectors directly from the PSU.",
    facts: "The RTX 3080 was one of the most in-demand graphics cards ever released, with severe shortages during the 2020-2021 chip crisis.",
    mistakes: "Forgetting to connect both required 8-pin PCIe power cables from the PSU, causing the card to fail to power on or run at reduced performance.",
    color: "from-emerald-700 to-emerald-500",
    image: "/images/components/rtx-3080.png",
    renderSvg: gpuIcon(NVIDIA_GREEN, "RTX 3080"),
    quiz: [
      {
        question: "What happens if you forget to plug in one of the two required PCIe power cables for a high-end GPU like the RTX 3080?",
        options: [
          "Nothing, the motherboard provides all necessary power",
          "The card may fail to power on, or throttle/shut down under load",
          "The GPU will run faster to compensate"
        ],
        answer: 1,
        explanation: "High-power GPUs draw far more than the PCIe slot alone can supply. Missing power cables means the card is starved of power and cannot run properly."
      }
    ]
  },
  // ---------- NVIDIA · RTX 40 Series ----------
  {
    id: "gpu_rtx4060",
    name: "NVIDIA RTX 4060 8GB",
    type: "GPU",
    manufacturer: "NVIDIA",
    model: "GeForce RTX 4060",
    difficulty: "Intermediate",
    generation: "RTX 40 Series",
    generationOrder: 40,
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
    image: "/images/components/rtx-4060.png",
    renderSvg: gpuIcon(NVIDIA_GREEN, "RTX 4060"),
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
    generation: "RTX 40 Series",
    generationOrder: 40,
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
    image: "/images/components/rtx-4080-super.png",
    renderSvg: gpuIcon(NVIDIA_GREEN, "RTX 4080S"),
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
  // ---------- AMD Radeon · RX 6000 Series ----------
  {
    id: "gpu_rx6600",
    name: "AMD Radeon RX 6600 8GB",
    type: "GPU",
    manufacturer: "AMD",
    model: "Radeon RX 6600",
    difficulty: "Beginner",
    generation: "RX 6000 Series",
    generationOrder: 60,
    specs: {
      "VRAM": "8GB GDDR6",
      "PCIe Version": "PCIe 4.0",
      "Power Draw": 132,
      "Length": 220,
      "Required PSU": "500W"
    },
    description: "A power-efficient, budget-friendly card that punches above its weight for 1080p esports and AAA gaming.",
    purpose: "A great choice for a first gaming PC build where the budget mostly goes toward the CPU and other core parts.",
    howItWorks: "Uses AMD's RDNA 2 architecture to efficiently rasterize 3D scenes, prioritizing performance-per-watt over raw ray-tracing power.",
    whereItConnects: "Plugs into the PCIe x16 Slot. Needs only a single 8-pin PCIe power cable thanks to its low power draw.",
    facts: "AMD Radeon cards use the FSR (FidelityFX Super Resolution) upscaling technology, an open alternative to NVIDIA's DLSS that works on many GPU brands.",
    mistakes: "Expecting NVIDIA-exclusive features like DLSS to work on an AMD card — always check which upscaling technology a game actually supports.",
    color: "from-red-700 to-red-500",
    image: "/images/components/rx-6600.png",
    renderSvg: gpuIcon(AMD_RED, "RX 6600"),
    quiz: [
      {
        question: "What is FSR (FidelityFX Super Resolution)?",
        options: [
          "An NVIDIA-exclusive ray-tracing feature",
          "AMD's open upscaling technology, similar in purpose to NVIDIA's DLSS",
          "A cooling technology for graphics cards"
        ],
        answer: 1,
        explanation: "FSR is AMD's image-upscaling technology that boosts frame rates by rendering at a lower resolution and sharpening the image, and it works across many GPU brands."
      }
    ]
  },
  {
    id: "gpu_rx6800xt",
    name: "AMD Radeon RX 6800 XT 16GB",
    type: "GPU",
    manufacturer: "AMD",
    model: "Radeon RX 6800 XT",
    difficulty: "Intermediate",
    generation: "RX 6000 Series",
    generationOrder: 60,
    specs: {
      "VRAM": "16GB GDDR6",
      "PCIe Version": "PCIe 4.0",
      "Power Draw": 300,
      "Length": 267,
      "Required PSU": "750W"
    },
    description: "A high-end card from AMD's RDNA 2 generation, offering huge VRAM and strong rasterized 1440p/4K performance.",
    purpose: "Great for gamers who want top-tier frame rates in traditional (non-ray-traced) rendering and heavy VRAM headroom for the future.",
    howItWorks: "Pairs a large 16GB VRAM buffer with a wide memory bus, keeping frame rates high even in demanding, texture-heavy games.",
    whereItConnects: "Plugs into the PCIe x16 Slot and requires two 8-pin PCIe power connectors from the power supply.",
    facts: "The RX 6800 XT's 16GB of VRAM matched or exceeded some more expensive competing cards at launch, a major selling point for creators.",
    mistakes: "Installing this large, three-slot-wide card into a compact case without first checking the case's maximum GPU length specification.",
    color: "from-red-800 to-orange-500",
    image: "/images/components/rx-6800-xt.png",
    renderSvg: gpuIcon(AMD_RED, "RX 6800XT"),
    quiz: [
      {
        question: "Before buying a large graphics card like the RX 6800 XT, what case specification should you check?",
        options: [
          "The case's paint color",
          "The case's maximum supported GPU length clearance",
          "The number of USB ports on the case"
        ],
        answer: 1,
        explanation: "Large GPUs can be 300mm or longer. Every case lists a maximum GPU clearance — exceeding it means the card physically won't fit."
      }
    ]
  },
  // ---------- AMD Radeon · RX 7000 Series ----------
  {
    id: "gpu_rx7600",
    name: "AMD Radeon RX 7600 8GB",
    type: "GPU",
    manufacturer: "AMD",
    model: "Radeon RX 7600",
    difficulty: "Beginner",
    generation: "RX 7000 Series",
    generationOrder: 70,
    specs: {
      "VRAM": "8GB GDDR6",
      "PCIe Version": "PCIe 4.0",
      "Power Draw": 165,
      "Length": 209,
      "Required PSU": "550W"
    },
    description: "AMD's current-generation budget gaming card, built on the newer RDNA 3 architecture for improved efficiency.",
    purpose: "A solid choice for 1080p gaming builds that want modern architecture features without a high price tag.",
    howItWorks: "RDNA 3's redesigned compute units improve performance-per-watt over the previous RDNA 2 generation at a similar price point.",
    whereItConnects: "Plugs into the PCIe x16 Slot and needs a single 8-pin PCIe power connector from the PSU.",
    facts: "RDNA 3 was AMD's first GPU architecture to use a 'chiplet' design on higher-end models, similar to how modern Ryzen CPUs are built.",
    mistakes: "Buying this budget card expecting flagship 4K ray-tracing performance — it's designed and priced for solid 1080p gaming instead.",
    color: "from-red-700 to-pink-500",
    image: "/images/components/rx-7600.png",
    renderSvg: gpuIcon(AMD_RED, "RX 7600"),
    quiz: [
      {
        question: "What resolution is the AMD Radeon RX 7600 primarily designed and priced for?",
        options: [
          "8K gaming",
          "1080p gaming",
          "Only video editing, not gaming"
        ],
        answer: 1,
        explanation: "The RX 7600 is a budget-tier card optimized for smooth 1080p gaming rather than higher, more demanding resolutions."
      }
    ]
  },
  {
    id: "gpu_rx7800xt",
    name: "AMD Radeon RX 7800 XT 16GB",
    type: "GPU",
    manufacturer: "AMD",
    model: "Radeon RX 7800 XT",
    difficulty: "Expert",
    generation: "RX 7000 Series",
    generationOrder: 70,
    specs: {
      "VRAM": "16GB GDDR6",
      "PCIe Version": "PCIe 4.0",
      "Power Draw": 263,
      "Length": 267,
      "Required PSU": "700W"
    },
    description: "A high-end RDNA 3 card offering excellent 1440p and strong 4K performance with a generous 16GB VRAM buffer.",
    purpose: "Aimed at enthusiasts who want top rasterized performance and plenty of VRAM headroom for years of future games.",
    howItWorks: "RDNA 3 compute units and a wide memory bus work together to sustain very high frame rates even at demanding settings.",
    whereItConnects: "Plugs into the PCIe x16 Slot and requires two 8-pin PCIe power connectors from the power supply.",
    facts: "AMD frequently offers more VRAM than NVIDIA at the same price tier, which is why creators editing large video files often lean towards Radeon cards.",
    mistakes: "Overlooking driver and software differences between AMD and NVIDIA (e.g. no CUDA support) when the PC will also be used for certain creative or AI software.",
    color: "from-red-800 to-rose-500",
    image: "/images/components/rx-7800-xt.png",
    renderSvg: gpuIcon(AMD_RED, "RX 7800XT"),
    quiz: [
      {
        question: "Why might a video editor or 3D artist specifically choose an NVIDIA GPU over an AMD one for certain software?",
        options: [
          "AMD GPUs cannot display video at all",
          "Some professional software relies on NVIDIA's proprietary CUDA technology",
          "NVIDIA GPUs are always cheaper"
        ],
        answer: 1,
        explanation: "Certain creative and AI applications are built specifically around NVIDIA's CUDA platform, so software compatibility (not just raw performance) can drive the brand choice."
      }
    ]
  }
];
