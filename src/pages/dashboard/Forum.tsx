
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const DashboardForum = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Forum Public</h1>
        <p className="text-muted-foreground mt-2">
          Consulter les informations officielles du ministère (lecture seule).
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Annonces Officielles</CardTitle>
          <CardDescription>
            Informations importantes publiées par le ministère.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">
            Cette section affichera les annonces officielles du ministère en lecture seule, sans possibilité de commenter.
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default DashboardForum;
