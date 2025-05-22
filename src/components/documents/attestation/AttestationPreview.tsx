
import { AttestationFormValues } from "./attestationSchema";
import { departments, levels, academicYears, mentions, generateAttestationId, getQrCodeUrl } from "./attestationConstants";

interface AttestationPreviewProps {
  attestationData: AttestationFormValues;
  onPrint: () => void;
  onClose: () => void;
}

export const AttestationPreview = ({ attestationData, onPrint, onClose }: AttestationPreviewProps) => {
  return (
    <div className="p-8 bg-white border rounded-md">
      <div className="text-center mb-6">
        <h2 className="text-lg font-bold uppercase">République du Congo</h2>
        <h3 className="text-md">Ministère de l'Enseignement Supérieur</h3>
        <div className="my-4 flex justify-center">
          <img src="/placeholder.svg" alt="Logo DGESUP" className="w-20 h-20" />
        </div>
        <h1 className="text-2xl font-bold mt-4 text-dgesup-primary">
          {attestationData.attestationType === "success" 
            ? "ATTESTATION DE RÉUSSITE" 
            : "ATTESTATION DE FIN D'ÉTUDES"}
        </h1>
        <p className="text-sm">N° {generateAttestationId()}</p>
      </div>
      
      <div className="mb-8 text-center">
        <p className="mb-1">Le Directeur de la Direction Générale de l'Enseignement Supérieur atteste que :</p>
        <p className="font-bold text-lg">{attestationData.firstName} {attestationData.lastName}</p>
        <p>
          A {attestationData.attestationType === "success" 
            ? "validé avec succès l'année académique" 
            : "complété avec succès le cycle d'études"}
        </p>
        
        <div className="my-4">
          <p>
            <strong>Filière :</strong> {departments.find(d => d.id === attestationData.department)?.name}
          </p>
          <p>
            <strong>Niveau :</strong> {levels.find(l => l.id === attestationData.level)?.name}
          </p>
          <p>
            <strong>Année académique :</strong> {academicYears.find(y => y.id === attestationData.academicYear)?.name}
          </p>
          
          {attestationData.attestationType === "completion" && attestationData.mention && (
            <p>
              <strong>Mention :</strong> {mentions.find(m => m.id === attestationData.mention)?.name}
            </p>
          )}
        </div>
      </div>
      
      <div className="flex justify-between items-end mt-16">
        <div>
          <p>Fait à Brazzaville, le {new Date().toLocaleDateString("fr-FR")}</p>
          <div className="mt-6">
            <p className="font-semibold">Le Directeur Général</p>
            <div className="mt-8">
              <hr className="w-40 border-t-2" />
              <p>Signature et tampon</p>
            </div>
          </div>
        </div>
        
        <div className="text-center">
          <img 
            src={getQrCodeUrl(generateAttestationId())} 
            alt="QR Code de vérification" 
            className="w-32 h-32 mx-auto mb-2"
          />
          <p className="text-xs text-gray-500">Scanner pour vérifier l'authenticité</p>
        </div>
      </div>
      
      <div className="text-center text-xs text-gray-500 mt-16 pt-4 border-t">
        <p>Cette attestation est délivrée par la Direction Générale de l'Enseignement Supérieur du Congo</p>
        <p>Avenue Patrice Lumumba, Brazzaville - Congo</p>
        <p>contact@dgesup.cg | www.dgesup.cg</p>
      </div>
    </div>
  );
};
