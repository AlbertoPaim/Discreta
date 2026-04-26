import { Sector } from "@/types/level";
import { sector1 } from "./data/sector1";
import { sector2 } from "./data/sector2";
import { sector3 } from "./data/sector3";
import { sector4 } from "./data/sector4";
import { sector5 } from "./data/sector5";
import { sector6 } from "./data/sector6";

export const sectorsData: Sector[] = [
  sector1,
  sector2,
  sector3,
  sector4,
  sector5,
  sector6
];

export const getSectorData = (sectorId: number) => {
  return sectorsData.find(s => s.id === sectorId);
};

export const getMicroPhaseData = (microPhaseId: string) => {
  for (const sector of sectorsData) {
    for (const mission of sector.missions) {
      for (const phase of mission.microPhases) {
        if (phase.id === microPhaseId) {
          return phase;
        }
      }
    }
  }
  return undefined;
};
