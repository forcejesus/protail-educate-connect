
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
  { id: "ingenierie", name: "Ingénierie" },
  { id: "education", name: "Sciences de l'Éducation" },
];

// Mock schools with both public and private
const schools = [
  // Public Schools
  {
    id: 1,
    name: "Université Marien Ngouabi",
    acronym: "UMNG",
    address: "BP 69, Brazzaville",
    department: "brazzaville",
    phone: "+242 81 XX XX XX",
    email: "contact@umng.cg",
    website: "www.umng.cg",
    accreditationDate: "01/01/1971",
    programs: ["sciences", "medecine", "droit", "gestion", "ingenierie"],
    description: "L'Université Marien Ngouabi est la principale université publique du Congo, créée en 1971. Elle offre une large gamme de formations dans tous les domaines.",
    logo: "/placeholder.svg",
    type: "public"
  },
  {
    id: 2,
    name: "École Nationale Supérieure Polytechnique",
    acronym: "ENSP",
    address: "Avenue des Martyrs, Brazzaville",
    department: "brazzaville",
    phone: "+242 81 XX XX XX",
    email: "contact@ensp.cg",
    website: "www.ensp.cg",
    accreditationDate: "15/09/1985",
    programs: ["ingenierie", "informatique", "sciences"],
    description: "L'École Nationale Supérieure Polytechnique forme des ingénieurs dans diverses spécialités techniques et technologiques.",
    logo: "/placeholder.svg",
    type: "public"
  },
  {
    id: 3,
    name: "École Normale Supérieure",
    acronym: "ENS",
    address: "Rue de l'École Normale, Brazzaville",
    department: "brazzaville",
    phone: "+242 81 XX XX XX",
    email: "contact@ens.cg",
    website: "www.ens.cg",
    accreditationDate: "10/03/1961",
    programs: ["education", "sciences", "arts"],
    description: "L'École Normale Supérieure forme les enseignants du secondaire et les cadres de l'éducation nationale.",
    logo: "/placeholder.svg",
    type: "public"
  },
  // Private Schools
  {
    id: 4,
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
    logo: "/placeholder.svg",
    type: "private"
  },
  {
    id: 5,
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
    logo: "/placeholder.svg",
    type: "private"
  },
  {
    id: 6,
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
    logo: "/placeholder.svg",
    type: "private"
  },
];

