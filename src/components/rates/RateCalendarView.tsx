
import React, { useState } from "react";
import { 
  format, 
  startOfWeek, 
  addDays, 
  isSameDay, 
  isToday, 
  isSameMonth, 
  addWeeks,
  startOfMonth,
  endOfMonth,
  getDay,
  parse,
  getWeeksInMonth,
  isFriday,
  isSaturday,
  isSunday
} from "date-fns";
import { cn } from "@/lib/utils";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { RateEditorDialog } from "./RateEditorDialog";
import { ChevronLeft, ChevronRight, Info } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";

type RoomType = {
  id: string;
  name: string;
  maxAdults: number;
  maxChildren: number;
};

type RateInfo = {
  date: string;
  roomTypeId: string;
  price: number;
  suggestedPrice?: number;
  baseOccupancy: number;
  additionalAdultRate: number;
  additionalChildRate: number;
  hasEvent?: boolean;
  eventName?: string;
  competitorRates?: {
    name: string;
    price: number;
  }[];
  competitorAverage?: number;
};

type RateCalendarViewProps = {
  currentDate: Date;
  selectedDate: Date | null;
  setSelectedDate: (date: Date) => void;
  autoMode: boolean;
};

const roomTypes: RoomType[] = [
  { id: "standard", name: "Standard Room", maxAdults: 2, maxChildren: 1 },
  { id: "deluxe", name: "Deluxe Room", maxAdults: 3, maxChildren: 2 },
  { id: "suite", name: "Suite", maxAdults: 4, maxChildren: 3 },
];

// Mock rates data - in a real app, this would come from the backend
const mockRates: RateInfo[] = [
  // Generate mock data for the current week
  ...[0, 1, 2, 3, 4, 5, 6].flatMap(dayOffset => {
    const date = addDays(new Date(), dayOffset);
    const dateStr = format(date, 'yyyy-MM-dd');
    
    return roomTypes.map(room => {
      // Higher rates for weekend (Friday-Saturday)
      const isWeekend = isFriday(date) || isSaturday(date);
      // Sunday rates slightly higher than weekdays but lower than Friday-Saturday
      const isSun = isSunday(date);
      
      // Base prices for different room types
      const basePrice = room.id === "standard" ? 100 : room.id === "deluxe" ? 150 : 200;
      
      // Adjust prices for weekend and Sunday
      const adjustedPrice = isWeekend ? basePrice * 1.25 : isSun ? basePrice * 1.15 : basePrice;
      
      // Generate random competitor rates around the adjusted price
      const competitorRates = [
        { name: "Booking.com", price: Math.round(adjustedPrice * (0.9 + Math.random() * 0.2)) },
        { name: "Expedia", price: Math.round(adjustedPrice * (0.9 + Math.random() * 0.2)) },
        { name: "Hotels.com", price: Math.round(adjustedPrice * (0.9 + Math.random() * 0.2)) },
      ];
      
      // Calculate average competitor rate
      const competitorAverage = Math.round(
        competitorRates.reduce((sum, comp) => sum + comp.price, 0) / competitorRates.length
      );
      
      // Suggested price considers competitor average and adds a small premium
      const suggestedPrice = Math.round(competitorAverage * 1.05);
      
      return {
        date: dateStr,
        roomTypeId: room.id,
        price: Math.round(adjustedPrice),
        baseOccupancy: 2,
        additionalAdultRate: Math.round(adjustedPrice * 0.25),
        additionalChildRate: Math.round(adjustedPrice * 0.15),
        suggestedPrice: suggestedPrice,
        competitorRates,
        competitorAverage,
        hasEvent: dayOffset === 1 || dayOffset === 2, // Example event on tomorrow and the day after
        eventName: dayOffset === 1 ? "Local Conference" : dayOffset === 2 ? "Cultural Festival" : undefined
      };
    });
  })
];

