import { useState, useMemo } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

const SYRINGE_OPTIONS = [
  { value: 0.3, label: "0.3 ml", maxUnits: 30 },
  { value: 0.5, label: "0.5 ml", maxUnits: 50 },
  { value: 1.0, label: "1.0 ml", maxUnits: 100 },
];

const VIAL_OPTIONS = [5, 10, 15];
const WATER_OPTIONS = [1, 2, 3, 5];
const DOSE_OPTIONS = [50, 100, 250, 500];

const PeptideCalculator = () => {
  const [selectedSyringe, setSelectedSyringe] = useState(0.5);
  const [vialMg, setVialMg] = useState(10);
  const [customVial, setCustomVial] = useState("");
  const [waterMl, setWaterMl] = useState(3);
  const [customWater, setCustomWater] = useState("");
  const [doseMcg, setDoseMcg] = useState(250);
  const [customDose, setCustomDose] = useState("");

  const [showCustomVial, setShowCustomVial] = useState(false);
  const [showCustomWater, setShowCustomWater] = useState(false);
  const [showCustomDose, setShowCustomDose] = useState(false);

  const effectiveVial = showCustomVial && customVial ? parseFloat(customVial) : vialMg;
  const effectiveWater = showCustomWater && customWater ? parseFloat(customWater) : waterMl;
  const effectiveDose = showCustomDose && customDose ? parseFloat(customDose) : doseMcg;

  const syringeInfo = SYRINGE_OPTIONS.find((s) => s.value === selectedSyringe) || SYRINGE_OPTIONS[1];

  const calculatedUnits = useMemo(() => {
    if (!effectiveVial || !effectiveWater || !effectiveDose) return 0;
    
    const totalMcg = effectiveVial * 1000;
    const mcgPerMl = totalMcg / effectiveWater;
    const doseMl = effectiveDose / mcgPerMl;
    const units = doseMl * 100;
    
    return Math.round(units * 10) / 10;
  }, [effectiveVial, effectiveWater, effectiveDose]);

  const handleVialSelect = (value: number | "other") => {
    if (value === "other") {
      setShowCustomVial(true);
    } else {
      setShowCustomVial(false);
      setVialMg(value);
    }
  };

  const handleWaterSelect = (value: number | "other") => {
    if (value === "other") {
      setShowCustomWater(true);
    } else {
      setShowCustomWater(false);
      setWaterMl(value);
    }
  };

  const handleDoseSelect = (value: number | "other") => {
    if (value === "other") {
      setShowCustomDose(true);
    } else {
      setShowCustomDose(false);
      setDoseMcg(value);
    }
  };

  const unitPercentage = Math.min((calculatedUnits / syringeInfo.maxUnits) * 100, 100);

  return (
    <Card className="border-border/50">
      <CardHeader className="pb-4">
        <CardTitle className="text-2xl font-bold tracking-tight">
          PEPTIDE CALCULATOR
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid gap-6 lg:grid-cols-2">
          {/* Left Column - Syringe Selection */}
          <div className="space-y-4">
            <h3 className="font-semibold text-foreground">
              What is the total volume of your syringe?
            </h3>
            <div className="grid grid-cols-3 gap-3">
              {SYRINGE_OPTIONS.map((syringe) => (
                <button
                  key={syringe.value}
                  onClick={() => setSelectedSyringe(syringe.value)}
                  className={cn(
                    "flex flex-col items-center justify-center p-4 rounded-lg border-2 transition-all duration-200",
                    "hover:border-primary/50 hover:bg-primary/5",
                    "active:scale-95",
                    selectedSyringe === syringe.value
                      ? "border-primary bg-primary/10"
                      : "border-border bg-card"
                  )}
                >
                  {/* Syringe Icon */}
                  <svg
                    viewBox="0 0 24 60"
                    className="h-16 w-8 mb-2"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                  >
                    {/* Plunger handle */}
                    <rect x="8" y="2" width="8" height="4" rx="1" fill="currentColor" opacity="0.3" />
                    {/* Plunger rod */}
                    <line x1="12" y1="6" x2="12" y2="18" strokeWidth="2" />
                    {/* Barrel */}
                    <rect x="6" y="18" width="12" height="30" rx="2" strokeWidth="1.5" />
                    {/* Graduation marks */}
                    <line x1="6" y1="24" x2="9" y2="24" strokeWidth="1" />
                    <line x1="6" y1="30" x2="10" y2="30" strokeWidth="1" />
                    <line x1="6" y1="36" x2="9" y2="36" strokeWidth="1" />
                    <line x1="6" y1="42" x2="10" y2="42" strokeWidth="1" />
                    {/* Needle hub */}
                    <rect x="10" y="48" width="4" height="4" fill="currentColor" opacity="0.5" />
                    {/* Needle */}
                    <line x1="12" y1="52" x2="12" y2="58" strokeWidth="1" />
                  </svg>
                  <span className="font-medium text-sm">{syringe.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Right Column - Calculator Inputs */}
          <div className="space-y-5">
            {/* Vial Quantity */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">
                Select Peptide Vial Quantity
              </label>
              <div className="flex flex-wrap gap-2">
                {VIAL_OPTIONS.map((v) => (
                  <Button
                    key={v}
                    variant={!showCustomVial && vialMg === v ? "default" : "outline"}
                    size="sm"
                    onClick={() => handleVialSelect(v)}
                    className="min-w-[60px]"
                  >
                    {v} mg
                  </Button>
                ))}
                <Button
                  variant={showCustomVial ? "default" : "outline"}
                  size="sm"
                  onClick={() => handleVialSelect("other")}
                >
                  Other
                </Button>
              </div>
              {showCustomVial && (
                <div className="flex items-center gap-2 mt-2">
                  <Input
                    type="number"
                    placeholder="Enter mg"
                    value={customVial}
                    onChange={(e) => setCustomVial(e.target.value)}
                    className="w-24"
                  />
                  <span className="text-sm text-muted-foreground">mg</span>
                </div>
              )}
            </div>

            {/* Bacteriostatic Water */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">
                How much bacteriostatic water are you adding?
              </label>
              <div className="flex flex-wrap gap-2">
                {WATER_OPTIONS.map((w) => (
                  <Button
                    key={w}
                    variant={!showCustomWater && waterMl === w ? "default" : "outline"}
                    size="sm"
                    onClick={() => handleWaterSelect(w)}
                    className="min-w-[50px]"
                  >
                    {w} ml
                  </Button>
                ))}
                <Button
                  variant={showCustomWater ? "default" : "outline"}
                  size="sm"
                  onClick={() => handleWaterSelect("other")}
                >
                  Other
                </Button>
              </div>
              {showCustomWater && (
                <div className="flex items-center gap-2 mt-2">
                  <Input
                    type="number"
                    placeholder="Enter ml"
                    value={customWater}
                    onChange={(e) => setCustomWater(e.target.value)}
                    className="w-24"
                  />
                  <span className="text-sm text-muted-foreground">ml</span>
                </div>
              )}
            </div>

            {/* Desired Dose */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">
                How much of the peptide do you want in each dose?
              </label>
              <div className="flex flex-wrap gap-2">
                {DOSE_OPTIONS.map((d) => (
                  <Button
                    key={d}
                    variant={!showCustomDose && doseMcg === d ? "default" : "outline"}
                    size="sm"
                    onClick={() => handleDoseSelect(d)}
                    className="min-w-[60px]"
                  >
                    {d} mcg
                  </Button>
                ))}
                <Button
                  variant={showCustomDose ? "default" : "outline"}
                  size="sm"
                  onClick={() => handleDoseSelect("other")}
                >
                  Other
                </Button>
              </div>
              {showCustomDose && (
                <div className="flex items-center gap-2 mt-2">
                  <Input
                    type="number"
                    placeholder="Enter mcg"
                    value={customDose}
                    onChange={(e) => setCustomDose(e.target.value)}
                    className="w-24"
                  />
                  <span className="text-sm text-muted-foreground">mcg</span>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Result Section */}
        <div className="mt-8 p-6 rounded-xl bg-primary/5 border border-primary/20">
          <p className="text-center text-lg font-medium mb-6">
            To have a dose of{" "}
            <span className="text-primary font-bold">{effectiveDose} mcg</span>
            {" "}pull the syringe to{" "}
            <span className="text-primary font-bold">{calculatedUnits} units</span>.
          </p>

          {/* Syringe Ruler */}
          <div className="relative">
            {/* Ruler container */}
            <div className="relative h-12 bg-muted rounded-full overflow-hidden border border-border">
              {/* Fill */}
              <div
                className="absolute left-0 top-0 h-full bg-primary/30 transition-all duration-300"
                style={{ width: `${unitPercentage}%` }}
              />
              {/* Marker */}
              <div
                className="absolute top-0 h-full w-1 bg-primary transition-all duration-300"
                style={{ left: `${unitPercentage}%` }}
              />
            </div>

            {/* Graduation marks */}
            <div className="relative mt-1 h-4">
              {Array.from({ length: 11 }).map((_, i) => {
                const unitValue = (syringeInfo.maxUnits / 10) * i;
                return (
                  <div
                    key={i}
                    className="absolute flex flex-col items-center"
                    style={{ left: `${i * 10}%`, transform: "translateX(-50%)" }}
                  >
                    <div className={cn(
                      "w-px bg-muted-foreground/50",
                      i % 5 === 0 ? "h-3" : "h-2"
                    )} />
                    {i % 2 === 0 && (
                      <span className="text-[10px] text-muted-foreground mt-0.5">
                        {Math.round(unitValue)}
                      </span>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Unit label */}
          <p className="text-center text-sm text-muted-foreground mt-4">
            {syringeInfo.label} syringe ({syringeInfo.maxUnits} units max)
          </p>
        </div>

        {/* Disclaimer */}
        <p className="text-xs text-muted-foreground text-center pt-2">
          For research and educational purposes only. Not medical advice.
        </p>
      </CardContent>
    </Card>
  );
};

export default PeptideCalculator;