const SchoolDirectory = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedDepartment, setSelectedDepartment] = useState("all");
  const [selectedProgram, setSelectedProgram] = useState("all");
  const [selectedType, setSelectedType] = useState("all");
  const [selectedSchool, setSelectedSchool] = useState<typeof schools[0] | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  
  // Filter schools based on search, department, program and type
  const filteredSchools = schools.filter(school => {
    const matchesSearch = searchQuery === "" || 
                        school.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                        school.acronym.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesDepartment = selectedDepartment === "all" || school.department === selectedDepartment;
    const matchesProgram = selectedProgram === "all" || school.programs.includes(selectedProgram);
    const matchesType = selectedType === "all" || school.type === selectedType;
    return matchesSearch && matchesDepartment && matchesProgram && matchesType;
  });
  
  const viewSchoolDetails = (school: typeof schools[0]) => {
    setSelectedSchool(school);
    setIsDialogOpen(true);
  };
  
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Annuaire des Établissements</h1>
        <p className="text-muted-foreground">
          Consultez la liste des établissements d'enseignement supérieur publics et privés reconnus par l'État
        </p>
      </div>
      
      <Card className="shadow-lg border-l-4 border-dgesup-primary">
        <CardHeader className="bg-gradient-to-r from-dgesup-primary/5 to-dgesup-secondary/5">
          <CardTitle className="text-dgesup-primary">Recherche d'établissements</CardTitle>
          <CardDescription>
            Filtrez par nom, type, département ou filière proposée
          </CardDescription>
        </CardHeader>
        <CardContent className="pt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div>
              <label htmlFor="search" className="text-sm font-medium block mb-2 text-gray-700">
                Rechercher
              </label>
              <Input
                id="search"
                placeholder="Nom ou acronyme..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="border-gray-300 focus:border-dgesup-primary focus:ring-dgesup-primary"
              />
            </div>
            
            <div>
              <label htmlFor="type" className="text-sm font-medium block mb-2 text-gray-700">
                Type d'établissement
              </label>
              <select 
                id="type" 
                className="flex h-10 w-full rounded-md border border-gray-300 bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-dgesup-primary focus:border-dgesup-primary"
                value={selectedType}
                onChange={(e) => setSelectedType(e.target.value)}
              >
                <option value="all">Tous les types</option>
                <option value="public">Établissements publics</option>
                <option value="private">Établissements privés</option>
              </select>
            </div>
            
            <div>
              <label htmlFor="department" className="text-sm font-medium block mb-2 text-gray-700">
                Département
              </label>
              <select 
                id="department" 
                className="flex h-10 w-full rounded-md border border-gray-300 bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-dgesup-primary focus:border-dgesup-primary"
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
              <label htmlFor="program" className="text-sm font-medium block mb-2 text-gray-700">
                Filière
              </label>
              <select 
                id="program" 
                className="flex h-10 w-full rounded-md border border-gray-300 bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-dgesup-primary focus:border-dgesup-primary"
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
          
          <div className="mt-4 flex flex-wrap gap-2">
            <div className="text-sm text-gray-600">
              <span className="font-medium">{filteredSchools.length}</span> établissement(s) trouvé(s)
            </div>
          </div>
        </CardContent>
      </Card>
      
      <Tabs defaultValue="grid" className="w-full">
        <TabsList className="grid w-full max-w-[200px] grid-cols-2 bg-gray-100">
          <TabsTrigger value="grid" className="data-[state=active]:bg-dgesup-primary data-[state=active]:text-white">Grille</TabsTrigger>
          <TabsTrigger value="list" className="data-[state=active]:bg-dgesup-primary data-[state=active]:text-white">Liste</TabsTrigger>
        </TabsList>
        
        <TabsContent value="grid" className="mt-6">
          {filteredSchools.length === 0 ? (
            <div className="text-center p-8 text-muted-foreground bg-gray-50 rounded-lg">
              <p className="text-lg">Aucun établissement ne correspond à votre recherche.</p>
              <p className="text-sm mt-2">Essayez de modifier vos critères de recherche.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredSchools.map(school => (
                <Card key={school.id} className="overflow-hidden hover:shadow-xl transition-all duration-300 cursor-pointer group border-2 hover:border-dgesup-primary/50" onClick={() => viewSchoolDetails(school)}>
                  <div className="h-40 bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center relative">
                    <img 
                      src={school.logo} 
                      alt={`${school.name} Logo`} 
                      className="max-h-32 max-w-[80%] object-contain"
                    />
                    <Badge 
                      className={`absolute top-2 right-2 ${school.type === 'public' ? 'bg-green-500' : 'bg-blue-500'}`}
                    >
                      {school.type === 'public' ? 'Public' : 'Privé'}
                    </Badge>
                  </div>
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle className="line-clamp-2 h-14 group-hover:text-dgesup-primary transition-colors">
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
                      {school.programs.slice(0, 3).map(progId => {
                        const program = programs.find(p => p.id === progId);
                        return program ? (
                          <Badge key={progId} variant="secondary" className="text-xs">
                            {program.name}
                          </Badge>
                        ) : null;
                      })}
                      {school.programs.length > 3 && (
                        <Badge variant="outline" className="text-xs">
                          +{school.programs.length - 3}
                        </Badge>
                      )}
                    </div>
                    <Button className="w-full bg-dgesup-primary hover:bg-dgesup-secondary transition-all duration-300 shadow-md hover:shadow-lg">
                      Voir détails
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </TabsContent>
        
        <TabsContent value="list" className="mt-6">
          {filteredSchools.length === 0 ? (
            <div className="text-center p-8 text-muted-foreground bg-gray-50 rounded-lg">
              <p className="text-lg">Aucun établissement ne correspond à votre recherche.</p>
              <p className="text-sm mt-2">Essayez de modifier vos critères de recherche.</p>
            </div>
          ) : (
            <div className="overflow-x-auto bg-white rounded-lg shadow-sm border">
              <table className="w-full border-collapse">
                <thead className="bg-gray-50">
                  <tr className="text-left border-b">
                    <th className="p-4 font-semibold text-gray-700">Établissement</th>
                    <th className="p-4 font-semibold text-gray-700">Type</th>
                    <th className="p-4 font-semibold text-gray-700">Département</th>
                    <th className="p-4 font-semibold text-gray-700">Filières</th>
                    <th className="p-4 font-semibold text-gray-700">Contact</th>
                    <th className="p-4 font-semibold text-gray-700">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredSchools.map(school => (
                    <tr key={school.id} className="border-b hover:bg-gray-50 transition-colors">
                      <td className="p-4">
                        <div className="font-medium text-gray-900">{school.name}</div>
                        <div className="text-sm text-muted-foreground">{school.acronym}</div>
                      </td>
                      <td className="p-4">
                        <Badge 
                          className={`${school.type === 'public' ? 'bg-green-500' : 'bg-blue-500'}`}
                        >
                          {school.type === 'public' ? 'Public' : 'Privé'}
                        </Badge>
                      </td>
                      <td className="p-4">
                        {departments.find(d => d.id === school.department)?.name}
                      </td>
                      <td className="p-4">
                        <div className="flex flex-wrap gap-1">
                          {school.programs.slice(0, 2).map(progId => {
                            const program = programs.find(p => p.id === progId);
                            return program ? (
                              <Badge key={progId} variant="outline" className="text-xs">
                                {program.name}
                              </Badge>
                            ) : null;
                          })}
                          {school.programs.length > 2 && (
                            <Badge variant="outline" className="text-xs">
                              +{school.programs.length - 2}
                            </Badge>
                          )}
                        </div>
                      </td>
                      <td className="p-4">
                        <div className="text-sm">{school.phone}</div>
                        <div className="text-sm text-muted-foreground">{school.email}</div>
                      </td>
                      <td className="p-4">
                        <Button 
                          size="sm" 
                          onClick={() => viewSchoolDetails(school)}
                          className="bg-dgesup-primary hover:bg-dgesup-secondary transition-all duration-300 shadow-sm hover:shadow-md"
                        >
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
              <DialogTitle className="flex items-center gap-3">
                {selectedSchool.name} ({selectedSchool.acronym})
                <Badge 
                  className={`${selectedSchool.type === 'public' ? 'bg-green-500' : 'bg-blue-500'}`}
                >
                  {selectedSchool.type === 'public' ? 'Public' : 'Privé'}
                </Badge>
              </DialogTitle>
              <DialogDescription>
                Établissement {selectedSchool.type === 'public' ? 'public créé' : 'accrédité'} le {selectedSchool.accreditationDate}
              </DialogDescription>
            </DialogHeader>
            
            <div className="grid sm:grid-cols-3 gap-6 pt-4">
              <div className="sm:col-span-1 flex justify-center">
                <img 
                  src={selectedSchool.logo} 
                  alt={`${selectedSchool.name} Logo`} 
                  className="max-w-full max-h-40 object-contain"
                />
              </div>
              
              <div className="sm:col-span-2">
                <h3 className="font-semibold text-lg mb-2 text-dgesup-primary">Présentation</h3>
                <p className="text-sm mb-4 text-gray-700">{selectedSchool.description}</p>
                
                <h3 className="font-semibold text-lg mb-2 text-dgesup-primary">Filières proposées</h3>
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
                
                <h3 className="font-semibold text-lg mb-2 text-dgesup-primary">Informations de contact</h3>
                <div className="space-y-2 text-sm text-gray-700">
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
