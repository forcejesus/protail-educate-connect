
import { Button } from "@/components/ui/button";
import { 
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import AttestationPreviewContent from "./AttestationPreviewContent";

interface AttestationPreviewProps {
  isOpen: boolean;
  onClose: () => void;
  attestation: any;
}

const AttestationPreviewDialog = ({ isOpen, onClose, attestation }: AttestationPreviewProps) => {
  if (!attestation) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl">
        <DialogHeader>
          <DialogTitle>Aperçu de l'attestation</DialogTitle>
          <DialogDescription>
            Attestation de {attestation?.name || ""}
          </DialogDescription>
        </DialogHeader>

        <AttestationPreviewContent attestation={attestation} />

        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            Fermer
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default AttestationPreviewDialog;
