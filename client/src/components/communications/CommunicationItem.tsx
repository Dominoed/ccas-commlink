import * as React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { CommunicationTypeIcon } from './CommunicationTypeIcon';
import { PriorityBadge } from './PriorityBadge';
import { StatusBadge } from './StatusBadge';
import { TagsList } from './TagsList';
import { MoreHorizontal, Archive, Flag, Trash2 } from 'lucide-react';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from '@/components/ui/dropdown-menu';
import { useUpdateCommunication, useDeleteCommunication } from '@/hooks/useCommunications';

interface Communication {
  id: number;
  type: 'sip' | 'military_voip' | 'teams' | 'email';
  from_address: string;
  to_address: string;
  subject?: string;
  content?: string;
  timestamp: string;
  status: 'active' | 'archived' | 'flagged';
  priority: 'low' | 'normal' | 'high' | 'critical';
  duration?: number;
  tags?: Array<{ id: number; name: string; color: string }>;
}

interface CommunicationItemProps {
  communication: Communication;
  onUpdate?: () => void;
}

export function CommunicationItem({ communication, onUpdate }: CommunicationItemProps) {
  const { updateCommunication } = useUpdateCommunication();
  const { deleteCommunication } = useDeleteCommunication();

  const handleStatusChange = async (status: string) => {
    await updateCommunication(communication.id, { status });
    onUpdate?.();
  };

  const handleDelete = async () => {
    await deleteCommunication(communication.id);
    onUpdate?.();
  };

  const formatTimestamp = (timestamp: string) => {
    return new Date(timestamp).toLocaleString();
  };

  const formatDuration = (seconds?: number) => {
    if (!seconds) return '';
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardContent className="p-4">
        <div className="flex items-start justify-between">
          <div className="flex items-start space-x-3 flex-1">
            <CommunicationTypeIcon type={communication.type} />
            
            <div className="flex-1 min-w-0">
              <div className="flex items-center space-x-2 mb-2">
                <span className="font-medium">{communication.from_address}</span>
                <span className="text-muted-foreground">→</span>
                <span className="font-medium">{communication.to_address}</span>
                {communication.duration && (
                  <Badge variant="outline">{formatDuration(communication.duration)}</Badge>
                )}
              </div>
              
              {communication.subject && (
                <p className="font-medium text-sm mb-1">{communication.subject}</p>
              )}
              
              {communication.content && (
                <p className="text-sm text-muted-foreground mb-2 line-clamp-2">
                  {communication.content}
                </p>
              )}
              
              <div className="flex items-center space-x-2 text-xs text-muted-foreground">
                <span>{formatTimestamp(communication.timestamp)}</span>
                <StatusBadge status={communication.status} />
                <PriorityBadge priority={communication.priority} />
              </div>
              
              {communication.tags && communication.tags.length > 0 && (
                <div className="mt-2">
                  <TagsList tags={communication.tags} />
                </div>
              )}
            </div>
          </div>
          
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm">
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => handleStatusChange('archived')}>
                <Archive className="h-4 w-4" />
                Archive
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleStatusChange('flagged')}>
                <Flag className="h-4 w-4" />
                Flag
              </DropdownMenuItem>
              <DropdownMenuItem 
                onClick={handleDelete}
                className="text-destructive"
              >
                <Trash2 className="h-4 w-4" />
                Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </CardContent>
    </Card>
  );
}
