import { Project, Domain, DomainType } from '@/types/council';
import { ProjectSelector } from './ProjectSelector';
import { DomainNav } from './DomainNav';
import { Settings, HelpCircle, Sparkles } from 'lucide-react';

interface AppSidebarProps {
  projects: Project[];
  currentProject: Project;
  onProjectChange: (project: Project) => void;
  domains: Domain[];
  currentDomain: DomainType;
  onDomainChange: (domain: DomainType) => void;
}

export function AppSidebar({
  projects,
  currentProject,
  onProjectChange,
  domains,
  currentDomain,
  onDomainChange,
}: AppSidebarProps) {
  return (
    <div className="w-64 bg-sidebar border-r border-sidebar-border flex flex-col h-full">
      {/* Logo */}
      <div className="px-4 py-4 border-b border-sidebar-border">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
            <Sparkles className="w-4 h-4 text-primary-foreground" />
          </div>
          <span className="text-lg font-semibold text-foreground">council.ai</span>
        </div>
      </div>

      {/* Project Selector */}
      <div className="p-4 border-b border-sidebar-border">
        <ProjectSelector
          projects={projects}
          currentProject={currentProject}
          onProjectChange={onProjectChange}
        />
      </div>

      {/* Domain Navigation */}
      <div className="flex-1 overflow-y-auto py-4 px-2">
        <DomainNav
          domains={domains}
          currentDomain={currentDomain}
          onDomainChange={onDomainChange}
        />
      </div>

      {/* Footer */}
      <div className="p-4 border-t border-sidebar-border space-y-1">
        <button className="flex items-center gap-3 w-full px-3 py-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-surface-2 transition-colors">
          <Settings className="w-4 h-4" />
          <span className="text-sm">Settings</span>
        </button>
        <button className="flex items-center gap-3 w-full px-3 py-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-surface-2 transition-colors">
          <HelpCircle className="w-4 h-4" />
          <span className="text-sm">Help & Support</span>
        </button>
      </div>
    </div>
  );
}
