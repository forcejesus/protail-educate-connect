
import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";

// Mock announcement categories
const categories = [
  { id: "general", name: "Annonces générales" },
  { id: "academic", name: "Calendrier académique" },
  { id: "regulatory", name: "Règlementation" },
  { id: "events", name: "Évènements" },
  { id: "examinations", name: "Examens" },
];

// Mock announcements
const announcementsData = [
  { 
    id: 1, 
    title: "Calendrier académique 2023-2024", 
    content: "Le Ministère de l'Enseignement Supérieur informe les établissements privés que le calendrier académique 2023-2024 est désormais disponible. Les inscriptions débuteront le 15 septembre 2023 et les cours le 2 octobre 2023. La fin de l'année académique est prévue pour le 30 juin 2024. Veuillez consulter le document joint pour plus de détails.",
    author: "Direction DGESUP",
    date: "10/05/2023",
    category: "academic",
    isOfficial: true,
    comments: 8
  },
  { 
    id: 2, 
    title: "Nouvelles normes d'accréditation des filières", 
    content: "Suite à la réunion du conseil supérieur de l'enseignement du 28 avril 2023, de nouvelles normes d'accréditation des filières ont été adoptées. Les établissements disposent d'un délai de 6 mois pour se conformer à ces nouvelles exigences. Une session d'information sera organisée le 25 mai 2023 pour présenter ces changements en détail.",
    author: "Service Accréditations",
    date: "05/05/2023",
    category: "regulatory",
    isOfficial: true,
    comments: 12
  },
  { 
    id: 3, 
    title: "Atelier sur l'assurance qualité dans l'enseignement supérieur", 
    content: "La DGESUP organise un atelier sur l'assurance qualité dans l'enseignement supérieur privé le 20 mai 2023 à l'hôtel Olympic Palace de Brazzaville. La participation est obligatoire pour tous les responsables qualité des établissements. Les inscriptions sont ouvertes jusqu'au 15 mai 2023.",
    author: "Département Qualité",
    date: "02/05/2023",
    category: "events",
    isOfficial: true,
    comments: 3
  },
  { 
    id: 4, 
    title: "Rappel - Soumission des résultats académiques", 
    content: "Il est rappelé à tous les établissements que la date limite de soumission des résultats académiques du premier semestre est fixée au 15 mai 2023. Les résultats doivent être transmis via la plateforme Protail DGESUP dans l'onglet 'Résultats académiques'. Tout retard sera sanctionné conformément à la réglementation en vigueur.",
    author: "Direction des Études",
    date: "28/04/2023",
    category: "examinations",
    isOfficial: true,
    comments: 5
  },
  { 
    id: 5, 
    title: "Modification des modalités d'organisation des examens de fin d'année", 
    content: "En raison des contraintes sanitaires persistantes, les modalités d'organisation des examens de fin d'année académique ont été modifiées. Les nouvelles directives prévoient un espacement minimum entre les candidats, une désinfection obligatoire des salles entre chaque épreuve et la mise à disposition de gel hydroalcoolique. Un document détaillant ces mesures sera transmis dans les prochains jours.",
    author: "Commission des Examens",
    date: "25/04/2023",
    category: "examinations",
    isOfficial: true,
    comments: 7
  },
];

