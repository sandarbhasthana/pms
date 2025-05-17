import React, { useState } from "react";
import { LostFoundItem } from "@/types/lost-found-types";
import { 
  Table, 
  TableHeader, 
  TableBody, 
  TableHead, 
  TableRow, 
  TableCell 
} from "@/components/ui/table";
import { formatDate } from "@/lib/utils";
import { StatusBadge } from "./StatusBadge";
import { ArrowUpDown } from "lucide-react";
import { Button } from "@/components/ui/button";

interface LostFoundTableProps {
  items: LostFoundItem[];
  onItemSelect: (item: LostFoundItem) => void;
  selectedItemId?: string;
}

export function LostFoundTable({ items, onItemSelect, selectedItemId }: LostFoundTableProps) {
  const [sortConfig, setSortConfig] = useState<{
    key: keyof LostFoundItem,
    direction: 'asc' | 'desc'
  }>({ key: 'dateFound', direction: 'desc' });

  const sortedItems = React.useMemo(() => {
    let sortableItems = [...items];
    if (sortConfig !== null) {
      sortableItems.sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) {
          return sortConfig.direction === 'asc' ? -1 : 1;
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
          return sortConfig.direction === 'asc' ? 1 : -1;
        }
        return 0;
      });
    }
    return sortableItems;
  }, [items, sortConfig]);

  const requestSort = (key: keyof LostFoundItem) => {
    let direction: 'asc' | 'desc' = 'asc';
    if (sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
  };

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">
              <Button 
                variant="ghost" 
                onClick={() => requestSort('dateFound')}
                className="flex items-center p-1 h-auto"
              >
                Date Found
                <ArrowUpDown className="ml-2 h-4 w-4" />
              </Button>
            </TableHead>
            <TableHead>Description</TableHead>
            <TableHead>Location</TableHead>
            <TableHead>
              <Button 
                variant="ghost" 
                onClick={() => requestSort('status')}
                className="flex items-center p-1 h-auto"
              >
                Status
                <ArrowUpDown className="ml-2 h-4 w-4" />
              </Button>
            </TableHead>
            <TableHead>Found By</TableHead>
            <TableHead>Item Photo</TableHead>
            <TableHead>Linked Guest</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {sortedItems.length === 0 ? (
            <TableRow>
              <TableCell colSpan={7} className="text-center py-8">
                No items found
              </TableCell>
            </TableRow>
          ) : (
            sortedItems.map((item) => (
              <TableRow 
                key={item.id} 
                onClick={() => onItemSelect(item)} 
                className={`cursor-pointer hover:bg-muted/50 ${selectedItemId === item.id ? 'bg-muted' : ''}`}
              >
                <TableCell>{formatDate(item.dateFound)}</TableCell>
                <TableCell>{item.description}</TableCell>
                <TableCell>{item.location}</TableCell>
                <TableCell><StatusBadge status={item.status} /></TableCell>
                <TableCell>{item.finderName}</TableCell>
                <TableCell>
                  {item.photoUrl ? (
                    <div className="h-12 w-12 rounded overflow-hidden">
                      <img 
                        src={item.photoUrl} 
                        alt="Item" 
                        className="h-full w-full object-cover"
                      />
                    </div>
                  ) : (
                    <span className="text-muted-foreground text-sm">No photo</span>
                  )}
                </TableCell>
                <TableCell>{item.linkedGuestName || "—"}</TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
}
