
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const DashboardSettings = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Paramètres</h1>
        <p className="text-muted-foreground mt-2">
          Gérer les paramètres de votre établissement.
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Informations de l'Établissement</CardTitle>
          <CardDescription>
            Gérer les données de votre école, filières et page annuaire.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">
            Cette section permettra de modifier les informations de l'établissement, les filières proposées et les informations de l'annuaire.
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default DashboardSettings;
