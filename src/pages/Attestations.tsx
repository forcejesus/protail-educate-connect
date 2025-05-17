
import AttestationGenerator from "@/components/documents/AttestationGenerator";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

const Attestations = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header />
      <main className="flex-grow">
        <div className="protail-container py-8">
          <h1 className="page-title mb-8">Gestion des Attestations</h1>
          <AttestationGenerator />
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Attestations;
