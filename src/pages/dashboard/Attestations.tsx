
import { useState } from "react";
import { Search, FileCheck, Printer, Eye, FileText, Download } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useToast } from "@/hooks/use-toast";
import { jsPDF } from "jspdf";
import { QRCodeSVG } from "qrcode.react";

// Mock attestations data
const mockAttestations = [
  { id: 1, etudiant: "Marie Bakala", matricule: "STU20230002", type: "Réussite", date: "16/05/2023", status: "generated" },
  { id: 2, etudiant: "Jean Makosso", matricule: "STU20230001", type: "Réussite", date: "15/05/2023", status: "generated" },
  { id: 3, etudiant: "Paul Nguesso", matricule: "STU20230003", type: "Réussite", date: "14/05/2023", status: "pending" },
  { id: 4, etudiant: "Sophie Mbemba", matricule: "STU20230004", type: "Réussite", date: "13/05/2023", status: "pending" },
];

// Form schema for attestation
const attestationSchema = z.object({
  studentId: z.string({
    required_error: "L'identifiant de l'étudiant est requis",
  }),
  firstName: z.string().min(2, {
    message: "Le prénom doit comporter au moins 2 caractères.",
  }),
  lastName: z.string().min(2, {
    message: "Le nom doit comporter au moins 2 caractères.",
  }),
  department: z.string({
    required_error: "La filière est requise",
  }),
  level: z.string({
    required_error: "Le niveau est requis",
  }),
  academicYear: z.string({
    required_error: "L'année académique est requise",
  }),
  attestationType: z.enum(["success", "completion"], {
    required_error: "Le type d'attestation est requis",
  }),
  mention: z.string().optional(),
});

type AttestationFormValues = z.infer<typeof attestationSchema>;

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

const mentions = [
  { id: "passable", name: "Passable" },
  { id: "bien", name: "Bien" },
  { id: "tres-bien", name: "Très Bien" },
  { id: "excellent", name: "Excellent" },
];

