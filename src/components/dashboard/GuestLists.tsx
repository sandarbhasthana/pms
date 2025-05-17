
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { ArrowDown, ArrowUp, Star, Clock, Send, HomeIcon } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export const GuestLists = () => {
  const arrivals = [
    { id: 1, name: "John Smith", room: "101", status: "Expected at 2:00 PM", vip: false },
    { id: 2, name: "Emily Johnson", room: "Unassigned", status: "Expected at 3:30 PM", vip: false },
    { id: 3, name: "Robert Williams", room: "205", status: "Expected at 4:00 PM", vip: true },
    { id: 4, name: "Sarah Davis", room: "Unassigned", status: "Expected at 5:15 PM", vip: false },
  ];

  const departures = [
    { id: 5, name: "Michael Brown", room: "302", status: "Check-out by 11:00 AM", vip: false },
    { id: 6, name: "Jessica Miller", room: "110", status: "Late check-out (2:00 PM)", vip: true },
    { id: 7, name: "David Garcia", room: "204", status: "Check-out by 11:00 AM", vip: false },
  ];

  const inHouseGuests = [
    { id: 8, name: "Thomas Wilson", room: "301", note: "Anniversary celebration", vip: true },
    { id: 9, name: "Jennifer Martinez", room: "202", note: "Business stay, needs early breakfast", vip: false },
    { id: 10, name: "James Anderson", room: "105", note: null, vip: false },
    { id: 11, name: "Elizabeth Taylor", room: "310", note: "Requested extra pillows", vip: true },
    { id: 12, name: "Daniel Lee", room: "203", note: null, vip: false },
  ];

  const renderGuestList = (guests, type) => {
    return (
      <div className="space-y-3">
        {guests.map((guest) => (
          <div key={guest.id} className="flex items-center justify-between border-b pb-3">
            <div className="flex items-center gap-3">
              {type === 'arrivals' && <ArrowDown className="h-4 w-4 text-green-500" />}
              {type === 'departures' && <ArrowUp className="h-4 w-4 text-red-500" />}
              {type === 'in-house' && <HomeIcon className="h-4 w-4 text-blue-500" />}
              <div>
                <div className="flex items-center">
                  <span className="font-medium">{guest.name}</span>
                  {guest.vip && <Star className="h-4 w-4 text-yellow-500 ml-2" />}
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <span className={guest.room === "Unassigned" ? "text-amber-500" : ""}>
                    Room: {guest.room}
                  </span>
                  {guest.note && <span className="text-xs"> • {guest.note}</span>}
                </div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              {guest.status && (
                <div className="flex items-center text-xs text-muted-foreground mr-2">
                  <Clock className="h-3 w-3 mr-1" />
                  <span>{guest.status}</span>
                </div>
              )}
              {type === 'arrivals' && (
                <>
                  {guest.room === "Unassigned" && (
                    <Button variant="outline" size="sm">
                      Assign Room
                    </Button>
                  )}
                  <Button size="sm">
                    <Send className="h-3 w-3 mr-1" /> Check-in Link
                  </Button>
                </>
              )}
              {type === 'departures' && (
                <Button variant="outline" size="sm">
                  Process Check-out
                </Button>
              )}
            </div>
          </div>
        ))}
      </div>
    );
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Guest Management</CardTitle>
        <CardDescription>Today's arrivals, departures and in-house guests</CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="arrivals" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="arrivals" className="relative">
              Arrivals
              <Badge variant="secondary" className="ml-2 absolute -top-1 -right-1">{arrivals.length}</Badge>
            </TabsTrigger>
            <TabsTrigger value="departures" className="relative">
              Departures
              <Badge variant="secondary" className="ml-2 absolute -top-1 -right-1">{departures.length}</Badge>
            </TabsTrigger>
            <TabsTrigger value="in-house" className="relative">
              In-House
              <Badge variant="secondary" className="ml-2 absolute -top-1 -right-1">{inHouseGuests.length}</Badge>
            </TabsTrigger>
          </TabsList>
          <div className="mt-4">
            <TabsContent value="arrivals">
              {renderGuestList(arrivals, 'arrivals')}
            </TabsContent>
            <TabsContent value="departures">
              {renderGuestList(departures, 'departures')}
            </TabsContent>
            <TabsContent value="in-house">
              {renderGuestList(inHouseGuests, 'in-house')}
            </TabsContent>
          </div>
        </Tabs>
      </CardContent>
    </Card>
  );
};
