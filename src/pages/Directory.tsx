
import SchoolDirectory from "@/components/directory/SchoolDirectory";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

const Directory = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header />
      <main className="flex-grow">
        <div className="bg-[#1A365D] text-white py-16">
          <div className="protail-container">
            <div className="max-w-4xl mx-auto text-center">
              <h1 className="text-3xl md:text-5xl font-bold mb-4 animate-fade-in">Annuaire des Établissements</h1>
              <p className="text-lg text-gray-200 animate-fade-in animate-delay-100">
                Consultez la liste complète des établissements privés reconnus par l'État congolais
              </p>
            </div>
          </div>
          <div className="absolute bottom-0 left-0 w-full h-16 bg-gradient-to-t from-gray-50 to-transparent"></div>
        </div>
        
        <div className="protail-container py-8 -mt-8">
          <div className="bg-white rounded-xl shadow-xl p-6 animate-scale-up">
            <SchoolDirectory />
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Directory;
