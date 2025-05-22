
import { z } from "zod";

export const studentFormSchema = z.object({
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

export type StudentFormValues = z.infer<typeof studentFormSchema>;
