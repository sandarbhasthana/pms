
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Bell, CheckCircle2, XCircle, MessageSquare, Calendar, User } from "lucide-react";
import { cn } from "@/lib/utils";

type ActivityItem = {
  id: number;
  time: string;
  description: string;
  type: "check-in" | "check-out" | "booking" | "cancellation" | "message" | "system";
  actor?: string;
};

export const ActivityFeed = () => {
  const activities: ActivityItem[] = [
    { id: 1, time: "10:30 AM", description: "Booking #1234 checked in", type: "check-in", actor: "John" },
    { id: 2, time: "10:15 AM", description: "New message from Booking.com regarding reservation #5678", type: "message" },
    { id: 3, time: "09:45 AM", description: "Room 302 marked as clean", type: "system" },
    { id: 4, time: "09:30 AM", description: "New booking received for June 15-18", type: "booking" },
    { id: 5, time: "09:22 AM", description: "Guest in Room 204 checked out", type: "check-out", actor: "Alice" },
    { id: 6, time: "08:55 AM", description: "Reservation #7890 was cancelled", type: "cancellation" },
    { id: 7, time: "08:30 AM", description: "System generated daily report", type: "system" },
    { id: 8, time: "08:15 AM", description: "Price update for weekend rates", type: "system" },
  ];

  const getActivityIcon = (type: ActivityItem["type"]) => {
    switch (type) {
      case "check-in":
        return <CheckCircle2 className="h-4 w-4 text-green-500" />;
      case "check-out":
        return <User className="h-4 w-4 text-blue-500" />;
      case "booking":
        return <Calendar className="h-4 w-4 text-purple-500" />;
      case "cancellation":
        return <XCircle className="h-4 w-4 text-red-500" />;
      case "message":
        return <MessageSquare className="h-4 w-4 text-amber-500" />;
      case "system":
        return <Bell className="h-4 w-4 text-gray-500" />;
    }
  };

  const getTimeColor = (time: string) => {
    const hour = parseInt(time.split(":")[0]);
    // More recent activities (past hour) get highlighted
    const now = new Date();
    const currentHour = now.getHours();
    return hour === currentHour || hour === currentHour - 1
      ? "text-primary font-medium"
      : "text-muted-foreground";
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Activity Feed</CardTitle>
        <CardDescription>Recent activity and updates</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {activities.map((activity) => (
            <div key={activity.id} className="flex gap-3">
              <div className="mt-0.5">{getActivityIcon(activity.type)}</div>
              <div className="space-y-1 flex-1">
                <p className="text-sm">{activity.description}</p>
                <div className="flex justify-between items-center">
                  <span className={cn("text-xs", getTimeColor(activity.time))}>
                    {activity.time}
                  </span>
                  {activity.actor && (
                    <span className="text-xs text-muted-foreground">by {activity.actor}</span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        <Button variant="ghost" className="w-full mt-4 text-xs">
          View All Activity
        </Button>
      </CardContent>
    </Card>
  );
};

// Add the Button import at the top that we forgot
import { Button } from "@/components/ui/button";
