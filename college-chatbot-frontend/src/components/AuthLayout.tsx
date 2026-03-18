import { ReactNode } from "react";
import nmimLogo from "@/assets/nmims-logo-full.png";

interface AuthLayoutProps {
  children: ReactNode;
}

const AuthLayout = ({ children }: AuthLayoutProps) => {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Header with logo */}
      <header className="bg-white border-b border-border py-4 px-6 shadow-sm">
        <div className="container mx-auto flex items-center justify-center">
          <img 
            src={nmimLogo} 
            alt="NMIMS Logo" 
            className="h-40 w-auto object-contain"
          />
        </div>
      </header>
      
      {/* Main content */}
      <main className="flex-1 flex items-center justify-center bg-gradient-to-br from-background via-secondary/20 to-background p-6">
        <div className="w-full max-w-md">
          {children}
        </div>
      </main>
    </div>
  );
};

export default AuthLayout;
