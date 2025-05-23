
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
        // Créer le PDF en orientation paysage
        const doc = new jsPDF({
          orientation: "landscape",
          unit: "mm",
          format: "a4",
        });
        
        doc.setProperties({
          title: `Attestation de ${attestation.attestationType === "success" ? "Réussite" : "Scolarité"} - ${attestation.name}`,
          subject: `Attestation pour ${attestation.name}`,
          author: "Direction Générale de l'Enseignement Supérieur",
          creator: "Système de Gestion Académique DGESUP",
        });

        // En-tête avec logos
        doc.setFontSize(16);
        doc.setFont("helvetica", "bold");
        doc.text("RÉPUBLIQUE DU CONGO", 148, 20, { align: "center" });
        
        doc.setFontSize(14);
        doc.setFont("helvetica", "normal");
        doc.text("MINISTÈRE DE L'ENSEIGNEMENT SUPÉRIEUR", 148, 28, { align: "center" });
        doc.text("ET DE LA RECHERCHE SCIENTIFIQUE", 148, 35, { align: "center" });
        
        doc.setFontSize(12);
        doc.setFont("helvetica", "bold");
        doc.text("DIRECTION GÉNÉRALE DE L'ENSEIGNEMENT SUPÉRIEUR", 148, 45, { align: "center" });

        // Logo ministère (côté gauche)
        doc.setFontSize(10);
        doc.text("LOGO", 20, 30, { align: "center" });
        doc.text("MINISTÈRE", 20, 35, { align: "center" });
        doc.rect(10, 15, 20, 20); // Placeholder pour le logo

        // Logo école (côté droit)
        doc.circle(265, 25, 10); // Logo rond de l'école
        doc.setFontSize(8);
        doc.text("LOGO", 265, 22, { align: "center" });
        doc.text("ÉCOLE", 265, 28, { align: "center" });

        // Ligne de séparation
        doc.setLineWidth(0.5);
        doc.line(20, 55, 276, 55);

        // Titre de l'attestation
        doc.setFontSize(18);
        doc.setFont("helvetica", "bold");
        const titleText = attestation.attestationType === "success" 
          ? "ATTESTATION DE VALIDATION DE PARCOURS" 
          : "ATTESTATION DE SCOLARITÉ";
        doc.text(titleText, 148, 70, { align: "center" });
        
        // Numéro d'attestation
        doc.setFontSize(10);
        doc.setFont("helvetica", "normal");
        const attestationNumber = `N° ATT-${new Date().getFullYear()}-${String(Math.floor(Math.random() * 10000)).padStart(4, '0')}`;
        doc.text(attestationNumber, 148, 78, { align: "center" });

        // Corps de l'attestation avec plus de formalités
        doc.setFontSize(11);
        doc.setFont("helvetica", "normal");
        
        const currentDate = new Date().toLocaleDateString('fr-FR', {
          year: 'numeric',
          month: 'long',
          day: 'numeric'
        });

        let yPosition = 95;
        
        // Texte de formalité
        doc.text("Le Directeur Général de l'Enseignement Supérieur,", 20, yPosition);
        yPosition += 8;
        doc.text("Vu la loi n° 008-2016 du 17 juin 2016 portant orientation de l'enseignement supérieur en République du Congo ;", 20, yPosition);
        yPosition += 6;
        doc.text("Vu le décret n° 2017-203 du 5 juin 2017 portant organisation et fonctionnement de la DGESUP ;", 20, yPosition);
        yPosition += 6;
        doc.text("Vu les résultats des examens et évaluations de l'année académique en cours ;", 20, yPosition);
        yPosition += 10;

        doc.setFont("helvetica", "bold");
        doc.text("ATTESTE QUE :", 148, yPosition, { align: "center" });
        yPosition += 10;

        doc.setFont("helvetica", "normal");
        doc.text(`M./Mme ${attestation.name}`, 20, yPosition);
        yPosition += 8;

        if (attestation.attestationType === "success") {
          doc.text(`a validé avec succès son parcours académique et satisfait à toutes les exigences`, 20, yPosition);
          yPosition += 6;
          doc.text(`du programme d'études pour l'obtention du diplôme de :`, 20, yPosition);
          yPosition += 8;
          doc.setFont("helvetica", "bold");
          doc.text(`${attestation.niveau} en ${attestation.filiere}`, 20, yPosition);
          yPosition += 8;
          doc.setFont("helvetica", "normal");
          doc.text(`pour l'année académique 2023-2024.`, 20, yPosition);
        } else {
          doc.text(`est régulièrement inscrit(e) et suit assidûment les cours dans le programme de :`, 20, yPosition);
          yPosition += 8;
          doc.setFont("helvetica", "bold");
          doc.text(`${attestation.niveau} en ${attestation.filiere}`, 20, yPosition);
          yPosition += 8;
          doc.setFont("helvetica", "normal");
          doc.text(`pour l'année académique 2023-2024.`, 20, yPosition);
        }

        yPosition += 10;
        doc.text("En foi de quoi, la présente attestation lui est délivrée pour servir et valoir ce que de droit.", 20, yPosition);

        // Signature et QR Code
        yPosition = 160;
        doc.text(`Fait à Brazzaville, le ${currentDate}`, 20, yPosition);
        yPosition += 15;
        doc.text("Le Directeur Général", 20, yPosition);
        yPosition += 20;
        doc.setFont("helvetica", "bold");
        doc.text("Prof. Jean KOSSA", 20, yPosition);

        // QR Code (côté droit)
        doc.setFontSize(8);
        doc.text("Scanner pour vérifier", 230, 160, { align: "center" });
        doc.text("l'authenticité du document", 230, 165, { align: "center" });
        doc.rect(215, 170, 30, 30); // Placeholder pour QR code
        doc.text("QR CODE", 230, 187, { align: "center" });

        // Pied de page
        doc.setFontSize(8);
        doc.setFont("helvetica", "normal");
        doc.text("Direction Générale de l'Enseignement Supérieur - Avenue Patrice Lumumba, Brazzaville - Congo", 148, 205, { align: "center" });
        doc.text("Tél: +242 06 000 0000 | Email: contact@dgesup.cg | www.dgesup.cg", 148, 210, { align: "center" });

        // Sauvegarder le PDF
        const fileName = `attestation_${attestation.name.replace(/\s+/g, '_')}_${new Date().getTime()}.pdf`;
        doc.save(fileName);
        
        setIsGenerating(false);
        
        toast({
          title: "Exportation réussie",
          description: "L'attestation a été générée et téléchargée avec succès en format paysage.",
        });
      } catch (error) {
        console.error("Erreur lors de la génération du PDF:", error);
        toast({
          title: "Erreur",
          description: "Une erreur est survenue lors de la génération du PDF. Veuillez réessayer.",
          variant: "destructive",
        });
        setIsGenerating(false);
      }
    }, 1000);
  };

  return { generatePDF, isGenerating };
};
