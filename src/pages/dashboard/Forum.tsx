
import { useState, useEffect } from "react";
import { Search, Bell, AlertCircle, Clock, MessageSquare, FileText } from "lucide-react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

// Mock data for forum announcements
const mockAnnouncements = [
  {
    id: 1,
    title: "Calendrier Académique 2023-2024",
    content: `
      <p>Le Ministère de l'Enseignement Supérieur informe tous les établissements d'enseignement supérieur du calendrier académique officiel pour l'année 2023-2024:</p>
      <ul>
        <li><strong>Premier semestre:</strong> 2 octobre 2023 au 26 janvier 2024</li>
        <li><strong>Examens du premier semestre:</strong> 29 janvier au 10 février 2024</li>
        <li><strong>Vacances intersemestrielles:</strong> 12 au 25 février 2024</li>
        <li><strong>Deuxième semestre:</strong> 26 février au 14 juin 2024</li>
        <li><strong>Examens du deuxième semestre:</strong> 17 juin au 29 juin 2024</li>
        <li><strong>Session de rattrapage:</strong> 15 juillet au 27 juillet 2024</li>
      </ul>
      <p>Tous les établissements sont priés de respecter ce calendrier pour assurer le bon déroulement de l'année académique.</p>
    `,
    author: "Direction des Affaires Académiques",
    date: "15 avril 2023",
    category: "planning",
    priority: "high",
    read: false
  },
  {
    id: 2,
    title: "Processus d'Accréditation 2023-2024",
    content: `
      <p>La commission nationale d'accréditation des établissements d'enseignement supérieur communique le calendrier du processus d'accréditation pour l'année académique 2023-2024:</p>
      <ol>
        <li><strong>Soumission des dossiers:</strong> 1er juin au 30 août 2023</li>
        <li><strong>Évaluation des dossiers:</strong> 1er septembre au 31 octobre 2023</li>
        <li><strong>Visites d'évaluation sur site:</strong> 1er novembre au 15 décembre 2023</li>
        <li><strong>Publication des résultats:</strong> 15 janvier 2024</li>
      </ol>
      <p>Les établissements sont priés de préparer leurs dossiers conformément au guide d'accréditation disponible dans la section des ressources.</p>
    `,
    author: "Commission Nationale d'Accréditation",
    date: "10 avril 2023",
    category: "administrative",
    priority: "medium",
    read: true
  },
  {
    id: 3,
    title: "Nouvelles Directives pour la Formation à Distance",
    content: `
      <p>Suite à l'évolution des modalités d'enseignement, le Ministère publie de nouvelles directives concernant la formation à distance dans les établissements d'enseignement supérieur:</p>
      <ol>
        <li>Les établissements souhaitant proposer des formations à distance doivent soumettre une demande d'habilitation spécifique.</li>
        <li>Les plateformes d'enseignement à distance doivent être conformes aux normes de sécurité informatique en vigueur.</li>
        <li>Un minimum de 20% de sessions synchrones est requis pour chaque module enseigné à distance.</li>
        <li>Les évaluations finales doivent être organisées en présentiel, sauf dérogation exceptionnelle.</li>
      </ol>
      <p>Ces directives entrent en vigueur à partir de la rentrée académique 2023-2024.</p>
    `,
    author: "Direction de l'Innovation Pédagogique",
    date: "5 avril 2023",
    category: "academic",
    priority: "medium",
    read: false
  },
  {
    id: 4,
    title: "Réunion des Directeurs d'Établissements",
    content: `
      <p>Le Ministre de l'Enseignement Supérieur convie tous les directeurs et recteurs des établissements d'enseignement supérieur à une réunion de coordination qui se tiendra le 25 mai 2023 à 10h00 au Palais des Congrès de Brazzaville.</p>
      <p>Ordre du jour:</p>
      <ol>
        <li>Bilan de l'année académique 2022-2023</li>
        <li>Préparation de la rentrée 2023-2024</li>
        <li>Présentation du plan stratégique quinquennal</li>
        <li>Questions diverses</li>
      </ol>
      <p>La présence de tous les directeurs et recteurs est obligatoire. Prière de confirmer votre participation avant le 15 mai 2023.</p>
    `,
    author: "Cabinet du Ministre",
    date: "2 avril 2023",
    category: "meeting",
    priority: "high",
    read: true
  },
  {
    id: 5,
    title: "Programme National de Bourses d'Excellence 2023",
    content: `
      <p>Le Ministère de l'Enseignement Supérieur lance le Programme National de Bourses d'Excellence pour l'année académique 2023-2024. Ce programme vise à soutenir les étudiants les plus méritants dans leur parcours universitaire.</p>
      <p><strong>Critères d'éligibilité:</strong></p>
      <ul>
        <li>Être de nationalité congolaise</li>
        <li>Avoir obtenu une moyenne générale d'au moins 16/20 pour l'année académique précédente</li>
        <li>Être inscrit dans un établissement d'enseignement supérieur accrédité</li>
      </ul>
      <p><strong>Calendrier:</strong></p>
      <ul>
        <li>Soumission des candidatures: 1er mai au 30 juin 2023</li>
        <li>Publication des résultats: 15 août 2023</li>
      </ul>
      <p>Les établissements sont priés d'informer leurs étudiants de cette opportunité et de faciliter le processus de candidature.</p>
    `,
    author: "Direction des Bourses et Aides Sociales",
    date: "30 mars 2023",
    category: "scholarship",
    priority: "medium",
    read: false
  }
];

