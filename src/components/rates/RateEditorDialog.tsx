import React, { useState, useEffect } from "react";
import { format } from "date-fns";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "@/hooks/use-toast";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Info } from "lucide-react";
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

type RateEditorDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  date: Date | null;
  roomTypeId: string;
  roomTypes: RoomType[];
  currentRate?: RateInfo;
};

export const RateEditorDialog = ({
  open,
  onOpenChange,
  date,
  roomTypeId,
  roomTypes,
  currentRate,
}: RateEditorDialogProps) => {
  const [baseRate, setBaseRate] = useState<string>("");
  const [additionalAdultRate, setAdditionalAdultRate] = useState<string>("");
  const [additionalChildRate, setAdditionalChildRate] = useState<string>("");
  const [baseOccupancy, setBaseOccupancy] = useState<string>("2");
  
  useEffect(() => {
    if (currentRate) {
      setBaseRate(currentRate.price.toString());
      setAdditionalAdultRate(currentRate.additionalAdultRate?.toString() || "");
      setAdditionalChildRate(currentRate.additionalChildRate?.toString() || "");
      setBaseOccupancy(currentRate.baseOccupancy?.toString() || "2");
    }
  }, [currentRate]);
  
  if (!date) return null;
  
  const roomInfo = roomTypes.find(room => room.id === roomTypeId);
  const roomName = roomInfo?.name || "Unknown";
  
  const handleSave = () => {
    const rateValue = parseFloat(baseRate);
    const adultRateValue = parseFloat(additionalAdultRate);
    const childRateValue = parseFloat(additionalChildRate);
    
    if (isNaN(rateValue) || rateValue <= 0) {
      toast({
        title: "Invalid Rate",
        description: "Please enter a valid rate greater than zero",
        variant: "destructive",
      });
      return;
    }
    
    toast({
      title: "Rate Updated",
      description: `${roomName} rate for ${format(date, "MMM d, yyyy")} set to $${rateValue}`,
    });
    
    onOpenChange(false);
  };
  
  const handleApplySuggestion = () => {
    if (currentRate?.suggestedPrice) {
      setBaseRate(currentRate.suggestedPrice.toString());
      
      toast({
        title: "Suggestion Applied",
        description: `AI suggested price of $${currentRate.suggestedPrice} has been applied`,
      });
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>
            Edit Rate: {roomName} - {date ? format(date, "MMMM d, yyyy") : ""}
          </DialogTitle>
        </DialogHeader>
        
        <Tabs defaultValue="base-rate" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="base-rate">Base Rate</TabsTrigger>
            <TabsTrigger value="occupancy">Occupancy Rules</TabsTrigger>
          </TabsList>
          
          <TabsContent value="base-rate">
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="rate">Base Rate ($)</Label>
                <Input
                  id="rate"
                  type="number"
                  min="0"
                  step="0.01"
                  value={baseRate}
                  onChange={(e) => setBaseRate(e.target.value)}
                  className="col-span-3"
                />
              </div>
              
              {currentRate?.competitorRates && (
                <div className="bg-muted p-3 rounded-md">
                  <div className="flex items-center justify-between mb-2">
                    <p className="text-sm font-medium">Competitor Rates</p>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <div className="cursor-help">
                          <Info className="h-4 w-4 text-muted-foreground" />
                        </div>
                      </TooltipTrigger>
                      <TooltipContent side="top">
                        <p className="text-xs">Prices pulled from public OTA listings</p>
                      </TooltipContent>
                    </Tooltip>
                  </div>
                  
                  {currentRate.competitorRates.map((comp, idx) => (
                    <div key={idx} className="flex justify-between text-sm py-1">
                      <span>{comp.name}</span>
                      <span>${comp.price}</span>
                    </div>
                  ))}
                  
                  <div className="border-t mt-2 pt-2 flex justify-between font-medium">
                    <span>Average</span>
                    <span>${currentRate.competitorAverage}</span>
                  </div>
                </div>
              )}
              
              {currentRate?.suggestedPrice && currentRate.suggestedPrice !== currentRate.price && (
                <div className="bg-muted p-3 rounded-md">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium">AI Suggested Price</p>
                      <p className="text-lg font-bold">${currentRate.suggestedPrice}</p>
                    </div>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      onClick={handleApplySuggestion}
                    >
                      Apply Suggestion
                    </Button>
                  </div>
                  {currentRate.hasEvent && (
                    <p className="text-xs text-muted-foreground mt-2">
                      Suggestion based on: {currentRate.eventName}
                    </p>
                  )}
                </div>
              )}
            </div>
          </TabsContent>
          
          <TabsContent value="occupancy">
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <div className="flex justify-between items-center">
                  <Label htmlFor="baseOccupancy">Base Occupancy</Label>
                  <Tooltip>
                    <TooltipTrigger>
                      <Info className="h-4 w-4 text-muted-foreground" />
                    </TooltipTrigger>
                    <TooltipContent side="top">
                      <p className="text-xs">Number of guests included in the base rate</p>
                    </TooltipContent>
                  </Tooltip>
                </div>
                <Input
                  id="baseOccupancy"
                  type="number"
                  min="1"
                  max={roomInfo?.maxAdults || 4}
                  value={baseOccupancy}
                  onChange={(e) => setBaseOccupancy(e.target.value)}
                  className="col-span-3"
                />
              </div>
              
              <div className="grid gap-2">
                <Label htmlFor="additionalAdultRate">Additional Adult Rate ($)</Label>
                <Input
                  id="additionalAdultRate"
                  type="number"
                  min="0"
                  step="0.01"
                  value={additionalAdultRate}
                  onChange={(e) => setAdditionalAdultRate(e.target.value)}
                  className="col-span-3"
                />
              </div>
              
              <div className="grid gap-2">
                <Label htmlFor="additionalChildRate">Additional Child Rate ($)</Label>
                <Input
                  id="additionalChildRate"
                  type="number"
                  min="0"
                  step="0.01"
                  value={additionalChildRate}
                  onChange={(e) => setAdditionalChildRate(e.target.value)}
                  className="col-span-3"
                />
              </div>
              
              <div className="bg-muted p-3 rounded-md">
                <p className="text-sm font-medium mb-2">Room Capacity</p>
                <div className="flex justify-between text-sm">
                  <span>Maximum Adults:</span>
                  <span>{roomInfo?.maxAdults || "N/A"}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Maximum Children:</span>
                  <span>{roomInfo?.maxChildren || "N/A"}</span>
                </div>
                <div className="flex justify-between text-sm font-medium mt-2">
                  <span>Total Capacity:</span>
                  <span>{(roomInfo?.maxAdults || 0) + (roomInfo?.maxChildren || 0)}</span>
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
        
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>Cancel</Button>
          <Button onClick={handleSave}>Save Changes</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
