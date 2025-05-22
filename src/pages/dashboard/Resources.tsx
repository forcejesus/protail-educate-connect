
import { useState } from "react";
import { Search, FileText, Download, Calendar, ExternalLink } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";

// Mock data for resources
const mockDocuments = [
  { 
    id: 1, 
    title: "Calendrier Académique 2023-2024", 
    description: "Calendrier officiel des activités académiques pour l'année universitaire 2023-2024.",
    category: "calendrier",
    date: "15/04/2023",
    size: "1.2 MB",
    new: true
  },
  { 
    id: 2, 
    title: "Guide d'Accréditation des Établissements", 
    description: "Procédures et critères pour l'accréditation des établissements d'enseignement supérieur.",
    category: "guide",
    date: "10/03/2023",
    size: "2.8 MB",
    new: false
  },
  { 
    id: 3, 
    title: "Décret N°2023-045 - Normes Pédagogiques", 
    description: "Décret fixant les normes pédagogiques nationales pour les établissements d'enseignement supérieur.",
    category: "legislation",
    date: "05/02/2023",
    size: "3.5 MB",
    new: false
  },
  { 
    id: 4, 
    title: "Formulaire de Demande d'Équivalence", 
    description: "Formulaire officiel pour les demandes d'équivalence de diplômes étrangers.",
    category: "formulaire",
    date: "20/01/2023",
    size: "0.8 MB",
    new: false
  },
  { 
    id: 5, 
    title: "Référentiel LMD 2023", 
    description: "Référentiel national du système Licence-Master-Doctorat mis à jour pour 2023.",
    category: "guide",
    date: "18/04/2023",
    size: "4.2 MB",
    new: true
  },
];

const DashboardResources = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeCategory, setActiveCategory] = useState("all");
  
  // Filter documents based on search term and active category
  const filteredDocuments = mockDocuments.filter(doc => {
    const matchesSearch = doc.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          doc.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = activeCategory === "all" || doc.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  const getCategoryIcon = (category: string) => {
    switch(category) {
      case "calendrier": return <Calendar className="h-6 w-6" />;
      case "legislation": return <FileText className="h-6 w-6" />;
      case "formulaire": return <FileText className="h-6 w-6" />;
      case "guide": return <FileText className="h-6 w-6" />;
      default: return <FileText className="h-6 w-6" />;
    }
  };

  const getCategoryColor = (category: string) => {
    switch(category) {
      case "calendrier": return "bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400";
      case "legislation": return "bg-purple-100 text-purple-600 dark:bg-purple-900/30 dark:text-purple-400";
      case "formulaire": return "bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400";
      case "guide": return "bg-amber-100 text-amber-600 dark:bg-amber-900/30 dark:text-amber-400";
      default: return "bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-400";
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Ressources Officielles</h1>
        <p className="text-muted-foreground mt-2">
          Consulter les documents importants du ministère pour les établissements.
        </p>
      </div>

      <div className="flex flex-col sm:flex-row gap-4 justify-between">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Rechercher un document..."
            className="pl-8"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      <Tabs defaultValue="all" value={activeCategory} onValueChange={setActiveCategory}>
        <TabsList>
          <TabsTrigger value="all">Tous</TabsTrigger>
          <TabsTrigger value="calendrier">Calendriers</TabsTrigger>
          <TabsTrigger value="legislation">Législation</TabsTrigger>
          <TabsTrigger value="guide">Guides</TabsTrigger>
          <TabsTrigger value="formulaire">Formulaires</TabsTrigger>
        </TabsList>

        <TabsContent value={activeCategory} className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filteredDocuments.map((document) => (
              <Card key={document.id} className="overflow-hidden">
                <CardHeader className="flex flex-row items-start gap-4">
                  <div className={`rounded-lg p-3 ${getCategoryColor(document.category)}`}>
                    {getCategoryIcon(document.category)}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-lg">{document.title}</CardTitle>
                      {document.new && (
                        <Badge variant="default" className="ml-2">Nouveau</Badge>
                      )}
                    </div>
                    <CardDescription className="mt-1.5 line-clamp-2">
                      {document.description}
                    </CardDescription>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center text-sm text-muted-foreground">
                    <Calendar className="mr-1.5 h-3.5 w-3.5" />
                    <span>Publié le {document.date}</span>
                    <span className="mx-2">•</span>
                    <span>{document.size}</span>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between border-t pt-4">
                  <Button variant="outline" size="sm">
                    <ExternalLink className="mr-2 h-4 w-4" />
                    Aperçu
                  </Button>
                  <Button size="sm">
                    <Download className="mr-2 h-4 w-4" />
                    Télécharger
                  </Button>
                </CardFooter>
              </Card>
            ))}
            
            {filteredDocuments.length === 0 && (
              <div className="col-span-full flex justify-center py-8">
                <div className="text-center">
                  <FileText className="mx-auto h-12 w-12 text-muted-foreground opacity-50" />
                  <h3 className="mt-4 text-lg font-semibold">Aucun document trouvé</h3>
                  <p className="text-muted-foreground">
                    Essayez de modifier vos critères de recherche.
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

export default DashboardResources;
