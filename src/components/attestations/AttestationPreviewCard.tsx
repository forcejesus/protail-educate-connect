
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

  return (
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
              M./Mme {attestationData.name}
            </p>
            {attestationType === "success" ? (
              <p className="text-sm">
                a validé avec succès l'année académique
                <br /><br />
                <strong>Filière :</strong> {attestationData.filiere}
                <br />
                <strong>Niveau :</strong> {attestationData.niveau}
                <br />
                <strong>Année académique :</strong> 2023-2024
              </p>
            ) : (
              <p className="text-sm">
                est régulièrement inscrit(e) et suit les cours
                <br /><br />
                <strong>Filière :</strong> {attestationData.filiere}
                <br />
                <strong>Niveau :</strong> {attestationData.niveau}
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
              value={attestationData.verificationUrl || "https://example.com"} 
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
