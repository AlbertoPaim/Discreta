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

  const handleSuccess = () => {
    if (!unlockedMicroPhases.includes(microPhaseId)) {
      addXp(150);
      unlockMicroPhase(microPhaseId);
    }
    
    // Tentativa de desbloquear a próxima fase na ordem
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

    if (nextPhaseId && !unlockedMicroPhases.includes(nextPhaseId)) {
      unlockMicroPhase(nextPhaseId);
    }
  };

  // Renderização Dinâmica Baseada no PuzzleType
  switch (phaseData.puzzleType) {
    case 'Definition':
      return <FormulaForger phase={phaseData as DefinitionPuzzle} onSuccess={handleSuccess} />;
    
    case 'GraphConnect':
      return <SignalGenerator phase={phaseData as GraphConnectPuzzle} onSuccess={handleSuccess} />;

    case 'ProofBuilder':
      return <ProofBuilder phase={phaseData as ProofBuilderPuzzle} onSuccess={handleSuccess} />;

    default:
      return <div>Tipo de Puzzle Desconhecido</div>;
  }
}
