
import { useState } from 'react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";

// Mock categories and resources
const categories = [
  { id: "notes", name: "Notes de service" },
  { id: "arretes", name: "Arrêtés ministériels" },
  { id: "circulaires", name: "Circulaires" },
  { id: "formulaires", name: "Formulaires" },
  { id: "guides", name: "Guides et manuels" },
];

const resources = [
  { id: 1, title: "Note de service - Organisation des examens finaux 2023", category: "notes", date: "12/05/2023", downloads: 48, fileType: "pdf", fileSize: "1.2 MB" },
  { id: 2, title: "Arrêté N°512 - Conditions d'accréditation des établissements privés", category: "arretes", date: "05/04/2023", downloads: 124, fileType: "pdf", fileSize: "2.4 MB" },
  { id: 3, title: "Formulaire de demande d'équivalence de diplôme étranger", category: "formulaires", date: "20/03/2023", downloads: 86, fileType: "docx", fileSize: "520 KB" },
  { id: 4, title: "Guide des procédures administratives pour établissements privés", category: "guides", date: "15/02/2023", downloads: 92, fileType: "pdf", fileSize: "4.1 MB" },
  { id: 5, title: "Circulaire - Calendrier académique 2023-2024", category: "circulaires", date: "10/05/2023", downloads: 142, fileType: "pdf", fileSize: "1.8 MB" },
  { id: 6, title: "Note de service - Modalités d'organisation des soutenances", category: "notes", date: "08/05/2023", downloads: 54, fileType: "pdf", fileSize: "950 KB" },
  { id: 7, title: "Arrêté N°498 - Frais de scolarité réglementaires", category: "arretes", date: "22/03/2023", downloads: 136, fileType: "pdf", fileSize: "1.5 MB" },
  { id: 8, title: "Formulaire de déclaration des effectifs étudiants", category: "formulaires", date: "14/02/2023", downloads: 75, fileType: "xlsx", fileSize: "380 KB" },
];

const ResourceCenter = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("all");
  
  // Filter resources based on search and category
  const filteredResources = resources.filter(resource => {
    const matchesSearch = resource.title.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = activeCategory === "all" || resource.category === activeCategory;
    return matchesSearch && matchesCategory;
  });
  
  // Get file icon based on type
  const getFileIcon = (fileType: string) => {
    switch (fileType) {
      case 'pdf':
        return (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-red-500" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4z" clipRule="evenodd" />
          </svg>
        );
      case 'docx':
        return (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-blue-500" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4z" clipRule="evenodd" />
          </svg>
        );
      case 'xlsx':
        return (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-green-500" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4z" clipRule="evenodd" />
          </svg>
        );
      default:
        return (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-gray-500" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4z" clipRule="evenodd" />
          </svg>
        );
    }
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="page-title">Ressources Officielles</h1>
        <p className="text-muted-foreground mt-2">
          Documentation, formulaires et circulaires officiels du ministère
        </p>
      </div>
      
      <div className="flex flex-col md:flex-row gap-6">
        {/* Categories sidebar */}
        <Card className="w-full md:w-64 shadow-sm">
          <CardHeader>
            <CardTitle>Catégories</CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <ul>
              <li>
                <Button
                  variant={activeCategory === 'all' ? 'secondary' : 'ghost'}
                  className="w-full justify-start rounded-none font-normal"
                  onClick={() => setActiveCategory('all')}
                >
                  Tous les documents
                </Button>
              </li>
              {categories.map(category => (
                <li key={category.id}>
                  <Button
                    variant={activeCategory === category.id ? 'secondary' : 'ghost'}
                    className="w-full justify-start rounded-none font-normal"
                    onClick={() => setActiveCategory(category.id)}
                  >
                    {category.name}
                  </Button>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
        
        {/* Main content */}
        <div className="flex-grow">
          <Card className="shadow-sm">
            <CardHeader>
              <CardTitle>Documents</CardTitle>
              <CardDescription>
                Accédez aux documents officiels de la DGESUP
              </CardDescription>
              <div className="pt-2">
                <Input
                  placeholder="Rechercher des documents..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="max-w-md"
                />
              </div>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="list" className="w-full">
                <TabsList className="grid w-full sm:w-[200px] grid-cols-2">
                  <TabsTrigger value="list">Liste</TabsTrigger>
                  <TabsTrigger value="grid">Grille</TabsTrigger>
                </TabsList>
                
                {/* List view */}
                <TabsContent value="list" className="mt-4">
                  {filteredResources.length === 0 ? (
                    <div className="text-center p-8 text-muted-foreground">
                      Aucun document trouvé pour cette recherche.
                    </div>
                  ) : (
                    <div className="overflow-x-auto">
                      <table className="w-full">
                        <thead>
                          <tr className="text-left border-b">
                            <th className="p-2">Titre</th>
                            <th className="p-2">Catégorie</th>
                            <th className="p-2">Date</th>
                            <th className="p-2">Téléchargements</th>
                            <th className="p-2">Actions</th>
                          </tr>
                        </thead>
                        <tbody>
                          {filteredResources.map(resource => (
                            <tr key={resource.id} className="border-b hover:bg-muted/50">
                              <td className="p-2">
                                <div className="flex items-center space-x-2">
                                  {getFileIcon(resource.fileType)}
                                  <span>{resource.title}</span>
                                </div>
                              </td>
                              <td className="p-2">
                                {categories.find(c => c.id === resource.category)?.name}
                              </td>
                              <td className="p-2">{resource.date}</td>
                              <td className="p-2">{resource.downloads}</td>
                              <td className="p-2">
                                <Button size="sm">Télécharger</Button>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  )}
                </TabsContent>
                
                {/* Grid view */}
                <TabsContent value="grid" className="mt-4">
                  {filteredResources.length === 0 ? (
                    <div className="text-center p-8 text-muted-foreground">
                      Aucun document trouvé pour cette recherche.
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                      {filteredResources.map(resource => (
                        <Card key={resource.id} className="overflow-hidden hover:shadow-md transition-shadow">
                          <CardContent className="p-0">
                            <div className="bg-muted p-6 flex justify-center">
                              {getFileIcon(resource.fileType)}
                            </div>
                            <div className="p-4">
                              <h3 className="font-medium line-clamp-2 h-12">{resource.title}</h3>
                              <div className="flex items-center justify-between mt-4">
                                <div className="text-sm text-muted-foreground">
                                  {resource.fileType.toUpperCase()} &bull; {resource.fileSize}
                                </div>
                                <span className="text-xs bg-muted px-2 py-1 rounded-full">
                                  {resource.date}
                                </span>
                              </div>
                              <Button className="w-full mt-4" size="sm">
                                Télécharger
                              </Button>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  )}
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default ResourceCenter;
