
import { useState } from "react";
import { Search, UserPlus, Download, X, Plus, FileSpreadsheet } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
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
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useToast } from "@/hooks/use-toast";

// Mock data for students
const mockStudents = [
  { id: 1, name: "Jean Makosso", matricule: "STU20230001", niveau: "Licence 2", filiere: "Informatique", option: "Développement", status: "active" },
  { id: 2, name: "Marie Bakala", matricule: "STU20230002", niveau: "Licence 3", filiere: "Gestion", option: "Marketing", status: "active" },
  { id: 3, name: "Paul Nguesso", matricule: "STU20230003", niveau: "Master 1", filiere: "Informatique", option: "Réseaux", status: "inactive" },
  { id: 4, name: "Sophie Mbemba", matricule: "STU20230004", niveau: "Licence 1", filiere: "Droit", option: "Droit Pénal", status: "active" },
  { id: 5, name: "David Mouanda", matricule: "STU20230005", niveau: "Master 2", filiere: "Gestion", option: "Finance", status: "inactive" },
];

// Form schema for student registration
const studentFormSchema = z.object({
  firstName: z.string().min(2, {
    message: "Le prénom doit comporter au moins 2 caractères.",
  }),
  lastName: z.string().min(2, {
    message: "Le nom doit comporter au moins 2 caractères.",
  }),
  gender: z.enum(["M", "F"], {
    required_error: "Veuillez sélectionner votre genre.",
  }),
  dateOfBirth: z.string({
    required_error: "La date de naissance est requise.",
  }),
  placeOfBirth: z.string({
    required_error: "Le lieu de naissance est requis.",
  }),
  email: z.string().email({
    message: "Veuillez entrer une adresse e-mail valide.",
  }),
  phone: z.string().min(8, {
    message: "Le numéro de téléphone doit comporter au moins 8 chiffres.",
  }),
  address: z.string().min(5, {
    message: "L'adresse doit comporter au moins 5 caractères.",
  }),
  department: z.string({
    required_error: "Veuillez sélectionner une filière.",
  }),
  level: z.string({
    required_error: "Veuillez sélectionner un niveau.",
  }),
  academicYear: z.string({
    required_error: "Veuillez sélectionner une année académique.",
  }),
  previousInstitution: z.string().optional(),
});

type StudentFormValues = z.infer<typeof studentFormSchema>;

// Mock data for dropdowns
const departments = [
  { id: "info", name: "Informatique" },
  { id: "gest", name: "Gestion" },
  { id: "droit", name: "Droit" },
  { id: "med", name: "Médecine" },
  { id: "eco", name: "Économie" },
  { id: "com", name: "Communication" },
];

const levels = [
  { id: "l1", name: "Licence 1" },
  { id: "l2", name: "Licence 2" },
  { id: "l3", name: "Licence 3" },
  { id: "m1", name: "Master 1" },
  { id: "m2", name: "Master 2" },
  { id: "doc", name: "Doctorat" },
];

const academicYears = [
  { id: "2023-2024", name: "2023-2024" },
  { id: "2022-2023", name: "2022-2023" },
  { id: "2021-2022", name: "2021-2022" },
];

