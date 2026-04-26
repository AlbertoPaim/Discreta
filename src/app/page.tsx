"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card";
import { useGameStore } from "@/store/gameStore";
import { Terminal, ShieldAlert, Lock, Unlock, PlayCircle, Milestone } from "lucide-react";
import { useState, useEffect } from "react";
import { sectorsData } from "@/lib/sectorsData";
import { CodexSection } from "@/components/game/CodexSection";
import { cn } from "@/lib/utils";

export default function Home() {
  const { xp, unlockedSectors, unlockedMicroPhases } = useGameStore();
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
          const isSectorUnlocked = unlockedSectors.includes(sector.id);

          return (
            <Card key={sector.id} className={cn("transition-colors", isSectorUnlocked ? "border-[var(--color-sci-border)] hover:border-[var(--color-sci-accent)] bg-black/60" : "border-dashed border-gray-800 bg-black/20 opacity-70")}>
              <CardHeader>
                <CardTitle className="flex items-center gap-3 text-xl md:text-2xl">
                  {isSectorUnlocked ? <Unlock className="w-6 h-6 text-[var(--color-sci-accent)]" /> : <Lock className="w-6 h-6 text-gray-500" />}
                  Setor {sector.id}: {sector.title}
                </CardTitle>
                <CardDescription className="text-base md:text-lg mt-2 text-[var(--color-sci-text-muted)] font-mono">
                  {sector.description}
                </CardDescription>
              </CardHeader>
              
              {isSectorUnlocked && sector.missions.length > 0 && (
                <CardContent className="flex flex-col gap-8">
                  {sector.missions.map(mission => (
                    <div key={mission.id} className="border-l-2 border-[var(--color-sci-accent)]/30 pl-4">
                      <div className="flex items-center gap-2 mb-4">
                        <Milestone className="w-5 h-5 text-[var(--color-sci-accent)]" />
                        <h3 className="text-xl font-bold text-[var(--color-sci-text)]">Missão {mission.id}: {mission.title}</h3>
                      </div>
                      <p className="text-[var(--color-sci-text-muted)] text-sm mb-4">{mission.description}</p>
                      
                      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                        {mission.microPhases.map(phase => {
                          const isPhaseUnlocked = unlockedMicroPhases.includes(phase.id);
                          
                          return (
                            <Link key={phase.id} href={isPhaseUnlocked ? `/fases/${phase.id}` : "#"} className={isPhaseUnlocked ? "" : "pointer-events-none"}>
                              <Button 
                                variant={isPhaseUnlocked ? "default" : "outline"} 
                                className={cn("w-full h-20 flex justify-start px-4 gap-3", !isPhaseUnlocked && "opacity-50")}
                              >
                                {isPhaseUnlocked ? <PlayCircle className="w-6 h-6 text-green-400 shrink-0" /> : <Lock className="w-6 h-6 shrink-0" />}
                                <div className="text-left overflow-hidden">
                                  <div className="font-bold text-md">Fase {phase.id}</div>
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
              {isSectorUnlocked && sector.missions.length === 0 && (
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
