
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const DashboardStatistics = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Statistiques</h1>
        <p className="text-muted-foreground mt-2">
          Visualiser les statistiques détaillées des étudiants par niveau, filière et option.
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Statistiques des Étudiants</CardTitle>
          <CardDescription>
            Aperçu détaillé de la répartition des étudiants.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">
            Cette section affichera des graphiques et tableaux statistiques sur les étudiants par niveau, filière et option.
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default DashboardStatistics;
