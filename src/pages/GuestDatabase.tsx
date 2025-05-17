
import React, { useState } from "react";
import { Layout } from "@/components/layout/Layout";
import GuestSearchBar from "@/components/guests/GuestSearchBar";
import GuestList from "@/components/guests/GuestList";
import GuestProfileDetail from "@/components/guests/GuestProfileDetail";
import AddGuestDialog from "@/components/guests/AddGuestDialog";
import { GuestProfile } from "@/types/guest-types";
import { useToast } from "@/hooks/use-toast";
import { mockGuestProfiles } from "@/data/mock-guests";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

const GuestDatabase = () => {
  const [guests, setGuests] = useState<GuestProfile[]>(mockGuestProfiles);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedGuest, setSelectedGuest] = useState<GuestProfile | null>(null);
  const [isAddGuestDialogOpen, setIsAddGuestDialogOpen] = useState(false);
  const { toast } = useToast();

  // Filter guests based on search query
  const filteredGuests = searchQuery.trim() === "" 
    ? guests 
    : guests.filter(guest => {
        const fullName = `${guest.firstName} ${guest.lastName}`.toLowerCase();
        return fullName.includes(searchQuery.toLowerCase()) ||
               (guest.email && guest.email.toLowerCase().includes(searchQuery.toLowerCase())) ||
               (guest.phone && guest.phone.includes(searchQuery));
      });

  const handleGuestSelect = (guest: GuestProfile) => {
    setSelectedGuest(guest);
  };

  const handleAddGuest = (newGuest: GuestProfile) => {
    setGuests(prevGuests => [...prevGuests, newGuest]);
    toast({
      title: "Guest Added",
      description: `${newGuest.firstName} ${newGuest.lastName} has been added to the database.`,
    });
    setIsAddGuestDialogOpen(false);
  };

  const handleUpdateGuest = (updatedGuest: GuestProfile) => {
    setGuests(prevGuests => 
      prevGuests.map(guest => 
        guest.id === updatedGuest.id ? updatedGuest : guest
      )
    );
    setSelectedGuest(updatedGuest);
    toast({
      title: "Guest Updated",
      description: `${updatedGuest.firstName} ${updatedGuest.lastName}'s profile has been updated.`,
    });
  };

  const handleMergeGuests = (primaryId: string, secondaryId: string) => {
    // In a real app, this would be a more complex operation
    toast({
      title: "Guests Merged",
      description: "The guest profiles have been merged successfully.",
    });
  };

  return (
    <Layout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold tracking-tight">Guest Database</h1>
          <Button 
            onClick={() => setIsAddGuestDialogOpen(true)}
            className="bg-pms-purple hover:bg-pms-purple/90"
          >
            <Plus className="mr-2 h-4 w-4" /> Add New Guest
          </Button>
        </div>

        <GuestSearchBar 
          searchQuery={searchQuery} 
          setSearchQuery={setSearchQuery}
        />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-1">
            <GuestList 
              guests={filteredGuests}
              selectedGuestId={selectedGuest?.id}
              onGuestSelect={handleGuestSelect}
            />
          </div>
          
          <div className="lg:col-span-2">
            {selectedGuest ? (
              <GuestProfileDetail 
                guest={selectedGuest}
                onUpdateGuest={handleUpdateGuest}
                onMergeGuests={handleMergeGuests}
              />
            ) : (
              <div className="flex h-full items-center justify-center rounded-lg border border-dashed p-8 text-center">
                <div>
                  <h3 className="text-lg font-medium">No Guest Selected</h3>
                  <p className="text-muted-foreground mt-2">
                    Select a guest from the list or search for a specific guest.
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      <AddGuestDialog 
        open={isAddGuestDialogOpen} 
        onOpenChange={setIsAddGuestDialogOpen}
        onAddGuest={handleAddGuest}
      />
    </Layout>
  );
};

export default GuestDatabase;