const AnnouncementDetails = ({ announcement }: any) => (
  <div className="space-y-4">
    <div className="flex items-center gap-2">
      <Badge variant={announcement.priority === "high" ? "destructive" : "default"}>
        {announcement.priority === "high" ? "Priorité Haute" : "Priorité Normale"}
      </Badge>
      <span className="text-sm text-muted-foreground">
        Publié le {announcement.date} par {announcement.author}
      </span>
    </div>
    
    <div 
      className="prose prose-slate dark:prose-invert max-w-none" 
      dangerouslySetInnerHTML={{ __html: announcement.content }}
    />
  </div>
);

const DashboardForum = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeTab, setActiveTab] = useState("all");
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    // Simulate loading data
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);
    
    return () => clearTimeout(timer);
  }, []);
  
  // Filter announcements based on search term and active tab
  const filteredAnnouncements = mockAnnouncements.filter(announcement => {
    const matchesSearch = announcement.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          announcement.content.toLowerCase().includes(searchTerm.toLowerCase());
    if (activeTab === "all") return matchesSearch;
    if (activeTab === "unread") return matchesSearch && !announcement.read;
    if (activeTab === "priority") return matchesSearch && announcement.priority === "high";
    return matchesSearch && announcement.category === activeTab;
  });

  const getCategoryIcon = (category: string) => {
    switch(category) {
      case "planning": return <Clock className="h-5 w-5" />;
      case "administrative": return <FileText className="h-5 w-5" />;
      case "academic": return <MessageSquare className="h-5 w-5" />;
      case "meeting": return <Bell className="h-5 w-5" />;
      case "scholarship": return <AlertCircle className="h-5 w-5" />;
      default: return <MessageSquare className="h-5 w-5" />;
    }
  };

  const getCategoryColor = (category: string) => {
    switch(category) {
      case "planning": return "bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400";
      case "administrative": return "bg-purple-100 text-purple-600 dark:bg-purple-900/30 dark:text-purple-400";
      case "academic": return "bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400";
      case "meeting": return "bg-amber-100 text-amber-600 dark:bg-amber-900/30 dark:text-amber-400";
      case "scholarship": return "bg-pink-100 text-pink-600 dark:bg-pink-900/30 dark:text-pink-400";
      default: return "bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-400";
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Forum Public</h1>
        <p className="text-muted-foreground mt-2">
          Consulter les informations officielles du ministère (lecture seule).
        </p>
      </div>

      <div className="flex flex-col sm:flex-row gap-4 justify-between">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Rechercher une annonce..."
            className="pl-8"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid grid-cols-2 sm:grid-cols-6 gap-2">
          <TabsTrigger value="all">Tous</TabsTrigger>
          <TabsTrigger value="unread" className="relative">
            Non lus
            <Badge variant="secondary" className="ml-1 h-5 w-5 rounded-full p-0 text-xs">
              {mockAnnouncements.filter(a => !a.read).length}
            </Badge>
          </TabsTrigger>
          <TabsTrigger value="priority">Prioritaires</TabsTrigger>
          <TabsTrigger value="planning">Calendrier</TabsTrigger>
          <TabsTrigger value="administrative">Administration</TabsTrigger>
          <TabsTrigger value="academic">Académique</TabsTrigger>
        </TabsList>

        <TabsContent value={activeTab} className="mt-6">
          <div className="space-y-6">
            {isLoading ? (
              Array(3).fill(0).map((_, i) => (
                <Card key={i}>
                  <CardHeader>
                    <div className="flex items-start gap-4">
                      <Skeleton className="h-12 w-12 rounded-full" />
                      <div className="space-y-2 flex-1">
                        <Skeleton className="h-4 w-2/3" />
                        <Skeleton className="h-3 w-1/3" />
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <Skeleton className="h-4 w-full" />
                      <Skeleton className="h-4 w-full" />
                      <Skeleton className="h-4 w-2/3" />
                    </div>
                  </CardContent>
                </Card>
              ))
            ) : (
              filteredAnnouncements.map((announcement) => (
                <Card key={announcement.id} className={`${!announcement.read ? "border-l-4 border-l-primary" : ""}`}>
                  <CardHeader>
                    <div className="flex items-start gap-4">
                      <div className={`rounded-full p-3 ${getCategoryColor(announcement.category)}`}>
                        {getCategoryIcon(announcement.category)}
                      </div>
                      <div>
                        <CardTitle className="text-lg">{announcement.title}</CardTitle>
                        <CardDescription className="mt-1">
                          Publié le {announcement.date} • {announcement.author}
                        </CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div 
                      className="line-clamp-3 text-muted-foreground" 
                      dangerouslySetInnerHTML={{ 
                        __html: announcement.content.replace(/<\/?[^>]+(>|$)/g, " ").substring(0, 200) + "..." 
                      }}
                    />
                  </CardContent>
                  <CardFooter className="flex justify-between border-t pt-4">
                    <div className="flex items-center">
                      {announcement.priority === "high" && (
                        <Badge variant="destructive" className="mr-2">Prioritaire</Badge>
                      )}
                      <Badge variant="outline">{announcement.category}</Badge>
                    </div>
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button size="sm">Lire plus</Button>
                      </DialogTrigger>
                      <DialogContent className="max-w-2xl">
                        <DialogHeader>
                          <DialogTitle>{announcement.title}</DialogTitle>
                          <DialogDescription>
                            Annonce officielle du ministère
                          </DialogDescription>
                        </DialogHeader>
                        <AnnouncementDetails announcement={announcement} />
                      </DialogContent>
                    </Dialog>
                  </CardFooter>
                </Card>
              ))
            )}

            {!isLoading && filteredAnnouncements.length === 0 && (
              <div className="flex justify-center py-12">
                <div className="text-center">
                  <MessageSquare className="mx-auto h-12 w-12 text-muted-foreground opacity-50" />
                  <h3 className="mt-4 text-lg font-semibold">Aucune annonce trouvée</h3>
                  <p className="text-muted-foreground">
                    Aucune annonce ne correspond à vos critères de recherche.
                  </p>
                </div>
              </div>
            )}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default DashboardForum;
