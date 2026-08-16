import { useState } from "react";
import { Button } from "./ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "./ui/accordion";
import { Cpu, Zap, HardDrive, Disc, Fan, Box, ArrowLeft, BookOpen, CheckCircle2, Info, Sparkles } from "lucide-react";
import { motion } from "motion/react";

const componentData = [
  {
    id: "cpu",
    name: "CPU (Central Processing Unit)",
    icon: Cpu,
    color: "from-primary to-primary/70",
    description: "The brain of your computer that processes all instructions",
    overview: [
      { heading: "The brain of the computer", text: "The CPU is often called the brain of the computer. Almost everything you do, from opening an app to loading a web page or running a game, is carried out as instructions that the CPU executes billions of times every second." },
      { heading: "Cores and clock speed", text: "Modern CPUs have several cores that work side by side, so more cores help with multitasking and heavy jobs like video editing. A higher clock speed, measured in GHz, keeps everyday tasks and games feeling fast and responsive." },
      { heading: "Choosing the right CPU", text: "Pick a CPU based on how you will use the computer and make sure it fits your motherboard socket. Intel and AMD are the two main brands, and each generation uses a specific socket such as Intel LGA1700 or AMD AM5, so the two must always match." },
    ],
    keySpecs: [
      { label: "Cores and Threads", hint: "How many tasks it handles at once" },
      { label: "Clock Speed (GHz)", hint: "How fast each core runs" },
      { label: "Cache Size", hint: "Small ultra fast on chip memory" },
      { label: "Socket Type", hint: "Must match the motherboard" },
    ],
    compatibilityNotes: "Must match the motherboard socket type, for example LGA1700 or AM5.",
    useCases: ["Gaming", "Video Editing", "Programming", "General Computing"],
    details: [
      { title: "What is a CPU?", content: "It runs the instructions from every program and coordinates all the other components." },
      { title: "Cores vs Threads", content: "Cores are physical units that work in parallel, and threads let each core handle more than one task." },
      { title: "What is clock speed?", content: "Measured in GHz, it shows how fast a core works, which helps everyday and gaming tasks feel quick." },
      { title: "How do I choose one?", content: "Match it to your budget and use, then make sure it fits your motherboard socket." },
    ],
  },
  {
    id: "gpu",
    name: "GPU (Graphics Processing Unit)",
    icon: Zap,
    color: "from-secondary to-secondary/70",
    description: "Renders graphics and accelerates visual processing",
    overview: [
      { heading: "Built for graphics", text: "The GPU is a processor made for images, video, and 3D graphics. It has hundreds or thousands of small cores that work at the same time to draw millions of pixels on screen smoothly." },
      { heading: "Integrated or dedicated", text: "Integrated graphics are built into the CPU and suit browsing, office work, and light gaming. A dedicated graphics card is a separate and far more powerful unit that you need for modern gaming, 3D design, video editing, and AI work." },
      { heading: "What to check before buying", text: "Look at the amount of video memory, called VRAM, which stores textures for high resolutions, and check the power the card needs. A dedicated GPU uses a PCIe x16 slot and requires a power supply with enough wattage and the correct connectors." },
    ],
    keySpecs: [
      { label: "VRAM Size", hint: "Memory for textures and high resolutions" },
      { label: "Stream and CUDA Cores", hint: "Parallel units that draw the image" },
      { label: "Clock Speed", hint: "How fast the GPU runs" },
      { label: "Power Consumption", hint: "Wattage your power supply must give" },
    ],
    compatibilityNotes: "Requires a PCIe x16 slot and a power supply with enough wattage.",
    useCases: ["Gaming", "3D Rendering", "Video Editing", "Machine Learning"],
    details: [
      { title: "What is a GPU?", content: "It renders images, video, and animations, which makes it essential for games and creative work." },
      { title: "Integrated vs Dedicated", content: "Integrated graphics sit inside the CPU, while a dedicated card is separate and far more powerful." },
      { title: "Why does VRAM matter?", content: "VRAM stores textures and frame data, so more of it helps at higher resolutions." },
      { title: "How do I choose one?", content: "Match it to your monitor and make sure your power supply can handle it." },
    ],
  },
  {
    id: "ram",
    name: "RAM (Random Access Memory)",
    icon: HardDrive,
    color: "from-accent to-accent/70",
    description: "Temporary fast storage for active programs and data",
    overview: [
      { heading: "Short term memory", text: "RAM is the short term memory of the computer. It holds the programs and data you are using right now so the CPU can reach them instantly. Everything in RAM is cleared when the computer powers off." },
      { heading: "How much you need", text: "More RAM lets you keep more apps and browser tabs open at once without slowing down. 8GB suits basic use, 16GB is the comfortable choice for gaming and general use, and 32GB or more helps with content creation and heavy multitasking." },
      { heading: "Speed and matching", text: "RAM comes in generations such as DDR4 and DDR5 and runs at different speeds in MHz. It must match what your motherboard supports, and fitting two matched sticks so they run in dual channel is faster than a single stick of the same size." },
    ],
    keySpecs: [
      { label: "Capacity (GB)", hint: "How many programs stay open at once" },
      { label: "Speed (MHz)", hint: "How quickly data moves" },
      { label: "Type (DDR4 or DDR5)", hint: "Generation the board supports" },
      { label: "Latency (CAS)", hint: "Response delay, lower is better" },
    ],
    compatibilityNotes: "Must match the memory type and speed the motherboard supports.",
    useCases: ["Multitasking", "Gaming", "Content Creation", "Virtual Machines"],
    details: [
      { title: "What is RAM?", content: "It gives the CPU fast temporary space for the programs you are using right now." },
      { title: "How much do I need?", content: "8GB for basics, 16GB for gaming and general use, and 32GB or more for heavy work." },
      { title: "What about speed and timings?", content: "Higher MHz moves data faster and lower latency responds quicker, and DDR5 is newer than DDR4." },
      { title: "What is dual channel?", content: "Two matched sticks run faster than one stick of the same total size." },
    ],
  },
  {
    id: "storage",
    name: "Storage (SSD/HDD)",
    icon: Disc,
    color: "from-primary to-secondary",
    description: "Permanent storage for operating system, programs, and files",
    overview: [
      { heading: "Long term memory", text: "Storage is where your operating system, apps, and files stay permanently, even when the power is off. Unlike RAM, it keeps your data safe for the long term." },
      { heading: "SSD or HDD", text: "A hard disk drive, or HDD, is cheap and offers large capacity but is slow. A solid state drive, or SSD, has no moving parts, so it is much faster, quieter, and more reliable. Many builds use an SSD for the system and a large HDD for extra storage." },
      { heading: "Connection types", text: "SATA drives connect with a cable and are already far quicker than a hard disk. NVMe drives are small M.2 sticks that plug straight into the motherboard and are faster again. Check which M.2 slots and SATA ports your board has before buying." },
    ],
    keySpecs: [
      { label: "Capacity", hint: "How much you can store" },
      { label: "Read and Write Speed", hint: "How fast files load and save" },
      { label: "Interface (SATA or NVMe)", hint: "Cable drive or M.2 slot" },
      { label: "Form Factor", hint: "Physical size and how it mounts" },
    ],
    compatibilityNotes: "Check the motherboard for M.2 slots for NVMe drives or SATA ports for cable drives.",
    useCases: ["OS Installation", "Game Library", "File Storage", "Media Collections"],
    details: [
      { title: "SSD vs HDD", content: "SSDs are fast and reliable, while HDDs are cheaper with more space for the money." },
      { title: "NVMe vs SATA", content: "NVMe M.2 drives are much faster than SATA drives, and both beat a hard disk." },
      { title: "How much capacity?", content: "Aim for at least a 500GB SSD, then add more space for a large game or media library." },
      { title: "What are form factors?", content: "M.2 sticks fit on the board, while 2.5 inch and 3.5 inch drives mount inside the case." },
    ],
  },
  {
    id: "psu",
    name: "PSU (Power Supply Unit)",
    icon: Fan,
    color: "from-secondary to-accent",
    description: "Converts AC power to DC and distributes it to components",
    overview: [
      { heading: "Powers everything", text: "The power supply takes the alternating current from your wall socket and turns it into the steady low voltage direct current that computer parts need. It then feeds clean power to the motherboard, CPU, graphics card, drives, and fans." },
      { heading: "Getting the wattage right", text: "Add up the power your parts draw, mostly the GPU and CPU, and leave about 20 percent of headroom so the supply never runs at its limit. A supply that is too weak causes crashes and can even damage components." },
      { heading: "Why quality matters", text: "The power supply protects everything connected to it, so quality is important. Choose one with an 80 Plus efficiency rating for less wasted heat, and consider a modular design that lets you attach only the cables you need for tidier airflow." },
    ],
    keySpecs: [
      { label: "Wattage", hint: "Total power it can deliver" },
      { label: "Efficiency Rating", hint: "80 Plus level, less wasted heat" },
      { label: "Modular Cables", hint: "Attach only the cables you need" },
      { label: "Connectors", hint: "Plugs for the board, CPU, and GPU" },
    ],
    compatibilityNotes: "Add up the total power your system draws and add about 20 percent of headroom.",
    useCases: ["Power Distribution", "Voltage Regulation", "System Stability"],
    details: [
      { title: "Understanding wattage", content: "The supply must provide more power than all your parts draw combined, plus some headroom." },
      { title: "What are efficiency ratings?", content: "An 80 Plus rating shows how efficiently it works, which means less wasted heat." },
      { title: "What are modular cables?", content: "Modular supplies let you attach only the cables you need for cleaner airflow." },
      { title: "How do I size a PSU?", content: "Budget builds need around 450W, while high end gaming builds often need 750W or more." },
    ],
  },
  {
    id: "case",
    name: "PC Case",
    icon: Box,
    color: "from-accent to-primary",
    description: "Houses and protects all components with airflow",
    overview: [
      { heading: "The home for your parts", text: "The case, also called the chassis, holds and protects every other component. It gives the motherboard, drives, power supply, and fans a place to mount and guides air through the system to keep things cool." },
      { heading: "Pick the right size", text: "Cases match motherboard sizes: full tower with the most room, mid tower as the popular balanced choice, and the compact Micro ATX and Mini ITX sizes. The case must fit your board, your graphics card length, and your cooler height." },
      { heading: "Airflow and features", text: "Good airflow keeps a build cool and quiet, so look for a mesh front and space for intake and exhaust fans. Handy features like cable routing holes, dust filters, and a power supply shroud make the build tidy and easy to maintain." },
    ],
    keySpecs: [
      { label: "Form Factor", hint: "Board sizes it can fit" },
      { label: "Fan Mounts", hint: "Room for cooling airflow" },
      { label: "Drive Bays", hint: "Slots for SSDs and HDDs" },
      { label: "Cable Management", hint: "Space to route cables neatly" },
    ],
    compatibilityNotes: "Must fit the motherboard size, such as ATX, Micro ATX, or Mini ITX.",
    useCases: ["Component Housing", "Cooling Airflow", "Aesthetics"],
    details: [
      { title: "What sizes are there?", content: "Full tower offers the most room, mid tower is the balanced favourite, and Micro or Mini sizes stay compact." },
      { title: "How does airflow work?", content: "Intake and exhaust fans with a mesh front keep temperatures low." },
      { title: "What makes a good case?", content: "Look for tempered glass, dust filters, and room to route cables neatly." },
      { title: "Looks or function?", content: "Put airflow and clearance for tall coolers and long cards ahead of lighting." },
    ],
  },
];

