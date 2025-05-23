
interface AttestationPreviewHeaderProps {
  attestationType: string;
  attestationId: number;
}

const AttestationPreviewHeader = ({ attestationType, attestationId }: AttestationPreviewHeaderProps) => {
  return (
    <div className="text-center border-b">
      <h2 className="text-lg font-bold">RÉPUBLIQUE DU CONGO</h2>
      <p className="text-sm text-gray-500">Ministère de l'Enseignement Supérieur</p>
      <div className="mt-4 mb-4">
        <h2 className="font-bold text-xl">
          ATTESTATION DE {attestationType === "success" ? "RÉUSSITE" : "SCOLARITÉ"}
        </h2>
        <p className="text-sm text-gray-500">N° ATT-2023-{attestationId * 1000}</p>
      </div>
    </div>
  );
};

export default AttestationPreviewHeader;
