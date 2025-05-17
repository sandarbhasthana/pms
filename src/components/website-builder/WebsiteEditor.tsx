import React, { useState } from 'react';
import { WebsiteData, EditorMode, EditorView, WebsiteSection, ChatbotConfig } from '@/types/website-builder-types';
import { 
  Tabs, 
  TabsContent, 
  TabsList, 
  TabsTrigger 
} from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { 
  Laptop, 
  Smartphone, 
  Tablet, 
  LayoutList,
  Settings,
  Bot,
  Undo, 
  Redo, 
  Sparkles,
  Plus,
  Image,
  PenSquare,
  MapPin,
  Coffee,
  Loader2
} from 'lucide-react';
import { SectionEditor } from './SectionEditor';
import { SeoSettings } from './SeoSettings';
import { ChatbotConfig as ChatbotConfigComponent } from './ChatbotConfig';
import { toast } from '@/hooks/use-toast';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

interface WebsiteEditorProps {
  websiteData: WebsiteData;
  setWebsiteData: React.Dispatch<React.SetStateAction<WebsiteData | null>>;
  currentStep?: number;
  totalSteps?: number;
  onNextStep?: () => void;
}

export function WebsiteEditor({ 
  websiteData, 
  setWebsiteData, 
  currentStep = 0, 
  totalSteps = 0,
  onNextStep 
}: WebsiteEditorProps) {
  const [activeTab, setActiveTab] = useState<'content' | 'seo' | 'chatbot'>('content');
  const [deviceMode, setDeviceMode] = useState<EditorMode>('desktop');
  const [showAIHints, setShowAIHints] = useState(true);
  const [isGeneratingContent, setIsGeneratingContent] = useState(false);

  const handleSectionUpdate = (updatedSection: WebsiteSection) => {
    setWebsiteData({
      ...websiteData,
      sections: websiteData.sections.map(section => 
        section.id === updatedSection.id ? updatedSection : section
      )
    });
  };

  const handleAddSection = (sectionType: WebsiteSection['type']) => {
    const newSection: WebsiteSection = {
      id: `section-${Date.now()}`,
      type: sectionType,
      title: `New ${sectionType.charAt(0).toUpperCase() + sectionType.slice(1)} Section`,
      content: {},
      order: websiteData.sections.length + 1,
      aiGenerated: false
    };

    setWebsiteData({
      ...websiteData,
      sections: [...websiteData.sections, newSection]
    });
    
    // If this is part of the onboarding, proceed to next step
    if (onNextStep && sectionType === 'about') {
      onNextStep();
    }
  };

  const handleSectionOrderChange = (sectionId: string, direction: 'up' | 'down') => {
    const currentIndex = websiteData.sections.findIndex(s => s.id === sectionId);
    if (currentIndex === -1) return;
    
    if (direction === 'up' && currentIndex > 0) {
      const newSections = [...websiteData.sections];
      const temp = newSections[currentIndex];
      newSections[currentIndex] = newSections[currentIndex - 1];
      newSections[currentIndex - 1] = temp;
      
      // Update order properties
      newSections.forEach((section, idx) => {
        section.order = idx + 1;
      });
      
      setWebsiteData({
        ...websiteData,
        sections: newSections
      });
    }
    
    if (direction === 'down' && currentIndex < websiteData.sections.length - 1) {
      const newSections = [...websiteData.sections];
      const temp = newSections[currentIndex];
      newSections[currentIndex] = newSections[currentIndex + 1];
      newSections[currentIndex + 1] = temp;
      
      // Update order properties
      newSections.forEach((section, idx) => {
        section.order = idx + 1;
      });
      
      setWebsiteData({
        ...websiteData,
        sections: newSections
      });
    }
  };

  const handleDeleteSection = (sectionId: string) => {
    setWebsiteData({
      ...websiteData,
      sections: websiteData.sections.filter(s => s.id !== sectionId)
    });
  };

  const handleSeoUpdate = (seoData: WebsiteData['seo']) => {
    setWebsiteData({
      ...websiteData,
      seo: seoData
    });
    
    // If this is part of the onboarding, proceed to next step
    if (onNextStep && activeTab === 'seo') {
      onNextStep();
    }
  };
  
  const handleChatbotUpdate = (chatbotConfig: ChatbotConfig) => {
    setWebsiteData({
      ...websiteData,
      chatbotConfig
    });
    
    toast({
      title: 'Chatbot settings updated',
      description: chatbotConfig.enabled 
        ? 'The AI chatbot is now enabled on your website.'
        : 'The AI chatbot has been disabled.',
    });
    
    // If this is part of the onboarding, proceed to next step
    if (onNextStep && activeTab === 'chatbot') {
      onNextStep();
    }
  };
  
  const generateAIContentForSection = (type: WebsiteSection['type']) => {
    setIsGeneratingContent(true);
    
    // Simulate AI content generation
    setTimeout(() => {
      let content: any = {};
      let title = '';
      
      switch (type) {
        case 'about':
          title = 'About Our Boutique Hotel';
          content = {
            description: 'Based on your guest reviews and hotel information, our AI suggests highlighting your award-winning service, central location, and recently renovated rooms that guests consistently praise in their feedback.',
            highlights: [
              'Award-winning restaurant with local cuisine',
              'Central location within walking distance to attractions',
              'Recently renovated rooms with luxury amenities',
              'Personalized service with staff that guests mention by name'
            ]
          };
          break;
        case 'attractions':
          title = 'Explore The Neighborhood';
          content = {
            description: 'Based on your hotel\'s address, our AI has identified these nearby attractions that your guests might enjoy visiting during their stay.',
            attractions: [
              { name: 'City Museum', distance: '0.4 miles', type: 'attraction' },
              { name: 'Central Park', distance: '0.7 miles', type: 'attraction' },
              { name: 'Gourmet Restaurant Row', distance: '0.3 miles', type: 'restaurant' },
              { name: 'Downtown Shopping District', distance: '0.5 miles', type: 'attraction' }
            ]
          };
          break;
        default:
          title = `New ${type.charAt(0).toUpperCase() + type.slice(1)} Section`;
          content = { text: 'AI generated content would appear here based on your hotel data.' };
      }
      
      const newSection: WebsiteSection = {
        id: `section-${Date.now()}`,
        type: type,
        title: title,
        content: content,
        order: websiteData.sections.length + 1,
        aiGenerated: true
      };
      
      setWebsiteData({
        ...websiteData,
        sections: [...websiteData.sections, newSection]
      });
      
      setIsGeneratingContent(false);
      
      toast({
        title: 'AI content generated',
        description: `A new ${type} section has been created with AI-generated content.`,
      });
    }, 2000);
  };

  // Initialize chatbot config if it doesn't exist
  const chatbotConfig = websiteData.chatbotConfig || {
    enabled: false,
    greetingMessage: 'Welcome to our hotel! How can I assist you with your stay?',
    avatarUrl: '',
    primaryColor: '#9b87f5',
    language: 'en' as const,
    fallbackEmail: '',
    commonQuestions: [
      {
        question: 'Do you offer free WiFi?',
        answer: 'Yes, we offer complimentary high-speed WiFi throughout the property for all our guests.'
      },
      {
        question: 'What are your check-in and check-out times?',
        answer: 'Check-in time starts at 3:00 PM, and check-out time is until 12:00 PM. Early check-in or late check-out can be arranged based on availability.'
      }
    ]
  };
  
  // Determine if we should show step guidance based on onboarding process
  const showStepGuidance = currentStep > 0 && currentStep <= totalSteps;

  return (
    <div className="flex flex-col w-80 border-r overflow-hidden">
      {/* Step Indicator - Only show when in onboarding */}
      {showStepGuidance && (
        <div className="bg-pms-purple/10 p-4 border-b">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-sm font-medium">Website Setup Progress</h3>
            <span className="text-xs text-muted-foreground">Step {currentStep} of {totalSteps}</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2.5">
            <div 
              className="bg-pms-purple h-2.5 rounded-full" 
              style={{ width: `${(currentStep / totalSteps) * 100}%` }}
            ></div>
          </div>
        </div>
      )}

      <div className="flex items-center justify-between p-4 border-b">
        <div className="flex">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button 
                  variant="ghost" 
                  size="icon"
                  className={deviceMode === 'desktop' ? 'bg-accent' : ''}
                  onClick={() => setDeviceMode('desktop')}
                >
                  <Laptop className="h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>Desktop View</TooltipContent>
            </Tooltip>
            
            <Tooltip>
              <TooltipTrigger asChild>
                <Button 
                  variant="ghost" 
                  size="icon"
                  className={deviceMode === 'tablet' ? 'bg-accent' : ''}
                  onClick={() => setDeviceMode('tablet')}
                >
                  <Tablet className="h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>Tablet View</TooltipContent>
            </Tooltip>
            
            <Tooltip>
              <TooltipTrigger asChild>
                <Button 
                  variant="ghost" 
                  size="icon"
                  className={deviceMode === 'mobile' ? 'bg-accent' : ''}
                  onClick={() => setDeviceMode('mobile')}
                >
                  <Smartphone className="h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>Mobile View</TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
        
        <div className="flex">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="ghost" size="icon" title="Undo">
                  <Undo className="h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>Undo</TooltipContent>
            </Tooltip>
            
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="ghost" size="icon" title="Redo">
                  <Redo className="h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>Redo</TooltipContent>
            </Tooltip>
            
            <Tooltip>
              <TooltipTrigger asChild>
                <Button 
                  variant="ghost" 
                  size="icon" 
                  title="AI Hints"
                  className={showAIHints ? 'bg-accent' : ''}
                  onClick={() => setShowAIHints(!showAIHints)}
                >
                  <Sparkles className="h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>Toggle AI Suggestions</TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={(v) => setActiveTab(v as any)}>
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="content" className="flex items-center gap-2">
            <LayoutList className="h-4 w-4" />
            <span>Content</span>
          </TabsTrigger>
          <TabsTrigger value="seo" className="flex items-center gap-2">
            <Settings className="h-4 w-4" />
            <span>SEO</span>
          </TabsTrigger>
          <TabsTrigger value="chatbot" className="flex items-center gap-2">
            <Bot className="h-4 w-4" />
            <span>Chatbot</span>
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="content" className="overflow-y-auto flex-1">
          <div className="p-4">
            <h3 className="font-medium mb-2">Page Sections</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Drag to reorder. Click to edit content.
            </p>
            
            <div className="space-y-3">
              {websiteData.sections.map((section) => (
                <SectionEditor
                  key={section.id}
                  section={section}
                  onUpdate={handleSectionUpdate}
                  onDelete={() => handleDeleteSection(section.id)}
                  onMoveUp={() => handleSectionOrderChange(section.id, 'up')}
                  onMoveDown={() => handleSectionOrderChange(section.id, 'down')}
                  isFirst={section.order === 1}
                  isLast={section.order === websiteData.sections.length}
                />
              ))}
            </div>
            
            <div className="mt-6">
              <div className="flex justify-between mb-2">
                <h3 className="font-medium">Add New Section</h3>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="h-6 text-xs text-pms-purple"
                  onClick={() => onNextStep && onNextStep()}
                  disabled={!onNextStep}
                >
                  Skip Step
                </Button>
              </div>
              
              <div className="grid grid-cols-2 gap-2">
                <Button 
                  variant="outline" 
                  className="justify-start" 
                  onClick={() => handleAddSection('hero')}
                >
                  <Plus className="h-4 w-4 mr-2" /> Hero
                </Button>
                <Button 
                  variant="outline" 
                  className="justify-start"
                  onClick={() => handleAddSection('rooms')}
                >
                  <Plus className="h-4 w-4 mr-2" /> Rooms
                </Button>
                <Button 
                  variant="outline" 
                  className="justify-start"
                  onClick={() => handleAddSection('about')}
                >
                  <Plus className="h-4 w-4 mr-2" /> About
                </Button>
                <Button 
                  variant="outline" 
                  className="justify-start"
                  onClick={() => handleAddSection('gallery')}
                >
                  <Plus className="h-4 w-4 mr-2" /> Gallery
                </Button>
                <Button 
                  variant="outline" 
                  className="justify-start"
                  onClick={() => handleAddSection('attractions')}
                >
                  <Plus className="h-4 w-4 mr-2" /> Attractions
                </Button>
                <Button 
                  variant="outline" 
                  className="justify-start"
                  onClick={() => handleAddSection('contact')}
                >
                  <Plus className="h-4 w-4 mr-2" /> Contact
                </Button>
              </div>
            </div>
            
            <div className="mt-6 border-t pt-4">
              <h3 className="font-medium mb-3 flex items-center">
                <Sparkles className="h-4 w-4 mr-2 text-pms-purple" />
                AI Content Generation
              </h3>
              
              <p className="text-sm text-muted-foreground mb-3">
                Let AI create content sections based on your hotel's data and guest feedback.
              </p>
              
              <div className="grid grid-cols-2 gap-2">
                <Button
                  variant="outline"
                  className="flex items-center justify-start bg-pms-purple/5 hover:bg-pms-purple/10"
                  onClick={() => generateAIContentForSection('about')}
                  disabled={isGeneratingContent}
                >
                  {isGeneratingContent ? (
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  ) : (
                    <PenSquare className="h-4 w-4 mr-2 text-pms-purple" />
                  )}
                  About Us
                </Button>
                <Button
                  variant="outline"
                  className="flex items-center justify-start bg-pms-purple/5 hover:bg-pms-purple/10"
                  onClick={() => generateAIContentForSection('attractions')}
                  disabled={isGeneratingContent}
                >
                  {isGeneratingContent ? (
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  ) : (
                    <MapPin className="h-4 w-4 mr-2 text-pms-purple" />
                  )}
                  Attractions
                </Button>
                <Button
                  variant="outline"
                  className="flex items-center justify-start bg-pms-purple/5 hover:bg-pms-purple/10"
                  onClick={() => generateAIContentForSection('gallery')}
                  disabled={isGeneratingContent}
                >
                  {isGeneratingContent ? (
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  ) : (
                    <Image className="h-4 w-4 mr-2 text-pms-purple" />
                  )}
                  Gallery
                </Button>
                <Button
                  variant="outline"
                  className="flex items-center justify-start bg-pms-purple/5 hover:bg-pms-purple/10" 
                  onClick={() => generateAIContentForSection('testimonials')}
                  disabled={isGeneratingContent}
                >
                  {isGeneratingContent ? (
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  ) : (
                    <Coffee className="h-4 w-4 mr-2 text-pms-purple" />
                  )}
                  Dining
                </Button>
              </div>
            </div>
          </div>
        </TabsContent>
        
        <TabsContent value="seo" className="overflow-y-auto flex-1">
          <SeoSettings
            seoData={websiteData.seo}
            onUpdate={handleSeoUpdate}
            onSkip={onNextStep}
          />
        </TabsContent>
        
        <TabsContent value="chatbot" className="overflow-y-auto flex-1">
          <ChatbotConfigComponent
            config={chatbotConfig}
            onChange={handleChatbotUpdate}
            onSkip={onNextStep}
          />
        </TabsContent>
      </Tabs>
      
      {showAIHints && (
        <div className="border-t p-4 bg-secondary/30">
          <Collapsible>
            <CollapsibleTrigger className="flex items-center justify-between w-full">
              <h3 className="text-sm font-medium flex items-center">
                <Sparkles className="h-4 w-4 mr-2 text-pms-purple" />
                AI Suggestions
              </h3>
              <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
                <Plus className="h-4 w-4" />
              </Button>
            </CollapsibleTrigger>
            <CollapsibleContent>
              <div className="text-xs space-y-2 mt-2">
                <p className="p-2 bg-pms-purple/10 rounded">
                  Your About Us section would benefit from mentioning your award-winning restaurant.
                </p>
                <p className="p-2 bg-pms-purple/10 rounded">
                  Consider adding a testimonial section to highlight your 4.8 star average guest rating.
                </p>
                <p className="p-2 bg-pms-purple/10 rounded">
                  Add photos of your pool area to the Gallery section - it's mentioned in your description.
                </p>
                <Button 
                  variant="link" 
                  className="text-xs text-pms-purple p-0 h-auto mt-1"
                  onClick={() => toast({
                    title: "AI assistant activated",
                    description: "Ask for specific content recommendations in the chat."
                  })}
                >
                  Ask AI for more suggestions
                </Button>
              </div>
            </CollapsibleContent>
          </Collapsible>
        </div>
      )}
    </div>
  );
}
