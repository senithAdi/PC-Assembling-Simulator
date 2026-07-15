import { useState } from "react";
import { Button } from "./ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Label } from "./ui/label";
import { CheckCircle2, AlertCircle, ArrowLeft, Zap, ShieldAlert, Cpu } from "lucide-react";
import { motion } from "motion/react";
import { componentsRegistry, ComponentMetadata } from "./componentsMetadata";

export function CompatibilityChecker({ onNavigate }: { onNavigate: (page: string) => void }) {
  const [selectedCPU, setSelectedCPU] = useState<string>("");
  const [selectedMobo, setSelectedMobo] = useState<string>("");
  const [selectedRAM, setSelectedRAM] = useState<string>("");
  const [selectedGPU, setSelectedGPU] = useState<string>("");
  const [selectedPSU, setSelectedPSU] = useState<string>("");

  const cpuObj = componentsRegistry.find(c => c.id === selectedCPU);
  const moboObj = componentsRegistry.find(c => c.id === selectedMobo);
  const ramObj = componentsRegistry.find(c => c.id === selectedRAM);
  const gpuObj = componentsRegistry.find(c => c.id === selectedGPU);
  const psuObj = componentsRegistry.find(c => c.id === selectedPSU);

  // Run real-time compatibility analysis
  const checks: { name: string; status: "pass" | "fail" | "pending"; message: string }[] = [];

  // 1. CPU socket vs Motherboard socket
  if (cpuObj && moboObj) {
    const isSocketMatch = cpuObj.specs.Socket === moboObj.specs.Socket;
    checks.push({
      name: "CPU-Motherboard Socket Compatibility",
      status: isSocketMatch ? "pass" : "fail",
      message: isSocketMatch
        ? `Compatible! Both use the ${cpuObj.specs.Socket} socket layout.`
        : `Mismatch! The ${cpuObj.name} requires an ${cpuObj.specs.Socket} socket, while the ${moboObj.name} has an ${moboObj.specs.Socket} socket. They cannot physically connect.`
    });
  } else {
    checks.push({ name: "CPU-Motherboard Socket Compatibility", status: "pending", message: "Select CPU and Motherboard to verify socket matches." });
  }

  // 2. RAM Type vs Motherboard RAM support
  if (ramObj && moboObj) {
    const isRamMatch = ramObj.specs.Type === moboObj.specs["RAM Support"];
    checks.push({
      name: "RAM Slot Compatibility",
      status: isRamMatch ? "pass" : "fail",
      message: isRamMatch
        ? `Compatible! Both utilize ${ramObj.specs.Type} slot configurations.`
        : `Mismatch! The ${moboObj.name} supports ${moboObj.specs["RAM Support"]} RAM, but the ${ramObj.name} is ${ramObj.specs.Type}. Sockets are physically notched differently.`
    });
  } else {
    checks.push({ name: "RAM Slot Compatibility", status: "pending", message: "Select RAM and Motherboard to check speed & type." });
  }

  // 3. PSU capacity vs System power draw
  if (psuObj) {
    const cpuDraw = (cpuObj?.specs["Power Draw"] as number) || 100;
    const gpuDraw = (gpuObj?.specs["Power Draw"] as number) || 0;
    const totalEstDraw = cpuDraw + gpuDraw + 100;
    const psuWattage = psuObj.specs.Wattage as number;
    const hasEnoughPower = psuWattage >= totalEstDraw;

    checks.push({
      name: "Power Supply capacity",
      status: hasEnoughPower ? "pass" : "fail",
      message: hasEnoughPower
        ? `Compatible! PSU wattage (${psuWattage}W) provides adequate headroom over estimated draw (${totalEstDraw}W).`
        : `Insufficient Wattage! Your system requires at least ${totalEstDraw}W, but the selected PSU is only ${psuWattage}W. Under heavy loading, the PC will shut down.`
    });
  } else {
    checks.push({ name: "Power Supply capacity", status: "pending", message: "Select PSU to calculate wattage safety thresholds." });
  }

  const isAllSelected = selectedCPU && selectedMobo && selectedRAM && selectedGPU && selectedPSU;
  const hasErrors = checks.some(c => c.status === "fail");

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5">
      {/* Navbar */}
      <nav className="border-b border-border/50 backdrop-blur-xl bg-card/50 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="sm" onClick={() => onNavigate('dashboard')}>
              <ArrowLeft className="size-4 mr-2" />
              Dashboard
            </Button>
            <div className="flex items-center gap-2">
              <Zap className="size-5 text-primary" />
              <span className="font-semibold text-lg bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                Compatibility Engine
              </span>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-6xl mx-auto px-6 py-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8 text-center"
        >
          <h1 className="text-4xl font-bold mb-3 bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
            Hardware compatibility Checker
          </h1>
          <p className="text-lg text-muted-foreground">Verify physical and electrical matches before assembly.</p>
        </motion.div>

        <div className="grid grid-cols-2 gap-8">
          {/* Selection Card */}
          <Card className="backdrop-blur-xl bg-card/80 border-primary/20">
            <CardHeader>
              <CardTitle>Hardware Registry Selectors</CardTitle>
              <CardDescription>Select individual parts to test compatibility</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* CPU Selection */}
              <div className="space-y-2">
                <Label className="text-xs font-bold text-slate-300">Central Processor (CPU)</Label>
                <Select value={selectedCPU} onValueChange={setSelectedCPU}>
                  <SelectTrigger className="border-primary/20">
                    <SelectValue placeholder="Select CPU" />
                  </SelectTrigger>
                  <SelectContent>
                    {componentsRegistry.filter(c => c.type === "CPU").map(c => (
                      <SelectItem key={c.id} value={c.id}>{c.name}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Motherboard Selection */}
              <div className="space-y-2">
                <Label className="text-xs font-bold text-slate-300">Motherboard</Label>
                <Select value={selectedMobo} onValueChange={setSelectedMobo}>
                  <SelectTrigger className="border-primary/20">
                    <SelectValue placeholder="Select Motherboard" />
                  </SelectTrigger>
                  <SelectContent>
                    {componentsRegistry.filter(c => c.type === "Motherboard").map(c => (
                      <SelectItem key={c.id} value={c.id}>{c.name}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* RAM Selection */}
              <div className="space-y-2">
                <Label className="text-xs font-bold text-slate-300">System Memory (RAM)</Label>
                <Select value={selectedRAM} onValueChange={setSelectedRAM}>
                  <SelectTrigger className="border-primary/20">
                    <SelectValue placeholder="Select RAM" />
                  </SelectTrigger>
                  <SelectContent>
                    {componentsRegistry.filter(c => c.type === "RAM").map(c => (
                      <SelectItem key={c.id} value={c.id}>{c.name}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* GPU Selection */}
              <div className="space-y-2">
                <Label className="text-xs font-bold text-slate-300">Graphics Card (GPU)</Label>
                <Select value={selectedGPU} onValueChange={setSelectedGPU}>
                  <SelectTrigger className="border-primary/20">
                    <SelectValue placeholder="Select GPU" />
                  </SelectTrigger>
                  <SelectContent>
                    {componentsRegistry.filter(c => c.type === "GPU").map(c => (
                      <SelectItem key={c.id} value={c.id}>{c.name}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* PSU Selection */}
              <div className="space-y-2">
                <Label className="text-xs font-bold text-slate-300">Power Supply (PSU)</Label>
                <Select value={selectedPSU} onValueChange={setSelectedPSU}>
                  <SelectTrigger className="border-primary/20">
                    <SelectValue placeholder="Select PSU" />
                  </SelectTrigger>
                  <SelectContent>
                    {componentsRegistry.filter(c => c.type === "PSU").map(c => (
                      <SelectItem key={c.id} value={c.id}>{c.name}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="pt-2">
                <Button 
                  onClick={() => {
                    setSelectedCPU("");
                    setSelectedMobo("");
                    setSelectedRAM("");
                    setSelectedGPU("");
                    setSelectedPSU("");
                  }} 
                  variant="outline" 
                  className="w-full"
                >
                  Clear Selection
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Results Card */}
          <Card className="backdrop-blur-xl bg-card/80 border-primary/20 flex flex-col justify-between">
            <div>
              <CardHeader className="pb-2">
                <div className="flex items-center justify-between">
                  <CardTitle>Evaluation Results</CardTitle>
                  {isAllSelected && (
                    <Badge className={hasErrors ? "bg-rose-500/10 text-rose-400 border-rose-500/20 animate-pulse" : "bg-emerald-500/10 text-emerald-400 border-emerald-500/20"}>
                      {hasErrors ? "Issues Detected" : "Build Compatible"}
                    </Badge>
                  )}
                </div>
                <CardDescription>Real-time electrical and mechanical matching checks</CardDescription>
              </CardHeader>
              
              <CardContent className="space-y-4 pt-4">
                {checks.map((check, i) => (
                  <motion.div
                    key={check.name}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.1 }}
                    className={`p-4 rounded-xl border ${
                      check.status === "pass"
                        ? "bg-emerald-500/5 border-emerald-500/20 text-emerald-300"
                        : check.status === "fail"
                        ? "bg-rose-500/5 border-rose-500/30 text-rose-300"
                        : "bg-muted/30 border-border/50 text-slate-300"
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      {check.status === "pass" ? (
                        <CheckCircle2 className="size-5 text-emerald-500 shrink-0 mt-0.5" />
                      ) : check.status === "fail" ? (
                        <AlertCircle className="size-5 text-rose-500 shrink-0 mt-0.5" />
                      ) : (
                        <Cpu className="size-5 text-muted-foreground shrink-0 mt-0.5" />
                      )}
                      <div className="flex-1 min-w-0">
                        <h4 className="font-semibold text-sm leading-none mb-1">{check.name}</h4>
                        <p className="text-xs text-muted-foreground leading-normal">{check.message}</p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </CardContent>
            </div>

            {/* Recommendation box */}
            {isAllSelected && hasErrors && (
              <CardContent className="pb-6 pt-0">
                <div className="p-4 rounded-xl bg-amber-500/5 border border-amber-500/20 flex gap-3">
                  <ShieldAlert className="size-6 text-amber-500 shrink-0 mt-0.5" />
                  <div>
                    <h5 className="text-xs font-bold text-amber-500 uppercase tracking-wider mb-1">AI Recommendation</h5>
                    <p className="text-xs text-muted-foreground leading-normal">
                      Ensure your selected CPU socket matches the Motherboard socket and matching RAM generations. For high power graphics cards, always select a PSU with at least 750W capacity to maintain stable voltages.
                    </p>
                  </div>
                </div>
              </CardContent>
            )}
          </Card>
        </div>
      </div>
    </div>
  );
}
