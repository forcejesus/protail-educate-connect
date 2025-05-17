
import DashboardComponent from "@/components/dashboard/Dashboard";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

const Dashboard = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header />
      <main className="flex-grow">
        <div className="protail-container py-8">
          <DashboardComponent />
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Dashboard;
