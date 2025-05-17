
import React from "react";
import { MessageSquare } from "lucide-react";

export function EmptyStateView() {
  return (
    <div className="flex flex-col items-center justify-center h-full p-8 text-center">
      <MessageSquare className="h-16 w-16 text-muted-foreground mb-4" />
      <h2 className="text-2xl font-bold mb-2">Welcome to Messaging Inbox</h2>
      <p className="text-muted-foreground max-w-md mb-6">
        Select a conversation from the list to view messages from guests across all platforms.
      </p>
      <div className="grid grid-cols-2 gap-6 max-w-md text-left">
        <div>
          <h3 className="font-medium mb-1">Unified Messaging</h3>
          <p className="text-sm text-muted-foreground">
            All guest messages in one place, regardless of source
          </p>
        </div>
        <div>
          <h3 className="font-medium mb-1">AI Assistance</h3>
          <p className="text-sm text-muted-foreground">
            Get AI-powered reply suggestions with one click
          </p>
        </div>
        <div>
          <h3 className="font-medium mb-1">Quick Replies</h3>
          <p className="text-sm text-muted-foreground">
            Use templates to respond faster to common questions
          </p>
        </div>
        <div>
          <h3 className="font-medium mb-1">Multi-channel</h3>
          <p className="text-sm text-muted-foreground">
            Reply to messages from all platforms in one interface
          </p>
        </div>
      </div>
    </div>
  );
}
