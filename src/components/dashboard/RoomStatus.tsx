
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle2, AlertCircle, Clock } from "lucide-react";

export const RoomStatus = () => {
  const roomStatuses = {
    clean: 32,
    dirty: 8,
    inProgress: 4,
    outOfOrder: 2,
    total: 46
  };

  const percentage = (value) => {
    return Math.round((value / roomStatuses.total) * 100);
  };

  const statusItems = [
    {
      label: "Clean & Ready",
      value: roomStatuses.clean,
      percentage: percentage(roomStatuses.clean),
      icon: CheckCircle2,
      color: "bg-green-100 text-green-600",
      iconColor: "text-green-500"
    },
    {
      label: "Needs Cleaning",
      value: roomStatuses.dirty,
      percentage: percentage(roomStatuses.dirty),
      icon: AlertCircle,
      color: "bg-red-100 text-red-600",
      iconColor: "text-red-500"
    },
    {
      label: "In Progress",
      value: roomStatuses.inProgress,
      percentage: percentage(roomStatuses.inProgress),
      icon: Clock,
      color: "bg-amber-100 text-amber-600",
      iconColor: "text-amber-500"
    }
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle>Room Status</CardTitle>
        <CardDescription>Housekeeping overview and availability</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="grid grid-cols-3 gap-4">
            {statusItems.map((item, index) => (
              <div key={index} className={`p-4 rounded-lg ${item.color} text-center`}>
                <div className="flex flex-col items-center">
                  <item.icon className={`h-5 w-5 ${item.iconColor} mb-1`} />
                  <div className="text-xl font-bold">{item.value}</div>
                  <div className="text-xs">{item.label}</div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-6">
            <div className="text-sm font-medium mb-2">Room Status Breakdown</div>
            <div className="w-full h-3 bg-gray-200 rounded-full overflow-hidden">
              <div className="flex h-full">
                <div className="bg-green-500 h-full" style={{ width: `${percentage(roomStatuses.clean)}%` }}></div>
                <div className="bg-red-500 h-full" style={{ width: `${percentage(roomStatuses.dirty)}%` }}></div>
                <div className="bg-amber-500 h-full" style={{ width: `${percentage(roomStatuses.inProgress)}%` }}></div>
              </div>
            </div>
            <div className="flex justify-between text-xs text-muted-foreground mt-1">
              <span>{percentage(roomStatuses.clean)}% Clean</span>
              <span>{percentage(roomStatuses.dirty)}% Dirty</span>
              <span>{percentage(roomStatuses.inProgress)}% In Progress</span>
            </div>
          </div>

          <div className="flex justify-between items-center pt-3 mt-4 border-t">
            <span className="text-sm">Total Rooms</span>
            <span className="font-medium">{roomStatuses.total}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
