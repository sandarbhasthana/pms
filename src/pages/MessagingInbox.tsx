
import React, { useState, useEffect, useRef } from "react";
import { Layout } from "@/components/layout/Layout";
import { ConversationList } from "@/components/messaging/ConversationList";
import { ConversationView } from "@/components/messaging/ConversationView";
import { MessageFilters } from "@/components/messaging/MessageFilters";
import { MessagingHeader } from "@/components/messaging/MessagingHeader";
import { EmptyStateView } from "@/components/messaging/EmptyStateView";
import { Conversation, MessageFilterOptions, Message } from "@/types/messaging-types";
import { Separator } from "@/components/ui/separator";
import { Toaster } from "sonner";
import { toast } from "sonner";
import {
  getConversations,
  getConversation,
  sendMessage,
  markConversationAsRead,
  getQuickReplyTemplates,
  generateAIReply
} from "@/services/messaging-service";
import { Loader2 } from "lucide-react";

const MessagingInbox = () => {
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [selectedConversationId, setSelectedConversationId] = useState<string | undefined>();
  const [selectedConversation, setSelectedConversation] = useState<Conversation | undefined>();
  const [filters, setFilters] = useState<MessageFilterOptions>({});
  const [isLoadingConversations, setIsLoadingConversations] = useState(true);
  const [isLoadingConversation, setIsLoadingConversation] = useState(false);
  const [isReplying, setIsReplying] = useState(false);
  const [isGeneratingReply, setIsGeneratingReply] = useState(false);
  const [quickReplyTemplates, setQuickReplyTemplates] = useState([]);
  const [replyContent, setReplyContent] = useState("");

  // For future use with websocket or push notifications
  const notificationTimer = useRef<NodeJS.Timeout | null>(null);
  
  // Load initial conversations
  useEffect(() => {
    loadConversations();
    loadQuickReplyTemplates();
    
    // Simulated incoming message for demo purposes
    notificationTimer.current = setTimeout(() => {
      toast("New message from Daniel Lee", {
        description: "Hello, I need to extend my stay by one more night. Is that possible?",
        action: {
          label: "View",
          onClick: () => console.log("View message")
        }
      });
    }, 45000);
    
    return () => {
      if (notificationTimer.current) {
        clearTimeout(notificationTimer.current);
      }
    };
  }, []);
  
  // Load conversations with filters
  const loadConversations = async () => {
    setIsLoadingConversations(true);
    try {
      const data = await getConversations(filters);
      setConversations(data);
      
      // If there was a selected conversation, refresh it
      if (selectedConversationId) {
        const updated = data.find(c => c.id === selectedConversationId);
        if (updated) {
          setSelectedConversation(updated);
        }
      }
    } catch (error) {
      console.error("Failed to load conversations:", error);
      toast.error("Failed to load conversations");
    } finally {
      setIsLoadingConversations(false);
    }
  };
  
  // Load quick reply templates
  const loadQuickReplyTemplates = async () => {
    try {
      const templates = await getQuickReplyTemplates();
      setQuickReplyTemplates(templates);
    } catch (error) {
      console.error("Failed to load quick reply templates:", error);
    }
  };
  
  // Apply filters when they change
  useEffect(() => {
    loadConversations();
  }, [filters]);
  
  // Handle conversation selection
  const handleSelectConversation = async (conversationId: string) => {
    if (conversationId === selectedConversationId) return;
    
    setSelectedConversationId(conversationId);
    setIsLoadingConversation(true);
    
    try {
      const conversation = await getConversation(conversationId);
      setSelectedConversation(conversation);
      
      // Mark as read
      if (conversation && conversation.unreadCount > 0) {
        await markConversationAsRead(conversationId);
        
        // Update conversations list to reflect read status
        setConversations(prevConversations => 
          prevConversations.map(conv => 
            conv.id === conversationId ? { ...conv, unreadCount: 0 } : conv
          )
        );
      }
    } catch (error) {
      console.error("Failed to load conversation:", error);
      toast.error("Failed to load conversation");
    } finally {
      setIsLoadingConversation(false);
    }
  };
  
  // Handle sending messages
  const handleSendMessage = async (content: string, attachments?: File[]) => {
    if (!selectedConversation) return;
    
    setIsReplying(true);
    
    try {
      const message = await sendMessage(selectedConversation.id, content, attachments);
      
      // Update the selected conversation with the new message
      setSelectedConversation(prev => {
        if (!prev) return undefined;
        
        return {
          ...prev,
          messages: [...prev.messages, message],
          lastMessageTimestamp: message.timestamp,
          status: "waiting"
        };
      });
      
      // Update the conversations list
      setConversations(prevConversations =>
        prevConversations.map(conv =>
          conv.id === selectedConversation.id
            ? {
                ...conv,
                lastMessageTimestamp: message.timestamp,
                status: "waiting"
              }
            : conv
        )
      );
      
      // Show success toast
      toast.success("Message sent successfully");
    } catch (error) {
      console.error("Failed to send message:", error);
      toast.error("Failed to send message");
    } finally {
      setIsReplying(false);
    }
  };
  
  // Handle AI suggestion generation
  const handleGenerateAIReply = async () => {
    if (!selectedConversation) return "";
    
    setIsGeneratingReply(true);
    
    try {
      const suggestion = await generateAIReply(selectedConversation.id);
      setReplyContent(suggestion);
      return suggestion;
    } catch (error) {
      console.error("Failed to generate AI reply:", error);
      throw error;
    } finally {
      setIsGeneratingReply(false);
    }
  };
  
  // Handle inserting a reply
  const handleInsertReply = (text: string) => {
    setReplyContent(text);
  };
  
  // Handle marking as resolved
  const handleMarkAsResolved = (conversationId: string) => {
    // Update the selected conversation
    setSelectedConversation(prev => {
      if (!prev || prev.id !== conversationId) return prev;
      return { ...prev, status: "resolved" };
    });
    
    // Update the conversations list
    setConversations(prevConversations =>
      prevConversations.map(conv =>
        conv.id === conversationId ? { ...conv, status: "resolved" } : conv
      )
    );
    
    toast.success("Conversation marked as resolved");
  };
  
  // Handle archiving
  const handleArchiveConversation = (conversationId: string) => {
    // Update the selected conversation
    setSelectedConversation(prev => {
      if (!prev || prev.id !== conversationId) return prev;
      return { ...prev, status: "archived" };
    });
    
    // Update the conversations list
    setConversations(prevConversations =>
      prevConversations.map(conv =>
        conv.id === conversationId ? { ...conv, status: "archived" } : conv
      )
    );
    
    toast.success("Conversation archived");
  };
  
  return (
    <Layout>
      <div className="flex h-[calc(100vh-56px)]">
        <div className="w-96 border-r flex flex-col h-full">
          <MessageFilters onFilterChange={setFilters} />
          <ConversationList
            conversations={conversations}
            selectedConversationId={selectedConversationId}
            onSelectConversation={handleSelectConversation}
            isLoading={isLoadingConversations}
          />
        </div>
        
        <div className="flex-1 flex flex-col h-full">
          <MessagingHeader
            selectedConversation={selectedConversation}
            quickReplyTemplates={quickReplyTemplates}
            onGenerateAIReply={handleGenerateAIReply}
            onInsertReply={handleInsertReply}
            onMarkAsResolved={handleMarkAsResolved}
            onArchiveConversation={handleArchiveConversation}
            isGeneratingReply={isGeneratingReply}
          />
          
          {isLoadingConversation ? (
            <div className="flex-1 flex items-center justify-center">
              <div className="flex flex-col items-center">
                <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
                <p className="mt-2 text-muted-foreground">Loading conversation...</p>
              </div>
            </div>
          ) : selectedConversation ? (
            <ConversationView
              conversation={selectedConversation}
              onSendMessage={handleSendMessage}
              isReplying={isReplying}
            />
          ) : (
            <EmptyStateView />
          )}
        </div>
      </div>
      <Toaster position="top-right" />
    </Layout>
  );
};

export default MessagingInbox;
