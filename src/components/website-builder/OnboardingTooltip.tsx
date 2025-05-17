
import React, { useState } from 'react';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from '@/components/ui/button';
import { ChevronRight, Lightbulb } from 'lucide-react';

interface OnboardingTooltipProps {
  isOpen: boolean;
  title: string;
  content: string;
  onNext: () => void;
}

export function OnboardingTooltip({ isOpen, title, content, onNext }: OnboardingTooltipProps) {
  if (!isOpen) return null;
  
  return (
    <div className="absolute z-50 bottom-5 right-5 max-w-md animate-in fade-in slide-in-from-right-2 duration-300">
      <Card className="border-2 border-pms-purple bg-white">
        <CardHeader className="pb-2">
          <CardTitle className="text-base flex items-center">
            <Lightbulb className="h-4 w-4 mr-2 text-pms-purple" />
            {title}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">{content}</p>
        </CardContent>
        <CardFooter>
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={onNext} 
            className="ml-auto text-pms-purple hover:text-pms-purple hover:bg-pms-purple/10"
          >
            <span>Continue</span>
            <ChevronRight className="h-4 w-4 ml-1" />
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
