import { useState } from 'react';
import { AppSidebar } from '@/components/AppSidebar';
import { ConversationList } from '@/components/ConversationList';
import { ChatInterface } from '@/components/ChatInterface';
import { ContextPanel } from '@/components/ContextPanel';
import { 
  mockProjects, 
  domains, 
  mockConversations, 
  mockMessages, 
  mockDocuments,
  getDomainById,
} from '@/data/mockData';
import { Project, DomainType, Conversation, Message } from '@/types/council';

const Index = () => {
  const [currentProject, setCurrentProject] = useState<Project>(mockProjects[0]);
  const [currentDomain, setCurrentDomain] = useState<DomainType>('marketing');
  const [currentConversation, setCurrentConversation] = useState<Conversation | null>(mockConversations[0]);
  const [messages, setMessages] = useState<Message[]>(mockMessages);
  const [isContextPanelOpen, setIsContextPanelOpen] = useState(true);

  const domain = getDomainById(currentDomain)!;
  const conversationMessages = currentConversation 
    ? messages.filter(m => m.conversationId === currentConversation.id)
    : [];

  const handleSendMessage = (content: string) => {
    if (!currentConversation) return;
    
    const newMessage: Message = {
      id: `msg-${Date.now()}`,
      conversationId: currentConversation.id,
      role: 'user',
      content,
      createdAt: new Date(),
    };
    
    setMessages(prev => [...prev, newMessage]);

    // Simulate AI response
    setTimeout(() => {
      const aiResponse: Message = {
        id: `msg-${Date.now() + 1}`,
        conversationId: currentConversation.id,
        role: 'agent',
        content: `Thank you for your question about ${currentDomain}. As your ${domain.agentRole}, I'm analyzing your request and will provide insights based on my expertise in ${domain.description.toLowerCase()}.\n\nThis is a simulated response. In a production environment, this would be powered by an AI model with access to your uploaded context documents.`,
        createdAt: new Date(),
      };
      setMessages(prev => [...prev, aiResponse]);
    }, 1000);
  };

  const handleNewConversation = () => {
    const newConversation: Conversation = {
      id: `conv-${Date.now()}`,
      title: 'New conversation',
      domainId: currentDomain,
      projectId: currentProject.id,
      updatedAt: new Date(),
      createdAt: new Date(),
    };
    setCurrentConversation(newConversation);
  };

  const handleDomainChange = (domain: DomainType) => {
    setCurrentDomain(domain);
    const domainConversations = mockConversations.filter(c => c.domainId === domain);
    setCurrentConversation(domainConversations[0] || null);
  };

  return (
    <div className="flex h-screen w-full bg-background overflow-hidden">
      {/* Sidebar */}
      <AppSidebar
        projects={mockProjects}
        currentProject={currentProject}
        onProjectChange={setCurrentProject}
        domains={domains}
        currentDomain={currentDomain}
        onDomainChange={handleDomainChange}
      />

      {/* Conversation List */}
      <div className="w-72 border-r border-border bg-surface-1">
        <ConversationList
          conversations={mockConversations}
          currentDomain={currentDomain}
          currentConversation={currentConversation}
          onConversationSelect={setCurrentConversation}
          onNewConversation={handleNewConversation}
        />
      </div>

      {/* Main Chat Area */}
      <div className="flex-1 flex relative min-w-0">
        <div className="flex-1 min-w-0">
          <ChatInterface
            messages={conversationMessages}
            domain={domain}
            onSendMessage={handleSendMessage}
          />
        </div>

        {/* Context Panel */}
        <ContextPanel
          documents={mockDocuments}
          currentDomain={currentDomain}
          isOpen={isContextPanelOpen}
          onToggle={() => setIsContextPanelOpen(!isContextPanelOpen)}
        />
      </div>
    </div>
  );
};

export default Index;
