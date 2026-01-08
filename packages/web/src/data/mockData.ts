import { Project, Domain, Conversation, Message, ContextDocument, DomainType } from '@/types/council';

export const domains: Domain[] = [
  {
    id: 'marketing',
    name: 'Marketing',
    description: 'Growth, branding, and customer acquisition strategies',
    icon: 'Megaphone',
    agentName: 'Maya',
    agentRole: 'Marketing Strategist',
  },
  {
    id: 'business',
    name: 'Business',
    description: 'Business model, strategy, and operations',
    icon: 'Briefcase',
    agentName: 'Blake',
    agentRole: 'Business Advisor',
  },
  {
    id: 'finance',
    name: 'Finance',
    description: 'Financial planning, fundraising, and metrics',
    icon: 'TrendingUp',
    agentName: 'Finn',
    agentRole: 'Financial Analyst',
  },
  {
    id: 'product',
    name: 'Product',
    description: 'Product strategy, roadmap, and user experience',
    icon: 'Layers',
    agentName: 'Parker',
    agentRole: 'Product Manager',
  },
  {
    id: 'legal',
    name: 'Legal',
    description: 'Legal compliance, contracts, and IP protection',
    icon: 'Scale',
    agentName: 'Lexi',
    agentRole: 'Legal Counsel',
  },
];

export const mockProjects: Project[] = [
  {
    id: 'proj-1',
    name: 'My Startup',
    description: 'Main venture - AI-powered productivity tool',
    createdAt: new Date('2024-01-15'),
  },
  {
    id: 'proj-2',
    name: 'Personal Project',
    description: 'Side project exploring new ideas',
    createdAt: new Date('2024-02-20'),
  },
  {
    id: 'proj-3',
    name: 'Client X',
    description: 'Consulting engagement',
    createdAt: new Date('2024-03-10'),
  },
];

export const mockConversations: Conversation[] = [
  {
    id: 'conv-1',
    title: 'Go-to-market strategy',
    domainId: 'marketing',
    projectId: 'proj-1',
    lastMessage: 'Based on your target audience, I recommend...',
    updatedAt: new Date('2024-03-15T14:30:00'),
    createdAt: new Date('2024-03-15T10:00:00'),
  },
  {
    id: 'conv-2',
    title: 'Social media content plan',
    domainId: 'marketing',
    projectId: 'proj-1',
    lastMessage: 'Here\'s a content calendar for Q2...',
    updatedAt: new Date('2024-03-14T16:45:00'),
    createdAt: new Date('2024-03-14T09:00:00'),
  },
  {
    id: 'conv-3',
    title: 'Series A preparation',
    domainId: 'finance',
    projectId: 'proj-1',
    lastMessage: 'Let me analyze your current metrics...',
    updatedAt: new Date('2024-03-13T11:20:00'),
    createdAt: new Date('2024-03-12T14:00:00'),
  },
];

export const mockMessages: Message[] = [
  {
    id: 'msg-1',
    conversationId: 'conv-1',
    role: 'user',
    content: 'I need help creating a go-to-market strategy for our B2B SaaS product. We\'re targeting mid-market companies in the productivity space.',
    createdAt: new Date('2024-03-15T10:00:00'),
  },
  {
    id: 'msg-2',
    conversationId: 'conv-1',
    role: 'agent',
    content: 'I\'d be happy to help you develop a comprehensive GTM strategy. Let me start by understanding your current position.\n\nBased on what you\'ve shared, here are my initial thoughts:\n\n**Target Market Analysis**\nMid-market B2B companies typically have 100-1000 employees and face unique productivity challenges around team coordination and workflow optimization.\n\n**Key Questions to Consider:**\n1. What\'s your current customer acquisition channel mix?\n2. Do you have any existing case studies or social proof?\n3. What\'s your pricing model and average contract value?\n\nOnce I understand these better, I can recommend specific channels and messaging strategies that typically work well in this segment.',
    createdAt: new Date('2024-03-15T10:01:00'),
  },
  {
    id: 'msg-3',
    conversationId: 'conv-1',
    role: 'user',
    content: 'Currently we\'ve been doing mostly outbound sales and some content marketing. We have 3 case studies from pilot customers. Our pricing starts at $50/user/month.',
    createdAt: new Date('2024-03-15T10:05:00'),
  },
  {
    id: 'msg-4',
    conversationId: 'conv-1',
    role: 'agent',
    content: 'Excellent foundation! With 3 case studies and a clear pricing model, you have the elements needed for a strong GTM push. Here\'s my recommended strategy:\n\n**Phase 1: Foundation (Weeks 1-4)**\n- Optimize your case studies for different buyer personas\n- Create a compelling ROI calculator based on actual customer data\n- Develop targeted landing pages for key industries\n\n**Phase 2: Channel Activation (Weeks 5-12)**\n- LinkedIn thought leadership + targeted ads\n- Partner with productivity-focused newsletters (there are several with 50k+ subscribers in your ICP)\n- Launch a "Productivity Benchmark" report to generate inbound leads\n\n**Phase 3: Scale (Weeks 13+)**\n- Double down on what\'s working\n- Consider strategic integrations with complementary tools\n- Build a customer referral program\n\nWant me to dive deeper into any of these phases?',
    createdAt: new Date('2024-03-15T10:06:00'),
  },
];

export const mockDocuments: ContextDocument[] = [
  {
    id: 'doc-1',
    name: 'Pitch Deck v3.pdf',
    type: 'text',
    size: '2.4 MB',
    domainId: 'marketing',
    projectId: 'proj-1',
    uploadedAt: new Date('2024-03-10'),
  },
  {
    id: 'doc-2',
    name: 'Competitor Analysis.xlsx',
    type: 'spreadsheet',
    size: '156 KB',
    domainId: 'marketing',
    projectId: 'proj-1',
    uploadedAt: new Date('2024-03-08'),
  },
  {
    id: 'doc-3',
    name: 'Brand Guidelines.png',
    type: 'image',
    size: '1.2 MB',
    domainId: 'marketing',
    projectId: 'proj-1',
    uploadedAt: new Date('2024-03-05'),
  },
];

export const getDomainById = (id: DomainType): Domain | undefined => {
  return domains.find(d => d.id === id);
};