const AttestationPreview = ({ etudiant, matricule, type, date, department, level, academyYear, mention }: any) => {
  const attestationId = Math.floor(Math.random() * 10000).toString().padStart(4, '0');
  const verificationUrl = `https://dgesup.cg/verification/${attestationId}`;
  
  return (
    <div className="p-6 bg-white dark:bg-zinc-900 border rounded-lg" id="attestation-preview">
      <div className="flex justify-between items-start mb-6">
        <div className="w-1/3 flex justify-center">
          <QRCodeSVG
            value={verificationUrl}
            size={100}
            className="rounded-lg"
          />
        </div>
        <div className="flex flex-col items-center w-1/3">
          <img 
            src="/lovable-uploads/8edc322a-90a1-42d5-87f1-0aabc3e173a9.png" 
            alt="DGESUP Logo" 
            className="w-24 h-24 mb-2"
          />
          <h2 className="text-2xl font-bold text-center">République du Congo</h2>
          <h3 className="text-xl font-semibold text-center">Ministère de l'Enseignement Supérieur</h3>
          <h4 className="text-lg font-medium text-center">Direction Générale de l'Enseignement Supérieur</h4>
        </div>
        <div className="w-1/3 flex justify-center">
          <img 
            src="/placeholder.svg" 
            alt="Logo École" 
            className="w-20 h-20"
          />
        </div>
      </div>
      
      <div className="mb-6 text-center">
        <h1 className="text-2xl font-bold mb-2">ATTESTATION DE RÉUSSITE</h1>
        <p className="text-sm">N° {attestationId}/DGESUP/2023</p>
      </div>
      
      <div className="space-y-4 mb-6">
        <p className="text-justify">
          Le Directeur Général de l'Enseignement Supérieur atteste que l'étudiant(e) <strong>{etudiant}</strong>,
          immatriculé(e) sous le numéro <strong>{matricule}</strong>, a satisfait à l'ensemble des épreuves
          requises pour la validation du niveau <strong>{level || "Licence 3"}</strong> dans la filière <strong>{department || "Informatique"}</strong> 
          pour l'année académique <strong>{academyYear || "2022-2023"}</strong> et est déclaré(e) <strong>ADMIS(E)</strong>.
        </p>
        
        <p className="text-right">Fait à Brazzaville, le {date || new Date().toLocaleDateString("fr-FR")}</p>
      </div>
      
      <div className="flex justify-between items-end">
        <div className="w-1/3 text-center">
          <p className="text-sm font-semibold mb-1">Scanner pour vérifier l'authenticité</p>
          <p className="text-xs text-gray-500">{verificationUrl}</p>
        </div>
        
        <div className="w-1/3 text-center">
          <div className="h-20 w-20 mx-auto border rounded-full flex items-center justify-center text-xs">
            SCEAU
          </div>
        </div>
        
        <div className="w-1/3 text-right">
          <p className="text-sm font-semibold mb-1">Le Directeur</p>
          <div className="flex justify-end">
            <img 
              src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGQAAAAyCAYAAACqNX6+AAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAhJSURBVHgB7VvfTxRXFP7uMrQFhCK0plbTalKbQvrQ9MU+mNRoa5pUm9S+tP0D2r70qS990j+g8clH+2RMbKqmsa2JD01MbVOTpj60TcRQEQE1IgqyLAu7c/vd2XN37p3ZYYFdZgF3vh8hszOz987ce797zrnnniHgEjPL5e2jasQcIb9GOBer5SSZrCtS5qBEXzk9xXI8IDnq5Jy8K+Skl2g8KcgYyHNRoFmzq1eWuOcTC+XYnBeRkE5ORoSrIFMcUFFxerbN2cCXs+EKSnq5EduQzPJK3L78aPu1qUz8MBkJxoE1Di+RkawQf/IuTUzufDQx/hZdvLC244x06hR3dOiKzPpwYe62iw9OvHXl0sSuhnH4rYBQGH14bnxqlwjm6lame3D85f7VNCdPv7r/BX0WcQixA1kq//7geMteGiMrvhfEZXf98XkmmRFCdJH+R5sPzew8fq4sTrebUjbdvtn3AXU3no5/KJSOGUzOPBudaG6Z3WbW+aGljd19e1+/SjIrr9Vmyy5t4p/l9lGa+0B5VV1F5W/JaGbZnd3ESLcp9MAZ1JVsuldnH3PLWC78gUH7sz4/H7Z1bG84vYgEfXrYrWGJaNRJYZ9j3QP0+9Mbdul/T71f5aevHXVOcrK76zKpq2/1c7vff20QTkAuxcibP80kuHsw3r7Yl94/Mlvq+J/Wr9AD1zVQdjw6bZYd22ICTsjzOs3jACpfXds58M1gr1nie/Wlmnd/mKoRJqvxhjdyMkwNhaRXaT9fKGEXKqd/P9JO1S86y0e31FYwKaayUjp9mFRWbDyurdnWcw8OwFNZA3APjnj+y2evHoUTnP7tyG5nhaXwb2DTk5NUBVZZ5YYnQnQP9CrSeq9OdrVI9xg6NdlGmL5CHw36BCWGnDR8Ix/84jsnCOLvQ4NxRleSukpwYOkZ8ESILwcXrODfQ0OpczNUZt352cYo9rbocUbZ0gIfpwq5KAALiZi58zRkL1kLRbnPiJJd5ev1v2iFeZOJxGMNChGi49kvNn3BJZ5xDSeVZfMUZ7Bc88oMGjBHHDx+T2OwM0PQzYYccc9As1r6JGFsZ05wsC0gqNwm70bTh17XGSn7YOmgzN5Wlib2Nj1cW9/GiYD1j7JKIQQdUpvGy1YiEK8ahLD5vSoe6qrwZJylQ+scemw8NG2wv+YGGawAS58XwmJygpUFrpT8EtIzcg/2ga5AiGapLGilBDoHrBqUnYO1QkglE7LmgX0IxiE+VEJQeSirlAMzbZZkzVOxxVYmDkVkrTfolVz3z9UbO1ZWMasLGaucxQvEIREu4hHiAceGctW43IV+2M3Ejy8eKEwcRI/FRvZ5CnbG2m34rN6BdQ164QfS/QvxEAerh41osdmLS9PbRiExnTNcLP89Exvk56f9yawcrKMwc1k+9Ckqr3Y+qzs9LvVAdyZuEkFP1mofVTufrOpSofaiQsTDu44xaLYxQDVCO2+RE7dS97YF3GJ81a8OpSopggxCPmvb4YX+tG/YevRjG9kMa3nNIDqZ3RcNiO/p27NIaSl4lrlUR3KJxnrnX1EkERjJJ0pKxXJlDeg+4n9vu/aD9w9B+5Jb18Z6f6XL9ZqYh2vL/99+JOjT3VTWXJu2REGvbXyetz/xt4WHcXLkKQm6l/j8wXvkiE9DdRrT59ojCLEgzLqnZ9wZhmkPSMtqVyuEeiwhbX69c3bjqplcAmZk6Pn0F8ccdI+oo3fufqX30EbNtnRd/NbwhXcCm9C2awo8+BDKHAX+m/GD9h2tBsQx8/FLw2pFurUoQhoksZCuRz5kKvaqJm26DPEDLBwTD4NeoXdl1Gnbb781bhWtlBB9gUzXo6vwzBgXAE9rXtuhbx5OB22JRWXBNLV2VoB9CbcRGC3u81/fM6oXIoTdWbJvuciKqCyPtS1C5irbOfYiRG/LEDS58RAi7MBmH9flFS91/uUgxAiijLH9kqNQpyfPhZqQXOXXQTef0ZfmPom+MdQMRl5zOymGi8qKjH3YRoj/aQYsDbqnvfiFo55CGiLZFkmLgD7YwwPnzXru28CCmki92WSwiVzr9zqRKghL+MLvQ4rdj7VAoy6QEIuKlt7JFvYh2YEf1+WIloh9yEyl7sfGKqcYf7Ia1vQIMg+Q7aZzMbTHSY4/IZkaa85+kCG15MPuQejd477RFmQC8jXX/JD19avJnKmWMgiZqTQxm2KYzmOikjwUt7UvfbRl5rg8lYUM3uqgy+FM1tRWMqYSUFZH3/sLRFneKCvbNrpzs820T2Z4MG325eWQciCdqaK6ivnLzfo32xBaxG5DkQDPG16QpScbf51FRiLEfiwJ1T8rdT+KLeVD9E1FMZa9s37+e2waqXIjrKnrKlmQRrLOdLOxK5Utq0VI3PKU1s9c2JpTlncbr273unXPGNP77Hcfqtj9SKrLi6xMugTSiQb38YrrHfWJE/00122oQaXC3AGDJ8LkiFsqBYL+BYhZ9s1ovUETxEBpusfldjf5k8NXsOtxB/mRnV4Zrl43l12Wpt6KJERb91kPnL/ZXEeTst4z+Fd3vjpJo29duDAzyq2rXqmvNrRWDMQS1hupN+35Cp3Aclw5P2z7O9kL0+Pk0PdSj02fl9l7WbJ5Kxl3j2+ozNUWRYb+hgNzmpYtqbczOdslZDwnc2q5P9FZrDb9roN+frkfg+XpsFKLpGop1RR9ZZZ+d7HQG+nuGqBvdQ/crap3mfJlZ96Q9U5BWgTSKE9HGUSy6ZkJyzPSyRn1HzKRWCokakI+Us6p7z/JqUQuToanvUXee8krspKIsynrd2yTncXmvoKUYTn2P+z6H/6C+qMsdXoSAAAAAElFTkSuQmCC" 
              alt="Signature" 
              className="w-32 h-16 object-contain mb-1"
            />
            <div className="h-0.5 w-40 bg-gray-800"></div>
          </div>
          <p className="text-xs mt-1">Signature et tampon</p>
        </div>
      </div>
      
      <div className="text-center text-xs text-gray-500 mt-16 pt-4 border-t">
        <p>Cette attestation est délivrée par la Direction Générale de l'Enseignement Supérieur du Congo</p>
        <p>Avenue Patrice Lumumba, Brazzaville - Congo</p>
        <p>contact@dgesup.cg | www.dgesup.cg</p>
      </div>
    </div>
  );
};

