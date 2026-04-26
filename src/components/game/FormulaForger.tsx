"use client";

import { useState } from "react";
import { BlockMath } from "react-katex";
import { DefinitionPuzzle, Rune } from "@/types/level";
import { Button } from "@/components/ui/button";
import { CheckCircle2, ArrowLeft } from "lucide-react";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";

interface FormulaForgerProps {
  phase: DefinitionPuzzle;
  onSuccess: () => void;
}

export function FormulaForger({ phase, onSuccess }: FormulaForgerProps) {
  const router = useRouter();
  
  // slots state: array of length `slotsCount`, holding Rune objects or null
  const [slots, setSlots] = useState<(Rune | null)[]>(Array(phase.slotsCount).fill(null));
  
  // validation state
  const [validation, setValidation] = useState<"success" | "error" | null>(null);

  // Return available runes that are NOT in the slots
  const availableRunes = phase.availableRunes.filter(
    rune => !slots.some(slot => slot?.id === rune.id)
  );

  const handleRuneClick = (rune: Rune) => {
    // Find first empty slot
    const firstEmptyIndex = slots.findIndex(slot => slot === null);
    if (firstEmptyIndex !== -1) {
      const newSlots = [...slots];
      newSlots[firstEmptyIndex] = rune;
      setSlots(newSlots);
      setValidation(null);
    }
  };

  const handleSlotClick = (index: number) => {
    if (slots[index]) {
      const newSlots = [...slots];
      newSlots[index] = null;
      setSlots(newSlots);
      setValidation(null);
    }
  };

  const handleValidate = () => {
    // Check if fully filled
    if (slots.some(s => s === null)) {
      setValidation("error");
      return;
    }

    // Check sequence
    const currentSequence = slots.map(s => s?.id);
    const isCorrect = currentSequence.every((id, i) => id === phase.correctSequence[i]);

    if (isCorrect) {
      setValidation("success");
      onSuccess();
    } else {
      setValidation("error");
    }
  };

  return (
    <div className="flex flex-col h-full max-w-4xl mx-auto w-full p-4 md:p-8 font-mono relative">
      
      {/* Top: Mission Directive */}
      <div className="mb-8">
        <Button variant="ghost" onClick={() => router.push('/')} className="mb-4">
          <ArrowLeft className="w-5 h-5 mr-2" />
          Abortar Missão
        </Button>
        <div className="bg-black/60 border border-[var(--color-sci-border)] rounded-lg p-6">
          <h2 className="text-[var(--color-sci-accent)] text-xl mb-2 flex items-center gap-2">
             Missão: {phase.title}
          </h2>
          <p className="text-[var(--color-sci-text-muted)] text-lg">
            {phase.directive}
          </p>
        </div>
      </div>

      {/* Middle: Empty Slots */}
      <div className="flex-1 flex flex-col items-center justify-center min-h-[200px] mb-8">
        <div className="flex flex-wrap justify-center gap-4">
          {slots.map((slot, i) => (
            <div 
              key={i}
              onClick={() => handleSlotClick(i)}
              className={cn(
                "w-24 h-24 md:w-32 md:h-32 flex items-center justify-center border-2 rounded-md cursor-pointer transition-all",
                slot 
                  ? "border-[var(--color-sci-accent)] bg-[var(--color-sci-surface)] shadow-[0_0_15px_rgba(0,229,255,0.2)] text-2xl" 
                  : "border-dashed border-[var(--color-sci-border)] bg-black/40 hover:border-[var(--color-sci-text)]",
                validation === "error" && "border-red-500 shadow-[0_0_15px_rgba(239,68,68,0.4)]"
              )}
            >
              {slot ? <BlockMath math={slot.symbol} /> : <span className="text-[var(--color-sci-border)]">Vazio</span>}
            </div>
          ))}
        </div>
        
        {slots.every(s => s !== null) && validation !== "success" && (
          <Button 
            onClick={handleValidate}
            className="mt-12 w-64 h-14 text-xl"
            variant={validation === "error" ? "destructive" : "default"}
          >
            {validation === "error" ? "Falha! Tente Novamente" : "Validar Código"}
          </Button>
        )}
      </div>

      {/* Bottom: Rune Keyboard */}
      <div className="mt-auto">
        <h3 className="text-center text-[var(--color-sci-text-muted)] mb-4 uppercase tracking-widest text-sm">
          Runas Disponíveis
        </h3>
        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-3">
          {availableRunes.map(rune => (
            <div
              key={rune.id}
              onClick={() => handleRuneClick(rune)}
              className="p-4 border border-[var(--color-sci-border)] rounded-md bg-black/60 cursor-pointer hover:bg-[var(--color-sci-surface)] hover:border-[var(--color-sci-accent)] transition-colors flex items-center justify-center text-xl h-20"
            >
              <BlockMath math={rune.symbol} />
            </div>
          ))}
        </div>
      </div>

      {/* Victory Modal */}
      {validation === "success" && (
        <div className="absolute inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
          <div className="bg-[var(--color-sci-bg)] border-2 border-green-500 rounded-xl p-8 max-w-2xl w-full text-center shadow-[0_0_40px_rgba(34,197,94,0.3)] animate-in fade-in zoom-in duration-300">
            <CheckCircle2 className="w-20 h-20 text-green-500 mx-auto mb-6" />
            <h2 className="text-3xl font-bold text-green-400 mb-6 tracking-widest">FORMULA FORJADA</h2>
            
            <div className="bg-black/50 p-6 rounded-lg border border-green-500/30 mb-8">
               <BlockMath math={phase.correctSequence.map(id => phase.availableRunes.find(r => r.id === id)?.symbol).join(' ')} />
            </div>

            <p className="text-lg text-[var(--color-sci-text)] leading-relaxed mb-8">
              {phase.wisdomText}
            </p>

            <Button onClick={() => router.push('/')} className="w-full h-14 text-lg bg-green-600 hover:bg-green-500">
              Retornar ao Hub Central
            </Button>
          </div>
        </div>
      )}

    </div>
  );
}
