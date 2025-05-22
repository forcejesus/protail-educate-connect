
import { Button } from "@/components/ui/button";
import { previousAttestations } from "./attestationConstants";

const AttestationHistory = () => {
  return (
    <div className="overflow-x-auto">
      <table className="w-full border-collapse">
        <thead>
          <tr className="text-left border-b">
            <th className="p-2">ID</th>
            <th className="p-2">Étudiant</th>
            <th className="p-2">Type</th>
            <th className="p-2">Filière/Niveau</th>
            <th className="p-2">Date</th>
            <th className="p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {previousAttestations.map((attestation) => (
            <tr key={attestation.id} className="border-b hover:bg-muted/50">
              <td className="p-2">{attestation.id}</td>
              <td className="p-2">{attestation.studentName}</td>
              <td className="p-2">{attestation.type}</td>
              <td className="p-2">{attestation.department} - {attestation.level}</td>
              <td className="p-2">{attestation.date}</td>
              <td className="p-2">
                <div className="flex space-x-2">
                  <Button variant="outline" size="sm">
                    Télécharger
                  </Button>
                  <Button variant="ghost" size="sm">
                    Voir
                  </Button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AttestationHistory;
