import { useState, useEffect } from "react";
import { DndProvider, useDrag, useDrop } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { Button } from "./ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { Progress } from "./ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { Separator } from "./ui/separator";
import { ScrollArea } from "./ui/scroll-area";
import {
  Cpu,
  Zap,
  HardDrive,
  Disc,
  Fan,
  Box,
  AlertCircle,
  CheckCircle2,
  TrendingUp,
  ArrowLeft,
  Lightbulb,
  Save,
  Trophy,
  Star,
  Activity,
  Award,
  PlayCircle
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import confetti from "canvas-confetti";
import { componentsRegistry, buildScenarios, ComponentMetadata, BuildScenario } from "./componentsMetadata";

// Visual placeholder for sound effect
function triggerPlacementSound() {
  try {
    const audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();
    const oscillator = audioCtx.createOscillator();
    const gainNode = audioCtx.createGain();
    
    oscillator.connect(gainNode);
    gainNode.connect(audioCtx.destination);
    
    oscillator.type = "sine";
    oscillator.frequency.setValueAtTime(880, audioCtx.currentTime); // A5 note
    gainNode.gain.setValueAtTime(0.1, audioCtx.currentTime);
    
    oscillator.start();
    gainNode.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 0.15);
    oscillator.stop(audioCtx.currentTime + 0.15);
  } catch (e) {
    console.log("Audio not supported or blocked by browser policy");
  }
}

function triggerErrorSound() {
  try {
    const audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();
    const oscillator = audioCtx.createOscillator();
    const gainNode = audioCtx.createGain();
    
    oscillator.connect(gainNode);
    gainNode.connect(audioCtx.destination);
    
    oscillator.type = "sawtooth";
    oscillator.frequency.setValueAtTime(150, audioCtx.currentTime); // Low buzz
    gainNode.gain.setValueAtTime(0.15, audioCtx.currentTime);
    
    oscillator.start();
    gainNode.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 0.3);
    oscillator.stop(audioCtx.currentTime + 0.3);
  } catch (e) {
    console.log("Audio not supported or blocked by browser policy");
  }
}

interface DraggableComponentProps {
  component: ComponentMetadata;
  onSelect: (comp: ComponentMetadata) => void;
}

