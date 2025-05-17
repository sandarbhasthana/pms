
import React from "react";
import { Stay } from "@/types/guest-types";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar } from "lucide-react";
import { formatDate, formatCurrency } from "@/lib/utils";

interface GuestStayHistoryProps {
  stays: Stay[];
}

const GuestStayHistory = ({ stays }: GuestStayHistoryProps) => {
  // Group stays by status
  const currentStays = stays.filter(stay => stay.status === 'current');
  const upcomingStays = stays.filter(stay => stay.status === 'upcoming');
  const pastStays = stays.filter(stay => stay.status === 'past').sort((a, b) => 
    new Date(b.checkIn).getTime() - new Date(a.checkIn).getTime()
  );

  const getTotalSpend = (stays: Stay[]) => {
    return stays.reduce((total, stay) => total + stay.amount, 0);
  };

  return (
    <div className="space-y-6 pt-4">
      {/* Current Stay */}
      {currentStays.length > 0 && (
        <div>
          <h3 className="font-semibold mb-3 flex items-center">
            <Badge className="mr-2 bg-green-500 hover:bg-green-600">Current</Badge>
            Current Stay
          </h3>
          <div className="space-y-4">
            {currentStays.map(stay => (
              <StayCard key={stay.id} stay={stay} type="current" />
            ))}
          </div>
        </div>
      )}

      {/* Upcoming Stays */}
      {upcomingStays.length > 0 && (
        <div>
          <h3 className="font-semibold mb-3 flex items-center">
            <Badge className="mr-2 bg-blue-500 hover:bg-blue-600">Upcoming</Badge>
            Future Reservations
          </h3>
          <div className="space-y-4">
            {upcomingStays.map(stay => (
              <StayCard key={stay.id} stay={stay} type="upcoming" />
            ))}
          </div>
        </div>
      )}

      {/* Past Stays */}
      {pastStays.length > 0 && (
        <div>
          <h3 className="font-semibold mb-3 flex items-center">
            <Badge className="mr-2 bg-gray-500 hover:bg-gray-600">Past</Badge>
            Stay History
            <span className="ml-2 text-sm text-muted-foreground font-normal">
              Total Spend: {formatCurrency(getTotalSpend(pastStays))}
            </span>
          </h3>
          <div className="space-y-4">
            {pastStays.map(stay => (
              <StayCard key={stay.id} stay={stay} type="past" />
            ))}
          </div>
        </div>
      )}

      {/* No stays message */}
      {stays.length === 0 && (
        <div className="flex flex-col items-center justify-center py-10">
          <Calendar className="h-12 w-12 text-muted-foreground mb-3" />
          <h3 className="text-lg font-medium">No Stays Found</h3>
          <p className="text-muted-foreground text-center mt-2">
            This guest has not stayed at the property before.
          </p>
        </div>
      )}
    </div>
  );
};

interface StayCardProps {
  stay: Stay;
  type: 'current' | 'upcoming' | 'past';
}

const StayCard = ({ stay, type }: StayCardProps) => {
  // Calculate nights stayed
  const nights = Math.ceil((new Date(stay.checkOut).getTime() - new Date(stay.checkIn).getTime()) / (1000 * 60 * 60 * 24));
  
  return (
    <Card>
      <CardContent className="p-4">
        <div className="flex justify-between items-start">
          <div>
            <div className="flex items-center">
              <Calendar className="h-4 w-4 mr-2 text-muted-foreground" />
              <span className="text-sm">
                {formatDate(stay.checkIn)} - {formatDate(stay.checkOut)}
              </span>
              <Badge variant="outline" className="ml-2">
                {nights} {nights === 1 ? 'night' : 'nights'}
              </Badge>
            </div>
            <p className="text-sm mt-2">
              <span className="text-muted-foreground">Room:</span> {stay.roomNumber}
            </p>
          </div>
          <div className="text-right">
            <span className="text-sm font-medium">
              {formatCurrency(stay.amount)}
            </span>
            <p className="text-sm text-muted-foreground">
              {type === 'current' ? 'Current stay' : 
               type === 'upcoming' ? 'Upcoming reservation' : 
               'Past stay'}
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default GuestStayHistory;
