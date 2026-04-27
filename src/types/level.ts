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

export type GraphValidationRule = 
  | 'exact_edges' 
  | 'not_injective' 
  | 'not_surjective' 
  | 'exact_selection'
  | 'composition_inj_not_inj'
  | 'composition_surj_not_surj';

export interface GraphNode {
  id: string;
  label: string;
}

export interface GraphSet {
  id: string;
  label: string;
  nodes: GraphNode[];
}

export interface GraphEdge {
  from: string;
  to: string;
}

export interface GraphConnectPuzzle extends BaseMicroPhase {
  puzzleType: 'GraphConnect';
  sets: GraphSet[];
  mode: 'connect' | 'select'; 
  initialEdges: GraphEdge[];
  expectedEdges?: GraphEdge[];
  expectedSelection?: string[]; 
  validationRule: GraphValidationRule;
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
