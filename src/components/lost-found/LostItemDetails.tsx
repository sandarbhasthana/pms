
import React, { useState } from "react";
import { LostFoundItem, LostItemStatus } from "@/types/lost-found-types";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { formatDate } from "@/lib/utils";
import { Label } from "@/components/ui/label";
import { StatusBadge } from "./StatusBadge";
import { X, Save } from "lucide-react";

interface LostItemDetailsProps {
  item: LostFoundItem;
  onUpdate: (item: LostFoundItem) => void;
  onClose: () => void;
}

export function LostItemDetails({ item, onUpdate, onClose }: LostItemDetailsProps) {
  const [localItem, setLocalItem] = useState<LostFoundItem>({ ...item });
  const [isEditing, setIsEditing] = useState(false);

  const handleStatusChange = (value: string) => {
    setLocalItem({
      ...localItem,
      status: value as LostItemStatus
    });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setLocalItem({
      ...localItem,
      [name]: value
    });
  };

  const handleSave = () => {
    // If status changed to "Returned to Guest", set return date to today
    if (localItem.status === "Returned to Guest" && item.status !== "Returned to Guest") {
      localItem.returnDate = new Date();
    }
    
    onUpdate(localItem);
    setIsEditing(false);
  };

  return (
    <Card className="h-full">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <div>
          <CardTitle>Item Details</CardTitle>
        </div>
        <Button variant="ghost" size="sm" onClick={onClose}>
          <X className="h-4 w-4" />
        </Button>
      </CardHeader>
      
      <CardContent className="space-y-4">
        {localItem.photoUrl && (
          <div className="mb-4">
            <img 
              src={localItem.photoUrl} 
              alt={localItem.description} 
              className="w-full h-48 object-cover rounded-md"
            />
          </div>
        )}

        <div className="grid grid-cols-1 gap-4">
          <div>
            <Label className="text-muted-foreground text-sm">Status</Label>
            {isEditing ? (
              <Select
                value={localItem.status}
                onValueChange={handleStatusChange}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Stored">Stored</SelectItem>
                  <SelectItem value="Returned to Guest">Returned to Guest</SelectItem>
                  <SelectItem value="Disposed">Disposed</SelectItem>
                  <SelectItem value="In Process">In Process</SelectItem>
                </SelectContent>
              </Select>
            ) : (
              <div className="mt-1">
                <StatusBadge status={localItem.status} />
              </div>
            )}
          </div>

          <div>
            <Label className="text-muted-foreground text-sm">Description</Label>
            {isEditing ? (
              <Textarea
                name="description"
                value={localItem.description}
                onChange={handleInputChange}
                className="mt-1"
              />
            ) : (
              <p className="mt-1">{localItem.description}</p>
            )}
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label className="text-muted-foreground text-sm">Date Found</Label>
              <p className="mt-1">{formatDate(localItem.dateFound)}</p>
            </div>
            
            <div>
              <Label className="text-muted-foreground text-sm">Location Found</Label>
              {isEditing ? (
                <Input
                  name="location"
                  value={localItem.location}
                  onChange={handleInputChange}
                  className="mt-1"
                />
              ) : (
                <p className="mt-1">{localItem.location}</p>
              )}
            </div>
          </div>

          <div>
            <Label className="text-muted-foreground text-sm">Found By</Label>
            <p className="mt-1">{localItem.finderName}</p>
          </div>

          <div>
            <Label className="text-muted-foreground text-sm">Linked Guest</Label>
            <p className="mt-1">{localItem.linkedGuestName || "No guest linked"}</p>
          </div>

          {isEditing && localItem.status === "Returned to Guest" && (
            <div>
              <Label className="text-muted-foreground text-sm">Tracking Number (if shipped)</Label>
              <Input
                name="trackingNumber"
                value={localItem.trackingNumber || ""}
                onChange={handleInputChange}
                placeholder="Enter tracking number"
                className="mt-1"
              />
            </div>
          )}

          <div>
            <Label className="text-muted-foreground text-sm">Notes</Label>
            {isEditing ? (
              <Textarea
                name="notes"
                value={localItem.notes || ""}
                onChange={handleInputChange}
                className="mt-1"
                placeholder="Add notes about this item"
              />
            ) : (
              <p className="mt-1">{localItem.notes || "No notes"}</p>
            )}
          </div>

          {localItem.returnDate && (
            <div>
              <Label className="text-muted-foreground text-sm">Return Date</Label>
              <p className="mt-1">{formatDate(localItem.returnDate)}</p>
            </div>
          )}

          {localItem.trackingNumber && (
            <div>
              <Label className="text-muted-foreground text-sm">Tracking Number</Label>
              <p className="mt-1">{localItem.trackingNumber}</p>
            </div>
          )}
        </div>
      </CardContent>
      
      <CardFooter>
        {isEditing ? (
          <div className="flex space-x-2 w-full">
            <Button variant="outline" onClick={() => {
              setLocalItem({...item});
              setIsEditing(false);
            }} className="flex-1">
              Cancel
            </Button>
            <Button onClick={handleSave} className="flex-1">
              <Save className="mr-2 h-4 w-4" />
              Save Changes
            </Button>
          </div>
        ) : (
          <Button onClick={() => setIsEditing(true)} className="w-full">
            Update Item
          </Button>
        )}
      </CardFooter>
    </Card>
  );
}
