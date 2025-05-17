
import React, { useState } from "react";
import { LostFoundTable } from "./LostFoundTable";
import { LostItemDetails } from "./LostItemDetails";
import { AddLostItemDialog } from "./AddLostItemDialog";
import { LostFoundItem } from "@/types/lost-found-types";
import { Button } from "@/components/ui/button";
import { SearchBar } from "./SearchBar";
import { Plus, Package } from "lucide-react";
import { mockLostItems } from "./mock-lost-items";

export function LostFoundManager() {
  const [items, setItems] = useState<LostFoundItem[]>(mockLostItems);
  const [selectedItem, setSelectedItem] = useState<LostFoundItem | null>(null);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [filteredItems, setFilteredItems] = useState<LostFoundItem[]>(mockLostItems);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string | null>(null);

  const handleSearch = (term: string, status: string | null) => {
    setSearchTerm(term);
    setStatusFilter(status);
    
    let results = items;
    
    // Filter by search term
    if (term.trim() !== "") {
      const lowerTerm = term.toLowerCase();
      results = results.filter(item => 
        item.description.toLowerCase().includes(lowerTerm) || 
        item.location.toLowerCase().includes(lowerTerm) ||
        (item.linkedGuestName && item.linkedGuestName.toLowerCase().includes(lowerTerm))
      );
    }
    
    // Filter by status
    if (status && status !== "All") {
      results = results.filter(item => item.status === status);
    }
    
    setFilteredItems(results);
  };

  const handleAddItem = (newItem: LostFoundItem) => {
    const updatedItems = [...items, newItem];
    setItems(updatedItems);
    setFilteredItems(updatedItems);
    setIsAddDialogOpen(false);
  };

  const handleUpdateItem = (updatedItem: LostFoundItem) => {
    const updatedItems = items.map(item => 
      item.id === updatedItem.id ? updatedItem : item
    );
    setItems(updatedItems);
    setFilteredItems(updatedItems);
    setSelectedItem(null);
  };

  const handleSelectItem = (item: LostFoundItem) => {
    setSelectedItem(item);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Package className="h-6 w-6 text-primary" />
          <h2 className="text-xl font-medium">Item Tracking</h2>
        </div>
        <Button onClick={() => setIsAddDialogOpen(true)}>
          <Plus className="mr-2 h-4 w-4" />
          Log New Item
        </Button>
      </div>
      
      <SearchBar onSearch={handleSearch} />
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <LostFoundTable 
            items={filteredItems} 
            onItemSelect={handleSelectItem} 
            selectedItemId={selectedItem?.id}
          />
        </div>
        
        <div>
          {selectedItem ? (
            <LostItemDetails 
              item={selectedItem} 
              onUpdate={handleUpdateItem} 
              onClose={() => setSelectedItem(null)} 
            />
          ) : (
            <div className="border rounded-lg p-6 h-full flex flex-col items-center justify-center text-center text-muted-foreground">
              <Package className="h-12 w-12 mb-4 opacity-50" />
              <h3 className="text-lg font-medium mb-2">No Item Selected</h3>
              <p>Select an item from the table to view details or update its status</p>
            </div>
          )}
        </div>
      </div>
      
      <AddLostItemDialog 
        open={isAddDialogOpen} 
        onClose={() => setIsAddDialogOpen(false)} 
        onSave={handleAddItem} 
      />
    </div>
  );
}
