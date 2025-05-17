
import React, { useState } from "react";
import { format, addDays } from "date-fns";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { CalendarIcon } from "lucide-react";
import { toast } from "sonner";

interface NewReservationDialogProps {
  roomId: string;
  date: Date;
  onClose: () => void;
}

const NewReservationDialog = ({ roomId, date, onClose }: NewReservationDialogProps) => {
  const [open, setOpen] = useState(true);
  const [checkIn, setCheckIn] = useState<Date>(date);
  const [checkOut, setCheckOut] = useState<Date>(addDays(date, 1));
  const [guestName, setGuestName] = useState("");
  
  const handleClose = () => {
    setOpen(false);
    // Ensure onClose is called after dialog transition
    setTimeout(() => {
      onClose();
    }, 100);
  };
  
  const handleSave = () => {
    if (!guestName) {
      toast.error("Guest name is required");
      return;
    }
    
    toast.success("New reservation created", {
      description: `${guestName} booked from ${format(checkIn, "MMM d")} to ${format(checkOut, "MMM d")}`
    });
    
    handleClose();
  };
  
  return (
    <Dialog open={open} onOpenChange={(isOpen) => {
      if (!isOpen) handleClose();
    }}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>New Reservation</DialogTitle>
        </DialogHeader>
        
        <div className="grid gap-4 py-4">
          <div className="grid gap-2">
            <Label htmlFor="guest-name">Guest Name</Label>
            <Input
              id="guest-name"
              value={guestName}
              onChange={(e) => setGuestName(e.target.value)}
              placeholder="Enter guest name"
              autoFocus
            />
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="grid gap-2">
              <Label>Check-in</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className="justify-start text-left font-normal"
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {checkIn ? format(checkIn, "MMM d, yyyy") : "Select date"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={checkIn}
                    onSelect={(date) => date && setCheckIn(date)}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>
            
            <div className="grid gap-2">
              <Label>Check-out</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className="justify-start text-left font-normal"
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {checkOut ? format(checkOut, "MMM d, yyyy") : "Select date"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={checkOut}
                    onSelect={(date) => date && setCheckOut(date)}
                    disabled={(date) => date < checkIn}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="grid gap-2">
              <Label htmlFor="adults">Adults</Label>
              <Input id="adults" type="number" min="1" defaultValue="1" />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="children">Children</Label>
              <Input id="children" type="number" min="0" defaultValue="0" />
            </div>
          </div>
        </div>
        
        <DialogFooter>
          <Button variant="outline" onClick={handleClose}>Cancel</Button>
          <Button onClick={handleSave}>Create Reservation</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default NewReservationDialog;
