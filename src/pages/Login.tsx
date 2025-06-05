
import LoginForm from "@/components/auth/LoginForm";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

const Login = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-indigo-100 relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-yellow-400 via-green-400 to-red-400"></div>
        <div className="absolute top-20 left-20 w-72 h-72 bg-dgesup-primary/5 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse"></div>
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-dgesup-secondary/10 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse" style={{animationDelay: '2s'}}></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-dgesup-accent/5 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse" style={{animationDelay: '4s'}}></div>
      </div>

      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen p-4">
        {/* Header avec logo */}
        <div className="mb-8 text-center">
          <Link to="/" className="inline-flex items-center space-x-3 group">
            <img 
              src="/lovable-uploads/ea49272b-cb75-4074-b109-fad823e259cf.png" 
              alt="DGESUP Logo" 
              className="w-16 h-16 object-contain transition-transform duration-300 group-hover:scale-105" 
            />
            <div className="text-left">
              <h1 className="font-bold text-2xl text-dgesup-primary">Portail DGESUP</h1>
              <p className="text-sm text-gray-600">Direction Générale de l'Enseignement Supérieur</p>
            </div>
          </Link>
        </div>
        
        {/* Formulaire de connexion */}
        <LoginForm />
        
        {/* Lien de retour */}
        <div className="mt-8 text-center">
          <Link 
            to="/" 
            className="inline-flex items-center space-x-2 text-gray-600 hover:text-dgesup-primary transition-all duration-200 group"
          >
            <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
            <span>Retour à l'accueil</span>
          </Link>
        </div>
        
        {/* Support */}
        <div className="mt-6 text-center">
          <p className="text-sm text-gray-500">
            Besoin d'aide? Contactez{" "}
            <a 
              href="#" 
              className="text-dgesup-accent hover:text-dgesup-primary transition-colors duration-200 font-medium hover:underline"
            >
              l'équipe support
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
