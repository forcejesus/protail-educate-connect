
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Form } from "@/components/ui/form";
import { Button } from "@/components/ui/button";

import { studentFormSchema, StudentFormValues } from "../types";
import { PersonalInfoSection } from "../form/PersonalInfoSection";
import { ContactInfoSection } from "../form/ContactInfoSection";
import { AcademicInfoSection } from "../form/AcademicInfoSection";
import { DocumentsSection } from "../form/DocumentsSection";
import { useToast } from "@/hooks/use-toast";

interface StudentRegistrationDialogProps {
  isOpen: boolean;
  onClose: () => void;
}

export const StudentRegistrationDialog = ({ isOpen, onClose }: StudentRegistrationDialogProps) => {
  const { toast } = useToast();
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
  
  const isSubmitting = form.formState.isSubmitting;

  async function onSubmit(data: StudentFormValues) {
    // Simulate API call delay
    setTimeout(() => {
      console.log("Student registration form submitted:", data);
      
      toast({
        title: "Inscription réussie",
        description: `${data.firstName} ${data.lastName} a été inscrit(e) avec succès.`,
      });
      
      form.reset();
      onClose();
    }, 2000);
  }

  const handleCancel = () => {
    form.reset();
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
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
              <PersonalInfoSection control={form.control} />
              
              {/* Contact Information */}
              <ContactInfoSection control={form.control} />
            </div>

            {/* Academic Information */}
            <AcademicInfoSection control={form.control} />

            {/* Documents Section */}
            <DocumentsSection />

            <DialogFooter>
              <Button variant="outline" type="button" onClick={handleCancel}>
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
  );
};
