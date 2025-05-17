import React from "react";
import { Menu, Bell, User, Globe } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Tooltip, TooltipProvider, TooltipTrigger, TooltipContent } from "@/components/ui/tooltip";
import { useNavigate } from 'react-router-dom';

interface HeaderProps {
  propertyName?: string;
  userName?: string;
  userInitials?: string;
}

export function Header({
  propertyName = "Sunrise Resort",
  userName = "Jane Smith",
  userInitials = "JS",
}: HeaderProps) {
  const navigate = useNavigate();
  return (
    <header className="border-b sticky top-0 bg-background z-10">
      <div className="flex h-16 items-center px-4 sm:px-6">
        <div className="flex items-center">
          <h1 className="text-lg font-semibold text-foreground">{propertyName}</h1>
        </div>

        <div className="ml-auto flex items-center gap-2">
          {/* Add Website Builder button */}
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button 
                  variant="outline" 
                  size="icon" 
                  className="h-9 w-9 border-dashed text-muted-foreground"
                  onClick={() => navigate('/website-builder')}
                >
                  <Globe className="h-5 w-5" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>Get a Website</TooltipContent>
            </Tooltip>
          </TooltipProvider>
          
          <button
            className="rounded-full p-2 hover:bg-secondary transition-colors"
            aria-label="Notifications"
          >
            <Bell className="h-5 w-5 text-foreground" />
          </button>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button
                className="flex items-center space-x-2 focus:outline-none"
                aria-label="User menu"
              >
                <Avatar className="h-8 w-8 bg-pms-purple text-primary-foreground">
                  <AvatarFallback>{userInitials}</AvatarFallback>
                </Avatar>
                <span className="hidden md:inline-block text-sm font-medium">
                  {userName}
                </span>
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Profile</DropdownMenuItem>
              <DropdownMenuItem>Settings</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Logout</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
}
