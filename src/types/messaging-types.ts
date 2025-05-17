
export type MessagePlatform = 'booking' | 'airbnb' | 'expedia' | 'email' | 'sms' | 'direct' | 'review';

export interface MessageAttachment {
  id: string;
  filename: string;
  url: string;
  type: 'image' | 'document' | 'pdf' | 'other';
  size: number; // in bytes
}

export interface Message {
  id: string;
  conversationId: string;
  sender: {
    id: string;
    name: string;
    type: 'guest' | 'staff' | 'system' | 'ai';
    avatar?: string;
  };
  content: string;
  timestamp: Date;
  isRead: boolean;
  attachments?: MessageAttachment[];
  translated?: {
    originalLanguage: string;
    translatedContent: string;
  };
}

export interface Conversation {
  id: string;
  guest: {
    id: string;
    name: string;
    avatar?: string;
  };
  bookingReference?: string;
  platform: MessagePlatform;
  messages: Message[];
  lastMessageTimestamp: Date;
  unreadCount: number;
  status: 'new' | 'active' | 'waiting' | 'resolved' | 'archived';
  tags?: string[];
}

export interface QuickReplyTemplate {
  id: string;
  name: string;
  content: string;
  tags: string[];
}

export interface MessageFilterOptions {
  platform?: MessagePlatform[];
  status?: Conversation['status'][];
  hasUnread?: boolean;
  dateRange?: {
    from: Date;
    to: Date;
  };
  searchQuery?: string;
}
