
import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Users, FileCheck, Clock, FileText, TrendingUp, Award } from "lucide-react";
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

  const StatCard = ({ title, value, description, icon: Icon, color = "blue" }) => (
    <Card className="shadow-sm hover:shadow-md transition-all duration-200 border-l-4 border-l-dgesup-primary bg-gradient-to-r from-white to-gray-50/50">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-sm font-medium text-gray-600 uppercase tracking-wide">
            {title}
          </CardTitle>
          <div className={`p-2 rounded-lg bg-${color}-100`}>
            <Icon className={`w-5 h-5 text-${color}-600`} />
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="text-3xl font-bold text-dgesup-primary mb-1">
          {isLoading ? (
            <div className="h-8 w-20 bg-gray-200 animate-pulse rounded"></div>
          ) : (
            value
          )}
        </div>
        <p className="text-xs text-gray-500 flex items-center">
          <TrendingUp className="w-3 h-3 mr-1 text-green-500" />
          {description}
        </p>
      </CardContent>
    </Card>
  );

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Tableau de bord</h1>
            <p className="text-gray-600">
              Bienvenue dans votre espace Portail DGESUP - Administration
            </p>
          </div>
          <div className="hidden sm:block">
            <div className="flex items-center space-x-3 bg-gradient-to-r from-dgesup-primary/10 to-dgesup-secondary/10 p-4 rounded-lg">
              <Award className="w-8 h-8 text-dgesup-primary" />
              <div>
                <p className="text-sm font-semibold text-dgesup-primary">Système Actif</p>
                <p className="text-xs text-gray-600">Toutes les fonctionnalités opérationnelles</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Total étudiants"
          value={dashboardStats.totalStudents}
          description="+24 depuis le mois dernier"
          icon={Users}
          color="blue"
        />
        <StatCard
          title="Attestations générées"
          value={dashboardStats.totalAttestation}
          description="+12 cette semaine"
          icon={FileCheck}
          color="green"
        />
        <StatCard
          title="Requêtes en attente"
          value={dashboardStats.pendingRequests}
          description="5 requêtes urgentes"
          icon={Clock}
          color="yellow"
        />
        <StatCard
          title="Nouveaux documents"
          value={dashboardStats.newDocuments}
          description="Documents officiels à consulter"
          icon={FileText}
          color="purple"
        />
      </div>

      {/* Tabs Section */}
      <Tabs defaultValue="statistics" className="w-full">
        <TabsList className="grid w-full sm:w-[400px] grid-cols-2 bg-white border border-gray-200 rounded-lg p-1">
          <TabsTrigger 
            value="statistics" 
            className="data-[state=active]:bg-dgesup-primary data-[state=active]:text-white transition-all duration-200"
          >
            Statistiques
          </TabsTrigger>
          <TabsTrigger 
            value="activity"
            className="data-[state=active]:bg-dgesup-primary data-[state=active]:text-white transition-all duration-200"
          >
            Activité récente
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="statistics" className="mt-6">
          <StatisticsOverview />
        </TabsContent>
        
        <TabsContent value="activity">
          <Card className="shadow-sm border border-gray-100">
            <CardHeader className="bg-gradient-to-r from-gray-50 to-white border-b border-gray-100">
              <CardTitle className="text-lg font-semibold text-gray-900">Activités récentes</CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <div className="space-y-6">
                {isLoading ? (
                  Array(4).fill(0).map((_, i) => (
                    <div key={i} className="flex space-x-4 animate-pulse">
                      <div className="h-12 w-12 rounded-full bg-gray-200"></div>
                      <div className="space-y-2 flex-1">
                        <div className="h-4 w-1/3 bg-gray-200 rounded"></div>
                        <div className="h-4 w-5/6 bg-gray-200 rounded"></div>
                      </div>
                    </div>
                  ))
                ) : (
                  recentActivity.map((activity) => (
                    <div key={activity.id} className="flex items-start space-x-4 p-4 rounded-lg hover:bg-gray-50 transition-colors duration-150">
                      <div className={`
                        rounded-full p-3 flex-shrink-0 shadow-sm
                        ${activity.type === 'registration' ? 'bg-blue-100 text-blue-600' : ''}
                        ${activity.type === 'attestation' ? 'bg-green-100 text-green-600' : ''}
                        ${activity.type === 'document' ? 'bg-purple-100 text-purple-600' : ''}
                        ${activity.type === 'forum' ? 'bg-amber-100 text-amber-600' : ''}
                      `}>
                        {activity.type === 'registration' && <Users className="h-5 w-5" />}
                        {activity.type === 'attestation' && <FileCheck className="h-5 w-5" />}
                        {activity.type === 'document' && <FileText className="h-5 w-5" />}
                        {activity.type === 'forum' && <FileText className="h-5 w-5" />}
                      </div>
                      <div className="flex-1">
                        <h4 className="font-semibold text-gray-900">{activity.title}</h4>
                        <p className="text-sm text-gray-600 mt-1">{activity.description}</p>
                        <span className="text-xs text-gray-400 mt-2 block">{activity.date}</span>
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
