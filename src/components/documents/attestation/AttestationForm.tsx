
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { CardFooter } from "@/components/ui/card";
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
import { attestationSchema, AttestationFormValues } from "./attestationSchema";
import { departments, levels, academicYears, mentions } from "./attestationConstants";
import { StudentInfoSection } from "./StudentInfoSection";
import { AcademicInfoSection } from "./AcademicInfoSection";

interface AttestationFormProps {
  onSubmit: (data: AttestationFormValues) => void;
  isGenerating: boolean;
}

export const AttestationForm = ({ onSubmit, isGenerating }: AttestationFormProps) => {
  const { toast } = useToast();
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

  // Fill form with mock data (simulating search functionality)
  const fillFormWithStudentData = () => {
    form.setValue("firstName", "Jean");
    form.setValue("lastName", "Makosso");
    form.setValue("department", "info");
    form.setValue("level", "l2");
    form.setValue("academicYear", "2022-2023");
  };

  const handleFormSubmit = (data: AttestationFormValues) => {
    onSubmit(data);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleFormSubmit)} className="space-y-6">
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
          {/* Student Information Section */}
          <StudentInfoSection form={form} />
          
          {/* Academic Information Section */}
          <AcademicInfoSection 
            form={form}
            watchAttestationType={watchAttestationType} 
          />
        </div>
        
        <CardFooter className="px-0 flex justify-end">
          <Button type="submit" disabled={isGenerating}>
            {isGenerating ? "Génération en cours..." : "Générer l'attestation"}
          </Button>
        </CardFooter>
      </form>
    </Form>
  );
};
