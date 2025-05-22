
import { Eye, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
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
}

const AttestationList = ({ attestations, onViewAttestation }: AttestationListProps) => {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Matricule</TableHead>
          <TableHead>Étudiant</TableHead>
          <TableHead>Date</TableHead>
          <TableHead>Type</TableHead>
          <TableHead>Niveau</TableHead>
          <TableHead>Filière</TableHead>
          <TableHead>Statut</TableHead>
          <TableHead>Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {attestations.map((attestation) => (
          <TableRow key={attestation.id}>
            <TableCell className="font-medium">{attestation.matricule}</TableCell>
            <TableCell>{attestation.student}</TableCell>
            <TableCell>{new Date(attestation.date).toLocaleDateString()}</TableCell>
            <TableCell>{attestation.type}</TableCell>
            <TableCell>{attestation.niveau}</TableCell>
            <TableCell>{attestation.filiere}</TableCell>
            <TableCell>
              <Badge variant={attestation.status === "delivered" ? "default" : "outline"}>
                {attestation.status === "delivered" ? "Délivrée" : "En attente"}
              </Badge>
            </TableCell>
            <TableCell>
              <div className="flex gap-2">
                <Button variant="outline" size="icon" onClick={() => onViewAttestation(attestation)}>
                  <Eye className="h-4 w-4" />
                </Button>
                <Button variant="outline" size="icon">
                  <Download className="h-4 w-4" />
                </Button>
              </div>
            </TableCell>
          </TableRow>
        ))}
        {attestations.length === 0 && (
          <TableRow>
            <TableCell colSpan={8} className="text-center py-4">
              Aucune attestation trouvée
            </TableCell>
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
};

export default AttestationList;
