
import React, { useState } from 'react';
import { WebsiteTemplate } from '@/types/website-builder-types';
import { Button } from '@/components/ui/button';
import { Search, Filter } from 'lucide-react';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface TemplateSelectionProps {
  templates: WebsiteTemplate[];
  onSelect: (template: WebsiteTemplate) => void;
}

export function TemplateSelection({ templates, onSelect }: TemplateSelectionProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [styleFilter, setStyleFilter] = useState<string>('all');
  
  const filteredTemplates = templates.filter(template => {
    const matchesSearch = template.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          template.description.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesStyle = styleFilter === 'all' || template.style === styleFilter;
    
    return matchesSearch && matchesStyle;
  });
  
  return (
    <div className="h-full flex flex-col">
      <div className="mb-6">
        <h2 className="text-2xl font-bold mb-2">Select a Website Template</h2>
        <p className="text-muted-foreground">
          Choose a template as a starting point. Our AI will automatically fill it with your hotel's content.
        </p>
      </div>
      
      <div className="flex gap-4 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search templates..."
            className="pl-9"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        
        <Select
          value={styleFilter}
          onValueChange={setStyleFilter}
        >
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Filter by style" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Styles</SelectItem>
            <SelectItem value="modern">Modern</SelectItem>
            <SelectItem value="luxury">Luxury</SelectItem>
            <SelectItem value="boutique">Boutique</SelectItem>
            <SelectItem value="classic">Classic</SelectItem>
            <SelectItem value="minimalist">Minimalist</SelectItem>
          </SelectContent>
        </Select>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 overflow-y-auto pb-6">
        {filteredTemplates.map((template) => (
          <div 
            key={template.id}
            className="flex flex-col border rounded-lg overflow-hidden hover:shadow-md transition-shadow"
          >
            <div className="relative h-48 bg-muted overflow-hidden">
              <img 
                src={template.thumbnail}
                alt={template.name}
                className="w-full h-full object-cover"
              />
            </div>
            
            <div className="p-4 flex-1 flex flex-col">
              <h3 className="font-semibold text-lg">{template.name}</h3>
              <p className="text-sm text-muted-foreground mb-2">{template.style} style</p>
              <p className="text-sm mb-4 flex-1">{template.description}</p>
              
              <div className="flex flex-wrap gap-2 mb-4">
                {template.features.slice(0, 3).map((feature, i) => (
                  <span key={i} className="px-2 py-1 bg-secondary text-secondary-foreground text-xs rounded-full">
                    {feature}
                  </span>
                ))}
                {template.features.length > 3 && (
                  <span className="px-2 py-1 bg-secondary text-secondary-foreground text-xs rounded-full">
                    +{template.features.length - 3} more
                  </span>
                )}
              </div>
              
              <Button onClick={() => onSelect(template)}>
                Select Template
              </Button>
            </div>
          </div>
        ))}
        
        {filteredTemplates.length === 0 && (
          <div className="col-span-full text-center py-12">
            <p className="text-muted-foreground mb-2">No templates match your search</p>
            <Button variant="outline" onClick={() => { setSearchQuery(''); setStyleFilter('all'); }}>
              Clear Filters
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
