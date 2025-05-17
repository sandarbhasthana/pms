
import React, { useState, useRef, useEffect } from "react";
import { MessageSquareText, Send, X, Globe, Zap, Loader2 } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";
import { AIMessage, AIAssistantState, QuickPrompt } from "@/types/assistant-types";
import { v4 as uuidv4 } from "uuid";

// Sample quick prompts
const QUICK_PROMPTS: QuickPrompt[] = [
  { text: "What's the occupancy today?", action: "checkOccupancy" },
  { text: "Suggest room allocation", action: "suggestRooms" },
  { text: "Send check-in link to guest", action: "sendCheckInLink" },
  { text: "Respond to latest Booking.com message", action: "respondToBooking" }
];

// Sample languages
const LANGUAGES = [
  { code: "en", name: "English" },
  { code: "es", name: "Spanish" },
  { code: "fr", name: "French" },
  { code: "de", name: "German" },
];

export function AIAssistant() {
  const [open, setOpen] = useState(false);
  const [state, setState] = useState<AIAssistantState>({
    messages: [],
    isProcessing: false,
    mode: 'suggestion',
    language: 'en',
  });
  const [input, setInput] = useState("");
  const [showLanguageOptions, setShowLanguageOptions] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [state.messages]);

  // Sample responses based on query content
  const generateResponse = (query: string): string => {
    const lowerQuery = query.toLowerCase();
    
    if (lowerQuery.includes("occupancy")) {
      return "Today's occupancy is 78% with 12 rooms still available. Would you like to see the breakdown by room type?";
    } else if (lowerQuery.includes("room allocation") || lowerQuery.includes("suggest room")) {
      return "Based on today's arrivals, I recommend:\n- Assign Room 201 to Johnson family (2 adults, 1 child)\n- Assign Room 304 to Mr. Smith (accessibility needs)\n- Assign Room 115 to the Torres group (late check-in expected)";
    } else if (lowerQuery.includes("check-in link") || lowerQuery.includes("send link")) {
      return "To which guest would you like to send a check-in link? Please provide the guest name or booking reference.";
    } else if (lowerQuery.includes("booking.com") || lowerQuery.includes("message")) {
      return "The latest message from Booking.com is regarding the Wilson reservation (Ref: BK4392). They're asking about early check-in options. Would you like me to draft a response?";
    } else {
      return "I'm your AI assistant. How can I help you with hotel operations today? You can ask about occupancy, room allocations, guest services, or other hotel management tasks.";
    }
  };

  const handleSendMessage = () => {
    if (!input.trim()) return;
    
    // Add user message
    const userMessage: AIMessage = {
      id: uuidv4(),
      content: input,
      role: 'user',
      timestamp: new Date(),
    };
    
    setState(prev => ({
      ...prev,
      messages: [...prev.messages, userMessage],
      isProcessing: true,
    }));
    
    setInput("");
    
    // Simulate AI response after a short delay
    setTimeout(() => {
      const responseMessage: AIMessage = {
        id: uuidv4(),
        content: generateResponse(userMessage.content),
        role: 'assistant',
        timestamp: new Date(),
      };
      
      setState(prev => ({
        ...prev,
        messages: [...prev.messages, responseMessage],
        isProcessing: false,
      }));
      
      // If in autonomous mode and certain actions are detected, show a toast notification
      if (state.mode === 'autonomous' && userMessage.content.toLowerCase().includes('send check-in')) {
        toast({
          title: "Automated Action Taken",
          description: "Check-in link has been automatically sent to the specified guest.",
        });
      }
    }, 1500);
  };

  const handleQuickPrompt = (prompt: QuickPrompt) => {
    setInput(prompt.text);
    handleSendMessage();
  };

  const toggleMode = () => {
    const newMode = state.mode === 'suggestion' ? 'autonomous' : 'suggestion';
    setState(prev => ({
      ...prev,
      mode: newMode,
    }));
    
    toast({
      title: `Mode Changed: ${newMode === 'autonomous' ? 'Autonomous' : 'Suggestion'}`,
      description: newMode === 'autonomous' 
        ? "AI will now execute certain tasks automatically." 
        : "AI will suggest actions for your approval.",
    });
  };

  const setLanguage = (langCode: string) => {
    setState(prev => ({
      ...prev,
      language: langCode,
    }));
    setShowLanguageOptions(false);
    
    toast({
      title: "Language Changed",
      description: `Assistant language set to ${LANGUAGES.find(l => l.code === langCode)?.name}`,
    });
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetTrigger asChild>
          <Button 
            size="icon" 
            className="h-14 w-14 rounded-full shadow-lg bg-pms-purple hover:bg-pms-dark-purple"
            aria-label="Open AI Assistant"
          >
            <MessageSquareText className="h-6 w-6" />
          </Button>
        </SheetTrigger>
        <SheetContent className="w-[400px] sm:max-w-[540px] h-screen overflow-hidden flex flex-col">
          <SheetHeader className="border-b pb-4">
            <div className="flex justify-between items-center">
              <SheetTitle>AI Assistant</SheetTitle>
              <div className="flex items-center gap-3">
                <div className="relative">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setShowLanguageOptions(!showLanguageOptions)}
                  >
                    <Globe className="h-4 w-4" />
                  </Button>
                  {showLanguageOptions && (
                    <div className="absolute right-0 top-full mt-1 bg-card border rounded-md shadow-lg z-50 w-40">
                      {LANGUAGES.map((lang) => (
                        <button
                          key={lang.code}
                          className={cn(
                            "w-full text-left px-3 py-2 hover:bg-accent",
                            state.language === lang.code && "bg-accent"
                          )}
                          onClick={() => setLanguage(lang.code)}
                        >
                          {lang.name}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
                <div className="flex items-center space-x-2">
                  <Switch 
                    id="mode-toggle" 
                    checked={state.mode === 'autonomous'}
                    onCheckedChange={toggleMode}
                  />
                  <Label htmlFor="mode-toggle" className="flex items-center gap-1">
                    <Zap className="h-3 w-3" />
                    {state.mode === 'autonomous' ? 'Auto' : 'Suggest'}
                  </Label>
                </div>
              </div>
            </div>
            <SheetDescription>
              How can I help you manage the hotel today?
            </SheetDescription>
          </SheetHeader>
          
          <div className="flex-1 overflow-y-auto py-4 px-1">
            {state.messages.length === 0 ? (
              <div className="h-full flex flex-col justify-center items-center text-center p-4">
                <MessageSquareText className="h-12 w-12 mb-4 text-muted-foreground opacity-50" />
                <p className="text-lg font-medium mb-2">Welcome to the AI Assistant</p>
                <p className="text-sm text-muted-foreground mb-6">
                  Ask me anything about hotel operations, guest management, or use the quick prompts below.
                </p>
                <div className="grid grid-cols-2 gap-2 w-full">
                  {QUICK_PROMPTS.map((prompt) => (
                    <Button
                      key={prompt.action}
                      variant="outline"
                      className="text-left h-auto py-3 px-4"
                      onClick={() => handleQuickPrompt(prompt)}
                    >
                      {prompt.text}
                    </Button>
                  ))}
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                {state.messages.map((message) => (
                  <div
                    key={message.id}
                    className={cn(
                      "flex",
                      message.role === "user" ? "justify-end" : "justify-start"
                    )}
                  >
                    <div
                      className={cn(
                        "max-w-[80%] rounded-lg px-4 py-2",
                        message.role === "user"
                          ? "bg-pms-purple text-white rounded-br-none"
                          : "bg-muted rounded-bl-none"
                      )}
                    >
                      <p className="text-sm whitespace-pre-wrap">{message.content}</p>
                      <p className="text-xs opacity-70 mt-1">
                        {new Intl.DateTimeFormat('en-US', {
                          hour: '2-digit',
                          minute: '2-digit'
                        }).format(message.timestamp)}
                      </p>
                    </div>
                  </div>
                ))}
                {state.isProcessing && (
                  <div className="flex justify-start">
                    <div className="max-w-[80%] rounded-lg px-4 py-3 bg-muted rounded-bl-none">
                      <div className="flex items-center gap-2">
                        <Loader2 className="h-4 w-4 animate-spin" />
                        <p className="text-sm">Thinking...</p>
                      </div>
                    </div>
                  </div>
                )}
                <div ref={messagesEndRef} />
              </div>
            )}
          </div>
          
          <div className="border-t pt-4">
            {state.messages.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-3">
                {QUICK_PROMPTS.map((prompt) => (
                  <button
                    key={prompt.action}
                    className="text-xs bg-muted hover:bg-accent px-2 py-1 rounded-full"
                    onClick={() => handleQuickPrompt(prompt)}
                  >
                    {prompt.text}
                  </button>
                ))}
              </div>
            )}
            
            <div className="relative">
              <input
                type="text"
                placeholder="Type your message..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
                className="w-full p-3 pr-10 rounded-md border focus:outline-none focus:ring-2 focus:ring-pms-purple"
                disabled={state.isProcessing}
              />
              <Button 
                size="sm" 
                className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-pms-purple hover:bg-pms-dark-purple"
                onClick={handleSendMessage}
                disabled={!input.trim() || state.isProcessing}
              >
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
}
