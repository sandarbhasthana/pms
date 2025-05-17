
import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue 
} from "@/components/ui/select";
import { Search } from "lucide-react";

interface SearchBarProps {
  onSearch: (term: string, status: string | null) => void;
}

export function SearchBar({ onSearch }: SearchBarProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [status, setStatus] = useState<string | null>(null);

  const handleSearch = () => {
    onSearch(searchTerm, status);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <div className="flex flex-col sm:flex-row gap-3">
      <div className="relative flex-1">
        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
        <Input
          type="text"
          placeholder="Search by description, location or guest name..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onKeyDown={handleKeyDown}
          className="pl-8"
        />
      </div>
      
      <Select
        value={status || ""}
        onValueChange={(value) => {
          setStatus(value === "all" ? null : value);
          onSearch(searchTerm, value === "all" ? null : value);
        }}
      >
        <SelectTrigger className="w-full sm:w-[180px]">
          <SelectValue placeholder="Filter by status" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All Statuses</SelectItem>
          <SelectItem value="Stored">Stored</SelectItem>
          <SelectItem value="Returned to Guest">Returned to Guest</SelectItem>
          <SelectItem value="Disposed">Disposed</SelectItem>
          <SelectItem value="In Process">In Process</SelectItem>
        </SelectContent>
      </Select>
      
      <Button onClick={handleSearch}>Search</Button>
    </div>
  );
}
