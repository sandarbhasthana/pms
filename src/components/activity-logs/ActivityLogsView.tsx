
import React, { useState } from "react";
import { Search } from "lucide-react";
import { ActivityLogsTable } from "./ActivityLogsTable";
import { ActivityLogsFilters } from "./ActivityLogsFilters";
import { useActivityLogs } from "@/hooks/useActivityLogs";

export function ActivityLogsView() {
  const [searchQuery, setSearchQuery] = useState("");
  const [filters, setFilters] = useState({
    dateRange: { from: undefined, to: undefined },
    user: "all",
    module: "all"
  });
  
  const { 
    logs, 
    isLoading, 
    pagination, 
    setPagination 
  } = useActivityLogs(searchQuery, filters);

  return (
    <div className="container p-6 max-w-full space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-pms-purple">User Activity Logs</h1>
      </div>
      
      <div className="bg-white rounded-lg shadow border border-border">
        <div className="p-4 border-b border-border">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            {/* Search */}
            <div className="relative w-full md:w-80">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <input
                type="search"
                placeholder="Search logs by keyword, user, or reservation..."
                className="pl-10 pr-4 py-2 w-full rounded-md border border-gray-200 focus:outline-none focus:ring-2 focus:ring-pms-purple"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            
            {/* Filters */}
            <ActivityLogsFilters filters={filters} setFilters={setFilters} />
          </div>
        </div>
        
        {/* Logs Table */}
        <ActivityLogsTable 
          logs={logs} 
          isLoading={isLoading}
          pagination={pagination}
          setPagination={setPagination}
        />
      </div>
    </div>
  );
}
