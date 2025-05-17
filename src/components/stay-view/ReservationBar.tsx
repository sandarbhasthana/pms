
import React, { useState, useEffect } from "react";
import { useDrag } from "react-dnd";
import { 
  format, 
  differenceInCalendarDays,
  isSameDay,
  isWithinInterval
} from "date-fns";
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { 
  Dialog,
  DialogTitle,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Reservation } from "@/types/stay-types";
import { toast } from "sonner";
import {
  LogOut,
  Pencil,
  X,
  MessageSquarePlus,
  CalendarRange
} from "lucide-react";

interface ReservationBarProps {
  reservation: Reservation;
  dateRange?: Date[];
  isUnassigned?: boolean;
  compact?: boolean;
}

const ReservationBar = ({ 
  reservation, 
  dateRange = [], 
  isUnassigned = false,
  compact = false
}: ReservationBarProps) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [dialogMode, setDialogMode] = useState<"details" | "roomChange">("details");
  
  // Remove the dragCompleted state as it's causing issues with drag persistence

  // Find the position and width for the reservation bar
  const startIndex = dateRange.findIndex(date => isSameDay(date, reservation.checkIn));
  const duration = differenceInCalendarDays(reservation.checkOut, reservation.checkIn);
  
  const calculateWidth = () => {
    if (isUnassigned) return "auto";
    return `calc(${duration * (compact ? 96 : 128)}px)`;
  };
  
  const calculateLeft = () => {
    if (isUnassigned) return "0";
    const offset = compact ? 48 : 0;
    return `calc(${startIndex * (compact ? 96 : 128)}px + ${offset}px)`;
  };

  // Set up drag and drop for the reservation
  const [{ isDragging }, drag] = useDrag({
    type: "reservation",
    item: () => ({
      id: reservation.id,
      originalRoomId: reservation.roomId,
      startDate: reservation.checkIn,
      endDate: reservation.checkOut,
    }),
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
    end: (item, monitor) => {
      const dropResult = monitor.getDropResult<{ roomId: string }>();
      if (dropResult && item.originalRoomId !== dropResult.roomId) {
        setDialogMode("roomChange");
        setIsDialogOpen(true);
      }
    },
    // Remove canDrag condition that was preventing subsequent drags
  });

  // Determine the status color of the reservation
  const getStatusColor = () => {
    switch (reservation.status) {
      case "confirmed":
        return "bg-green-500";
      case "pending":
        return "bg-yellow-500";
      case "cancelled":
        return "bg-red-500";
      case "checked-in":
        return "bg-blue-500";
      default:
        return "bg-gray-500";
    }
  };

  // Handle right-click context menu
  const handleContextMenu = (event: React.MouseEvent) => {
    event.preventDefault();
    // Context menu is handled by the dropdown component
  };

  // Handle various reservation actions
  const handleCheckOut = () => {
    toast.success(`Guest checked out from Room ${reservation.roomId}`);
  };

  const handleModifyBooking = () => {
    toast.info("Opening booking modification form");
  };

  const handleCancelBooking = () => {
    toast.info("Opening cancellation confirmation");
  };

  const handleAddNote = () => {
    toast.info("Opening note editor");
  };
  
  // Close dialog and reset state
  const handleCloseDialog = () => {
    setIsDialogOpen(false);
    // Remove the dragCompleted reset as we've removed that state
  };
  
  // Determine whether the reservation bar should be visible
  const isVisible = dateRange.some(date => 
    isWithinInterval(date, { 
      start: reservation.checkIn, 
      end: new Date(reservation.checkOut.getTime() - 1) 
    })
  );
  
  if (!isVisible && !isUnassigned) return null;

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <div
            ref={drag}
            className={`absolute z-20 px-2 py-1 rounded-md text-xs ${
              isUnassigned 
                ? "m-1 static" 
                : "cursor-grab"
            } ${
              compact ? "h-8" : "h-12"
            } ${
              isDragging ? "opacity-50" : "opacity-100"
            } ${getStatusColor()} text-white overflow-hidden`}
            style={{
              left: isUnassigned ? undefined : calculateLeft(),
              width: calculateWidth(),
              top: compact ? "2px" : "6px",
            }}
            onClick={() => setIsDialogOpen(true)}
            onContextMenu={handleContextMenu}
          >
            <div className="font-medium">
              {reservation.guestName}
            </div>
            <div className="text-white/90 text-[10px]">
              {format(reservation.checkIn, "MMM d")} - {format(reservation.checkOut, "MMM d")}
            </div>
          </div>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56">
          <DropdownMenuItem onClick={() => setIsDialogOpen(true)}>
            <CalendarRange className="w-4 h-4 mr-2" />
            View Details
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={handleCheckOut}>
            <LogOut className="w-4 h-4 mr-2" />
            Check Out
          </DropdownMenuItem>
          <DropdownMenuItem onClick={handleModifyBooking}>
            <Pencil className="w-4 h-4 mr-2" />
            Modify Booking
          </DropdownMenuItem>
          <DropdownMenuItem onClick={handleCancelBooking} className="text-red-500">
            <X className="w-4 h-4 mr-2" />
            Cancel Booking
          </DropdownMenuItem>
          <DropdownMenuItem onClick={handleAddNote}>
            <MessageSquarePlus className="w-4 h-4 mr-2" />
            Add Note
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <Dialog open={isDialogOpen} onOpenChange={handleCloseDialog}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>
              {dialogMode === "details" 
                ? "Reservation Details" 
                : "Change Room Type"
              }
            </DialogTitle>
            <DialogDescription>
              {dialogMode === "details"
                ? `Reservation for ${reservation.guestName}`
                : "The room you've selected is a different type than the original booking."
              }
            </DialogDescription>
          </DialogHeader>
          
          {dialogMode === "details" ? (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-2 text-sm">
                <div className="font-medium">Guest:</div>
                <div>{reservation.guestName}</div>
                <div className="font-medium">Check-In:</div>
                <div>{format(reservation.checkIn, "MMMM d, yyyy")}</div>
                <div className="font-medium">Check-Out:</div>
                <div>{format(reservation.checkOut, "MMMM d, yyyy")}</div>
                <div className="font-medium">Nights:</div>
                <div>{duration}</div>
                <div className="font-medium">Rate Plan:</div>
                <div>{reservation.ratePlan || "Standard"}</div>
                <div className="font-medium">Status:</div>
                <div className="capitalize">{reservation.status}</div>
                <div className="font-medium">Room:</div>
                <div>{reservation.roomId || "Unassigned"}</div>
              </div>
              <div>
                <h4 className="font-medium mb-1">Notes:</h4>
                <p className="text-sm text-gray-600">{reservation.notes || "No notes available."}</p>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              <p>Would you like to maintain the current rate or apply the new room's pricing?</p>
              <div className="flex gap-4">
                <Button onClick={() => {
                  toast.success("Room changed with original rate");
                  handleCloseDialog();
                }}>
                  Keep Original Rate
                </Button>
                <Button onClick={() => {
                  toast.success("Room changed with new pricing");
                  handleCloseDialog();
                }}>
                  Apply New Rate
                </Button>
              </div>
            </div>
          )}
          
          <DialogFooter>
            {dialogMode === "details" && (
              <Button onClick={handleCloseDialog}>
                Close
              </Button>
            )}
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default ReservationBar;
