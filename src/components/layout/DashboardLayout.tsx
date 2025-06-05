
import { useState, useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { Moon, Sun, LogOut } from "lucide-react";
import { useTheme } from "@/hooks/use-theme";
import { Button } from "@/components/ui/button";
import { Toggle } from "@/components/ui/toggle";
import { useToast } from "@/hooks/use-toast";
import { 
  SidebarProvider, 
  Sidebar, 
  SidebarContent,
  SidebarHeader,
  SidebarFooter,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarGroupContent 
} from "@/components/ui/sidebar";

import DashboardNavItems from "./DashboardNavItems";

const DashboardLayout = () => {
  const { theme, setTheme } = useTheme();
  const [isMounted, setIsMounted] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Handle logout - redirect to root
  const handleLogout = () => {
    console.log("Logging out");
    toast({
      title: "Déconnexion réussie",
      description: "À bientôt sur le Portail DGESUP",
    });
    navigate("/");
  };

  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full bg-background text-foreground">
        <Sidebar className="border-r border-gray-200">
          <SidebarHeader className="border-b border-gray-100 p-4">
            <div className="flex items-center space-x-3">
              <div className="relative">
                <img 
                  src="/lovable-uploads/ea49272b-cb75-4074-b109-fad823e259cf.png" 
                  alt="DGESUP Logo" 
                  className="w-12 h-12 object-contain" 
                />
                <div className="absolute inset-0 bg-gradient-to-br from-dgesup-primary/20 to-dgesup-accent/20 rounded-full opacity-0 hover:opacity-100 transition-opacity duration-300"></div>
              </div>
              <div>
                <h1 className="font-bold text-lg text-dgesup-primary">Portail <span className="text-dgesup-secondary">DGESUP</span></h1>
                <p className="text-xs text-muted-foreground">Administration</p>
              </div>
            </div>
          </SidebarHeader>
          
          <SidebarContent>
            <SidebarGroup>
              <SidebarGroupLabel className="text-dgesup-primary font-semibold">Gestion</SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  <DashboardNavItems />
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          </SidebarContent>
          
          <SidebarFooter className="border-t border-gray-100 p-4">
            <div className="space-y-4">
              {/* École information */}
              <div className="border-t pt-3">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-dgesup-primary to-dgesup-secondary rounded-full flex items-center justify-center text-white font-semibold text-sm shadow-md">
                    ÉC
                  </div>
                  <div className="text-sm">
                    <p className="font-semibold text-gray-900">École Nationale</p>
                    <p className="text-xs text-muted-foreground">Brazzaville, Congo</p>
                  </div>
                </div>
              </div>
              
              {/* Theme toggle */}
              <div className="flex justify-center">
                <Toggle
                  aria-label="Toggle theme"
                  pressed={theme === "dark"}
                  onPressedChange={() => {
                    if (isMounted) {
                      setTheme(theme === "dark" ? "light" : "dark");
                    }
                  }}
                  className="w-full justify-start h-10 px-3 data-[state=on]:bg-dgesup-primary/10 data-[state=on]:text-dgesup-primary"
                >
                  {theme === "dark" ? <Moon className="h-4 w-4" /> : <Sun className="h-4 w-4" />}
                  <span className="ml-2 text-sm">{theme === "dark" ? "Mode sombre" : "Mode clair"}</span>
                </Toggle>
              </div>
              
              {/* Logout button */}
              <Button 
                variant="destructive" 
                size="sm" 
                className="w-full justify-start bg-red-500 hover:bg-red-600 shadow-md hover:shadow-lg transition-all duration-200 transform hover:scale-[1.02]"
                onClick={handleLogout}
              >
                <LogOut className="mr-2 h-4 w-4" />
                Déconnexion
              </Button>
            </div>
          </SidebarFooter>
        </Sidebar>
        
        <div className="flex-1 overflow-auto bg-gray-50/50">
          {/* Congo flag color bar */}
          <div className="h-1 bg-gradient-to-r from-yellow-400 via-green-400 to-red-400 sticky top-0 z-40"></div>
          <main className="p-6">
            <Outlet />
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default DashboardLayout;
