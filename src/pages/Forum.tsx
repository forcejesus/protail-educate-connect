
import AnnouncementsList from "@/components/forum/AnnouncementsList";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

const Forum = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header />
      <main className="flex-grow">
        <div className="protail-container py-8">
          <h1 className="page-title mb-8">Forum et Annonces</h1>
          <AnnouncementsList />
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Forum;
