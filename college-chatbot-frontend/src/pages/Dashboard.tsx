import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { MessageSquare, Sparkles } from "lucide-react";
import DashboardLayout from "@/components/DashboardLayout";
import chatbotRobot from "@/assets/chatbot-robot.png";

const Dashboard = () => {
  const navigate = useNavigate();
  const [userName, setUserName] = useState("");

  useEffect(() => {
    const isAuth = localStorage.getItem("isAuthenticated");
    if (!isAuth) {
      navigate("/login");
      return;
    }

    const currentUser = JSON.parse(localStorage.getItem("currentUser") || "{}");
    setUserName(currentUser.name || "Student");
  }, [navigate]);

  return (
    <DashboardLayout>
      <div className="container mx-auto px-6 py-12 max-w-4xl">
        {/* Welcome Section */}
        <div className="text-center mb-12 space-y-4">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Sparkles className="h-8 w-8 text-primary animate-pulse" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-foreground">
            Welcome back, <span className="text-primary">{userName}</span>! 👋
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Got doubts? Don't spend hours reading through PDFs! 
            Just ask your questions and get instant answers from your course materials.
          </p>
        </div>

        {/* Chatbot Card */}
        <Card className="shadow-elegant border-border/50 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
          <CardContent className="p-8 md:p-12">
            <div className="flex flex-col items-center text-center space-y-6">
              <div className="relative">
                <div className="absolute inset-0 bg-primary/20 blur-2xl rounded-full"></div>
                <img 
                  src={chatbotRobot} 
                  alt="AI Assistant" 
                  className="h-40 w-40 object-contain relative z-10 animate-[float_3s_ease-in-out_infinite]"
                />
              </div>
              
              <div className="space-y-3">
                <h2 className="text-2xl md:text-3xl font-bold text-foreground">
                  Ask Your Doubts
                </h2>
                <p className="text-muted-foreground text-base max-w-md">
                  No need to read 121 pages! Just ask your questions and I'll find 
                  the answers from your course PDFs instantly.
                </p>
              </div>

              <Button 
                size="lg"
                onClick={() => navigate("/chatbot")}
                className="bg-primary hover:bg-primary/90 shadow-md hover:shadow-lg transition-all group text-lg px-8 py-6"
              >
                <MessageSquare className="h-5 w-5 mr-2 group-hover:animate-bounce" />
                Start Chatting
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Features Grid */}
        <div className="grid md:grid-cols-3 gap-6 mt-12">
          <Card className="border-border/50 shadow-soft hover:shadow-md transition-all">
            <CardContent className="p-6 text-center space-y-2">
              <div className="h-12 w-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-3">
                <span className="text-2xl">📚</span>
              </div>
              <h3 className="font-semibold text-foreground">Skip the PDF</h3>
              <p className="text-sm text-muted-foreground">No more reading 100+ pages - just ask!</p>
            </CardContent>
          </Card>

          <Card className="border-border/50 shadow-soft hover:shadow-md transition-all">
            <CardContent className="p-6 text-center space-y-2">
              <div className="h-12 w-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-3">
                <span className="text-2xl">🎯</span>
              </div>
              <h3 className="font-semibold text-foreground">Clear Doubts Fast</h3>
              <p className="text-sm text-muted-foreground">Get answers to your questions instantly</p>
            </CardContent>
          </Card>

          <Card className="border-border/50 shadow-soft hover:shadow-md transition-all">
            <CardContent className="p-6 text-center space-y-2">
              <div className="h-12 w-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-3">
                <span className="text-2xl">⚡</span>
              </div>
              <h3 className="font-semibold text-foreground">24/7 Available</h3>
              <p className="text-sm text-muted-foreground">Study anytime, anywhere you want</p>
            </CardContent>
          </Card>
        </div>
      </div>

      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
        }
      `}</style>
    </DashboardLayout>
  );
};

export default Dashboard;
