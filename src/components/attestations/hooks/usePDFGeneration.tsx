
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
        // Créer le PDF en format A4 portrait
        const doc = new jsPDF({
          orientation: "portrait",
          unit: "mm",
          format: "a4",
        });
        
        doc.setProperties({
          title: `Attestation de ${attestation.attestationType === "success" ? "Réussite" : "Scolarité"} - ${attestation.name}`,
          subject: `Attestation pour ${attestation.name}`,
          author: "Direction Générale de l'Enseignement Supérieur",
          creator: "Système de Gestion Académique DGESUP",
        });

        // Logo du ministère en haut au centre - position ajustée
        const logoWidth = 25;
        const logoHeight = 25;
        const pageWidth = 210; // A4 width in mm
        const logoX = (pageWidth - logoWidth) / 2;
        
        // Créer un rectangle pour représenter le logo du ministère
        doc.setFillColor(200, 200, 200);
        doc.rect(logoX, 20, logoWidth, logoHeight, 'F');
        doc.setFontSize(8);
        doc.text("LOGO MINISTÈRE", logoX + logoWidth/2, 32.5, { align: "center" });

        // En-tête avec informations officielles - position ajustée
        doc.setFontSize(16);
        doc.setFont("helvetica", "bold");
        doc.text("RÉPUBLIQUE DU CONGO", 105, 55, { align: "center" });
        
        doc.setFontSize(12);
        doc.setFont("helvetica", "normal");
        doc.text("MINISTÈRE DE L'ENSEIGNEMENT SUPÉRIEUR", 105, 63, { align: "center" });
        doc.text("ET DE LA RECHERCHE SCIENTIFIQUE", 105, 70, { align: "center" });
        
        doc.setFontSize(10);
        doc.setFont("helvetica", "bold");
        doc.text("DIRECTION GÉNÉRALE DE L'ENSEIGNEMENT SUPÉRIEUR", 105, 80, { align: "center" });

        // Ligne de séparation
        doc.setLineWidth(0.5);
        doc.line(20, 90, 190, 90);

        // Titre de l'attestation
        doc.setFontSize(16);
        doc.setFont("helvetica", "bold");
        const titleText = attestation.attestationType === "success" 
          ? "ATTESTATION DE VALIDATION DE PARCOURS" 
          : "ATTESTATION DE SCOLARITÉ";
        doc.text(titleText, 105, 105, { align: "center" });
        
        // Numéro d'attestation
        doc.setFontSize(10);
        doc.setFont("helvetica", "normal");
        const attestationNumber = `N° ATT-${new Date().getFullYear()}-${String(Math.floor(Math.random() * 10000)).padStart(4, '0')}`;
        doc.text(attestationNumber, 105, 115, { align: "center" });

        // Corps de l'attestation
        doc.setFontSize(11);
        doc.setFont("helvetica", "normal");
        
        const currentDate = new Date().toLocaleDateString('fr-FR', {
          year: 'numeric',
          month: 'long',
          day: 'numeric'
        });

        let yPosition = 130;
        
        // Texte de formalité
        doc.text("Le Directeur Général de l'Enseignement Supérieur,", 20, yPosition);
        yPosition += 8;
        
        doc.setFontSize(9);
        doc.text("Vu la loi n° 008-2016 du 17 juin 2016 portant orientation de l'enseignement supérieur", 20, yPosition);
        yPosition += 5;
        doc.text("en République du Congo ;", 20, yPosition);
        yPosition += 6;
        doc.text("Vu le décret n° 2017-203 du 5 juin 2017 portant organisation et fonctionnement", 20, yPosition);
        yPosition += 5;
        doc.text("de la DGESUP ;", 20, yPosition);
        yPosition += 6;
        doc.text("Vu les résultats des examens et évaluations de l'année académique en cours ;", 20, yPosition);
        yPosition += 12;

        doc.setFontSize(11);
        doc.setFont("helvetica", "bold");
        doc.text("ATTESTE QUE :", 105, yPosition, { align: "center" });
        yPosition += 12;

        doc.setFont("helvetica", "normal");
        doc.text(`M./Mme ${attestation.name}`, 20, yPosition);
        yPosition += 10;

        if (attestation.attestationType === "success") {
          doc.text("a validé avec succès son parcours académique et satisfait à toutes les exigences", 20, yPosition);
          yPosition += 6;
          doc.text("du programme d'études pour l'obtention du diplôme de :", 20, yPosition);
          yPosition += 10;
          doc.setFont("helvetica", "bold");
          doc.text(`${attestation.niveau} en ${attestation.filiere}`, 20, yPosition);
          yPosition += 8;
          doc.setFont("helvetica", "normal");
          doc.text("pour l'année académique 2023-2024.", 20, yPosition);
        } else {
          doc.text("est régulièrement inscrit(e) et suit assidûment les cours dans le programme de :", 20, yPosition);
          yPosition += 10;
          doc.setFont("helvetica", "bold");
          doc.text(`${attestation.niveau} en ${attestation.filiere}`, 20, yPosition);
          yPosition += 8;
          doc.setFont("helvetica", "normal");
          doc.text("pour l'année académique 2023-2024.", 20, yPosition);
        }

        yPosition += 12;
        doc.text("En foi de quoi, la présente attestation lui est délivrée pour servir et valoir", 20, yPosition);
        yPosition += 6;
        doc.text("ce que de droit.", 20, yPosition);

        // Signature et QR Code
        yPosition = 220;
        doc.text(`Fait à Brazzaville, le ${currentDate}`, 20, yPosition);
        yPosition += 15;
        doc.text("Le Directeur Général", 20, yPosition);
        yPosition += 20;
        doc.setFont("helvetica", "bold");
        doc.text("Prof. Jean KOSSA", 20, yPosition);

        // QR Code (centré à droite)
        doc.setFontSize(8);
        doc.text("Scanner pour vérifier", 150, 220, { align: "center" });
        doc.text("l'authenticité du document", 150, 225, { align: "center" });
        doc.rect(135, 230, 30, 30); // Placeholder pour QR code
        doc.text("QR CODE", 150, 247, { align: "center" });

        // Logo école en bas à droite
        doc.setFontSize(8);
        doc.circle(175, 275, 10); // Logo rond de l'école
        doc.text("LOGO", 175, 272, { align: "center" });
        doc.text("ÉCOLE", 175, 278, { align: "center" });

        // Pied de page
        doc.setFontSize(8);
        doc.setFont("helvetica", "normal");
        yPosition = 285;
        doc.text("Direction Générale de l'Enseignement Supérieur - Avenue Patrice Lumumba, Brazzaville - Congo", 105, yPosition, { align: "center" });
        doc.text("Tél: +242 06 000 0000 | Email: contact@dgesup.cg | www.dgesup.cg", 105, yPosition + 5, { align: "center" });

        // Sauvegarder le PDF
        const fileName = `attestation_${attestation.name.replace(/\s+/g, '_')}_${new Date().getTime()}.pdf`;
        doc.save(fileName);
        
        setIsGenerating(false);
        
        toast({
          title: "Exportation réussie",
          description: "L'attestation a été générée et téléchargée avec succès en format A4.",
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
