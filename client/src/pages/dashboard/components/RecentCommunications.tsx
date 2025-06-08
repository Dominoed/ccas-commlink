import * as React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CommunicationItem } from '@/components/communications/CommunicationItem';
import { useCommunications } from '@/hooks/useCommunications';

export function RecentCommunications() {
  const { communications, loading } = useCommunications({ limit: 5 });

  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Communications</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {loading ? (
          <div className="space-y-3">
            {[1, 2, 3].map((i) => (
              <div key={i} className="animate-pulse">
                <div className="h-16 bg-muted rounded"></div>
              </div>
            ))}
          </div>
        ) : communications.length === 0 ? (
          <p className="text-muted-foreground text-center py-4">
            No communications yet
          </p>
        ) : (
          communications.map((comm) => (
            <CommunicationItem key={comm.id} communication={comm} />
          ))
        )}
      </CardContent>
    </Card>
  );
}
