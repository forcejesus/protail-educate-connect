
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

interface Student {
  id: number;
  name: string;
  matricule: string;
  niveau: string;
  filiere: string;
  option: string;
  status: string;
}

interface StudentsListProps {
  students: Student[];
}

export const StudentsList = ({ students }: StudentsListProps) => {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Matricule</TableHead>
          <TableHead>Nom et Prénom</TableHead>
          <TableHead>Niveau</TableHead>
          <TableHead>Filière</TableHead>
          <TableHead>Option</TableHead>
          <TableHead>Statut</TableHead>
          <TableHead>Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {students.map((student) => (
          <TableRow key={student.id}>
            <TableCell className="font-medium">{student.matricule}</TableCell>
            <TableCell>{student.name}</TableCell>
            <TableCell>{student.niveau}</TableCell>
            <TableCell>{student.filiere}</TableCell>
            <TableCell>{student.option}</TableCell>
            <TableCell>
              <Badge variant={student.status === "active" ? "default" : "outline"}>
                {student.status === "active" ? "Actif" : "Inactif"}
              </Badge>
            </TableCell>
            <TableCell>
              <Button variant="outline" size="sm">Détails</Button>
            </TableCell>
          </TableRow>
        ))}
        {students.length === 0 && (
          <TableRow>
            <TableCell colSpan={7} className="text-center py-4">
              Aucun étudiant trouvé
            </TableCell>
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
};
