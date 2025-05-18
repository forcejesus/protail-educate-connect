
import SchoolDirectory from "@/components/directory/SchoolDirectory";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

const Directory = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header />
      <main className="flex-grow">
        <div className="protail-container py-8">
          <h1 className="page-title mb-8">Annuaire des Établissements</h1>
          <SchoolDirectory />
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Directory;
