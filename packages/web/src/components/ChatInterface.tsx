'use client';

import { useState, useRef, useEffect } from 'react';
import { Send, Paperclip, Sparkles } from 'lucide-react';
import { Message, Domain, DomainType } from '@/types/council';
import { cn } from '@/lib/utils';
import { format } from 'date-fns';

const colorMap: Record<DomainType, string> = {
  marketing: 'bg-agent-marketing',
  business: 'bg-agent-business',
  finance: 'bg-agent-finance',
  product: 'bg-agent-product',
  legal: 'bg-agent-legal',
};

interface ChatInterfaceProps {
  messages: Message[];
  domain: Domain;
  onSendMessage: (content: string) => void;
}

export function ChatInterface({ messages, domain, onSendMessage }: ChatInterfaceProps) {
  const [inputValue, setInputValue] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = Math.min(textareaRef.current.scrollHeight, 150) + 'px';
    }
  }, [inputValue]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputValue.trim()) {
      onSendMessage(inputValue.trim());
      setInputValue('');
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="px-6 py-4 border-b border-border flex items-center gap-4">
        <div className={cn('w-10 h-10 rounded-xl flex items-center justify-center', colorMap[domain.id])}>
          <Sparkles className="w-5 h-5 text-white" />
        </div>
        <div>
          <h2 className="text-base font-semibold text-foreground">{domain.agentName}</h2>
          <p className="text-sm text-muted-foreground">{domain.agentRole} • {domain.name}</p>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-6 py-4 space-y-6">
        {messages.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-center animate-fade-in">
            <div className={cn('w-16 h-16 rounded-2xl flex items-center justify-center mb-4', colorMap[domain.id])}>
              <Sparkles className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-lg font-semibold text-foreground mb-2">
              Start a conversation with {domain.agentName}
            </h3>
            <p className="text-sm text-muted-foreground max-w-md">
              I'm your {domain.agentRole} expert. Ask me anything about {domain.description.toLowerCase()}.
            </p>
          </div>
        ) : (
          messages.map((message) => (
            <div
              key={message.id}
              className={cn(
                'flex gap-4 animate-fade-in',
                message.role === 'user' ? 'flex-row-reverse' : ''
              )}
            >
              {message.role === 'agent' && (
                <div className={cn('w-8 h-8 rounded-lg flex items-center justify-center shrink-0', colorMap[domain.id])}>
                  <Sparkles className="w-4 h-4 text-white" />
                </div>
              )}
              <div
                className={cn(
                  'flex-1 max-w-2xl',
                  message.role === 'user' ? 'flex flex-col items-end' : ''
                )}
              >
                <div
                  className={cn(
                    'rounded-2xl px-4 py-3',
                    message.role === 'user'
                      ? 'bg-primary text-primary-foreground rounded-br-md'
                      : 'bg-surface-2 text-foreground rounded-bl-md'
                  )}
                >
                  <div className="text-sm leading-relaxed whitespace-pre-wrap">
                    {message.content}
                  </div>
                </div>
                <p className="text-xs text-muted-foreground mt-1.5 px-1">
                  {format(message.createdAt, 'h:mm a')}
                </p>
              </div>
            </div>
          ))
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div className="px-6 py-4 border-t border-border">
        <form onSubmit={handleSubmit} className="relative">
          <div className="flex items-end gap-2 bg-surface-2 rounded-2xl border border-border focus-within:border-primary/50 focus-within:ring-1 focus-within:ring-primary/20 transition-all">
            <button
              type="button"
              className="p-3 text-muted-foreground hover:text-foreground transition-colors shrink-0"
            >
              <Paperclip className="w-5 h-5" />
            </button>
            <textarea
              ref={textareaRef}
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder={`Ask ${domain.agentName} anything...`}
              rows={1}
              className="flex-1 py-3 bg-transparent text-sm text-foreground placeholder:text-muted-foreground resize-none focus:outline-none max-h-36"
            />
            <button
              type="submit"
              disabled={!inputValue.trim()}
              className={cn(
                'p-3 rounded-xl m-1 transition-all shrink-0',
                inputValue.trim()
                  ? 'bg-primary text-primary-foreground hover:bg-primary/90'
                  : 'text-muted-foreground'
              )}
            >
              <Send className="w-5 h-5" />
            </button>
          </div>
          <p className="text-xs text-muted-foreground/60 mt-2 text-center">
            {domain.agentName} has access to your uploaded context documents
          </p>
        </form>
      </div>
    </div>
  );
}
