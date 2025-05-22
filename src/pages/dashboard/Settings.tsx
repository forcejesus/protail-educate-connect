
import { useState } from "react";
import { Save, School, Book, Phone, Mail, Globe, MapPin, User, Pencil } from "lucide-react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

// Mock school data
const schoolData = {
  general: {
    name: "École Supérieure de Management",
    shortName: "ESM",
    type: "private",
    establishment: "2005",
    logo: "/lovable-uploads/8edc322a-90a1-42d5-87f1-0aabc3e173a9.png",
    description: "L'École Supérieure de Management est un établissement d'enseignement supérieur privé spécialisé dans les domaines de la gestion, du commerce et de l'informatique. Fondée en 2005, elle propose des formations de qualité adaptées aux besoins du marché de l'emploi."
  },
  contact: {
    address: "123 Avenue de l'Indépendance, Brazzaville",
    phone: "+242 06 123 45 67",
    email: "contact@esm-congo.com",
    website: "www.esm-congo.com",
    socialMedia: {
      facebook: "facebook.com/esmcongo",
      twitter: "twitter.com/esmcongo",
      linkedin: "linkedin.com/school/esmcongo"
    }
  },
  programs: [
    {
      id: 1,
      name: "Licence en Gestion",
      level: "Licence",
      duration: "3 ans",
      options: ["Marketing", "Finance", "Ressources Humaines"],
      isActive: true
    },
    {
      id: 2,
      name: "Licence en Informatique",
      level: "Licence",
      duration: "3 ans",
      options: ["Développement Logiciel", "Réseaux et Systèmes", "Sécurité Informatique"],
      isActive: true
    },
    {
      id: 3,
      name: "Master en Gestion des Entreprises",
      level: "Master",
      duration: "2 ans",
      options: ["Gestion de Projets", "Finance d'Entreprise", "Management International"],
      isActive: true
    }
  ],
  directory: {
    visibility: {
      address: true,
      phone: true,
      email: true,
      website: true,
      socialMedia: true,
      programs: true
    },
    highlightedFeatures: ["Bibliothèque numérique", "Laboratoires informatiques modernes", "Partenariats internationaux"]
  }
};

