
import { useState } from 'react';
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle,
  CardFooter
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

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

// Mock previous attestations
const previousAttestations = [
  { id: "ATT-2023-001", studentName: "Jean Makosso", type: "Attestation de Réussite", date: "15/05/2023", level: "Licence 2", department: "Informatique" },
  { id: "ATT-2023-002", studentName: "Marie Bakala", type: "Attestation de Fin d'Études", date: "10/05/2023", level: "Master 2", department: "Gestion" },
  { id: "ATT-2023-003", studentName: "Pierre Nkouka", type: "Attestation de Réussite", date: "05/05/2023", level: "Licence 3", department: "Droit" },
  { id: "ATT-2022-042", studentName: "Sophie Mbemba", type: "Attestation de Fin d'Études", date: "22/09/2022", level: "Master 2", department: "Communication" },
  { id: "ATT-2022-041", studentName: "André Loutaya", type: "Attestation de Réussite", date: "20/09/2022", level: "Licence 1", department: "Informatique" },
];

const AttestationGenerator = () => {
  const { toast } = useToast();
  const [isGenerating, setIsGenerating] = useState(false);
  const [showPreview, setShowPreview] = useState(false);
  const [attestationPreview, setAttestationPreview] = useState<AttestationFormValues | null>(null);
  
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

  // Generate QR code URL (simulated)
  const getQrCodeUrl = (id: string) => {
    return `https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${encodeURIComponent(
      `https://dgesup.cg/verification/${id}`
    )}`;
  };

  const handlePrint = () => {
    window.print();
    setShowPreview(false);
  };
  
  // Fill form with mock data (simulating search functionality)
  const fillFormWithStudentData = () => {
    form.setValue("firstName", "Jean");
    form.setValue("lastName", "Makosso");
    form.setValue("department", "info");
    form.setValue("level", "l2");
    form.setValue("academicYear", "2022-2023");
  };

  return (
    <div className="space-y-8">
      <Tabs defaultValue="generate" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="generate">Générer une attestation</TabsTrigger>
          <TabsTrigger value="history">Historique</TabsTrigger>
        </TabsList>
        
        <TabsContent value="generate" className="mt-6">
          <Card className="shadow-md">
            <CardHeader>
              <CardTitle>Générer une attestation</CardTitle>
              <CardDescription>Créer une attestation officielle avec QR Code</CardDescription>
            </CardHeader>
            <CardContent>
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
                  
                  <CardFooter className="px-0 flex justify-end">
                    <Button type="submit" disabled={isGenerating}>
                      {isGenerating ? "Génération en cours..." : "Générer l'attestation"}
                    </Button>
                  </CardFooter>
                </form>
              </Form>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="history" className="mt-6">
          <Card className="shadow-md">
            <CardHeader>
              <CardTitle>Historique des attestations</CardTitle>
              <CardDescription>Attestations précédemment générées</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="text-left border-b">
                      <th className="p-2">ID</th>
                      <th className="p-2">Étudiant</th>
                      <th className="p-2">Type</th>
                      <th className="p-2">Filière/Niveau</th>
                      <th className="p-2">Date</th>
                      <th className="p-2">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {previousAttestations.map((attestation) => (
                      <tr key={attestation.id} className="border-b hover:bg-muted/50">
                        <td className="p-2">{attestation.id}</td>
                        <td className="p-2">{attestation.studentName}</td>
                        <td className="p-2">{attestation.type}</td>
                        <td className="p-2">{attestation.department} - {attestation.level}</td>
                        <td className="p-2">{attestation.date}</td>
                        <td className="p-2">
                          <div className="flex space-x-2">
                            <Button variant="outline" size="sm">
                              Télécharger
                            </Button>
                            <Button variant="ghost" size="sm">
                              Voir
                            </Button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
      
      {/* Attestation Preview Dialog */}
      <Dialog open={showPreview} onOpenChange={setShowPreview}>
        <DialogContent className="max-w-4xl h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Aperçu de l'attestation</DialogTitle>
            <DialogDescription>
              Vérifiez les informations avant d'imprimer
            </DialogDescription>
          </DialogHeader>
          
          {attestationPreview && (
            <div className="p-8 bg-white border rounded-md">
              <div className="text-center mb-6">
                <h2 className="text-lg font-bold uppercase">République du Congo</h2>
                <h3 className="text-md">Ministère de l'Enseignement Supérieur</h3>
                <div className="my-4 flex justify-center">
                  <img src="/placeholder.svg" alt="Logo DGESUP" className="w-20 h-20" />
                </div>
                <h1 className="text-2xl font-bold mt-4 text-dgesup-primary">
                  {attestationPreview.attestationType === "success" 
                    ? "ATTESTATION DE RÉUSSITE" 
                    : "ATTESTATION DE FIN D'ÉTUDES"}
                </h1>
                <p className="text-sm">N° {generateAttestationId()}</p>
              </div>
              
              <div className="mb-8 text-center">
                <p className="mb-1">Le Directeur de la Direction Générale de l'Enseignement Supérieur atteste que :</p>
                <p className="font-bold text-lg">{attestationPreview.firstName} {attestationPreview.lastName}</p>
                <p>
                  A {attestationPreview.attestationType === "success" 
                    ? "validé avec succès l'année académique" 
                    : "complété avec succès le cycle d'études"}
                </p>
                
                <div className="my-4">
                  <p>
                    <strong>Filière :</strong> {departments.find(d => d.id === attestationPreview.department)?.name}
                  </p>
                  <p>
                    <strong>Niveau :</strong> {levels.find(l => l.id === attestationPreview.level)?.name}
                  </p>
                  <p>
                    <strong>Année académique :</strong> {academicYears.find(y => y.id === attestationPreview.academicYear)?.name}
                  </p>
                  
                  {attestationPreview.attestationType === "completion" && attestationPreview.mention && (
                    <p>
                      <strong>Mention :</strong> {mentions.find(m => m.id === attestationPreview.mention)?.name}
                    </p>
                  )}
                </div>
              </div>
              
              <div className="flex justify-between items-end mt-16">
                <div>
                  <p>Fait à Brazzaville, le {new Date().toLocaleDateString("fr-FR")}</p>
                  <div className="mt-6">
                    <p className="font-semibold">Le Directeur Général</p>
                    <div className="mt-8">
                      <hr className="w-40 border-t-2" />
                      <p>Signature et tampon</p>
                    </div>
                  </div>
                </div>
                
                <div className="text-center">
                  <img 
                    src={getQrCodeUrl(generateAttestationId())} 
                    alt="QR Code de vérification" 
                    className="w-32 h-32 mx-auto mb-2"
                  />
                  <p className="text-xs text-gray-500">Scanner pour vérifier l'authenticité</p>
                </div>
              </div>
              
              <div className="text-center text-xs text-gray-500 mt-16 pt-4 border-t">
                <p>Cette attestation est délivrée par la Direction Générale de l'Enseignement Supérieur du Congo</p>
                <p>Avenue Patrice Lumumba, Brazzaville - Congo</p>
                <p>contact@dgesup.cg | www.dgesup.cg</p>
              </div>
            </div>
          )}
          
          <div className="flex justify-end space-x-2 mt-4">
            <Button variant="outline" onClick={() => setShowPreview(false)}>
              Fermer
            </Button>
            <Button onClick={handlePrint}>
              Imprimer
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AttestationGenerator;
