
import { useState, useEffect } from "react";
import { ActivityLog } from "@/types/activity-logs-types";
import { MOCK_ACTIVITY_LOGS } from "@/components/activity-logs/activity-logs-mock-data";
import { DateRange } from "react-day-picker";
import { startOfDay, endOfDay, isWithinInterval } from "date-fns";

interface Filters {
  dateRange: DateRange;
  user: string;
  module: string;
}

export function useActivityLogs(searchQuery: string, filters: Filters) {
  const [logs, setLogs] = useState<ActivityLog[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [pagination, setPagination] = useState({
    currentPage: 1,
    totalPages: 1,
    pageSize: 10
  });
  
  useEffect(() => {
    setIsLoading(true);
    
    // Simulate API call with setTimeout
    const timer = setTimeout(() => {
      // Apply filters and search
      let filteredLogs = [...MOCK_ACTIVITY_LOGS];
      
      // Date range filter
      if (filters.dateRange && filters.dateRange.from) {
        filteredLogs = filteredLogs.filter(log => {
          const logDate = new Date(log.timestamp);
          
          if (filters.dateRange.to) {
            return isWithinInterval(logDate, {
              start: startOfDay(filters.dateRange.from),
              end: endOfDay(filters.dateRange.to)
            });
          }
          
          // If only "from" is specified
          return logDate >= startOfDay(filters.dateRange.from);
        });
      }
      
      // User filter
      if (filters.user !== 'all') {
        filteredLogs = filteredLogs.filter(log => log.user.id === filters.user);
      }
      
      // Module filter
      if (filters.module !== 'all') {
        filteredLogs = filteredLogs.filter(log => log.module === filters.module);
      }
      
      // Search query
      if (searchQuery.trim() !== '') {
        const query = searchQuery.toLowerCase();
        filteredLogs = filteredLogs.filter(log => {
          return (
            log.action.toLowerCase().includes(query) ||
            log.module.toLowerCase().includes(query) ||
            log.user.name.toLowerCase().includes(query) ||
            (log.target && log.target.toLowerCase().includes(query))
          );
        });
      }
      
      // Calculate pagination
      const totalPages = Math.max(1, Math.ceil(filteredLogs.length / pagination.pageSize));
      
      // Reset to page 1 if filters changed and current page would be out of bounds
      let currentPage = pagination.currentPage;
      if (currentPage > totalPages) {
        currentPage = 1;
      }
      
      // Get current page data
      const startIndex = (currentPage - 1) * pagination.pageSize;
      const paginatedLogs = filteredLogs.slice(
        startIndex, 
        startIndex + pagination.pageSize
      );
      
      setLogs(paginatedLogs);
      setPagination(prev => ({ 
        ...prev, 
        totalPages,
        currentPage
      }));
      setIsLoading(false);
    }, 500);
    
    return () => clearTimeout(timer);
  }, [searchQuery, filters, pagination.currentPage, pagination.pageSize]);
  
  return { logs, isLoading, pagination, setPagination };
}
