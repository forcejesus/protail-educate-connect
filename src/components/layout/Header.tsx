
import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
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
  const location = useLocation();

  const navLinks = [
    { name: 'Accueil', path: '/' },
    { name: 'Tableau de Bord', path: '/dashboard' },
    { name: 'Étudiants', path: '/students' },
    { name: 'Attestations', path: '/attestations' },
    { name: 'Ressources', path: '/resources' },
    { name: 'Forum', path: '/forum' },
    { name: 'Annuaire', path: '/directory' },
  ];

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <div className="protail-container py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <img 
              src="/lovable-uploads/8edc322a-90a1-42d5-87f1-0aabc3e173a9.png" 
              alt="DGESUP Logo" 
              className="w-12 h-12 object-contain" 
            />
            <div>
              <h1 className="font-bold text-xl">Protail <span className="text-[#e11e1e]">DGESUP</span></h1>
              <p className="text-xs text-gray-600">Établissements Privés - Congo Brazzaville</p>
            </div>
          </div>

          {isMobile ? (
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="text-gray-700">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="3" y1="12" x2="21" y2="12"></line>
                    <line x1="3" y1="6" x2="21" y2="6"></line>
                    <line x1="3" y1="18" x2="21" y2="18"></line>
                  </svg>
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="bg-white">
                <div className="flex items-center space-x-3 mb-8">
                  <img 
                    src="/lovable-uploads/8edc322a-90a1-42d5-87f1-0aabc3e173a9.png" 
                    alt="DGESUP Logo" 
                    className="w-10 h-10 object-contain" 
                  />
                  <h2 className="font-bold text-lg">Protail <span className="text-[#e11e1e]">DGESUP</span></h2>
                </div>
                <nav className="flex flex-col space-y-1">
                  {navLinks.map((link, index) => (
                    <Link 
                      key={link.path}
                      to={link.path}
                      className={`py-2 px-4 rounded-md transition-colors animate-slide-in ${
                        isActive(link.path) 
                          ? "bg-[#e11e1e]/10 text-[#e11e1e] font-medium" 
                          : "hover:bg-gray-100"
                      }`}
                      onClick={() => setIsOpen(false)}
                      style={{ animationDelay: `${(index + 1) * 50}ms` }}
                    >
                      {link.name}
                    </Link>
                  ))}
                  <div className="pt-4">
                    <Button asChild className="w-full btn-congo">
                      <Link to="/login">Connexion</Link>
                    </Button>
                  </div>
                </nav>
              </SheetContent>
            </Sheet>
          ) : (
            <div className="flex items-center space-x-1">
              <nav className="hidden md:flex items-center">
                {navLinks.map((link, index) => (
                  index < 4 && (
                    <Link 
                      key={link.path}
                      to={link.path}
                      className={`px-3 py-2 rounded-md text-sm font-medium mx-1 transition-colors ${
                        isActive(link.path) 
                          ? "text-[#e11e1e] bg-[#e11e1e]/5" 
                          : "text-gray-700 hover:text-[#e11e1e] hover:bg-[#e11e1e]/5"
                      }`}
                    >
                      {link.name}
                    </Link>
                  )
                ))}
                <div className="relative group mx-1">
                  <button className="px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:text-[#e11e1e] hover:bg-[#e11e1e]/5 transition-colors flex items-center">
                    Plus
                    <svg className="ml-1 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>
                  <div className="absolute left-0 mt-1 w-48 bg-white rounded-md shadow-lg py-1 z-10 hidden group-hover:block animate-fade-in">
                    {navLinks.map((link, index) => (
                      index >= 4 && (
                        <Link 
                          key={link.path}
                          to={link.path}
                          className={`block px-4 py-2 text-sm ${
                            isActive(link.path) 
                              ? "text-[#e11e1e] bg-[#e11e1e]/5" 
                              : "text-gray-700 hover:bg-gray-100"
                          }`}
                        >
                          {link.name}
                        </Link>
                      )
                    ))}
                  </div>
                </div>
              </nav>
              <Button asChild className="ml-4 bg-[#e11e1e] hover:bg-[#c71a1a] text-white">
                <Link to="/login">Connexion</Link>
              </Button>
            </div>
          )}
        </div>
      </div>
      {/* Congo flag color bar */}
      <div className="h-1 congo-gradient"></div>
    </header>
  );
};

export default Header;
