import * as React from 'react';
import { Badge } from '@/components/ui/badge';

interface Tag {
  id: number;
  name: string;
  color: string;
}

interface TagsListProps {
  tags: Tag[];
}

export function TagsList({ tags }: TagsListProps) {
  return (
    <div className="flex flex-wrap gap-1">
      {tags.map((tag) => (
        <Badge 
          key={tag.id} 
          variant="outline" 
          className="text-xs"
          style={{ borderColor: tag.color, color: tag.color }}
        >
          {tag.name}
        </Badge>
      ))}
    </div>
  );
}
