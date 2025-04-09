
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { BellIcon, SearchIcon } from "lucide-react";
import { Input } from "@/components/ui/input";

export function Header() {
  const { toast } = useToast();
  
  const handleNotification = () => {
    toast({
      title: "Notifications",
      description: "No new notifications at this time.",
    });
  };

  return (
    <div className="border-b">
      <div className="flex h-16 items-center px-4 sm:px-6">
        <div className="ml-auto flex items-center space-x-4">
          <div className="relative hidden md:block">
            <SearchIcon className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search..."
              className="w-[200px] lg:w-[300px] pl-8 bg-background"
            />
          </div>
          <Button 
            variant="ghost" 
            size="icon"
            onClick={handleNotification}
          >
            <BellIcon className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </div>
  );
}
