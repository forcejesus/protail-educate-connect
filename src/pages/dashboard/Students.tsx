
import { useState } from "react";
import { Search, UserPlus, Download } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { 
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

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
        <div className="flex gap-4 flex-1">
          <div className="relative flex-1">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Rechercher un étudiant..."
              className="pl-8"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <Select value={selectedFiliere} onValueChange={setSelectedFiliere}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Filière" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Filières</SelectLabel>
                <SelectItem value="all">Toutes les filières</SelectItem>
                <SelectItem value="Informatique">Informatique</SelectItem>
                <SelectItem value="Gestion">Gestion</SelectItem>
                <SelectItem value="Droit">Droit</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
        <div className="flex gap-2">
          <Button>
            <Download className="mr-2 h-4 w-4" />
            Exporter
          </Button>
          <Button variant="default">
            <UserPlus className="mr-2 h-4 w-4" />
            Nouvel Étudiant
          </Button>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Liste des Étudiants</CardTitle>
          <CardDescription>
            {filteredStudents.length} étudiants enregistrés dans votre établissement.
          </CardDescription>
        </CardHeader>
        <CardContent>
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
              {filteredStudents.map((student) => (
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
              {filteredStudents.length === 0 && (
                <TableRow>
                  <TableCell colSpan={7} className="text-center py-4">
                    Aucun étudiant trouvé
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default DashboardStudents;
