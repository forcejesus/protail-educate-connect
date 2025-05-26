
import { Link } from "react-router-dom";
import { Mail, Phone, MapPin, ExternalLink } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-gradient-to-br from-dgesup-primary via-dgesup-secondary to-dgesup-primary text-white relative overflow-hidden">
      {/* Decorative elements with modern pattern */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 25% 25%, rgba(255,255,255,0.1) 0%, transparent 50%),
                           radial-gradient(circle at 75% 75%, rgba(255,255,255,0.05) 0%, transparent 50%)`,
        }}></div>
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-yellow-400 via-green-400 to-red-400"></div>
      </div>
      
      <div className="container mx-auto px-4 py-16 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div className="md:col-span-2">
            <div className="flex items-center space-x-4 mb-6">
              <div className="relative">
                <img 
                  src="/lovable-uploads/ea49272b-cb75-4074-b109-fad823e259cf.png" 
                  alt="République du Congo" 
                  className="w-16 h-16 object-contain bg-white/20 rounded-xl p-2 backdrop-blur-sm" 
                />
                <div className="absolute inset-0 bg-gradient-to-br from-yellow-400/20 to-green-400/20 rounded-xl"></div>
              </div>
              <div>
                <h3 className="text-2xl font-bold bg-gradient-to-r from-yellow-300 to-white bg-clip-text text-transparent">
                  Portail DGESUP
                </h3>
                <p className="text-gray-200">Direction Générale de l'Enseignement Supérieur</p>
              </div>
            </div>
            <p className="text-gray-300 leading-relaxed max-w-md mb-6">
              La plateforme officielle du Ministère de l'Enseignement Supérieur de la République du Congo, 
              dédiée à la modernisation et à l'excellence de l'enseignement supérieur.
            </p>
            <div className="flex space-x-4">
              <div className="w-8 h-8 bg-white/10 rounded-lg flex items-center justify-center backdrop-blur-sm hover:bg-white/20 transition-colors cursor-pointer">
                <ExternalLink className="w-4 h-4" />
              </div>
              <div className="w-8 h-8 bg-white/10 rounded-lg flex items-center justify-center backdrop-blur-sm hover:bg-white/20 transition-colors cursor-pointer">
                <Mail className="w-4 h-4" />
              </div>
            </div>
          </div>
          
          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-6 text-yellow-300 flex items-center">
              <div className="w-1 h-6 bg-yellow-300 rounded-full mr-3"></div>
              Liens Rapides
            </h4>
            <ul className="space-y-4">
              <li>
                <Link to="/" className="text-gray-300 hover:text-white transition-all duration-200 hover:translate-x-1 flex items-center group">
                  <span className="w-0 group-hover:w-2 h-0.5 bg-yellow-300 transition-all duration-200 mr-0 group-hover:mr-2"></span>
                  Accueil
                </Link>
              </li>
              <li>
                <Link to="/directory" className="text-gray-300 hover:text-white transition-all duration-200 hover:translate-x-1 flex items-center group">
                  <span className="w-0 group-hover:w-2 h-0.5 bg-yellow-300 transition-all duration-200 mr-0 group-hover:mr-2"></span>
                  Annuaire
                </Link>
              </li>
              <li>
                <Link to="/login" className="text-gray-300 hover:text-white transition-all duration-200 hover:translate-x-1 flex items-center group">
                  <span className="w-0 group-hover:w-2 h-0.5 bg-yellow-300 transition-all duration-200 mr-0 group-hover:mr-2"></span>
                  Portail Privé
                </Link>
              </li>
            </ul>
          </div>
          
          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-semibold mb-6 text-yellow-300 flex items-center">
              <div className="w-1 h-6 bg-yellow-300 rounded-full mr-3"></div>
              Contact
            </h4>
            <div className="space-y-4 text-gray-300">
              <div className="flex items-start space-x-3">
                <MapPin className="w-5 h-5 text-yellow-300 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="font-medium text-white">Adresse</p>
                  <p className="text-sm">
                    Ministère de l'Enseignement Supérieur<br />
                    Brazzaville, République du Congo
                  </p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="w-5 h-5 text-yellow-300 flex-shrink-0" />
                <div>
                  <p className="font-medium text-white">Email</p>
                  <p className="text-sm">contact@dgesup.cg</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="w-5 h-5 text-yellow-300 flex-shrink-0" />
                <div>
                  <p className="font-medium text-white">Téléphone</p>
                  <p className="text-sm">+242 XX XXX XXXX</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Bottom Section */}
        <div className="border-t border-white/20 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-300 text-sm flex items-center">
              <span className="w-2 h-2 bg-green-400 rounded-full mr-2 animate-pulse"></span>
              © 2024 DGESUP - République du Congo. Tous droits réservés.
            </p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <a href="#" className="text-gray-300 hover:text-white transition-all duration-200 text-sm hover:translate-y-[-1px] border-b border-transparent hover:border-white">
                Mentions légales
              </a>
              <a href="#" className="text-gray-300 hover:text-white transition-all duration-200 text-sm hover:translate-y-[-1px] border-b border-transparent hover:border-white">
                Politique de confidentialité
              </a>
              <a href="#" className="text-gray-300 hover:text-white transition-all duration-200 text-sm hover:translate-y-[-1px] border-b border-transparent hover:border-white">
                Contact
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
