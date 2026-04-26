export type PuzzleType = 'Definition' | 'GraphConnect' | 'ProofBuilder';

export interface Rune {
  id: string;
  symbol: string;
}

export interface BaseMicroPhase {
  id: string; // Ex: "3.1.1"
  title: string;
  directive: string;
  puzzleType: PuzzleType;
  wisdomText: string;
}

export interface DefinitionPuzzle extends BaseMicroPhase {
  puzzleType: 'Definition';
  slotsCount: number;
  correctSequence: string[];
  availableRunes: Rune[];
}

// Futuras implementações para Missão 2 e 3
export interface GraphConnectPuzzle extends BaseMicroPhase {
  puzzleType: 'GraphConnect';
  // Dados específicos do grafo
}

export interface ProofBuilderPuzzle extends BaseMicroPhase {
  puzzleType: 'ProofBuilder';
  // Dados específicos da prova
}

export type MicroPhase = DefinitionPuzzle | GraphConnectPuzzle | ProofBuilderPuzzle;

export interface Mission {
  id: string; // Ex: "3.1"
  title: string;
  description: string;
  microPhases: MicroPhase[];
}

export interface Sector {
  id: number;
  title: string;
  description: string;
  missions: Mission[];
}
