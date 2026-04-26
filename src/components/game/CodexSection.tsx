"use client";

import { useState } from "react";
import { sectorsData } from "@/lib/sectorsData";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { BookOpen, ChevronDown, ChevronUp } from "lucide-react";
import { cn } from "@/lib/utils";

export function CodexSection() {
  const [isOpen, setIsOpen] = useState(false);
  const [expandedSector, setExpandedSector] = useState<number | null>(null);

  return (
    <Card className="w-full mt-12 border-[var(--color-sci-border)] bg-black/40">
      <CardHeader 
        className="cursor-pointer hover:bg-white/5 transition-colors"
        onClick={() => setIsOpen(!isOpen)}
      >
        <CardTitle className="flex items-center justify-between text-xl md:text-2xl text-[var(--color-sci-text)]">
          <div className="flex items-center gap-3">
            <BookOpen className="w-6 h-6 text-[var(--color-sci-accent)]" />
            Biblioteca de Arquivos (Codex)
          </div>
          {isOpen ? <ChevronUp /> : <ChevronDown />}
        </CardTitle>
      </CardHeader>
      
      {isOpen && (
        <CardContent className="flex flex-col gap-4">
          <p className="text-[var(--color-sci-text-muted)] text-sm mb-4">
            Consulte aqui o banco de dados com os conceitos matemáticos, diretrizes e conhecimentos adquiridos de todas as missões.
          </p>
          
          {sectorsData.map(sector => (
            <div key={sector.id} className="border border-[var(--color-sci-border)]/50 rounded-md overflow-hidden bg-black/60">
              <button
                className="w-full text-left p-4 bg-white/5 hover:bg-white/10 font-bold flex justify-between items-center transition-colors text-[var(--color-sci-text)]"
                onClick={() => setExpandedSector(expandedSector === sector.id ? null : sector.id)}
              >
                Setor {sector.id}: {sector.title}
                {expandedSector === sector.id ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
              </button>
              
              {expandedSector === sector.id && (
                <div className="p-4 flex flex-col gap-6">
                  {sector.missions.map(mission => (
                    <div key={mission.id} className="border-l-2 border-[var(--color-sci-accent)]/30 pl-4">
                      <h4 className="text-lg font-bold text-[var(--color-sci-accent)] mb-2">Missão {mission.id}: {mission.title}</h4>
                      
                      {mission.microPhases.length === 0 ? (
                        <p className="text-xs text-gray-500 italic">Arquivos em decodificação...</p>
                      ) : (
                        <div className="flex flex-col gap-4">
                          {mission.microPhases.map(phase => (
                            <div key={phase.id} className="bg-white/5 p-3 rounded text-sm">
                              <h5 className="font-bold text-[var(--color-sci-text)] mb-1">
                                {phase.id} - {phase.title}
                              </h5>
                              <p className="text-[var(--color-sci-text-muted)] mb-2">
                                <span className="text-[var(--color-sci-accent)]/80 text-xs uppercase tracking-wider">Diretriz:</span> {phase.directive}
                              </p>
                              {phase.wisdomText && (
                                <p className="text-[var(--color-sci-success)]/90 italic">
                                  <span className="text-xs uppercase tracking-wider opacity-80">Conhecimento:</span> {phase.wisdomText}
                                </p>
                              )}
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </CardContent>
      )}
    </Card>
  );
}
