
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const Header = () => {
  return (
    <header className="bg-white shadow-sm border-b">
      <div className="protail-container">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center space-x-3">
            <img 
              src="/lovable-uploads/ea49272b-cb75-4074-b109-fad823e259cf.png" 
              alt="République du Congo" 
              className="w-12 h-12 object-contain" 
            />
            <div>
              <h1 className="font-bold text-lg text-dgesup-primary">Protail DGESUP</h1>
              <p className="text-xs text-muted-foreground">Direction Générale de l'Enseignement Supérieur</p>
            </div>
          </Link>
          
          <nav className="hidden md:flex items-center space-x-8">
            <Link to="/" className="text-gray-700 hover:text-dgesup-primary transition-colors">
              Accueil
            </Link>
            <Link to="/directory" className="text-gray-700 hover:text-dgesup-primary transition-colors">
              Annuaire des établissements
            </Link>
            <Link to="/login" className="text-gray-700 hover:text-dgesup-primary transition-colors">
              Portail Privé
            </Link>
          </nav>
          
          <Button asChild className="bg-dgesup-primary hover:bg-dgesup-secondary">
            <Link to="/login">Connexion</Link>
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Header;
