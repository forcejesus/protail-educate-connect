
import { useState } from "react";
import { FileText, Printer } from "lucide-react";
import { QRCodeSVG } from "qrcode.react";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { jsPDF } from "jspdf";

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
  const [selectedStudent, setSelectedStudent] = useState("");
  const [attestationType, setAttestationType] = useState("success");
  const [isGenerating, setIsGenerating] = useState(false);
  const [previewAttestationData, setPreviewAttestationData] = useState<any>(null);
  const { toast } = useToast();

  // Find student by matricule for attestation generation
  const findStudentByMatricule = (matricule: string) => {
    return students.find(student => student.matricule === matricule);
  };

  // Generate attestation preview
  const handlePreviewAttestation = () => {
    if (!selectedStudent) {
      toast({
        title: "Erreur",
        description: "Veuillez sélectionner un étudiant.",
        variant: "destructive",
      });
      return;
    }
    
    const student = findStudentByMatricule(selectedStudent);
    if (student) {
      setPreviewAttestationData({
        ...student,
        attestationType,
        date: new Date().toISOString().split('T')[0],
        id: Math.floor(Math.random() * 1000) + 1,
        verificationUrl: `https://votre-ecole.edu/verify/${selectedStudent}`,
      });
    }
  };

  // Generate PDF attestation
  const generatePDF = () => {
    if (!previewAttestationData) return;
    
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
          title: `Attestation de ${attestationType === "success" ? "Réussite" : "Scolarité"} - ${previewAttestationData.name}`,
          subject: `Attestation pour ${previewAttestationData.name}`,
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
        doc.text(`ATTESTATION DE ${attestationType === "success" ? "RÉUSSITE" : "SCOLARITÉ"}`, 105, 50, { align: "center" });
        
        // Add main content
        doc.setFontSize(12);
        doc.setFont("helvetica", "normal");
        
        const contentText = attestationType === "success" 
          ? `Le Directeur de la Direction Générale de l'Enseignement Supérieur atteste que :\n\n
             M./Mme ${previewAttestationData.name}, a validé avec succès l'année académique,\n
             Filière: ${previewAttestationData.filiere}\n
             Niveau: ${previewAttestationData.niveau}\n
             Année académique: 2023-2024.\n\n
             Cette attestation lui est délivrée pour servir et valoir ce que de droit.`
          : `Le Directeur de la Direction Générale de l'Enseignement Supérieur atteste que :\n\n
             M./Mme ${previewAttestationData.name}, est régulièrement inscrit(e) et suit les cours\n
             Filière: ${previewAttestationData.filiere}\n
             Niveau: ${previewAttestationData.niveau}\n
             Année académique: 2023-2024.\n\n
             Cette attestation lui est délivrée pour servir et valoir ce que de droit.`;
        
        doc.text(contentText, 25, 70);
        
        // Add date
        const currentDate = new Date().toLocaleDateString('fr-FR', {
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
        doc.save(`attestation_${previewAttestationData.name.replace(' ', '_')}.pdf`);
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

  // Generate and save attestation
  const handleGenerateAttestation = () => {
    if (!selectedStudent) {
      toast({
        title: "Erreur",
        description: "Veuillez sélectionner un étudiant.",
        variant: "destructive",
      });
      return;
    }

    setIsGenerating(true);
    
    setTimeout(() => {
      toast({
        title: "Attestation créée",
        description: "L'attestation a été générée avec succès.",
      });
      
      onClose();
      setIsGenerating(false);
      setSelectedStudent("");
      setAttestationType("success");
      onGenerate();
    }, 1500);
  };

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
          <div className="space-y-4">
            <div className="grid grid-cols-1 gap-4">
              <div>
                <label className="text-sm font-medium mb-1 block">Sélectionner un étudiant</label>
                <Select value={selectedStudent} onValueChange={setSelectedStudent}>
                  <SelectTrigger>
                    <SelectValue placeholder="Sélectionner un étudiant" />
                  </SelectTrigger>
                  <SelectContent>
                    {students.map((student) => (
                      <SelectItem key={student.id} value={student.matricule}>
                        {student.name} - {student.matricule}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="text-sm font-medium mb-1 block">Type d'attestation</label>
                <Select value={attestationType} onValueChange={setAttestationType}>
                  <SelectTrigger>
                    <SelectValue placeholder="Type d'attestation" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="success">Attestation de réussite</SelectItem>
                    <SelectItem value="enrollment">Attestation de scolarité</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>

          {previewAttestationData && (
            <Card className="mt-6">
              <CardHeader className="text-center border-b">
                <h2 className="text-lg font-bold">RÉPUBLIQUE DU CONGO</h2>
                <p className="text-sm text-gray-500">Ministère de l'Enseignement Supérieur</p>
              </CardHeader>
              <CardContent className="pt-6">
                <div className="text-center mb-4">
                  <h2 className="font-bold text-xl">
                    ATTESTATION DE {attestationType === "success" ? "RÉUSSITE" : "SCOLARITÉ"}
                  </h2>
                  <p className="text-sm text-gray-500">N° ATT-2023-{1000 + Math.floor(Math.random() * 9000)}</p>
                </div>

                <div className="flex justify-between gap-4">
                  <div className="flex-grow space-y-4">
                    <p className="text-sm">
                      Le Directeur de la Direction Générale de l'Enseignement Supérieur atteste que :
                    </p>
                    <p className="text-sm font-semibold">
                      M./Mme {previewAttestationData.name}
                    </p>
                    {attestationType === "success" ? (
                      <p className="text-sm">
                        a validé avec succès l'année académique
                        <br /><br />
                        <strong>Filière :</strong> {previewAttestationData.filiere}
                        <br />
                        <strong>Niveau :</strong> {previewAttestationData.niveau}
                        <br />
                        <strong>Année académique :</strong> 2023-2024
                      </p>
                    ) : (
                      <p className="text-sm">
                        est régulièrement inscrit(e) et suit les cours
                        <br /><br />
                        <strong>Filière :</strong> {previewAttestationData.filiere}
                        <br />
                        <strong>Niveau :</strong> {previewAttestationData.niveau}
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
                      value={previewAttestationData.verificationUrl || "https://example.com"} 
                      size={120} 
                    />
                  </div>
                </div>

                <div className="flex justify-between items-end mt-8">
                  <div>
                    <p className="text-sm">
                      Fait à Brazzaville, le {new Date().toLocaleDateString('fr-FR', {
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
