
import { Link, useLocation } from "react-router-dom";
import { 
  LayoutDashboard, 
  Users, 
  FileCheck, 
  BarChart3, 
  FileText, 
  MessageSquare,
  Settings
} from "lucide-react";

import { 
  SidebarMenuItem, 
  SidebarMenuButton 
} from "@/components/ui/sidebar";

const DashboardNavItems = () => {
  const location = useLocation();
  
  const navItems = [
    { 
      name: "Tableau de Bord", 
      path: "/dashboard", 
      icon: LayoutDashboard 
    },
    { 
      name: "Étudiants", 
      path: "/dashboard/students", 
      icon: Users 
    },
    { 
      name: "Attestations", 
      path: "/dashboard/attestations", 
      icon: FileCheck 
    },
    { 
      name: "Statistiques", 
      path: "/dashboard/statistics", 
      icon: BarChart3 
    },
    { 
      name: "Ressources Officiels", 
      path: "/dashboard/resources", 
      icon: FileText 
    },
    { 
      name: "Forum", 
      path: "/dashboard/forum", 
      icon: MessageSquare 
    },
    { 
      name: "Paramètres", 
      path: "/dashboard/settings", 
      icon: Settings 
    }
  ];

  return (
    <>
      {navItems.map((item) => (
        <SidebarMenuItem key={item.path}>
          <SidebarMenuButton
            isActive={location.pathname === item.path}
            tooltip={item.name}
            asChild
          >
            <Link to={item.path} className="flex items-center">
              <item.icon className="mr-2 h-4 w-4" />
              <span>{item.name}</span>
            </Link>
          </SidebarMenuButton>
        </SidebarMenuItem>
      ))}
    </>
  );
};

export default DashboardNavItems;
