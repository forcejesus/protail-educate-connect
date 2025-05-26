
import SchoolDirectory from "@/components/directory/SchoolDirectory";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

const Directory = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white flex flex-col">
      <Header />
      <main className="flex-grow">
        <div className="relative bg-gradient-to-br from-dgesup-primary via-dgesup-secondary to-dgesup-primary text-white py-20 overflow-hidden">
          {/* Animated background elements */}
          <div className="absolute inset-0">
            <div className="absolute top-20 left-20 w-72 h-72 bg-white/5 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse"></div>
            <div className="absolute bottom-20 right-20 w-96 h-96 bg-yellow-400/10 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse" style={{animationDelay: '2s'}}></div>
          </div>
          
          <div className="protail-container relative z-10">
            <div className="max-w-4xl mx-auto text-center">
              <h1 className="text-4xl md:text-6xl font-bold mb-6 animate-fade-in">
                Annuaire des Établissements
              </h1>
              <p className="text-xl text-gray-200 animate-fade-in animate-delay-100 leading-relaxed">
                Consultez la liste complète des établissements privés reconnus par l'État congolais
              </p>
            </div>
          </div>
        </div>
        
        <div className="protail-container py-12 -mt-10">
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
