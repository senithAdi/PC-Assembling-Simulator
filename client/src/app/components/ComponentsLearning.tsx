import { useState } from "react";
import { Button } from "./ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "./ui/accordion";
import { Cpu, Zap, HardDrive, Disc, Fan, Box, ArrowLeft, BookOpen, CheckCircle2 } from "lucide-react";
import { motion } from "motion/react";

const componentData = [
  {
    id: "cpu",
    name: "CPU (Central Processing Unit)",
    icon: Cpu,
    color: "from-primary to-primary/70",
    description: "The brain of your computer that processes all instructions",
    overview: [
      "The CPU, or Central Processing Unit, is often called the \"brain\" of the computer. Almost everything you do — opening an app, loading a web page, running a game's logic — is ultimately carried out as instructions executed by the CPU. It fetches each instruction from memory, decodes what it means, performs the calculation or decision, and stores the result, repeating this cycle billions of times every second.",
      "Modern CPUs contain multiple cores, which act like several brains working side by side. A quad-core chip can handle four streams of work at once, and technologies such as hyper-threading let each core juggle two tasks at a time. This is why core count matters for multitasking and heavy jobs like video rendering, while a high clock speed (measured in GHz) still drives the snappy, responsive feel of everyday tasks and gaming.",
      "When choosing a CPU, the two things that matter most are performance for your intended use and compatibility with your motherboard's socket. Intel and AMD are the two main manufacturers, and each generation uses a specific socket (for example Intel's LGA1700 or AMD's AM5), so the CPU and motherboard must always be matched to each other.",
    ],
    keySpecs: ["Cores & Threads", "Clock Speed (GHz)", "Cache Size", "Socket Type"],
    compatibilityNotes: "Must match motherboard socket type (e.g., LGA1700, AM5)",
    useCases: ["Gaming", "Video Editing", "Programming", "General Computing"],
    details: [
      { title: "What is a CPU?", content: "The CPU is the primary component that executes instructions from programs. It performs calculations, makes decisions, and coordinates all other computer components." },
      { title: "Cores vs Threads", content: "Cores are physical processing units. More cores allow the CPU to handle multiple tasks simultaneously. Threads enable each core to work on multiple tasks through hyper-threading." },
      { title: "Clock Speed", content: "Measured in GHz (gigahertz), this indicates how many instructions a CPU can process per second. Higher speeds mean faster performance for single-threaded tasks." },
      { title: "Choosing a CPU", content: "Consider your budget, intended use (gaming vs productivity), and compatibility with your motherboard. Popular brands include Intel and AMD." }
    ],
    quiz: [
      { question: "What does CPU stand for?", options: ["Central Processing Unit", "Computer Power Unit", "Core Processing Unit"], answer: 0 },
      { question: "Higher core count is better for?", options: ["Single-threaded apps", "Multitasking", "Gaming only"], answer: 1 }
    ]
  },
  {
    id: "gpu",
    name: "GPU (Graphics Processing Unit)",
    icon: Zap,
    color: "from-secondary to-secondary/70",
    description: "Renders graphics and accelerates visual processing",
    overview: [
      "The GPU, or Graphics Processing Unit, is a specialised processor built to handle images, video, and 3D graphics. Where a CPU has a handful of very powerful cores, a GPU has hundreds or thousands of smaller cores that work together to perform many simple calculations at the same time — exactly what is needed to draw millions of pixels on screen smoothly and quickly.",
      "GPUs come in two forms. Integrated graphics are built directly into the CPU and are perfectly fine for web browsing, office work, and light gaming. Dedicated graphics cards are separate, far more powerful units and are essential for modern gaming, 3D modelling, video editing, and AI or machine-learning work.",
      "The specs to watch are the amount of video memory (VRAM), which stores textures and frame data for high resolutions, and the card's power draw. A dedicated GPU needs a PCIe x16 slot on the motherboard and a power supply with enough wattage and the correct connectors, so always confirm that your PSU and case can support the card before you buy it.",
    ],
    keySpecs: ["VRAM Size", "CUDA/Stream Processors", "Clock Speed", "Power Consumption"],
    compatibilityNotes: "Requires PCIe x16 slot and sufficient PSU wattage",
    useCases: ["Gaming", "3D Rendering", "Video Editing", "Machine Learning"],
    details: [
      { title: "What is a GPU?", content: "The GPU specializes in rendering images, videos, and animations. It's essential for gaming, video editing, and any graphics-intensive tasks." },
      { title: "Integrated vs Dedicated", content: "Integrated GPUs are built into CPUs (lower performance, no extra cost). Dedicated GPUs are separate cards (high performance, additional cost)." },
      { title: "VRAM Importance", content: "Video RAM (VRAM) stores textures and graphical data. More VRAM allows handling higher resolutions and more complex scenes. 8GB+ recommended for modern gaming." },
      { title: "Choosing a GPU", content: "Match GPU to your monitor resolution and refresh rate. Consider power requirements - high-end GPUs need 650W+ power supplies. NVIDIA and AMD are main manufacturers." }
    ],
    quiz: []
  },
  {
    id: "ram",
    name: "RAM (Random Access Memory)",
    icon: HardDrive,
    color: "from-accent to-accent/70",
    description: "Temporary fast storage for active programs and data",
    overview: [
      "RAM, or Random Access Memory, is your computer's short-term memory. It holds the data and programs that are currently in use so the CPU can reach them almost instantly. Unlike a hard drive or SSD, RAM is volatile — everything stored in it is cleared the moment the computer powers off.",
      "The more RAM you have, the more applications and browser tabs you can keep open at once without the system slowing down or stuttering. For most students and gamers, 16GB is the comfortable sweet spot; 8GB is enough for basic browsing and office work, while content creators and heavy multitaskers benefit from 32GB or more.",
      "RAM comes in generations such as DDR4 and DDR5, and it runs at different speeds (measured in MHz) with different latencies. It must match what the motherboard and CPU support. Installing two matched sticks so they run in dual channel is also noticeably faster than using a single stick of the same total capacity.",
    ],
    keySpecs: ["Capacity (GB)", "Speed (MHz)", "Type (DDR4/DDR5)", "Latency (CAS)"],
    compatibilityNotes: "Must match motherboard RAM type and speed support",
    useCases: ["Multitasking", "Gaming", "Content Creation", "Virtual Machines"],
    details: [
      { title: "What is RAM?", content: "RAM provides fast, temporary storage for actively running programs and data. When you close a program, its data is cleared from RAM." },
      { title: "How Much RAM Do You Need?", content: "8GB: Basic use, 16GB: Gaming & general use (recommended), 32GB+: Content creation, heavy multitasking, professional work." },
      { title: "RAM Speed & Timings", content: "Speed (MHz) affects data transfer rate. Lower latency (CAS) is better. DDR5 is newer and faster than DDR4, but requires compatible motherboard." },
      { title: "Dual Channel vs Single", content: "Using two RAM sticks (dual channel) provides better performance than one stick of the same total capacity. Always populate RAM slots in pairs when possible." }
    ],
    quiz: []
  },
  {
    id: "storage",
    name: "Storage (SSD/HDD)",
    icon: Disc,
    color: "from-primary to-secondary",
    description: "Permanent storage for operating system, programs, and files",
    overview: [
      "Storage is where your operating system, applications, and personal files live permanently — the data stays safe even when the power is turned off. It is the long-term memory of the computer, in contrast to RAM, which is only a fast temporary workspace.",
      "There are two main types. Hard disk drives (HDDs) store data on spinning magnetic platters; they are inexpensive and offer huge capacity, but they are slow and have moving parts that can wear out. Solid-state drives (SSDs) have no moving parts, so they are far faster, silent, and more reliable. A popular approach is to use a fast SSD for the operating system and games, together with a large HDD for mass storage of photos and videos.",
      "SSDs themselves come in two connection types. SATA SSDs connect with a cable and are already much faster than any HDD. NVMe SSDs are small M.2 sticks that plug directly into the motherboard and are several times faster again. Before buying, check which M.2 slots and SATA ports your motherboard provides.",
    ],
    keySpecs: ["Capacity", "Read/Write Speed", "Interface (SATA/NVMe)", "Form Factor"],
    compatibilityNotes: "Check for M.2 slots (NVMe) or SATA ports on motherboard",
    useCases: ["OS Installation", "Game Library", "File Storage", "Media Collections"],
    details: [
      { title: "SSD vs HDD", content: "SSDs are faster, silent, and more durable but more expensive. HDDs offer more storage for less money but are slower. Recommendation: SSD for OS and programs, HDD for mass storage." },
      { title: "NVMe vs SATA SSD", content: "NVMe SSDs use M.2 slot and are 5-7x faster than SATA SSDs. SATA SSDs use cable connection. Both are much faster than HDDs." },
      { title: "Storage Capacity Planning", content: "OS + Programs: 500GB SSD minimum, Gaming: 1TB+ SSD recommended (modern games are 50-150GB each), Media Storage: Consider 2-4TB HDD." },
      { title: "Form Factors", content: "M.2: Small stick that plugs directly into motherboard (NVMe or SATA). 2.5\": Laptop-sized drives (SSDs). 3.5\": Desktop-sized drives (HDDs)." }
    ],
    quiz: []
  },
  {
    id: "psu",
    name: "PSU (Power Supply Unit)",
    icon: Fan,
    color: "from-secondary to-accent",
    description: "Converts AC power to DC and distributes it to components",
    overview: [
      "The PSU, or Power Supply Unit, takes the high-voltage alternating current (AC) from your wall socket and converts it into the low-voltage direct current (DC) that computer components actually need. It then delivers clean, stable power to the motherboard, CPU, graphics card, drives, and fans.",
      "Choosing the right wattage is essential. Add up the power draw of your components — the GPU and CPU are usually the biggest — and leave roughly 20% of headroom so the supply never has to run at its absolute limit. A PSU that is too weak leads to random crashes and, in the worst case, can damage other parts.",
      "Quality matters more here than almost anywhere else in the build, because the power supply protects everything connected to it. Look for an 80 Plus efficiency rating (from Bronze up to Titanium) for less wasted heat and lower running costs, and consider a modular design, which lets you attach only the cables you need for cleaner airflow inside the case.",
    ],
    keySpecs: ["Wattage", "Efficiency Rating", "Modular/Non-Modular", "Connectors"],
    compatibilityNotes: "Calculate total system power draw + 20% headroom",
    useCases: ["Power Distribution", "Voltage Regulation", "System Stability"],
    details: [
      { title: "Understanding Wattage", content: "PSU wattage must exceed total system power consumption. Calculate: CPU + GPU + 100W for other components + 20% safety margin." },
      { title: "Efficiency Ratings", content: "80 Plus certifications (Bronze, Silver, Gold, Platinum, Titanium) indicate how efficiently PSU converts AC to DC. Higher efficiency = less heat and lower electricity bills." },
      { title: "Modular vs Non-Modular", content: "Non-modular: All cables permanently attached. Semi-modular: Main cables attached. Fully modular: All cables detachable. Modular improves cable management." },
      { title: "Sizing Your PSU", content: "Budget PC (350-450W), Mid-range gaming (550-650W), High-end gaming (750-850W), Enthusiast/Multi-GPU (1000W+). Don't skimp - quality PSU protects your components." }
    ],
    quiz: []
  },
  {
    id: "case",
    name: "PC Case",
    icon: Box,
    color: "from-accent to-primary",
    description: "Houses and protects all components with airflow",
    overview: [
      "The PC case, also called the chassis, is the enclosure that holds and protects every other component. It provides the mounting points for the motherboard, drives, power supply, and fans, and its design shapes how air flows through the system to keep everything cool.",
      "Cases come in sizes that match motherboard form factors: full tower (largest, most room to expand), mid tower (the most popular, well-balanced choice), and the compact micro-ATX and mini-ITX sizes. The case you pick must be large enough for your motherboard, long enough for your graphics card, and tall enough for your CPU cooler.",
      "Beyond size, airflow is what keeps a build running cool and quiet, so look for a mesh front panel and space for both intake and exhaust fans. Practical touches such as cable-management routing holes, removable dust filters, and a power-supply shroud make the build tidier, cooler, and much easier to maintain over time.",
    ],
    keySpecs: ["Form Factor", "Fan Mounts", "Drive Bays", "Cable Management"],
    compatibilityNotes: "Must fit motherboard size (ATX, Micro-ATX, Mini-ITX)",
    useCases: ["Component Housing", "Cooling Airflow", "Aesthetics"],
    details: [
      { title: "Case Sizes", content: "Full Tower: Largest, most expansion. Mid Tower: Most popular, good balance. Micro/Mini: Compact, limited expansion. Choose based on motherboard size and cooling needs." },
      { title: "Airflow & Cooling", content: "Good cases have front intake fans and rear/top exhaust fans. Mesh front panels provide better airflow than solid. Plan for at least 2-3 fans minimum." },
      { title: "Build Quality", content: "Check for: Tempered glass vs acrylic side panel, PSU shroud for cable hiding, removable dust filters, cable routing holes, drive cages." },
      { title: "Aesthetics vs Function", content: "RGB lighting is optional but popular. Prioritize airflow and build quality over looks. Ensure case has enough clearance for tall CPU coolers and long GPUs." }
    ],
    quiz: []
  }
];

