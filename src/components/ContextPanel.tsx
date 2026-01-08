import { useState } from 'react';
import { FileText, Table, Image, Upload, X, ChevronRight, ChevronLeft, Database, Trash2 } from 'lucide-react';
import { ContextDocument, DomainType } from '@/types/council';
import { cn } from '@/lib/utils';
import { format } from 'date-fns';

const typeIconMap = {
  text: FileText,
  spreadsheet: Table,
  image: Image,
};

interface ContextPanelProps {
  documents: ContextDocument[];
  currentDomain: DomainType;
  isOpen: boolean;
  onToggle: () => void;
}

export function ContextPanel({ documents, currentDomain, isOpen, onToggle }: ContextPanelProps) {
  const filteredDocs = documents.filter((d) => d.domainId === currentDomain);

  if (!isOpen) {
    return (
      <div className="relative">
        <button
          onClick={onToggle}
          className="absolute right-0 top-8 w-8 h-24 bg-surface-2 hover:bg-surface-hover border-l border-y border-border rounded-l-lg flex items-center justify-center transition-colors group"
        >
          <ChevronLeft className="w-4 h-4 text-muted-foreground group-hover:text-foreground transition-colors" />
        </button>
      </div>
    );
  }

  return (
    <div className="w-80 border-l border-border bg-surface-1 flex flex-col h-full animate-slide-in">
      {/* Header */}
      <div className="px-4 py-4 border-b border-border flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Database className="w-4 h-4 text-primary" />
          <h3 className="text-sm font-semibold text-foreground">Knowledge Base</h3>
        </div>
        <button
          onClick={onToggle}
          className="w-7 h-7 rounded-lg hover:bg-surface-hover flex items-center justify-center transition-colors"
        >
          <ChevronRight className="w-4 h-4 text-muted-foreground" />
        </button>
      </div>

      {/* Upload Zone */}
      <div className="p-4">
        <div className="border-2 border-dashed border-border rounded-xl p-6 text-center hover:border-primary/50 hover:bg-primary/5 transition-colors cursor-pointer group">
          <div className="w-10 h-10 rounded-xl bg-surface-2 group-hover:bg-primary/10 flex items-center justify-center mx-auto mb-3 transition-colors">
            <Upload className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" />
          </div>
          <p className="text-sm font-medium text-foreground mb-1">Upload Context</p>
          <p className="text-xs text-muted-foreground">
            .txt, .csv, .xlsx, .png, .jpg
          </p>
        </div>
      </div>

      {/* Documents List */}
      <div className="flex-1 overflow-y-auto px-4 pb-4">
        <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-3">
          Uploaded Documents ({filteredDocs.length})
        </p>
        
        {filteredDocs.length === 0 ? (
          <div className="text-center py-8">
            <p className="text-sm text-muted-foreground">No documents yet</p>
            <p className="text-xs text-muted-foreground/70 mt-1">
              Upload files to give the AI more context
            </p>
          </div>
        ) : (
          <div className="space-y-2">
            {filteredDocs.map((doc) => {
              const Icon = typeIconMap[doc.type];
              return (
                <div
                  key={doc.id}
                  className="flex items-start gap-3 p-3 rounded-lg bg-surface-2 hover:bg-surface-hover transition-colors group"
                >
                  <div className="w-8 h-8 rounded-lg bg-surface-3 flex items-center justify-center shrink-0">
                    <Icon className="w-4 h-4 text-muted-foreground" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-foreground truncate">
                      {doc.name}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {doc.size} • {format(doc.uploadedAt, 'MMM d')}
                    </p>
                  </div>
                  <button className="w-7 h-7 rounded-lg hover:bg-destructive/10 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all">
                    <Trash2 className="w-4 h-4 text-destructive" />
                  </button>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="px-4 py-3 border-t border-border">
        <p className="text-xs text-muted-foreground text-center">
          These documents are used as context for AI responses
        </p>
      </div>
    </div>
  );
}
