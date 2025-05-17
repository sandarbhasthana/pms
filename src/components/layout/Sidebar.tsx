
import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { 
  LayoutDashboard, 
  CalendarDays, 
  Users, 
  DollarSign, 
  Settings,
  ChevronLeft,
  ChevronRight,
  Package,
  FileBarChart,
  Clock,
  Globe,
  Mail,
  Calendar
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { TooltipProvider } from "@/components/ui/tooltip";

type NavItem = {
  name: string;
  path: string;
  icon: React.ElementType;
  badge?: number;
};

const navItems: NavItem[] = [
  {
    name: "Dashboard",
    path: "/",
    icon: LayoutDashboard,
  },
  {
    name: "Calendar View",
    path: "/stays",
    icon: CalendarDays,
  },
  {
    name: "Reservations",
    path: "/reservations",
    icon: Calendar,
  },
  {
    name: "Guests",
    path: "/guests",
    icon: Users,
  },
  {
    name: "Messages",
    path: "/messages",
    icon: Mail,
    badge: 3,  // Add a badge to indicate unread messages
  },
  {
    name: "Lost & Found",
    path: "/lost-found",
    icon: Package,
  },
  {
    name: "Rates & Availability",
    path: "/rates",
    icon: DollarSign,
  },
  {
    name: "Reports",
    path: "/reports",
    icon: FileBarChart,
  },
  {
    name: "Activity Logs",
    path: "/activity-logs",
    icon: Clock,
  },
  {
    name: "Website Builder",
    path: "/website-builder",
    icon: Globe,
  },
  {
    name: "Settings",
    path: "/settings",
    icon: Settings,
  },
];

export function Sidebar() {
  // Always start with collapsed sidebar by default
  const [collapsed, setCollapsed] = useState(true);
  const location = useLocation();
  const navigate = useNavigate();

  // Auto-collapse sidebar after navigation
  useEffect(() => {
    setCollapsed(true);
  }, [location.pathname]);

  // Toggle sidebar expansion
  const toggleSidebar = () => {
    setCollapsed(!collapsed);
  };

  // Click handler for menu items that ensures sidebar collapses after selection
  const handleMenuItemClick = (path: string) => {
    navigate(path);
    setCollapsed(true);
  };

  return (
    <aside
      className={cn(
        "h-screen bg-sidebar border-r border-border transition-all duration-300 flex flex-col",
        collapsed ? "w-16" : "w-64"
      )}
      aria-label="Main navigation"
    >
      <div className="h-16 border-b border-border flex items-center justify-center px-4">
        {!collapsed && (
          <h1 className="font-bold text-lg text-pms-purple truncate">PMS System</h1>
        )}
      </div>

      <nav className="flex-1 px-2 py-4 space-y-1">
        <TooltipProvider>
          {navItems.map((item) => (
            <div key={item.name}>
              {collapsed ? (
                <Tooltip>
                  <TooltipTrigger asChild>
                    <div
                      onClick={() => handleMenuItemClick(item.path)}
                      className={cn(
                        "flex items-center px-3 py-3 rounded-md text-sm font-medium relative cursor-pointer",
                        "hover:bg-pms-purple/10 hover:text-pms-purple",
                        "focus:outline-none focus:ring-2 focus:ring-pms-purple focus:bg-pms-purple/10",
                        "transition-colors duration-200 ease-in-out",
                        "group",
                        location.pathname === item.path ? "bg-pms-purple/10 text-pms-purple" : "text-sidebar-foreground"
                      )}
                      aria-label={item.name}
                    >
                      <item.icon
                        className={cn(
                          "flex-shrink-0 w-5 h-5",
                          location.pathname === item.path 
                            ? "text-pms-purple" 
                            : "text-sidebar-foreground group-hover:text-pms-purple"
                        )}
                        aria-hidden="true"
                      />
                      
                      {/* Badge for notifications */}
                      {item.badge && (
                        <span 
                          className={cn(
                            "ml-auto bg-primary text-primary-foreground rounded-full px-1.5 py-0.5 text-xs font-semibold",
                            collapsed ? "absolute -top-1 -right-1" : ""
                          )}
                        >
                          {item.badge}
                        </span>
                      )}
                    </div>
                  </TooltipTrigger>
                  <TooltipContent side="right">
                    <p>{item.name}</p>
                  </TooltipContent>
                </Tooltip>
              ) : (
                <div
                  onClick={() => handleMenuItemClick(item.path)}
                  className={cn(
                    "flex items-center px-3 py-3 rounded-md text-sm font-medium relative cursor-pointer",
                    "hover:bg-pms-purple/10 hover:text-pms-purple",
                    "focus:outline-none focus:ring-2 focus:ring-pms-purple focus:bg-pms-purple/10",
                    "transition-colors duration-200 ease-in-out",
                    "group",
                    location.pathname === item.path ? "bg-pms-purple/10 text-pms-purple" : "text-sidebar-foreground"
                  )}
                  aria-label={item.name}
                >
                  <item.icon
                    className={cn(
                      "flex-shrink-0 w-5 h-5",
                      location.pathname === item.path 
                        ? "text-pms-purple" 
                        : "text-sidebar-foreground group-hover:text-pms-purple"
                    )}
                    aria-hidden="true"
                  />
                  <span className="ml-3 truncate">{item.name}</span>
                  
                  {/* Badge for notifications */}
                  {item.badge && (
                    <span 
                      className="ml-auto bg-primary text-primary-foreground rounded-full px-1.5 py-0.5 text-xs font-semibold"
                    >
                      {item.badge}
                    </span>
                  )}
                </div>
              )}
            </div>
          ))}
        </TooltipProvider>
      </nav>

      <div className="p-2 border-t border-border">
        <button
          onClick={toggleSidebar}
          className="w-full p-2 flex justify-center items-center rounded-md hover:bg-sidebar-accent text-sidebar-foreground"
          aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
        >
          {collapsed ? (
            <ChevronRight className="h-5 w-5" />
          ) : (
            <ChevronLeft className="h-5 w-5" />
          )}
        </button>
      </div>
    </aside>
  );
}
