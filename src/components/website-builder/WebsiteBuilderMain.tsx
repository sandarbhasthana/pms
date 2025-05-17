import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { TemplateSelection } from './TemplateSelection';
import { WebsiteEditor } from './WebsiteEditor';
import { WebsitePreview } from './WebsitePreview';
import { Button } from '@/components/ui/button';
import { Loader2, Eye, Globe } from 'lucide-react';
import { toast } from '@/hooks/use-toast';
import { WebsiteData, WebsiteTemplate } from '@/types/website-builder-types';
import { getMockTemplates, generateInitialWebsiteData } from './website-builder-mock-data';
import { OnboardingTooltip } from './OnboardingTooltip';

export function WebsiteBuilderMain() {
  const [websiteData, setWebsiteData] = useState<WebsiteData | null>(null);
  const [showFullScreenPreview, setShowFullScreenPreview] = useState(false);
  const [currentOnboardingStep, setCurrentOnboardingStep] = useState(0);
  
  // Simulating template loading with React Query
  const { data: templates, isLoading } = useQuery({
    queryKey: ['websiteTemplates'],
    queryFn: getMockTemplates,
  });

  const handleTemplateSelect = (template: WebsiteTemplate) => {
    // When a template is selected, generate initial website data
    const initialData = generateInitialWebsiteData(template);
    
    // Add default subdomain
    const hotelName = initialData.seo.title.toLowerCase().replace(/\s+/g, '-');
    initialData.defaultSubdomain = `${hotelName}.pmsplatform.com`;
    
    setWebsiteData(initialData);
    setCurrentOnboardingStep(1);
    
    toast({
      title: 'Template selected',
      description: `The ${template.name} template has been loaded with AI-generated content.`,
    });
  };

  const handleSaveWebsite = () => {
    if (!websiteData) return;
    
    // In a real app, this would save to the backend
    toast({
      title: 'Website saved',
      description: 'Your website changes have been saved successfully.',
    });
  };

  const handlePreviewWebsite = () => {
    setShowFullScreenPreview(true);
  };

  const closeFullScreenPreview = () => {
    setShowFullScreenPreview(false);
  };

  const handlePublishWebsite = () => {
    if (!websiteData) return;
    
    setWebsiteData({
      ...websiteData,
      published: true,
      lastPublished: new Date(),
    });
    
    toast({
      title: 'Website published',
      description: 'Your website is now live and accessible to visitors.',
    });
  };

  const handleNextOnboardingStep = () => {
    setCurrentOnboardingStep(prev => prev + 1);
  };

  const onboardingSteps = [
    { title: 'Choose a Theme', content: 'Select a template that matches your hotel style.' },
    { title: 'Add Basic Info', content: 'Sync your rooms and rates from your PMS.' },
    { title: 'Add Media', content: 'Upload photos and videos to showcase your property.' },
    { title: 'Customize Content', content: 'Add custom sections and content to your website.' },
    { title: 'Activate Features', content: 'Enable booking engine and chatbot.' },
    { title: 'Preview & Publish', content: 'Preview your website before making it live.' }
  ];

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="h-8 w-8 animate-spin" />
        <span className="ml-2">Loading templates...</span>
      </div>
    );
  }

  if (!templates) {
    return (
      <div className="text-center py-8">
        <p className="text-red-500">Failed to load website templates</p>
        <Button 
          variant="outline" 
          className="mt-4"
          onClick={() => window.location.reload()}
        >
          Retry
        </Button>
      </div>
    );
  }

  // Full screen preview overlay
  if (showFullScreenPreview && websiteData) {
    return (
      <div className="fixed inset-0 z-50 bg-white flex flex-col">
        <div className="p-4 border-b flex justify-between items-center bg-gray-50">
          <div className="flex items-center">
            <Globe className="h-5 w-5 mr-2 text-pms-purple" />
            <span className="font-medium">{websiteData.defaultSubdomain || 'yourhotel.pmsplatform.com'}</span>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" onClick={closeFullScreenPreview}>
              Exit Preview
            </Button>
          </div>
        </div>
        <div className="flex-1 overflow-y-auto">
          <WebsitePreview websiteData={websiteData} isFullScreen={true} />
        </div>
      </div>
    );
  }

  return (
    <div className="h-full flex flex-col">
      {!websiteData ? (
        <>
          <OnboardingTooltip
            isOpen={currentOnboardingStep === 0}
            title={onboardingSteps[0].title}
            content={onboardingSteps[0].content}
            onNext={handleNextOnboardingStep}
          />
          <TemplateSelection 
            templates={templates} 
            onSelect={handleTemplateSelect}
          />
        </>
      ) : (
        <div className="flex flex-col h-full">
          <div className="flex justify-between items-center mb-4 pb-4 border-b">
            <div className="flex items-center">
              <h2 className="text-xl font-semibold">
                Editing: {websiteData.template?.name} Template
              </h2>
              {websiteData.defaultSubdomain && (
                <div className="ml-4 text-sm text-muted-foreground flex items-center">
                  <Globe className="h-4 w-4 mr-1" />
                  {websiteData.defaultSubdomain}
                </div>
              )}
            </div>
            <div className="flex gap-2">
              <Button 
                variant="outline" 
                onClick={handleSaveWebsite}
              >
                Save
              </Button>
              <Button
                variant="outline"
                onClick={handlePreviewWebsite}
                className="flex items-center"
              >
                <Eye className="h-4 w-4 mr-2" />
                Preview
              </Button>
              <Button 
                onClick={handlePublishWebsite}
                disabled={websiteData.published && websiteData.lastPublished && 
                  new Date().getTime() - websiteData.lastPublished.getTime() < 60000}
              >
                {websiteData.published ? 'Update Live Site' : 'Publish Website'}
              </Button>
            </div>
          </div>
          
          <OnboardingTooltip
            isOpen={currentOnboardingStep > 0 && currentOnboardingStep < onboardingSteps.length}
            title={onboardingSteps[currentOnboardingStep]?.title || ''}
            content={onboardingSteps[currentOnboardingStep]?.content || ''}
            onNext={handleNextOnboardingStep}
          />
          
          <div className="flex flex-1 gap-4 overflow-hidden">
            <WebsiteEditor 
              websiteData={websiteData} 
              setWebsiteData={setWebsiteData}
              currentStep={currentOnboardingStep} 
              totalSteps={onboardingSteps.length}
              onNextStep={handleNextOnboardingStep}
            />
            <WebsitePreview 
              websiteData={websiteData}
              isFullScreen={false}
            />
          </div>
        </div>
      )}
    </div>
  );
}
