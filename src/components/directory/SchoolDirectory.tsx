
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
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";

// Mock departments (regions)
const departments = [
  { id: "brazzaville", name: "Brazzaville" },
  { id: "pointe-noire", name: "Pointe-Noire" },
  { id: "niari", name: "Niari" },
  { id: "bouenza", name: "Bouenza" },
  { id: "cuvette", name: "Cuvette" },
  { id: "pool", name: "Pool" },
];

// Mock programs (disciplines)
const programs = [
  { id: "informatique", name: "Informatique" },
  { id: "gestion", name: "Gestion & Management" },
  { id: "droit", name: "Droit" },
  { id: "medecine", name: "Médecine & Santé" },
  { id: "sciences", name: "Sciences" },
  { id: "agriculture", name: "Agriculture" },
  { id: "arts", name: "Arts & Lettres" },
];

// Mock schools
const schools = [
  {
    id: 1,
    name: "Institut Supérieur de Gestion",
    acronym: "ISG",
    address: "25 Avenue des Trois Martyrs, Brazzaville",
    department: "brazzaville",
    phone: "+242 XX XXX XXXX",
    email: "contact@isg.cg",
    website: "www.isg.cg",
    accreditationDate: "15/03/2015",
    programs: ["gestion", "informatique", "droit"],
    description: "L'Institut Supérieur de Gestion est un établissement privé reconnu par l'État congolais depuis 2015. Il propose des formations en gestion, informatique et droit, du niveau licence au master.",
    logo: "/placeholder.svg"
  },
  {
    id: 2,
    name: "École Supérieure d'Informatique et de Management",
    acronym: "ESIM",
    address: "12 Rue Loufou, Pointe-Noire",
    department: "pointe-noire",
    phone: "+242 XX XXX XXXX",
    email: "info@esim.cg",
    website: "www.esim.cg",
    accreditationDate: "20/07/2016",
    programs: ["informatique", "gestion"],
    description: "L'ESIM est spécialisée dans les formations en informatique, réseaux, cybersécurité et management des systèmes d'information. Elle offre des programmes de licence et master accrédités par le ministère.",
    logo: "/placeholder.svg"
  },
  {
    id: 3,
    name: "Institut des Sciences de la Santé",
    acronym: "ISS",
    address: "45 Avenue de l'Hôpital, Brazzaville",
    department: "brazzaville",
    phone: "+242 XX XXX XXXX",
    email: "contact@iss.cg",
    website: "www.iss.cg",
    accreditationDate: "10/09/2014",
    programs: ["medecine"],
    description: "L'Institut des Sciences de la Santé forme des professionnels de la santé dans diverses spécialités médicales et paramédicales. Reconnu pour la qualité de ses formations pratiques en partenariat avec les hôpitaux.",
    logo: "/placeholder.svg"
  },
  {
    id: 4,
    name: "École de Droit et d'Administration",
    acronym: "EDA",
    address: "8 Boulevard Marien Ngouabi, Brazzaville",
    department: "brazzaville",
    phone: "+242 XX XXX XXXX",
    email: "info@eda.cg",
    website: "www.eda.cg",
    accreditationDate: "05/04/2017",
    programs: ["droit"],
    description: "L'École de Droit et d'Administration est spécialisée dans les formations juridiques et administratives. Elle prépare aux carrières dans la fonction publique, le secteur privé et les organisations internationales.",
    logo: "/placeholder.svg"
  },
  {
    id: 5,
    name: "Institut Agricole du Congo",
    acronym: "IAC",
    address: "Route de la Corniche, Niari",
    department: "niari",
    phone: "+242 XX XXX XXXX",
    email: "contact@iac.cg",
    website: "www.iac.cg",
    accreditationDate: "18/11/2018",
    programs: ["agriculture", "sciences"],
    description: "L'Institut Agricole du Congo forme des spécialistes en agronomie, développement rural et gestion des ressources naturelles. Il dispose d'exploitations expérimentales pour la formation pratique des étudiants.",
    logo: "/placeholder.svg"
  },
  {
    id: 6,
    name: "Académie des Arts et Technologies",
    acronym: "AAT",
    address: "17 Rue des Artisans, Pointe-Noire",
    department: "pointe-noire",
    phone: "+242 XX XXX XXXX",
    email: "info@aat.cg",
    website: "www.aat.cg",
    accreditationDate: "22/05/2019",
    programs: ["arts", "informatique"],
    description: "L'Académie des Arts et Technologies propose des formations au croisement des arts numériques, du design et des technologies. Elle forme des créatifs polyvalents capables d'innover dans divers secteurs.",
    logo: "/placeholder.svg"
  },
];

