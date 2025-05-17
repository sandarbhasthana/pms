
import React, { useState } from "react";
import { GuestPreference } from "@/types/guest-types";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Plus, X } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface GuestPreferencesProps {
  preferences: GuestPreference[];
  onUpdatePreferences: (preferences: GuestPreference[]) => void;
}

const GuestPreferences = ({ preferences, onUpdatePreferences }: GuestPreferencesProps) => {
  const [isAddPreferenceDialogOpen, setIsAddPreferenceDialogOpen] = useState(false);
  const [newPreference, setNewPreference] = useState<Partial<GuestPreference>>({
    category: "",
    description: ""
  });

  // Group preferences by category
  const preferencesByCategory = preferences.reduce((acc, preference) => {
    if (!acc[preference.category]) {
      acc[preference.category] = [];
    }
    acc[preference.category].push(preference);
    return acc;
  }, {} as Record<string, GuestPreference[]>);

  const handleAddPreference = () => {
    if (newPreference.category && newPreference.description) {
      const preference: GuestPreference = {
        id: crypto.randomUUID(),
        category: newPreference.category,
        description: newPreference.description
      };
      
      onUpdatePreferences([...preferences, preference]);
      setNewPreference({ category: "", description: "" });
      setIsAddPreferenceDialogOpen(false);
    }
  };

  const handleRemovePreference = (preferenceId: string) => {
    onUpdatePreferences(preferences.filter(p => p.id !== preferenceId));
  };

  return (
    <div className="space-y-4 pt-4">
      <div className="flex justify-between items-center">
        <h3 className="font-semibold">Guest Preferences</h3>
        <Button 
          variant="outline" 
          size="sm" 
          onClick={() => setIsAddPreferenceDialogOpen(true)}
        >
          <Plus className="h-4 w-4 mr-2" />
          Add Preference
        </Button>
      </div>

      {Object.keys(preferencesByCategory).length === 0 ? (
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-10">
            <p className="text-muted-foreground text-center">
              No preferences recorded for this guest.
            </p>
          </CardContent>
        </Card>
      ) : (
        Object.entries(preferencesByCategory).map(([category, categoryPreferences]) => (
          <Card key={category}>
            <CardContent className="p-4">
              <h4 className="font-medium text-sm mb-3 capitalize">{category}</h4>
              <div className="space-y-2">
                {categoryPreferences.map(preference => (
                  <div key={preference.id} className="flex justify-between items-center bg-muted/40 p-2 rounded-md">
                    <p className="text-sm">{preference.description}</p>
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className="h-8 w-8 p-0"
                      onClick={() => handleRemovePreference(preference.id)}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        ))
      )}

      {/* Add Preference Dialog */}
      <Dialog open={isAddPreferenceDialogOpen} onOpenChange={setIsAddPreferenceDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add Preference</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="category">Category</Label>
              <Input
                id="category"
                placeholder="e.g., Room, Dining, Amenities"
                value={newPreference.category}
                onChange={(e) => setNewPreference({ ...newPreference, category: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Input
                id="description"
                placeholder="e.g., Prefers feather-free pillows"
                value={newPreference.description}
                onChange={(e) => setNewPreference({ ...newPreference, description: e.target.value })}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsAddPreferenceDialogOpen(false)}>Cancel</Button>
            <Button onClick={handleAddPreference}>Add Preference</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default GuestPreferences;
