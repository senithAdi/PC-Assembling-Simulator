import { useState, useEffect, type CSSProperties } from "react";
import { DndProvider, useDrag, useDrop } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { Button } from "./ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { Progress } from "./ui/progress";
import { Separator } from "./ui/separator";
import { ScrollArea } from "./ui/scroll-area";
import { Input } from "./ui/input";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "./ui/accordion";
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
  PlayCircle,
  Search,
  CircuitBoard,
  MemoryStick,
  MonitorPlay,
  Plug,
  Package,
  X,
  ShieldCheck,
  type LucideIcon
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import confetti from "canvas-confetti";
import {
  componentsRegistry,
  buildScenarios,
  ComponentMetadata,
  BuildScenario,
  CATEGORY_GROUPS,
  groupByBrandAndGeneration
} from "./componentsMetadata";
import { ComponentImage } from "./ComponentImage";
import { MotherboardIllustration } from "./MotherboardIllustration";
import { rectStyle, getBoardZones } from "./data/motherboardLayout";

// Icon + label for each component-type tab in the registry's horizontal tab bar.
// Labels are written out in full — students pick a component type first, then browse
// the models listed underneath, so a truncated "Board" or "Store" is not good enough.
const CATEGORY_TABS: Record<string, { icon: LucideIcon; short: string }> = {
  cpu: { icon: Cpu, short: "CPU" },
  motherboard: { icon: CircuitBoard, short: "Motherboard" },
  ram: { icon: MemoryStick, short: "RAM" },
  gpu: { icon: MonitorPlay, short: "GPU" },
  storage: { icon: HardDrive, short: "Storage" },
  psu: { icon: Plug, short: "Power Supply" },
  cooling: { icon: Fan, short: "Cooling & Fans" },
  case: { icon: Box, short: "Case" },
  other: { icon: Package, short: "Other Parts" }
};

/**
 * Which already-installed parts stop making physical sense once a given part is
 * pulled back out. Applied transitively, so removing the motherboard also takes
 * the CPU with it, which in turn takes the thermal paste and the cooler.
 */
const REMOVAL_DEPENDENTS: Record<string, string[]> = {
  Motherboard: ["CPU", "RAM", "GPU", "SSD", "Network", "Sound", "Cables"],
  CPU: ["Paste"],
  Paste: ["Cooler"]
};

/** Returns `type` plus every installed part that transitively depends on it. */
function collectRemovalChain(type: string, installed: Record<string, ComponentMetadata>): string[] {
  const chain: string[] = [];
  const visit = (current: string) => {
    if (chain.includes(current)) return;
    if (current !== type && !installed[current]) return;
    chain.push(current);
    for (const dependent of REMOVAL_DEPENDENTS[current] ?? []) {
      visit(dependent);
    }
  };
  visit(type);
  return chain;
}

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
  onDragStateChange: (comp: ComponentMetadata | null) => void;
}

function DraggableComponent({ component, onSelect, onDragStateChange }: DraggableComponentProps) {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: 'component',
    item: () => {
      onDragStateChange(component);
      return component;
    },
    end: () => onDragStateChange(null),
    collect: (monitor) => ({
      isDragging: monitor.isDragging()
    })
  }), [component, onDragStateChange]);

  return (
    <div
      ref={drag}
      className={`cursor-move transition-all ${isDragging ? 'opacity-40 scale-95' : 'opacity-100'}`}
      onClick={() => onSelect(component)}
      title={component.name}
    >
      <Card className="backdrop-blur-xl bg-card/80 border-primary/20 hover:shadow-md hover:border-primary/50 transition-all group relative overflow-hidden">
        <CardContent className="p-2">
          <div className="aspect-square rounded-lg bg-slate-900 border border-slate-700/50 flex items-center justify-center p-2 group-hover:scale-105 transition-transform">
            <ComponentImage component={component} className="size-full" />
          </div>
          {/* Two lines so full part names like "ASUS Prime Z790-A" stay readable */}
          <p className="text-[11px] font-medium text-foreground text-center leading-snug mt-1.5 line-clamp-2 min-h-[2.2em]">
            {component.name}
          </p>
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
  /** Precise pixel/percentage position, e.g. from rectStyle(MOBO_ZONES.x). Takes precedence over any position classes in styleClasses. */
  style?: CSSProperties;
  /** Uninstalls the mounted part. When omitted the slot is not removable. */
  onRemove?: () => void;
  /** Opens the mounted part in the Educational Info Panel. */
  onInspect?: (comp: ComponentMetadata) => void;
  /** True right after an incompatible part was dropped here — flashes the red cross. */
  rejected?: boolean;
}

