
import { FileText } from "lucide-react";
import { Button } from "@/components/ui/button";

interface AttestationHeaderProps {
  onNewAttestation: () => void;
}

const AttestationHeader = ({ onNewAttestation }: AttestationHeaderProps) => {
  return (
    <div>
      <h1 className="text-3xl font-bold tracking-tight">Attestations</h1>
      <p className="text-muted-foreground mt-2">
        Générez et gérez les attestations pour les étudiants
      </p>
    </div>
  );
};

export default AttestationHeader;
