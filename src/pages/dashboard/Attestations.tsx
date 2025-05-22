
import { useState } from "react";
import { Search, Download, FileText, Printer } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
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
  DialogFooter,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { jsPDF } from "jspdf";
import { QRCodeSVG } from "qrcode.react";

// Mock data for students with attestation data
const mockAttestations = [
  { id: 1, student: "Jean Makosso", matricule: "STU20230001", date: "2023-06-15", type: "Licence", niveau: "Licence 3", filiere: "Informatique", status: "delivered" },
  { id: 2, student: "Marie Bakala", matricule: "STU20230002", date: "2023-06-20", type: "Licence", niveau: "Licence 3", filiere: "Gestion", status: "pending" },
  { id: 3, student: "Paul Nguesso", matricule: "STU20230003", date: "2023-07-05", type: "Master", niveau: "Master 2", filiere: "Informatique", status: "delivered" },
  { id: 4, student: "Sophie Mbemba", matricule: "STU20230004", date: "2023-07-10", type: "Licence", niveau: "Licence 3", filiere: "Droit", status: "pending" },
];

// Mock data for student selection
const mockStudents = [
  { id: 1, name: "Jean Makosso", matricule: "STU20230001", niveau: "Licence 3", filiere: "Informatique" },
  { id: 2, name: "Marie Bakala", matricule: "STU20230002", niveau: "Licence 3", filiere: "Gestion" },
  { id: 3, name: "Paul Nguesso", matricule: "STU20230003", niveau: "Master 2", filiere: "Informatique" },
  { id: 4, name: "Sophie Mbemba", matricule: "STU20230004", niveau: "Licence 3", filiere: "Droit" },
  { id: 5, name: "David Mouanda", matricule: "STU20230005", niveau: "Master 2", filiere: "Gestion" },
];

