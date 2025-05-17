
import React from "react";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { 
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious
} from "@/components/ui/pagination";
import { format } from "date-fns";
import { ActivityLog } from "@/types/activity-logs-types";
import { cn } from "@/lib/utils";

interface ActivityLogsTableProps {
  logs: ActivityLog[];
  isLoading: boolean;
  pagination: {
    currentPage: number;
    totalPages: number;
    pageSize: number;
  };
  setPagination: React.Dispatch<React.SetStateAction<{
    currentPage: number;
    totalPages: number;
    pageSize: number;
  }>>;
}

export function ActivityLogsTable({ 
  logs, 
  isLoading,
  pagination,
  setPagination
}: ActivityLogsTableProps) {
  
  const renderPaginationItems = () => {
    const items = [];
    const maxVisiblePages = 5;
    const { currentPage, totalPages } = pagination;
    
    // Always show first page
    items.push(
      <PaginationItem key="first">
        <PaginationLink 
          isActive={currentPage === 1} 
          onClick={() => setPagination(prev => ({ ...prev, currentPage: 1 }))}
        >
          1
        </PaginationLink>
      </PaginationItem>
    );
    
    // Show ellipsis if there are many pages before current
    if (currentPage > 3) {
      items.push(
        <PaginationItem key="ellipsis-start">
          <PaginationEllipsis />
        </PaginationItem>
      );
    }
    
    // Calculate range of visible page numbers
    let startPage = Math.max(2, currentPage - 1);
    let endPage = Math.min(totalPages - 1, currentPage + 1);
    
    // Adjust range if at the start or end
    if (currentPage <= 3) {
      endPage = Math.min(totalPages - 1, maxVisiblePages - 1);
    } else if (currentPage >= totalPages - 2) {
      startPage = Math.max(2, totalPages - maxVisiblePages + 2);
    }
    
    // Add visible page numbers
    for (let i = startPage; i <= endPage; i++) {
      items.push(
        <PaginationItem key={i}>
          <PaginationLink 
            isActive={currentPage === i}
            onClick={() => setPagination(prev => ({ ...prev, currentPage: i }))}
          >
            {i}
          </PaginationLink>
        </PaginationItem>
      );
    }
    
    // Show ellipsis if there are many pages after current
    if (currentPage < totalPages - 2) {
      items.push(
        <PaginationItem key="ellipsis-end">
          <PaginationEllipsis />
        </PaginationItem>
      );
    }
    
    // Always show last page if not first page
    if (totalPages > 1) {
      items.push(
        <PaginationItem key="last">
          <PaginationLink 
            isActive={currentPage === totalPages}
            onClick={() => setPagination(prev => ({ ...prev, currentPage: totalPages }))}
          >
            {totalPages}
          </PaginationLink>
        </PaginationItem>
      );
    }
    
    return items;
  };
  
  return (
    <div>
      <div className="relative overflow-x-auto">
        <Table className="font-mono text-sm">
          <TableHeader>
            <TableRow>
              <TableHead className="w-[180px]">Timestamp</TableHead>
              <TableHead>User</TableHead>
              <TableHead>Module/Area</TableHead>
              <TableHead className="w-[40%]">Action</TableHead>
              <TableHead>Target</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading ? (
              Array.from({ length: 5 }).map((_, index) => (
                <TableRow key={index}>
                  <TableCell colSpan={5} className="h-12">
                    <div className="w-full h-4 bg-gray-200 rounded animate-pulse"></div>
                  </TableCell>
                </TableRow>
              ))
            ) : logs.length === 0 ? (
              <TableRow>
                <TableCell colSpan={5} className="h-24 text-center">
                  No log entries found matching your criteria.
                </TableCell>
              </TableRow>
            ) : (
              logs.map((log) => (
                <TableRow 
                  key={log.id} 
                  className={cn(
                    log.severity === 'error' && 'bg-red-50 text-red-900',
                    log.severity === 'warning' && 'bg-amber-50 text-amber-900',
                    log.type === 'deletion' && 'bg-gray-50'
                  )}
                >
                  <TableCell className="font-medium">
                    {format(new Date(log.timestamp), "yyyy-MM-dd HH:mm")}
                  </TableCell>
                  <TableCell>{log.user.name}</TableCell>
                  <TableCell>{log.module}</TableCell>
                  <TableCell>{log.action}</TableCell>
                  <TableCell>
                    {log.target ? (
                      <span className="px-2 py-1 bg-gray-100 rounded text-xs">{log.target}</span>
                    ) : null}
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
      
      {/* Pagination */}
      {logs.length > 0 && (
        <div className="py-4 px-2">
          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious 
                  onClick={() => setPagination(prev => ({ 
                    ...prev, 
                    currentPage: Math.max(1, prev.currentPage - 1) 
                  }))} 
                  aria-disabled={pagination.currentPage === 1}
                  className={pagination.currentPage === 1 ? "pointer-events-none opacity-50" : ""}
                />
              </PaginationItem>
              
              {renderPaginationItems()}
              
              <PaginationItem>
                <PaginationNext 
                  onClick={() => setPagination(prev => ({ 
                    ...prev, 
                    currentPage: Math.min(prev.totalPages, prev.currentPage + 1) 
                  }))}
                  aria-disabled={pagination.currentPage === pagination.totalPages}
                  className={pagination.currentPage === pagination.totalPages ? "pointer-events-none opacity-50" : ""}
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>
      )}
    </div>
  );
}