function DraggableComponent({ component, onSelect }: DraggableComponentProps) {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: 'component',
    item: component,
    collect: (monitor) => ({
      isDragging: monitor.isDragging()
    })
  }));

  return (
    <div
      ref={drag}
      className={`cursor-move transition-all ${isDragging ? 'opacity-40 scale-95' : 'opacity-100'}`}
      onClick={() => onSelect(component)}
    >
      <Card className="backdrop-blur-xl bg-card/80 border-primary/20 hover:shadow-md hover:border-primary/50 transition-all group relative overflow-hidden">
        <CardContent className="p-3">
          <div className="flex items-center gap-3">
            <div className="size-12 shrink-0 rounded-lg bg-slate-900 border border-slate-700/50 flex items-center justify-center group-hover:scale-105 transition-transform">
              {component.renderSvg("size-10")}
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between gap-1">
                <h4 className="font-semibold text-xs text-foreground truncate">{component.name}</h4>
                <Badge className="text-[10px] scale-90 px-1 py-0 bg-primary/10 text-primary border-primary/20 shrink-0">
                  {component.difficulty}
                </Badge>
              </div>
              <p className="text-[10px] text-muted-foreground truncate">{component.description}</p>
              <div className="flex flex-wrap gap-1 mt-1">
                {Object.entries(component.specs).slice(0, 2).map(([key, val]) => (
                  <span key={key} className="text-[9px] bg-muted/65 text-muted-foreground px-1 rounded">
                    {key}: {val}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

interface InteractiveDropZoneProps {
  label: string;
  acceptType: string;
  installedComponent?: ComponentMetadata;
  activeDragItem: ComponentMetadata | null;
  onDrop: (item: ComponentMetadata) => void;
  compatibilityChecker: (item: ComponentMetadata) => { compatible: boolean; message: string };
  styleClasses: string;
}

function InteractiveDropZone({
  label,
  acceptType,
  installedComponent,
  activeDragItem,
  onDrop,
  compatibilityChecker,
  styleClasses
}: InteractiveDropZoneProps) {
  const isCorrectType = activeDragItem && activeDragItem.type === acceptType;
  
  // Check compatibility dynamically on hover
  let isHoverCompatible = true;
  let hoverMessage = "";
  if (isCorrectType && activeDragItem) {
    const check = compatibilityChecker(activeDragItem);
    isHoverCompatible = check.compatible;
    hoverMessage = check.message;
  }

  const [{ isOver }, drop] = useDrop(() => ({
    accept: 'component',
    canDrop: (item: ComponentMetadata) => item.type === acceptType,
    drop: (item: ComponentMetadata) => {
      onDrop(item);
    },
    collect: (monitor) => ({
      isOver: monitor.isOver()
    })
  }), [acceptType, compatibilityChecker, onDrop]);

  return (
    <div
      ref={drop}
      className={`absolute flex flex-col items-center justify-center rounded-lg border-2 border-dashed transition-all duration-300 ${styleClasses} ${
        installedComponent 
          ? 'border-emerald-500/60 bg-emerald-500/5 hover:bg-emerald-500/10' 
          : isOver && isCorrectType
            ? isHoverCompatible 
              ? 'border-emerald-400 bg-emerald-400/20 shadow-lg scale-105 z-20 animate-pulse'
              : 'border-rose-500 bg-rose-500/20 shadow-lg scale-105 z-20 animate-bounce'
            : isCorrectType
              ? 'border-sky-400 bg-sky-400/5 animate-pulse border-solid'
              : 'border-slate-600/40 hover:border-slate-500/80 bg-slate-950/20'
      }`}
      title={installedComponent ? `Installed: ${installedComponent.name}` : `Place ${acceptType} here`}
    >
      {installedComponent ? (
        <div className="size-full flex flex-col items-center justify-center p-1 relative group">
          <div className="size-5/6 flex items-center justify-center">
            {installedComponent.renderSvg("size-full max-h-full object-contain")}
          </div>
          <span className="absolute bottom-1 bg-emerald-950/90 text-emerald-300 border border-emerald-500/30 px-1 py-0.5 rounded text-[8px] max-w-[90%] truncate font-medium">
            {installedComponent.model}
          </span>
        </div>
      ) : (
        <div className="text-center p-1 pointer-events-none">
          <p className="text-[10px] font-bold opacity-80 uppercase tracking-wider text-muted-foreground">
            {label}
          </p>
          {isOver && isCorrectType && !isHoverCompatible && (
            <span className="text-[8px] text-rose-400 font-bold block max-w-[120px] leading-tight">
              Incompatible!
            </span>
          )}
        </div>
      )}
    </div>
  );
}

export function PCSimulator({ onNavigate }: { onNavigate: (page: string) => void }) {
  // Simulator State
  const [selectedScenario, setSelectedScenario] = useState<BuildScenario | null>(null);
  const [installedComponents, setInstalledComponents] = useState<Record<string, ComponentMetadata>>({});
  const [highlightedComponent, setHighlightedComponent] = useState<ComponentMetadata>(componentsRegistry[0]);
  const [activeDragItem, setActiveDragItem] = useState<ComponentMetadata | null>(null);
  
  // Quiz State
  const [activeQuiz, setActiveQuiz] = useState<typeof componentsRegistry[0]['quiz'][0] | null>(null);
  const [quizAnswerSelected, setQuizAnswerSelected] = useState<number | null>(null);
  const [quizSubmitted, setQuizSubmitted] = useState(false);
  const [quizStatus, setQuizStatus] = useState<"correct" | "incorrect" | null>(null);
  
  // Gamification & Progress State
  const [score, setScore] = useState(0);
  const [xp, setXp] = useState(100);
  const [level, setLevel] = useState(1);
  const [mistakes, setMistakes] = useState(0);
  const [totalAttempts, setTotalAttempts] = useState(0);
  const [achievements, setAchievements] = useState<string[]>([]);
  const [showAchievementsPopup, setShowAchievementsPopup] = useState<string | null>(null);
  
  // AI Tutor & Notifications
  const [aiTutorMessage, setAiTutorMessage] = useState("Welcome to the simulator! Let's start by dragging and mounting the Motherboard into the Case tray.");
  const [compatibilityError, setCompatibilityError] = useState<string | null>(null);
  const [wiggleState, setWiggleState] = useState<string | null>(null); // For shakes
  const [isBooted, setIsBooted] = useState(false);
  const [showBootModal, setShowBootModal] = useState(false);
  const [tabFilter, setTabFilter] = useState("all");

  // Keep track of level threshold
  useEffect(() => {
    const nextLevelThreshold = level * 300;
    if (xp >= nextLevelThreshold) {
      setLevel(prev => prev + 1);
      setAiTutorMessage(`Level Up! You are now a Level ${level + 1} Builder!`);
      triggerConfetti();
    }
  }, [xp, level]);

  // Compute accuracy score
  const accuracy = totalAttempts === 0 ? 100 : Math.round(((totalAttempts - mistakes) / totalAttempts) * 100);

  // Completion Percentage calculation based on required items
  const requiredParts = ["Motherboard", "CPU", "Paste", "Cooler", "RAM", "SSD", "GPU", "PSU", "Case"];
  const installedCount = requiredParts.filter(p => installedComponents[p]).length;
  const completionPercentage = Math.round((installedCount / requiredParts.length) * 100);

  const triggerConfetti = () => {
    confetti({
      particleCount: 80,
      spread: 60,
      origin: { y: 0.6 }
    });
  };

  const handleSelectScenario = (sc: BuildScenario | null) => {
    setSelectedScenario(sc);
    setInstalledComponents({});
    setAiTutorMessage(sc 
      ? `Scenario: ${sc.title} selected! Review the objectives on the right, then select and mount the Motherboard.`
      : "Free build mode selected! Build any custom computer configuration."
    );
    setIsBooted(false);
  };

  // Motherboard and component compatibility verification engine
  const checkCompatibility = (dragged: ComponentMetadata): { compatible: boolean; message: string } => {
    if (dragged.type === "Motherboard") {
      return { compatible: true, message: "Valid slot." };
    }

    const mobo = installedComponents["Motherboard"];
    if (!mobo) {
      return { compatible: false, message: "Install the Motherboard in the Case tray first!" };
    }

    // CPU Socket Compatibility
    if (dragged.type === "CPU") {
      const moboSocket = mobo.specs["Socket"];
      const cpuSocket = dragged.specs["Socket"];
      if (moboSocket !== cpuSocket) {
        return { 
          compatible: false, 
          message: `This motherboard uses the ${moboSocket} socket while your processor requires an ${cpuSocket} socket. Intel and AMD processors require different motherboard sockets.`
        };
      }
    }

    // Thermal Paste depends on CPU
    if (dragged.type === "Paste") {
      if (!installedComponents["CPU"]) {
        return { compatible: false, message: "Install the CPU into the motherboard socket before applying thermal paste." };
      }
    }

    // Cooler compatibility
    if (dragged.type === "Cooler") {
      if (!installedComponents["Paste"]) {
        return { compatible: false, message: "Apply thermal paste to the processor cover before attaching the CPU cooler." };
      }
      const cpu = installedComponents["CPU"];
      if (cpu) {
        const coolerSockets = String(dragged.specs["Compatible Sockets"]);
        const cpuSocket = String(cpu.specs["Socket"]);
        if (!coolerSockets.includes(cpuSocket)) {
          return {
            compatible: false,
            message: `This CPU cooler lacks hardware mounting support for your CPU's ${cpuSocket} socket.`
          };
        }
      }
    }

    // RAM Type compatibility
    if (dragged.type === "RAM") {
      const moboRam = mobo.specs["RAM Support"];
      const ramType = dragged.specs["Type"];
      if (moboRam !== ramType) {
        return {
          compatible: false,
          message: `This motherboard is designed for ${moboRam} memory slots, but you dragged a ${ramType} module. They are physically shaped differently.`
        };
      }
    }

    // PSU Wattage verification
    if (dragged.type === "PSU") {
      const cpuPower = installedComponents["CPU"]?.specs["Power Draw"] as number || 100;
      const gpuPower = installedComponents["GPU"]?.specs["Power Draw"] as number || 0;
      const totalPowerEst = cpuPower + gpuPower + 100;
      const psuWattage = dragged.specs["Wattage"] as number;

      if (psuWattage < totalPowerEst) {
        return {
          compatible: false,
          message: `This power supply wattage rating (${psuWattage}W) is lower than the estimated system demand (${totalPowerEst}W) under full load. Choose a higher wattage PSU.`
        };
      }
    }

    // Case matching Motherboard size
    if (dragged.type === "Case") {
      const moboSize = mobo.specs["Form Factor"] as string;
      const caseSizes = String(dragged.specs["Motherboard Support"]);
      if (!caseSizes.includes(moboSize)) {
        return {
          compatible: false,
          message: `This ATX size motherboard (${moboSize}) is physically too large to fit in this smaller compact case.`
        };
      }
    }

    return { compatible: true, message: "Component compatible!" };
  };

  const handleDrop = (item: ComponentMetadata) => {
    setTotalAttempts(prev => prev + 1);
    const check = checkCompatibility(item);

    if (check.compatible) {
      // Correct placement
      setInstalledComponents(prev => ({ ...prev, [item.type]: item }));
      setScore(prev => prev + 50);
      setXp(prev => prev + 50);
      setAiTutorMessage(`Great choice! The ${item.name} has been successfully mounted. Let's study its functionality.`);
      setCompatibilityError(null);
      setHighlightedComponent(item);
      triggerPlacementSound();
      triggerConfetti();

      // Trigger achievement check
      checkAchievementsUnlocked(item.type);

      // Quiz mode popup if component contains quizzes
      if (item.quiz && item.quiz.length > 0) {
        // Find if any quiz has not been done yet, pick one
        const randomQuizIndex = Math.floor(Math.random() * item.quiz.length);
        const quizObj = item.quiz[randomQuizIndex];
        setTimeout(() => {
          setActiveQuiz(quizObj);
          setQuizAnswerSelected(null);
          setQuizSubmitted(false);
          setQuizStatus(null);
        }, 1200);
      }
    } else {
      // Incompatible placement
      setWiggleState(item.type);
      setMistakes(prev => prev + 1);
      setScore(prev => Math.max(0, prev - 20));
      setXp(prev => Math.max(0, prev - 10));
      setCompatibilityError(check.message);
      setAiTutorMessage(`Placement Error: ${check.message}`);
      triggerErrorSound();
      
      // Reset wiggle animation state
      setTimeout(() => {
        setWiggleState(null);
      }, 1000);
    }
  };

  const checkAchievementsUnlocked = (placedType: string) => {
    let unlocked: string | null = null;
    if (placedType === "CPU" && !achievements.includes("Correct CPU")) {
      unlocked = "Correct CPU";
    } else if (placedType === "RAM" && !achievements.includes("Correct RAM")) {
      unlocked = "Correct RAM";
    } else if (placedType === "PSU" && !achievements.includes("Power Master")) {
      unlocked = "Power Master";
    } else if (placedType === "Cables" && !achievements.includes("Cable Manager")) {
      unlocked = "Cable Manager";
    }

    if (unlocked) {
      setAchievements(prev => [...prev, unlocked!]);
      setXp(prev => prev + 100);
      setShowAchievementsPopup(unlocked);
      setTimeout(() => {
        setShowAchievementsPopup(null);
      }, 3500);
    }
  };

  const handleQuizSubmit = () => {
    if (quizAnswerSelected === null) return;
    setQuizSubmitted(true);
    if (quizAnswerSelected === activeQuiz?.answer) {
      setQuizStatus("correct");
      setScore(prev => prev + 20);
      setXp(prev => prev + 25);
      setAiTutorMessage("Correct answer! You earned +25 XP.");
      triggerPlacementSound();
    } else {
      setQuizStatus("incorrect");
      setAiTutorMessage("Incorrect answer. Read the explanation below to understand why.");
      triggerErrorSound();
    }
  };

  const handleCompleteBuild = () => {
    // Check validation checklist
    const missing = [];
    if (!installedComponents["Motherboard"]) missing.push("Motherboard");
    if (!installedComponents["CPU"]) missing.push("Processor (CPU)");
    if (!installedComponents["Paste"]) missing.push("Thermal Paste");
    if (!installedComponents["Cooler"]) missing.push("CPU Cooler");
    if (!installedComponents["RAM"]) missing.push("Memory (RAM)");
    if (!installedComponents["SSD"] && !installedComponents["HDD"]) missing.push("Storage Drive");
    if (!installedComponents["PSU"]) missing.push("Power Supply (PSU)");
    if (!installedComponents["Case"]) missing.push("Case Chassis");

    if (missing.length > 0) {
      setAiTutorMessage(`Missing Components: Your PC build is incomplete. Please install the following: ${missing.join(", ")}`);
      triggerErrorSound();
      return;
    }

    // Verify scenario criteria if active
    if (selectedScenario) {
      const validator = selectedScenario.validators(installedComponents);
      if (!validator.passed) {
        setAiTutorMessage(`Scenario Validation Failed: ${validator.reason}`);
        triggerErrorSound();
        return;
      }
    }

    // Complete build success
    setIsBooted(true);
    setShowBootModal(true);
    setScore(prev => prev + 200);
    setXp(prev => prev + 200);
    triggerConfetti();
    triggerPlacementSound();
    
    // Unlock Legend achievement
    if (!achievements.includes("PC Builder")) {
      setTimeout(() => {
        setAchievements(prev => [...prev, "PC Builder"]);
        setShowAchievementsPopup("PC Builder");
      }, 4000);
    }
  };

  // SVG representation of Motherboard and layout mapping
  const renderMotherboardMap = () => {
    const isMoboPlaced = !!installedComponents["Motherboard"];
    
    return (
      <div className="relative w-full aspect-[4/3] bg-slate-950 rounded-2xl border-4 border-slate-800 overflow-hidden shadow-inner group">
        {/* Render Motherboard Visual when installed */}
        {isMoboPlaced ? (
          <div className="relative size-full">
            {/* Detailed motherboard tracks drawing */}
            <svg className="absolute inset-0 size-full pointer-events-none opacity-50" viewBox="0 0 100 100" fill="none">
              {/* Circular trace highlights */}
              <circle cx="50" cy="50" r="30" stroke="#3B82F6" strokeWidth="0.5" strokeDasharray="2 4" />
              <circle cx="50" cy="50" r="45" stroke="#8B5CF6" strokeWidth="0.3" strokeDasharray="1 5" />
              {/* Gold circuit paths */}
              <line x1="20" y1="20" x2="50" y2="20" stroke="#FBBF24" strokeWidth="0.3" />
              <line x1="50" y1="20" x2="60" y2="40" stroke="#FBBF24" strokeWidth="0.3" />
              <line x1="20" y1="35" x2="80" y2="35" stroke="#4F46E5" strokeWidth="0.4" />
              <line x1="80" y1="35" x2="80" y2="70" stroke="#4F46E5" strokeWidth="0.4" />
              <line x1="15" y1="65" x2="85" y2="65" stroke="#10B981" strokeWidth="0.3" />
              {/* Solder capacitors */}
              <circle cx="15" cy="15" r="2.5" fill="#4B5563" />
              <circle cx="15" cy="85" r="2.5" fill="#4B5563" />
              <circle cx="85" cy="15" r="2.5" fill="#4B5563" />
              <circle cx="85" cy="85" r="2.5" fill="#4B5563" />
            </svg>

            {/* Rear I/O Panel Visual */}
            <div className="absolute top-[18%] left-[2%] w-[6%] h-[38%] bg-zinc-800 border border-zinc-600 rounded-sm flex flex-col items-center justify-around py-2">
              <div className="w-3/4 h-2 bg-blue-600 rounded-sm" title="USB 3.0" />
              <div className="w-3/4 h-2 bg-zinc-950 rounded-sm" title="USB 2.0" />
              <div className="w-3/4 h-2 bg-rose-600 rounded-sm" title="Audio Jack" />
            </div>

            {/* CMOS Battery Visual */}
            <div className="absolute top-[68%] left-[55%] w-[12%] h-[15%] rounded-full border-4 border-zinc-700 bg-zinc-400 flex items-center justify-center text-[7px] text-zinc-800 font-bold shadow shadow-black">
              CR2032
            </div>

            {/* Chipset Heatsink Visual */}
            <div className="absolute top-[52%] left-[68%] w-[15%] h-[20%] bg-gradient-to-br from-indigo-950 to-indigo-800 border border-indigo-500 rounded flex items-center justify-center p-1 text-[8px] text-indigo-200 font-bold text-center">
              CHIPSET
            </div>

            {/* Render 24-Pin ATX Power Slot */}
            <InteractiveDropZone
              label="24-Pin"
              acceptType="Cables"
              installedComponent={installedComponents["Cables"]}
              activeDragItem={activeDragItem}
              onDrop={handleDrop}
              compatibilityChecker={checkCompatibility}
              styleClasses={`top-[22%] left-[82%] w-[8%] h-[26%] text-[8px] ${wiggleState === 'Cables' ? 'animate-bounce' : ''}`}
            />

            {/* Render 8-Pin CPU Power Slot */}
            <InteractiveDropZone
              label="CPU Power"
              acceptType="Cables"
              installedComponent={installedComponents["Cables"]}
              activeDragItem={activeDragItem}
              onDrop={handleDrop}
              compatibilityChecker={checkCompatibility}
              styleClasses={`top-[5%] left-[25%] w-[14%] h-[8%] text-[8px]`}
            />

            {/* CPU Socket Drop Zone */}
            <InteractiveDropZone
              label="CPU Socket"
              acceptType="CPU"
              installedComponent={installedComponents["CPU"]}
              activeDragItem={activeDragItem}
              onDrop={handleDrop}
              compatibilityChecker={checkCompatibility}
              styleClasses={`top-[18%] left-[20%] w-[25%] h-[30%] ${wiggleState === 'CPU' ? 'animate-bounce' : ''}`}
            />

            {/* Thermal Paste Drop Zone (only active if CPU installed) */}
            {installedComponents["CPU"] && (
              <InteractiveDropZone
                label="Thermal Paste"
                acceptType="Paste"
                installedComponent={installedComponents["Paste"]}
                activeDragItem={activeDragItem}
                onDrop={handleDrop}
                compatibilityChecker={checkCompatibility}
                styleClasses={`top-[20%] left-[22%] w-[21%] h-[26%] border-indigo-400 bg-indigo-500/5 ${wiggleState === 'Paste' ? 'animate-bounce' : ''}`}
              />
            )}

            {/* CPU Cooler Drop Zone (only active if Paste applied) */}
            {installedComponents["Paste"] && (
              <InteractiveDropZone
                label="CPU Cooler"
                acceptType="Cooler"
                installedComponent={installedComponents["Cooler"]}
                activeDragItem={activeDragItem}
                onDrop={handleDrop}
                compatibilityChecker={checkCompatibility}
                styleClasses={`top-[15%] left-[16%] w-[33%] h-[36%] border-amber-500 bg-amber-500/5 ${wiggleState === 'Cooler' ? 'animate-bounce' : ''}`}
              />
            )}

            {/* RAM DIMM Slots Drop Zone */}
            <InteractiveDropZone
              label="RAM Slots"
              acceptType="RAM"
              installedComponent={installedComponents["RAM"]}
              activeDragItem={activeDragItem}
              onDrop={handleDrop}
              compatibilityChecker={checkCompatibility}
              styleClasses={`top-[18%] left-[55%] w-[18%] h-[30%] ${wiggleState === 'RAM' ? 'animate-bounce' : ''}`}
            />

            {/* PCIe x16 GPU Slot Drop Zone */}
            <InteractiveDropZone
              label="PCIe x16 Slot (GPU)"
              acceptType="GPU"
              installedComponent={installedComponents["GPU"]}
              activeDragItem={activeDragItem}
              onDrop={handleDrop}
              compatibilityChecker={checkCompatibility}
              styleClasses={`top-[55%] left-[15%] w-[50%] h-[12%] ${wiggleState === 'GPU' ? 'animate-bounce' : ''}`}
            />

            {/* M.2 SSD Slot Drop Zone */}
            <InteractiveDropZone
              label="M.2 NVMe SSD"
              acceptType="SSD"
              installedComponent={installedComponents["SSD"]}
              activeDragItem={activeDragItem}
              onDrop={handleDrop}
              compatibilityChecker={checkCompatibility}
              styleClasses={`top-[48%] left-[20%] w-[20%] h-[6%] text-[8px] ${wiggleState === 'SSD' ? 'animate-bounce' : ''}`}
            />

            {/* PCIe x1 slot 1 - Network Card */}
            <InteractiveDropZone
              label="PCIe x1 (Net)"
              acceptType="Network"
              installedComponent={installedComponents["Network"]}
              activeDragItem={activeDragItem}
              onDrop={handleDrop}
              compatibilityChecker={checkCompatibility}
              styleClasses={`top-[72%] left-[15%] w-[35%] h-[8%] text-[8px]`}
            />

            {/* PCIe x1 slot 2 - Sound Card */}
            <InteractiveDropZone
              label="PCIe x1 (Audio)"
              acceptType="Sound"
              installedComponent={installedComponents["Sound"]}
              activeDragItem={activeDragItem}
              onDrop={handleDrop}
              compatibilityChecker={checkCompatibility}
              styleClasses={`top-[82%] left-[15%] w-[35%] h-[8%] text-[8px]`}
            />
          </div>
        ) : (
          /* Empty Case Mounting Box */
          <div className="size-full flex flex-col items-center justify-center p-8 bg-slate-900 border border-slate-700/50">
            <InteractiveDropZone
              label="Mount Motherboard here"
              acceptType="Motherboard"
              installedComponent={installedComponents["Motherboard"]}
              activeDragItem={activeDragItem}
              onDrop={handleDrop}
              compatibilityChecker={checkCompatibility}
              styleClasses="top-[10%] left-[10%] w-[80%] h-[80%] border-primary/50 text-base font-medium"
            />
          </div>
        )}
      </div>
    );
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5">
        {/* Navbar */}
        <nav className="border-b border-border/50 backdrop-blur-xl bg-card/50 sticky top-0 z-50">
          <div className="max-w-[1800px] mx-auto px-6 py-4 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button variant="ghost" size="sm" onClick={() => onNavigate('dashboard')}>
                <ArrowLeft className="size-4 mr-2" />
                Dashboard
              </Button>
              <Separator orientation="vertical" className="h-6" />
              <div className="flex items-center gap-2">
                <div className="size-8 rounded-lg bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
                  <Cpu className="size-4 text-white" />
                </div>
                <span className="font-semibold text-lg bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                  PC Assembly Simulator
                </span>
              </div>
            </div>
            <div className="flex items-center gap-3">
              {selectedScenario && (
                <Badge variant="outline" className="border-primary/30 text-primary">
                  Scenario: {selectedScenario.title}
                </Badge>
              )}
              <Button variant="outline" size="sm" onClick={() => handleSelectScenario(null)}>
                Reset Scenario
              </Button>
              <Button 
                size="sm" 
                onClick={handleCompleteBuild}
                className="bg-gradient-to-r from-primary to-secondary text-white font-semibold"
              >
                Complete Build
              </Button>
            </div>
          </div>
        </nav>

        {/* Main Body Grid */}
        <div className="max-w-[1800px] mx-auto px-6 py-6">
          <div className="grid grid-cols-4 gap-6">
            
            {/* Column 1: Components Library */}
            <div className="col-span-1">
              <Card className="backdrop-blur-xl bg-card/80 border-primary/20 sticky top-24">
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg">Component Registry</CardTitle>
                  <CardDescription>Drag components to build slots</CardDescription>
                </CardHeader>
                <CardContent className="px-4 pb-4">
                  <Tabs value={tabFilter} onValueChange={setTabFilter} className="w-full">
                    <TabsList className="grid grid-cols-3 w-full mb-3">
                      <TabsTrigger value="all" className="text-[10px]">All</TabsTrigger>
                      <TabsTrigger value="core" className="text-[10px]">Core</TabsTrigger>
                      <TabsTrigger value="periph" className="text-[10px]">Misc</TabsTrigger>
                    </TabsList>
                    <ScrollArea className="h-[550px] pr-2">
                      <div className="space-y-2">
                        {componentsRegistry
                          .filter(comp => {
                            if (tabFilter === "core") {
                              return ["CPU", "Motherboard", "RAM", "GPU", "PSU", "SSD"].includes(comp.type);
                            }
                            if (tabFilter === "periph") {
                              return !["CPU", "Motherboard", "RAM", "GPU", "PSU", "SSD"].includes(comp.type);
                            }
                            return true;
                          })
                          .map(comp => (
                            <DraggableComponent 
                              key={comp.id} 
                              component={comp} 
                              onSelect={setHighlightedComponent} 
                            />
                          ))
                        }
                      </div>
                    </ScrollArea>
                  </Tabs>
                </CardContent>
              </Card>
            </div>

            {/* Column 2 & 3: Visual Build Area & AI Suggestions */}
            <div className="col-span-2 space-y-6">
              
              {/* Build Map Display */}
              <Card className="backdrop-blur-xl bg-card/80 border-primary/20">
                <CardHeader className="pb-2">
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle className="text-xl">Assembly Chassis Interior</CardTitle>
                      <CardDescription>Drag components directly into highlighted motherboard slots.</CardDescription>
                    </div>
                    <Badge variant="outline" className="border-indigo-400/40 text-indigo-400 bg-indigo-500/5">
                      {installedCount} / {requiredParts.length} Essential Mounted
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="p-6">
                  {renderMotherboardMap()}
                </CardContent>
              </Card>

              {/* Real-time Compatibility Card */}
              <Card className={`backdrop-blur-xl ${compatibilityError ? 'bg-rose-500/5 border-rose-500/40' : 'bg-emerald-500/5 border-emerald-500/30'}`}>
                <CardContent className="p-4 flex items-start gap-3">
                  {compatibilityError ? (
                    <>
                      <AlertCircle className="size-6 text-rose-500 shrink-0 mt-0.5" />
                      <div>
                        <h4 className="font-semibold text-sm text-rose-500">Compatibility Alert</h4>
                        <p className="text-xs text-rose-400 mt-1 leading-relaxed">{compatibilityError}</p>
                      </div>
                    </>
                  ) : (
                    <>
                      <CheckCircle2 className="size-6 text-emerald-500 shrink-0 mt-0.5" />
                      <div>
                        <h4 className="font-semibold text-sm text-emerald-400">System Compatibility OK</h4>
                        <p className="text-xs text-emerald-300/80 mt-1">All currently installed parts comply with socket, memory, and wattage requirements.</p>
                      </div>
                    </>
                  )}
                </CardContent>
              </Card>

              {/* AI Tutor Panel */}
              <Card className="backdrop-blur-xl bg-slate-900/80 border-indigo-500/30 overflow-hidden relative">
                <div className="absolute top-0 left-0 w-2 h-full bg-gradient-to-b from-indigo-500 to-purple-500" />
                <CardContent className="p-4 pl-6 flex gap-4 items-center">
                  <div className="size-12 rounded-xl bg-gradient-to-br from-indigo-600 to-purple-600 flex items-center justify-center shrink-0 shadow-lg shadow-indigo-500/20">
                    <Lightbulb className="size-6 text-white animate-pulse" />
                  </div>
                  <div>
                    <h5 className="text-xs font-semibold text-indigo-400 uppercase tracking-wider mb-0.5">AI Hardware Tutor</h5>
                    <p className="text-sm text-slate-100 italic leading-relaxed">
                      "{aiTutorMessage}"
                    </p>
                  </div>
                </CardContent>
              </Card>

              {/* Other Side Items: Case parts, fans, optical drives */}
              <div className="grid grid-cols-2 gap-4">
                <Card className="backdrop-blur-xl bg-card/80 border-primary/20">
                  <CardHeader className="py-3">
                    <CardTitle className="text-sm font-semibold">Chassis Peripheral Bays</CardTitle>
                    <CardDescription className="text-xs">Drag external drives & brackets here</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    {/* PSU bay */}
                    <div className="relative p-3 border border-dashed border-slate-700 rounded-lg flex items-center justify-between">
                      <div>
                        <h6 className="text-xs font-semibold">PSU Chamber (Bottom)</h6>
                        <p className="text-[10px] text-muted-foreground">
                          {installedComponents["PSU"] ? installedComponents["PSU"].name : "Empty"}
                        </p>
                      </div>
                      <div className="w-[100px] h-[50px] relative">
                        <InteractiveDropZone
                          label="Mount PSU"
                          acceptType="PSU"
                          installedComponent={installedComponents["PSU"]}
                          activeDragItem={activeDragItem}
                          onDrop={handleDrop}
                          compatibilityChecker={checkCompatibility}
                          styleClasses="inset-0 text-[10px]"
                        />
                      </div>
                    </div>

                    {/* Optical bay */}
                    <div className="relative p-3 border border-dashed border-slate-700 rounded-lg flex items-center justify-between">
                      <div>
                        <h6 className="text-xs font-semibold">Optical 5.25" Bay (Front)</h6>
                        <p className="text-[10px] text-muted-foreground">
                          {installedComponents["Optical"] ? installedComponents["Optical"].name : "Empty"}
                        </p>
                      </div>
                      <div className="w-[100px] h-[50px] relative">
                        <InteractiveDropZone
                          label="Mount ODD"
                          acceptType="Optical"
                          installedComponent={installedComponents["Optical"]}
                          activeDragItem={activeDragItem}
                          onDrop={handleDrop}
                          compatibilityChecker={checkCompatibility}
                          styleClasses="inset-0 text-[10px]"
                        />
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="backdrop-blur-xl bg-card/80 border-primary/20">
                  <CardHeader className="py-3">
                    <CardTitle className="text-sm font-semibold">Case Fan & Mechanical Storage Bays</CardTitle>
                    <CardDescription className="text-xs">Mount high-airflow fans & classic HDDs</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    {/* HDD bay */}
                    <div className="relative p-3 border border-dashed border-slate-700 rounded-lg flex items-center justify-between">
                      <div>
                        <h6 className="text-xs font-semibold">HDD 3.5" Drive Cage</h6>
                        <p className="text-[10px] text-muted-foreground">
                          {installedComponents["HDD"] ? installedComponents["HDD"].name : "Empty"}
                        </p>
                      </div>
                      <div className="w-[100px] h-[50px] relative">
                        <InteractiveDropZone
                          label="Mount HDD"
                          acceptType="HDD"
                          installedComponent={installedComponents["HDD"]}
                          activeDragItem={activeDragItem}
                          onDrop={handleDrop}
                          compatibilityChecker={checkCompatibility}
                          styleClasses="inset-0 text-[10px]"
                        />
                      </div>
                    </div>

                    {/* Case Fan bay */}
                    <div className="relative p-3 border border-dashed border-slate-700 rounded-lg flex items-center justify-between">
                      <div>
                        <h6 className="text-xs font-semibold">Case Fan Bracket (Front)</h6>
                        <p className="text-[10px] text-muted-foreground">
                          {installedComponents["Fan"] ? installedComponents["Fan"].name : "Empty"}
                        </p>
                      </div>
                      <div className="w-[100px] h-[50px] relative">
                        <InteractiveDropZone
                          label="Mount Fan"
                          acceptType="Fan"
                          installedComponent={installedComponents["Fan"]}
                          activeDragItem={activeDragItem}
                          onDrop={handleDrop}
                          compatibilityChecker={checkCompatibility}
                          styleClasses="inset-0 text-[10px]"
                        />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

            </div>

            {/* Column 4: Stats & Scenario Objectives & Info panel */}
            <div className="col-span-1 space-y-6">
              
              {/* Gamification Progress Card */}
              <Card className="backdrop-blur-xl bg-gradient-to-br from-indigo-900 to-indigo-850 border-0 text-white shadow-xl">
                <CardHeader className="pb-2">
                  <CardTitle className="text-base flex items-center gap-2">
                    <Trophy className="size-5 text-yellow-400" />
                    Educational Progress
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4 text-center">
                    <div className="p-2 bg-white/5 rounded-lg">
                      <span className="text-[10px] opacity-75 block uppercase font-bold">Build Completion</span>
                      <span className="text-xl font-bold text-sky-300">{completionPercentage}%</span>
                    </div>
                    <div className="p-2 bg-white/5 rounded-lg">
                      <span className="text-[10px] opacity-75 block uppercase font-bold">Current Level</span>
                      <span className="text-xl font-bold text-pink-300">Lvl {level}</span>
                    </div>
                    <div className="p-2 bg-white/5 rounded-lg">
                      <span className="text-[10px] opacity-75 block uppercase font-bold">Total XP</span>
                      <span className="text-xl font-bold text-purple-300">{xp} XP</span>
                    </div>
                    <div className="p-2 bg-white/5 rounded-lg">
                      <span className="text-[10px] opacity-75 block uppercase font-bold">Build Accuracy</span>
                      <span className="text-xl font-bold text-emerald-300">{accuracy}%</span>
                    </div>
                  </div>
                  <div className="space-y-1">
                    <div className="flex justify-between text-[10px] opacity-85">
                      <span>XP Progress</span>
                      <span>{xp} / {level * 300} XP</span>
                    </div>
                    <Progress value={(xp / (level * 300)) * 100} className="h-2 bg-white/10" />
                  </div>
                </CardContent>
              </Card>

              {/* Build Scenarios Card */}
              <Card className="backdrop-blur-xl bg-card/80 border-primary/20">
                <CardHeader className="py-3">
                  <CardTitle className="text-sm font-semibold">Select Lesson Scenario</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <Button 
                    variant={selectedScenario === null ? "default" : "outline"} 
                    className="w-full text-xs justify-start h-8"
                    onClick={() => handleSelectScenario(null)}
                  >
                    Free Build Mode
                  </Button>
                  {buildScenarios.map(sc => (
                    <Button 
                      key={sc.id}
                      variant={selectedScenario?.id === sc.id ? "default" : "outline"}
                      className="w-full text-xs justify-start h-auto py-2 flex flex-col items-start gap-0.5"
                      onClick={() => handleSelectScenario(sc)}
                    >
                      <span className="font-semibold">{sc.title}</span>
                      <span className="text-[10px] opacity-70">Difficulty: {sc.difficulty}</span>
                    </Button>
                  ))}
                  
                  {selectedScenario && (
                    <div className="p-3 bg-muted/65 border border-border/50 rounded-lg mt-3 space-y-2">
                      <h6 className="text-[11px] font-bold text-primary uppercase">Scenario Objectives:</h6>
                      <ul className="space-y-1.5">
                        {selectedScenario.objectives.map((obj, i) => (
                          <li key={i} className="text-[10px] text-muted-foreground flex items-start gap-1">
                            <span className="text-primary mt-0.5">•</span>
                            <span>{obj}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Educational Info Side Panel */}
              <Card className="backdrop-blur-xl bg-card/80 border-primary/20">
                <CardHeader className="pb-2">
                  <CardTitle className="text-base flex items-center gap-2">
                    <Activity className="size-5 text-primary" />
                    Educational Info Panel
                  </CardTitle>
                  <CardDescription className="text-xs">Click any component to study its hardware details</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {highlightedComponent ? (
                    <div className="space-y-3">
                      <div className="flex items-center gap-3">
                        <div className="size-16 rounded-xl bg-slate-900 border border-slate-700/50 flex items-center justify-center p-2 shrink-0">
                          {highlightedComponent.renderSvg("size-full")}
                        </div>
                        <div>
                          <h4 className="font-bold text-sm text-foreground">{highlightedComponent.name}</h4>
                          <span className="text-[10px] bg-primary/10 text-primary px-1.5 py-0.5 rounded border border-primary/20 font-medium">
                            Category: {highlightedComponent.type}
                          </span>
                        </div>
                      </div>
                      <Separator />
                      
                      <div className="space-y-2 text-xs">
                        <div>
                          <span className="font-bold text-primary block text-[10px] uppercase">Purpose:</span>
                          <p className="text-muted-foreground leading-normal mt-0.5">{highlightedComponent.purpose}</p>
                        </div>
                        <div>
                          <span className="font-bold text-primary block text-[10px] uppercase">How It Works:</span>
                          <p className="text-muted-foreground leading-normal mt-0.5">{highlightedComponent.howItWorks}</p>
                        </div>
                        <div>
                          <span className="font-bold text-primary block text-[10px] uppercase">Where It Connects:</span>
                          <p className="text-muted-foreground leading-normal mt-0.5">{highlightedComponent.whereItConnects}</p>
                        </div>
                        <div className="p-2.5 bg-yellow-500/5 border border-yellow-500/20 rounded">
                          <span className="font-bold text-yellow-600 dark:text-yellow-400 block text-[10px] uppercase">Interesting Fact:</span>
                          <p className="text-muted-foreground leading-normal mt-0.5">{highlightedComponent.facts}</p>
                        </div>
                        <div className="p-2.5 bg-rose-500/5 border border-rose-500/20 rounded">
                          <span className="font-bold text-rose-500 block text-[10px] uppercase">Common Mistake:</span>
                          <p className="text-muted-foreground leading-normal mt-0.5">{highlightedComponent.mistakes}</p>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="text-center py-8 text-muted-foreground text-xs">
                      <Lightbulb className="size-8 mx-auto mb-2 opacity-50" />
                      Select a component to view educational info
                    </div>
                  )}
                </CardContent>
              </Card>

            </div>
          </div>
        </div>
      </div>

      {/* Quiz Modal */}
      <AnimatePresence>
        {activeQuiz && (
          <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-slate-900 border border-indigo-500/30 rounded-2xl p-6 max-w-lg w-full shadow-2xl relative"
            >
              <div className="flex items-center gap-2 text-indigo-400 font-bold text-sm uppercase tracking-wider mb-2">
                <Star className="size-4 animate-spin text-yellow-400" />
                Lesson Pop Quiz (+20 XP)
              </div>
              <h3 className="text-lg font-bold text-slate-100 mb-4">{activeQuiz.question}</h3>
              
              <div className="space-y-2 mb-4">
                {activeQuiz.options.map((opt, i) => (
                  <button
                    key={i}
                    onClick={() => !quizSubmitted && setQuizAnswerSelected(i)}
                    disabled={quizSubmitted}
                    className={`w-full text-left p-3 rounded-lg border text-sm transition-all flex items-center justify-between ${
                      quizAnswerSelected === i
                        ? quizSubmitted
                          ? quizStatus === "correct"
                            ? "bg-emerald-500/10 border-emerald-500 text-emerald-300"
                            : "bg-rose-500/10 border-rose-500 text-rose-300"
                          : "border-indigo-400 bg-indigo-500/10 text-slate-200"
                        : "border-slate-700 bg-slate-950/40 text-slate-300 hover:border-slate-600 hover:bg-slate-950/60"
                    }`}
                  >
                    <span>{opt}</span>
                    {quizSubmitted && i === activeQuiz.answer && (
                      <CheckCircle2 className="size-5 text-emerald-500" />
                    )}
                  </button>
                ))}
              </div>

              {quizSubmitted && (
                <div className={`p-4 rounded-lg text-xs leading-relaxed mb-6 ${
                  quizStatus === "correct" ? "bg-emerald-500/5 border border-emerald-500/20 text-emerald-400" : "bg-rose-500/5 border border-rose-500/20 text-rose-300"
                }`}>
                  <span className="font-bold uppercase block mb-1">
                    {quizStatus === "correct" ? "Excellent!" : "Explanation:"}
                  </span>
                  {activeQuiz.explanation}
                </div>
              )}

              <div className="flex justify-end gap-2">
                {!quizSubmitted ? (
                  <Button 
                    onClick={handleQuizSubmit}
                    disabled={quizAnswerSelected === null}
                    className="bg-indigo-600 text-white font-semibold"
                  >
                    Submit Answer
                  </Button>
                ) : (
                  <Button 
                    onClick={() => setActiveQuiz(null)}
                    className="bg-slate-700 hover:bg-slate-600 text-white"
                  >
                    Continue Build
                  </Button>
                )}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Boot Animation Modal */}
      <AnimatePresence>
        {showBootModal && (
          <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              className="bg-slate-950 border-4 border-indigo-500/50 rounded-2xl p-8 max-w-md w-full text-center shadow-2xl relative overflow-hidden"
            >
              {/* Spinning Fan Visual */}
              <div className="flex justify-center mb-6 relative">
                <div className="absolute inset-0 bg-indigo-500/20 rounded-full blur-xl animate-pulse" />
                <motion.div 
                  animate={{ rotate: 360 }}
                  transition={{ repeat: Infinity, duration: 1.5, ease: "linear" }}
                  className="size-32 rounded-full border-4 border-dashed border-indigo-400 flex items-center justify-center"
                >
                  <Fan className="size-20 text-indigo-400" />
                </motion.div>
              </div>

              <h2 className="text-2xl font-bold text-white mb-2">BOOTING SYSTEM...</h2>
              <div className="text-xs text-indigo-400 font-mono space-y-1 mb-6 bg-slate-900/60 p-4 rounded-lg border border-slate-800 text-left h-[100px] overflow-y-auto">
                <p>Initializing POST checks...</p>
                <p>✔ Intel/AMD CPU recognized</p>
                <p>✔ System RAM dual-channel active</p>
                <p>✔ PCIe controller initialized</p>
                <p>✔ Boot block checksum success</p>
                <p className="text-emerald-400 font-bold text-sm">System Boots Successfully!</p>
              </div>

              <div className="p-4 bg-emerald-500/10 border border-emerald-500/30 rounded-lg text-emerald-400 text-xs mb-6">
                <Trophy className="size-6 mx-auto mb-1 text-yellow-400 animate-bounce" />
                <span className="font-bold block text-sm">PC Assembled Correctly!</span>
                You earned +200 XP and +500 XP Perfect Build Bonus!
              </div>

              <Button 
                onClick={() => setShowBootModal(false)}
                className="bg-indigo-600 text-white font-semibold w-full"
              >
                Close & Return
              </Button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Achievement Unlocked Notification Toast */}
      <AnimatePresence>
        {showAchievementsPopup && (
          <div className="fixed bottom-6 right-6 z-50">
            <motion.div 
              initial={{ x: 100, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: 100, opacity: 0 }}
              className="bg-slate-900 border-2 border-yellow-500/50 rounded-xl p-4 flex items-center gap-3 shadow-2xl max-w-sm"
            >
              <div className="size-10 rounded-full bg-yellow-500/20 border border-yellow-500 flex items-center justify-center text-yellow-400 shrink-0">
                <Trophy className="size-6" />
              </div>
              <div>
                <span className="text-[10px] font-bold text-yellow-500 uppercase tracking-wider block">Achievement Unlocked!</span>
                <h4 className="font-bold text-sm text-slate-100">{showAchievementsPopup}</h4>
                <p className="text-xs text-muted-foreground">+100 XP Reward Credited</p>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </DndProvider>
  );
}
