
import { UseFormReturn } from "react-hook-form";
import {
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
import { levels, academicYears, mentions } from "./attestationConstants";
import { AttestationFormValues } from "./attestationSchema";

interface AcademicInfoSectionProps {
  form: UseFormReturn<AttestationFormValues>;
  watchAttestationType: string;
}

export const AcademicInfoSection = ({ form, watchAttestationType }: AcademicInfoSectionProps) => {
  return (
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
  );
};
