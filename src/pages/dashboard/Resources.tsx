
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const DashboardResources = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Ressources Officielles</h1>
        <p className="text-muted-foreground mt-2">
          Consulter les documents importants du ministère pour les établissements.
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Documents Officiels</CardTitle>
          <CardDescription>
            Documents importants du ministère à consulter.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">
            Cette section listera les documents officiels du ministère pour référence.
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default DashboardResources;
