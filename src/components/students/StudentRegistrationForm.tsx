
import { useState } from 'react';
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useToast } from "@/hooks/use-toast";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Form } from "@/components/ui/form";

// Import types and schema
import { studentFormSchema, StudentFormValues } from "./types";

// Import form sections
import { PersonalInfoSection } from "./form/PersonalInfoSection";
import { ContactInfoSection } from "./form/ContactInfoSection";
import { AcademicInfoSection } from "./form/AcademicInfoSection";
import { DocumentsSection } from "./form/DocumentsSection";
import { StudentFormActions } from "./form/StudentFormActions";

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
              <PersonalInfoSection control={form.control} />
              
              {/* Contact Information */}
              <ContactInfoSection control={form.control} />
            </div>

            {/* Academic Information */}
            <AcademicInfoSection control={form.control} />

            {/* Documents Section */}
            <DocumentsSection />

            <CardFooter className="px-0">
              <StudentFormActions 
                isSubmitting={isSubmitting}
                reset={form.reset}
              />
            </CardFooter>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default StudentRegistrationForm;