export const RateCalendarView = ({ 
  currentDate,
  selectedDate,
  setSelectedDate,
  autoMode 
}: RateCalendarViewProps) => {
  const [dialogOpen, setDialogOpen] = React.useState(false);
  const [selectedRoomType, setSelectedRoomType] = React.useState<string>("");
  const [editingDate, setEditingDate] = React.useState<Date | null>(null);
  const [viewMonth, setViewMonth] = React.useState(currentDate);

  const handleDateClick = (date: Date, roomTypeId: string) => {
    setSelectedDate(date);
    setEditingDate(date);
    setSelectedRoomType(roomTypeId);
    setDialogOpen(true);
  };

  const nextMonth = () => {
    setViewMonth(addWeeks(viewMonth, 2));
  };

  const prevMonth = () => {
    setViewMonth(addWeeks(viewMonth, -2));
  };

  const renderHeader = () => {
    const dateFormat = "MMMM yyyy";
    return (
      <div className="flex justify-between items-center pt-2 pb-4">
        <Button
          variant="ghost"
          size="icon"
          onClick={prevMonth}
        >
          <ChevronLeft className="h-5 w-5" />
        </Button>
        <div>
          <span className="text-lg font-medium">
            {format(viewMonth, dateFormat)}
          </span>
        </div>
        <Button
          variant="ghost"
          size="icon"
          onClick={nextMonth}
        >
          <ChevronRight className="h-5 w-5" />
        </Button>
      </div>
    );
  };

  const renderDays = () => {
    const dateFormat = "EEE";
    const days = [];
    const startDate = startOfWeek(viewMonth);

    for (let i = 0; i < 14; i++) {
      const day = addDays(startDate, i);
      const formattedDay = format(day, dateFormat);
      const formattedDate = format(day, "d");
      
      const bgColor = isFriday(day) || isSaturday(day) 
        ? "bg-orange-100" 
        : isSunday(day) 
          ? "bg-blue-100" 
          : "bg-gray-100";
      
      days.push(
        <div 
          className={cn(
            "px-2 py-2 text-center font-medium flex flex-col items-center",
            bgColor
          )} 
          key={i}
        >
          <span className="text-xs">{formattedDay}</span>
          <span className="text-sm">{formattedDate}</span>
        </div>
      );
    }
    return <div className="grid grid-cols-[1fr_repeat(14,minmax(90px,1fr))] border-b">{[<div key="spacer" className="px-2 py-2 font-medium"></div>, ...days]}</div>;
  };

  const getRateForDateAndRoom = (date: Date, roomTypeId: string): RateInfo | undefined => {
    const dateStr = format(date, "yyyy-MM-dd");
    return mockRates.find(rate => rate.date === dateStr && rate.roomTypeId === roomTypeId);
  };

  const renderCells = () => {
    const startDate = startOfWeek(viewMonth);
    const endDate = addDays(startDate, 13);
    const rows = [];
    
    let days = [];
    for (let i = 0; i < 14; i++) {
      days.push(addDays(startDate, i));
    }

    // Create rows for each room type
    roomTypes.forEach(roomType => {
      const cells = [
        <div key="room-type" className="px-2 py-3 font-medium min-w-[100px]">
          {roomType.name}
        </div>
      ];
      
      days.forEach((day, i) => {
        const rateInfo = getRateForDateAndRoom(day, roomType.id);
        const hasSuggestion = rateInfo?.suggestedPrice !== undefined && 
          rateInfo.suggestedPrice !== rateInfo?.price;
        
        const hasSuggestedIncrease = rateInfo?.suggestedPrice !== undefined && 
          rateInfo.suggestedPrice > rateInfo?.price;
        
        const isWeekend = isFriday(day) || isSaturday(day);
        const isSun = isSunday(day);
        
        const bgColor = isWeekend 
          ? "bg-orange-100" 
          : isSun 
            ? "bg-blue-100" 
            : "bg-white";
        
        const competitorAvg = rateInfo?.competitorAverage || 0;
        const price = rateInfo?.price || 0;
        const priceDifference = price - competitorAvg;
        
        let priceComparisonColor = "text-gray-500";
        if (priceDifference > 0) {
          priceComparisonColor = "text-amber-600";
        } else if (priceDifference < 0) {
          priceComparisonColor = "text-green-600";
        }
          
        cells.push(
          <div 
            key={i} 
            className={cn(
              "px-2 py-3 text-center cursor-pointer hover:bg-yellow-50 relative min-w-[90px]",
              bgColor,
              selectedDate && 
              isSameDay(day, selectedDate) && 
              selectedRoomType === roomType.id && 
              "bg-yellow-100",
              hasSuggestion && autoMode && "ring-2 ring-inset",
              hasSuggestedIncrease ? "ring-amber-400" : hasSuggestion ? "ring-green-400" : ""
            )}
            onClick={() => handleDateClick(day, roomType.id)}
          >
            <div className="font-medium">
              ${rateInfo?.price || "--"}
            </div>
            
            {/* AI Suggested Price */}
            {hasSuggestion && autoMode && (
              <div className="text-xs mt-1 text-pms-purple font-medium">
                ${rateInfo?.suggestedPrice}
              </div>
            )}
            
            {/* Competitor Average */}
            {rateInfo?.competitorAverage && (
              <div className={cn("text-xs mt-1", priceComparisonColor)}>
                OTAs: ${rateInfo.competitorAverage}
              </div>
            )}
            
            {/* Event Indicator */}
            {rateInfo?.hasEvent && (
              <Tooltip>
                <TooltipTrigger asChild>
                  <div className="absolute top-1 right-1">
                    <span className="block h-2 w-2 rounded-full bg-red-500"></span>
                  </div>
                </TooltipTrigger>
                <TooltipContent side="top" className="max-w-48">
                  <p className="text-xs">{rateInfo.eventName}</p>
                  <p className="text-xs text-muted-foreground">
                    Event prices tend to be higher due to increased demand
                  </p>
                </TooltipContent>
              </Tooltip>
            )}
          </div>
        );
      });
      
      rows.push(
        <div className="grid grid-cols-[1fr_repeat(14,minmax(90px,1fr))] border-b last:border-0" key={roomType.id}>
          {cells}
        </div>
      );
    });

    return <div className="mt-2 w-full overflow-x-auto">{rows}</div>;
  };

  return (
    <div className="bg-white rounded-md border shadow-sm">
      {renderHeader()}
      {renderDays()}
      {renderCells()}

      <RateEditorDialog 
        open={dialogOpen} 
        onOpenChange={setDialogOpen} 
        date={editingDate} 
        roomTypeId={selectedRoomType} 
        roomTypes={roomTypes} 
        currentRate={editingDate && selectedRoomType 
          ? getRateForDateAndRoom(editingDate, selectedRoomType) 
          : undefined} 
      />
    </div>
  );
};
