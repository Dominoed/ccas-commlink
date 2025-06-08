import * as React from 'react';
import { Badge } from '@/components/ui/badge';

interface PriorityBadgeProps {
  priority: 'low' | 'normal' | 'high' | 'critical';
}

export function PriorityBadge({ priority }: PriorityBadgeProps) {
  const getVariant = () => {
    switch (priority) {
      case 'critical':
        return 'destructive';
      case 'high':
        return 'default';
      case 'normal':
        return 'secondary';
      case 'low':
        return 'outline';
    }
  };

  const getLabel = () => {
    switch (priority) {
      case 'critical':
        return 'Critical';
      case 'high':
        return 'High';
      case 'normal':
        return 'Normal';
      case 'low':
        return 'Low';
    }
  };

  return (
    <Badge variant={getVariant()} className="text-xs">
      {getLabel()}
    </Badge>
  );
}
