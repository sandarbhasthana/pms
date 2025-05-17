
import React, { useState } from "react";
import { ChatbotConfig as ChatbotConfigType } from "@/types/website-builder-types";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { PlusCircle, Trash2, Bot, Languages } from "lucide-react";

export interface ChatbotConfigProps {
  config: ChatbotConfigType;
  onChange: (config: ChatbotConfigType) => void;
  onSkip?: () => void;
}

export function ChatbotConfig({ config, onChange, onSkip }: ChatbotConfigProps) {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  
  const handleToggleEnabled = () => {
    onChange({
      ...config,
      enabled: !config.enabled,
    });
  };

  const handleFieldChange = (field: keyof ChatbotConfigType, value: any) => {
    onChange({
      ...config,
      [field]: value,
    });
  };

  const handleAddQuestion = () => {
    if (question.trim() && answer.trim()) {
      onChange({
        ...config,
        commonQuestions: [
          ...config.commonQuestions,
          { question: question.trim(), answer: answer.trim() },
        ],
      });
      setQuestion("");
      setAnswer("");
    }
  };

  const handleDeleteQuestion = (index: number) => {
    const updatedQuestions = [...config.commonQuestions];
    updatedQuestions.splice(index, 1);
    onChange({
      ...config,
      commonQuestions: updatedQuestions,
    });
  };

  return (
    <div className="p-4 space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="font-medium">AI Chatbot Configuration</h3>
        {onSkip && (
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={onSkip} 
            className="h-6 text-xs text-pms-purple"
          >
            Skip Step
          </Button>
        )}
      </div>
      
      <div className="flex items-center space-x-3 py-3 px-4 bg-muted rounded-md">
        <Switch
          checked={config.enabled}
          onCheckedChange={handleToggleEnabled}
          id="chatbot-enabled"
        />
        <Label htmlFor="chatbot-enabled" className="cursor-pointer flex-1">
          <div className="font-medium">Enable AI Chatbot</div>
          <p className="text-sm text-muted-foreground">
            Add a virtual concierge to your website
          </p>
        </Label>
        <Bot className={`h-5 w-5 ${config.enabled ? 'text-pms-purple' : 'text-muted-foreground'}`} />
      </div>

      {config.enabled && (
        <div className="space-y-5">
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <Label htmlFor="greeting-message">Greeting Message</Label>
              <Input
                id="greeting-message"
                value={config.greetingMessage}
                onChange={(e) => handleFieldChange("greetingMessage", e.target.value)}
                placeholder="Hello! How can I help you today?"
              />
            </div>
            <div>
              <Label htmlFor="primary-color">Primary Color</Label>
              <div className="flex space-x-2">
                <div 
                  className="w-10 h-10 rounded border" 
                  style={{ backgroundColor: config.primaryColor }}
                />
                <Input
                  id="primary-color"
                  type="text"
                  value={config.primaryColor}
                  onChange={(e) => handleFieldChange("primaryColor", e.target.value)}
                  placeholder="#9b87f5"
                />
              </div>
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <Label htmlFor="language">Language</Label>
              <Select
                value={config.language}
                onValueChange={(value) => handleFieldChange("language", value)}
              >
                <SelectTrigger id="language" className="w-full">
                  <div className="flex items-center">
                    <Languages className="h-4 w-4 mr-2 text-muted-foreground" />
                    <SelectValue placeholder="Select language" />
                  </div>
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="en">English</SelectItem>
                  <SelectItem value="es">Spanish</SelectItem>
                  <SelectItem value="fr">French</SelectItem>
                  <SelectItem value="de">German</SelectItem>
                  <SelectItem value="it">Italian</SelectItem>
                  <SelectItem value="zh">Chinese</SelectItem>
                  <SelectItem value="ja">Japanese</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="fallback-email">Fallback Email</Label>
              <Input
                id="fallback-email"
                type="email"
                value={config.fallbackEmail}
                onChange={(e) => handleFieldChange("fallbackEmail", e.target.value)}
                placeholder="contact@yourhotel.com"
              />
              <p className="text-xs text-muted-foreground mt-1">
                When the AI can't help, it will offer to contact this email
              </p>
            </div>
          </div>

          <div>
            <div className="flex justify-between items-center mb-3">
              <Label>Common Questions & Answers</Label>
              <span className="text-xs text-muted-foreground">
                {config.commonQuestions.length} defined
              </span>
            </div>
            
            <div className="space-y-3">
              {config.commonQuestions.map((qa, index) => (
                <div
                  key={index}
                  className="p-3 border rounded-md bg-background relative"
                >
                  <div className="pr-8">
                    <p className="font-medium text-sm">{qa.question}</p>
                    <p className="text-sm text-muted-foreground mt-1">{qa.answer}</p>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-6 w-6 absolute top-2 right-2 text-muted-foreground"
                    onClick={() => handleDeleteQuestion(index)}
                  >
                    <Trash2 className="h-3.5 w-3.5" />
                  </Button>
                </div>
              ))}
            </div>

            <div className="mt-3 space-y-2">
              <Input
                placeholder="Question (e.g., Do you have free WiFi?)"
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
              />
              <Textarea
                placeholder="Answer (e.g., Yes, we offer complimentary high-speed WiFi throughout the property.)"
                value={answer}
                onChange={(e) => setAnswer(e.target.value)}
                rows={2}
              />
              <Button
                variant="outline"
                className="w-full"
                onClick={handleAddQuestion}
                disabled={!question.trim() || !answer.trim()}
              >
                <PlusCircle className="h-4 w-4 mr-2" />
                Add Question & Answer
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