const DashboardSettings = () => {
  const [school, setSchool] = useState(schoolData);
  const [activeTab, setActiveTab] = useState("general");

  const handleGeneralChange = (field: string, value: string) => {
    setSchool({
      ...school,
      general: {
        ...school.general,
        [field]: value
      }
    });
  };

  const handleContactChange = (field: string, value: string) => {
    setSchool({
      ...school,
      contact: {
        ...school.contact,
        [field]: value
      }
    });
  };

  const handleSocialMediaChange = (field: string, value: string) => {
    setSchool({
      ...school,
      contact: {
        ...school.contact,
        socialMedia: {
          ...school.contact.socialMedia,
          [field]: value
        }
      }
    });
  };

  const handleVisibilityChange = (field: string, value: boolean) => {
    setSchool({
      ...school,
      directory: {
        ...school.directory,
        visibility: {
          ...school.directory.visibility,
          [field]: value
        }
      }
    });
  };

  const handleSaveSettings = () => {
    // This would normally save to a database
    console.log("Saving settings:", school);
    // Add toast notification here
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Paramètres</h1>
        <p className="text-muted-foreground mt-2">
          Gérer les paramètres de votre établissement.
        </p>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full sm:w-[600px] grid-cols-4">
          <TabsTrigger value="general">Général</TabsTrigger>
          <TabsTrigger value="contact">Contact</TabsTrigger>
          <TabsTrigger value="programs">Filières</TabsTrigger>
          <TabsTrigger value="directory">Annuaire</TabsTrigger>
        </TabsList>

        <TabsContent value="general" className="space-y-6 mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Informations Générales</CardTitle>
              <CardDescription>
                Gérez les informations générales de votre établissement.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="school-name">Nom de l'établissement</Label>
                  <div className="relative">
                    <School className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input 
                      id="school-name" 
                      className="pl-8" 
                      value={school.general.name} 
                      onChange={(e) => handleGeneralChange("name", e.target.value)}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="short-name">Nom court / Sigle</Label>
                  <Input 
                    id="short-name" 
                    value={school.general.shortName} 
                    onChange={(e) => handleGeneralChange("shortName", e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="school-type">Type d'établissement</Label>
                  <Select 
                    value={school.general.type} 
                    onValueChange={(value) => handleGeneralChange("type", value)}
                  >
                    <SelectTrigger id="school-type">
                      <SelectValue placeholder="Sélectionner un type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="public">Public</SelectItem>
                      <SelectItem value="private">Privé</SelectItem>
                      <SelectItem value="mixed">Mixte</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="establishment-year">Année de création</Label>
                  <Input 
                    id="establishment-year" 
                    value={school.general.establishment} 
                    onChange={(e) => handleGeneralChange("establishment", e.target.value)}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="school-description">Description de l'établissement</Label>
                <Textarea 
                  id="school-description" 
                  rows={5} 
                  value={school.general.description} 
                  onChange={(e) => handleGeneralChange("description", e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label>Logo de l'établissement</Label>
                <div className="flex items-center gap-4">
                  <div className="border rounded-lg p-2 w-24 h-24 flex items-center justify-center">
                    <img 
                      src={school.general.logo} 
                      alt="Logo de l'établissement" 
                      className="max-w-full max-h-full object-contain"
                    />
                  </div>
                  <Button variant="outline">
                    <Pencil className="mr-2 h-4 w-4" />
                    Modifier le logo
                  </Button>
                </div>
              </div>
            </CardContent>
            <CardFooter className="border-t pt-4">
              <Button onClick={handleSaveSettings}>
                <Save className="mr-2 h-4 w-4" />
                Enregistrer les modifications
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="contact" className="space-y-6 mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Informations de Contact</CardTitle>
              <CardDescription>
                Gérez les coordonnées de votre établissement.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="address">Adresse complète</Label>
                <div className="relative">
                  <MapPin className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Textarea 
                    id="address" 
                    className="pl-8" 
                    value={school.contact.address} 
                    onChange={(e) => handleContactChange("address", e.target.value)}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="phone">Téléphone</Label>
                  <div className="relative">
                    <Phone className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input 
                      id="phone" 
                      className="pl-8" 
                      value={school.contact.phone} 
                      onChange={(e) => handleContactChange("phone", e.target.value)}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <div className="relative">
                    <Mail className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input 
                      id="email" 
                      className="pl-8" 
                      value={school.contact.email} 
                      onChange={(e) => handleContactChange("email", e.target.value)}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="website">Site web</Label>
                  <div className="relative">
                    <Globe className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input 
                      id="website" 
                      className="pl-8" 
                      value={school.contact.website} 
                      onChange={(e) => handleContactChange("website", e.target.value)}
                    />
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t">
                <h3 className="font-medium mb-3">Réseaux Sociaux</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="facebook">Facebook</Label>
                    <Input 
                      id="facebook" 
                      value={school.contact.socialMedia.facebook} 
                      onChange={(e) => handleSocialMediaChange("facebook", e.target.value)}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="twitter">Twitter</Label>
                    <Input 
                      id="twitter" 
                      value={school.contact.socialMedia.twitter} 
                      onChange={(e) => handleSocialMediaChange("twitter", e.target.value)}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="linkedin">LinkedIn</Label>
                    <Input 
                      id="linkedin" 
                      value={school.contact.socialMedia.linkedin}
                      onChange={(e) => handleSocialMediaChange("linkedin", e.target.value)}
                    />
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter className="border-t pt-4">
              <Button onClick={handleSaveSettings}>
                <Save className="mr-2 h-4 w-4" />
                Enregistrer les modifications
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="programs" className="space-y-6 mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Filières et Options</CardTitle>
              <CardDescription>
                Gérez les filières et options proposées par votre établissement.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Button className="mb-4">
                <Book className="mr-2 h-4 w-4" />
                Ajouter une nouvelle filière
              </Button>

              <div className="space-y-6">
                {school.programs.map((program) => (
                  <Card key={program.id} className="relative">
                    <div className="absolute top-2 right-2">
                      <Switch checked={program.isActive} />
                    </div>
                    <CardHeader>
                      <CardTitle>{program.name}</CardTitle>
                      <CardDescription>
                        {program.level} • {program.duration}
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <h4 className="font-medium mb-2">Options disponibles:</h4>
                      <div className="flex flex-wrap gap-2">
                        {program.options.map((option, index) => (
                          <Badge variant="outline" key={index}>{option}</Badge>
                        ))}
                      </div>
                    </CardContent>
                    <CardFooter className="flex justify-end gap-2 border-t pt-4">
                      <Button variant="outline" size="sm">Modifier</Button>
                      <Button variant="destructive" size="sm">Supprimer</Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            </CardContent>
            <CardFooter className="border-t pt-4">
              <Button onClick={handleSaveSettings}>
                <Save className="mr-2 h-4 w-4" />
                Enregistrer les modifications
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="directory" className="space-y-6 mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Paramètres d'Annuaire</CardTitle>
              <CardDescription>
                Gérez les informations visibles dans l'annuaire des établissements.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <h3 className="font-medium">Visibilité des informations dans l'annuaire</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex items-center justify-between space-x-2">
                    <Label htmlFor="visibility-address" className="flex-1">Adresse</Label>
                    <Switch 
                      id="visibility-address" 
                      checked={school.directory.visibility.address}
                      onCheckedChange={(checked) => handleVisibilityChange("address", checked)}
                    />
                  </div>
                  <div className="flex items-center justify-between space-x-2">
                    <Label htmlFor="visibility-phone" className="flex-1">Téléphone</Label>
                    <Switch 
                      id="visibility-phone" 
                      checked={school.directory.visibility.phone}
                      onCheckedChange={(checked) => handleVisibilityChange("phone", checked)}
                    />
                  </div>
                  <div className="flex items-center justify-between space-x-2">
                    <Label htmlFor="visibility-email" className="flex-1">Email</Label>
                    <Switch 
                      id="visibility-email" 
                      checked={school.directory.visibility.email}
                      onCheckedChange={(checked) => handleVisibilityChange("email", checked)}
                    />
                  </div>
                  <div className="flex items-center justify-between space-x-2">
                    <Label htmlFor="visibility-website" className="flex-1">Site web</Label>
                    <Switch 
                      id="visibility-website" 
                      checked={school.directory.visibility.website}
                      onCheckedChange={(checked) => handleVisibilityChange("website", checked)}
                    />
                  </div>
                  <div className="flex items-center justify-between space-x-2">
                    <Label htmlFor="visibility-socialMedia" className="flex-1">Réseaux sociaux</Label>
                    <Switch 
                      id="visibility-socialMedia" 
                      checked={school.directory.visibility.socialMedia}
                      onCheckedChange={(checked) => handleVisibilityChange("socialMedia", checked)}
                    />
                  </div>
                  <div className="flex items-center justify-between space-x-2">
                    <Label htmlFor="visibility-programs" className="flex-1">Filières et options</Label>
                    <Switch 
                      id="visibility-programs" 
                      checked={school.directory.visibility.programs}
                      onCheckedChange={(checked) => handleVisibilityChange("programs", checked)}
                    />
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="font-medium">Points forts à mettre en avant</h3>
                <div className="flex flex-wrap gap-2">
                  {school.directory.highlightedFeatures.map((feature, index) => (
                    <Badge key={index} variant="secondary" className="pl-1 pr-1.5 text-xs">
                      <span className="ml-1">{feature}</span>
                      <button className="ml-1 text-muted-foreground hover:text-foreground">×</button>
                    </Badge>
                  ))}
                  <Button variant="outline" size="sm" className="h-6">+ Ajouter</Button>
                </div>
              </div>

              <div className="pt-4 border-t">
                <h3 className="font-medium mb-3">Administrateur du compte</h3>
                <div className="flex items-center gap-4 p-4 rounded-lg border">
                  <div className="rounded-full bg-primary/10 p-2">
                    <User className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <p className="font-medium">Jean Moussa</p>
                    <p className="text-sm text-muted-foreground">admin@esm-congo.com</p>
                  </div>
                  <Button variant="outline" size="sm" className="ml-auto">
                    Modifier
                  </Button>
                </div>
              </div>
            </CardContent>
            <CardFooter className="border-t pt-4">
              <Button onClick={handleSaveSettings}>
                <Save className="mr-2 h-4 w-4" />
                Enregistrer les modifications
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default DashboardSettings;
