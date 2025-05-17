
import React, { useState } from "react";
import { GuestProfile, VIPLevel } from "@/types/guest-types";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import EditGuestProfile from "./EditGuestProfile";

interface AddGuestDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onAddGuest: (guest: GuestProfile) => void;
}

const AddGuestDialog = ({ open, onOpenChange, onAddGuest }: AddGuestDialogProps) => {
  // Create a new empty guest profile
  const emptyGuest: GuestProfile = {
    id: crypto.randomUUID(),
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: {
      street: "",
      city: "",
      state: "",
      zipCode: "",
      country: ""
    },
    vipLevel: 'None',
    preferences: [],
    stays: [],
    dateAdded: new Date()
  };

  const handleAddGuest = (guest: GuestProfile) => {
    // Convert "none" idType to undefined
    if (guest.idType === "none") {
      guest.idType = undefined;
    }
    onAddGuest(guest);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl">
        <DialogHeader>
          <DialogTitle>Add New Guest</DialogTitle>
          <DialogDescription>
            Enter information to create a new guest profile
          </DialogDescription>
        </DialogHeader>
        
        <EditGuestProfile 
          guest={emptyGuest}
          onSave={handleAddGuest}
          onCancel={() => onOpenChange(false)}
        />
      </DialogContent>
    </Dialog>
  );
};

export default AddGuestDialog;
