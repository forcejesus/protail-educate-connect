
import { useState } from "react";
import { jsPDF } from "jspdf";
import { useToast } from "@/hooks/use-toast";

export const usePDFGeneration = () => {
  const { toast } = useToast();
  const [isGenerating, setIsGenerating] = useState(false);

  const generatePDF = (attestation: any) => {
    if (!attestation) return;
    
    setIsGenerating(true);
    
    setTimeout(() => {
      try {
        const doc = new jsPDF({
          orientation: "portrait",
          unit: "mm",
          format: "a4",
        });
        
        doc.setProperties({
          title: `Attestation de ${attestation.attestationType === "success" ? "Réussite" : "Scolarité"} - ${attestation.name}`,
          subject: `Attestation pour ${attestation.name}`,
          author: "École Supérieure",
          creator: "Système de Gestion Académique",
        });
        
        doc.setFontSize(22);
        doc.setFont("helvetica", "bold");
        doc.text("RÉPUBLIQUE DU CONGO", 105, 20, { align: "center" });
        doc.setFontSize(16);
        doc.setFont("helvetica", "normal");
        doc.text("Ministère de l'Enseignement Supérieur", 105, 30, { align: "center" });
        
        doc.setLineWidth(0.5);
        doc.line(20, 35, 190, 35);
        
        doc.setFontSize(20);
        doc.setFont("helvetica", "bold");
        doc.text(`ATTESTATION DE ${attestation.attestationType === "success" ? "RÉUSSITE" : "SCOLARITÉ"}`, 105, 50, { align: "center" });
        
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
        
        const currentDate = new Date(attestation.date || new Date()).toLocaleDateString('fr-FR', {
          year: 'numeric',
          month: 'long',
          day: 'numeric'
        });
        doc.text(`Fait à Brazzaville, le ${currentDate}`, 130, 160, { align: "left" });
        
        doc.setFontSize(11);
        doc.text("Le Directeur Général", 150, 175, { align: "center" });
        doc.setFontSize(10);
        doc.text("Prof. Jean KOSSA", 150, 205, { align: "center" });
        
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

  return { generatePDF, isGenerating };
};
