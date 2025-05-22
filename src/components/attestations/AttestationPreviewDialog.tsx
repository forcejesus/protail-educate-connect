
import { useState } from "react";
import { QRCodeSVG } from "qrcode.react";
import { Printer } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { 
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { jsPDF } from "jspdf";

interface AttestationPreviewProps {
  isOpen: boolean;
  onClose: () => void;
  attestation: any;
}

const AttestationPreviewDialog = ({ isOpen, onClose, attestation }: AttestationPreviewProps) => {
  const { toast } = useToast();
  const [isGenerating, setIsGenerating] = useState(false);

  // Generate PDF attestation
  const generatePDF = () => {
    if (!attestation) return;
    
    setIsGenerating(true);
    
    setTimeout(() => {
      try {
        // Create a new jsPDF instance
        const doc = new jsPDF({
          orientation: "portrait",
          unit: "mm",
          format: "a4",
        });
        
        // Set document properties
        doc.setProperties({
          title: `Attestation de ${attestation.attestationType === "success" ? "Réussite" : "Scolarité"} - ${attestation.name}`,
          subject: `Attestation pour ${attestation.name}`,
          author: "École Supérieure",
          creator: "Système de Gestion Académique",
        });
        
        // Add school header
        doc.setFontSize(22);
        doc.setFont("helvetica", "bold");
        doc.text("RÉPUBLIQUE DU CONGO", 105, 20, { align: "center" });
        doc.setFontSize(16);
        doc.setFont("helvetica", "normal");
        doc.text("Ministère de l'Enseignement Supérieur", 105, 30, { align: "center" });
        
        // Add line separator
        doc.setLineWidth(0.5);
        doc.line(20, 35, 190, 35);
        
        // Add title
        doc.setFontSize(20);
        doc.setFont("helvetica", "bold");
        doc.text(`ATTESTATION DE ${attestation.attestationType === "success" ? "RÉUSSITE" : "SCOLARITÉ"}`, 105, 50, { align: "center" });
        
        // Add main content
        doc.setFontSize(12);
        doc.setFont("helvetica", "normal");
        
        const contentText = attestation.attestationType === "success" 
          ? `Le Directeur de la Direction Générale de l'Enseignement Supérieur atteste que :\n\n
             M./Mme ${attestation.name}, a validé avec succès l'année académique,\n
             Filière: ${attestation.filiere}\n
             Niveau: ${attestation.niveau}\n
             Année académique: 2023-2024.\n\n
             Cette attestation lui est délivrée pour servir et valoir ce que de droit.`
          : `Le Directeur de la Direction Générale de l'Enseignement Supérieur atteste que :\n\n
             M./Mme ${attestation.name}, est régulièrement inscrit(e) et suit les cours\n
             Filière: ${attestation.filiere}\n
             Niveau: ${attestation.niveau}\n
             Année académique: 2023-2024.\n\n
             Cette attestation lui est délivrée pour servir et valoir ce que de droit.`;
        
        doc.text(contentText, 25, 70);
        
        // Add date
        const currentDate = new Date(attestation.date || new Date()).toLocaleDateString('fr-FR', {
          year: 'numeric',
          month: 'long',
          day: 'numeric'
        });
        doc.text(`Fait à Brazzaville, le ${currentDate}`, 130, 160, { align: "left" });
        
        // Add signature section
        doc.setFontSize(11);
        doc.text("Le Directeur Général", 150, 175, { align: "center" });
        doc.setFontSize(10);
        doc.text("Prof. Jean KOSSA", 150, 205, { align: "center" });
        
        // Save the PDF
        doc.save(`attestation_${attestation.name.replace(' ', '_')}.pdf`);
        setIsGenerating(false);
        
        toast({
          title: "Exportation réussie",
          description: "L'attestation a été générée et téléchargée avec succès.",
        });
      } catch (error) {
        console.error("Error generating PDF:", error);
        toast({
          title: "Erreur",
          description: "Une erreur est survenue lors de la génération du PDF.",
          variant: "destructive",
        });
        setIsGenerating(false);
      }
    }, 500);
  };

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

        <Card className="mt-6">
          <CardHeader className="text-center border-b">
            <h2 className="text-lg font-bold">RÉPUBLIQUE DU CONGO</h2>
            <p className="text-sm text-gray-500">Ministère de l'Enseignement Supérieur</p>
          </CardHeader>
          <CardContent className="pt-6">
            <div className="text-center mb-4">
              <h2 className="font-bold text-xl">
                ATTESTATION DE {attestation.attestationType === "success" ? "RÉUSSITE" : "SCOLARITÉ"}
              </h2>
              <p className="text-sm text-gray-500">N° ATT-2023-{attestation.id * 1000}</p>
            </div>

            <div className="flex justify-between gap-4">
              <div className="flex-grow space-y-4">
                <p className="text-sm">
                  Le Directeur de la Direction Générale de l'Enseignement Supérieur atteste que :
                </p>
                <p className="text-sm font-semibold">
                  M./Mme {attestation.name}
                </p>
                {attestation.attestationType === "success" ? (
                  <p className="text-sm">
                    a validé avec succès l'année académique
                    <br /><br />
                    <strong>Filière :</strong> {attestation.filiere}
                    <br />
                    <strong>Niveau :</strong> {attestation.niveau}
                    <br />
                    <strong>Année académique :</strong> 2023-2024
                  </p>
                ) : (
                  <p className="text-sm">
                    est régulièrement inscrit(e) et suit les cours
                    <br /><br />
                    <strong>Filière :</strong> {attestation.filiere}
                    <br />
                    <strong>Niveau :</strong> {attestation.niveau}
                    <br />
                    <strong>Année académique :</strong> 2023-2024
                  </p>
                )}
                <p className="text-sm">
                  Cette attestation lui est délivrée pour servir et valoir ce que de droit.
                </p>
              </div>

              <div id="qr-code" className="flex-shrink-0">
                <QRCodeSVG 
                  value={attestation.verificationUrl || "https://example.com"} 
                  size={120} 
                />
              </div>
            </div>

            <div className="flex justify-between items-end mt-8">
              <div>
                <p className="text-sm">
                  Fait à Brazzaville, le {new Date(attestation.date).toLocaleDateString('fr-FR', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}
                </p>
                <div className="mt-2">
                  <p className="text-sm">Le Directeur Général</p>
                  <div className="h-12 w-28 mt-6 mb-1">
                    <p>Signature et tampon</p>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex justify-end gap-2">
            <Button 
              variant="outline" 
              onClick={generatePDF}
              disabled={isGenerating}
            >
              <Printer className="mr-2 h-4 w-4" />
              {isGenerating ? "Génération en cours..." : "Exporter en PDF"}
            </Button>
          </CardFooter>
        </Card>

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
