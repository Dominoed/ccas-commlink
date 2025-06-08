import * as React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CommunicationItem } from '@/components/communications/CommunicationItem';
import { useCommunications } from '@/hooks/useCommunications';

interface CommunicationsListProps {
  filters: {
    type: string;
    status: string;
    priority: string;
  };
}

export function CommunicationsList({ filters }: CommunicationsListProps) {
  const { communications, loading, refetch } = useCommunications(filters);

  React.useEffect(() => {
    refetch();
  }, [filters]);

  return (
    <Card>
      <CardHeader>
        <CardTitle>All Communications ({communications.length})</CardTitle>
      </CardHeader>
      <CardContent>
        {loading ? (
          <div className="space-y-4">
            {[1, 2, 3, 4, 5].map((i) => (
              <div key={i} className="animate-pulse">
                <div className="h-20 bg-muted rounded"></div>
              </div>
            ))}
          </div>
        ) : communications.length === 0 ? (
          <div className="text-center py-8">
            <p className="text-muted-foreground">No communications found</p>
          </div>
        ) : (
          <div className="space-y-4">
            {communications.map((communication) => (
              <CommunicationItem
                key={communication.id}
                communication={communication}
                onUpdate={refetch}
              />
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
