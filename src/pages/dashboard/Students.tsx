
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

// Import refactored components
import { StudentsList } from "@/components/students/dashboard/StudentsList";
import { StudentSearch } from "@/components/students/dashboard/StudentSearch";
import { StudentActions } from "@/components/students/dashboard/StudentActions";
import { StudentRegistrationDialog } from "@/components/students/dashboard/StudentRegistrationDialog";

// Mock data for students
const mockStudents = [
  { id: 1, name: "Jean Makosso", matricule: "STU20230001", niveau: "Licence 2", filiere: "Informatique", option: "Développement", status: "active" },
  { id: 2, name: "Marie Bakala", matricule: "STU20230002", niveau: "Licence 3", filiere: "Gestion", option: "Marketing", status: "active" },
  { id: 3, name: "Paul Nguesso", matricule: "STU20230003", niveau: "Master 1", filiere: "Informatique", option: "Réseaux", status: "inactive" },
  { id: 4, name: "Sophie Mbemba", matricule: "STU20230004", niveau: "Licence 1", filiere: "Droit", option: "Droit Pénal", status: "active" },
  { id: 5, name: "David Mouanda", matricule: "STU20230005", niveau: "Master 2", filiere: "Gestion", option: "Finance", status: "inactive" },
];

const DashboardStudents = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedFiliere, setSelectedFiliere] = useState("all");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  
  // Filter students based on search term and selected filière
  const filteredStudents = mockStudents.filter(student => {
    const matchesSearch = student.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         student.matricule.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFiliere = selectedFiliere === "all" || student.filiere === selectedFiliere;
    return matchesSearch && matchesFiliere;
  });

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Gestion des Étudiants</h1>
        <p className="text-muted-foreground mt-2">
          Gérer les inscriptions, dossiers et informations des étudiants.
        </p>
      </div>

      <div className="flex flex-col sm:flex-row gap-4 justify-between">
        {/* Search and filter */}
        <StudentSearch
          searchTerm={searchTerm}
          selectedFiliere={selectedFiliere}
          onSearchChange={setSearchTerm}
          onFiliereChange={setSelectedFiliere}
        />
        
        {/* Actions */}
        <StudentActions 
          onAddStudent={() => setIsDialogOpen(true)} 
          filteredStudents={filteredStudents}
        />
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Liste des Étudiants</CardTitle>
          <CardDescription>
            {filteredStudents.length} étudiants enregistrés dans votre établissement.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <StudentsList students={filteredStudents} />
        </CardContent>
      </Card>

      {/* Student Registration Dialog */}
      <StudentRegistrationDialog 
        isOpen={isDialogOpen} 
        onClose={() => setIsDialogOpen(false)}
      />
    </div>
  );
};

export default DashboardStudents;
