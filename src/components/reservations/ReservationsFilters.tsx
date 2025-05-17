
import React, { useState } from "react";
import { format, addDays, subDays } from "date-fns";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { CalendarIcon, Search, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { ReservationFilter } from "@/types/stay-types";
import { roomTypes, bookingSources } from "@/services/reservations-service";

interface ReservationsFiltersProps {
  onFilterChange: (filters: ReservationFilter) => void;
}

export function ReservationsFilters({ onFilterChange }: ReservationsFiltersProps) {
  const today = new Date();
  
  // Default filter state - start with a default date range of +/- 30 days
  const [filters, setFilters] = useState<ReservationFilter>({
    dateRange: {
      start: subDays(today, 30),
      end: addDays(today, 30)
    },
    roomType: "All",
    source: "All",
    searchQuery: ""
  });

  // Apply filters
  const applyFilters = () => {
    onFilterChange(filters);
  };

  // Reset filters
  const resetFilters = () => {
    const resetFilters: ReservationFilter = {
      dateRange: {
        start: subDays(today, 30),
        end: addDays(today, 30)
      },
      roomType: "All",
      source: "All",
      searchQuery: ""
    };
    
    setFilters(resetFilters);
    onFilterChange(resetFilters);
  };

  // Update search query
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newFilters = {
      ...filters,
      searchQuery: e.target.value
    };
    setFilters(newFilters);
    
    // Apply search immediately without clicking apply
    onFilterChange(newFilters);
  };

  // Clear search query
  const clearSearch = () => {
    const newFilters = {
      ...filters,
      searchQuery: ""
    };
    setFilters(newFilters);
    onFilterChange(newFilters);
  };

  return (
    <div className="bg-white p-4 rounded-lg border mb-4">
      <div className="flex flex-col md:flex-row gap-4 mb-4">
        {/* Date Range Selector */}
        <div className="flex-1">
          <label className="block text-sm font-medium mb-1 text-gray-700">Date Range</label>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className="w-full justify-start text-left font-normal"
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {filters.dateRange?.start && filters.dateRange?.end ? (
                  <>
                    {format(filters.dateRange.start, "MMM d, yyyy")} - {format(filters.dateRange.end, "MMM d, yyyy")}
                  </>
                ) : (
                  <span>Select date range</span>
                )}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                mode="range"
                selected={{
                  from: filters.dateRange?.start || today,
                  to: filters.dateRange?.end || addDays(today, 7)
                }}
                onSelect={(range) => 
                  setFilters({
                    ...filters,
                    dateRange: {
                      start: range?.from || null,
                      end: range?.to || null
                    }
                  })
                }
                numberOfMonths={2}
                className={cn("p-3 pointer-events-auto")}
              />
            </PopoverContent>
          </Popover>
        </div>

        {/* Room Type Filter */}
        <div className="flex-1">
          <label className="block text-sm font-medium mb-1 text-gray-700">Room Type</label>
          <Select
            value={filters.roomType || "All"}
            onValueChange={(value) => setFilters({ ...filters, roomType: value })}
          >
            <SelectTrigger>
              <SelectValue placeholder="All Room Types" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="All">All Room Types</SelectItem>
              {roomTypes.map((type) => (
                <SelectItem key={type} value={type}>
                  {type}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Booking Source Filter */}
        <div className="flex-1">
          <label className="block text-sm font-medium mb-1 text-gray-700">Booking Source</label>
          <Select
            value={filters.source || "All"}
            onValueChange={(value) => setFilters({ ...filters, source: value })}
          >
            <SelectTrigger>
              <SelectValue placeholder="All Sources" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="All">All Sources</SelectItem>
              {bookingSources.map((source) => (
                <SelectItem key={source} value={source}>
                  {source}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Filter Control Buttons */}
        <div className="flex items-end space-x-2">
          <Button onClick={applyFilters}>Apply Filters</Button>
          <Button variant="outline" onClick={resetFilters}>Reset</Button>
        </div>
      </div>

      {/* Search Box */}
      <div className="relative">
        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
        <Input
          type="search"
          placeholder="Search by guest name or booking ID..."
          className="pl-8 pr-10"
          value={filters.searchQuery || ""}
          onChange={handleSearchChange}
        />
        {filters.searchQuery && (
          <button
            type="button"
            onClick={clearSearch}
            className="absolute right-2.5 top-2.5 text-gray-500 hover:text-gray-700"
          >
            <X className="h-4 w-4" />
            <span className="sr-only">Clear search</span>
          </button>
        )}
      </div>
    </div>
  );
}
