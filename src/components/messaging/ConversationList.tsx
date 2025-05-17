
import React from "react";
import { Conversation, MessagePlatform } from "@/types/messaging-types";
import { format } from "date-fns";
import { Mail, Globe, MessageSquare } from "lucide-react";
import { cn } from "@/lib/utils";

interface ConversationListProps {
  conversations: Conversation[];
  selectedConversationId?: string;
  onSelectConversation: (conversationId: string) => void;
  isLoading: boolean;
}

export function ConversationList({
  conversations,
  selectedConversationId,
  onSelectConversation,
  isLoading
}: ConversationListProps) {
  if (isLoading) {
    return (
      <div className="flex flex-col space-y-2 p-4">
        {Array.from({ length: 5 }).map((_, i) => (
          <div key={i} className="flex items-center space-x-3 p-3 rounded-md bg-muted animate-pulse">
            <div className="w-10 h-10 rounded-full bg-muted-foreground/20"></div>
            <div className="space-y-2 flex-1">
              <div className="h-4 bg-muted-foreground/20 rounded w-1/3"></div>
              <div className="h-3 bg-muted-foreground/20 rounded w-2/3"></div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (conversations.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-full p-6 text-center">
        <Mail className="h-12 w-12 text-muted-foreground mb-3" />
        <h3 className="font-medium text-lg mb-1">No conversations found</h3>
        <p className="text-muted-foreground text-sm">
          Try adjusting your filters or search criteria
        </p>
      </div>
    );
  }

  const getPlatformIcon = (platform: MessagePlatform) => {
    switch (platform) {
      case 'booking':
        return <div className="bg-blue-600 text-white rounded w-6 h-6 flex items-center justify-center text-xs font-bold">B</div>;
      case 'airbnb':
        return <div className="bg-rose-600 text-white rounded w-6 h-6 flex items-center justify-center text-xs font-bold">A</div>;
      case 'expedia':
        return <div className="bg-yellow-600 text-white rounded w-6 h-6 flex items-center justify-center text-xs font-bold">E</div>;
      case 'email':
        return <Mail className="h-5 w-5 text-muted-foreground" />;
      case 'direct':
        return <Globe className="h-5 w-5 text-muted-foreground" />;
      case 'review':
        return <MessageSquare className="h-5 w-5 text-muted-foreground" />;
      default:
        return <MessageSquare className="h-5 w-5 text-muted-foreground" />;
    }
  };

  return (
    <div className="flex flex-col divide-y divide-border overflow-y-auto">
      {conversations.map((conversation) => {
        const latestMessage = conversation.messages[conversation.messages.length - 1];
        const isSelected = selectedConversationId === conversation.id;

        return (
          <div
            key={conversation.id}
            className={cn(
              "flex p-3 hover:bg-muted/50 cursor-pointer transition-colors",
              isSelected && "bg-muted",
              conversation.unreadCount > 0 && "bg-blue-50 dark:bg-blue-950/10"
            )}
            onClick={() => onSelectConversation(conversation.id)}
          >
            <div className="flex-shrink-0 mr-3">
              {conversation.guest.avatar ? (
                <img
                  src={conversation.guest.avatar}
                  alt={conversation.guest.name}
                  className="w-10 h-10 rounded-full object-cover"
                />
              ) : (
                <div className="w-10 h-10 rounded-full bg-primary/10 text-primary flex items-center justify-center font-medium text-lg">
                  {conversation.guest.name.charAt(0)}
                </div>
              )}
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex justify-between items-center mb-1">
                <h4 className={cn(
                  "font-medium text-sm truncate",
                  conversation.unreadCount > 0 && "font-bold"
                )}>
                  {conversation.guest.name}
                </h4>
                <span className="text-xs text-muted-foreground whitespace-nowrap ml-2">
                  {format(new Date(conversation.lastMessageTimestamp), "MMM d, h:mm a")}
                </span>
              </div>
              
              <div className="flex items-center gap-1 mb-1">
                <span className="flex-shrink-0">
                  {getPlatformIcon(conversation.platform)}
                </span>
                <span className="text-xs text-muted-foreground truncate ml-1">
                  {conversation.bookingReference || "No booking"}
                </span>
                
                {conversation.status === "new" && (
                  <span className="flex-shrink-0 rounded-full bg-blue-500 px-2 py-0.5 text-xs text-white ml-1">New</span>
                )}
              </div>
              
              <p className="text-sm text-muted-foreground line-clamp-1">
                {latestMessage ? latestMessage.content : "No messages"}
              </p>
              
              {conversation.unreadCount > 0 && (
                <div className="mt-1 flex justify-end">
                  <span className="rounded-full bg-primary text-white text-xs px-2 py-0.5">
                    {conversation.unreadCount}
                  </span>
                </div>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}
