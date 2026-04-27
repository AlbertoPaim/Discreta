"use client";

import { useState, useRef, useEffect } from "react";
import { GraphConnectPuzzle, GraphEdge, GraphSet } from "@/types/level";
import { Button } from "@/components/ui/button";
import { CheckCircle2, ArrowLeft } from "lucide-react";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";

interface SignalGeneratorProps {
  phase: GraphConnectPuzzle;
  onSuccess: () => void;
}

export function SignalGenerator({ phase, onSuccess }: SignalGeneratorProps) {
  const router = useRouter();

  const [edges, setEdges] = useState<GraphEdge[]>(phase.initialEdges || []);
  const [selectedNodes, setSelectedNodes] = useState<string[]>([]);
  const [activeNode, setActiveNode] = useState<string | null>(null);
  
  const [validation, setValidation] = useState<"success" | "error" | null>(null);

  const containerRef = useRef<HTMLDivElement>(null);
  const [nodePositions, setNodePositions] = useState<Record<string, { x: number, y: number }>>({});

  const updatePositions = () => {
    if (!containerRef.current) return;
    const containerRect = containerRef.current.getBoundingClientRect();
    
    const newPositions: Record<string, { x: number, y: number }> = {};
    (phase.sets || []).forEach(set => {
      set.nodes.forEach(node => {
        const el = document.getElementById(`node-${node.id}`);
        if (el) {
          const rect = el.getBoundingClientRect();
          newPositions[node.id] = {
            x: rect.left - containerRect.left + rect.width / 2,
            y: rect.top - containerRect.top + rect.height / 2,
          };
        }
      });
    });
    setNodePositions(newPositions);
  };

  useEffect(() => {
    // Small delay to ensure DOM is fully rendered before calculating positions
    const timeout = setTimeout(updatePositions, 100);
    window.addEventListener('resize', updatePositions);
    return () => {
      clearTimeout(timeout);
      window.removeEventListener('resize', updatePositions);
    }
  }, [phase]);

  const handleNodeClick = (setId: string, nodeId: string) => {
    if (phase.mode === 'select') {
      setSelectedNodes(prev => 
        prev.includes(nodeId) ? prev.filter(id => id !== nodeId) : [...prev, nodeId]
      );
      setValidation(null);
      return;
    }

    if (phase.mode === 'connect') {
      if (!activeNode) {
        setActiveNode(nodeId);
      } else {
        if (activeNode === nodeId) {
          setActiveNode(null);
          return;
        }
        
        const existingEdgeIndex = edges.findIndex(e => 
          (e.from === activeNode && e.to === nodeId) || 
          (e.from === nodeId && e.to === activeNode)
        );

        const setIndex1 = (phase.sets || []).findIndex(s => s.nodes.some(n => n.id === activeNode));
        const setIndex2 = (phase.sets || []).findIndex(s => s.nodes.some(n => n.id === nodeId));

        if (setIndex1 !== setIndex2) {
            if (existingEdgeIndex !== -1) {
              setEdges(edges.filter((_, i) => i !== existingEdgeIndex));
            } else {
              const fromId = setIndex1 < setIndex2 ? activeNode : nodeId;
              const toId = setIndex1 < setIndex2 ? nodeId : activeNode;
              
              // Only allow edges to adjacent sets (e.g. Set 0 to Set 1, Set 1 to Set 2)
              if (Math.abs(setIndex1 - setIndex2) === 1) {
                setEdges([...edges, { from: fromId, to: toId }]);
              }
            }
        }
        setActiveNode(null);
        setValidation(null);
      }
    }
  };

  const isValidFunction = (fromSet: GraphSet, toSet: GraphSet, currentEdges: GraphEdge[]) => {
    for (const node of fromSet.nodes) {
      const outgoing = currentEdges.filter(e => e.from === node.id && toSet.nodes.some(n => n.id === e.to));
      if (outgoing.length !== 1) return false;
    }
    return true;
  };

  const isSurjective = (fromSet: GraphSet, toSet: GraphSet, currentEdges: GraphEdge[]) => {
    for (const node of toSet.nodes) {
      const incoming = currentEdges.filter(e => e.to === node.id && fromSet.nodes.some(n => n.id === e.from));
      if (incoming.length === 0) return false;
    }
    return true;
  };

  const isInjective = (fromSet: GraphSet, toSet: GraphSet, currentEdges: GraphEdge[]) => {
    for (const node of toSet.nodes) {
      const incoming = currentEdges.filter(e => e.to === node.id && fromSet.nodes.some(n => n.id === e.from));
      if (incoming.length > 1) return false;
    }
    return true;
  };

  const handleValidate = () => {
    let isSuccess = false;
    
    if (phase.validationRule === 'exact_selection') {
      if (!phase.expectedSelection) return;
      const sortedSelected = [...selectedNodes].sort();
      const sortedExpected = [...phase.expectedSelection].sort();
      isSuccess = JSON.stringify(sortedSelected) === JSON.stringify(sortedExpected);
    } 
    else if (phase.validationRule === 'exact_edges') {
      if (phase.expectedEdges) {
        if (edges.length === phase.expectedEdges.length) {
          const hasAllEdges = phase.expectedEdges.every(expected => 
            edges.some(e => e.from === expected.from && e.to === expected.to)
          );
          isSuccess = hasAllEdges;
        }
      }
    }
    else if (phase.validationRule === 'not_injective') {
      const setA = phase.sets[0];
      const setB = phase.sets[1];
      if (isValidFunction(setA, setB, edges)) {
        if (!isInjective(setA, setB, edges)) {
          isSuccess = true;
        }
      }
    }
    else if (phase.validationRule === 'not_surjective') {
      const setA = phase.sets[0];
      const setB = phase.sets[1];
      if (isValidFunction(setA, setB, edges)) {
        if (!isSurjective(setA, setB, edges)) {
          isSuccess = true;
        }
      }
    }
    else if (phase.validationRule === 'composition_inj_not_inj') {
      if (phase.sets.length >= 3) {
        const setA = phase.sets[0];
        const setB = phase.sets[1];
        const setC = phase.sets[2];
        
        const f_edges = edges.filter(e => setA.nodes.some(n => n.id === e.from));
        const g_edges = edges.filter(e => setB.nodes.some(n => n.id === e.from));
        
        if (isValidFunction(setA, setB, f_edges) && isValidFunction(setB, setC, g_edges)) {
          const composedEdges: GraphEdge[] = [];
          for (const f of f_edges) {
            const g = g_edges.find(e => e.from === f.to);
            if (g) {
              composedEdges.push({ from: f.from, to: g.to });
            }
          }
          
          if (!isInjective(setB, setC, g_edges) && isInjective(setA, setC, composedEdges)) {
            isSuccess = true;
          }
        }
      }
    }
    else if (phase.validationRule === 'composition_surj_not_surj') {
      if (phase.sets.length >= 3) {
        const setA = phase.sets[0];
        const setB = phase.sets[1];
        const setC = phase.sets[2];
        
        const f_edges = edges.filter(e => setA.nodes.some(n => n.id === e.from));
        const g_edges = edges.filter(e => setB.nodes.some(n => n.id === e.from));
        
        if (isValidFunction(setA, setB, f_edges) && isValidFunction(setB, setC, g_edges)) {
          const composedEdges: GraphEdge[] = [];
          for (const f of f_edges) {
            const g = g_edges.find(e => e.from === f.to);
            if (g) {
              composedEdges.push({ from: f.from, to: g.to });
            }
          }
          
          if (!isSurjective(setA, setB, f_edges) && isSurjective(setA, setC, composedEdges)) {
            isSuccess = true;
          }
        }
      }
    }

    if (isSuccess) {
      setValidation("success");
      onSuccess();
    } else {
      setValidation("error");
    }
  };

  return (
    <div className="flex flex-col h-full max-w-4xl mx-auto w-full p-4 md:p-8 font-mono relative">
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
          {phase.example && (
            <div className="mt-4 p-3 bg-[var(--color-sci-accent)]/10 border-l-4 border-[var(--color-sci-accent)] text-[var(--color-sci-text)] text-sm">
              <strong className="tracking-widest uppercase block mb-1">Exemplo Prático:</strong> {phase.example}
            </div>
          )}
        </div>
      </div>

      <div 
        ref={containerRef}
        className="flex-1 flex justify-around items-center min-h-[400px] mb-8 relative border border-[var(--color-sci-border)] rounded-lg bg-black/40 overflow-hidden py-12"
      >
        {/* Edges SVG Overlay */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none z-10">
          {edges.map((edge, i) => {
            const start = nodePositions[edge.from];
            const end = nodePositions[edge.to];
            if (!start || !end) return null;
            
            const dx = end.x - start.x;
            const dy = end.y - start.y;
            const len = Math.sqrt(dx*dx + dy*dy);
            if (len === 0) return null;
            const nx = dx/len;
            const ny = dy/len;
            
            const targetRadius = 24; 
            const arrowX = end.x - nx * targetRadius;
            const arrowY = end.y - ny * targetRadius;

            return (
              <g key={i}>
                <line 
                  x1={start.x} y1={start.y} 
                  x2={arrowX} y2={arrowY} 
                  stroke="var(--color-sci-accent)" 
                  strokeWidth="3" 
                  className="drop-shadow-[0_0_5px_rgba(0,229,255,0.8)]"
                />
                <polygon 
                  points={`0,-6 12,0 0,6`} 
                  fill="var(--color-sci-accent)"
                  transform={`translate(${arrowX}, ${arrowY}) rotate(${Math.atan2(dy, dx) * 180 / Math.PI})`}
                />
              </g>
            );
          })}
        </svg>

        {/* Sets & Nodes */}
        {(phase.sets || []).map((set) => (
          <div key={set.id} className="flex flex-col items-center z-20">
            <h3 className="text-[var(--color-sci-text-muted)] mb-8 text-xl tracking-wider">Conjunto {set.label}</h3>
            <div className="flex flex-col gap-8">
              {set.nodes.map(node => {
                const isSelected = selectedNodes.includes(node.id);
                const isActive = activeNode === node.id;
                
                return (
                  <div
                    key={node.id}
                    id={`node-${node.id}`}
                    onClick={() => handleNodeClick(set.id, node.id)}
                    className={cn(
                      "w-12 h-12 rounded-full flex items-center justify-center text-xl font-bold border-2 cursor-pointer transition-all bg-[var(--color-sci-bg)] relative",
                      isSelected ? "border-green-500 text-green-400 shadow-[0_0_15px_rgba(34,197,94,0.4)]" :
                      isActive ? "border-[var(--color-sci-accent)] text-[var(--color-sci-accent)] shadow-[0_0_15px_rgba(0,229,255,0.4)] scale-110" :
                      "border-[var(--color-sci-border)] text-[var(--color-sci-text)] hover:border-[var(--color-sci-accent)] shadow-[0_0_10px_rgba(0,229,255,0.1)]"
                    )}
                  >
                    {node.label}
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      <div className="flex justify-center mt-auto mb-8">
        <Button
          onClick={handleValidate}
          className="w-64 h-14 text-xl"
          variant={validation === "error" ? "danger" : "default"}
        >
          {validation === "error" ? "Falha! Tente Novamente" : "Validar"}
        </Button>
      </div>

      {validation === "success" && (
        <div className="absolute inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
          <div className="bg-[var(--color-sci-bg)] border-2 border-green-500 rounded-xl p-8 max-w-2xl w-full text-center shadow-[0_0_40px_rgba(34,197,94,0.3)] animate-in fade-in zoom-in duration-300">
            <CheckCircle2 className="w-20 h-20 text-green-500 mx-auto mb-6" />
            <h2 className="text-3xl font-bold text-green-400 mb-6 tracking-widest">LIGAÇÃO ESTABELECIDA</h2>
            <p className="text-lg text-[var(--color-sci-text)] leading-relaxed mb-8">
              {phase.wisdomText}
            </p>
            <Button onClick={() => router.push('/')} className="w-full h-14 text-lg bg-green-600 hover:bg-green-500 text-white">
              Retornar ao Hub Central
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
