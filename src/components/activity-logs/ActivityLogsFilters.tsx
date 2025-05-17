
import React from "react";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { 
  Popover, 
  PopoverContent, 
  PopoverTrigger 
} from "@/components/ui/popover";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { Calendar as CalendarIcon } from "lucide-react";
import { DateRange } from "react-day-picker";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { MOCK_USERS, MOCK_MODULES } from "./activity-logs-mock-data";

interface ActivityLogsFiltersProps {
  filters: {
    dateRange: DateRange;
    user: string;
    module: string;
  };
  setFilters: React.Dispatch<React.SetStateAction<{
    dateRange: DateRange;
    user: string;
    module: string;
  }>>;
}

export function ActivityLogsFilters({ filters, setFilters }: ActivityLogsFiltersProps) {
  return (
    <div className="flex flex-wrap gap-2 items-center">
      {/* Date Range Picker */}
      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            className={cn(
              "w-[250px] justify-start text-left font-normal",
              !filters.dateRange && "text-muted-foreground"
            )}
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {filters.dateRange?.from ? (
              filters.dateRange.to ? (
                <>
                  {format(filters.dateRange.from, "LLL dd, y")} -{" "}
                  {format(filters.dateRange.to, "LLL dd, y")}
                </>
              ) : (
                format(filters.dateRange.from, "LLL dd, y")
              )
            ) : (
              <span>Select date range</span>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            initialFocus
            mode="range"
            defaultMonth={filters.dateRange?.from}
            selected={filters.dateRange}
            onSelect={(range) => setFilters(prev => ({ ...prev, dateRange: range || { from: undefined, to: undefined } }))}
            numberOfMonths={2}
          />
        </PopoverContent>
      </Popover>

      {/* User Filter */}
      <Select 
        value={filters.user} 
        onValueChange={(value) => setFilters(prev => ({ ...prev, user: value }))}
      >
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Select user" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All Users</SelectItem>
          {MOCK_USERS.map(user => (
            <SelectItem key={user.id} value={user.id}>
              {user.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      {/* Module Filter */}
      <Select 
        value={filters.module} 
        onValueChange={(value) => setFilters(prev => ({ ...prev, module: value }))}
      >
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Select module" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All Modules</SelectItem>
          {MOCK_MODULES.map(module => (
            <SelectItem key={module.id} value={module.id}>
              {module.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      {/* Reset Filters */}
      <Button 
        variant="ghost" 
        onClick={() => setFilters({
          dateRange: { from: undefined, to: undefined },
          user: "all",
          module: "all"
        })}
        className="ml-2"
      >
        Reset
      </Button>
    </div>
  );
}
