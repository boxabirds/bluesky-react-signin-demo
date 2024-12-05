import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { Sparkles } from "lucide-react";

export default function HelloWorld() {
  const [clicks, setClicks] = useState(0);
  const { toast } = useToast();

  const handleClick = () => {
    setClicks(prev => prev + 1);
    toast({
      title: "Hello!",
      description: `You've clicked ${clicks + 1} times!`,
      duration: 2000,
    });
  };

  return (
    <Card className="w-[90%] max-w-md p-8 shadow-xl hover:shadow-2xl transition-all duration-300 border-opacity-50">
      <div className="space-y-8">
        <h1 className="text-5xl font-extrabold text-center bg-gradient-to-r from-primary via-primary/80 to-primary/60 bg-clip-text text-transparent">
          Hello World
        </h1>
        
        <p className="text-center text-muted-foreground text-lg">
          Welcome to this modern React application built with Shadcn UI and Tailwind CSS.
        </p>

        <div className="flex justify-center">
          <Button
            onClick={handleClick}
            className="transition-all hover:scale-105 hover:shadow-lg"
            size="lg"
            variant="default"
          >
            <Sparkles className="mr-2 h-5 w-5" />
            Click Me!
          </Button>
        </div>

        {clicks > 0 && (
          <p className="text-center text-sm text-muted-foreground animate-fade-in">
            You've clicked {clicks} times! ✨
          </p>
        )}
      </div>
    </Card>
  );
}
