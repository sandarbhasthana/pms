
import React, { useState } from "react";
import { format } from "date-fns";
import { 
  Table, 
  TableBody, 
  TableCaption, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Reservation, ReservationFilter } from "@/types/stay-types";
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { MoreHorizontal, Eye, Edit, XCircle } from "lucide-react";
import { toast } from "sonner";

interface ReservationsTableProps {
  reservations: Reservation[];
  isLoading: boolean;
}

export function ReservationsTable({ reservations, isLoading }: ReservationsTableProps) {
  // Helper function to get badge variant based on status
  const getStatusBadgeVariant = (status: string) => {
    switch (status) {
      case "confirmed":
        return "secondary";
      case "checked-in":
        return "success";
      case "tentative":
        return "warning";
      case "cancelled":
        return "destructive";
      default:
        return "outline";
    }
  };

  // Helper function to get payment status badge variant
  const getPaymentBadgeVariant = (status?: string) => {
    switch (status) {
      case "Paid":
        return "success";
      case "Partially Paid":
        return "warning";
      case "Unpaid":
        return "outline";
      default:
        return "outline";
    }
  };

  const handleViewDetails = (id: string) => {
    toast.info(`Viewing details for reservation ${id}`);
    // In a real app, this would open a modal or navigate to a details page
  };

  const handleEdit = (id: string) => {
    toast.info(`Editing reservation ${id}`);
    // In a real app, this would open the edit form
  };

  const handleCancel = (id: string) => {
    toast.info(`Cancelling reservation ${id}`);
    // In a real app, this would open a confirmation dialog
  };

  return (
    <div className="border rounded-md">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Booking ID</TableHead>
            <TableHead>Guest Name</TableHead>
            <TableHead>Check-in</TableHead>
            <TableHead>Check-out</TableHead>
            <TableHead>Room Type</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Source</TableHead>
            <TableHead>Payment</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {isLoading ? (
            <TableRow>
              <TableCell colSpan={9} className="text-center py-8">
                Loading reservations...
              </TableCell>
            </TableRow>
          ) : reservations.length === 0 ? (
            <TableRow>
              <TableCell colSpan={9} className="text-center py-8">
                No reservations found. Try adjusting your filters.
              </TableCell>
            </TableRow>
          ) : (
            reservations.map((reservation) => (
              <TableRow key={reservation.id}>
                <TableCell className="font-medium">{reservation.bookingId}</TableCell>
                <TableCell>{reservation.guestName}</TableCell>
                <TableCell>{format(new Date(reservation.checkIn), "MMM dd, yyyy")}</TableCell>
                <TableCell>{format(new Date(reservation.checkOut), "MMM dd, yyyy")}</TableCell>
                <TableCell>{reservation.roomType || "Unassigned"}</TableCell>
                <TableCell>
                  <Badge variant={getStatusBadgeVariant(reservation.status) as any}>
                    {reservation.status.charAt(0).toUpperCase() + reservation.status.slice(1)}
                  </Badge>
                </TableCell>
                <TableCell>{reservation.source || "N/A"}</TableCell>
                <TableCell>
                  <Badge variant={getPaymentBadgeVariant(reservation.paymentStatus) as any}>
                    {reservation.paymentStatus || "N/A"}
                  </Badge>
                </TableCell>
                <TableCell className="text-right">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon">
                        <MoreHorizontal className="h-4 w-4" />
                        <span className="sr-only">Open menu</span>
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem onClick={() => handleViewDetails(reservation.id)}>
                        <Eye className="mr-2 h-4 w-4" /> View details
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => handleEdit(reservation.id)}>
                        <Edit className="mr-2 h-4 w-4" /> Edit
                      </DropdownMenuItem>
                      <DropdownMenuItem 
                        onClick={() => handleCancel(reservation.id)}
                        className="text-destructive focus:text-destructive"
                      >
                        <XCircle className="mr-2 h-4 w-4" /> Cancel
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
}
