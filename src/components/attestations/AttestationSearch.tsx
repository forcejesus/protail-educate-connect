
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";

interface AttestationSearchProps {
  searchTerm: string;
  setSearchTerm: (value: string) => void;
}

const AttestationSearch = ({ searchTerm, setSearchTerm }: AttestationSearchProps) => {
  return (
    <div className="relative flex-1">
      <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
      <Input
        placeholder="Rechercher une attestation..."
        className="pl-8"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
    </div>
  );
};

export default AttestationSearch;
