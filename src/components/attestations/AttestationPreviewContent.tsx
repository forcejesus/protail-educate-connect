
import { QRCodeSVG } from "qrcode.react";
import { Printer } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import AttestationPreviewHeader from "./AttestationPreviewHeader";
import AttestationPreviewFooter from "./AttestationPreviewFooter";
import { usePDFGeneration } from "./hooks/usePDFGeneration";

interface AttestationPreviewContentProps {
  attestation: any;
}

const AttestationPreviewContent = ({ attestation }: AttestationPreviewContentProps) => {
  const { generatePDF, isGenerating } = usePDFGeneration();

  return (
    <Card className="mt-6">
      <CardHeader>
        <AttestationPreviewHeader 
          attestationType={attestation.attestationType}
          attestationId={attestation.id}
        />
      </CardHeader>
      
      <CardContent className="pt-6">
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

        <AttestationPreviewFooter date={attestation.date} />
      </CardContent>
      
      <CardFooter className="flex justify-end gap-2">
        <Button 
          variant="outline" 
          onClick={() => generatePDF(attestation)}
          disabled={isGenerating}
        >
          <Printer className="mr-2 h-4 w-4" />
          {isGenerating ? "Génération en cours..." : "Exporter en PDF"}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default AttestationPreviewContent;
