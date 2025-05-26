
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import { useState } from "react";

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <header className="bg-white/95 backdrop-blur-md shadow-lg border-b border-gray-100 sticky top-0 z-50">
      <div className="protail-container">
        <div className="flex items-center justify-between h-20">
          <Link to="/" className="flex items-center space-x-4 group">
            <div className="relative">
              <img 
                src="/lovable-uploads/ea49272b-cb75-4074-b109-fad823e259cf.png" 
                alt="République du Congo" 
                className="w-14 h-14 object-contain transition-transform duration-300 group-hover:scale-105" 
              />
              <div className="absolute inset-0 bg-gradient-to-r from-dgesup-primary/20 to-dgesup-accent/20 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </div>
            <div className="hidden sm:block">
              <h1 className="font-bold text-xl text-dgesup-primary">Portail DGESUP</h1>
              <p className="text-sm text-muted-foreground leading-tight">Direction Générale de l'Enseignement Supérieur</p>
            </div>
          </Link>
          
          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-8">
            <Link to="/" className="text-gray-700 hover:text-dgesup-primary transition-all duration-300 font-medium relative group">
              Accueil
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-dgesup-primary transition-all duration-300 group-hover:w-full"></span>
            </Link>
            <Link to="/directory" className="text-gray-700 hover:text-dgesup-primary transition-all duration-300 font-medium relative group">
              Annuaire des établissements
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-dgesup-primary transition-all duration-300 group-hover:w-full"></span>
            </Link>
            <Link to="/login" className="text-gray-700 hover:text-dgesup-primary transition-all duration-300 font-medium relative group">
              Portail Privé
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-dgesup-primary transition-all duration-300 group-hover:w-full"></span>
            </Link>
          </nav>
          
          {/* CTA Button & Mobile Menu */}
          <div className="flex items-center space-x-4">
            <Button asChild className="hidden sm:flex bg-gradient-to-r from-dgesup-primary to-dgesup-secondary hover:from-dgesup-secondary hover:to-dgesup-primary transition-all duration-300 shadow-lg hover:shadow-xl">
              <Link to="/login">Connexion</Link>
            </Button>
            
            {/* Mobile Menu Button */}
            <button 
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors duration-200"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
        
        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="lg:hidden border-t border-gray-100 bg-white/95 backdrop-blur-md">
            <nav className="py-4 space-y-2">
              <Link 
                to="/" 
                className="block px-4 py-3 text-gray-700 hover:text-dgesup-primary hover:bg-gray-50 rounded-lg transition-all duration-200 font-medium"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Accueil
              </Link>
              <Link 
                to="/directory" 
                className="block px-4 py-3 text-gray-700 hover:text-dgesup-primary hover:bg-gray-50 rounded-lg transition-all duration-200 font-medium"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Annuaire des établissements
              </Link>
              <Link 
                to="/login" 
                className="block px-4 py-3 text-gray-700 hover:text-dgesup-primary hover:bg-gray-50 rounded-lg transition-all duration-200 font-medium"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Portail Privé
              </Link>
              <div className="px-4 pt-2">
                <Button asChild className="w-full bg-gradient-to-r from-dgesup-primary to-dgesup-secondary hover:from-dgesup-secondary hover:to-dgesup-primary">
                  <Link to="/login" onClick={() => setIsMobileMenuOpen(false)}>Connexion</Link>
                </Button>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
