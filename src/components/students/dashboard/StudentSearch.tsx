
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select";

interface StudentSearchProps {
  searchTerm: string;
  selectedFiliere: string;
  onSearchChange: (value: string) => void;
  onFiliereChange: (value: string) => void;
}

export const StudentSearch = ({ 
  searchTerm, 
  selectedFiliere, 
  onSearchChange, 
  onFiliereChange 
}: StudentSearchProps) => {
  return (
    <div className="flex gap-4 flex-1">
      <div className="relative flex-1">
        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Rechercher un étudiant..."
          className="pl-8"
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
        />
      </div>
      <Select value={selectedFiliere} onValueChange={onFiliereChange}>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Filière" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>Filières</SelectLabel>
            <SelectItem value="all">Toutes les filières</SelectItem>
            <SelectItem value="Informatique">Informatique</SelectItem>
            <SelectItem value="Gestion">Gestion</SelectItem>
            <SelectItem value="Droit">Droit</SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  );
};
