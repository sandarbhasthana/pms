
import React from "react";
import { useDrop } from "react-dnd";
import { isSameDay, isWithinInterval } from "date-fns";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card";
import { Room, Reservation, ReservationDragItem } from "@/types/stay-types";
import ReservationBar from "./ReservationBar";
import { toast } from "sonner";

interface TimelineRowProps {
  room: Room;
  dateRange: Date[];
  reservations: Reservation[];
  onCellClick: (roomId: string, date: Date) => void;
}

// This component is kept for reference but its functionality has been
// integrated into ReservationTimeline.tsx for the enhanced scrollable design
const TimelineRow = ({ room, dateRange, reservations, onCellClick }: TimelineRowProps) => {
  // Handle dropping a reservation onto this row
  const [{ isOver, canDrop }, drop] = useDrop({
    accept: "reservation",
    canDrop: (item: ReservationDragItem) => {
      // Check if there are any overlapping reservations
      const overlaps = reservations.some(res => {
        const itemStart = item.startDate;
        const itemEnd = item.endDate;
        const resStart = res.checkIn;
        const resEnd = res.checkOut;
        
        return (
          (itemStart >= resStart && itemStart < resEnd) ||
          (itemEnd > resStart && itemEnd <= resEnd) ||
          (itemStart <= resStart && itemEnd >= resEnd)
        );
      });
      
      return !overlaps;
    },
    drop: (item: ReservationDragItem) => {
      if (item.originalRoomId !== room.id) {
        toast.success(`Reservation moved to Room ${room.number}`);
      }
      return { roomId: room.id };
    },
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
      canDrop: !!monitor.canDrop(),
    }),
  });

  // Determine if a date cell has a reservation
  const hasReservationOnDate = (date: Date) => {
    return reservations.some(res => 
      isWithinInterval(date, { start: res.checkIn, end: new Date(res.checkOut.getTime() - 1) })
    );
  };

  return (
    <div 
      className={`flex border-b group ${isOver && canDrop ? "bg-green-50" : isOver && !canDrop ? "bg-red-50" : ""}`}
      ref={drop}
    >
      {/* Room information cell */}
      <HoverCard>
        <HoverCardTrigger asChild>
          <div className="w-40 min-w-[160px] shrink-0 p-3 font-medium border-r flex items-center">
            {room.number} - {room.type}
          </div>
        </HoverCardTrigger>
        <HoverCardContent className="w-80">
          <div className="space-y-2">
            <h4 className="text-sm font-semibold">Room {room.number}</h4>
            <div className="grid grid-cols-2 gap-2 text-sm">
              <div className="text-muted-foreground">Type:</div>
              <div>{room.type}</div>
              <div className="text-muted-foreground">Floor:</div>
              <div>{room.floor}</div>
              <div className="text-muted-foreground">Status:</div>
              <div>
                <span className={`inline-flex items-center rounded-full px-2 py-1 text-xs ${
                  room.status === "clean" ? "bg-green-100 text-green-800" : 
                  room.status === "dirty" ? "bg-amber-100 text-amber-800" : 
                  room.status === "maintenance" ? "bg-red-100 text-red-800" : 
                  "bg-blue-100 text-blue-800"
                }`}>
                  {room.status}
                </span>
              </div>
            </div>
            <div className="text-xs text-muted-foreground">
              <span className="font-semibold">Features:</span> {room.features.join(", ")}
            </div>
          </div>
        </HoverCardContent>
      </HoverCard>

      {/* Date cells */}
      <div className="flex flex-1">
        {dateRange.map((date) => {
          const hasReservation = hasReservationOnDate(date);
          
          return (
            <div 
              key={date.toISOString()} 
              className={`w-32 min-w-[128px] h-16 border-r flex items-center justify-center relative
                ${hasReservation ? "" : "hover:bg-gray-50 cursor-pointer"}`}
              onClick={() => !hasReservation && onCellClick(room.id, date)}
            >
              {/* This is just a placeholder for the cell background */}
            </div>
          );
        })}
      </div>

      {/* Overlay reservations on top of the cells */}
      {reservations.map((reservation) => (
        <ReservationBar
          key={reservation.id}
          reservation={reservation}
          dateRange={dateRange}
        />
      ))}
    </div>
  );
};

export default TimelineRow;
