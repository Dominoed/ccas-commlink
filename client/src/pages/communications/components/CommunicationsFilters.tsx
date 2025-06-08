import * as React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { X } from 'lucide-react';

interface CommunicationsFiltersProps {
  filters: {
    type: string;
    status: string;
    priority: string;
  };
  onFiltersChange: (filters: any) => void;
}

export function CommunicationsFilters({ filters, onFiltersChange }: CommunicationsFiltersProps) {
  const clearFilters = () => {
    onFiltersChange({
      type: '',
      status: '',
      priority: ''
    });
  };

  const hasActiveFilters = filters.type || filters.status || filters.priority;

  return (
    <Card>
      <CardContent className="pt-6">
        <div className="flex flex-wrap gap-4 items-center">
          <div className="flex items-center space-x-2">
            <label className="text-sm font-medium">Type:</label>
            <Select value={filters.type || undefined} onValueChange={(value) => 
              onFiltersChange({ ...filters, type: value || '' })
            }>
              <SelectTrigger className="w-40">
                <SelectValue placeholder="All types" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="sip">SIP</SelectItem>
                <SelectItem value="military_voip">Military VOIP</SelectItem>
                <SelectItem value="teams">MS Teams</SelectItem>
                <SelectItem value="email">Email</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex items-center space-x-2">
            <label className="text-sm font-medium">Status:</label>
            <Select value={filters.status || undefined} onValueChange={(value) => 
              onFiltersChange({ ...filters, status: value || '' })
            }>
              <SelectTrigger className="w-40">
                <SelectValue placeholder="All statuses" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="archived">Archived</SelectItem>
                <SelectItem value="flagged">Flagged</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex items-center space-x-2">
            <label className="text-sm font-medium">Priority:</label>
            <Select value={filters.priority || undefined} onValueChange={(value) => 
              onFiltersChange({ ...filters, priority: value || '' })
            }>
              <SelectTrigger className="w-40">
                <SelectValue placeholder="All priorities" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="low">Low</SelectItem>
                <SelectItem value="normal">Normal</SelectItem>
                <SelectItem value="high">High</SelectItem>
                <SelectItem value="critical">Critical</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {hasActiveFilters && (
            <Button variant="outline" size="sm" onClick={clearFilters}>
              <X className="h-4 w-4" />
              Clear Filters
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
