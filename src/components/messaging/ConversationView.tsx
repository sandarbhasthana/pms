
import React, { useRef, useEffect, useState } from "react";
import { Conversation, Message, MessageAttachment } from "@/types/messaging-types";
import { Button } from "@/components/ui/button";
import { Paperclip, Send, XCircle, Download } from "lucide-react";
import { format } from "date-fns";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";

interface ConversationViewProps {
  conversation: Conversation;
  onSendMessage: (content: string, attachments?: File[]) => Promise<void>;
  isReplying: boolean;
}

export function ConversationView({
  conversation,
  onSendMessage,
  isReplying
}: ConversationViewProps) {
  const [message, setMessage] = useState("");
  const [attachments, setAttachments] = useState<File[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };
  
  useEffect(() => {
    scrollToBottom();
  }, [conversation.messages]);
  
  const handleSendMessage = async () => {
    if (!message.trim() && attachments.length === 0) return;
    
    await onSendMessage(message.trim(), attachments.length > 0 ? attachments : undefined);
    
    setMessage("");
    setAttachments([]);
  };
  
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };
  
  const handleAttachmentClick = () => {
    fileInputRef.current?.click();
  };
  
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setAttachments(prev => [...prev, ...Array.from(e.target.files as FileList)]);
    }
  };
  
  const removeAttachment = (index: number) => {
    setAttachments(attachments.filter((_, i) => i !== index));
  };
  
  const getPlatformLabel = (conversation: Conversation) => {
    switch (conversation.platform) {
      case 'booking':
        return 'Booking.com Message';
      case 'airbnb':
        return 'Airbnb Message';
      case 'expedia':
        return 'Expedia Message';
      case 'email':
        return 'Email Message';
      case 'direct':
        return 'Direct Message';
      case 'review':
        return 'Guest Review';
      case 'sms':
        return 'SMS Message';
      default:
        return 'Message';
    }
  };
  
  const renderMessage = (message: Message) => {
    const isGuest = message.sender.type === 'guest';
    
    return (
      <div key={message.id} className={cn(
        "mb-4",
        isGuest ? "" : "flex justify-end"
      )}>
        <div className={cn(
          "max-w-[70%] rounded-lg p-3",
          isGuest 
            ? "bg-muted text-foreground rounded-tl-none" 
            : "bg-primary text-primary-foreground rounded-tr-none"
        )}>
          {message.translated && (
            <div className="mb-2 italic text-sm text-muted-foreground">
              <p className="mb-1">{message.content}</p>
              <p className="text-xs">Translated from {message.translated.originalLanguage}</p>
            </div>
          )}
          
          {!message.translated && <p>{message.content}</p>}
          
          {message.attachments && message.attachments.length > 0 && (
            <div className="mt-2 space-y-2">
              {message.attachments.map(attachment => (
                <AttachmentPreview key={attachment.id} attachment={attachment} />
              ))}
            </div>
          )}
          
          <div className="mt-1 text-xs opacity-70 flex justify-end">
            {format(new Date(message.timestamp), "MMM d, h:mm a")}
          </div>
        </div>
      </div>
    );
  };
  
  return (
    <div className="flex flex-col h-full">
      <div className="border-b p-4">
        <div className="flex justify-between items-center">
          <div>
            <h2 className="font-semibold text-lg">{conversation.guest.name}</h2>
            <div className="flex items-center text-sm text-muted-foreground gap-2">
              <span className="font-medium">{getPlatformLabel(conversation)}</span>
              {conversation.bookingReference && (
                <>
                  <span>•</span>
                  <span>{conversation.bookingReference}</span>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
      
      <div className="flex-1 overflow-y-auto p-4">
        {conversation.messages.map(renderMessage)}
        <div ref={messagesEndRef} />
      </div>
      
      <div className="border-t p-4 pb-20 md:pb-4">
        {attachments.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-3">
            {attachments.map((file, index) => (
              <div 
                key={index} 
                className="bg-muted px-2 py-1 rounded-md flex items-center gap-1 text-sm"
              >
                <span className="truncate max-w-[120px]">{file.name}</span>
                <button 
                  onClick={() => removeAttachment(index)} 
                  className="text-muted-foreground hover:text-destructive"
                >
                  <XCircle className="h-4 w-4" />
                </button>
              </div>
            ))}
          </div>
        )}
        
        <div className="flex items-end gap-2">
          <div className="flex-1">
            <Textarea 
              placeholder="Type your message..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyDown={handleKeyDown}
              className="min-h-[80px] resize-none"
            />
          </div>
          
          <div className="flex flex-col gap-2">
            <Button
              size="icon"
              variant="outline"
              type="button"
              onClick={handleAttachmentClick}
              title="Attach file"
            >
              <Paperclip className="h-4 w-4" />
            </Button>
            
            <Button
              size="icon"
              type="button"
              onClick={handleSendMessage}
              disabled={(!message.trim() && attachments.length === 0) || isReplying}
            >
              <Send className="h-4 w-4" />
            </Button>
          </div>
          
          <input 
            type="file" 
            ref={fileInputRef} 
            className="hidden" 
            onChange={handleFileChange}
            multiple
          />
        </div>
      </div>
    </div>
  );
}

interface AttachmentPreviewProps {
  attachment: MessageAttachment;
}

function AttachmentPreview({ attachment }: AttachmentPreviewProps) {
  if (attachment.type === 'image') {
    return (
      <div className="relative group">
        <img 
          src={attachment.url} 
          alt={attachment.filename} 
          className="max-h-48 rounded border border-border"
        />
        <a 
          href={attachment.url} 
          download={attachment.filename}
          className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 flex items-center justify-center rounded transition-opacity"
        >
          <Download className="h-5 w-5 text-white" />
        </a>
      </div>
    );
  }
  
  return (
    <a 
      href={attachment.url}
      download={attachment.filename}
      className="flex items-center gap-2 p-2 bg-muted/50 rounded border border-border hover:bg-muted transition-colors"
    >
      <Paperclip className="h-4 w-4 text-muted-foreground" />
      <span className="text-sm flex-1 truncate">{attachment.filename}</span>
      <span className="text-xs text-muted-foreground">
        {(attachment.size / 1024).toFixed(1)} KB
      </span>
    </a>
  );
}
