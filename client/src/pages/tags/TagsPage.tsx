import * as React from 'react';
import { TagsList } from './components/TagsList';
import { AddTagDialog } from './components/AddTagDialog';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';

export function TagsPage() {
  const [isAddDialogOpen, setIsAddDialogOpen] = React.useState(false);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Tags Management</h1>
        <Button onClick={() => setIsAddDialogOpen(true)}>
          <Plus className="h-4 w-4" />
          Add Tag
        </Button>
      </div>
      
      <TagsList />
      
      <AddTagDialog 
        open={isAddDialogOpen} 
        onOpenChange={setIsAddDialogOpen} 
      />
    </div>
  );
}
