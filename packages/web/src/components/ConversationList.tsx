'use client';

import { useState } from 'react';
import { Search, Plus, MessageSquare, Clock } from 'lucide-react';
import { Conversation, DomainType } from '@/types/council';
import { cn } from '@/lib/utils';
import { format, isToday, isYesterday } from 'date-fns';

interface ConversationListProps {
  conversations: Conversation[];
  currentDomain: DomainType;
  currentConversation: Conversation | null;
  onConversationSelect: (conversation: Conversation) => void;
  onNewConversation: () => void;
}

function formatDate(date: Date): string {
  if (isToday(date)) return format(date, 'h:mm a');
  if (isYesterday(date)) return 'Yesterday';
  return format(date, 'MMM d');
}

export function ConversationList({
  conversations,
  currentDomain,
  currentConversation,
  onConversationSelect,
  onNewConversation,
}: ConversationListProps) {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredConversations = conversations
    .filter((c) => c.domainId === currentDomain)
    .filter((c) => 
      searchQuery === '' || 
      c.title.toLowerCase().includes(searchQuery.toLowerCase())
    );

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="p-4 border-b border-border">
        <div className="flex items-center gap-2 mb-3">
          <h2 className="text-sm font-semibold text-foreground flex-1">Conversations</h2>
          <button
            onClick={onNewConversation}
            className="w-7 h-7 rounded-lg bg-primary hover:bg-primary/90 flex items-center justify-center transition-colors"
          >
            <Plus className="w-4 h-4 text-primary-foreground" />
          </button>
        </div>
        
        {/* Search */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search conversations..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-3 py-2 text-sm bg-surface-2 border border-border rounded-lg placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary/50 focus:border-primary/50 transition-colors"
          />
        </div>
      </div>

      {/* Conversation List */}
      <div className="flex-1 overflow-y-auto p-2">
        {filteredConversations.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-12 px-4 text-center">
            <div className="w-12 h-12 rounded-xl bg-surface-2 flex items-center justify-center mb-3">
              <MessageSquare className="w-6 h-6 text-muted-foreground" />
            </div>
            <p className="text-sm text-muted-foreground">No conversations yet</p>
            <p className="text-xs text-muted-foreground/70 mt-1">Start a new conversation to get started</p>
          </div>
        ) : (
          <div className="space-y-1">
            {filteredConversations.map((conversation) => {
              const isActive = currentConversation?.id === conversation.id;
              
              return (
                <button
                  key={conversation.id}
                  onClick={() => onConversationSelect(conversation)}
                  className={cn(
                    'w-full p-3 rounded-lg text-left transition-all duration-200 group',
                    isActive
                      ? 'bg-surface-hover'
                      : 'hover:bg-surface-2'
                  )}
                >
                  <div className="flex items-start justify-between gap-2 mb-1">
                    <p className={cn(
                      'text-sm font-medium truncate flex-1',
                      isActive ? 'text-foreground' : 'text-secondary-foreground'
                    )}>
                      {conversation.title}
                    </p>
                    <span className="text-xs text-muted-foreground flex items-center gap-1 shrink-0">
                      <Clock className="w-3 h-3" />
                      {formatDate(conversation.updatedAt)}
                    </span>
                  </div>
                  {conversation.lastMessage && (
                    <p className="text-xs text-muted-foreground truncate">
                      {conversation.lastMessage}
                    </p>
                  )}
                </button>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
