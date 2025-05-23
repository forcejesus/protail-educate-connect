
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
    <Card className="mt-6 print:shadow-none">
      <CardHeader className="text-center border-b print:border-black">
        <div className="flex justify-center items-center mb-6">
          {/* Logo Ministère centré */}
          <div className="flex flex-col items-center">
            <img 
              src="/lovable-uploads/8be3e1ab-1767-4b8b-be3d-2a0f786fee5c.png" 
              alt="Logo République du Congo" 
              className="w-20 h-20 object-contain"
            />
          </div>
        </div>
        
        {/* En-tête central */}
        <div className="text-center mb-4">
          <h2 className="text-lg font-bold">RÉPUBLIQUE DU CONGO</h2>
          <p className="text-sm">MINISTÈRE DE L'ENSEIGNEMENT SUPÉRIEUR</p>
          <p className="text-sm">ET DE LA RECHERCHE SCIENTIFIQUE</p>
          <p className="text-xs font-semibold mt-1">DIRECTION GÉNÉRALE DE L'ENSEIGNEMENT SUPÉRIEUR</p>
        </div>
      </CardHeader>
      
      <CardContent className="pt-6 print:text-black">
        <div className="text-center mb-6">
          <h2 className="font-bold text-xl mb-2">
            {attestationType === "success" ? "ATTESTATION DE VALIDATION DE PARCOURS" : "ATTESTATION DE SCOLARITÉ"}
          </h2>
          <p className="text-sm text-gray-600">{attestationNumber}</p>
        </div>

        <div className="space-y-4 text-sm">
          <p>Le Directeur Général de l'Enseignement Supérieur,</p>
          
          <div className="space-y-2 text-xs">
            <p>Vu la loi n° 008-2016 du 17 juin 2016 portant orientation de l'enseignement supérieur en République du Congo ;</p>
            <p>Vu le décret n° 2017-203 du 5 juin 2017 portant organisation et fonctionnement de la DGESUP ;</p>
            <p>Vu les résultats des examens et évaluations de l'année académique en cours ;</p>
          </div>

          <div className="text-center font-bold my-4">
            <p>ATTESTE QUE :</p>
          </div>

          <div className="space-y-3">
            <p className="font-semibold">M./Mme {attestationData.name}</p>
            
            {attestationType === "success" ? (
              <div className="space-y-2">
                <p>a validé avec succès son parcours académique et satisfait à toutes les exigences du programme d'études pour l'obtention du diplôme de :</p>
                <p className="font-semibold text-center">
                  {attestationData.niveau} en {attestationData.filiere}
                </p>
                <p>pour l'année académique 2023-2024.</p>
              </div>
            ) : (
              <div className="space-y-2">
                <p>est régulièrement inscrit(e) et suit assidûment les cours dans le programme de :</p>
                <p className="font-semibold text-center">
                  {attestationData.niveau} en {attestationData.filiere}
                </p>
                <p>pour l'année académique 2023-2024.</p>
              </div>
            )}

            <p className="mt-4">En foi de quoi, la présente attestation lui est délivrée pour servir et valoir ce que de droit.</p>
          </div>
        </div>

        <div className="flex justify-between items-end mt-8">
          <div className="space-y-2">
            <p className="text-sm">Fait à Brazzaville, le {currentDate}</p>
            <div className="mt-4">
              <p className="text-sm">Le Directeur Général</p>
              <div className="h-16 w-32 mt-4 mb-2">
                <div className="border-b border-gray-300 h-12"></div>
              </div>
              <p className="text-sm font-semibold">Prof. Jean KOSSA</p>
            </div>
          </div>

          <div className="flex flex-col items-center">
            <div className="mb-2">
              <QRCodeSVG 
                value={attestationData.verificationUrl || `https://dgesup.cg/verify/${attestationNumber}`} 
                size={100}
                className="print:block"
              />
            </div>
            <p className="text-xs text-gray-500 text-center">Scanner pour vérifier<br/>l'authenticité</p>
          </div>
        </div>

        {/* Logo école en bas à droite */}
        <div className="flex justify-end mt-6">
          <div className="flex flex-col items-center">
            <div className="w-16 h-16 border-2 border-gray-400 rounded-full flex items-center justify-center text-xs text-gray-600">
              LOGO<br/>ÉCOLE
            </div>
          </div>
        </div>

        <div className="mt-8 pt-4 border-t text-center text-xs text-gray-500">
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
