
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

interface Student {
  id: number;
  name: string;
  matricule: string;
  niveau: string;
  filiere: string;
}

export const useAttestationGeneration = (
  students: Student[],
  onClose: () => void,
  onGenerate: () => void
) => {
  const [selectedStudent, setSelectedStudent] = useState("");
  const [attestationType, setAttestationType] = useState("success");
  const [isGenerating, setIsGenerating] = useState(false);
  const [previewAttestationData, setPreviewAttestationData] = useState<any>(null);
  const { toast } = useToast();

  const findStudentByMatricule = (matricule: string) => {
    return students.find(student => student.matricule === matricule);
  };

  const handlePreviewAttestation = () => {
    if (!selectedStudent) {
      toast({
        title: "Erreur",
        description: "Veuillez sélectionner un étudiant.",
        variant: "destructive",
      });
      return;
    }
    
    const student = findStudentByMatricule(selectedStudent);
    if (student) {
      setPreviewAttestationData({
        ...student,
        attestationType,
        date: new Date().toISOString().split('T')[0],
        id: Math.floor(Math.random() * 1000) + 1,
        verificationUrl: `https://votre-ecole.edu/verify/${selectedStudent}`,
      });
    }
  };

  const handleGenerateAttestation = () => {
    if (!selectedStudent) {
      toast({
        title: "Erreur",
        description: "Veuillez sélectionner un étudiant.",
        variant: "destructive",
      });
      return;
    }

    setIsGenerating(true);
    
    setTimeout(() => {
      toast({
        title: "Attestation créée",
        description: "L'attestation a été générée avec succès.",
      });
      
      onClose();
      setIsGenerating(false);
      setSelectedStudent("");
      setAttestationType("success");
      onGenerate();
    }, 1500);
  };

  return {
    selectedStudent,
    setSelectedStudent,
    attestationType,
    setAttestationType,
    isGenerating,
    previewAttestationData,
    handlePreviewAttestation,
    handleGenerateAttestation,
  };
};
