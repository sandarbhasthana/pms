
import React from 'react';
import { Button } from '@/components/ui/button';
import { ChatbotConfig as OriginalChatbotConfig } from './ChatbotConfig';
import { ChatbotConfig as ChatbotConfigType } from '@/types/website-builder-types';

interface ChatbotConfigWrapperProps {
  config: ChatbotConfigType;
  onChange: (config: ChatbotConfigType) => void;
  onSkip?: () => void;
}

export function ChatbotConfigWrapper({ config, onChange, onSkip }: ChatbotConfigWrapperProps) {
  return (
    <div>
      {onSkip && (
        <div className="p-4 border-b flex justify-end">
          <Button 
            variant="ghost" 
            size="sm" 
            className="h-6 text-xs text-pms-purple"
            onClick={onSkip}
          >
            Skip Step
          </Button>
        </div>
      )}
      <OriginalChatbotConfig config={config} onChange={onChange} />
    </div>
  );
}
