
import { useState } from "react";
import { Search, FileCheck, Printer, Eye } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

// Mock attestations data
const mockAttestations = [
  { id: 1, etudiant: "Marie Bakala", matricule: "STU20230002", type: "Réussite", date: "16/05/2023", status: "generated" },
  { id: 2, etudiant: "Jean Makosso", matricule: "STU20230001", type: "Réussite", date: "15/05/2023", status: "generated" },
  { id: 3, etudiant: "Paul Nguesso", matricule: "STU20230003", type: "Réussite", date: "14/05/2023", status: "pending" },
  { id: 4, etudiant: "Sophie Mbemba", matricule: "STU20230004", type: "Réussite", date: "13/05/2023", status: "pending" },
];

const AttestationPreview = ({ etudiant, matricule, type, date }: any) => (
  <div className="p-6 bg-white dark:bg-zinc-900 border rounded-lg">
    <div className="flex flex-col items-center mb-6">
      <img 
        src="/lovable-uploads/8edc322a-90a1-42d5-87f1-0aabc3e173a9.png" 
        alt="DGESUP Logo" 
        className="w-24 h-24 mb-2"
      />
      <h2 className="text-2xl font-bold text-center">République du Congo</h2>
      <h3 className="text-xl font-semibold text-center">Ministère de l'Enseignement Supérieur</h3>
      <h4 className="text-lg font-medium text-center">Direction Générale de l'Enseignement Supérieur</h4>
    </div>
    
    <div className="mb-6 text-center">
      <h1 className="text-2xl font-bold mb-2">ATTESTATION DE RÉUSSITE</h1>
      <p className="text-sm">N° {Math.floor(Math.random() * 10000).toString().padStart(4, '0')}/DGESUP/2023</p>
    </div>
    
    <div className="space-y-4 mb-6">
      <p className="text-justify">
        Le Directeur Général de l'Enseignement Supérieur atteste que l'étudiant(e) <strong>{etudiant}</strong>,
        immatriculé(e) sous le numéro <strong>{matricule}</strong>, a satisfait à l'ensemble des épreuves
        requises pour l'obtention du diplôme et est déclaré(e) <strong>ADMIS(E)</strong>.
      </p>
      
      <p className="text-right">Fait à Brazzaville, le {date}</p>
    </div>
    
    <div className="flex justify-between items-end">
      <div className="w-1/3">
        <p className="text-sm font-semibold">L'étudiant(e)</p>
        <div className="h-16 border-b border-dashed"></div>
      </div>
      
      <div className="w-1/3 text-center">
        <div className="h-20 w-20 mx-auto border rounded-full flex items-center justify-center text-xs">
          SCEAU
        </div>
      </div>
      
      <div className="w-1/3 text-right">
        <p className="text-sm font-semibold">Le Directeur</p>
        <div className="h-16 border-b border-dashed"></div>
      </div>
    </div>
  </div>
);

const DashboardAttestations = () => {
  const [searchTerm, setSearchTerm] = useState("");
  
  // Filter attestations based on search term
  const filteredAttestations = mockAttestations.filter(attestation => 
    attestation.etudiant.toLowerCase().includes(searchTerm.toLowerCase()) || 
    attestation.matricule.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Gestion des Attestations</h1>
        <p className="text-muted-foreground mt-2">
          Générer et gérer les attestations de réussite pour les étudiants.
        </p>
      </div>

      <div className="flex flex-col sm:flex-row gap-4 justify-between">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Rechercher un étudiant ou matricule..."
            className="pl-8"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <Button variant="default">
          <FileCheck className="mr-2 h-4 w-4" />
          Nouvelle Attestation
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Attestations</CardTitle>
          <CardDescription>
            Générer et imprimer des attestations de réussite pour les étudiants.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Matricule</TableHead>
                <TableHead>Nom et Prénom</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Statut</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredAttestations.map((attestation) => (
                <TableRow key={attestation.id}>
                  <TableCell className="font-medium">{attestation.matricule}</TableCell>
                  <TableCell>{attestation.etudiant}</TableCell>
                  <TableCell>Attestation de {attestation.type}</TableCell>
                  <TableCell>{attestation.date}</TableCell>
                  <TableCell>
                    <Badge variant={attestation.status === "generated" ? "default" : "outline"}>
                      {attestation.status === "generated" ? "Généré" : "En attente"}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex space-x-2">
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button variant="outline" size="sm">
                            <Eye className="h-4 w-4" />
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="max-w-4xl">
                          <DialogHeader>
                            <DialogTitle>Aperçu de l'attestation</DialogTitle>
                            <DialogDescription>
                              Attestation de {attestation.type} pour {attestation.etudiant}
                            </DialogDescription>
                          </DialogHeader>
                          <AttestationPreview {...attestation} />
                        </DialogContent>
                      </Dialog>
                      <Button variant="outline" size="sm">
                        <Printer className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
              {filteredAttestations.length === 0 && (
                <TableRow>
                  <TableCell colSpan={6} className="text-center py-4">
                    Aucune attestation trouvée
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default DashboardAttestations;
