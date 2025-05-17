
import React, { useState } from "react";
import { WebsiteData } from "@/types/website-builder-types";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { X, PlusCircle, AlertTriangle, CheckCircle } from "lucide-react";

interface SeoSettingsProps {
  seoData: WebsiteData["seo"];
  onUpdate: (seoData: WebsiteData["seo"]) => void;
  onSkip?: () => void;
}

export function SeoSettings({ seoData, onUpdate, onSkip }: SeoSettingsProps) {
  const [newKeyword, setNewKeyword] = useState("");
  const [title, setTitle] = useState(seoData.title);
  const [description, setDescription] = useState(seoData.description);
  const [keywords, setKeywords] = useState<string[]>(seoData.keywords || []);

  const handleAddKeyword = () => {
    if (newKeyword.trim() && !keywords.includes(newKeyword.trim())) {
      const updatedKeywords = [...keywords, newKeyword.trim()];
      setKeywords(updatedKeywords);
      setNewKeyword("");
      
      onUpdate({
        title,
        description,
        keywords: updatedKeywords,
      });
    }
  };

  const handleRemoveKeyword = (keyword: string) => {
    const updatedKeywords = keywords.filter((k) => k !== keyword);
    setKeywords(updatedKeywords);
    
    onUpdate({
      title,
      description,
      keywords: updatedKeywords,
    });
  };

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };

  const handleDescriptionChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setDescription(e.target.value);
  };

  const handleSave = () => {
    onUpdate({
      title,
      description,
      keywords,
    });
  };

  // Validate SEO settings
  const isTitleValid = title && title.length <= 60;
  const isDescriptionValid = description && description.length <= 160;

  return (
    <div className="p-4 space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="font-medium">SEO Settings</h3>
        {onSkip && (
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={onSkip} 
            className="h-6 text-xs text-pms-purple"
          >
            Skip Step
          </Button>
        )}
      </div>
      
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1">Page Title</label>
          <Input 
            value={title} 
            onChange={handleTitleChange} 
            placeholder="Hotel Name - Location | Official Website" 
            className="mb-1"
          />
          <div className="flex justify-between items-center text-xs">
            <span>Recommended: 50-60 characters</span>
            <span className={`${title.length > 60 ? 'text-red-500' : 'text-muted-foreground'}`}>
              {title.length}/60
            </span>
          </div>
          
          {!isTitleValid && (
            <p className="text-xs text-red-500 mt-1 flex items-center">
              <AlertTriangle className="h-3 w-3 mr-1" />
              Title should be between 1 and 60 characters
            </p>
          )}
        </div>
        
        <div>
          <label className="block text-sm font-medium mb-1">Meta Description</label>
          <Textarea 
            value={description}
            onChange={handleDescriptionChange}
            placeholder="Brief description of your hotel and its key features. Include location and a call to action." 
            className="mb-1 resize-none"
            rows={3}
          />
          <div className="flex justify-between items-center text-xs">
            <span>Recommended: 120-160 characters</span>
            <span className={`${description.length > 160 ? 'text-red-500' : 'text-muted-foreground'}`}>
              {description.length}/160
            </span>
          </div>
          
          {!isDescriptionValid && (
            <p className="text-xs text-red-500 mt-1 flex items-center">
              <AlertTriangle className="h-3 w-3 mr-1" />
              Description should be between 1 and 160 characters
            </p>
          )}
        </div>
        
        <div>
          <label className="block text-sm font-medium mb-1">Keywords</label>
          <div className="flex space-x-2">
            <Input
              value={newKeyword}
              onChange={(e) => setNewKeyword(e.target.value)}
              placeholder="Add keyword..."
              className="flex-1"
              onKeyDown={(e) => e.key === 'Enter' && handleAddKeyword()}
            />
            <Button variant="outline" onClick={handleAddKeyword} disabled={!newKeyword.trim()}>
              <PlusCircle className="h-4 w-4 mr-1" />
              Add
            </Button>
          </div>
          
          {keywords.length > 0 ? (
            <div className="flex flex-wrap gap-2 mt-3">
              {keywords.map((keyword) => (
                <Badge key={keyword} variant="secondary" className="pl-2 pr-1 py-1 h-6">
                  {keyword}
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-4 w-4 ml-1 text-muted-foreground"
                    onClick={() => handleRemoveKeyword(keyword)}
                  >
                    <X className="h-3 w-3" />
                  </Button>
                </Badge>
              ))}
            </div>
          ) : (
            <p className="text-xs text-muted-foreground mt-2">
              No keywords added yet. Keywords help search engines understand your content.
            </p>
          )}
        </div>
        
        <div className="bg-muted p-3 rounded-md">
          <h4 className="text-sm font-medium flex items-center mb-2">
            <CheckCircle className="h-4 w-4 mr-1 text-green-500" />
            SEO Benefits
          </h4>
          <ul className="text-xs space-y-1 text-muted-foreground">
            <li>• Well-optimized meta tags improve search engine visibility</li>
            <li>• Clear titles and descriptions increase click-through rates</li>
            <li>• Proper keywords help target your ideal guests</li>
            <li>• Better SEO leads to more direct bookings with no OTA commissions</li>
          </ul>
        </div>
        
        <Button 
          onClick={handleSave} 
          disabled={!isTitleValid || !isDescriptionValid}
          className="w-full"
        >
          Save SEO Settings
        </Button>
      </div>
    </div>
  );
}
