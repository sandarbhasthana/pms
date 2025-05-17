import { Conversation, MessagePlatform, Message, QuickReplyTemplate, MessageFilterOptions } from "@/types/messaging-types";

// Mock data for conversations
const mockConversations: Conversation[] = [
  {
    id: "conv-1",
    guest: {
      id: "guest-1",
      name: "John Smith",
      avatar: "https://placehold.co/32x32",
    },
    bookingReference: "BK-12345",
    platform: "booking",
    messages: [
      {
        id: "msg-1",
        conversationId: "conv-1",
        sender: {
          id: "guest-1",
          name: "John Smith",
          type: "guest",
        },
        content: "Hello, I was wondering if you offer airport shuttle service? We'll be arriving late at around 11 PM.",
        timestamp: new Date(Date.now() - 4 * 60 * 60 * 1000), // 4 hours ago
        isRead: true,
      },
      {
        id: "msg-2",
        conversationId: "conv-1",
        sender: {
          id: "staff-1",
          name: "Hotel Staff",
          type: "staff",
        },
        content: "Good day Mr. Smith! Yes, we do offer shuttle service. For late arrivals, please let us know your flight details so we can arrange pickup.",
        timestamp: new Date(Date.now() - 3 * 60 * 60 * 1000), // 3 hours ago
        isRead: true,
      },
      {
        id: "msg-3",
        conversationId: "conv-1",
        sender: {
          id: "guest-1",
          name: "John Smith",
          type: "guest",
        },
        content: "Great! My flight is BA-2490, landing at 10:30 PM. How much does the shuttle cost?",
        timestamp: new Date(Date.now() - 30 * 60 * 1000), // 30 minutes ago
        isRead: false,
      }
    ],
    lastMessageTimestamp: new Date(Date.now() - 30 * 60 * 1000),
    unreadCount: 1,
    status: "active",
  },
  {
    id: "conv-2",
    guest: {
      id: "guest-2",
      name: "Maria Garcia",
      avatar: "https://placehold.co/32x32",
    },
    bookingReference: "ABB-789",
    platform: "airbnb",
    messages: [
      {
        id: "msg-4",
        conversationId: "conv-2",
        sender: {
          id: "guest-2",
          name: "Maria Garcia",
          type: "guest",
        },
        content: "Hola, ¿es posible hacer el check-in temprano? Llegaremos a las 10 AM.",
        timestamp: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000), // 2 days ago
        isRead: true,
        translated: {
          originalLanguage: "es",
          translatedContent: "Hello, is it possible to check-in early? We will arrive at 10 AM."
        }
      },
      {
        id: "msg-5",
        conversationId: "conv-2",
        sender: {
          id: "staff-1",
          name: "Hotel Staff",
          type: "staff",
        },
        content: "Buenos días Maria! Haremos todo lo posible para tener su habitación lista para un check-in temprano. No podemos garantizarlo, pero si la habitación no está lista, puede dejar su equipaje con nosotros mientras explora los alrededores.",
        timestamp: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000), // 1 day ago
        isRead: true,
      }
    ],
    lastMessageTimestamp: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
    unreadCount: 0,
    status: "waiting",
  },
  {
    id: "conv-3",
    guest: {
      id: "guest-3",
      name: "David Wilson",
    },
    bookingReference: "EXP-567",
    platform: "expedia",
    messages: [
      {
        id: "msg-6",
        conversationId: "conv-3",
        sender: {
          id: "guest-3",
          name: "David Wilson",
          type: "guest",
        },
        content: "I've just booked room 301 for next weekend. Do the rooms have refrigerators?",
        timestamp: new Date(Date.now() - 5 * 60 * 1000), // 5 minutes ago
        isRead: false,
      }
    ],
    lastMessageTimestamp: new Date(Date.now() - 5 * 60 * 1000),
    unreadCount: 1,
    status: "new",
  },
  {
    id: "conv-4",
    guest: {
      id: "guest-4",
      name: "Akiko Tanaka",
    },
    bookingReference: "DIR-902",
    platform: "direct",
    messages: [
      {
        id: "msg-7",
        conversationId: "conv-4",
        sender: {
          id: "guest-4",
          name: "Akiko Tanaka",
          type: "guest",
        },
        content: "Thank you for the wonderful stay last week! The staff was exceptional.",
        timestamp: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000), // 7 days ago
        isRead: true,
      },
      {
        id: "msg-8",
        conversationId: "conv-4",
        sender: {
          id: "staff-2",
          name: "Hotel Manager",
          type: "staff",
        },
        content: "Thank you for your kind feedback, Ms. Tanaka! We're delighted that you enjoyed your stay with us. We look forward to welcoming you back soon!",
        timestamp: new Date(Date.now() - 6 * 24 * 60 * 60 * 1000), // 6 days ago
        isRead: true,
      }
    ],
    lastMessageTimestamp: new Date(Date.now() - 6 * 24 * 60 * 60 * 1000),
    unreadCount: 0,
    status: "resolved",
  },
  {
    id: "conv-5",
    guest: {
      id: "guest-5",
      name: "Thomas Brown",
    },
    bookingReference: "BK-78901",
    platform: "review",
    messages: [
      {
        id: "msg-9",
        conversationId: "conv-5",
        sender: {
          id: "guest-5",
          name: "Thomas Brown",
          type: "guest",
        },
        content: "The room was clean and comfortable, but the noise from the street was quite disturbing at night. The breakfast was excellent though! 4/5 stars.",
        timestamp: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000), // 2 days ago
        isRead: false,
      }
    ],
    lastMessageTimestamp: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
    unreadCount: 1,
    status: "new",
    tags: ["review", "noise complaint"]
  }
];

