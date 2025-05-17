import React, { useState } from "react";
import { GuestProfile } from "@/types/guest-types";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Star, Mail, Edit, Users, Calendar } from "lucide-react";
import { formatDate, formatCurrency } from "@/lib/utils";
import GuestContactInfo from "./GuestContactInfo";
import GuestStayHistory from "./GuestStayHistory";
import GuestPreferences from "./GuestPreferences";
import EditGuestProfile from "./EditGuestProfile";

interface GuestProfileDetailProps {
  guest: GuestProfile;
  onUpdateGuest: (updatedGuest: GuestProfile) => void;
  onMergeGuests: (primaryId: string, secondaryId: string) => void;
}

const GuestProfileDetail = ({ guest, onUpdateGuest, onMergeGuests }: GuestProfileDetailProps) => {
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isMergeDialogOpen, setIsMergeDialogOpen] = useState(false);
  
  const getInitials = (firstName: string, lastName: string) => {
    return `${firstName.charAt(0)}${lastName.charAt(0)}`.toUpperCase();
  };

  const handleUpdateGuest = (updatedGuest: GuestProfile) => {
    // Convert "none" idType to undefined
    if (updatedGuest.idType === "none") {
      updatedGuest.idType = undefined;
    }
    onUpdateGuest(updatedGuest);
  };

  return (
    <Card className="h-full">
      <CardHeader className="pb-2">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-4">
            <Avatar className="h-16 w-16">
              <AvatarImage src={guest.photoUrl} alt={`${guest.firstName} ${guest.lastName}`} />
              <AvatarFallback className="text-lg">{getInitials(guest.firstName, guest.lastName)}</AvatarFallback>
            </Avatar>
            <div>
              <CardTitle className="text-2xl flex items-center gap-2">
                {guest.firstName} {guest.lastName}
                {guest.vipLevel !== 'None' && (
                  <Badge 
                    className={`
                      ${guest.vipLevel === 'Gold' || guest.vipLevel === 'Platinum' 
                        ? 'bg-amber-500 hover:bg-amber-600' 
                        : guest.vipLevel === 'Silver' 
                          ? 'bg-slate-400 hover:bg-slate-500' 
                          : 'bg-amber-800 hover:bg-amber-900'}
                    `}
                  >
                    <Star className="h-3 w-3 mr-1" />
                    {guest.vipLevel}
                  </Badge>
                )}
              </CardTitle>
              <CardDescription>
                Added on {formatDate(guest.dateAdded)}
                {guest.loyaltyProgram && (
                  <span className="ml-2">
                    • Loyalty: {guest.loyaltyProgram.level} ({guest.loyaltyProgram.points} pts)
                  </span>
                )}
              </CardDescription>
            </div>
          </div>
          
          <div className="flex gap-2">
            <Button variant="outline" size="sm" onClick={() => window.location.href = `mailto:${guest.email}`}>
              <Mail className="h-4 w-4 mr-2" />
              Email
            </Button>
            <Button variant="outline" size="sm" onClick={() => setIsEditDialogOpen(true)}>
              <Edit className="h-4 w-4 mr-2" />
              Edit
            </Button>
          </div>
        </div>
      </CardHeader>

      <CardContent>
        <Tabs defaultValue="contact" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="contact">Contact Info</TabsTrigger>
            <TabsTrigger value="stays">Stay History</TabsTrigger>
            <TabsTrigger value="preferences">Preferences</TabsTrigger>
          </TabsList>
          
          <TabsContent value="contact">
            <GuestContactInfo guest={guest} />
          </TabsContent>
          
          <TabsContent value="stays">
            <GuestStayHistory stays={guest.stays} />
          </TabsContent>
          
          <TabsContent value="preferences">
            <GuestPreferences 
              preferences={guest.preferences}
              onUpdatePreferences={(updatedPreferences) => {
                onUpdateGuest({
                  ...guest,
                  preferences: updatedPreferences
                });
              }}
            />
          </TabsContent>
        </Tabs>

        <div className="mt-6 pt-6 border-t flex justify-between">
          <div>
            {guest.notes && (
              <div className="mb-4">
                <h4 className="text-sm font-semibold mb-1">Notes:</h4>
                <p className="text-sm text-muted-foreground">{guest.notes}</p>
              </div>
            )}
          </div>
          
          <Dialog open={isMergeDialogOpen} onOpenChange={setIsMergeDialogOpen}>
            <DialogTrigger asChild>
              <Button variant="outline" size="sm">
                <Users className="h-4 w-4 mr-2" /> Merge Duplicates
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Merge Guest Profiles</DialogTitle>
                <DialogDescription>
                  Select another guest profile to merge with this one. All data from the secondary profile will be transferred to this one.
                </DialogDescription>
              </DialogHeader>
              <div className="py-4">
                {/* In a real app, this would be a search component to find potential duplicates */}
                <p className="text-center text-muted-foreground">Guest merge feature would be implemented here</p>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setIsMergeDialogOpen(false)}>Cancel</Button>
                <Button onClick={() => {
                  // Sample implementation
                  onMergeGuests(guest.id, "sample-id");
                  setIsMergeDialogOpen(false);
                }}>Merge Profiles</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </CardContent>

      {/* Edit Profile Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle>Edit Guest Profile</DialogTitle>
            <DialogDescription>
              Update information for {guest.firstName} {guest.lastName}
            </DialogDescription>
          </DialogHeader>
          <EditGuestProfile 
            guest={guest}
            onSave={(updatedGuest) => {
              handleUpdateGuest(updatedGuest);
              setIsEditDialogOpen(false);
            }}
            onCancel={() => setIsEditDialogOpen(false)}
          />
        </DialogContent>
      </Dialog>
    </Card>
  );
};

export default GuestProfileDetail;
