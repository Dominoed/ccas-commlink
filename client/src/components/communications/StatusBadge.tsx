import * as React from 'react';
import { Badge } from '@/components/ui/badge';

interface StatusBadgeProps {
  status: 'active' | 'archived' | 'flagged';
}

export function StatusBadge({ status }: StatusBadgeProps) {
  const getProps = () => {
    switch (status) {
      case 'active':
        return { variant: 'outline' as const, className: 'text-green-700 border-green-300' };
      case 'archived':
        return { variant: 'secondary' as const, className: '' };
      case 'flagged':
        return { variant: 'destructive' as const, className: '' };
    }
  };

  const getLabel = () => {
    switch (status) {
      case 'active':
        return 'Active';
      case 'archived':
        return 'Archived';
      case 'flagged':
        return 'Flagged';
    }
  };

  const props = getProps();

  return (
    <Badge {...props}>
      {getLabel()}
    </Badge>
  );
}
