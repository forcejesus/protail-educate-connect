
import { useState } from "react";
import { FileText } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import AttestationHeader from "@/components/attestations/AttestationHeader";
import AttestationSearch from "@/components/attestations/AttestationSearch";
import AttestationList, { Attestation } from "@/components/attestations/AttestationList";
import GenerateAttestationDialog from "@/components/attestations/GenerateAttestationDialog";
import AttestationPreviewDialog from "@/components/attestations/AttestationPreviewDialog";
import { usePDFGeneration } from "@/components/attestations/hooks/usePDFGeneration";

// Mock data for students with attestation data
const mockAttestations = [
  { id: 1, student: "Jean Makosso", matricule: "STU20230001", date: "2023-06-15", type: "Licence", niveau: "Licence 3", filiere: "Informatique", status: "delivered" },
  { id: 2, student: "Marie Bakala", matricule: "STU20230002", date: "2023-06-20", type: "Licence", niveau: "Licence 3", filiere: "Gestion", status: "pending" },
  { id: 3, student: "Paul Nguesso", matricule: "STU20230003", date: "2023-07-05", type: "Master", niveau: "Master 2", filiere: "Informatique", status: "delivered" },
  { id: 4, student: "Sophie Mbemba", matricule: "STU20230004", date: "2023-07-10", type: "Licence", niveau: "Licence 3", filiere: "Droit", status: "pending" },
];

// Mock data for student selection
const mockStudents = [
  { id: 1, name: "Jean Makosso", matricule: "STU20230001", niveau: "Licence 3", filiere: "Informatique" },
  { id: 2, name: "Marie Bakala", matricule: "STU20230002", niveau: "Licence 3", filiere: "Gestion" },
  { id: 3, name: "Paul Nguesso", matricule: "STU20230003", niveau: "Master 2", filiere: "Informatique" },
  { id: 4, name: "Sophie Mbemba", matricule: "STU20230004", niveau: "Licence 3", filiere: "Droit" },
  { id: 5, name: "David Mouanda", matricule: "STU20230005", niveau: "Master 2", filiere: "Gestion" },
];

const DashboardAttestations = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [showPreviewDialog, setShowPreviewDialog] = useState(false);
  const [previewAttestation, setPreviewAttestation] = useState<any>(null);
  const { generatePDF } = usePDFGeneration();

  // Filter attestations based on search term
  const filteredAttestations = mockAttestations.filter(attestation => {
    return attestation.student.toLowerCase().includes(searchTerm.toLowerCase()) ||
           attestation.matricule.toLowerCase().includes(searchTerm.toLowerCase());
  });

  // Preview existing attestation
  const handleViewAttestation = (attestation: Attestation) => {
    const student = mockStudents.find(s => s.matricule === attestation.matricule);
    if (student) {
      setPreviewAttestation({
        ...student,
        attestationType: attestation.type === "Licence" ? "success" : "enrollment",
        status: attestation.status,
        date: attestation.date,
        id: attestation.id,
        verificationUrl: `https://votre-ecole.edu/verify/${attestation.matricule}`,
      });
      setShowPreviewDialog(true);
    }
  };
  
  // Print attestation directly
  const handlePrintAttestation = (attestation: Attestation) => {
    const student = mockStudents.find(s => s.matricule === attestation.matricule);
    if (student) {
      const attestationData = {
        ...student,
        attestationType: attestation.type === "Licence" ? "success" : "enrollment",
        status: attestation.status,
        date: attestation.date,
        id: attestation.id,
        verificationUrl: `https://votre-ecole.edu/verify/${attestation.matricule}`,
      };
      generatePDF(attestationData);
    }
  };

  return (
    <div className="space-y-6">
      <AttestationHeader onNewAttestation={() => setIsDialogOpen(true)} />

      <div className="flex flex-col sm:flex-row gap-4 justify-between">
        <div className="flex gap-4 flex-1">
          <AttestationSearch searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
        </div>
        <div className="flex gap-2">
          <Button variant="default" onClick={() => setIsDialogOpen(true)}>
            <FileText className="mr-2 h-4 w-4" />
            Nouvelle Attestation
          </Button>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Attestations Générées</CardTitle>
          <CardDescription>
            {filteredAttestations.length} attestations générées
          </CardDescription>
        </CardHeader>
        <CardContent>
          <AttestationList 
            attestations={filteredAttestations} 
            onViewAttestation={handleViewAttestation}
            onPrintAttestation={handlePrintAttestation}
          />
        </CardContent>
      </Card>

      <GenerateAttestationDialog 
        isOpen={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
        students={mockStudents}
        onGenerate={() => {
          // In a real app, this would refresh the attestations list
        }}
      />

      <AttestationPreviewDialog 
        isOpen={showPreviewDialog} 
        onClose={() => setShowPreviewDialog(false)} 
        attestation={previewAttestation} 
      />
    </div>
  );
};

export default DashboardAttestations;
