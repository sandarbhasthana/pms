
export interface AIMessage {
  id: string;
  content: string;
  role: 'user' | 'assistant';
  timestamp: Date;
}

export interface AIAssistantState {
  messages: AIMessage[];
  isProcessing: boolean;
  mode: 'suggestion' | 'autonomous';
  language: string;
}

export interface QuickPrompt {
  text: string;
  action: string;
}

// Dashboard specific types
export interface DashboardActivity {
  id: number;
  time: string;
  description: string;
  type: 'check-in' | 'check-out' | 'booking' | 'cancellation' | 'message' | 'system';
  actor?: string;
}

export interface GuestInfo {
  id: number;
  name: string;
  room: string;
  status?: string;
  note?: string | null;
  vip: boolean;
}

export interface RoomStatusData {
  clean: number;
  dirty: number;
  inProgress: number;
  outOfOrder: number;
  total: number;
}
