
import { useState, useEffect } from "react";
import { Outlet } from "react-router-dom";
import { Moon, Sun, LogOut } from "lucide-react";
import { useTheme } from "@/hooks/use-theme";
import { Button } from "@/components/ui/button";
import { Toggle } from "@/components/ui/toggle";
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
import { cn } from "@/lib/utils";

import DashboardNavItems from "./DashboardNavItems";

const DashboardLayout = () => {
  const { theme, setTheme } = useTheme();
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Handle logout
  const handleLogout = () => {
    console.log("Logging out");
    // Will be implemented with authentication system
  };

  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full bg-background text-foreground">
        <Sidebar>
          <SidebarHeader>
            <div className="flex items-center p-2">
              <img 
                src="/lovable-uploads/8edc322a-90a1-42d5-87f1-0aabc3e173a9.png" 
                alt="DGESUP Logo" 
                className="w-10 h-10 mr-2 object-contain" 
              />
              <div>
                <h1 className="font-bold text-lg">Protail <span className="text-[#e11e1e]">DGESUP</span></h1>
                <p className="text-xs text-muted-foreground">Administration</p>
              </div>
            </div>
          </SidebarHeader>
          
          <SidebarContent>
            <SidebarGroup>
              <SidebarGroupLabel>Gestion</SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  <DashboardNavItems />
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          </SidebarContent>
          
          <SidebarFooter>
            <div className="p-2 flex flex-col gap-2">
              {/* École information added before theme toggle */}
              <div className="border-t pt-2 mb-2">
                <div className="flex items-center">
                  <div className="w-8 h-8 border-2 border-gray-400 rounded-full flex items-center justify-center text-xs text-gray-600 mr-2">
                    ÉC
                  </div>
                  <div className="text-sm">
                    <p className="font-semibold">École Nationale</p>
                    <p className="text-xs text-muted-foreground">Brazzaville, Congo</p>
                  </div>
                </div>
              </div>
              
              <div className="flex justify-between">
                <Toggle
                  aria-label="Toggle theme"
                  pressed={theme === "dark"}
                  onPressedChange={() => {
                    if (isMounted) {
                      setTheme(theme === "dark" ? "light" : "dark");
                    }
                  }}
                  className="p-2"
                >
                  {theme === "dark" ? <Moon className="h-4 w-4" /> : <Sun className="h-4 w-4" />}
                  <span className="ml-2 text-sm">{theme === "dark" ? "Mode sombre" : "Mode clair"}</span>
                </Toggle>
              </div>
              
              <Button 
                variant="destructive" 
                size="sm" 
                className="w-full justify-start"
                onClick={handleLogout}
              >
                <LogOut className="mr-2 h-4 w-4" />
                Déconnexion
              </Button>
            </div>
          </SidebarFooter>
        </Sidebar>
        
        <div className="flex-1 overflow-auto">
          {/* Congo flag color bar */}
          <div className="h-1 congo-gradient sticky top-0 z-40"></div>
          <main className="p-6">
            <Outlet />
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default DashboardLayout;
