import * as React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { TagItem } from './TagItem';
import { useTags } from '@/hooks/useTags';

export function TagsList() {
  const { tags, loading, refetch } = useTags();

  return (
    <Card>
      <CardHeader>
        <CardTitle>All Tags ({tags.length})</CardTitle>
      </CardHeader>
      <CardContent>
        {loading ? (
          <div className="space-y-3">
            {[1, 2, 3].map((i) => (
              <div key={i} className="animate-pulse">
                <div className="h-16 bg-muted rounded"></div>
              </div>
            ))}
          </div>
        ) : tags.length === 0 ? (
          <div className="text-center py-8">
            <p className="text-muted-foreground">No tags created yet</p>
          </div>
        ) : (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {tags.map((tag) => (
              <TagItem
                key={tag.id}
                tag={tag}
                onUpdate={refetch}
              />
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
