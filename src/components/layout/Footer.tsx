
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-gradient-to-br from-dgesup-primary via-dgesup-secondary to-dgesup-primary text-white relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width=\"60\" height=\"60\" viewBox=\"0 0 60 60\" xmlns=\"http://www.w3.org/2000/svg\"%3E%3Cg fill=\"none\" fill-rule=\"evenodd\"%3E%3Cg fill=\"%23ffffff\" fill-opacity=\"0.05\"%3E%3Ccircle cx=\"30\" cy=\"30\" r=\"2\"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-30"></div>
      
      <div className="protail-container py-16 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div className="md:col-span-2">
            <div className="flex items-center space-x-4 mb-6">
              <img 
                src="/lovable-uploads/ea49272b-cb75-4074-b109-fad823e259cf.png" 
                alt="République du Congo" 
                className="w-16 h-16 object-contain bg-white/10 rounded-xl p-2" 
              />
              <div>
                <h3 className="text-2xl font-bold">Portail DGESUP</h3>
                <p className="text-gray-200">Direction Générale de l'Enseignement Supérieur</p>
              </div>
            </div>
            <p className="text-gray-300 leading-relaxed max-w-md">
              La plateforme officielle du Ministère de l'Enseignement Supérieur de la République du Congo, 
              dédiée à la modernisation et à l'excellence de l'enseignement supérieur privé.
            </p>
          </div>
          
          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4 text-yellow-300">Liens Rapides</h4>
            <ul className="space-y-3">
              <li>
                <Link to="/" className="text-gray-300 hover:text-white transition-colors duration-200 hover:underline">
                  Accueil
                </Link>
              </li>
              <li>
                <Link to="/directory" className="text-gray-300 hover:text-white transition-colors duration-200 hover:underline">
                  Annuaire
                </Link>
              </li>
              <li>
                <Link to="/login" className="text-gray-300 hover:text-white transition-colors duration-200 hover:underline">
                  Portail Privé
                </Link>
              </li>
            </ul>
          </div>
          
          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-semibold mb-4 text-yellow-300">Contact</h4>
            <div className="space-y-3 text-gray-300">
              <p className="flex items-start">
                <span className="font-medium text-white mr-2">Adresse:</span>
                Ministère de l'Enseignement Supérieur<br />
                Brazzaville, République du Congo
              </p>
              <p>
                <span className="font-medium text-white">Email:</span> contact@dgesup.cg
              </p>
              <p>
                <span className="font-medium text-white">Tél:</span> +242 XX XXX XXXX
              </p>
            </div>
          </div>
        </div>
        
        {/* Bottom Section */}
        <div className="border-t border-white/20 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-300 text-sm">
              © 2024 DGESUP - République du Congo. Tous droits réservés.
            </p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <a href="#" className="text-gray-300 hover:text-white transition-colors duration-200 text-sm hover:underline">
                Mentions légales
              </a>
              <a href="#" className="text-gray-300 hover:text-white transition-colors duration-200 text-sm hover:underline">
                Politique de confidentialité
              </a>
              <a href="#" className="text-gray-300 hover:text-white transition-colors duration-200 text-sm hover:underline">
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
