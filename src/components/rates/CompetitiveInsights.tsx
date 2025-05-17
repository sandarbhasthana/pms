
import React from "react";
import { format } from "date-fns";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

type CompetitiveInsightsProps = {
  selectedDate: Date | null;
};

export const CompetitiveInsights = ({ selectedDate }: CompetitiveInsightsProps) => {
  if (!selectedDate) {
    return (
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-lg">Competitive Insights</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">
            Select a date on the calendar to view competitive pricing data.
          </p>
        </CardContent>
      </Card>
    );
  }
  
  const dateStr = format(selectedDate, "MMMM d, yyyy");

  // Mock competitive data
  const mockData = {
    standard: {
      yourPrice: 100,
      averagePrice: 95,
      minPrice: 85,
      maxPrice: 120,
      competitors: [
        { name: "Hotel A", price: 89 },
        { name: "Hotel B", price: 95 },
        { name: "Hotel C", price: 102 },
      ]
    },
    deluxe: {
      yourPrice: 150,
      averagePrice: 155,
      minPrice: 130,
      maxPrice: 180,
      competitors: [
        { name: "Hotel A", price: 140 },
        { name: "Hotel B", price: 155 },
        { name: "Hotel C", price: 170 },
      ]
    },
    suite: {
      yourPrice: 200,
      averagePrice: 220,
      minPrice: 190,
      maxPrice: 250,
      competitors: [
        { name: "Hotel A", price: 190 },
        { name: "Hotel B", price: 230 },
        { name: "Hotel C", price: 240 },
      ]
    }
  };

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-lg">Competitive Insights</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-muted-foreground mb-4">
          Market rates for {dateStr}
        </p>
        
        <Tabs defaultValue="standard">
          <TabsList className="grid w-full grid-cols-3 mb-4">
            <TabsTrigger value="standard">Standard</TabsTrigger>
            <TabsTrigger value="deluxe">Deluxe</TabsTrigger>
            <TabsTrigger value="suite">Suite</TabsTrigger>
          </TabsList>
          
          {(["standard", "deluxe", "suite"] as const).map(roomType => (
            <TabsContent value={roomType} key={roomType}>
              <div className="space-y-4">
                <div className="flex justify-between items-center py-2 border-b">
                  <span>Your Rate:</span>
                  <span className="font-bold">${mockData[roomType].yourPrice}</span>
                </div>
                
                <div className="grid grid-cols-3 gap-2 text-center">
                  <div>
                    <div className="text-xs text-muted-foreground">Average</div>
                    <div className="font-medium">${mockData[roomType].averagePrice}</div>
                  </div>
                  <div>
                    <div className="text-xs text-muted-foreground">Min</div>
                    <div className="font-medium">${mockData[roomType].minPrice}</div>
                  </div>
                  <div>
                    <div className="text-xs text-muted-foreground">Max</div>
                    <div className="font-medium">${mockData[roomType].maxPrice}</div>
                  </div>
                </div>
                
                <div>
                  <h4 className="text-sm font-medium mb-2">Competitor Rates:</h4>
                  {mockData[roomType].competitors.map((competitor, i) => (
                    <div key={i} className="flex justify-between items-center py-1">
                      <span className="text-sm">{competitor.name}</span>
                      <span className="font-medium">${competitor.price}</span>
                    </div>
                  ))}
                </div>
                
                {mockData[roomType].yourPrice > mockData[roomType].averagePrice ? (
                  <div className="text-sm text-amber-600">
                    Your rate is ${mockData[roomType].yourPrice - mockData[roomType].averagePrice} higher than the market average.
                  </div>
                ) : mockData[roomType].yourPrice < mockData[roomType].averagePrice ? (
                  <div className="text-sm text-green-600">
                    Your rate is ${mockData[roomType].averagePrice - mockData[roomType].yourPrice} lower than the market average.
                  </div>
                ) : (
                  <div className="text-sm">
                    Your rate is exactly at the market average.
                  </div>
                )}
              </div>
            </TabsContent>
          ))}
        </Tabs>
      </CardContent>
    </Card>
  );
};
