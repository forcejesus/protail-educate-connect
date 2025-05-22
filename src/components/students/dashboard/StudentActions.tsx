
import { UserPlus, FileSpreadsheet } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

interface StudentActionsProps {
  onAddStudent: () => void;
  filteredStudents: any[];
}

export const StudentActions = ({ onAddStudent, filteredStudents }: StudentActionsProps) => {
  const { toast } = useToast();

  const handleExportToExcel = () => {
    // In a real application, this would generate an Excel file
    toast({
      title: "Exportation réussie",
      description: "Les données ont été exportées au format Excel avec succès.",
    });
    console.log("Exporting data to Excel:", filteredStudents);
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
