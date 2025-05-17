
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Filter } from "lucide-react";
import { MessageFilterOptions, MessagePlatform } from "@/types/messaging-types";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuCheckboxItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";

interface MessageFiltersProps {
  onFilterChange: (filters: MessageFilterOptions) => void;
}

export function MessageFilters({ onFilterChange }: MessageFiltersProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedPlatforms, setSelectedPlatforms] = useState<MessagePlatform[]>([]);
  const [selectedStatuses, setSelectedStatuses] = useState<string[]>([]);
  const [showUnreadOnly, setShowUnreadOnly] = useState(false);
  
  const handleSearch = () => {
    applyFilters();
  };
  
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      applyFilters();
    }
  };
  
  const handlePlatformChange = (platform: MessagePlatform) => {
    setSelectedPlatforms(prev =>
      prev.includes(platform)
        ? prev.filter(p => p !== platform)
        : [...prev, platform]
    );
    
    setTimeout(applyFilters, 0);
  };
  
  const handleStatusChange = (status: string) => {
    setSelectedStatuses(prev =>
      prev.includes(status)
        ? prev.filter(s => s !== status)
        : [...prev, status]
    );
    
    setTimeout(applyFilters, 0);
  };
  
  const handleUnreadChange = () => {
    setShowUnreadOnly(prev => !prev);
    setTimeout(applyFilters, 0);
  };
  
  const applyFilters = () => {
    const filters: MessageFilterOptions = {};
    
    if (searchQuery) {
      filters.searchQuery = searchQuery;
    }
    
    if (selectedPlatforms.length > 0) {
      filters.platform = selectedPlatforms;
    }
    
    if (selectedStatuses.length > 0) {
      filters.status = selectedStatuses as any[];
    }
    
    if (showUnreadOnly) {
      filters.hasUnread = true;
    }
    
    onFilterChange(filters);
  };
  
  const clearFilters = () => {
    setSearchQuery("");
    setSelectedPlatforms([]);
    setSelectedStatuses([]);
    setShowUnreadOnly(false);
    
    onFilterChange({});
  };
  
  const hasActiveFilters = selectedPlatforms.length > 0 || 
                          selectedStatuses.length > 0 || 
                          showUnreadOnly;
  
  return (
    <div className="p-4 border-b">
      <div className="flex gap-2">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search messages or guests..."
            className="pl-9"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyDown={handleKeyDown}
          />
        </div>
        
        <Button variant="outline" onClick={handleSearch}>Search</Button>
        
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="relative">
              <Filter className="h-4 w-4 mr-2" />
              <span>Filter</span>
              {hasActiveFilters && (
                <span className="absolute top-0 right-0 h-2 w-2 bg-primary rounded-full transform translate-x-1 -translate-y-1"></span>
              )}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56">
            <DropdownMenuLabel>Platform</DropdownMenuLabel>
            <DropdownMenuCheckboxItem
              checked={selectedPlatforms.includes("booking")}
              onCheckedChange={() => handlePlatformChange("booking")}
            >
              Booking.com
            </DropdownMenuCheckboxItem>
            <DropdownMenuCheckboxItem
              checked={selectedPlatforms.includes("airbnb")}
              onCheckedChange={() => handlePlatformChange("airbnb")}
            >
              Airbnb
            </DropdownMenuCheckboxItem>
            <DropdownMenuCheckboxItem
              checked={selectedPlatforms.includes("expedia")}
              onCheckedChange={() => handlePlatformChange("expedia")}
            >
              Expedia
            </DropdownMenuCheckboxItem>
            <DropdownMenuCheckboxItem
              checked={selectedPlatforms.includes("email")}
              onCheckedChange={() => handlePlatformChange("email")}
            >
              Email
            </DropdownMenuCheckboxItem>
            <DropdownMenuCheckboxItem
              checked={selectedPlatforms.includes("direct")}
              onCheckedChange={() => handlePlatformChange("direct")}
            >
              Direct
            </DropdownMenuCheckboxItem>
            <DropdownMenuCheckboxItem
              checked={selectedPlatforms.includes("review")}
              onCheckedChange={() => handlePlatformChange("review")}
            >
              Reviews
            </DropdownMenuCheckboxItem>
            
            <DropdownMenuSeparator />
            
            <DropdownMenuLabel>Status</DropdownMenuLabel>
            <DropdownMenuCheckboxItem
              checked={selectedStatuses.includes("new")}
              onCheckedChange={() => handleStatusChange("new")}
            >
              New
            </DropdownMenuCheckboxItem>
            <DropdownMenuCheckboxItem
              checked={selectedStatuses.includes("active")}
              onCheckedChange={() => handleStatusChange("active")}
            >
              Active
            </DropdownMenuCheckboxItem>
            <DropdownMenuCheckboxItem
              checked={selectedStatuses.includes("waiting")}
              onCheckedChange={() => handleStatusChange("waiting")}
            >
              Waiting
            </DropdownMenuCheckboxItem>
            <DropdownMenuCheckboxItem
              checked={selectedStatuses.includes("resolved")}
              onCheckedChange={() => handleStatusChange("resolved")}
            >
              Resolved
            </DropdownMenuCheckboxItem>
            <DropdownMenuCheckboxItem
              checked={selectedStatuses.includes("archived")}
              onCheckedChange={() => handleStatusChange("archived")}
            >
              Archived
            </DropdownMenuCheckboxItem>
            
            <DropdownMenuSeparator />
            
            <DropdownMenuCheckboxItem
              checked={showUnreadOnly}
              onCheckedChange={handleUnreadChange}
            >
              Unread only
            </DropdownMenuCheckboxItem>
            
            <DropdownMenuSeparator />
            
            <div className="px-2 py-1.5">
              <Button 
                variant="ghost" 
                size="sm" 
                className="w-full"
                onClick={clearFilters}
              >
                Clear filters
              </Button>
            </div>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      
      {hasActiveFilters && (
        <div className="flex flex-wrap gap-2 mt-3">
          {selectedPlatforms.map(platform => (
            <Badge 
              key={platform}
              variant="outline"
              className="flex items-center gap-1"
            >
              {platform}
              <button 
                onClick={() => handlePlatformChange(platform)}
                className="ml-1 h-3 w-3 rounded-full"
              >
                ✕
              </button>
            </Badge>
          ))}
          
          {selectedStatuses.map(status => (
            <Badge 
              key={status}
              variant="outline"
              className="flex items-center gap-1"
            >
              {status}
              <button 
                onClick={() => handleStatusChange(status)}
                className="ml-1 h-3 w-3 rounded-full"
              >
                ✕
              </button>
            </Badge>
          ))}
          
          {showUnreadOnly && (
            <Badge 
              variant="outline"
              className="flex items-center gap-1"
            >
              Unread only
              <button 
                onClick={handleUnreadChange}
                className="ml-1 h-3 w-3 rounded-full"
              >
                ✕
              </button>
            </Badge>
          )}
        </div>
      )}
    </div>
  );
}
