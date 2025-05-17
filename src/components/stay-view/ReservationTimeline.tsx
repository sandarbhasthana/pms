
import React, { useState, useRef, useEffect, useCallback } from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { 
  format, 
  addDays, 
  startOfMonth, 
  endOfMonth, 
  eachDayOfInterval, 
  isSameDay, 
  isWeekend, 
  isFriday, 
  isSaturday, 
  isSunday,
  isWithinInterval
} from "date-fns";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { 
  ChevronLeft, 
  ChevronRight,
  Calendar as CalendarIcon
} from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { toast } from "sonner";
import { Room, Reservation } from "@/types/stay-types";
import TimelineRow from "./TimelineRow";
import ReservationBar from "./ReservationBar";
import NewReservationDialog from "./NewReservationDialog";
import RoomAssignmentTools from "./RoomAssignmentTools";
import { fetchRooms, fetchReservations } from "@/services/stay-service";

const ReservationTimeline = () => {
  const timelineRef = useRef<HTMLDivElement>(null);
  const dateHeaderRef = useRef<HTMLDivElement>(null);
  const [currentDate, setCurrentDate] = useState(new Date());
  const [visibleDays, setVisibleDays] = useState(14);
  const [newReservationDialog, setNewReservationDialog] = useState({
    isOpen: false,
    roomId: "",
    date: new Date(),
  });
  
  // Calculate the start and end dates for the visible period
  const viewStart = startOfMonth(currentDate);
  const viewEnd = endOfMonth(currentDate);
  
  // Generate array of dates for the timeline
  const dateRange = eachDayOfInterval({
    start: viewStart,
    end: viewEnd,
  });

  // Fetch rooms and reservations data with proper query key dependencies
  const { data: rooms = [], refetch: refetchRooms } = useQuery({
    queryKey: ["rooms"],
    queryFn: fetchRooms,
  });

  const { data: reservations = [], refetch: refetchReservations } = useQuery({
    queryKey: ["reservations", viewStart.toISOString(), viewEnd.toISOString()],
    queryFn: () => fetchReservations(viewStart, viewEnd),
  });

  // Handle opening the new reservation dialog
  const handleCellClick = (roomId: string, date: Date) => {
    setNewReservationDialog({
      isOpen: true,
      roomId,
      date,
    });
  };

  // Handle month navigation
  const handlePrevMonth = () => {
    const newDate = new Date(currentDate);
    newDate.setMonth(newDate.getMonth() - 1);
    setCurrentDate(newDate);
  };

  const handleNextMonth = () => {
    const newDate = new Date(currentDate);
    newDate.setMonth(newDate.getMonth() + 1);
    setCurrentDate(newDate);
  };

  // Sync horizontal scrolling between header and body
  const handleBodyScroll = useCallback(() => {
    if (timelineRef.current && dateHeaderRef.current) {
      dateHeaderRef.current.scrollLeft = timelineRef.current.scrollLeft;
    }
  }, []);

  // Set up scroll synchronization with proper cleanup
  useEffect(() => {
    const timelineElement = timelineRef.current;
    if (timelineElement) {
      timelineElement.addEventListener('scroll', handleBodyScroll);
      return () => {
        timelineElement.removeEventListener('scroll', handleBodyScroll);
      };
    }
  }, [handleBodyScroll]);

  // Handle dialog close and refresh data
  const handleDialogClose = useCallback(() => {
    setNewReservationDialog(prev => ({ ...prev, isOpen: false }));
    // Always refresh data when dialog closes to ensure UI is updated
    refetchReservations();
  }, [refetchReservations]);

  // Refresh data when month changes
  useEffect(() => {
    refetchReservations();
  }, [viewStart, viewEnd, refetchReservations]);

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="flex flex-col bg-white rounded-lg shadow-md">
        <div className="flex justify-between items-center p-4 border-b">
          <div className="flex items-center gap-2">
            <Button variant="outline" size="icon" onClick={handlePrevMonth}>
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <h2 className="text-xl font-semibold">
              {format(currentDate, "MMMM yyyy")}
            </h2>
            <Button variant="outline" size="icon" onClick={handleNextMonth}>
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
          
          <RoomAssignmentTools />
        </div>

        {/* Horizontally scrollable timeline with sticky date headers */}
        <div className="relative border-b">
          <div 
            ref={dateHeaderRef}
            className="flex sticky top-0 z-10 bg-white overflow-x-auto scrollbar-hide"
          >
            <div className="w-40 min-w-[160px] shrink-0 p-3 font-semibold border-r bg-white">
              Room
            </div>
            <div className="flex">
              {dateRange.map((date) => {
                const isWeekendDay = isSaturday(date) || isSunday(date);
                const isFridayDay = isFriday(date);
                
                return (
                  <div
                    key={`header-${date.toISOString()}`}
                    className={`w-24 min-w-[96px] shrink-0 p-2 text-center border-r font-medium
                      ${isFridayDay || isSaturday(date) ? "bg-purple-50" : 
                        isSunday(date) ? "bg-orange-50" : "bg-white"}`}
                  >
                    <div>{format(date, "EEE")}</div>
                    <div className="text-lg">{format(date, "d")}</div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Timeline body with rooms and reservations */}
        <div 
          className="relative overflow-auto max-h-[calc(100vh-280px)]" 
          ref={timelineRef}
          style={{ overflowY: 'auto', overflowX: 'auto' }}
        >
          <div className="flex">
            {/* Room column - fixed on horizontal scroll */}
            <div 
              className="w-40 min-w-[160px] shrink-0 sticky left-0 z-10 bg-white"
            >
              {rooms.map((room) => (
                <div 
                  key={`room-${room.id}`}
                  className="h-12 p-3 font-medium border-r border-b flex items-center"
                >
                  <HoverCard>
                    <HoverCardTrigger asChild>
                      <div className="cursor-pointer">
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
                </div>
              ))}
              
              {/* Unassigned row header */}
              <div className="h-12 p-3 font-medium border-r border-b flex items-center bg-gray-100">
                Unassigned
              </div>
            </div>
            
            {/* Grid cells for rooms and dates */}
            <div className="flex-grow">
              {rooms.map((room) => (
                <div 
                  key={`grid-${room.id}`}
                  className="flex h-12 relative"
                >
                  {dateRange.map((date) => {
                    const isFridayDay = isFriday(date);
                    const isSaturdayDay = isSaturday(date);
                    const isSundayDay = isSunday(date);
                    
                    const bgColor = isFridayDay || isSaturdayDay 
                      ? "bg-purple-50 hover:bg-purple-100" 
                      : isSundayDay 
                        ? "bg-orange-50 hover:bg-orange-100" 
                        : "bg-white hover:bg-gray-50";
                        
                    const hasReservation = reservations.some(res => 
                      res.roomId === room.id && 
                      isWithinInterval(date, { 
                        start: res.checkIn, 
                        end: new Date(res.checkOut.getTime() - 1) 
                      })
                    );
                    
                    return (
                      <div 
                        key={`cell-${room.id}-${date.toISOString()}`}
                        className={`w-24 min-w-[96px] border-r border-b flex items-center justify-center relative
                          ${bgColor} ${!hasReservation ? "cursor-pointer" : ""}`}
                        onClick={() => !hasReservation && handleCellClick(room.id, date)}
                      >
                        {/* Cell background placeholder */}
                      </div>
                    );
                  })}
                  
                  {/* Overlay reservations for this room */}
                  {reservations
                    .filter(res => res.roomId === room.id)
                    .map(reservation => (
                      <ReservationBar
                        key={`bar-${reservation.id}-${room.id}`}
                        reservation={reservation}
                        dateRange={dateRange}
                        compact={true}
                      />
                    ))}
                </div>
              ))}
              
              {/* Unassigned reservations row */}
              <div className="flex h-12 relative bg-gray-50 border-b">
                {dateRange.map((date) => (
                  <div 
                    key={`unassigned-cell-${date.toISOString()}`}
                    className="w-24 min-w-[96px] border-r"
                  ></div>
                ))}
                
                {/* Display unassigned reservations */}
                <div className="absolute left-0 top-0 p-1 flex gap-1 flex-wrap">
                  {reservations
                    .filter(res => res.roomId === null)
                    .map(reservation => (
                      <ReservationBar
                        key={`unassigned-${reservation.id}`}
                        reservation={reservation}
                        dateRange={dateRange}
                        isUnassigned={true}
                        compact={true}
                      />
                    ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {newReservationDialog.isOpen && (
        <NewReservationDialog
          roomId={newReservationDialog.roomId}
          date={newReservationDialog.date}
          onClose={handleDialogClose}
        />
      )}
    </DndProvider>
  );
};

export default ReservationTimeline;
