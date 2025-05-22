
import { z } from "zod";

export const attestationSchema = z.object({
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

export type AttestationFormValues = z.infer<typeof attestationSchema>;
