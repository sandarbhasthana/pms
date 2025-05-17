
import React from "react";
import { Button } from "@/components/ui/button";
import { Calendar } from "lucide-react";
import { 
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from "@/components/ui/dialog";

interface BulkUpdateToolProps {
  currentDate: Date;
}

export const BulkUpdateTool = ({ currentDate }: BulkUpdateToolProps) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm" className="gap-2">
          <Calendar className="h-4 w-4" />
          <span>Bulk Update</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Bulk Update Rates</DialogTitle>
        </DialogHeader>
        
        <div className="py-4">
          <p className="text-muted-foreground">
            Update multiple rates at once based on date ranges, room types, or other criteria.
            This feature will be implemented in a future update.
          </p>
          
          <div className="mt-4">
            <p className="text-sm text-muted-foreground">Selected start date: {currentDate.toDateString()}</p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
