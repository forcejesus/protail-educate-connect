
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { ArrowRight, Shield, Users, Award, Globe, Zap, BookOpen } from "lucide-react";

const Index = () => {
  const features = [
    {
      title: "Gestion des Inscriptions",
      description: "Gérez les inscriptions de vos étudiants via un formulaire complet et sécurisé.",
      icon: <Users className="h-8 w-8 text-dgesup-accent" />,
      color: "from-blue-500/10 to-blue-600/10",
      borderColor: "border-blue-200"
    },
    {
      title: "Génération d'Attestations",
      description: "Créez des attestations officielles sécurisées par QR Code pour vos étudiants.",
      icon: <Award className="h-8 w-8 text-dgesup-accent" />,
      color: "from-green-500/10 to-green-600/10",
      borderColor: "border-green-200"
    },
    {
      title: "Analyse Statistique",
      description: "Visualisez des statistiques détaillées sur vos effectifs par niveau, filière et genre.",
      icon: <Zap className="h-8 w-8 text-dgesup-accent" />,
      color: "from-yellow-500/10 to-yellow-600/10",
      borderColor: "border-yellow-200"
    },
    {
      title: "Ressources Officielles",
      description: "Accédez aux documents officiels du ministère (arrêtés, circulaires, formulaires).",
      icon: <BookOpen className="h-8 w-8 text-dgesup-accent" />,
      color: "from-purple-500/10 to-purple-600/10",
      borderColor: "border-purple-200"
    },
    {
      title: "Forum d'Informations",
      description: "Restez informé des actualités et communiquez avec les autres établissements et la DGESUP.",
      icon: <Globe className="h-8 w-8 text-dgesup-accent" />,
      color: "from-indigo-500/10 to-indigo-600/10",
      borderColor: "border-indigo-200"
    },
    {
      title: "Annuaire des Établissements",
      description: "Consultez l'annuaire complet des établissements publics et privés reconnus par l'État.",
      icon: <Shield className="h-8 w-8 text-dgesup-accent" />,
      color: "from-red-500/10 to-red-600/10",
      borderColor: "border-red-200"
    }
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow">
        {/* Hero Section moderne */}
        <section className="relative bg-gradient-to-br from-dgesup-primary via-dgesup-secondary to-dgesup-primary text-white overflow-hidden">
          {/* Animated background elements */}
          <div className="absolute inset-0">
            <div className="absolute top-20 left-20 w-72 h-72 bg-white/5 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse"></div>
            <div className="absolute top-40 right-20 w-96 h-96 bg-yellow-400/10 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse" style={{animationDelay: '2s'}}></div>
            <div className="absolute -bottom-20 left-40 w-80 h-80 bg-green-400/10 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse" style={{animationDelay: '4s'}}></div>
          </div>
          
          <div className="container mx-auto px-4 py-24 md:py-32 relative z-10">
            <div className="max-w-4xl mx-auto text-center">
              <div className="mb-8 animate-fade-in">
                <h1 className="text-5xl md:text-7xl font-bold leading-tight mb-6">
                  Portail <span className="text-yellow-300">DGESUP</span>
                </h1>
                <div className="space-y-4">
                  <h2 className="text-xl md:text-2xl font-semibold text-gray-200">
                    Direction Générale de l'Enseignement Supérieur
                  </h2>
                  <p className="text-lg md:text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
                    La plateforme officielle pour la gestion de l'enseignement supérieur privé en République du Congo. 
                    Modernisation, transparence et excellence académique au service du développement national.
                  </p>
                </div>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-6 justify-center animate-scale-in">
                <Button asChild size="lg" className="bg-yellow-500 text-black hover:bg-yellow-400 shadow-2xl hover:shadow-yellow-500/25 transition-all duration-300 group transform hover:scale-105 border-2 border-yellow-400">
                  <Link to="/login" className="flex items-center">
                    Accéder au Portail Privé 
                    <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </Button>
                <Button asChild size="lg" variant="outline" className="border-white/50 text-white hover:bg-white/20 backdrop-blur-sm transition-all duration-300 transform hover:scale-105 border-2">
                  <Link to="/directory">Consulter l'Annuaire</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Mission Section modernisée */}
        <section className="py-20 bg-white relative">
          <div className="absolute inset-0 bg-gradient-to-b from-gray-50/50 to-white"></div>
          <div className="container mx-auto px-4 relative">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-dgesup-primary mb-6">Notre Mission</h2>
              <p className="text-xl text-muted-foreground max-w-4xl mx-auto leading-relaxed">
                La Direction Générale de l'Enseignement Supérieur œuvre pour la modernisation et la qualité 
                de l'enseignement supérieur en République du Congo, en accompagnant les établissements privés 
                dans leur mission éducative.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
              <div className="group text-center p-8 rounded-2xl bg-gradient-to-b from-white to-gray-50 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
                <div className="w-20 h-20 bg-gradient-to-br from-dgesup-primary to-dgesup-secondary rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                  <Shield className="w-10 h-10 text-white" />
                </div>
                <h3 className="text-xl font-semibold mb-4">Régulation & Contrôle</h3>
                <p className="text-muted-foreground">Supervision et accréditation des établissements privés d'enseignement supérieur</p>
              </div>
              
              <div className="group text-center p-8 rounded-2xl bg-gradient-to-b from-white to-gray-50 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
                <div className="w-20 h-20 bg-gradient-to-br from-yellow-500 to-yellow-600 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                  <Zap className="w-10 h-10 text-white" />
                </div>
                <h3 className="text-xl font-semibold mb-4">Innovation Numérique</h3>
                <p className="text-muted-foreground">Modernisation des processus administratifs par le numérique</p>
              </div>
              
              <div className="group text-center p-8 rounded-2xl bg-gradient-to-b from-white to-gray-50 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
                <div className="w-20 h-20 bg-gradient-to-br from-green-500 to-green-600 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                  <BookOpen className="w-10 h-10 text-white" />
                </div>
                <h3 className="text-xl font-semibold mb-4">Excellence Académique</h3>
                <p className="text-muted-foreground">Promotion de la qualité et de l'excellence dans l'enseignement supérieur</p>
              </div>
            </div>
          </div>
        </section>
        
        {/* Features Section modernisée */}
        <section className="py-20 bg-gradient-to-b from-gray-50 to-white">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-dgesup-primary mb-6">Services du Portail DGESUP</h2>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                Des outils modernes pour optimiser la gestion administrative de votre établissement
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {features.map((feature, index) => (
                <div 
                  key={index} 
                  className={`group p-8 bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border-l-4 ${feature.borderColor} relative overflow-hidden`}
                >
                  <div className={`absolute inset-0 bg-gradient-to-br ${feature.color} opacity-0 group-hover:opacity-100 transition-opacity duration-300`}></div>
                  <div className="relative z-10">
                    <div className="mb-6 group-hover:scale-110 transition-transform duration-300">
                      {feature.icon}
                    </div>
                    <h3 className="text-xl font-semibold mb-4 text-dgesup-primary group-hover:text-dgesup-secondary transition-colors">
                      {feature.title}
                    </h3>
                    <p className="text-muted-foreground leading-relaxed">
                      {feature.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Statistics Section modernisée */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-dgesup-primary mb-6">Impact du Portail DGESUP</h2>
              <p className="text-xl text-muted-foreground">
                La transformation numérique de l'enseignement supérieur en chiffres
              </p>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              <div className="group bg-gradient-to-br from-dgesup-primary to-dgesup-secondary p-8 rounded-2xl text-white text-center shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2">
                <div className="text-5xl font-bold mb-3 group-hover:scale-110 transition-transform">45+</div>
                <div className="text-lg font-medium mb-1">Établissements</div>
                <div className="text-sm opacity-90">agréés et connectés</div>
              </div>
              
              <div className="group bg-gradient-to-br from-green-500 to-green-600 p-8 rounded-2xl text-white text-center shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2">
                <div className="text-5xl font-bold mb-3 group-hover:scale-110 transition-transform">12k+</div>
                <div className="text-lg font-medium mb-1">Étudiants</div>
                <div className="text-sm opacity-90">dans le système</div>
              </div>
              
              <div className="group bg-gradient-to-br from-yellow-500 to-yellow-600 p-8 rounded-2xl text-white text-center shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2">
                <div className="text-5xl font-bold mb-3 group-hover:scale-110 transition-transform">5k+</div>
                <div className="text-lg font-medium mb-1">Attestations</div>
                <div className="text-sm opacity-90">sécurisées par QR code</div>
              </div>
              
              <div className="group bg-gradient-to-br from-red-500 to-red-600 p-8 rounded-2xl text-white text-center shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2">
                <div className="text-5xl font-bold mb-3 group-hover:scale-110 transition-transform">98%</div>
                <div className="text-lg font-medium mb-1">Satisfaction</div>
                <div className="text-sm opacity-90">des établissements</div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section modernisée */}
        <section className="relative bg-gradient-to-br from-dgesup-primary via-dgesup-secondary to-dgesup-primary text-white py-20 overflow-hidden">
          <div className="absolute inset-0">
            <div className="absolute top-10 left-10 w-64 h-64 bg-white/5 rounded-full mix-blend-multiply filter blur-xl opacity-70"></div>
            <div className="absolute bottom-10 right-10 w-80 h-80 bg-yellow-400/10 rounded-full mix-blend-multiply filter blur-xl opacity-70"></div>
          </div>
          
          <div className="container mx-auto px-4 text-center relative z-10">
            <div className="flex justify-center mb-8">
              <div className="relative">
                <img 
                  src="/lovable-uploads/ea49272b-cb75-4074-b109-fad823e259cf.png" 
                  alt="République du Congo" 
                  className="w-20 h-20 object-contain bg-white/10 rounded-2xl p-3 backdrop-blur-sm" 
                />
                <div className="absolute inset-0 bg-gradient-to-r from-yellow-400/20 to-green-400/20 rounded-2xl blur-lg"></div>
              </div>
            </div>
            <h2 className="text-4xl font-bold mb-8">Rejoignez le Portail DGESUP</h2>
            <p className="text-xl mb-10 max-w-3xl mx-auto opacity-90 leading-relaxed">
              Votre établissement privé souhaite intégrer la plateforme officielle du Ministère ? 
              Contactez la Direction Générale de l'Enseignement Supérieur pour débuter le processus d'accréditation.
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <Button asChild size="lg" className="bg-yellow-500 text-black hover:bg-yellow-400 shadow-2xl hover:shadow-yellow-500/25 transition-all duration-300 group transform hover:scale-105 border-2 border-yellow-400">
                <a href="#" className="flex items-center">
                  Demande d'Accréditation
                  <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </a>
              </Button>
              <Button asChild size="lg" variant="outline" className="border-white/50 text-white hover:bg-white/20 backdrop-blur-sm transition-all duration-300 transform hover:scale-105 border-2">
                <Link to="/directory">Consulter l'Annuaire</Link>
              </Button>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;