const SchoolDirectory = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedDepartment, setSelectedDepartment] = useState("all");
  const [selectedProgram, setSelectedProgram] = useState("all");
  const [selectedSchool, setSelectedSchool] = useState<typeof schools[0] | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  
  // Filter schools based on search, department and program
  const filteredSchools = schools.filter(school => {
    const matchesSearch = searchQuery === "" || 
                        school.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                        school.acronym.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesDepartment = selectedDepartment === "all" || school.department === selectedDepartment;
    const matchesProgram = selectedProgram === "all" || school.programs.includes(selectedProgram);
    return matchesSearch && matchesDepartment && matchesProgram;
  });
  
  const viewSchoolDetails = (school: typeof schools[0]) => {
    setSelectedSchool(school);
    setIsDialogOpen(true);
  };
  
  return (
    <div className="space-y-8">
      <div>
        <h1 className="page-title">Annuaire des Établissements</h1>
        <p className="text-muted-foreground mt-2">
          Consultez la liste des établissements privés reconnus par l'État
        </p>
      </div>
      
      <Card className="shadow-sm">
        <CardHeader>
          <CardTitle>Recherche d'établissements</CardTitle>
          <CardDescription>
            Filtrez par nom, département ou filière proposée
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label htmlFor="search" className="text-sm font-medium block mb-2">
                Rechercher
              </label>
              <Input
                id="search"
                placeholder="Nom ou acronyme..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            
            <div>
              <label htmlFor="department" className="text-sm font-medium block mb-2">
                Département
              </label>
              <select 
                id="department" 
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                value={selectedDepartment}
                onChange={(e) => setSelectedDepartment(e.target.value)}
              >
                <option value="all">Tous les départements</option>
                {departments.map(dept => (
                  <option key={dept.id} value={dept.id}>{dept.name}</option>
                ))}
              </select>
            </div>
            
            <div>
              <label htmlFor="program" className="text-sm font-medium block mb-2">
                Filière
              </label>
              <select 
                id="program" 
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                value={selectedProgram}
                onChange={(e) => setSelectedProgram(e.target.value)}
              >
                <option value="all">Toutes les filières</option>
                {programs.map(prog => (
                  <option key={prog.id} value={prog.id}>{prog.name}</option>
                ))}
              </select>
            </div>
          </div>
        </CardContent>
      </Card>
      
      <Tabs defaultValue="grid" className="w-full">
        <TabsList className="grid w-full max-w-[200px] grid-cols-2">
          <TabsTrigger value="grid">Grille</TabsTrigger>
          <TabsTrigger value="list">Liste</TabsTrigger>
        </TabsList>
        
        <TabsContent value="grid" className="mt-6">
          {filteredSchools.length === 0 ? (
            <div className="text-center p-8 text-muted-foreground">
              Aucun établissement ne correspond à votre recherche.
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredSchools.map(school => (
                <Card key={school.id} className="overflow-hidden hover:shadow-md transition-shadow cursor-pointer card-hover" onClick={() => viewSchoolDetails(school)}>
                  <div className="h-40 bg-muted flex items-center justify-center">
                    <img 
                      src={school.logo} 
                      alt={`${school.name} Logo`} 
                      className="max-h-32 max-w-[80%]"
                    />
                  </div>
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle className="line-clamp-2 h-14">
                          {school.name}
                          <span className="text-sm font-normal text-muted-foreground ml-2">
                            ({school.acronym})
                          </span>
                        </CardTitle>
                        <CardDescription>
                          {departments.find(d => d.id === school.department)?.name}
                        </CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {school.programs.map(progId => {
                        const program = programs.find(p => p.id === progId);
                        return program ? (
                          <Badge key={progId} variant="secondary">
                            {program.name}
                          </Badge>
                        ) : null;
                      })}
                    </div>
                    <Button className="w-full">Voir détails</Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </TabsContent>
        
        <TabsContent value="list" className="mt-6">
          {filteredSchools.length === 0 ? (
            <div className="text-center p-8 text-muted-foreground">
              Aucun établissement ne correspond à votre recherche.
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="text-left border-b">
                    <th className="p-2">Établissement</th>
                    <th className="p-2">Département</th>
                    <th className="p-2">Filières</th>
                    <th className="p-2">Contact</th>
                    <th className="p-2">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredSchools.map(school => (
                    <tr key={school.id} className="border-b hover:bg-muted/50">
                      <td className="p-2">
                        <div className="font-medium">{school.name}</div>
                        <div className="text-sm text-muted-foreground">{school.acronym}</div>
                      </td>
                      <td className="p-2">
                        {departments.find(d => d.id === school.department)?.name}
                      </td>
                      <td className="p-2">
                        <div className="flex flex-wrap gap-1">
                          {school.programs.slice(0, 2).map(progId => {
                            const program = programs.find(p => p.id === progId);
                            return program ? (
                              <Badge key={progId} variant="outline" className="mr-1 mb-1">
                                {program.name}
                              </Badge>
                            ) : null;
                          })}
                          {school.programs.length > 2 && (
                            <Badge variant="outline" className="mr-1 mb-1">
                              +{school.programs.length - 2}
                            </Badge>
                          )}
                        </div>
                      </td>
                      <td className="p-2">
                        <div className="text-sm">{school.phone}</div>
                        <div className="text-sm text-muted-foreground">{school.email}</div>
                      </td>
                      <td className="p-2">
                        <Button size="sm" onClick={() => viewSchoolDetails(school)}>
                          Détails
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </TabsContent>
      </Tabs>
      
      {/* School Details Dialog */}
      {selectedSchool && (
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogContent className="sm:max-w-[700px]">
            <DialogHeader>
              <DialogTitle>{selectedSchool.name} ({selectedSchool.acronym})</DialogTitle>
              <DialogDescription>
                Établissement accrédité le {selectedSchool.accreditationDate}
              </DialogDescription>
            </DialogHeader>
            
            <div className="grid sm:grid-cols-3 gap-6 pt-4">
              <div className="sm:col-span-1 flex justify-center">
                <img 
                  src={selectedSchool.logo} 
                  alt={`${selectedSchool.name} Logo`} 
                  className="max-w-full max-h-40"
                />
              </div>
              
              <div className="sm:col-span-2">
                <h3 className="font-semibold text-lg mb-2">Présentation</h3>
                <p className="text-sm mb-4">{selectedSchool.description}</p>
                
                <h3 className="font-semibold text-lg mb-2">Filières proposées</h3>
                <div className="flex flex-wrap gap-2 mb-4">
                  {selectedSchool.programs.map(progId => {
                    const program = programs.find(p => p.id === progId);
                    return program ? (
                      <Badge key={progId} variant="secondary">
                        {program.name}
                      </Badge>
                    ) : null;
                  })}
                </div>
                
                <h3 className="font-semibold text-lg mb-2">Informations de contact</h3>
                <div className="space-y-1 text-sm">
                  <p>
                    <strong>Adresse :</strong> {selectedSchool.address}
                  </p>
                  <p>
                    <strong>Département :</strong> {departments.find(d => d.id === selectedSchool.department)?.name}
                  </p>
                  <p>
                    <strong>Téléphone :</strong> {selectedSchool.phone}
                  </p>
                  <p>
                    <strong>Email :</strong> {selectedSchool.email}
                  </p>
                  <p>
                    <strong>Site web :</strong> {selectedSchool.website}
                  </p>
                </div>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
};

export default SchoolDirectory;
