"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card";
import { useGameStore } from "@/store/gameStore";
import { Terminal, ShieldAlert, Lock, Unlock, PlayCircle, Milestone, CheckCircle2 } from "lucide-react";
import { useState, useEffect } from "react";
import { sectorsData } from "@/lib/sectorsData";
import { CodexSection } from "@/components/game/CodexSection";
import { cn } from "@/lib/utils";

export default function Home() {
  const { xp, unlockedSectors, unlockedMicroPhases, lastActiveSector, setLastActiveSector } = useGameStore();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
  }, []);

  if (!mounted) return null; // Previne hydration mismatch

  return (
    <main className="flex-1 flex flex-col items-center justify-start p-4 md:p-8 max-w-5xl mx-auto w-full">
      <div className="text-center mb-12 animate-pulse-slow mt-4 md:mt-8">
        <ShieldAlert className="w-16 h-16 mx-auto mb-6 text-[var(--color-sci-accent)]" />
        <h1 className="text-4xl md:text-5xl font-bold mb-4 tracking-widest text-[var(--color-sci-accent)] uppercase" style={{ textShadow: "0 0 20px var(--color-sci-accent)" }}>
          Projeto MATA42
        </h1>
        <p className="text-lg md:text-xl text-[var(--color-sci-text-muted)] font-mono">
          Terminal de Treinamento em Lógica e Matemática Discreta
        </p>
      </div>

      <Card className="w-full mb-12 border-[var(--color-sci-accent)] bg-black/40">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Terminal className="w-5 h-5" />
            Status do Operador
          </CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col md:flex-row justify-around items-center font-mono text-lg gap-4">
          <div className="flex items-center gap-4">
            <span className="text-[var(--color-sci-text-muted)]">Nível de Experiência:</span>
            <span className="text-3xl font-bold text-[var(--color-sci-success)]">{xp} XP</span>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-[var(--color-sci-text-muted)]">Micro-Fases Dominadas:</span>
            <span className="text-2xl text-[var(--color-sci-accent)]">{unlockedMicroPhases.length}</span>
          </div>
        </CardContent>
      </Card>

      <div className="w-full space-y-8">
        {sectorsData.map(sector => {
          const isOpen = lastActiveSector === sector.id;

          return (
            <Card key={sector.id} className={cn("transition-colors", "border-[var(--color-sci-border)] hover:border-[var(--color-sci-accent)] bg-black/60")}>
              <CardHeader 
                className="cursor-pointer group"
                onClick={() => setLastActiveSector(isOpen ? null : sector.id)}
              >
                <CardTitle className="flex items-center justify-between text-xl md:text-2xl group-hover:text-[var(--color-sci-accent)] transition-colors">
                  <div className="flex items-center gap-3">
                    <Unlock className="w-6 h-6 text-[var(--color-sci-accent)]" />
                    Setor {sector.id}: {sector.title}
                  </div>
                  <div className="text-[var(--color-sci-accent)] text-sm font-mono border border-[var(--color-sci-accent)] px-2 py-1 rounded">
                    {isOpen ? 'RECOLHER' : 'EXPANDIR'}
                  </div>
                </CardTitle>
                <CardDescription className="text-base md:text-lg mt-2 text-[var(--color-sci-text-muted)] font-mono">
                  {sector.description}
                </CardDescription>
              </CardHeader>
              
              {isOpen && sector.missions.length > 0 && (
                <CardContent className="flex flex-col gap-8 animate-in slide-in-from-top-4 duration-300">
                  {sector.missions.map(mission => (
                    <div key={mission.id} className="border-l-2 border-[var(--color-sci-accent)]/30 pl-4">
                      <div className="flex items-center gap-2 mb-4">
                        <Milestone className="w-5 h-5 text-[var(--color-sci-accent)]" />
                        <h3 className="text-xl font-bold text-[var(--color-sci-text)]">Missão {mission.id}: {mission.title}</h3>
                      </div>
                      <p className="text-[var(--color-sci-text-muted)] text-sm mb-4">{mission.description}</p>
                      
                      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                        {mission.microPhases.map(phase => {
                          const isPhaseCompleted = unlockedMicroPhases.includes(phase.id);
                          const isOnline = phase.puzzleType !== "ProofBuilder";
                          
                          return (
                            <Link key={phase.id} href={isOnline ? `/fases/${phase.id}` : "#"}>
                              <Button 
                                variant={isPhaseCompleted ? "default" : "outline"} 
                                className={cn("w-full h-20 flex justify-start px-4 gap-3", !isOnline && "opacity-60")}
                              >
                                {isPhaseCompleted ? <CheckCircle2 className="w-6 h-6 text-green-400 shrink-0" /> : <PlayCircle className="w-6 h-6 text-[var(--color-sci-accent)] shrink-0" />}
                                <div className="text-left overflow-hidden">
                                  <div className="font-bold text-md flex items-center gap-2">
                                    Fase {phase.id}
                                    <span className={cn("text-[10px] px-1 py-0.5 rounded border font-mono tracking-widest", isOnline ? "text-green-400 border-green-400/50" : "text-yellow-500 border-yellow-500/50")}>
                                      {isOnline ? "ONLINE" : "EM CONSTRUÇÃO"}
                                    </span>
                                  </div>
                                  <div className="text-xs opacity-80 truncate">{phase.title}</div>
                                </div>
                              </Button>
                            </Link>
                          );
                        })}
                      </div>
                    </div>
                  ))}
                </CardContent>
              )}
              {isOpen && sector.missions.length === 0 && (
                <CardContent>
                  <p className="text-[var(--color-sci-text-muted)] font-mono italic">Módulos de treinamento em construção...</p>
                </CardContent>
              )}
            </Card>
          );
        })}
      </div>

      <CodexSection />

      <footer className="w-full mt-16 pb-8 text-center text-[var(--color-sci-text-muted)] text-sm">
        <div className="flex flex-col items-center justify-center gap-2">
          <p>Desenvolvido e Idealizado por <strong className="text-[var(--color-sci-accent)]">Alberto Paim</strong></p>
          <div className="flex gap-4 mt-2">
            <a href="https://www.linkedin.com/in/albertopaim/" target="_blank" rel="noopener noreferrer" className="hover:text-[var(--color-sci-text)] transition-colors underline decoration-[var(--color-sci-accent)] underline-offset-4">
              LinkedIn
            </a>
            <a href="https://github.com/AlbertoPaim" target="_blank" rel="noopener noreferrer" className="hover:text-[var(--color-sci-text)] transition-colors underline decoration-[var(--color-sci-accent)] underline-offset-4">
              GitHub
            </a>
          </div>
        </div>
      </footer>
    </main>
  );
}
