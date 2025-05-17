
import LoginForm from "@/components/auth/LoginForm";
import { Link } from "react-router-dom";

const Login = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50">
      <div className="mb-8 text-center">
        <Link to="/" className="inline-flex items-center space-x-2">
          <img 
            src="/placeholder.svg" 
            alt="DGESUP Logo" 
            className="w-12 h-12" 
          />
          <div>
            <h1 className="font-bold text-lg text-dgesup-primary">Protail DGESUP</h1>
            <p className="text-xs text-muted-foreground">Établissements Privés</p>
          </div>
        </Link>
      </div>
      
      <LoginForm />
      
      <div className="mt-8">
        <p className="text-sm text-muted-foreground">
          Besoin d'aide? Contactez <a href="#" className="text-dgesup-accent hover:underline">l'équipe support</a>
        </p>
      </div>
    </div>
  );
};

export default Login;
