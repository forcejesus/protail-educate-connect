
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const DashboardAttestations = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Gestion des Attestations</h1>
        <p className="text-muted-foreground mt-2">
          Générer et gérer les attestations de réussite pour les étudiants.
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Attestations</CardTitle>
          <CardDescription>
            Générer des attestations de réussite au format PDF pour chaque étudiant.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">
            Cette section permettra de générer des attestations PDF pour les étudiants.
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default DashboardAttestations;
