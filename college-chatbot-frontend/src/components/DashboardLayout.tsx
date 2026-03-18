import { ReactNode } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { LogOut } from "lucide-react";
import nmimLogo from "@/assets/nmims-logo.png";

interface DashboardLayoutProps {
  children: ReactNode;
}

const DashboardLayout = ({ children }: DashboardLayoutProps) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("isAuthenticated");
    navigate("/login");
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* Dark red header */}
      <header className="bg-primary shadow-lg">
        <div className="container mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="bg-white rounded-lg p-3 shadow-md">
              <img 
                src={nmimLogo} 
                alt="NMIMS Logo" 
                className="h-12 w-auto object-contain"
              />
            </div>
            <div className="text-white">
              <h1 className="text-xl font-bold">NMIMS Resource Assistant</h1>
              <p className="text-xs text-primary-foreground/90">Skip reading PDFs - Just ask!</p>
            </div>
          </div>
          <Button 
            variant="ghost" 
            size="sm"
            onClick={handleLogout}
            className="text-white hover:bg-white/20 transition-colors"
          >
            <LogOut className="h-4 w-4 mr-2" />
            Logout
          </Button>
        </div>
      </header>
      
      {/* White content area */}
      <main className="flex-1 bg-background">
        {children}
      </main>
    </div>
  );
};

export default DashboardLayout;
