
import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import StatisticsOverview from "./StatisticsOverview";

// Mock data for dashboard stats
const dashboardStats = {
  totalStudents: 385,
  totalAttestation: 127,
  pendingRequests: 14,
  newDocuments: 5,
};

// Recent activity mock data
const recentActivity = [
  { id: 1, type: "registration", title: "Nouvel étudiant inscrit", date: "17 mai 2023", description: "Jean Makosso - Licence 2 Informatique" },
  { id: 2, type: "attestation", title: "Attestation générée", date: "16 mai 2023", description: "Marie Bakala - Attestation de réussite" },
  { id: 3, type: "document", title: "Nouveau document", date: "14 mai 2023", description: "Note de service - Sessions d'examens" },
  { id: 4, type: "forum", title: "Nouvelle annonce", date: "12 mai 2023", description: "Calendrier académique 2023-2024" }
];

const Dashboard = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading data
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  }, []);

  return (
    <div className="space-y-8">
      <div>
        <h1 className="page-title">Tableau de bord</h1>
        <p className="text-muted-foreground mt-2">
          Bienvenue dans votre espace Protail DGESUP
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="shadow-sm card-hover">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Total étudiants
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-dgesup-primary">
              {isLoading ? (
                <div className="h-8 w-16 bg-gray-200 animate-pulse rounded"></div>
              ) : (
                dashboardStats.totalStudents
              )}
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              +24 depuis le mois dernier
            </p>
          </CardContent>
        </Card>
        
        <Card className="shadow-sm card-hover">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Attestations générées
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-dgesup-primary">
              {isLoading ? (
                <div className="h-8 w-16 bg-gray-200 animate-pulse rounded"></div>
              ) : (
                dashboardStats.totalAttestation
              )}
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              +12 cette semaine
            </p>
          </CardContent>
        </Card>
        
        <Card className="shadow-sm card-hover">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Requêtes en attente
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-amber-500">
              {isLoading ? (
                <div className="h-8 w-16 bg-gray-200 animate-pulse rounded"></div>
              ) : (
                dashboardStats.pendingRequests
              )}
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              5 requêtes urgentes
            </p>
          </CardContent>
        </Card>
        
        <Card className="shadow-sm card-hover">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Nouveaux documents
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-dgesup-primary">
              {isLoading ? (
                <div className="h-8 w-16 bg-gray-200 animate-pulse rounded"></div>
              ) : (
                dashboardStats.newDocuments
              )}
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              Documents officiels à consulter
            </p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="statistics" className="w-full">
        <TabsList className="grid w-full sm:w-[400px] grid-cols-2">
          <TabsTrigger value="statistics">Statistiques</TabsTrigger>
          <TabsTrigger value="activity">Activité récente</TabsTrigger>
        </TabsList>
        <TabsContent value="statistics" className="mt-6">
          <StatisticsOverview />
        </TabsContent>
        <TabsContent value="activity">
          <Card>
            <CardHeader>
              <CardTitle>Activités récentes</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-8">
                {isLoading ? (
                  Array(4).fill(0).map((_, i) => (
                    <div key={i} className="flex space-x-4">
                      <div className="h-12 w-12 rounded-full bg-gray-200 animate-pulse"></div>
                      <div className="space-y-2 flex-1">
                        <div className="h-4 w-1/3 bg-gray-200 animate-pulse rounded"></div>
                        <div className="h-4 w-5/6 bg-gray-200 animate-pulse rounded"></div>
                      </div>
                    </div>
                  ))
                ) : (
                  recentActivity.map((activity) => (
                    <div key={activity.id} className="flex items-start space-x-4">
                      <div className={`
                        rounded-full p-3 flex-shrink-0
                        ${activity.type === 'registration' ? 'bg-blue-100 text-blue-600' : ''}
                        ${activity.type === 'attestation' ? 'bg-green-100 text-green-600' : ''}
                        ${activity.type === 'document' ? 'bg-purple-100 text-purple-600' : ''}
                        ${activity.type === 'forum' ? 'bg-amber-100 text-amber-600' : ''}
                      `}>
                        {activity.type === 'registration' && (
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                            <path d="M8 9a3 3 0 100-6 3 3 0 000 6zM8 11a6 6 0 016 6H2a6 6 0 016-6z" />
                          </svg>
                        )}
                        {activity.type === 'attestation' && (
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                          </svg>
                        )}
                        {activity.type === 'document' && (
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4z" clipRule="evenodd" />
                          </svg>
                        )}
                        {activity.type === 'forum' && (
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M18 13V5a2 2 0 00-2-2H4a2 2 0 00-2 2v8a2 2 0 002 2h3l3 3 3-3h3a2 2 0 002-2zM5 7a1 1 0 011-1h8a1 1 0 110 2H6a1 1 0 01-1-1zm1 3a1 1 0 100 2h3a1 1 0 100-2H6z" clipRule="evenodd" />
                          </svg>
                        )}
                      </div>
                      <div>
                        <h4 className="font-semibold">{activity.title}</h4>
                        <p className="text-sm text-muted-foreground">{activity.description}</p>
                        <span className="text-xs text-muted-foreground">{activity.date}</span>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Dashboard;