const DashboardAttestations = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState("");
  const [attestationType, setAttestationType] = useState("success");
  const [isGenerating, setIsGenerating] = useState(false);
  const [previewAttestationData, setPreviewAttestationData] = useState<any>(null);
  const { toast } = useToast();

  // Filter attestations based on search term
  const filteredAttestations = mockAttestations.filter(attestation => {
    return attestation.student.toLowerCase().includes(searchTerm.toLowerCase()) ||
           attestation.matricule.toLowerCase().includes(searchTerm.toLowerCase());
  });

  // Find student by matricule for attestation generation
  const findStudentByMatricule = (matricule: string) => {
    return mockStudents.find(student => student.matricule === matricule);
  };

  // Generate attestation preview
  const handlePreviewAttestation = () => {
    if (!selectedStudent) {
      toast({
        title: "Erreur",
        description: "Veuillez sélectionner un étudiant.",
        variant: "destructive",
      });
      return;
    }
    
    const student = findStudentByMatricule(selectedStudent);
    if (student) {
      setPreviewAttestationData({
        ...student,
        attestationType,
        date: new Date().toISOString().split('T')[0],
        id: mockAttestations.length + 1,
        verificationUrl: `https://votre-ecole.edu/verify/${selectedStudent}`,
      });
    }
  };

  // Generate PDF attestation
  const generatePDF = () => {
    if (!previewAttestationData) return;
    
    setIsGenerating(true);
    
    setTimeout(() => {
      try {
        // Create a new jsPDF instance
        const doc = new jsPDF({
          orientation: "portrait",
          unit: "mm",
          format: "a4",
        });
        
        // Set document properties
        doc.setProperties({
          title: `Attestation de ${attestationType === "success" ? "Réussite" : "Scolarité"} - ${previewAttestationData.name}`,
          subject: `Attestation pour ${previewAttestationData.name}`,
          author: "École Supérieure",
          creator: "Système de Gestion Académique",
        });
        
        // Add school header
        doc.setFontSize(22);
        doc.setFont("helvetica", "bold");
        doc.text("ÉCOLE SUPÉRIEURE", 105, 20, { align: "center" });
        doc.setFontSize(16);
        doc.setFont("helvetica", "normal");
        doc.text("RÉPUBLIQUE DU CONGO", 105, 30, { align: "center" });
        
        // Add line separator
        doc.setLineWidth(0.5);
        doc.line(20, 35, 190, 35);
        
        // Add title
        doc.setFontSize(20);
        doc.setFont("helvetica", "bold");
        doc.text(`ATTESTATION DE ${attestationType === "success" ? "RÉUSSITE" : "SCOLARITÉ"}`, 105, 50, { align: "center" });
        
        // Add main content
        doc.setFontSize(12);
        doc.setFont("helvetica", "normal");
        
        const contentText = attestationType === "success" 
          ? `Je soussigné, Directeur de l'École Supérieure, atteste que :\n\n
             M./Mme ${previewAttestationData.name}, immatriculé(e) sous le numéro ${previewAttestationData.matricule},\n
             a suivi avec succès les enseignements et validé les examens du niveau\n
             ${previewAttestationData.niveau} en ${previewAttestationData.filiere}, pour l'année académique 2023-2024.\n\n
             L'intéressé(e) ne présente aucune dette envers l'établissement et a obtenu tous les\n
             crédits nécessaires pour valider son année académique.\n\n
             Cette attestation lui est délivrée pour servir et valoir ce que de droit.`
          : `Je soussigné, Directeur de l'École Supérieure, atteste que :\n\n
             M./Mme ${previewAttestationData.name}, immatriculé(e) sous le numéro ${previewAttestationData.matricule},\n
             est régulièrement inscrit(e) et suit les cours du niveau ${previewAttestationData.niveau}\n
             en ${previewAttestationData.filiere}, pour l'année académique 2023-2024.\n\n
             Cette attestation lui est délivrée pour servir et valoir ce que de droit.`;
        
        doc.text(contentText, 25, 70);
        
        // Add date
        const currentDate = new Date().toLocaleDateString('fr-FR', {
          year: 'numeric',
          month: 'long',
          day: 'numeric'
        });
        doc.text(`Fait à Brazzaville, le ${currentDate}`, 130, 160, { align: "left" });
        
        // Add signature section
        doc.setFontSize(11);
        doc.text("Le Directeur,", 150, 175, { align: "center" });
        doc.addImage("data:image/png;base64,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", 'PNG', 130, 180, 30, 15);
        doc.setFontSize(10);
        doc.text("Prof. Jean KOSSA", 150, 205, { align: "center" });
        
        // Add QR Code
        // In a real implementation you would generate this from previewAttestationData.verificationUrl
        const qrImage = document.getElementById('qr-code') as HTMLElement;
        if (qrImage) {
          const svgData = new XMLSerializer().serializeToString(qrImage.querySelector('svg') as SVGElement);
          const canvas = document.createElement('canvas');
          const ctx = canvas.getContext('2d');
          const img = new Image();
          const svg = new Blob([svgData], {type: 'image/svg+xml;charset=utf-8'});
          const url = URL.createObjectURL(svg);
          
          img.onload = function() {
            canvas.width = img.width;
            canvas.height = img.height;
            ctx?.drawImage(img, 0, 0);
            const imgData = canvas.toDataURL('image/png');
            doc.addImage(imgData, 'PNG', 30, 160, 40, 40);
            
            // Save the PDF
            doc.save(`attestation_${previewAttestationData.name.replace(' ', '_')}.pdf`);
            
            setIsGenerating(false);
            URL.revokeObjectURL(url);
            
            toast({
              title: "Exportation réussie",
              description: "L'attestation a été générée et téléchargée avec succès.",
            });
          };
          
          img.src = url;
        } else {
          // Fallback if QR code element is not available
          doc.save(`attestation_${previewAttestationData.name.replace(' ', '_')}.pdf`);
          setIsGenerating(false);
          
          toast({
            title: "Exportation réussie",
            description: "L'attestation a été générée et téléchargée avec succès.",
          });
        }
      } catch (error) {
        console.error("Error generating PDF:", error);
        toast({
          title: "Erreur",
          description: "Une erreur est survenue lors de la génération du PDF.",
          variant: "destructive",
        });
        setIsGenerating(false);
      }
    }, 500);
  };

  // Generate and save attestation
  const handleGenerateAttestation = () => {
    if (!selectedStudent) {
      toast({
        title: "Erreur",
        description: "Veuillez sélectionner un étudiant.",
        variant: "destructive",
      });
      return;
    }

    setIsGenerating(true);
    
    setTimeout(() => {
      toast({
        title: "Attestation créée",
        description: "L'attestation a été générée avec succès.",
      });
      
      setIsDialogOpen(false);
      setIsGenerating(false);
      setSelectedStudent("");
      setAttestationType("success");
    }, 1500);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Attestations</h1>
        <p className="text-muted-foreground mt-2">
          Générez et gérez les attestations pour les étudiants
        </p>
      </div>

      <div className="flex flex-col sm:flex-row gap-4 justify-between">
        <div className="flex gap-4 flex-1">
          <div className="relative flex-1">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Rechercher une attestation..."
              className="pl-8"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
        <div className="flex gap-2">
          <Button variant="default" onClick={() => setIsDialogOpen(true)}>
            <FileText className="mr-2 h-4 w-4" />
            Nouvelle Attestation
          </Button>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Attestations Générées</CardTitle>
          <CardDescription>
            {filteredAttestations.length} attestations générées
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Matricule</TableHead>
                <TableHead>Étudiant</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Niveau</TableHead>
                <TableHead>Filière</TableHead>
                <TableHead>Statut</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredAttestations.map((attestation) => (
                <TableRow key={attestation.id}>
                  <TableCell className="font-medium">{attestation.matricule}</TableCell>
                  <TableCell>{attestation.student}</TableCell>
                  <TableCell>{new Date(attestation.date).toLocaleDateString()}</TableCell>
                  <TableCell>{attestation.type}</TableCell>
                  <TableCell>{attestation.niveau}</TableCell>
                  <TableCell>{attestation.filiere}</TableCell>
                  <TableCell>
                    <Badge variant={attestation.status === "delivered" ? "default" : "outline"}>
                      {attestation.status === "delivered" ? "Délivrée" : "En attente"}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Button variant="outline" size="icon">
                      <Download className="h-4 w-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
              {filteredAttestations.length === 0 && (
                <TableRow>
                  <TableCell colSpan={8} className="text-center py-4">
                    Aucune attestation trouvée
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* New Attestation Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-4xl">
          <DialogHeader>
            <DialogTitle>Génération d'Attestation</DialogTitle>
            <DialogDescription>
              Créez une nouvelle attestation pour un étudiant
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-6 py-4">
            <div className="space-y-4">
              <div className="grid grid-cols-1 gap-4">
                <div>
                  <label className="text-sm font-medium mb-1 block">Sélectionner un étudiant</label>
                  <Select value={selectedStudent} onValueChange={setSelectedStudent}>
                    <SelectTrigger>
                      <SelectValue placeholder="Sélectionner un étudiant" />
                    </SelectTrigger>
                    <SelectContent>
                      {mockStudents.map((student) => (
                        <SelectItem key={student.id} value={student.matricule}>
                          {student.name} - {student.matricule}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="text-sm font-medium mb-1 block">Type d'attestation</label>
                  <Select value={attestationType} onValueChange={setAttestationType}>
                    <SelectTrigger>
                      <SelectValue placeholder="Type d'attestation" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="success">Attestation de réussite</SelectItem>
                      <SelectItem value="enrollment">Attestation de scolarité</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>

            {previewAttestationData && (
              <Card className="mt-6">
                <CardHeader className="text-center border-b">
                  <CardTitle>ÉCOLE SUPÉRIEURE</CardTitle>
                  <CardDescription>RÉPUBLIQUE DU CONGO</CardDescription>
                </CardHeader>
                <CardContent className="pt-6">
                  <div className="text-center mb-4">
                    <h2 className="font-bold text-xl">
                      ATTESTATION DE {attestationType === "success" ? "RÉUSSITE" : "SCOLARITÉ"}
                    </h2>
                  </div>

                  <div className="flex justify-between gap-4">
                    <div id="qr-code" className="flex-shrink-0 hidden">
                      <QRCodeSVG 
                        value={previewAttestationData.verificationUrl} 
                        size={120} 
                      />
                    </div>

                    <div className="flex-grow space-y-4">
                      <p className="text-sm">
                        Je soussigné, Directeur de l'École Supérieure, atteste que :
                      </p>
                      <p className="text-sm font-semibold">
                        M./Mme {previewAttestationData.name}, immatriculé(e) sous le numéro {previewAttestationData.matricule},
                      </p>
                      {attestationType === "success" ? (
                        <p className="text-sm">
                          a suivi avec succès les enseignements et validé les examens du niveau {previewAttestationData.niveau} en {previewAttestationData.filiere},
                          pour l'année académique 2023-2024.
                          <br /><br />
                          L'intéressé(e) ne présente aucune dette envers l'établissement et a obtenu tous les crédits nécessaires pour valider son année académique.
                        </p>
                      ) : (
                        <p className="text-sm">
                          est régulièrement inscrit(e) et suit les cours du niveau {previewAttestationData.niveau} en {previewAttestationData.filiere},
                          pour l'année académique 2023-2024.
                        </p>
                      )}
                      <p className="text-sm">
                        Cette attestation lui est délivrée pour servir et valoir ce que de droit.
                      </p>
                    </div>

                    <div id="qr-code" className="flex-shrink-0">
                      <QRCodeSVG 
                        value={previewAttestationData.verificationUrl || "https://example.com"} 
                        size={120} 
                      />
                    </div>
                  </div>

                  <div className="flex justify-end mt-8">
                    <div className="text-right">
                      <p className="text-sm">
                        Fait à Brazzaville, le {new Date().toLocaleDateString('fr-FR', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric'
                        })}
                      </p>
                      <div className="mt-2">
                        <p className="text-sm">Le Directeur,</p>
                        <div className="h-12 w-28 mt-2 mb-1">
                          <img 
                            src="data:image/png;base64,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" 
                            alt="Signature" 
                            className="h-full w-full object-contain"
                          />
                        </div>
                        <p className="text-xs">Prof. Jean KOSSA</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-end gap-2">
                  <Button 
                    variant="outline" 
                    onClick={generatePDF}
                    disabled={isGenerating}
                  >
                    <Printer className="mr-2 h-4 w-4" />
                    {isGenerating ? "Génération en cours..." : "Exporter en PDF"}
                  </Button>
                </CardFooter>
              </Card>
            )}
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
              Annuler
            </Button>
            {!previewAttestationData ? (
              <Button onClick={handlePreviewAttestation}>
                Aperçu
              </Button>
            ) : (
              <Button 
                onClick={handleGenerateAttestation}
                disabled={isGenerating}
              >
                {isGenerating ? "Génération en cours..." : "Générer"}
              </Button>
            )}
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default DashboardAttestations;
