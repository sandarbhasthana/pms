
import React, { useState } from "react";
import { ChatbotConfig } from "@/types/website-builder-types";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Bot, X, SendHorizontal, Hotel, MapPin, BedDouble } from "lucide-react";
import { Avatar } from "@/components/ui/avatar";
import { ScrollArea } from "@/components/ui/scroll-area";

interface ChatbotPreviewProps {
  config: ChatbotConfig;
}

export function ChatbotPreview({ config }: ChatbotPreviewProps) {
  const [isOpen, setIsOpen] = useState(true);
  const [messages, setMessages] = useState<{
    type: "user" | "bot";
    text: string;
    isTyping?: boolean;
  }[]>([
    { type: "bot", text: config.greetingMessage },
    {
      type: "bot",
      text: "I can help you with room bookings, answer questions about our amenities, or provide information about local attractions.",
    },
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);

  const handleSendMessage = () => {
    if (!input.trim()) return;

    // Add user message
    setMessages([...messages, { type: "user", text: input }]);
    
    // Clear input
    setInput("");
    
    // Simulate bot thinking
    setIsTyping(true);
    
    // Find a matching question or generate a response
    const matchingQuestion = config.commonQuestions.find(
      (qa) => qa.question.toLowerCase().includes(input.toLowerCase())
    );
    
    // Simulate bot response after a delay
    setTimeout(() => {
      if (matchingQuestion) {
        setMessages((prev) => [
          ...prev,
          { type: "bot", text: matchingQuestion.answer },
        ]);
      } else if (input.toLowerCase().includes("room") || input.toLowerCase().includes("book")) {
        setMessages((prev) => [
          ...prev,
          { 
            type: "bot", 
            text: "We have several room types available. Would you like me to help you find the perfect room for your stay?" 
          },
        ]);
      } else if (input.toLowerCase().includes("restaurant") || input.toLowerCase().includes("food") || input.toLowerCase().includes("eat")) {
        setMessages((prev) => [
          ...prev,
          { 
            type: "bot", 
            text: "Our hotel has an award-winning restaurant on the ground floor, serving breakfast from 7-10am and dinner from 6-10pm. Would you like to see the menu?" 
          },
        ]);
      } else if (input.toLowerCase().includes("location") || input.toLowerCase().includes("address") || input.toLowerCase().includes("where")) {
        setMessages((prev) => [
          ...prev,
          { 
            type: "bot", 
            text: "We're located at 123 Hotel Street in the heart of the city, just 15 minutes from the airport and 5 minutes walk from Central Station." 
          },
        ]);
      } else {
        setMessages((prev) => [
          ...prev,
          { 
            type: "bot", 
            text: "Thank you for your question. I'll find the answer for you. Is there anything specific about our hotel that you'd like to know?" 
          },
        ]);
      }
      setIsTyping(false);
    }, 1500);
  };

  const toggleChat = () => {
    setIsOpen(!isOpen);
  };

  if (!isOpen) {
    return (
      <div className="fixed bottom-4 right-4">
        <Button
          onClick={toggleChat}
          className="h-14 w-14 rounded-full shadow-lg"
          style={{ backgroundColor: config.primaryColor }}
        >
          <Bot className="h-6 w-6 text-white" />
        </Button>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full border rounded-md overflow-hidden bg-white shadow-lg">
      {/* Chat header */}
      <div
        className="flex items-center justify-between p-4 border-b"
        style={{ backgroundColor: config.primaryColor }}
      >
        <div className="flex items-center">
          <Avatar className="h-8 w-8 mr-3 bg-white">
            <Bot className="h-5 w-5" style={{ color: config.primaryColor }} />
          </Avatar>
          <div>
            <h3 className="font-medium text-white">Hotel Assistant</h3>
            <p className="text-xs text-white/80">Online | Replies in seconds</p>
          </div>
        </div>
        <Button variant="ghost" size="sm" onClick={toggleChat} className="text-white">
          <X className="h-5 w-5" />
        </Button>
      </div>

      {/* Chat messages */}
      <ScrollArea className="flex-1 p-4">
        <div className="space-y-4">
          {messages.map((message, index) => (
            <div
              key={index}
              className={`flex ${
                message.type === "user" ? "justify-end" : "justify-start"
              }`}
            >
              <div
                className={`max-w-[80%] rounded-lg px-4 py-2 ${
                  message.type === "user"
                    ? "bg-muted text-foreground"
                    : `text-white`
                }`}
                style={{
                  backgroundColor:
                    message.type === "bot" ? config.primaryColor : undefined,
                }}
              >
                {message.text}
              </div>
            </div>
          ))}
          
          {isTyping && (
            <div className="flex justify-start">
              <div
                className="max-w-[80%] rounded-lg px-4 py-2 text-white"
                style={{ backgroundColor: config.primaryColor }}
              >
                <div className="flex space-x-1">
                  <div className="w-2 h-2 rounded-full bg-white animate-pulse"></div>
                  <div className="w-2 h-2 rounded-full bg-white animate-pulse delay-75"></div>
                  <div className="w-2 h-2 rounded-full bg-white animate-pulse delay-150"></div>
                </div>
              </div>
            </div>
          )}
        </div>
      </ScrollArea>

      {/* Quick replies */}
      <div className="px-4 py-2 flex flex-wrap gap-2">
        <Button variant="outline" size="sm" className="text-xs h-7">
          <BedDouble className="h-3 w-3 mr-1" />
          Book a room
        </Button>
        <Button variant="outline" size="sm" className="text-xs h-7">
          <Hotel className="h-3 w-3 mr-1" />
          Amenities
        </Button>
        <Button variant="outline" size="sm" className="text-xs h-7">
          <MapPin className="h-3 w-3 mr-1" />
          Directions
        </Button>
      </div>

      {/* Input area */}
      <div className="p-4 border-t">
        <div className="flex">
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type your message..."
            className="flex-1 mr-2"
            onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
          />
          <Button
            onClick={handleSendMessage}
            disabled={!input.trim() || isTyping}
            style={{ backgroundColor: config.primaryColor }}
          >
            <SendHorizontal className="h-4 w-4" />
          </Button>
        </div>
        <p className="text-xs text-center text-muted-foreground mt-2">
          Powered by AI | Available 24/7
        </p>
      </div>
    </div>
  );
}
