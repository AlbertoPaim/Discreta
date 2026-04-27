"use client";

import { useEffect, useState } from "react";
import { FormulaForger } from "@/components/game/FormulaForger";
import { SignalGenerator } from "@/components/game/SignalGenerator";
import { ProofBuilder } from "@/components/game/ProofBuilder";
import { useGameStore } from "@/store/gameStore";
import { sectorsData } from "@/lib/sectorsData";
import { MicroPhase, DefinitionPuzzle, GraphConnectPuzzle, ProofBuilderPuzzle } from "@/types/level";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";

interface ClientPhasePageProps {
  microPhaseId: string;
  phaseData: MicroPhase;
}

export default function ClientPhasePage({ microPhaseId, phaseData }: ClientPhasePageProps) {
  const { addXp, unlockMicroPhase, unlockedMicroPhases } = useGameStore();
  const [mounted, setMounted] = useState(false);
  const router = useRouter();

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
  }, []);

  if (!mounted) return null;

  // Calcula a próxima fase para o botão "Avançar"
  let foundCurrent = false;
  let nextPhaseId: string | null = null;
  
  for (const sector of sectorsData) {
    for (const mission of sector.missions) {
      for (const phase of mission.microPhases) {
        if (foundCurrent && !nextPhaseId) {
          nextPhaseId = phase.id;
          break;
        }
        if (phase.id === microPhaseId) {
          foundCurrent = true;
        }
      }
    }
  }

  const handleSuccess = () => {
    if (!unlockedMicroPhases.includes(microPhaseId)) {
      addXp(150);
      unlockMicroPhase(microPhaseId);
    }

    if (nextPhaseId && !unlockedMicroPhases.includes(nextPhaseId)) {
      unlockMicroPhase(nextPhaseId);
    }
  };

  const handleNextPhase = () => {
    if (nextPhaseId) {
      router.push(`/fases/${nextPhaseId}`);
    }
  };

  const onNextProp = nextPhaseId ? handleNextPhase : undefined;

  // Renderização Dinâmica Baseada no PuzzleType
  switch (phaseData.puzzleType) {
    case 'Definition':
      return <FormulaForger phase={phaseData as DefinitionPuzzle} onSuccess={handleSuccess} onNext={onNextProp} />;
    
    case 'GraphConnect':
      return <SignalGenerator phase={phaseData as GraphConnectPuzzle} onSuccess={handleSuccess} onNext={onNextProp} />;

    case 'ProofBuilder':
      return <ProofBuilder phase={phaseData as ProofBuilderPuzzle} onSuccess={handleSuccess} onNext={onNextProp} />;

    default:
      return <div>Tipo de Puzzle Desconhecido</div>;
  }
}
