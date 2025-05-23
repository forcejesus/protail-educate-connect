
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

const Index = () => {
  const features = [
    {
      title: "Gestion des Inscriptions",
      description: "Gérez les inscriptions de vos étudiants via un formulaire complet et sécurisé.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-dgesup-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
        </svg>
      )
    },
    {
      title: "Génération d'Attestations",
      description: "Créez des attestations officielles sécurisées par QR Code pour vos étudiants.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-dgesup-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
      )
    },
    {
      title: "Analyse Statistique",
      description: "Visualisez des statistiques détaillées sur vos effectifs par niveau, filière et genre.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-dgesup-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
        </svg>
      )
    },
    {
      title: "Ressources Officielles",
      description: "Accédez aux documents officiels du ministère (arrêtés, circulaires, formulaires).",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-dgesup-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7v8a2 2 0 002 2h6M8 7V5a2 2 0 012-2h4.586a1 1 0 01.707.293l4.414 4.414a1 1 0 01.293.707V15a2 2 0 01-2 2h-2M8 7H6a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2v-2" />
        </svg>
      )
    },
    {
      title: "Forum d'Informations",
      description: "Restez informé des actualités et communiquez avec les autres établissements et la DGESUP.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-dgesup-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" />
        </svg>
      )
    },
    {
      title: "Annuaire des Établissements",
      description: "Consultez l'annuaire complet des établissements privés reconnus par l'État.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-dgesup-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
        </svg>
      )
    }
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow">
        {/* Hero Section avec le logo officiel */}
        <section className="bg-gradient-to-br from-dgesup-primary to-dgesup-secondary text-white relative overflow-hidden">
          <div className="absolute inset-0 bg-black/10"></div>
          <div className="protail-container py-16 md:py-24 relative z-10">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              <div className="space-y-8">
                <div className="flex items-center space-x-4">
                  <img 
                    src="/lovable-uploads/ea49272b-cb75-4074-b109-fad823e259cf.png" 
                    alt="République du Congo" 
                    className="w-20 h-20 object-contain bg-white/10 rounded-xl p-2" 
                  />
                  <div>
                    <h2 className="text-xl font-bold">République du Congo</h2>
                    <p className="text-lg opacity-90">Ministère de l'Enseignement Supérieur</p>
                  </div>
                </div>
                
                <h1 className="text-4xl md:text-6xl font-bold leading-tight animate-fade-in">
                  Protail DGESUP
                </h1>
                
                <div className="space-y-4">
                  <h3 className="text-2xl md:text-3xl font-semibold">
                    Direction Générale de l'Enseignement Supérieur
                  </h3>
                  <p className="text-lg md:text-xl opacity-90 max-w-2xl">
                    La plateforme officielle pour la gestion de l'enseignement supérieur privé en République du Congo. 
                    Modernisation, transparence et excellence académique au service du développement national.
                  </p>
                </div>
                
                <div className="pt-6 flex flex-col sm:flex-row gap-4">
                  <Button asChild size="lg" className="bg-white text-dgesup-primary hover:bg-gray-100 shadow-lg">
                    <Link to="/login">Accéder au Portail Privé</Link>
                  </Button>
                  <Button asChild size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
                    <Link to="/directory">Consulter l'Annuaire</Link>
                  </Button>
                </div>
              </div>
              
              <div className="hidden md:flex justify-center">
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-r from-yellow-400/20 to-green-400/20 rounded-3xl blur-3xl"></div>
                  <img 
                    src="/lovable-uploads/ea49272b-cb75-4074-b109-fad823e259cf.png" 
                    alt="Armoiries République du Congo" 
                    className="relative w-80 h-80 object-contain drop-shadow-2xl transform hover:scale-105 transition-transform duration-500"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Mission Section */}
        <section className="py-16 bg-white">
          <div className="protail-container">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-dgesup-primary mb-4">Notre Mission</h2>
              <p className="text-xl text-muted-foreground max-w-4xl mx-auto">
                La Direction Générale de l'Enseignement Supérieur œuvre pour la modernisation et la qualité 
                de l'enseignement supérieur en République du Congo, en accompagnant les établissements privés 
                dans leur mission éducative.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center p-6">
                <div className="w-16 h-16 bg-dgesup-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-dgesup-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-2">Régulation & Contrôle</h3>
                <p className="text-muted-foreground">Supervision et accréditation des établissements privés d'enseignement supérieur</p>
              </div>
              
              <div className="text-center p-6">
                <div className="w-16 h-16 bg-dgesup-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-dgesup-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-2">Innovation Numérique</h3>
                <p className="text-muted-foreground">Modernisation des processus administratifs par le numérique</p>
              </div>
              
              <div className="text-center p-6">
                <div className="w-16 h-16 bg-dgesup-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-dgesup-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-2">Excellence Académique</h3>
                <p className="text-muted-foreground">Promotion de la qualité et de l'excellence dans l'enseignement supérieur</p>
              </div>
            </div>
          </div>
        </section>
        
        {/* Features Section */}
        <section className="py-16 bg-gray-50">
          <div className="protail-container">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-dgesup-primary">Services du Protail DGESUP</h2>
              <p className="mt-4 text-lg text-muted-foreground">
                Des outils modernes pour optimiser la gestion administrative de votre établissement
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {features.map((feature, index) => (
                <div 
                  key={index} 
                  className="p-6 bg-white border rounded-lg shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
                >
                  <div className="mb-4">
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-semibold mb-2 text-dgesup-primary">
                    {feature.title}
                  </h3>
                  <p className="text-muted-foreground">
                    {feature.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Statistics Section */}
        <section className="py-16 bg-white">
          <div className="protail-container">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-dgesup-primary">Impact du Protail DGESUP</h2>
              <p className="mt-4 text-lg text-muted-foreground">
                La transformation numérique de l'enseignement supérieur en chiffres
              </p>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              <div className="bg-gradient-to-br from-dgesup-primary to-dgesup-secondary p-6 rounded-lg text-white text-center">
                <div className="text-4xl font-bold mb-2">45+</div>
                <div className="text-lg font-medium">Établissements</div>
                <div className="text-sm opacity-90">agréés et connectés</div>
              </div>
              
              <div className="bg-gradient-to-br from-green-500 to-green-600 p-6 rounded-lg text-white text-center">
                <div className="text-4xl font-bold mb-2">12k+</div>
                <div className="text-lg font-medium">Étudiants</div>
                <div className="text-sm opacity-90">dans le système</div>
              </div>
              
              <div className="bg-gradient-to-br from-yellow-500 to-yellow-600 p-6 rounded-lg text-white text-center">
                <div className="text-4xl font-bold mb-2">5k+</div>
                <div className="text-lg font-medium">Attestations</div>
                <div className="text-sm opacity-90">sécurisées par QR code</div>
              </div>
              
              <div className="bg-gradient-to-br from-red-500 to-red-600 p-6 rounded-lg text-white text-center">
                <div className="text-4xl font-bold mb-2">98%</div>
                <div className="text-lg font-medium">Satisfaction</div>
                <div className="text-sm opacity-90">des établissements</div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="bg-gradient-to-r from-dgesup-primary to-dgesup-secondary text-white py-16">
          <div className="protail-container text-center">
            <div className="flex justify-center mb-6">
              <img 
                src="/lovable-uploads/ea49272b-cb75-4074-b109-fad823e259cf.png" 
                alt="République du Congo" 
                className="w-16 h-16 object-contain bg-white/10 rounded-xl p-2" 
              />
            </div>
            <h2 className="text-3xl font-bold mb-6">Rejoignez le Protail DGESUP</h2>
            <p className="text-lg mb-8 max-w-2xl mx-auto opacity-90">
              Votre établissement privé souhaite intégrer la plateforme officielle du Ministère ? 
              Contactez la Direction Générale de l'Enseignement Supérieur pour débuter le processus d'accréditation.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="bg-white text-dgesup-primary hover:bg-gray-100 shadow-md">
                <a href="#">Demande d'Accréditation</a>
              </Button>
              <Button asChild size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
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
