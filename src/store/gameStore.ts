import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface GameState {
  xp: number;
  unlockedSectors: number[]; // Mantém por compatibilidade ou navegação macro
  unlockedMicroPhases: string[]; // Rastreia as micro-fases desbloqueadas: "3.1.1", "3.1.2", etc
  lastActiveSector: number | null; // Salva o último setor aberto na home
  addXp: (amount: number) => void;
  unlockSector: (sectorId: number) => void;
  unlockMicroPhase: (microPhaseId: string) => void;
  setLastActiveSector: (sectorId: number | null) => void;
  resetProgress: () => void;
}

export const useGameStore = create<GameState>()(
  persist(
    (set) => ({
      xp: 0,
      unlockedSectors: [1, 2, 3, 4, 5, 6],
      unlockedMicroPhases: ["1.1.1", "2.1.1", "3.1.1", "4.1.1", "5.1.1", "6.1.1"], // Primeira micro-fase de cada setor desbloqueada
      lastActiveSector: null,
      
      addXp: (amount) => set((state) => ({ xp: state.xp + amount })),
      
      unlockSector: (sectorId) => set((state) => ({
        unlockedSectors: state.unlockedSectors.includes(sectorId) 
          ? state.unlockedSectors 
          : [...state.unlockedSectors, sectorId].sort((a, b) => a - b)
      })),

      unlockMicroPhase: (microPhaseId) => set((state) => {
        if (state.unlockedMicroPhases.includes(microPhaseId)) return state;
        
        return {
          unlockedMicroPhases: [...state.unlockedMicroPhases, microPhaseId]
        };
      }),

      setLastActiveSector: (sectorId) => set({ lastActiveSector: sectorId }),
      
      resetProgress: () => set({ 
        xp: 0, 
        unlockedSectors: [1, 2, 3, 4, 5, 6], 
        unlockedMicroPhases: ["1.1.1", "2.1.1", "3.1.1", "4.1.1", "5.1.1", "6.1.1"] 
      }),
    }),
    {
      name: 'mata42-game-storage-v5', // Nome da chave no LocalStorage (v5 para atualizar unlocks)
    }
  )
);