// Mock data for quick reply templates
const mockQuickReplyTemplates: QuickReplyTemplate[] = [
  {
    id: "template-1",
    name: "Welcome",
    content: "Thank you for choosing our hotel! We're looking forward to welcoming you. If you have any questions before your arrival, please don't hesitate to ask.",
    tags: ["greeting"]
  },
  {
    id: "template-2",
    name: "Check-in Information",
    content: "Our check-in time is from 3:00 PM, and check-out is until 11:00 AM. If you require early check-in or late check-out, please let us know in advance, and we'll do our best to accommodate your request.",
    tags: ["check-in", "information"]
  },
  {
    id: "template-3",
    name: "Review Response - Positive",
    content: "Thank you for your wonderful review! We're delighted that you enjoyed your stay with us. Your feedback means a lot to our team, and we look forward to welcoming you back in the future.",
    tags: ["review", "positive"]
  },
  {
    id: "template-4",
    name: "Review Response - Mixed",
    content: "Thank you for taking the time to share your feedback. We're glad you enjoyed certain aspects of your stay. We appreciate your comments on areas where we can improve, and we're addressing these concerns to enhance the experience for future guests.",
    tags: ["review", "mixed"]
  },
  {
    id: "template-5",
    name: "Airport Shuttle",
    content: "Yes, we offer an airport shuttle service. The cost is $25 per person each way. To arrange this, please provide your flight details (number, arrival time), and we'll ensure a driver is waiting for you.",
    tags: ["transportation", "services"]
  }
];

// Service functions
export const getConversations = async (filters?: MessageFilterOptions): Promise<Conversation[]> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 500));
  
  let filteredConversations = [...mockConversations];
  
  if (filters) {
    // Apply platform filter
    if (filters.platform && filters.platform.length > 0) {
      filteredConversations = filteredConversations.filter(conv => 
        filters.platform!.includes(conv.platform)
      );
    }
    
    // Apply status filter
    if (filters.status && filters.status.length > 0) {
      filteredConversations = filteredConversations.filter(conv => 
        filters.status!.includes(conv.status)
      );
    }
    
    // Apply unread filter
    if (filters.hasUnread !== undefined) {
      filteredConversations = filteredConversations.filter(conv => 
        filters.hasUnread ? conv.unreadCount > 0 : conv.unreadCount === 0
      );
    }
    
    // Apply date range filter
    if (filters.dateRange) {
      filteredConversations = filteredConversations.filter(conv => {
        const lastMessageTime = new Date(conv.lastMessageTimestamp).getTime();
        const fromTime = new Date(filters.dateRange!.from).getTime();
        const toTime = new Date(filters.dateRange!.to).getTime();
        return lastMessageTime >= fromTime && lastMessageTime <= toTime;
      });
    }
    
    // Apply search query
    if (filters.searchQuery) {
      const query = filters.searchQuery.toLowerCase();
      filteredConversations = filteredConversations.filter(conv => {
        // Search by guest name
        const nameMatch = conv.guest.name.toLowerCase().includes(query);
        // Search by booking reference
        const refMatch = conv.bookingReference?.toLowerCase().includes(query) || false;
        // Search in message contents
        const contentMatch = conv.messages.some(msg => 
          msg.content.toLowerCase().includes(query)
        );
        return nameMatch || refMatch || contentMatch;
      });
    }
  }
  
  // Sort by last message timestamp, newest first
  return filteredConversations.sort((a, b) => 
    new Date(b.lastMessageTimestamp).getTime() - new Date(a.lastMessageTimestamp).getTime()
  );
};

