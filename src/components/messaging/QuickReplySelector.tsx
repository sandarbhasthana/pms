
import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { QuickReplyTemplate } from "@/types/messaging-types";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

interface QuickReplyProps {
  templates: QuickReplyTemplate[];
  onSelectTemplate: (content: string) => void;
  isLoading?: boolean;
}

export function QuickReplySelector({ templates, onSelectTemplate, isLoading }: QuickReplyProps) {
  const [search, setSearch] = useState("");
  const [filteredTemplates, setFilteredTemplates] = useState<QuickReplyTemplate[]>(templates);
  const [open, setOpen] = useState(false);
  
  useEffect(() => {
    if (search) {
      const lowerSearch = search.toLowerCase();
      setFilteredTemplates(templates.filter(template => 
        template.name.toLowerCase().includes(lowerSearch) || 
        template.content.toLowerCase().includes(lowerSearch) || 
        template.tags.some(tag => tag.toLowerCase().includes(lowerSearch))
      ));
    } else {
      setFilteredTemplates(templates);
    }
  }, [search, templates]);
  
  const handleSelect = (content: string) => {
    onSelectTemplate(content);
    setOpen(false);
  };
  
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="ghost" size="sm">Quick Replies</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[525px]">
        <DialogHeader>
          <DialogTitle>Select Quick Reply Template</DialogTitle>
        </DialogHeader>
        
        <div className="relative mb-4">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search templates..."
            className="pl-9"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        
        {isLoading ? (
          <div className="space-y-2">
            {Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="animate-pulse h-24 bg-muted rounded"></div>
            ))}
          </div>
        ) : (
          <div className="space-y-2 max-h-[400px] overflow-y-auto">
            {filteredTemplates.length === 0 ? (
              <p className="text-center py-6 text-muted-foreground">
                No templates found matching your search
              </p>
            ) : (
              filteredTemplates.map((template) => (
                <div 
                  key={template.id}
                  className="border rounded-md p-3 hover:bg-muted cursor-pointer"
                  onClick={() => handleSelect(template.content)}
                >
                  <h4 className="font-medium mb-1">{template.name}</h4>
                  <p className="text-sm text-muted-foreground line-clamp-2 mb-2">{template.content}</p>
                  <div className="flex flex-wrap gap-1">
                    {template.tags.map(tag => (
                      <span 
                        key={tag} 
                        className="bg-muted px-2 py-0.5 rounded text-xs text-muted-foreground"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              ))
            )}
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
