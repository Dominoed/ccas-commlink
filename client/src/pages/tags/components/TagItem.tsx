import * as React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { MoreHorizontal, Edit, Trash2 } from 'lucide-react';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from '@/components/ui/dropdown-menu';
import { useDeleteTag } from '@/hooks/useTags';

interface Tag {
  id: number;
  name: string;
  color: string;
  description?: string;
  created_at: string;
}

interface TagItemProps {
  tag: Tag;
  onUpdate: () => void;
}

export function TagItem({ tag, onUpdate }: TagItemProps) {
  const { deleteTag } = useDeleteTag();

  const handleDelete = async () => {
    await deleteTag(tag.id);
    onUpdate();
  };

  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardContent className="p-4">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <div className="flex items-center space-x-2 mb-2">
              <Badge 
                variant="outline" 
                style={{ borderColor: tag.color, color: tag.color }}
              >
                {tag.name}
              </Badge>
            </div>
            
            {tag.description && (
              <p className="text-sm text-muted-foreground mb-2">
                {tag.description}
              </p>
            )}
            
            <p className="text-xs text-muted-foreground">
              Created {new Date(tag.created_at).toLocaleDateString()}
            </p>
          </div>
          
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm">
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem>
                <Edit className="h-4 w-4" />
                Edit
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
