
import React, { useState } from "react";
import { Layout } from "@/components/layout/Layout";
import { RateCalendarView } from "@/components/rates/RateCalendarView";
import { BulkUpdateTool } from "@/components/rates/BulkUpdateTool";
import { CompetitiveInsights } from "@/components/rates/CompetitiveInsights";
import { addDays } from "date-fns";
import { 
  Tabs, 
  TabsContent, 
  TabsList, 
  TabsTrigger 
} from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Info, Bot } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { AIAssistant } from "@/components/layout/AIAssistant";

const RatesManagement = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [aiMode, setAiMode] = useState<"manual" | "suggestion" | "auto">("manual");
  const [showAIAssistant, setShowAIAssistant] = useState(false);
  
  const handleModeChange = (mode: "manual" | "suggestion" | "auto") => {
    setAiMode(mode);
  };
  
  const handleToggleAIAssistant = () => {
    setShowAIAssistant(!showAIAssistant);
  };

  return (
    <Layout>
      <div className="container mx-auto space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">Rates & Availability</h1>
            <p className="text-muted-foreground mt-1">
              Manage your room rates and view competitive insights
            </p>
          </div>
          
          <div className="flex items-center space-x-4">
            <Tooltip>
              <TooltipTrigger asChild>
                <div className="flex items-center gap-2 border p-2 rounded-md">
                  <Info className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">Color Legend</span>
                </div>
              </TooltipTrigger>
              <TooltipContent side="left">
                <div className="p-2 space-y-2">
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 bg-orange-100 rounded"></div>
                    <span className="text-xs">Friday & Saturday</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 bg-blue-100 rounded"></div>
                    <span className="text-xs">Sunday</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 bg-gray-100 rounded"></div>
                    <span className="text-xs">Weekdays (Mon-Thu)</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 bg-yellow-100 rounded"></div>
                    <span className="text-xs">Selected/Editing</span>
                  </div>
                </div>
              </TooltipContent>
            </Tooltip>
            
            <BulkUpdateTool currentDate={currentDate} />
          </div>
        </div>
        
        <div className="bg-white rounded-lg p-4 border shadow-sm">
          <Tabs defaultValue="rates" className="space-y-4">
            <div className="flex justify-between items-center">
              <TabsList>
                <TabsTrigger value="rates">Rates</TabsTrigger>
                <TabsTrigger value="restrictions">Restrictions</TabsTrigger>
                <TabsTrigger value="inventory">Inventory</TabsTrigger>
              </TabsList>
              
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2 mr-8">
                  <span className="text-sm text-muted-foreground">AI Pricing:</span>
                  <div className="border rounded-lg p-1 flex items-center">
                    <Button 
                      variant={aiMode === "manual" ? "default" : "ghost"} 
                      size="sm"
                      onClick={() => handleModeChange("manual")}
                      className="text-xs h-7"
                    >
                      Manual
                    </Button>
                    <Button 
                      variant={aiMode === "suggestion" ? "default" : "ghost"} 
                      size="sm"
                      onClick={() => handleModeChange("suggestion")}
                      className="text-xs h-7"
                    >
                      Suggestion
                    </Button>
                    <Button 
                      variant={aiMode === "auto" ? "default" : "ghost"} 
                      size="sm"
                      onClick={() => handleModeChange("auto")}
                      className="text-xs h-7"
                    >
                      Auto
                    </Button>
                  </div>
                </div>
              </div>
            </div>
            
            <TabsContent value="rates" className="space-y-4">
              <div className="grid lg:grid-cols-3 gap-4">
                <div className="lg:col-span-2">
                  <RateCalendarView 
                    currentDate={currentDate} 
                    selectedDate={selectedDate}
                    setSelectedDate={setSelectedDate}
                    autoMode={aiMode !== "manual"}
                  />
                </div>
                <div>
                  <CompetitiveInsights selectedDate={selectedDate} />
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="restrictions">
              <Card>
                <CardHeader>
                  <CardTitle>Booking Restrictions</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Configure minimum stays, closed to arrival, and other restrictions.
                    (This section will be implemented in a future update)
                  </p>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="inventory">
              <Card>
                <CardHeader>
                  <CardTitle>Room Inventory</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Manage available rooms and allocations.
                    (This section will be implemented in a future update)
                  </p>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
      
      {/* AI Assistant Button */}
      <div className="fixed bottom-8 right-8">
        <Button
          onClick={handleToggleAIAssistant}
          className="h-12 w-12 rounded-full bg-pms-purple hover:bg-pms-dark-purple shadow-lg"
        >
          <Bot className="h-6 w-6" />
        </Button>
      </div>
      
      {/* AI Assistant Dialog */}
      {showAIAssistant && <AIAssistant />}
    </Layout>
  );
};

export default RatesManagement;
