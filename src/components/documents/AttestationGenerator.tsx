
import { useState } from 'react';
import { useToast } from "@/hooks/use-toast";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AttestationForm } from "./attestation/AttestationForm";
import { AttestationPreview } from "./attestation/AttestationPreview";
import AttestationHistory from "./attestation/AttestationHistory";
import { AttestationFormValues } from "./attestation/attestationSchema";

const AttestationGenerator = () => {
  const { toast } = useToast();
  const [isGenerating, setIsGenerating] = useState(false);
  const [showPreview, setShowPreview] = useState(false);
  const [attestationPreview, setAttestationPreview] = useState<AttestationFormValues | null>(null);
  
  async function onSubmit(data: AttestationFormValues) {
    setIsGenerating(true);
    
    // Simulate API call delay
    setTimeout(() => {
      console.log("Attestation generation submitted:", data);
      
      setAttestationPreview(data);
      setShowPreview(true);
      setIsGenerating(false);
      
      toast({
        title: "Attestation générée",
        description: "L'attestation a été générée avec succès",
      });
    }, 2000);
  }

  const handlePrint = () => {
    window.print();
    setShowPreview(false);
  };

  return (
    <div className="space-y-8">
      <Tabs defaultValue="generate" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="generate">Générer une attestation</TabsTrigger>
          <TabsTrigger value="history">Historique</TabsTrigger>
        </TabsList>
        
        <TabsContent value="generate" className="mt-6">
          <Card className="shadow-md">
            <CardHeader>
              <CardTitle>Générer une attestation</CardTitle>
              <CardDescription>Créer une attestation officielle avec QR Code</CardDescription>
            </CardHeader>
            <CardContent>
              <AttestationForm 
                onSubmit={onSubmit}
                isGenerating={isGenerating}
              />
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="history" className="mt-6">
          <Card className="shadow-md">
            <CardHeader>
              <CardTitle>Historique des attestations</CardTitle>
              <CardDescription>Attestations précédemment générées</CardDescription>
            </CardHeader>
            <CardContent>
              <AttestationHistory />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
      
      {/* Attestation Preview Dialog */}
      <Dialog open={showPreview} onOpenChange={setShowPreview}>
        <DialogContent className="max-w-4xl h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Aperçu de l'attestation</DialogTitle>
            <DialogDescription>
              Vérifiez les informations avant d'imprimer
            </DialogDescription>
          </DialogHeader>
          
          {attestationPreview && (
            <AttestationPreview 
              attestationData={attestationPreview}
              onPrint={handlePrint}
              onClose={() => setShowPreview(false)}
            />
          )}
          
          <div className="flex justify-end space-x-2 mt-4">
            <Button variant="outline" onClick={() => setShowPreview(false)}>
              Fermer
            </Button>
            <Button onClick={handlePrint}>
              Imprimer
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AttestationGenerator;
