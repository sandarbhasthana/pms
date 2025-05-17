
import React, { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { LostFoundItem, LostItemStatus } from "@/types/lost-found-types";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { GuestProfile } from "@/types/guest-types";
import { mockGuestProfiles } from "@/data/mock-guests";

interface AddLostItemDialogProps {
  open: boolean;
  onClose: () => void;
  onSave: (item: LostFoundItem) => void;
}

export function AddLostItemDialog({ open, onClose, onSave }: AddLostItemDialogProps) {
  const [description, setDescription] = useState("");
  const [location, setLocation] = useState("");
  const [category, setCategory] = useState("");
  const [finderName, setFinderName] = useState("");
  const [notes, setNotes] = useState("");
  const [selectedGuest, setSelectedGuest] = useState<GuestProfile | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState<GuestProfile[]>([]);
  const [photoUrl, setPhotoUrl] = useState("");

  // Simple search functionality for guests
  const handleGuestSearch = (term: string) => {
    setSearchTerm(term);
    
    if (!term.trim()) {
      setSearchResults([]);
      return;
    }
    
    const results = mockGuestProfiles.filter(guest => 
      guest.firstName.toLowerCase().includes(term.toLowerCase()) || 
      guest.lastName.toLowerCase().includes(term.toLowerCase()) ||
      guest.email.toLowerCase().includes(term.toLowerCase())
    );
    
    setSearchResults(results);
  };

  const handleSelectGuest = (guest: GuestProfile) => {
    setSelectedGuest(guest);
    setSearchResults([]);
    setSearchTerm(`${guest.firstName} ${guest.lastName}`);
  };

  const handleClearGuest = () => {
    setSelectedGuest(null);
    setSearchTerm("");
  };

  const handleSave = () => {
    if (!description || !location || !finderName) {
      // In a real app, you'd show validation errors
      return;
    }

    const newItem: LostFoundItem = {
      id: uuidv4(),
      dateFound: new Date(),
      description,
      location,
      status: "Stored",
      finderName,
      linkedGuestId: selectedGuest?.id,
      linkedGuestName: selectedGuest ? `${selectedGuest.firstName} ${selectedGuest.lastName}` : undefined,
      photoUrl: photoUrl || undefined,
      notes: notes || undefined,
      category: category || undefined
    };

    onSave(newItem);
    resetForm();
  };

  const resetForm = () => {
    setDescription("");
    setLocation("");
    setCategory("");
    setFinderName("");
    setNotes("");
    setSelectedGuest(null);
    setSearchTerm("");
    setPhotoUrl("");
  };

  return (
    <Dialog open={open} onOpenChange={(isOpen) => {
      if (!isOpen) {
        onClose();
        resetForm();
      }
    }}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Log New Found Item</DialogTitle>
        </DialogHeader>
        
        <div className="grid gap-4 py-4">
          <div className="grid gap-2">
            <Label htmlFor="description">Item Description*</Label>
            <Textarea
              id="description"
              placeholder="Describe the item in detail"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            />
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="grid gap-2">
              <Label htmlFor="location">Location Found*</Label>
              <Input
                id="location"
                placeholder="Room number, lobby, etc."
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                required
              />
            </div>
            
            <div className="grid gap-2">
              <Label htmlFor="category">Category</Label>
              <Select value={category} onValueChange={setCategory}>
                <SelectTrigger id="category">
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Electronics">Electronics</SelectItem>
                  <SelectItem value="Clothing">Clothing</SelectItem>
                  <SelectItem value="Jewelry">Jewelry</SelectItem>
                  <SelectItem value="Documents">Documents</SelectItem>
                  <SelectItem value="Accessories">Accessories</SelectItem>
                  <SelectItem value="Other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          
          <div className="grid gap-2">
            <Label htmlFor="finderName">Found By*</Label>
            <Input
              id="finderName"
              placeholder="Name of staff member who found the item"
              value={finderName}
              onChange={(e) => setFinderName(e.target.value)}
              required
            />
          </div>
          
          <div className="grid gap-2">
            <Label htmlFor="guestSearch">Link to Guest (Optional)</Label>
            <div className="relative">
              <Input
                id="guestSearch"
                placeholder="Search for guest by name or email"
                value={searchTerm}
                onChange={(e) => handleGuestSearch(e.target.value)}
              />
              {selectedGuest && (
                <Button
                  variant="ghost"
                  size="sm"
                  className="absolute right-1 top-1"
                  onClick={handleClearGuest}
                >
                  X
                </Button>
              )}
              
              {searchResults.length > 0 && !selectedGuest && (
                <div className="absolute w-full bg-background border rounded-md mt-1 z-10 max-h-48 overflow-y-auto shadow-md">
                  {searchResults.map(guest => (
                    <div
                      key={guest.id}
                      className="p-2 hover:bg-muted cursor-pointer"
                      onClick={() => handleSelectGuest(guest)}
                    >
                      {guest.firstName} {guest.lastName} ({guest.email})
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
          
          <div className="grid gap-2">
            <Label htmlFor="photoUrl">Photo URL (Optional)</Label>
            <Input
              id="photoUrl"
              placeholder="Enter a URL to a photo of the item"
              value={photoUrl}
              onChange={(e) => setPhotoUrl(e.target.value)}
            />
            <p className="text-xs text-muted-foreground">
              In a real app, there would be an upload feature here
            </p>
          </div>
          
          <div className="grid gap-2">
            <Label htmlFor="notes">Additional Notes</Label>
            <Textarea
              id="notes"
              placeholder="Any other details about the item"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
            />
          </div>
        </div>
        
        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button onClick={handleSave}>Save Item</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