export function ComponentsLearning({ onNavigate }: { onNavigate: (page: string) => void }) {
  const [selectedComponent, setSelectedComponent] = useState(componentData[0]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5">
      {/* Top Navigation */}
      <nav className="border-b border-border/50 backdrop-blur-xl bg-card/50 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="sm" onClick={() => onNavigate('dashboard')}>
              <ArrowLeft className="size-4 mr-2" />
              Dashboard
            </Button>
            <div className="flex items-center gap-2">
              <BookOpen className="size-5 text-primary" />
              <span className="font-semibold">Component Learning Center</span>
            </div>
          </div>
          <Button size="sm" variant="outline" onClick={() => onNavigate('simulator')}>
            Start Building
          </Button>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8 text-center"
        >
          <h1 className="text-4xl font-bold mb-3 bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
            Learn PC Components
          </h1>
          <p className="text-xl text-muted-foreground">Master computer hardware basics through interactive learning</p>
        </motion.div>

        <div className="grid grid-cols-4 gap-6">
          {/* Component List */}
          <div>
            <Card className="backdrop-blur-xl bg-card/80 border-primary/20 sticky top-24">
              <CardHeader>
                <CardTitle className="text-lg">Components</CardTitle>
                <CardDescription>Click to learn more</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                {componentData.map((component, i) => (
                  <motion.div
                    key={component.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.1 }}
                  >
                    <Card
                      className={`cursor-pointer transition-all ${
                        selectedComponent.id === component.id
                          ? 'border-primary bg-primary/5'
                          : 'border-border/50 hover:border-primary/40'
                      }`}
                      onClick={() => setSelectedComponent(component)}
                    >
                      <CardContent className="p-3">
                        <div className="flex items-center gap-3">
                          <div className={`size-10 rounded-lg bg-gradient-to-br ${component.color} flex items-center justify-center shrink-0`}>
                            <component.icon className="size-5 text-white" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <h4 className="font-semibold text-sm truncate">{component.name.split('(')[0]}</h4>
                            <p className="text-xs text-muted-foreground line-clamp-2">{component.description}</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </CardContent>
            </Card>
          </div>

          {/* Component Details */}
          <div className="col-span-3 space-y-6">
            <motion.div
              key={selectedComponent.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              {/* Component Header */}
              <Card className="backdrop-blur-xl bg-card/80 border-primary/20">
                <CardHeader>
                  <div className="flex items-center gap-4">
                    <div className={`size-16 rounded-2xl bg-gradient-to-br ${selectedComponent.color} flex items-center justify-center shrink-0`}>
                      <selectedComponent.icon className="size-8 text-white" />
                    </div>
                    <div>
                      <CardTitle className="text-2xl">{selectedComponent.name}</CardTitle>
                      <CardDescription className="text-base mt-1">{selectedComponent.description}</CardDescription>
                    </div>
                  </div>
                </CardHeader>
              </Card>

              {/* Detailed Information */}
              <Tabs defaultValue="learn" className="w-full">
                <TabsList className="grid grid-cols-4 w-full">
                  <TabsTrigger value="learn">Learn</TabsTrigger>
                  <TabsTrigger value="specs">Key Specs</TabsTrigger>
                  <TabsTrigger value="compatibility">Compatibility</TabsTrigger>
                  <TabsTrigger value="quiz">Quiz</TabsTrigger>
                </TabsList>

                <TabsContent value="learn" className="space-y-4">
                  {/* Overview */}
                  <Card className="backdrop-blur-xl bg-card/80 border-primary/20">
                    <CardHeader>
                      <CardTitle>Overview</CardTitle>
                      <CardDescription>A clear introduction to {selectedComponent.name.split('(')[0].trim()}</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      {selectedComponent.overview.map((paragraph, i) => (
                        <p key={i} className="text-muted-foreground leading-relaxed">
                          {paragraph}
                        </p>
                      ))}
                    </CardContent>
                  </Card>

                  {/* Deep-dive accordion */}
                  <Card className="backdrop-blur-xl bg-card/80 border-primary/20">
                    <CardHeader>
                      <CardTitle>Understanding {selectedComponent.name.split('(')[0].trim()}</CardTitle>
                      <CardDescription>Explore each topic in more detail</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <Accordion type="single" collapsible className="w-full">
                        {selectedComponent.details.map((detail, i) => (
                          <AccordionItem key={i} value={`item-${i}`}>
                            <AccordionTrigger className="text-left font-semibold">
                              {detail.title}
                            </AccordionTrigger>
                            <AccordionContent className="text-muted-foreground leading-relaxed">
                              {detail.content}
                            </AccordionContent>
                          </AccordionItem>
                        ))}
                      </Accordion>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="specs">
                  <Card className="backdrop-blur-xl bg-card/80 border-primary/20">
                    <CardHeader>
                      <CardTitle>Key Specifications</CardTitle>
                      <CardDescription>Important specs to consider when choosing</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {selectedComponent.keySpecs.map((spec, i) => (
                          <div key={i} className="flex items-center gap-3 p-4 rounded-lg bg-muted/30 border border-border/50">
                            <CheckCircle2 className="size-5 text-primary shrink-0" />
                            <span className="font-medium">{spec}</span>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="compatibility">
                  <Card className="backdrop-blur-xl bg-card/80 border-primary/20">
                    <CardHeader>
                      <CardTitle>Compatibility Guide</CardTitle>
                      <CardDescription>What you need to know before buying</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="p-6 rounded-xl bg-accent/10 border border-accent/20">
                        <p className="font-medium mb-2 text-accent">Important Note:</p>
                        <p className="text-muted-foreground">{selectedComponent.compatibilityNotes}</p>
                      </div>

                      <div className="mt-6">
                        <h4 className="font-semibold mb-4">Best Use Cases:</h4>
                        <div className="grid grid-cols-2 gap-3">
                          {selectedComponent.useCases.map((useCase, i) => (
                            <div key={i} className="p-3 rounded-lg bg-primary/5 border border-primary/20 text-center">
                              <span className="font-medium text-sm">{useCase}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="quiz">
                  <Card className="backdrop-blur-xl bg-card/80 border-primary/20">
                    <CardHeader>
                      <CardTitle>Test Your Knowledge</CardTitle>
                      <CardDescription>Check what you've learned</CardDescription>
                    </CardHeader>
                    <CardContent>
                      {selectedComponent.quiz.length > 0 ? (
                        <div className="space-y-6">
                          {selectedComponent.quiz.map((q, i) => (
                            <div key={i} className="space-y-3">
                              <h4 className="font-semibold">{i + 1}. {q.question}</h4>
                              <div className="space-y-2">
                                {q.options.map((option, oi) => (
                                  <Button
                                    key={oi}
                                    variant="outline"
                                    className="w-full justify-start text-left h-auto py-3"
                                  >
                                    {option}
                                  </Button>
                                ))}
                              </div>
                            </div>
                          ))}
                          <Button className="w-full bg-gradient-to-r from-primary to-secondary">
                            Submit Answers
                          </Button>
                        </div>
                      ) : (
                        <div className="text-center py-12 text-muted-foreground">
                          <BookOpen className="size-12 mx-auto mb-4 opacity-50" />
                          <p>Quiz coming soon! Complete the learning material first.</p>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}
