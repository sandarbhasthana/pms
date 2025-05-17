
import React from "react";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

interface GuestSearchBarProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
}

const GuestSearchBar = ({ searchQuery, setSearchQuery }: GuestSearchBarProps) => {
  return (
    <div className="relative">
      <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
      <Input
        placeholder="Search guests by name, email, or phone..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="pl-10"
      />
    </div>
  );
};

export default GuestSearchBar;
