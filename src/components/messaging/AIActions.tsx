
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Zap } from "lucide-react";
import { toast } from "sonner";

interface AIActionsProps {
  onGenerateReply: () => Promise<string>;
  onInsertReply: (text: string) => void;
  isGenerating: boolean;
}

export function AIActions({ onGenerateReply, onInsertReply, isGenerating }: AIActionsProps) {
  const handleGenerateReply = async () => {
    try {
      const generatedText = await onGenerateReply();
      onInsertReply(generatedText);
      toast.success("AI suggestion generated");
    } catch (error) {
      toast.error("Failed to generate AI response");
      console.error(error);
    }
  };
  
  return (
    <Button 
      variant="outline"
      size="sm"
      onClick={handleGenerateReply}
      disabled={isGenerating}
      className="flex items-center gap-1"
    >
      <Zap className="h-4 w-4" />
      <span>{isGenerating ? "Generating..." : "AI Suggest"}</span>
    </Button>
  );
}
