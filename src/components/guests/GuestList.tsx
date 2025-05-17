
import React from "react";
import { GuestProfile } from "@/types/guest-types";
import { Card, CardContent } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Star } from "lucide-react";
import { formatDate } from "@/lib/utils";

interface GuestListProps {
  guests: GuestProfile[];
  selectedGuestId: string | undefined;
  onGuestSelect: (guest: GuestProfile) => void;
}

const GuestList = ({ guests, selectedGuestId, onGuestSelect }: GuestListProps) => {
  return (
    <Card className="h-[calc(100vh-16rem)] overflow-hidden">
      <CardContent className="p-0">
        <div className="overflow-auto h-full">
          <Table>
            <TableHeader className="sticky top-0 bg-background z-10">
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead className="hidden md:table-cell">Contact</TableHead>
                <TableHead className="hidden lg:table-cell">Last Stay</TableHead>
                <TableHead className="text-center">VIP</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {guests.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={4} className="text-center py-10 text-muted-foreground">
                    No guests found
                  </TableCell>
                </TableRow>
              ) : (
                guests.map(guest => (
                  <TableRow 
                    key={guest.id} 
                    onClick={() => onGuestSelect(guest)}
                    className={`cursor-pointer hover:bg-muted/50 transition-colors ${
                      selectedGuestId === guest.id ? "bg-muted" : ""
                    }`}
                  >
                    <TableCell className="font-medium">
                      {guest.firstName} {guest.lastName}
                    </TableCell>
                    <TableCell className="hidden md:table-cell">
                      <div className="flex flex-col text-sm">
                        <span>{guest.email}</span>
                        <span className="text-muted-foreground">{guest.phone}</span>
                      </div>
                    </TableCell>
                    <TableCell className="hidden lg:table-cell">
                      {guest.lastStay ? formatDate(guest.lastStay) : 'Never'}
                    </TableCell>
                    <TableCell className="text-center">
                      {guest.vipLevel !== 'None' && (
                        <Badge 
                          variant="outline" 
                          className={`
                            ${guest.vipLevel === 'Gold' || guest.vipLevel === 'Platinum' 
                              ? 'border-amber-500 text-amber-500' 
                              : guest.vipLevel === 'Silver' 
                                ? 'border-slate-400 text-slate-400' 
                                : 'border-amber-800 text-amber-800'}
                          `}
                        >
                          <Star className="h-3 w-3 mr-1" />
                          {guest.vipLevel}
                        </Badge>
                      )}
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
};

export default GuestList;
