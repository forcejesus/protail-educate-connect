
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface Student {
  id: number;
  name: string;
  matricule: string;
  niveau: string;
  filiere: string;
}

interface AttestationFormSectionProps {
  students: Student[];
  selectedStudent: string;
  setSelectedStudent: (value: string) => void;
  attestationType: string;
  setAttestationType: (value: string) => void;
}

const AttestationFormSection = ({
  students,
  selectedStudent,
  setSelectedStudent,
  attestationType,
  setAttestationType,
}: AttestationFormSectionProps) => {
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 gap-4">
        <div>
          <label className="text-sm font-medium mb-1 block">Sélectionner un étudiant</label>
          <Select value={selectedStudent} onValueChange={setSelectedStudent}>
            <SelectTrigger>
              <SelectValue placeholder="Sélectionner un étudiant" />
            </SelectTrigger>
            <SelectContent>
              {students.map((student) => (
                <SelectItem key={student.id} value={student.matricule}>
                  {student.name} - {student.matricule}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div>
          <label className="text-sm font-medium mb-1 block">Type d'attestation</label>
          <Select value={attestationType} onValueChange={setAttestationType}>
            <SelectTrigger>
              <SelectValue placeholder="Type d'attestation" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="success">Attestation de réussite</SelectItem>
              <SelectItem value="enrollment">Attestation de scolarité</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  );
};

export default AttestationFormSection;
