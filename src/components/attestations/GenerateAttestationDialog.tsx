
import { Button } from "@/components/ui/button";
import { 
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { useAttestationGeneration } from "./hooks/useAttestationGeneration";
import AttestationFormSection from "./AttestationFormSection";
import AttestationPreviewCard from "./AttestationPreviewCard";

interface Student {
  id: number;
  name: string;
  matricule: string;
  niveau: string;
  filiere: string;
}

interface GenerateAttestationDialogProps {
  isOpen: boolean;
  onClose: () => void;
  students: Student[];
  onGenerate: () => void;
}

const GenerateAttestationDialog = ({ isOpen, onClose, students, onGenerate }: GenerateAttestationDialogProps) => {
  const {
    selectedStudent,
    setSelectedStudent,
    attestationType,
    setAttestationType,
    isGenerating,
    previewAttestationData,
    handlePreviewAttestation,
    handleGenerateAttestation,
  } = useAttestationGeneration(students, onClose, onGenerate);

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl">
        <DialogHeader>
          <DialogTitle>Génération d'Attestation</DialogTitle>
          <DialogDescription>
            Créez une nouvelle attestation pour un étudiant
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6 py-4">
          <AttestationFormSection
            students={students}
            selectedStudent={selectedStudent}
            setSelectedStudent={setSelectedStudent}
            attestationType={attestationType}
            setAttestationType={setAttestationType}
          />

          {previewAttestationData && (
            <AttestationPreviewCard
              attestationData={previewAttestationData}
              attestationType={attestationType}
            />
          )}
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            Annuler
          </Button>
          {!previewAttestationData ? (
            <Button onClick={handlePreviewAttestation}>
              Aperçu
            </Button>
          ) : (
            <Button 
              onClick={handleGenerateAttestation}
              disabled={isGenerating}
            >
              {isGenerating ? "Génération en cours..." : "Générer"}
            </Button>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default GenerateAttestationDialog;
