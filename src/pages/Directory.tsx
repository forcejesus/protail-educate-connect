
import SchoolDirectory from "@/components/directory/SchoolDirectory";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

const Directory = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white flex flex-col">
      <Header />
      <main className="flex-grow">
        <div className="relative bg-gradient-to-br from-dgesup-primary via-dgesup-secondary to-dgesup-primary text-white py-20 overflow-hidden">
          {/* Modern animated background elements */}
          <div className="absolute inset-0">
            <div className="absolute top-20 left-20 w-72 h-72 bg-white/5 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse"></div>
            <div className="absolute bottom-20 right-20 w-96 h-96 bg-yellow-400/10 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse" style={{animationDelay: '2s'}}></div>
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-green-400/5 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse" style={{animationDelay: '4s'}}></div>
          </div>
          
          <div className="container mx-auto px-4 relative z-10">
            <div className="max-w-4xl mx-auto text-center">
              <div className="mb-6">
                <div className="inline-flex items-center px-4 py-2 bg-white/10 rounded-full backdrop-blur-sm mb-6">
                  <span className="text-yellow-300 font-medium">🏫 Annuaire Officiel</span>
                </div>
              </div>
              <h1 className="text-4xl md:text-6xl font-bold mb-6 animate-fade-in bg-gradient-to-r from-white to-yellow-200 bg-clip-text text-transparent">
                Annuaire des Établissements
              </h1>
              <p className="text-xl text-gray-200 animate-fade-in animate-delay-100 leading-relaxed max-w-3xl mx-auto">
                Consultez la liste complète des établissements d'enseignement supérieur publics et privés reconnus par l'État congolais
              </p>
              <div className="mt-8 flex flex-wrap justify-center gap-4">
                <div className="flex items-center bg-white/10 rounded-lg px-4 py-2 backdrop-blur-sm">
                  <span className="w-2 h-2 bg-green-400 rounded-full mr-2"></span>
                  <span className="text-sm">Établissements Publics</span>
                </div>
                <div className="flex items-center bg-white/10 rounded-lg px-4 py-2 backdrop-blur-sm">
                  <span className="w-2 h-2 bg-blue-400 rounded-full mr-2"></span>
                  <span className="text-sm">Établissements Privés</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="container mx-auto px-4 py-12 -mt-10">
          <div className="bg-white rounded-2xl shadow-2xl p-8 animate-scale-in backdrop-blur-sm border border-gray-100">
            <SchoolDirectory />
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Directory;
