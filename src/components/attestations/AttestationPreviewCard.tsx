
import { QRCodeSVG } from "qrcode.react";
import { Printer } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { usePDFGeneration } from "./hooks/usePDFGeneration";

interface AttestationPreviewCardProps {
  attestationData: any;
  attestationType: string;
}

const AttestationPreviewCard = ({ attestationData, attestationType }: AttestationPreviewCardProps) => {
  const { generatePDF, isGenerating } = usePDFGeneration();

  if (!attestationData) return null;

  const currentDate = new Date().toLocaleDateString('fr-FR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  const attestationNumber = `N° ATT-${new Date().getFullYear()}-${String(Math.floor(Math.random() * 10000)).padStart(4, '0')}`;

  return (
    <Card className="mt-6 print:shadow-none max-w-[210mm] mx-auto" style={{ aspectRatio: '210/297' }}>
      <CardHeader className="text-center border-b print:border-black pb-4">
        {/* Logo du ministère centré en haut */}
        <div className="flex justify-center mb-4">
          <img 
            src="/lovable-uploads/ea49272b-cb75-4074-b109-fad823e259cf.png" 
            alt="République du Congo" 
            className="w-16 h-16 object-contain"
          />
        </div>
        
        {/* En-tête officiel */}
        <div className="text-center space-y-1">
          <h2 className="text-base font-bold">RÉPUBLIQUE DU CONGO</h2>
          <p className="text-sm">MINISTÈRE DE L'ENSEIGNEMENT SUPÉRIEUR</p>
          <p className="text-sm">ET DE LA RECHERCHE SCIENTIFIQUE</p>
          <p className="text-xs font-semibold mt-2">DIRECTION GÉNÉRALE DE L'ENSEIGNEMENT SUPÉRIEUR</p>
        </div>
        
        {/* Ligne de séparation */}
        <div className="border-t border-gray-400 my-4"></div>
        
        {/* Titre de l'attestation */}
        <div className="text-center">
          <h1 className="font-bold text-lg mb-2">
            {attestationType === "success" ? "ATTESTATION DE VALIDATION DE PARCOURS" : "ATTESTATION DE SCOLARITÉ"}
          </h1>
          <p className="text-sm text-gray-600">{attestationNumber}</p>
        </div>
      </CardHeader>
      
      <CardContent className="pt-4 pb-4 print:text-black text-sm space-y-3">
        <p>Le Directeur Général de l'Enseignement Supérieur,</p>
        
        <div className="space-y-1 text-xs">
          <p>Vu la loi n° 008-2016 du 17 juin 2016 portant orientation de l'enseignement supérieur</p>
          <p>en République du Congo ;</p>
          <p>Vu le décret n° 2017-203 du 5 juin 2017 portant organisation et fonctionnement</p>
          <p>de la DGESUP ;</p>
          <p>Vu les résultats des examens et évaluations de l'année académique en cours ;</p>
        </div>

        <div className="text-center font-bold my-3">
          <p>ATTESTE QUE :</p>
        </div>

        <div className="space-y-2">
          <p className="font-semibold">M./Mme {attestationData.name}</p>
          
          {attestationType === "success" ? (
            <div className="space-y-1">
              <p>a validé avec succès son parcours académique et satisfait à toutes les exigences</p>
              <p>du programme d'études pour l'obtention du diplôme de :</p>
              <p className="font-semibold text-center my-2">
                {attestationData.niveau} en {attestationData.filiere}
              </p>
              <p>pour l'année académique 2023-2024.</p>
            </div>
          ) : (
            <div className="space-y-1">
              <p>est régulièrement inscrit(e) et suit assidûment les cours dans le programme de :</p>
              <p className="font-semibold text-center my-2">
                {attestationData.niveau} en {attestationData.filiere}
              </p>
              <p>pour l'année académique 2023-2024.</p>
            </div>
          )}

          <p className="mt-3">En foi de quoi, la présente attestation lui est délivrée pour servir et valoir</p>
          <p>ce que de droit.</p>
        </div>

        {/* Bas de page avec signature et QR code */}
        <div className="mt-8 space-y-4">
          <div className="flex justify-between items-start">
            <div className="space-y-1">
              <p className="text-sm">Fait à Brazzaville, le {currentDate}</p>
              <div className="mt-4">
                <p className="text-sm">Le Directeur Général</p>
                <div className="h-12 w-32 mt-4 mb-2">
                  <div className="border-b border-gray-300 h-10"></div>
                </div>
                <p className="text-sm font-semibold">Prof. Jean KOSSA</p>
              </div>
            </div>

            <div className="flex flex-col items-center">
              <div className="mb-1">
                <QRCodeSVG 
                  value={attestationData.verificationUrl || `https://dgesup.cg/verify/${attestationNumber}`} 
                  size={80}
                  className="print:block"
                />
              </div>
              <p className="text-xs text-gray-500 text-center">Scanner pour vérifier<br/>l'authenticité</p>
            </div>
          </div>

          {/* Logo école en bas à droite */}
          <div className="flex justify-end">
            <div className="flex flex-col items-center">
              <div className="w-12 h-12 border-2 border-gray-400 rounded-full flex items-center justify-center text-xs text-gray-600">
                LOGO<br/>ÉCOLE
              </div>
            </div>
          </div>
        </div>

        {/* Pied de page */}
        <div className="mt-6 pt-3 border-t text-center text-xs text-gray-500">
          <p>Direction Générale de l'Enseignement Supérieur - Avenue Patrice Lumumba, Brazzaville - Congo</p>
          <p>Tél: +242 06 000 0000 | Email: contact@dgesup.cg | www.dgesup.cg</p>
        </div>
      </CardContent>
      
      <CardFooter className="flex justify-end gap-2 print:hidden">
        <Button 
          variant="outline" 
          onClick={() => generatePDF(attestationData)}
          disabled={isGenerating}
        >
          <Printer className="mr-2 h-4 w-4" />
          {isGenerating ? "Génération en cours..." : "Exporter en PDF"}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default AttestationPreviewCard;
