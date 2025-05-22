
import { Button } from "@/components/ui/button";
import { UseFormReset } from "react-hook-form";
import { StudentFormValues } from "../types";

interface StudentFormActionsProps {
  isSubmitting: boolean;
  reset: UseFormReset<StudentFormValues>;
}

export const StudentFormActions = ({ isSubmitting, reset }: StudentFormActionsProps) => {
  return (
    <div className="flex justify-between">
      <Button variant="outline" type="button" onClick={() => reset()}>
        Réinitialiser
      </Button>
      <Button type="submit" disabled={isSubmitting}>
        {isSubmitting ? "Traitement en cours..." : "Inscrire l'étudiant"}
      </Button>
    </div>
  );
};
