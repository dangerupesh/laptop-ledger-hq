
import { NavLink } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Laptop, Users, BarChart, Settings } from "lucide-react";
import { cn } from "@/lib/utils";

export function Sidebar() {
  const routes = [
    {
      label: "Dashboard",
      icon: BarChart,
      href: "/",
      color: "text-white",
    },
    {
      label: "Laptops",
      icon: Laptop,
      href: "/laptops",
      color: "text-white",
    },
    {
      label: "Employees",
      icon: Users,
      href: "/employees",
      color: "text-white",
    },
    {
      label: "Settings",
      icon: Settings,
      href: "/settings",
      color: "text-white",
    },
  ];

  return (
    <div className="space-y-4 py-4 flex flex-col h-full bg-sidebar text-sidebar-foreground">
      <div className="px-3 py-2 flex-1">
        <div className="flex items-center pl-3 mb-10">
          <Laptop className="h-8 w-8 text-sidebar-foreground" />
          <h1 className="text-xl font-bold ml-2 text-sidebar-foreground">Laptop Ledger HQ</h1>
        </div>
        <div className="space-y-1">
          {routes.map((route) => (
            <NavLink
              key={route.href}
              to={route.href}
              className={({ isActive }) =>
                cn(
                  "text-sm group flex p-3 w-full justify-start font-medium cursor-pointer hover:bg-sidebar-accent rounded-lg transition",
                  isActive ? "bg-sidebar-accent" : "transparent"
                )
              }
            >
              <div className="flex items-center flex-1">
                <route.icon className={cn("h-5 w-5 mr-3", route.color)} />
                {route.label}
              </div>
            </NavLink>
          ))}
        </div>
      </div>
      <div className="px-6 py-3 border-t border-sidebar-border text-xs text-center text-sidebar-foreground/80">
        © 2025 Laptop Ledger HQ
      </div>
    </div>
  );
}