const DashboardAttestations = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [showPreview, setShowPreview] = useState(false);
  const [attestationPreview, setAttestationPreview] = useState<AttestationFormValues | null>(null);
  const [selectedAttestation, setSelectedAttestation] = useState<any>(null);
  const { toast } = useToast();
  
  // Filter attestations based on search term
  const filteredAttestations = mockAttestations.filter(attestation => 
    attestation.etudiant.toLowerCase().includes(searchTerm.toLowerCase()) || 
    attestation.matricule.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Form for attestation generation
  const form = useForm<AttestationFormValues>({
    resolver: zodResolver(attestationSchema),
    defaultValues: {
      studentId: "",
      firstName: "",
      lastName: "",
      department: "",
      level: "",
      academicYear: "",
      attestationType: "success",
      mention: "",
    },
  });
  
  const watchAttestationType = form.watch("attestationType");

  async function onSubmit(data: AttestationFormValues) {
    setIsGenerating(true);
    
    // Simulate API call delay
    setTimeout(() => {
      console.log("Attestation generation submitted:", data);
      
      setAttestationPreview(data);
      setShowPreview(true);
      setIsGenerating(false);
      setIsDialogOpen(false);
      
      toast({
        title: "Attestation générée",
        description: "L'attestation a été générée avec succès",
      });
    }, 2000);
  }

  // Generate a unique attestation ID
  const generateAttestationId = () => {
    const currentYear = new Date().getFullYear();
    const randomNum = Math.floor(1000 + Math.random() * 9000);
    return `ATT-${currentYear}-${randomNum}`;
  };

  // Fill form with mock data (simulating search functionality)
  const fillFormWithStudentData = () => {
    form.setValue("firstName", "Jean");
    form.setValue("lastName", "Makosso");
    form.setValue("department", "info");
    form.setValue("level", "l2");
    form.setValue("academicYear", "2022-2023");
  };

  // Handle PDF generation and download
  const handlePrintToPDF = () => {
    const doc = new jsPDF('p', 'mm', 'a4');
    const content = document.getElementById('attestation-preview');
    
    if (content) {
      // This is a simplified version - in a real app, you'd use html2canvas or similar
      // to properly convert the HTML to a PDF with proper formatting
      doc.html(content, {
        callback: function(pdf) {
          pdf.save(`attestation-${generateAttestationId()}.pdf`);
          toast({
            title: "PDF généré",
            description: "L'attestation a été convertie en PDF avec succès"
          });
        },
        x: 10,
        y: 10,
        width: 190,
        windowWidth: 650
      });
    } else {
      toast({
        title: "Erreur",
        description: "Impossible de générer le PDF",
        variant: "destructive"
      });
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Gestion des Attestations</h1>
        <p className="text-muted-foreground mt-2">
          Générer et gérer les attestations de réussite pour les étudiants.
        </p>
      </div>

      <div className="flex flex-col sm:flex-row gap-4 justify-between">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Rechercher un étudiant ou matricule..."
            className="pl-8"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <Button variant="default" onClick={() => setIsDialogOpen(true)}>
          <FileCheck className="mr-2 h-4 w-4" />
          Nouvelle Attestation
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Attestations</CardTitle>
          <CardDescription>
            Générer et imprimer des attestations de réussite pour les étudiants.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Matricule</TableHead>
                <TableHead>Nom et Prénom</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Statut</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredAttestations.map((attestation) => (
                <TableRow key={attestation.id}>
                  <TableCell className="font-medium">{attestation.matricule}</TableCell>
                  <TableCell>{attestation.etudiant}</TableCell>
                  <TableCell>Attestation de {attestation.type}</TableCell>
                  <TableCell>{attestation.date}</TableCell>
                  <TableCell>
                    <Badge variant={attestation.status === "generated" ? "default" : "outline"}>
                      {attestation.status === "generated" ? "Généré" : "En attente"}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex space-x-2">
                      <Button 
                        variant="outline" 
                        size="sm" 
                        onClick={() => {
                          setSelectedAttestation(attestation);
                          setShowPreview(true);
                        }}
                      >
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => {
                          setSelectedAttestation(attestation);
                          setTimeout(() => handlePrintToPDF(), 500);
                        }}
                      >
                        <FileText className="h-4 w-4" />
                      </Button>
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => {
                          toast({
                            title: "Téléchargement",
                            description: `Attestation pour ${attestation.etudiant} téléchargée`
                          });
                        }}
                      >
                        <Download className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
              {filteredAttestations.length === 0 && (
                <TableRow>
                  <TableCell colSpan={6} className="text-center py-4">
                    Aucune attestation trouvée
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* New Attestation Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-4xl">
          <DialogHeader>
            <DialogTitle>Générer une nouvelle attestation</DialogTitle>
            <DialogDescription>
              Remplissez le formulaire pour créer une attestation de réussite
            </DialogDescription>
          </DialogHeader>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              {/* Student Search */}
              <div className="flex space-x-2 mb-6">
                <FormField
                  control={form.control}
                  name="studentId"
                  render={({ field }) => (
                    <FormItem className="flex-1">
                      <FormLabel>Rechercher un étudiant</FormLabel>
                      <div className="flex space-x-2">
                        <FormControl>
                          <Input placeholder="ID étudiant ou Nom" {...field} />
                        </FormControl>
                        <Button 
                          type="button"
                          variant="outline"
                          onClick={fillFormWithStudentData}
                        >
                          Rechercher
                        </Button>
                      </div>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Student Information */}
                <div className="space-y-4">
                  <h3 className="font-semibold text-lg">Informations de l'étudiant</h3>
                  
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
                    name="department"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Filière</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
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
                </div>
                
                {/* Academic Information */}
                <div className="space-y-4">
                  <h3 className="font-semibold text-lg">Informations académiques</h3>
                  
                  <FormField
                    control={form.control}
                    name="level"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Niveau</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
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
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
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
                  
                  <FormField
                    control={form.control}
                    name="attestationType"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Type d'attestation</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Sélectionner un type" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="success">Attestation de Réussite</SelectItem>
                            <SelectItem value="completion">Attestation de Fin d'Études</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  {watchAttestationType === "completion" && (
                    <FormField
                      control={form.control}
                      name="mention"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Mention</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Sélectionner une mention" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {mentions.map((mention) => (
                                <SelectItem key={mention.id} value={mention.id}>
                                  {mention.name}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  )}
                </div>
              </div>
              
              <DialogFooter>
                <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>
                  Annuler
                </Button>
                <Button type="submit" disabled={isGenerating}>
                  {isGenerating ? "Génération en cours..." : "Générer l'attestation"}
                </Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
      
      {/* Attestation Preview Dialog */}
      <Dialog open={showPreview} onOpenChange={setShowPreview}>
        <DialogContent className="max-w-4xl h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Aperçu de l'attestation</DialogTitle>
            <DialogDescription>
              Vérifiez les informations avant d'imprimer
            </DialogDescription>
          </DialogHeader>
          
          {(selectedAttestation || attestationPreview) && (
            <AttestationPreview {...(selectedAttestation || attestationPreview)} />
          )}
          
          <div className="flex justify-end space-x-2 mt-4">
            <Button variant="outline" onClick={() => setShowPreview(false)}>
              Fermer
            </Button>
            <Button onClick={handlePrintToPDF}>
              <FileText className="mr-2 h-4 w-4" />
              Exporter en PDF
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default DashboardAttestations;