const AnnouncementsList = () => {
  const { toast } = useToast();
  const [activeCategory, setActiveCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [isCommentFormOpen, setIsCommentFormOpen] = useState(false);
  const [commentText, setCommentText] = useState("");
  
  // Filter announcements by category and search term
  const filteredAnnouncements = announcementsData.filter(announcement => {
    const matchesCategory = activeCategory === "all" || announcement.category === activeCategory;
    const matchesSearch = announcement.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                        announcement.content.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });
  
  const handleComment = () => {
    if (commentText.trim() === "") {
      toast({
        title: "Erreur",
        description: "Le commentaire ne peut pas être vide.",
        variant: "destructive",
      });
      return;
    }
    
    toast({
      title: "Commentaire ajouté",
      description: "Votre commentaire a été publié avec succès.",
    });
    
    setCommentText("");
    setIsCommentFormOpen(false);
  };
  
  return (
    <div className="space-y-8">
      <div>
        <h1 className="page-title">Forum d'Informations</h1>
        <p className="text-muted-foreground mt-2">
          Annonces officielles et discussions du ministère
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
                  Toutes les annonces
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
          
          <CardFooter className="flex justify-center p-4">
            <Dialog>
              <DialogTrigger asChild>
                <Button className="w-full">Nouvelle discussion</Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[500px]">
                <DialogHeader>
                  <DialogTitle>Créer une nouvelle discussion</DialogTitle>
                  <DialogDescription>
                    Les discussions sont visibles par tous les établissements.
                  </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="space-y-2">
                    <label htmlFor="title" className="text-sm font-medium">Titre</label>
                    <Input id="title" placeholder="Titre de la discussion" />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="category" className="text-sm font-medium">Catégorie</label>
                    <select id="category" className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring">
                      {categories.map(category => (
                        <option key={category.id} value={category.id}>{category.name}</option>
                      ))}
                    </select>
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="content" className="text-sm font-medium">Contenu</label>
                    <Textarea id="content" placeholder="Contenu de la discussion..." className="min-h-[120px]" />
                  </div>
                </div>
                <DialogFooter>
                  <Button type="submit" onClick={() => {
                    toast({
                      title: "Discussion créée",
                      description: "Votre discussion a été publiée.",
                    });
                  }}>Publier</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </CardFooter>
        </Card>
        
        {/* Main content */}
        <div className="flex-grow">
          <div className="mb-6">
            <Input
              placeholder="Rechercher dans les annonces..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="max-w-md"
            />
          </div>
          
          <Tabs defaultValue="announcements" className="w-full">
            <TabsList className="grid w-full max-w-md grid-cols-2">
              <TabsTrigger value="announcements">Annonces officielles</TabsTrigger>
              <TabsTrigger value="discussions">Discussions</TabsTrigger>
            </TabsList>
            
            <TabsContent value="announcements" className="mt-6 space-y-6">
              {filteredAnnouncements.length === 0 ? (
                <Card>
                  <CardContent className="pt-6 text-center text-muted-foreground">
                    Aucune annonce trouvée pour cette recherche.
                  </CardContent>
                </Card>
              ) : (
                filteredAnnouncements.map(announcement => (
                  <Card key={announcement.id} className="shadow-sm">
                    <CardHeader>
                      <div className="flex justify-between items-start">
                        <div>
                          <CardTitle className="flex items-center">
                            {announcement.title}
                            {announcement.isOfficial && (
                              <span className="ml-2 bg-dgesup-primary text-white text-xs px-2 py-1 rounded-full">Officiel</span>
                            )}
                          </CardTitle>
                          <CardDescription>
                            {categories.find(c => c.id === announcement.category)?.name} • {announcement.date} • Par {announcement.author}
                          </CardDescription>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="prose max-w-none">
                        <p>{announcement.content}</p>
                      </div>
                    </CardContent>
                    <CardFooter className="flex justify-between">
                      <div className="text-sm text-muted-foreground">
                        <button className="hover:text-dgesup-primary mr-4">
                          <span className="inline-flex items-center">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                            </svg>
                            {announcement.comments} commentaires
                          </span>
                        </button>
                        <button className="hover:text-dgesup-primary">
                          <span className="inline-flex items-center">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
                            </svg>
                            Partager
                          </span>
                        </button>
                      </div>
                      <Dialog open={isCommentFormOpen} onOpenChange={setIsCommentFormOpen}>
                        <DialogTrigger asChild>
                          <Button variant="outline">Commenter</Button>
                        </DialogTrigger>
                        <DialogContent>
                          <DialogHeader>
                            <DialogTitle>Ajouter un commentaire</DialogTitle>
                            <DialogDescription>
                              Votre commentaire sera visible par tous les membres.
                            </DialogDescription>
                          </DialogHeader>
                          <Textarea 
                            placeholder="Votre commentaire..." 
                            className="min-h-[100px]" 
                            value={commentText}
                            onChange={(e) => setCommentText(e.target.value)}
                          />
                          <DialogFooter>
                            <Button onClick={handleComment}>Publier</Button>
                          </DialogFooter>
                        </DialogContent>
                      </Dialog>
                    </CardFooter>
                  </Card>
                ))
              )}
            </TabsContent>
            
            <TabsContent value="discussions" className="mt-6">
              <Card>
                <CardContent className="pt-6">
                  <div className="flex items-center justify-center p-8">
                    <div className="text-center">
                      <h3 className="text-lg font-semibold mb-2">Espace discussions</h3>
                      <p className="text-muted-foreground mb-4">
                        Partagez vos questions et informations avec les autres établissements.
                      </p>
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button>Démarrer une discussion</Button>
                        </DialogTrigger>
                        <DialogContent className="sm:max-w-[500px]">
                          <DialogHeader>
                            <DialogTitle>Créer une nouvelle discussion</DialogTitle>
                            <DialogDescription>
                              Les discussions sont visibles par tous les établissements.
                            </DialogDescription>
                          </DialogHeader>
                          <div className="grid gap-4 py-4">
                            <div className="space-y-2">
                              <label htmlFor="title" className="text-sm font-medium">Titre</label>
                              <Input id="title" placeholder="Titre de la discussion" />
                            </div>
                            <div className="space-y-2">
                              <label htmlFor="category" className="text-sm font-medium">Catégorie</label>
                              <select id="category" className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring">
                                {categories.map(category => (
                                  <option key={category.id} value={category.id}>{category.name}</option>
                                ))}
                              </select>
                            </div>
                            <div className="space-y-2">
                              <label htmlFor="content" className="text-sm font-medium">Contenu</label>
                              <Textarea id="content" placeholder="Contenu de la discussion..." className="min-h-[120px]" />
                            </div>
                          </div>
                          <DialogFooter>
                            <Button type="submit" onClick={() => {
                              toast({
                                title: "Discussion créée",
                                description: "Votre discussion a été publiée.",
                              });
                            }}>Publier</Button>
                          </DialogFooter>
                        </DialogContent>
                      </Dialog>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default AnnouncementsList;
