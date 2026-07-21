import { BuildScenario } from "./types";

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
