import { Domain, DomainType } from '@/types/council';
import { Megaphone, Briefcase, TrendingUp, Layers, Scale } from 'lucide-react';
import { cn } from '@/lib/utils';

const iconMap = {
  Megaphone,
  Briefcase,
  TrendingUp,
  Layers,
  Scale,
};

const colorMap: Record<DomainType, string> = {
  marketing: 'text-agent-marketing',
  business: 'text-agent-business',
  finance: 'text-agent-finance',
  product: 'text-agent-product',
  legal: 'text-agent-legal',
};

const bgColorMap: Record<DomainType, string> = {
  marketing: 'bg-agent-marketing/10',
  business: 'bg-agent-business/10',
  finance: 'bg-agent-finance/10',
  product: 'bg-agent-product/10',
  legal: 'bg-agent-legal/10',
};

interface DomainNavProps {
  domains: Domain[];
  currentDomain: DomainType;
  onDomainChange: (domain: DomainType) => void;
}

export function DomainNav({ domains, currentDomain, onDomainChange }: DomainNavProps) {
  return (
    <nav className="space-y-1">
      <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider px-3 mb-3">
        Expert Domains
      </p>
      {domains.map((domain) => {
        const Icon = iconMap[domain.icon as keyof typeof iconMap];
        const isActive = currentDomain === domain.id;
        
        return (
          <button
            key={domain.id}
            onClick={() => onDomainChange(domain.id)}
            className={cn(
              'flex items-center gap-3 w-full px-3 py-2.5 rounded-lg text-left transition-all duration-200',
              isActive
                ? 'bg-surface-hover'
                : 'hover:bg-surface-2'
            )}
          >
            <div className={cn(
              'w-8 h-8 rounded-lg flex items-center justify-center transition-colors',
              isActive ? bgColorMap[domain.id] : 'bg-surface-3'
            )}>
              <Icon className={cn(
                'w-4 h-4 transition-colors',
                isActive ? colorMap[domain.id] : 'text-muted-foreground'
              )} />
            </div>
            <div className="flex-1 min-w-0">
              <p className={cn(
                'text-sm font-medium transition-colors',
                isActive ? 'text-foreground' : 'text-secondary-foreground'
              )}>
                {domain.name}
              </p>
              <p className="text-xs text-muted-foreground truncate">
                {domain.agentName} • {domain.agentRole}
              </p>
            </div>
            {isActive && (
              <div className={cn('w-1.5 h-1.5 rounded-full', `bg-agent-${domain.id}`)} 
                   style={{ backgroundColor: `hsl(var(--agent-${domain.id}))` }} />
            )}
          </button>
        );
      })}
    </nav>
  );
}