const DashboardStudents = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedFiliere, setSelectedFiliere] = useState("all");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();
  
  // Filter students based on search term and selected filière
  const filteredStudents = mockStudents.filter(student => {
    const matchesSearch = student.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         student.matricule.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFiliere = selectedFiliere === "all" || student.filiere === selectedFiliere;
    return matchesSearch && matchesFiliere;
  });

  // Form for student registration
  const form = useForm<StudentFormValues>({
    resolver: zodResolver(studentFormSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      gender: undefined,
      dateOfBirth: "",
      placeOfBirth: "",
      email: "",
      phone: "",
      address: "",
      department: "",
      level: "",
      academicYear: "",
      previousInstitution: "",
    },
  });

  // Handle form submission
  async function onSubmit(data: StudentFormValues) {
    setIsSubmitting(true);
    
    // Simulate API call delay
    setTimeout(() => {
      console.log("Student registration form submitted:", data);
      
      toast({
        title: "Inscription réussie",
        description: `${data.firstName} ${data.lastName} a été inscrit(e) avec succès.`,
      });
      
      form.reset();
      setIsSubmitting(false);
      setIsDialogOpen(false);
    }, 2000);
  }

  // Handle export to Excel
  const handleExportToExcel = () => {
    // In a real application, you would generate an Excel file here
    // For this simulation, we'll just show a toast message
    toast({
      title: "Exportation réussie",
      description: "Les données ont été exportées au format Excel avec succès.",
    });
    console.log("Exporting data to Excel:", filteredStudents);
  };

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
          <Button onClick={handleExportToExcel}>
            <FileSpreadsheet className="mr-2 h-4 w-4" />
            Exporter en Excel
          </Button>
          <Button variant="default" onClick={() => setIsDialogOpen(true)}>
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

      {/* Student Registration Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Inscription d'un nouvel étudiant</DialogTitle>
            <DialogDescription>
              Remplissez le formulaire ci-dessous pour inscrire un nouvel étudiant
            </DialogDescription>
          </DialogHeader>
          
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Personal Information */}
                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Informations Personnelles</h3>
                  
                  <FormField
                    control={form.control}
                    name="firstName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Prénom</FormLabel>
                        <FormControl>
                          <Input placeholder="Prénom de l'étudiant" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="lastName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Nom</FormLabel>
                        <FormControl>
                          <Input placeholder="Nom de l'étudiant" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="gender"
                    render={({ field }) => (
                      <FormItem className="space-y-3">
                        <FormLabel>Genre</FormLabel>
                        <FormControl>
                          <RadioGroup
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                            className="flex space-x-8"
                          >
                            <div className="flex items-center space-x-2">
                              <RadioGroupItem value="M" id="male" />
                              <Label htmlFor="male">Masculin</Label>
                            </div>
                            <div className="flex items-center space-x-2">
                              <RadioGroupItem value="F" id="female" />
                              <Label htmlFor="female">Féminin</Label>
                            </div>
                          </RadioGroup>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="dateOfBirth"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Date de naissance</FormLabel>
                        <FormControl>
                          <Input type="date" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="placeOfBirth"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Lieu de naissance</FormLabel>
                        <FormControl>
                          <Input placeholder="Ville, Pays" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                
                {/* Contact Information */}
                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Coordonnées</h3>
                  
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                          <Input placeholder="email@example.com" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="phone"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Téléphone</FormLabel>
                        <FormControl>
                          <Input placeholder="+242 XX XXX XXXX" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="address"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Adresse</FormLabel>
                        <FormControl>
                          <Textarea 
                            placeholder="Adresse complète" 
                            className="resize-none"
                            {...field} 
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>

              {/* Academic Information */}
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Informations Académiques</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <FormField
                    control={form.control}
                    name="department"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Filière</FormLabel>
                        <Select 
                          onValueChange={field.onChange} 
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Sélectionner une filière" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {departments.map((dept) => (
                              <SelectItem key={dept.id} value={dept.id}>
                                {dept.name}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="level"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Niveau</FormLabel>
                        <Select 
                          onValueChange={field.onChange} 
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Sélectionner un niveau" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {levels.map((level) => (
                              <SelectItem key={level.id} value={level.id}>
                                {level.name}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="academicYear"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Année académique</FormLabel>
                        <Select 
                          onValueChange={field.onChange} 
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Sélectionner une année" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {academicYears.map((year) => (
                              <SelectItem key={year.id} value={year.id}>
                                {year.name}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                
                <FormField
                  control={form.control}
                  name="previousInstitution"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Institution précédente (optionnel)</FormLabel>
                      <FormControl>
                        <Input placeholder="Nom de l'établissement précédent" {...field} />
                      </FormControl>
                      <FormDescription>
                        Si l'étudiant a été transféré d'une autre institution
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="mt-6">
                  <h3 className="text-lg font-semibold mb-2">Documents justificatifs</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="border border-dashed rounded-lg p-4 flex flex-col items-center justify-center">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-muted-foreground mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                      <p className="text-sm font-medium">Photo d'identité</p>
                      <Input type="file" className="mt-2" />
                    </div>
                    <div className="border border-dashed rounded-lg p-4 flex flex-col items-center justify-center">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-muted-foreground mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                      <p className="text-sm font-medium">Acte de naissance</p>
                      <Input type="file" className="mt-2" />
                    </div>
                    <div className="border border-dashed rounded-lg p-4 flex flex-col items-center justify-center">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-muted-foreground mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                      <p className="text-sm font-medium">Relevé de notes</p>
                      <Input type="file" className="mt-2" />
                    </div>
                    <div className="border border-dashed rounded-lg p-4 flex flex-col items-center justify-center">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-muted-foreground mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                      <p className="text-sm font-medium">Diplôme/Attestation</p>
                      <Input type="file" className="mt-2" />
                    </div>
                  </div>
                </div>
              </div>

              <DialogFooter>
                <Button variant="outline" type="button" onClick={() => {
                  form.reset();
                  setIsDialogOpen(false);
                }}>
                  Annuler
                </Button>
                <Button type="submit" disabled={isSubmitting}>
                  {isSubmitting ? "Traitement en cours..." : "Inscrire l'étudiant"}
                </Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default DashboardStudents;
