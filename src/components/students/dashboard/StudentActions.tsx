
import { UserPlus, FileSpreadsheet } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { utils, write } from "xlsx";
import { saveAs } from "file-saver";

interface StudentActionsProps {
  onAddStudent: () => void;
  filteredStudents: any[];
}

export const StudentActions = ({ onAddStudent, filteredStudents }: StudentActionsProps) => {
  const { toast } = useToast();

  const handleExportToExcel = () => {
    try {
      // Create a worksheet from the filtered students data
      const worksheet = utils.json_to_sheet(
        filteredStudents.map(student => ({
          "Matricule": student.matricule,
          "Nom et Prénom": student.name,
          "Niveau": student.niveau,
          "Filière": student.filiere,
          "Option": student.option,
          "Statut": student.status === "active" ? "Actif" : "Inactif"
        }))
      );
      
      // Create a workbook with one worksheet
      const workbook = utils.book_new();
      utils.book_append_sheet(workbook, worksheet, "Étudiants");
      
      // Generate Excel file as an array buffer
      const excelBuffer = write(workbook, { bookType: "xlsx", type: "array" });
      
      // Convert to Blob and trigger download
      const blob = new Blob([excelBuffer], { type: "application/octet-stream" });
      saveAs(blob, `liste-etudiants-${new Date().toISOString().split('T')[0]}.xlsx`);
      
      toast({
        title: "Exportation réussie",
        description: "Les données ont été exportées au format Excel avec succès.",
      });
      
      console.log("Students data exported to Excel successfully");
    } catch (error) {
      console.error("Error exporting to Excel:", error);
      toast({
        title: "Erreur d'exportation",
        description: "Une erreur s'est produite lors de l'exportation des données.",
        variant: "destructive"
      });
    }
  };

  return (
    <div className="flex gap-2">
      <Button onClick={handleExportToExcel}>
        <FileSpreadsheet className="mr-2 h-4 w-4" />
        Exporter en Excel
      </Button>
      <Button variant="default" onClick={onAddStudent}>
        <UserPlus className="mr-2 h-4 w-4" />
        Nouvel Étudiant
      </Button>
    </div>
  );
};
