
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const DashboardStudents = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Gestion des Étudiants</h1>
        <p className="text-muted-foreground mt-2">
          Gérer les inscriptions, dossiers et informations des étudiants.
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Liste des Étudiants</CardTitle>
          <CardDescription>
            Consultez et gérez tous les étudiants enregistrés dans votre établissement.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">
            Cette section sera développée avec un tableau CRUD complet pour la gestion des étudiants.
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default DashboardStudents;
