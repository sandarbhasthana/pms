
import React from "react";
import { Conversation } from "@/types/messaging-types";
import { Button } from "@/components/ui/button";
import { Archive, CheckSquare, MessageSquare } from "lucide-react";
import { AIActions } from "./AIActions";
import { QuickReplySelector } from "./QuickReplySelector";
import { QuickReplyTemplate } from "@/types/messaging-types";

interface MessagingHeaderProps {
  selectedConversation?: Conversation;
  quickReplyTemplates: QuickReplyTemplate[];
  onGenerateAIReply: () => Promise<string>;
  onInsertReply: (text: string) => void;
  onMarkAsResolved: (conversationId: string) => void;
  onArchiveConversation: (conversationId: string) => void;
  isGeneratingReply: boolean;
}

export function MessagingHeader({
  selectedConversation,
  quickReplyTemplates,
  onGenerateAIReply,
  onInsertReply,
  onMarkAsResolved,
  onArchiveConversation,
  isGeneratingReply
}: MessagingHeaderProps) {
  if (!selectedConversation) {
    return (
      <div className="h-16 border-b p-4 flex items-center">
        <h2 className="font-semibold">Messaging Inbox</h2>
      </div>
    );
  }
  
  return (
    <div className="h-16 border-b p-2 px-4 flex items-center justify-between">
      <h2 className="font-semibold flex items-center gap-2">
        <MessageSquare className="h-5 w-5" />
        Conversation with {selectedConversation.guest.name}
      </h2>
      
      <div className="flex items-center gap-2">
        <AIActions 
          onGenerateReply={onGenerateAIReply}
          onInsertReply={onInsertReply}
          isGenerating={isGeneratingReply}
        />
        
        <QuickReplySelector 
          templates={quickReplyTemplates}
          onSelectTemplate={onInsertReply}
        />
        
        <Button
          variant="outline"
          size="sm"
          onClick={() => onMarkAsResolved(selectedConversation.id)}
          disabled={selectedConversation.status === "resolved"}
        >
          <CheckSquare className="h-4 w-4 mr-1" />
          Mark Resolved
        </Button>
        
        <Button
          variant="outline"
          size="sm"
          onClick={() => onArchiveConversation(selectedConversation.id)}
          disabled={selectedConversation.status === "archived"}
        >
          <Archive className="h-4 w-4 mr-1" />
          Archive
        </Button>
      </div>
    </div>
  );
}