export const getConversation = async (conversationId: string): Promise<Conversation | undefined> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 300));
  
  return mockConversations.find(conv => conv.id === conversationId);
};

export const sendMessage = async (conversationId: string, content: string, attachments?: File[]): Promise<Message> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 700));
  
  const conversation = mockConversations.find(conv => conv.id === conversationId);
  
  if (!conversation) {
    throw new Error("Conversation not found");
  }
  
  // Create a new message
  const newMessage: Message = {
    id: `msg-${Math.random().toString(36).substr(2, 9)}`,
    conversationId: conversationId,
    sender: {
      id: "staff-1",
      name: "Hotel Staff",
      type: "staff",
    },
    content: content,
    timestamp: new Date(),
    isRead: true,
  };
  
  // Add attachments if provided
  if (attachments && attachments.length > 0) {
    newMessage.attachments = attachments.map(file => ({
      id: Math.random().toString(36).substr(2, 9),
      filename: file.name,
      url: URL.createObjectURL(file), // This would be a server URL in a real app
      type: file.type.startsWith('image/') ? 'image' : 
            file.type === 'application/pdf' ? 'pdf' : 'document',
      size: file.size,
    }));
  }
  
  // Update the conversation
  conversation.messages.push(newMessage);
  conversation.lastMessageTimestamp = newMessage.timestamp;
  conversation.status = "waiting";
  
  return newMessage;
};

export const markConversationAsRead = async (conversationId: string): Promise<void> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 200));
  
  const conversation = mockConversations.find(conv => conv.id === conversationId);
  
  if (conversation) {
    conversation.messages.forEach(msg => {
      msg.isRead = true;
    });
    conversation.unreadCount = 0;
  }
};

export const getQuickReplyTemplates = async (): Promise<QuickReplyTemplate[]> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 300));
  
  return mockQuickReplyTemplates;
};

export const generateAIReply = async (conversationId: string): Promise<string> => {
  // Simulate API delay for AI processing
  await new Promise(resolve => setTimeout(resolve, 1500));
  
  const conversation = mockConversations.find(conv => conv.id === conversationId);
  
  if (!conversation) {
    throw new Error("Conversation not found");
  }
  
  // Last message from the guest
  const lastGuestMessage = [...conversation.messages]
    .reverse()
    .find(msg => msg.sender.type === "guest");
  
  if (!lastGuestMessage) {
    return "Thank you for your message. How may I assist you further?";
  }
  
  // Generate contextual response based on last message content
  const content = lastGuestMessage.content.toLowerCase();
  
  if (content.includes("shuttle") || content.includes("airport")) {
    return "Yes, we offer an airport shuttle service for our guests. The cost is $25 per person each way. To arrange this, we'll need your flight details. When will you be arriving?";
  }
  
  if (content.includes("check-in") || content.includes("early") || content.includes("late")) {
    return "Our standard check-in time is 3:00 PM and check-out is 11:00 AM. We'll do our best to accommodate early check-in requests based on room availability. You're welcome to store your luggage with us if you arrive before your room is ready.";
  }
  
  if (content.includes("wifi") || content.includes("internet")) {
    return "Yes, we provide complimentary high-speed WiFi throughout the hotel. The access code will be provided at check-in.";
  }
  
  if (content.includes("breakfast") || content.includes("restaurant")) {
    return "Our breakfast buffet is served daily from 6:30 AM to 10:30 AM in the main restaurant. It includes a variety of hot and cold options, including made-to-order eggs, pastries, fresh fruit, and beverages.";
  }
  
  if (content.includes("thank")) {
    return "You're very welcome! We're glad to assist you. Please let us know if you have any other questions or if there's anything else we can help you with before or during your stay.";
  }
  
  if (lastGuestMessage.translated) {
    // For translated messages, respond in similar formal tone
    return "Thank you for your message. I'll check this information for you and get back to you as soon as possible. Please let me know if you have any other questions.";
  }
  
  // Default response
  if (conversation.platform === "review") {
    return "Thank you for taking the time to share your feedback about your recent stay with us. We appreciate your comments and are glad to hear you enjoyed certain aspects of your experience. Your feedback helps us improve our services. We hope to welcome you back in the future!";
  }
  
  return "Thank you for your message. I'll be happy to assist you with your inquiry. Is there anything specific about our hotel or services that you would like to know more about?";
};
