import { getMicroPhaseData } from "@/lib/sectorsData";
import { notFound } from "next/navigation";
import ClientPhasePage from "./ClientPhasePage";

export default async function PhasePage({ params }: { params: Promise<{ microPhaseId: string }> }) {
  const { microPhaseId } = await params;
  
  const phaseData = getMicroPhaseData(microPhaseId);

  if (!phaseData) {
    notFound();
  }

  return <ClientPhasePage microPhaseId={microPhaseId} phaseData={phaseData} />;
}
