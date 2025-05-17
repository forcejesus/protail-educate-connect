
import ResourceCenter from "@/components/resources/ResourceCenter";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

const Resources = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header />
      <main className="flex-grow">
        <div className="protail-container py-8">
          <ResourceCenter />
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Resources;
