import * as React from 'react';
import { CommunicationsList } from './components/CommunicationsList';
import { CommunicationsFilters } from './components/CommunicationsFilters';
import { AddCommunicationDialog } from './components/AddCommunicationDialog';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';

export function CommunicationsPage() {
  const [isAddDialogOpen, setIsAddDialogOpen] = React.useState(false);
  const [filters, setFilters] = React.useState({
    type: '',
    status: '',
    priority: ''
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Communications</h1>
        <Button onClick={() => setIsAddDialogOpen(true)}>
          <Plus className="h-4 w-4" />
          Add Communication
        </Button>
      </div>
      
      <CommunicationsFilters filters={filters} onFiltersChange={setFilters} />
      <CommunicationsList filters={filters} />
      
      <AddCommunicationDialog 
        open={isAddDialogOpen} 
        onOpenChange={setIsAddDialogOpen} 
      />
    </div>
  );
}
