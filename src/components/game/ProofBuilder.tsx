"use client";

import { useState } from "react";
import { BlockMath } from "react-katex";
import { ProofBuilderPuzzle } from "@/types/level";
import { Button } from "@/components/ui/button";
import { CheckCircle2, ArrowLeft } from "lucide-react";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";

interface ProofBuilderProps {
  phase: ProofBuilderPuzzle;
  onSuccess: () => void;
  onNext?: () => void;
}

export function ProofBuilder({ phase, onSuccess, onNext }: ProofBuilderProps) {
  const router = useRouter();

  const [steps, setSteps] = useState<{ statementId: string | null, justificationId: string | null }[]>(
    Array(phase.expectedProof.length).fill({ statementId: null, justificationId: null })
  );

  const [activeSlot, setActiveSlot] = useState<{ index: number, type: 'statement' | 'justification' } | null>(null);
  const [validation, setValidation] = useState<"success" | "error" | null>(null);

  const handleSlotClick = (index: number, type: 'statement' | 'justification') => {
    setActiveSlot({ index, type });
    setValidation(null);
  };

  const handleOptionClick = (id: string) => {
    if (!activeSlot) return;

    const newSteps = [...steps];
    const currentStep = { ...newSteps[activeSlot.index] };

    if (activeSlot.type === 'statement') {
      currentStep.statementId = id;
    } else {
      currentStep.justificationId = id;
    }

    newSteps[activeSlot.index] = currentStep;
    setSteps(newSteps);
    setActiveSlot(null);
  };

  const handleValidate = () => {
    // Verifica se todos estão preenchidos
    const isComplete = steps.every(s => s.statementId && s.justificationId);
    if (!isComplete) {
      setValidation("error");
      return;
    }

    // Verifica a corretude
    let isCorrect = true;
    for (let i = 0; i < phase.expectedProof.length; i++) {
      if (
        steps[i].statementId !== phase.expectedProof[i].statementId ||
        steps[i].justificationId !== phase.expectedProof[i].justificationId
      ) {
        isCorrect = false;
        break;
      }
    }

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
          <p className="text-[var(--color-sci-text-muted)] text-lg mb-4">
            {phase.directive}
          </p>
          {phase.example && (
            <div className="p-3 bg-[var(--color-sci-accent)]/10 border-l-4 border-[var(--color-sci-accent)] text-[var(--color-sci-text)] text-sm">
              <strong className="tracking-widest uppercase block mb-1">Exemplo Prático:</strong> {phase.example}
            </div>
          )}
        </div>
      </div>

      {/* Middle: Proof Steps */}
      <div className="flex-1 flex flex-col items-center justify-start min-h-[200px] mb-8 w-full gap-4">
        {steps.map((step, i) => {
          const statementSymbol = step.statementId ? phase.availableStatements.find(s => s.id === step.statementId)?.symbol : null;
          const justificationSymbol = step.justificationId ? phase.availableJustifications.find(s => s.id === step.justificationId)?.symbol : null;

          return (
            <div key={i} className="flex flex-col md:flex-row w-full gap-2 items-center">
              <div className="text-[var(--color-sci-text-muted)] font-bold text-xl mr-2">{i + 1}.</div>
              
              {/* Statement Slot */}
              <div
                onClick={() => handleSlotClick(i, 'statement')}
                className={cn(
                  "flex-1 h-20 px-4 flex items-center justify-center border-2 rounded-md cursor-pointer transition-all",
                  step.statementId
                    ? "border-[var(--color-sci-accent)] bg-[var(--color-sci-surface)] shadow-[0_0_15px_rgba(0,229,255,0.2)] text-lg"
                    : "border-dashed border-[var(--color-sci-border)] bg-black/40 hover:border-[var(--color-sci-text)]",
                  activeSlot?.index === i && activeSlot.type === 'statement' && "ring-2 ring-[var(--color-sci-accent)] bg-[var(--color-sci-surface)]",
                  validation === "error" && "border-red-500 shadow-[0_0_15px_rgba(239,68,68,0.4)]"
                )}
              >
                {statementSymbol ? <BlockMath math={statementSymbol} /> : <span className="text-[var(--color-sci-border)] text-sm">Selecione Afirmação</span>}
              </div>

              {/* Arrow or Separator */}
              <div className="text-[var(--color-sci-accent)] hidden md:block">➔</div>

              {/* Justification Slot */}
              <div
                onClick={() => handleSlotClick(i, 'justification')}
                className={cn(
                  "flex-1 h-20 px-4 flex items-center justify-center border-2 rounded-md cursor-pointer transition-all",
                  step.justificationId
                    ? "border-[var(--color-sci-success)] bg-[var(--color-sci-surface)] shadow-[0_0_15px_rgba(34,197,94,0.2)] text-lg"
                    : "border-dashed border-[var(--color-sci-border)] bg-black/40 hover:border-[var(--color-sci-text)]",
                  activeSlot?.index === i && activeSlot.type === 'justification' && "ring-2 ring-[var(--color-sci-success)] bg-[var(--color-sci-surface)]",
                  validation === "error" && "border-red-500 shadow-[0_0_15px_rgba(239,68,68,0.4)]"
                )}
              >
                {justificationSymbol ? <BlockMath math={justificationSymbol} /> : <span className="text-[var(--color-sci-border)] text-sm">Selecione Justificativa</span>}
              </div>
            </div>
          );
        })}

        {steps.every(s => s.statementId && s.justificationId) && validation !== "success" && (
          <Button
            onClick={handleValidate}
            className="mt-8 w-64 h-14 text-xl"
            variant={validation === "error" ? "danger" : "default"}
          >
            {validation === "error" ? "Falha Lógica! Tente Novamente" : "Validar Prova"}
          </Button>
        )}
      </div>

      {/* Bottom: Options Panel */}
      <div className="mt-auto border-t border-[var(--color-sci-border)] pt-6">
        {!activeSlot ? (
          <div className="text-center text-[var(--color-sci-text-muted)] italic py-8">
            Clique em um bloco vazio acima para selecionar uma afirmação ou justificativa.
          </div>
        ) : (
          <div className="animate-in slide-in-from-bottom-4">
            <h3 className="text-center text-[var(--color-sci-text)] mb-4 uppercase tracking-widest text-sm font-bold">
              Escolha a {activeSlot.type === 'statement' ? 'Afirmação' : 'Justificativa'} para a Linha {activeSlot.index + 1}
            </h3>
            <div className="flex flex-wrap justify-center gap-3">
              {(activeSlot.type === 'statement' ? phase.availableStatements : phase.availableJustifications).map(option => (
                <div
                  key={option.id}
                  onClick={() => handleOptionClick(option.id)}
                  className={cn(
                    "p-4 min-w-[8rem] border rounded-md bg-black/60 cursor-pointer transition-colors flex items-center justify-center text-lg",
                    activeSlot.type === 'statement' 
                      ? "border-[var(--color-sci-accent)] hover:bg-[var(--color-sci-accent)]/20" 
                      : "border-[var(--color-sci-success)] hover:bg-[var(--color-sci-success)]/20"
                  )}
                >
                  <BlockMath math={option.symbol} />
                </div>
              ))}
            </div>
            <div className="flex justify-center mt-6">
              <Button variant="ghost" onClick={() => setActiveSlot(null)}>Cancelar Seleção</Button>
            </div>
          </div>
        )}
      </div>

      {/* Victory Modal */}
      {validation === "success" && (
        <div className="absolute inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
          <div className="bg-[var(--color-sci-bg)] border-2 border-[var(--color-sci-success)] rounded-xl p-8 max-w-2xl w-full text-center shadow-[0_0_40px_rgba(34,197,94,0.3)] animate-in fade-in zoom-in duration-300">
            <CheckCircle2 className="w-20 h-20 text-[var(--color-sci-success)] mx-auto mb-6" />
            <h2 className="text-3xl font-bold text-[var(--color-sci-success)] mb-6 tracking-widest">Q.E.D.</h2>

            <p className="text-lg text-[var(--color-sci-text)] leading-relaxed mb-8">
              {phase.wisdomText}
            </p>

            <div className="flex flex-col gap-3">
              {onNext && (
                <Button onClick={onNext} className="w-full h-14 text-lg bg-green-600 hover:bg-green-500 text-white">
                  Avançar para Próxima Fase
                </Button>
              )}
              <Button onClick={() => router.push('/')} variant={onNext ? "outline" : "default"} className={cn("w-full h-14 text-lg", !onNext && "bg-green-600 hover:bg-green-500 text-white")}>
                Retornar ao Hub Central
              </Button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
