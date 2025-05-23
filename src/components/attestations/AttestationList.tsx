
import { Eye, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

export interface Attestation {
  id: number;
  student: string;
  matricule: string;
  date: string;
  type: string;
  niveau: string;
  filiere: string;
  status: string;
}

interface AttestationListProps {
  attestations: Attestation[];
  onViewAttestation: (attestation: Attestation) => void;
  onPrintAttestation?: (attestation: Attestation) => void;
}

const AttestationList = ({ attestations, onViewAttestation, onPrintAttestation }: AttestationListProps) => {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Matricule</TableHead>
          <TableHead>Étudiant</TableHead>
          <TableHead>Date</TableHead>
          <TableHead>Niveau</TableHead>
          <TableHead>Filière</TableHead>
          <TableHead>Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {attestations.map((attestation) => (
          <TableRow key={attestation.id}>
            <TableCell className="font-medium">{attestation.matricule}</TableCell>
            <TableCell>{attestation.student}</TableCell>
            <TableCell>{new Date(attestation.date).toLocaleDateString()}</TableCell>
            <TableCell>{attestation.niveau}</TableCell>
            <TableCell>{attestation.filiere}</TableCell>
            <TableCell>
              <div className="flex gap-2">
                <Button variant="outline" size="icon" onClick={() => onViewAttestation(attestation)}>
                  <Eye className="h-4 w-4" />
                </Button>
                <Button 
                  variant="outline" 
                  size="icon"
                  onClick={() => onPrintAttestation ? onPrintAttestation(attestation) : null}
                >
                  <Download className="h-4 w-4" />
                </Button>
              </div>
            </TableCell>
          </TableRow>
        ))}
        {attestations.length === 0 && (
          <TableRow>
            <TableCell colSpan={6} className="text-center py-4">
              Aucune attestation trouvée
            </TableCell>
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
};

export default AttestationList;
