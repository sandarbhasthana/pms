
import React, { useState } from "react";
import { CalendarIcon, CheckIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { format } from "date-fns";
import { toast } from "sonner";

const RoomAssignmentTools = () => {
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [autoAssignEnabled, setAutoAssignEnabled] = useState(false);

  const handleAutoAssignToggle = (checked: boolean) => {
    setAutoAssignEnabled(checked);
    
    if (checked) {
      toast.success("AI Auto-Assignment enabled", {
        description: "The system will automatically assign rooms based on preferences and availability."
      });
    } else {
      toast.info("AI Auto-Assignment disabled", {
        description: "Room assignments will require manual approval."
      });
    }
  };

  const handleFindAvailable = () => {
    if (date) {
      toast.success(`Showing available rooms for ${format(date, "MMMM d, yyyy")}`);
    }
  };
  
  const handleFindUnassigned = () => {
    toast.success("Highlighting unassigned bookings");
  };

  return (
    <div className="flex items-center gap-4">
      <div className="flex items-center gap-2 bg-white border rounded-lg p-2">
        <span className="text-sm font-medium">AI Auto-Pricing:</span>
        <Switch 
          checked={autoAssignEnabled} 
          onCheckedChange={handleAutoAssignToggle}
        />
      </div>
      
      <Popover>
        <PopoverTrigger asChild>
          <Button variant="outline" className="flex items-center gap-1">
            <CalendarIcon className="h-4 w-4 mr-1" />
            {date ? format(date, "MMM d, yyyy") : "Select date"}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0">
          <Calendar
            mode="single"
            selected={date}
            onSelect={setDate}
            initialFocus
          />
          <div className="flex justify-end p-2 border-t">
            <Button variant="outline" size="sm" onClick={handleFindAvailable}>
              Find Available
            </Button>
          </div>
        </PopoverContent>
      </Popover>
      
      <Button variant="outline" onClick={handleFindUnassigned}>
        Show Unassigned
      </Button>
      
      <Button variant="outline">
        Filter View
      </Button>
    </div>
  );
};

export default RoomAssignmentTools;