function InteractiveDropZone({
  label,
  acceptType,
  installedComponent,
  activeDragItem,
  onDrop,
  compatibilityChecker,
  styleClasses,
  style,
  onRemove,
  onInspect,
  rejected = false
}: InteractiveDropZoneProps) {
  const isCorrectType = activeDragItem && activeDragItem.type === acceptType;

  // Check compatibility dynamically on hover
  let isHoverCompatible = true;
  if (isCorrectType && activeDragItem) {
    isHoverCompatible = compatibilityChecker(activeDragItem).compatible;
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

  // The red cross marks the slot as "this part does not belong here": live while an
  // incompatible part hovers over it, then again for a moment after a failed drop.
  const showCross = !installedComponent && ((isOver && isCorrectType && !isHoverCompatible) || rejected);

  return (
    <div
      ref={drop}
      style={style}
      className={`absolute flex flex-col items-center justify-center rounded-lg border-2 border-dashed transition-all duration-300 ${styleClasses} ${
        installedComponent
          ? 'border-emerald-500/60 bg-emerald-500/5 hover:bg-emerald-500/10'
          : showCross
            ? 'border-rose-500 bg-rose-500/25 shadow-lg z-20'
            : isOver && isCorrectType
              ? 'border-emerald-400 bg-emerald-400/20 shadow-lg scale-105 z-20 animate-pulse'
              : isCorrectType
                ? 'border-sky-400 bg-sky-400/5 animate-pulse border-solid'
                : 'border-slate-600/40 hover:border-slate-500/80 bg-slate-950/20'
      }`}
      title={installedComponent ? `Installed: ${installedComponent.name} — click to study, ✕ to remove` : `Place ${acceptType} here`}
    >
      {installedComponent ? (
        <div className="size-full flex flex-col items-center justify-center p-1 relative group">
          <button
            type="button"
            onClick={() => onInspect?.(installedComponent)}
            className="size-5/6 flex items-center justify-center cursor-pointer"
            title={`Study ${installedComponent.name}`}
          >
            <ComponentImage component={installedComponent} className="size-full max-h-full object-contain" />
          </button>
          <span className="absolute bottom-1 bg-emerald-950/90 text-emerald-300 border border-emerald-500/30 px-1 py-0.5 rounded text-[8px] max-w-[90%] truncate font-medium pointer-events-none">
            {installedComponent.model}
          </span>
          {onRemove && (
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                onRemove();
              }}
              title={`Remove ${installedComponent.name}`}
              aria-label={`Remove ${installedComponent.name}`}
              className="absolute -top-2 -right-2 z-30 size-5 rounded-full bg-rose-600 hover:bg-rose-500 text-white border border-rose-300/60 shadow-md flex items-center justify-center opacity-80 hover:opacity-100 hover:scale-110 transition-all"
            >
              <X className="size-3" strokeWidth={3} />
            </button>
          )}
        </div>
      ) : (
        <div className="text-center p-1 pointer-events-none">
          <p className={`text-[10px] font-bold uppercase tracking-wider ${showCross ? 'opacity-0' : 'opacity-80 text-muted-foreground'}`}>
            {label}
          </p>
        </div>
      )}

      {/* Not-compatible marker — a big red cross straight over the slot */}
      {showCross && (
        <div className="absolute inset-0 z-20 flex items-center justify-center pointer-events-none">
          <X className="w-2/3 h-2/3 max-w-[64px] max-h-[64px] text-rose-500 drop-shadow-[0_0_6px_rgba(0,0,0,0.6)]" strokeWidth={3} />
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
  /** Blocking pop-up shown the moment an incompatible part is dropped. */
  const [compatibilityAlert, setCompatibilityAlert] = useState<{ component: ComponentMetadata; message: string } | null>(null);
  /** Transient banner for successful placements/removals — auto-dismisses. */
  const [statusToast, setStatusToast] = useState<{ tone: "success" | "info"; title: string; detail: string } | null>(null);
  /** Component type whose slot should flash the red "not compatible" cross. */
  const [rejectedSlot, setRejectedSlot] = useState<string | null>(null);
  const [wiggleState, setWiggleState] = useState<string | null>(null); // For shakes
  const [isBooted, setIsBooted] = useState(false);
  const [showBootModal, setShowBootModal] = useState(false);
  const [categoryFilter, setCategoryFilter] = useState(CATEGORY_GROUPS[0].id);
  const [searchQuery, setSearchQuery] = useState("");
  const [moboImageFailed, setMoboImageFailed] = useState(false);

  // Reset the motherboard-photo error state whenever the mounted board changes
  const mountedMoboId = installedComponents["Motherboard"]?.id;
  useEffect(() => {
    setMoboImageFailed(false);
  }, [mountedMoboId]);

  // Auto-dismiss the success/info toast
  useEffect(() => {
    if (!statusToast) return;
    const timer = setTimeout(() => setStatusToast(null), 3200);
    return () => clearTimeout(timer);
  }, [statusToast]);

  // Clear the red cross a moment after a rejected drop
  useEffect(() => {
    if (!rejectedSlot) return;
    const timer = setTimeout(() => setRejectedSlot(null), 2600);
    return () => clearTimeout(timer);
  }, [rejectedSlot]);

  // Escape closes the compatibility pop-up
  useEffect(() => {
    if (!compatibilityAlert) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setCompatibilityAlert(null);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [compatibilityAlert]);

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

  // Component Registry browsing: category -> brand -> generation
  const activeCategory = CATEGORY_GROUPS.find(g => g.id === categoryFilter) ?? CATEGORY_GROUPS[0];
  const trimmedSearch = searchQuery.trim().toLowerCase();
  const searchResults = trimmedSearch
    ? componentsRegistry.filter(comp =>
        comp.name.toLowerCase().includes(trimmedSearch) ||
        comp.manufacturer.toLowerCase().includes(trimmedSearch) ||
        comp.model.toLowerCase().includes(trimmedSearch)
      )
    : [];
  const categoryComponents = componentsRegistry.filter(comp => activeCategory.types.includes(comp.type));
  const brandGroups = groupByBrandAndGeneration(categoryComponents);

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
    setCompatibilityError(null);
    setCompatibilityAlert(null);
    setRejectedSlot(null);
    setStatusToast(null);
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
      setRejectedSlot(null);
      setHighlightedComponent(item);
      setStatusToast({
        tone: "success",
        title: `${item.type} installed`,
        detail: `${item.name} fits this system. +50 XP`
      });
      triggerPlacementSound();
      triggerConfetti();

      // Trigger achievement check
      checkAchievementsUnlocked(item.type);

      // Quizzes are optional now — students open them via the "Take Quiz" button
      // in the Educational Info Panel instead of an automatic interruption.
    } else {
      // Incompatible placement — cross the slot out and explain why in a pop-up
      // the student cannot miss, rather than in a panel further down the page.
      setWiggleState(item.type);
      setRejectedSlot(item.type);
      setMistakes(prev => prev + 1);
      setScore(prev => Math.max(0, prev - 20));
      setXp(prev => Math.max(0, prev - 10));
      setCompatibilityError(check.message);
      setCompatibilityAlert({ component: item, message: check.message });
      setStatusToast(null);
      setAiTutorMessage(`Placement Error: ${check.message}`);
      triggerErrorSound();

      // Reset wiggle animation state
      setTimeout(() => {
        setWiggleState(null);
      }, 1000);
    }
  };

  /**
   * Uninstalls a mounted part so the student can try a different one. Anything
   * that physically sits on top of it comes off too (removing the CPU also takes
   * the thermal paste and cooler), and the XP awarded for each removed part is
   * handed back so replacing a component cannot be farmed for points.
   */
  const handleRemoveComponent = (type: string) => {
    const chain = collectRemovalChain(type, installedComponents);
    if (chain.length === 0 || !installedComponents[type]) return;

    const removedName = installedComponents[type].name;
    const alsoRemoved = chain
      .slice(1)
      .map(t => installedComponents[t]?.name)
      .filter((n): n is string => !!n);

    setInstalledComponents(prev => {
      const next = { ...prev };
      for (const t of chain) delete next[t];
      return next;
    });

    // Hand back what placing these parts earned (never below zero). Accuracy is
    // left alone — the original placement really was correct.
    setScore(prev => Math.max(0, prev - 50 * chain.length));
    setXp(prev => Math.max(0, prev - 50 * chain.length));

    setIsBooted(false);
    setCompatibilityError(null);
    setRejectedSlot(null);
    setHighlightedComponent(installedComponents[type]);

    const detail = alsoRemoved.length
      ? `${removedName} removed. ${alsoRemoved.join(" and ")} had to come off with it.`
      : `${removedName} removed. The slot is free again — drag in a different part.`;
    setStatusToast({ tone: "info", title: `${type} removed`, detail });
    setAiTutorMessage(
      alsoRemoved.length
        ? `You removed the ${removedName}. Because ${alsoRemoved.join(" and ")} mount on top of it, those came off too — that is the real disassembly order.`
        : `You removed the ${removedName}. Pick another ${type.toLowerCase()} and drop it into the empty slot.`
    );
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

  // Opens a component's quiz on demand (optional — triggered by the "Take Quiz" button)
  const openQuizFor = (comp: ComponentMetadata) => {
    if (!comp.quiz || comp.quiz.length === 0) return;
    const q = comp.quiz[Math.floor(Math.random() * comp.quiz.length)];
    setActiveQuiz(q);
    setQuizAnswerSelected(null);
    setQuizSubmitted(false);
    setQuizStatus(null);
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

  /** Props every drop zone shares: what it holds, how to remove it, whether it is crossed out. */
  const slotProps = (acceptType: string) => ({
    acceptType,
    installedComponent: installedComponents[acceptType],
    activeDragItem,
    onDrop: handleDrop,
    compatibilityChecker: checkCompatibility,
    onRemove: () => handleRemoveComponent(acceptType),
    onInspect: setHighlightedComponent,
    rejected: rejectedSlot === acceptType
  });

  /** One labelled chassis bay (PSU chamber, drive cage, fan bracket, …). */
  const renderBay = (title: string, type: string, label: string) => (
    <div className="relative p-3 border border-dashed border-slate-700 rounded-lg flex items-center justify-between gap-3">
      <div className="min-w-0">
        <h6 className="text-xs font-semibold">{title}</h6>
        <p className="text-[10px] text-muted-foreground truncate">
          {installedComponents[type]?.name ?? "Empty"}
        </p>
      </div>
      <div className="w-[100px] h-[50px] relative shrink-0">
        <InteractiveDropZone label={label} {...slotProps(type)} styleClasses="inset-0 text-[10px]" />
      </div>
    </div>
  );

  // Real motherboard photo (or SVG fallback) with drop zones overlaid on the board.
  // Zone coordinates come from getBoardZones() so they can be tuned per board — see data/motherboardLayout.ts.
  const renderMotherboardMap = () => {
    const mobo = installedComponents["Motherboard"];
    const isMoboPlaced = !!mobo;
    const zones = getBoardZones(mobo);
    const showPhoto = isMoboPlaced && !!mobo.image && !moboImageFailed;

    const dropZones = isMoboPlaced && (
      <>
        {/* 24-Pin ATX Power */}
        <InteractiveDropZone
          label="24-Pin"
          {...slotProps("Cables")}
          styleClasses={`text-[8px] ${wiggleState === 'Cables' ? 'animate-bounce' : ''}`}
          style={rectStyle(zones.atxPower)}
        />

        {/* 8-Pin CPU Power */}
        <InteractiveDropZone
          label="CPU Power"
          {...slotProps("Cables")}
          styleClasses="text-[8px]"
          style={rectStyle(zones.cpuPower)}
        />

        {/* CPU Socket */}
        <InteractiveDropZone
          label="CPU Socket"
          {...slotProps("CPU")}
          styleClasses={wiggleState === 'CPU' ? 'animate-bounce' : ''}
          style={rectStyle(zones.cpuSocket)}
        />

        {/* Thermal Paste (only active once CPU installed) */}
        {installedComponents["CPU"] && (
          <InteractiveDropZone
            label="Thermal Paste"
            {...slotProps("Paste")}
            styleClasses={`border-indigo-400 bg-indigo-500/10 ${wiggleState === 'Paste' ? 'animate-bounce' : ''}`}
            style={rectStyle(zones.paste)}
          />
        )}

        {/* CPU Cooler (only active once Paste applied) */}
        {installedComponents["Paste"] && (
          <InteractiveDropZone
            label="CPU Cooler"
            {...slotProps("Cooler")}
            styleClasses={`border-amber-500 bg-amber-500/10 ${wiggleState === 'Cooler' ? 'animate-bounce' : ''}`}
            style={rectStyle(zones.cooler)}
          />
        )}

        {/* RAM DIMM Slots */}
        <InteractiveDropZone
          label="RAM Slots"
          {...slotProps("RAM")}
          styleClasses={wiggleState === 'RAM' ? 'animate-bounce' : ''}
          style={rectStyle(zones.ram)}
        />

        {/* PCIe x16 GPU Slot */}
        <InteractiveDropZone
          label="PCIe x16 (GPU)"
          {...slotProps("GPU")}
          styleClasses={wiggleState === 'GPU' ? 'animate-bounce' : ''}
          style={rectStyle(zones.pcieX16)}
        />

        {/* M.2 NVMe SSD Slot */}
        <InteractiveDropZone
          label="M.2 SSD"
          {...slotProps("SSD")}
          styleClasses={`text-[8px] ${wiggleState === 'SSD' ? 'animate-bounce' : ''}`}
          style={rectStyle(zones.m2)}
        />

        {/* PCIe x1 slot 1 - Network Card */}
        <InteractiveDropZone
          label="PCIe x1 (Net)"
          {...slotProps("Network")}
          styleClasses="text-[8px]"
          style={rectStyle(zones.pcieX1Net)}
        />

        {/* PCIe x1 slot 2 - Sound Card */}
        <InteractiveDropZone
          label="PCIe x1 (Audio)"
          {...slotProps("Sound")}
          styleClasses="text-[8px]"
          style={rectStyle(zones.pcieX1Snd)}
        />
      </>
    );

    // Empty chassis — prompt to mount a motherboard first
    if (!isMoboPlaced) {
      return (
        <div className="relative w-full aspect-[4/3] bg-slate-950 rounded-2xl border-4 border-slate-800 overflow-hidden shadow-inner group">
          <MotherboardIllustration motherboard={mobo} installed={false} />
          <InteractiveDropZone
            label="Mount Motherboard here"
            {...slotProps("Motherboard")}
            styleClasses="border-primary/50 text-base font-medium"
            style={{ position: "absolute", inset: "6%" }}
          />
        </div>
      );
    }

    // The mounted board is the backdrop itself, so its "uninstall" control floats
    // over the chassis rather than living inside a drop zone.
    const removeBoardButton = (
      <button
        type="button"
        onClick={() => handleRemoveComponent("Motherboard")}
        title={`Remove ${mobo.name} (clears everything mounted on it)`}
        className="absolute top-2 right-2 z-30 flex items-center gap-1.5 rounded-lg bg-slate-950/85 hover:bg-rose-600 border border-rose-500/50 hover:border-rose-400 text-rose-300 hover:text-white px-2.5 py-1.5 text-[11px] font-semibold shadow-lg backdrop-blur-sm transition-colors"
      >
        <X className="size-3.5" strokeWidth={3} />
        Remove board
      </button>
    );

    // Real motherboard photo as the board — drop zones overlaid on top of it.
    if (showPhoto) {
      return (
        <div className="relative w-full bg-slate-950 rounded-2xl border-4 border-slate-800 overflow-hidden shadow-inner">
          <img
            src={mobo.image}
            alt={mobo.name}
            draggable={false}
            onError={() => setMoboImageFailed(true)}
            className="w-full h-auto block select-none pointer-events-none"
          />
          {dropZones}
          {removeBoardButton}
        </div>
      );
    }

    // Mounted board without a usable photo — fall back to the drawn illustration.
    return (
      <div className="relative w-full aspect-[4/3] bg-slate-950 rounded-2xl border-4 border-slate-800 overflow-hidden shadow-inner group">
        <MotherboardIllustration motherboard={mobo} installed />
        {dropZones}
        {removeBoardButton}
      </div>
    );
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="h-screen flex flex-col overflow-hidden bg-gradient-to-br from-background via-background to-primary/5">
        {/* Navbar */}
        <nav className="border-b border-border/50 backdrop-blur-xl bg-card/50 shrink-0 z-50">
          <div className="max-w-[1800px] mx-auto px-6 py-2.5 flex items-center justify-between gap-4">
            <div className="flex items-center gap-3 shrink-0">
              <Button variant="ghost" size="sm" onClick={() => onNavigate('dashboard')}>
                <ArrowLeft className="size-4 mr-2" />
                Dashboard
              </Button>
              <Separator orientation="vertical" className="h-6" />
              <div className="flex items-center gap-2">
                <div className="size-8 rounded-lg bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
                  <Cpu className="size-4 text-white" />
                </div>
                <span className="font-semibold text-lg bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent hidden xl:inline">
                  PC Assembly Simulator
                </span>
              </div>
            </div>

            {/* Educational Progress — lives in the header so the whole left column
                is free for the component registry. */}
            <div className="flex items-center gap-3 rounded-xl bg-gradient-to-r from-indigo-900 to-indigo-800 text-white px-3 py-1.5 shadow-lg shrink-0">
              <div className="flex items-center gap-1.5 pr-1">
                <Trophy className="size-4 text-yellow-400" />
                <span className="text-[11px] font-semibold leading-tight hidden 2xl:block">
                  Educational<br />Progress
                </span>
              </div>
              <div className="flex items-center gap-1.5">
                {[
                  { value: `${completionPercentage}%`, label: "Build", color: "text-sky-300" },
                  { value: level, label: "Level", color: "text-pink-300" },
                  { value: xp, label: "XP", color: "text-purple-300" },
                  { value: `${accuracy}%`, label: "Accuracy", color: "text-emerald-300" }
                ].map(stat => (
                  <div key={stat.label} className="px-2 py-1 bg-white/5 rounded-md text-center min-w-[52px]">
                    <span className={`text-sm font-bold block leading-none ${stat.color}`}>{stat.value}</span>
                    <span className="text-[8px] opacity-70 uppercase font-bold">{stat.label}</span>
                  </div>
                ))}
              </div>
              <div className="w-20 hidden lg:block">
                <Progress value={(xp / (level * 300)) * 100} className="h-1.5 bg-white/10" />
                <span className="text-[8px] opacity-70 uppercase font-bold block text-center mt-0.5">
                  Lv {level + 1}
                </span>
              </div>
            </div>

            <div className="flex items-center gap-2 shrink-0">
              {selectedScenario && (
                <Badge variant="outline" className="border-primary/30 text-primary hidden 2xl:inline-flex">
                  {selectedScenario.title}
                </Badge>
              )}
              <Button variant="outline" size="sm" onClick={() => handleSelectScenario(null)}>
                Reset
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

        {/* Main Body — fills the viewport; columns scroll internally so the page itself doesn't scroll */}
        <div className="flex-1 min-h-0 w-full max-w-[1800px] mx-auto px-6 py-4">

          <div className="grid grid-cols-12 gap-6 h-full min-h-0">

            {/* Column 1: Component Registry — now the full height of the column,
                since Educational Progress moved into the header. */}
            <div className="col-span-5 min-h-0 flex flex-col">

              {/* Component Registry — fills the column and scrolls internally */}
              <Card className="backdrop-blur-xl bg-card/80 border-primary/20 flex-1 min-h-0 flex flex-col overflow-hidden">
                <CardHeader className="pb-3 shrink-0">
                  <CardTitle className="text-lg">Component Registry</CardTitle>
                  <CardDescription>Pick a component type, then drag a part into a build slot</CardDescription>
                </CardHeader>
                <CardContent className="px-4 pb-4 space-y-3 flex-1 min-h-0 flex flex-col">
                  <div className="relative">
                    <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 size-3.5 text-muted-foreground" />
                    <Input
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder="Search parts (name, brand)..."
                      className="h-9 pl-8 text-xs"
                    />
                  </div>

                  {trimmedSearch ? (
                    <ScrollArea className="flex-1 min-h-0 pr-2">
                      <div className="grid grid-cols-4 gap-2">
                        {searchResults.length === 0 && (
                          <p className="text-xs text-muted-foreground text-center py-6 col-span-4">No parts match "{searchQuery}".</p>
                        )}
                        {searchResults.map(comp => (
                          <DraggableComponent
                            key={comp.id}
                            component={comp}
                            onSelect={setHighlightedComponent}
                            onDragStateChange={setActiveDragItem}
                          />
                        ))}
                      </div>
                    </ScrollArea>
                  ) : (
                    <div className="flex flex-col gap-3 flex-1 min-h-0">
                      {/* Horizontal component-type tab bar — full labels, wraps to as
                          many rows as it needs so no type name is ever cut off. */}
                      <div className="flex flex-wrap gap-1.5 shrink-0">
                        {CATEGORY_GROUPS.map(group => {
                          const tab = CATEGORY_TABS[group.id];
                          const Icon = tab?.icon ?? Box;
                          const count = componentsRegistry.filter(c => group.types.includes(c.type)).length;
                          const active = categoryFilter === group.id;
                          return (
                            <button
                              key={group.id}
                              onClick={() => setCategoryFilter(group.id)}
                              title={group.label}
                              className={`flex items-center gap-1.5 rounded-lg py-1.5 px-2.5 border transition-all ${
                                active
                                  ? 'bg-primary text-primary-foreground border-primary shadow-sm'
                                  : 'bg-card/60 border-border/50 text-muted-foreground hover:border-primary/40 hover:text-foreground'
                              }`}
                            >
                              <Icon className="size-4 shrink-0" />
                              <span className="text-xs font-semibold leading-none whitespace-nowrap">{tab?.short ?? group.label}</span>
                              <span className={`text-[10px] leading-none font-medium tabular-nums ${active ? 'opacity-80' : 'opacity-60'}`}>{count}</span>
                            </button>
                          );
                        })}
                      </div>

                      {/* Cards for the selected component type */}
                      <ScrollArea className="h-full flex-1 pr-2">
                        {/* Keyed on the category so switching tabs remounts the accordion
                            and re-opens every brand — students should see the parts for the
                            type they just picked without a second click. */}
                        <Accordion
                          key={categoryFilter}
                          type="multiple"
                          defaultValue={brandGroups.map(g => g.brand)}
                          className="w-full"
                        >
                          {brandGroups.map(({ brand, generations }) => (
                            <AccordionItem key={brand} value={brand} className="border-primary/10">
                              <AccordionTrigger className="text-xs font-semibold py-2 hover:no-underline">
                                {brand}
                                <span className="ml-auto mr-2 text-[10px] font-normal text-muted-foreground">
                                  {generations.reduce((sum, g) => sum + g.models.length, 0)} model{generations.reduce((sum, g) => sum + g.models.length, 0) === 1 ? "" : "s"}
                                </span>
                              </AccordionTrigger>
                              <AccordionContent className="pb-2">
                                <div className="space-y-3">
                                  {generations.map(({ generation, models }) => (
                                    <div key={generation ?? "__default"}>
                                      {generation && (
                                        <p className="text-[10px] uppercase tracking-wider font-bold text-primary/70 mb-1.5 px-0.5">
                                          {generation}
                                        </p>
                                      )}
                                      <div className="grid grid-cols-4 gap-2">
                                        {models.map(comp => (
                                          <DraggableComponent
                                            key={comp.id}
                                            component={comp}
                                            onSelect={setHighlightedComponent}
                                            onDragStateChange={setActiveDragItem}
                                          />
                                        ))}
                                      </div>
                                    </div>
                                  ))}
                                </div>
                              </AccordionContent>
                            </AccordionItem>
                          ))}
                        </Accordion>
                      </ScrollArea>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>

            {/* Column 2 & 3: Visual Build Area & AI Suggestions — scrolls internally */}
            <div className="col-span-7 min-h-0 overflow-y-auto space-y-6 pr-1">

              {/* Build Map Display */}
              <Card className="backdrop-blur-xl bg-card/80 border-primary/20">
                <CardHeader className="pb-2">
                  <div className="flex items-center justify-between gap-3">
                    <div>
                      <CardTitle className="text-xl">Assembly Chassis Interior</CardTitle>
                      <CardDescription>Drag parts into the highlighted slots — press ✕ on a mounted part to take it back out.</CardDescription>
                    </div>
                    <div className="flex items-center gap-2 shrink-0">
                      {/* Glanceable compatibility state. The detailed explanation of a
                          failure comes through the pop-up, not a panel further down. */}
                      <Badge
                        variant="outline"
                        className={compatibilityError
                          ? "border-rose-500/50 text-rose-400 bg-rose-500/10"
                          : "border-emerald-500/40 text-emerald-400 bg-emerald-500/10"}
                      >
                        {compatibilityError ? (
                          <><AlertCircle className="size-3.5 mr-1" /> Compatibility issue</>
                        ) : (
                          <><ShieldCheck className="size-3.5 mr-1" /> Compatibility OK</>
                        )}
                      </Badge>
                      <Badge variant="outline" className="border-indigo-400/40 text-indigo-400 bg-indigo-500/5">
                        {installedCount} / {requiredParts.length} Mounted
                      </Badge>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="p-6">
                  {renderMotherboardMap()}
                </CardContent>
              </Card>

              {/* Educational Info Panel + Lesson Scenario (moved directly under the chassis) */}
              <div className="grid grid-cols-2 gap-6">
                {/* Educational Info Panel */}
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
                            <ComponentImage component={highlightedComponent} className="size-full" />
                          </div>
                          <div>
                            <h4 className="font-bold text-sm text-foreground">{highlightedComponent.name}</h4>
                            <div className="flex flex-wrap gap-1 mt-1">
                              <span className="text-[10px] bg-primary/10 text-primary px-1.5 py-0.5 rounded border border-primary/20 font-medium">
                                {highlightedComponent.type}
                              </span>
                              <span className="text-[10px] bg-muted/65 text-muted-foreground px-1.5 py-0.5 rounded border border-border/50 font-medium">
                                {highlightedComponent.manufacturer}
                              </span>
                              {highlightedComponent.generation && (
                                <span className="text-[10px] bg-muted/65 text-muted-foreground px-1.5 py-0.5 rounded border border-border/50 font-medium">
                                  {highlightedComponent.generation}
                                </span>
                              )}
                            </div>
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

                        {highlightedComponent.quiz && highlightedComponent.quiz.length > 0 && (
                          <Button
                            size="sm"
                            variant="outline"
                            className="w-full text-xs border-primary/40 text-primary hover:bg-primary/10"
                            onClick={() => openQuizFor(highlightedComponent)}
                          >
                            <Star className="size-3.5 mr-1.5" />
                            Take Optional Quiz (+25 XP)
                          </Button>
                        )}
                      </div>
                    ) : (
                      <div className="text-center py-8 text-muted-foreground text-xs">
                        <Lightbulb className="size-8 mx-auto mb-2 opacity-50" />
                        Select a component to view educational info
                      </div>
                    )}
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
              </div>

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
                    {renderBay("Case Chassis", "Case", "Pick Case")}
                    {renderBay("PSU Chamber (Bottom)", "PSU", "Mount PSU")}
                    {renderBay('Optical 5.25" Bay (Front)', "Optical", "Mount ODD")}
                  </CardContent>
                </Card>

                <Card className="backdrop-blur-xl bg-card/80 border-primary/20">
                  <CardHeader className="py-3">
                    <CardTitle className="text-sm font-semibold">Case Fan & Mechanical Storage Bays</CardTitle>
                    <CardDescription className="text-xs">Mount high-airflow fans & classic HDDs</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    {renderBay('HDD 3.5" Drive Cage', "HDD", "Mount HDD")}
                    {renderBay("Case Fan Bracket (Front)", "Fan", "Mount Fan")}
                  </CardContent>
                </Card>
              </div>

            </div>

          </div>
        </div>
      </div>

      {/* Compatibility Alert — a pop-up right in the middle of the screen so the
          student sees why a part was rejected the moment it happens. */}
      <AnimatePresence>
        {compatibilityAlert && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
            className="fixed inset-0 z-[60] bg-black/60 backdrop-blur-sm flex items-center justify-center p-4"
            onClick={() => setCompatibilityAlert(null)}
            role="alertdialog"
            aria-modal="true"
            aria-label="Compatibility alert"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 12 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 12 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-slate-900 border-2 border-rose-500/50 rounded-2xl p-6 max-w-md w-full shadow-2xl relative"
            >
              <button
                type="button"
                onClick={() => setCompatibilityAlert(null)}
                aria-label="Close"
                className="absolute top-3 right-3 size-7 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 flex items-center justify-center transition-colors"
              >
                <X className="size-4" />
              </button>

              <div className="flex items-center gap-3 mb-4">
                <div className="size-12 rounded-xl bg-rose-500/15 border border-rose-500/40 flex items-center justify-center shrink-0">
                  <AlertCircle className="size-7 text-rose-500" />
                </div>
                <div>
                  <span className="text-[11px] font-bold text-rose-500 uppercase tracking-wider block">
                    Not Compatible
                  </span>
                  <h3 className="text-base font-bold text-slate-100 leading-tight">
                    {compatibilityAlert.component.name} cannot go there
                  </h3>
                </div>
              </div>

              <p className="text-sm text-slate-300 leading-relaxed bg-slate-950/60 border border-slate-800 rounded-lg p-3.5">
                {compatibilityAlert.message}
              </p>

              <p className="text-xs text-slate-400 mt-3">
                The slot is marked with a red ✕. Pick a different {compatibilityAlert.component.type}, or
                remove an already-mounted part with its ✕ button and try another combination.
              </p>

              <Button
                onClick={() => setCompatibilityAlert(null)}
                className="w-full mt-5 bg-rose-600 hover:bg-rose-500 text-white font-semibold"
              >
                Got it
              </Button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Placement / removal toast — brief, non-blocking confirmation */}
      <AnimatePresence>
        {statusToast && (
          <div className="fixed top-20 left-1/2 -translate-x-1/2 z-[55] pointer-events-none" key="status-toast">
            <motion.div
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -20, opacity: 0 }}
              className={`flex items-start gap-3 rounded-xl border px-4 py-3 shadow-2xl backdrop-blur-xl max-w-md ${
                statusToast.tone === "success"
                  ? "bg-emerald-950/90 border-emerald-500/50"
                  : "bg-slate-900/95 border-slate-600/60"
              }`}
            >
              {statusToast.tone === "success" ? (
                <CheckCircle2 className="size-5 text-emerald-400 shrink-0 mt-0.5" />
              ) : (
                <Package className="size-5 text-sky-400 shrink-0 mt-0.5" />
              )}
              <div>
                <h4 className={`text-sm font-semibold ${statusToast.tone === "success" ? "text-emerald-300" : "text-slate-100"}`}>
                  {statusToast.title}
                </h4>
                <p className="text-xs text-slate-300/90 mt-0.5 leading-relaxed">{statusToast.detail}</p>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

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
