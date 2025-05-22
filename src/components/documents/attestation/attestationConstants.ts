
// Mock data for dropdowns
export const departments = [
  { id: "info", name: "Informatique" },
  { id: "gest", name: "Gestion" },
  { id: "droit", name: "Droit" },
  { id: "med", name: "Médecine" },
  { id: "eco", name: "Économie" },
  { id: "com", name: "Communication" },
];

export const levels = [
  { id: "l1", name: "Licence 1" },
  { id: "l2", name: "Licence 2" },
  { id: "l3", name: "Licence 3" },
  { id: "m1", name: "Master 1" },
  { id: "m2", name: "Master 2" },
  { id: "doc", name: "Doctorat" },
];

export const academicYears = [
  { id: "2023-2024", name: "2023-2024" },
  { id: "2022-2023", name: "2022-2023" },
  { id: "2021-2022", name: "2021-2022" },
];

export const mentions = [
  { id: "passable", name: "Passable" },
  { id: "bien", name: "Bien" },
  { id: "tres-bien", name: "Très Bien" },
  { id: "excellent", name: "Excellent" },
];

// Mock previous attestations
export const previousAttestations = [
  { id: "ATT-2023-001", studentName: "Jean Makosso", type: "Attestation de Réussite", date: "15/05/2023", level: "Licence 2", department: "Informatique" },
  { id: "ATT-2023-002", studentName: "Marie Bakala", type: "Attestation de Fin d'Études", date: "10/05/2023", level: "Master 2", department: "Gestion" },
  { id: "ATT-2023-003", studentName: "Pierre Nkouka", type: "Attestation de Réussite", date: "05/05/2023", level: "Licence 3", department: "Droit" },
  { id: "ATT-2022-042", studentName: "Sophie Mbemba", type: "Attestation de Fin d'Études", date: "22/09/2022", level: "Master 2", department: "Communication" },
  { id: "ATT-2022-041", studentName: "André Loutaya", type: "Attestation de Réussite", date: "20/09/2022", level: "Licence 1", department: "Informatique" },
];

// Utility functions
export const generateAttestationId = () => {
  const currentYear = new Date().getFullYear();
  const randomNum = Math.floor(1000 + Math.random() * 9000);
  return `ATT-${currentYear}-${randomNum}`;
};

export const getQrCodeUrl = (id: string) => {
  return `https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${encodeURIComponent(
    `https://dgesup.cg/verification/${id}`
  )}`;
};