export function ComponentsLearning({ onNavigate }: { onNavigate: (page: string) => void }) {
  const [selectedComponent, setSelectedComponent] = useState(componentData[0]);
  const shortName = selectedComponent.name.split('(')[0].trim();

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
                          <h4 className="font-semibold text-sm truncate">{component.name.split('(')[0].trim()}</h4>
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
                <TabsList className="grid grid-cols-3 w-full">
                  <TabsTrigger value="learn">Learn</TabsTrigger>
                  <TabsTrigger value="specs">Key Specs</TabsTrigger>
                  <TabsTrigger value="compatibility">Compatibility</TabsTrigger>
                </TabsList>

                <TabsContent value="learn" className="space-y-4">
                  {/* Overview */}
                  <Card className="backdrop-blur-xl bg-card/80 border-primary/20 overflow-hidden">
                    <div className={`h-1.5 bg-gradient-to-r ${selectedComponent.color}`} />
                    <CardHeader>
                      <div className="flex items-center gap-2">
                        <Sparkles className="size-5 text-primary" />
                        <CardTitle>Overview</CardTitle>
                      </div>
                      <CardDescription>A clear introduction to {shortName}</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-5">
                      {selectedComponent.overview.map((block, i) => (
                        <div key={i} className="flex gap-4">
                          <div className={`size-9 shrink-0 rounded-xl bg-gradient-to-br ${selectedComponent.color} text-white flex items-center justify-center font-semibold`}>
                            {i + 1}
                          </div>
                          <div>
                            <h4 className="font-semibold mb-1">{block.heading}</h4>
                            <p className="text-muted-foreground leading-relaxed">{block.text}</p>
                          </div>
                        </div>
                      ))}
                    </CardContent>
                  </Card>

                  {/* Brief question and answer accordion */}
                  <Card className="backdrop-blur-xl bg-card/80 border-primary/20">
                    <CardHeader>
                      <CardTitle>Explore each topic in more detail</CardTitle>
                      <CardDescription>Quick answers to common questions</CardDescription>
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
                      <CardDescription>The important specs to look at when choosing</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="grid sm:grid-cols-2 gap-3">
                        {selectedComponent.keySpecs.map((spec, i) => (
                          <div
                            key={i}
                            className="p-4 rounded-xl bg-muted/30 border border-border/50 hover:border-primary/40 transition-colors"
                          >
                            <div className="flex items-center gap-2 mb-1">
                              <CheckCircle2 className="size-4 text-primary shrink-0" />
                              <span className="font-semibold text-sm">{spec.label}</span>
                            </div>
                            <p className="text-xs text-muted-foreground pl-6">{spec.hint}</p>
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
                      <div className="flex gap-3 p-5 rounded-xl bg-accent/10 border border-accent/20">
                        <Info className="size-5 text-accent shrink-0 mt-0.5" />
                        <div>
                          <p className="font-medium mb-1 text-accent">Important note</p>
                          <p className="text-muted-foreground">{selectedComponent.compatibilityNotes}</p>
                        </div>
                      </div>

                      <div className="mt-6">
                        <h4 className="font-semibold mb-4">Best use cases</h4>
                        <div className="grid grid-cols-2 gap-3">
                          {selectedComponent.useCases.map((useCase, i) => (
                            <div
                              key={i}
                              className="flex items-center gap-2 p-3 rounded-lg bg-primary/5 border border-primary/20"
                            >
                              <CheckCircle2 className="size-4 text-primary shrink-0" />
                              <span className="font-medium text-sm">{useCase}</span>
                            </div>
                          ))}
                        </div>
                      </div>
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
