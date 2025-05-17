import React from 'react';
import { WebsiteSection } from '@/types/website-builder-types';
import { Button } from '@/components/ui/button';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { ChevronDown, ChevronUp, Trash, Edit, ArrowUp, ArrowDown } from 'lucide-react';

interface SectionEditorProps {
  section: WebsiteSection;
  onUpdate: (section: WebsiteSection) => void;
  onDelete: () => void;
  onMoveUp: () => void;
  onMoveDown: () => void;
  isFirst: boolean;
  isLast: boolean;
}

export function SectionEditor({
  section,
  onUpdate,
  onDelete,
  onMoveUp,
  onMoveDown,
  isFirst,
  isLast
}: SectionEditorProps) {
  const [isExpanded, setIsExpanded] = React.useState(false);

  const getSectionIcon = (type: WebsiteSection['type']) => {
    switch (type) {
      case 'hero':
        return '🖼️';
      case 'rooms':
        return '🛏️';
      case 'about':
        return '📝';
      case 'attractions':
        return '🗺️';
      case 'contact':
        return '📞';
      case 'gallery':
        return '📷';
      case 'testimonials':
        return '💬';
      case 'blog':
        return '📰';
      default:
        return '📄';
    }
  };

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onUpdate({
      ...section,
      title: e.target.value
    });
  };

  return (
    <Collapsible
      open={isExpanded}
      onOpenChange={setIsExpanded}
      className="border rounded-lg overflow-hidden"
    >
      <div className="flex items-center justify-between p-3 bg-accent/30">
        <div className="flex items-center">
          <span className="mr-2 text-lg">{getSectionIcon(section.type)}</span>
          <span className="font-medium capitalize">{section.type} Section</span>
          {section.aiGenerated && (
            <span className="ml-2 text-xs bg-pms-purple/20 text-pms-purple px-1.5 py-0.5 rounded-sm">
              AI Generated
            </span>
          )}
        </div>
        <div className="flex items-center space-x-1">
          <Button 
            variant="ghost" 
            size="icon"
            className="h-7 w-7"
            onClick={onMoveUp}
            disabled={isFirst}
          >
            <ArrowUp className="h-4 w-4" />
          </Button>
          <Button 
            variant="ghost" 
            size="icon"
            className="h-7 w-7"
            onClick={onMoveDown}
            disabled={isLast}
          >
            <ArrowDown className="h-4 w-4" />
          </Button>
          <Button 
            variant="ghost" 
            size="icon"
            className="h-7 w-7 text-destructive hover:bg-destructive/10"
            onClick={onDelete}
          >
            <Trash className="h-4 w-4" />
          </Button>
          <CollapsibleTrigger asChild>
            <Button 
              variant="ghost" 
              size="icon"
              className="h-7 w-7"
            >
              {isExpanded ? (
                <ChevronUp className="h-4 w-4" />
              ) : (
                <ChevronDown className="h-4 w-4" />
              )}
            </Button>
          </CollapsibleTrigger>
        </div>
      </div>
      <CollapsibleContent>
        <div className="p-3 border-t bg-white">
          <div className="space-y-3">
            <div>
              <label htmlFor={`section-${section.id}-title`} className="block text-sm font-medium mb-1">
                Section Title
              </label>
              <input
                id={`section-${section.id}-title`}
                type="text"
                value={section.title}
                onChange={handleTitleChange}
                className="w-full border border-input px-3 py-1 rounded-md text-sm"
              />
            </div>
            
            {/* Additional section-specific content editing would go here */}
            <Button variant="outline" size="sm" className="w-full">
              <Edit className="h-3 w-3 mr-1" /> Edit Content
            </Button>
          </div>
        </div>
      </CollapsibleContent>
    </Collapsible>
  );
}
