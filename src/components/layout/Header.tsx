
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { 
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";
import { useIsMobile } from "@/hooks/use-mobile";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const isMobile = useIsMobile();

  const navLinks = [
    { name: 'Accueil', path: '/' },
    { name: 'Tableau de Bord', path: '/dashboard' },
    { name: 'Étudiants', path: '/students' },
    { name: 'Attestations', path: '/attestations' },
    { name: 'Ressources', path: '/resources' },
    { name: 'Forum', path: '/forum' },
    { name: 'Annuaire', path: '/directory' },
  ];

  return (
    <header className="bg-dgesup-primary text-white shadow-md">
      <div className="protail-container py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <img 
              src="/placeholder.svg" 
              alt="DGESUP Logo" 
              className="w-12 h-12" 
            />
            <div>
              <h1 className="font-bold text-xl">Protail DGESUP</h1>
              <p className="text-xs">Établissements Privés - Congo Brazzaville</p>
            </div>
          </div>

          {isMobile ? (
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="text-white">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="3" y1="12" x2="21" y2="12"></line>
                    <line x1="3" y1="6" x2="21" y2="6"></line>
                    <line x1="3" y1="18" x2="21" y2="18"></line>
                  </svg>
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="bg-dgesup-primary text-white">
                <nav className="flex flex-col space-y-4 mt-8">
                  {navLinks.map((link) => (
                    <Link 
                      key={link.path}
                      to={link.path}
                      className="py-2 px-4 hover:bg-dgesup-secondary rounded-md transition-colors"
                      onClick={() => setIsOpen(false)}
                    >
                      {link.name}
                    </Link>
                  ))}
                  <Button asChild variant="secondary" className="mt-4">
                    <Link to="/login">Connexion</Link>
                  </Button>
                </nav>
              </SheetContent>
            </Sheet>
          ) : (
            <div className="flex items-center space-x-6">
              <nav className="hidden md:flex items-center space-x-6">
                {navLinks.map((link, index) => (
                  index < 4 && (
                    <Link 
                      key={link.path}
                      to={link.path}
                      className="text-sm font-medium hover:text-dgesup-accent transition-colors"
                    >
                      {link.name}
                    </Link>
                  )
                ))}
                <div className="relative group">
                  <button className="text-sm font-medium hover:text-dgesup-accent transition-colors flex items-center">
                    Plus
                    <svg className="ml-1 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>
                  <div className="absolute left-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-10 hidden group-hover:block">
                    {navLinks.map((link, index) => (
                      index >= 4 && (
                        <Link 
                          key={link.path}
                          to={link.path}
                          className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        >
                          {link.name}
                        </Link>
                      )
                    ))}
                  </div>
                </div>
              </nav>
              <Button asChild variant="secondary">
                <Link to="/login">Connexion</Link>
              </Button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
