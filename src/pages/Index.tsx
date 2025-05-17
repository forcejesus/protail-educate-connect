
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
        {/* Hero Section */}
        <section className="bg-gradient-to-b from-dgesup-primary to-dgesup-secondary text-white">
          <div className="protail-container py-16 md:py-24">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
              <div className="space-y-6">
                <h1 className="text-4xl md:text-5xl font-bold leading-tight">
                  Protail DGESUP pour les Établissements Privés
                </h1>
                <p className="text-lg md:text-xl opacity-90">
                  Une plateforme numérique centralisée pour la gestion des inscriptions, 
                  la génération d'attestations et l'accès aux ressources officielles.
                </p>
                <div className="pt-4 flex flex-col sm:flex-row gap-4">
                  <Button asChild size="lg" className="bg-white text-dgesup-primary hover:bg-gray-100">
                    <Link to="/login">Connexion Établissement</Link>
                  </Button>
                  <Button asChild size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
                    <Link to="/directory">Consulter l'Annuaire</Link>
                  </Button>
                </div>
              </div>
              <div className="hidden md:flex justify-center">
                <img 
                  src="/placeholder.svg" 
                  alt="DGESUP Platform" 
                  className="max-w-full h-auto rounded-lg shadow-2xl"
                />
              </div>
            </div>
          </div>
        </section>
        
        {/* Features Section */}
        <section className="py-16 bg-white">
          <div className="protail-container">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-dgesup-primary">Fonctionnalités de la Plateforme</h2>
              <p className="mt-4 text-lg text-muted-foreground">
                Optimisez la gestion administrative de votre établissement avec nos outils dédiés
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {features.map((feature, index) => (
                <div 
                  key={index} 
                  className="p-6 bg-white border rounded-lg shadow-sm hover:shadow-md transition-shadow"
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
        <section className="py-16 bg-gray-50">
          <div className="protail-container">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-dgesup-primary">Notre Impact</h2>
              <p className="mt-4 text-lg text-muted-foreground">
                Le Protail DGESUP en quelques chiffres
              </p>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              <div className="bg-white p-6 rounded-lg shadow-sm text-center">
                <div className="text-4xl font-bold text-dgesup-accent mb-2">45+</div>
                <div className="text-lg font-medium">Établissements</div>
                <div className="text-sm text-muted-foreground">enregistrés sur la plateforme</div>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-sm text-center">
                <div className="text-4xl font-bold text-dgesup-accent mb-2">12k+</div>
                <div className="text-lg font-medium">Étudiants</div>
                <div className="text-sm text-muted-foreground">gérés via le système</div>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-sm text-center">
                <div className="text-4xl font-bold text-dgesup-accent mb-2">5k+</div>
                <div className="text-lg font-medium">Attestations</div>
                <div className="text-sm text-muted-foreground">générées avec QR code</div>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-sm text-center">
                <div className="text-4xl font-bold text-dgesup-accent mb-2">98%</div>
                <div className="text-lg font-medium">Satisfaction</div>
                <div className="text-sm text-muted-foreground">des utilisateurs</div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="bg-dgesup-primary text-white py-16">
          <div className="protail-container text-center">
            <h2 className="text-3xl font-bold mb-6">Rejoignez le Protail DGESUP</h2>
            <p className="text-lg mb-8 max-w-2xl mx-auto opacity-90">
              Votre établissement privé n'est pas encore enregistré? Contactez-nous pour intégrer la plateforme officielle du Ministère de l'Enseignement Supérieur.
            </p>
            <Button asChild size="lg" className="bg-white text-dgesup-primary hover:bg-gray-100">
              <a href="#">Demande d'Accréditation</a>
            </Button>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;
