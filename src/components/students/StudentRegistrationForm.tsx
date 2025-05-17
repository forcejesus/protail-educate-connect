
import { useState } from 'react';
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useToast } from "@/hooks/use-toast";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
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
import { Textarea } from "@/components/ui/textarea";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";

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

const StudentRegistrationForm = () => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  
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
    }, 2000);
  }

  return (
    <Card className="w-full shadow-md">
      <CardHeader>
        <CardTitle>Formulaire d'Inscription</CardTitle>
        <CardDescription>
          Enregistrez un nouvel étudiant dans le système
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Personal Information */}
              <div className="space-y-4">
                <h3 className="section-title">Informations Personnelles</h3>
                
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
                <h3 className="section-title">Coordonnées</h3>
                
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
              <h3 className="section-title">Informations Académiques</h3>
              
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

            <CardFooter className="px-0 flex justify-between">
              <Button variant="outline" type="button" onClick={() => form.reset()}>
                Réinitialiser
              </Button>
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? "Traitement en cours..." : "Inscrire l'étudiant"}
              </Button>
            </CardFooter>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default StudentRegistrationForm;
