import { useState } from 'react';
import { ChevronDown, Plus, Check, Folder } from 'lucide-react';
import { Project } from '@/types/council';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

interface ProjectSelectorProps {
  projects: Project[];
  currentProject: Project;
  onProjectChange: (project: Project) => void;
}

export function ProjectSelector({ projects, currentProject, onProjectChange }: ProjectSelectorProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className="flex items-center gap-2 px-3 py-2 rounded-lg bg-surface-2 hover:bg-surface-hover transition-colors w-full text-left group">
          <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
            <Folder className="w-4 h-4 text-primary" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-foreground truncate">{currentProject.name}</p>
            <p className="text-xs text-muted-foreground truncate">{currentProject.description}</p>
          </div>
          <ChevronDown className="w-4 h-4 text-muted-foreground group-hover:text-foreground transition-colors" />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start" className="w-64">
        {projects.map((project) => (
          <DropdownMenuItem
            key={project.id}
            onClick={() => onProjectChange(project)}
            className="flex items-center gap-3 py-2"
          >
            <div className="w-6 h-6 rounded bg-primary/10 flex items-center justify-center">
              <Folder className="w-3 h-3 text-primary" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium truncate">{project.name}</p>
            </div>
            {project.id === currentProject.id && (
              <Check className="w-4 h-4 text-primary" />
            )}
          </DropdownMenuItem>
        ))}
        <DropdownMenuSeparator />
        <DropdownMenuItem className="flex items-center gap-3 py-2 text-muted-foreground">
          <div className="w-6 h-6 rounded border border-dashed border-muted-foreground/50 flex items-center justify-center">
            <Plus className="w-3 h-3" />
          </div>
          <span className="text-sm">New Project</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
