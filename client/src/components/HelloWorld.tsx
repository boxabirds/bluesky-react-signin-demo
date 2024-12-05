import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

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
    <Card className="w-[90%] max-w-md p-6 shadow-lg">
      <div className="space-y-6">
        <h1 className="text-4xl font-bold text-center bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
          Hello World
        </h1>
        
        <p className="text-center text-muted-foreground">
          Welcome to this modern React application built with Shadcn UI and Tailwind CSS.
        </p>

        <div className="flex justify-center">
          <Button
            onClick={handleClick}
            className="transition-all hover:scale-105"
            size="lg"
          >
            Click Me!
          </Button>
        </div>

        {clicks > 0 && (
          <p className="text-center text-sm text-muted-foreground">
            You've clicked {clicks} times
          </p>
        )}
      </div>
    </Card>
  );
}
