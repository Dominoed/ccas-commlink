import * as React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { useCreateCommunication } from '@/hooks/useCommunications';

interface AddCommunicationDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function AddCommunicationDialog({ open, onOpenChange }: AddCommunicationDialogProps) {
  const { createCommunication, loading } = useCreateCommunication();
  
  const [formData, setFormData] = React.useState({
    type: '',
    from_address: '',
    to_address: '',
    subject: '',
    content: '',
    priority: 'normal',
    duration: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const data = {
      ...formData,
      duration: formData.duration ? parseInt(formData.duration) : null
    };
    
    const success = await createCommunication(data);
    if (success) {
      onOpenChange(false);
      setFormData({
        type: '',
        from_address: '',
        to_address: '',
        subject: '',
        content: '',
        priority: 'normal',
        duration: ''
      });
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Add Communication</DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="type">Type</Label>
            <Select value={formData.type} onValueChange={(value) => 
              setFormData({ ...formData, type: value })
            }>
              <SelectTrigger>
                <SelectValue placeholder="Select type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="sip">SIP</SelectItem>
                <SelectItem value="military_voip">Military VOIP</SelectItem>
                <SelectItem value="teams">MS Teams</SelectItem>
                <SelectItem value="email">Email</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="from_address">From</Label>
            <Input
              id="from_address"
              value={formData.from_address}
              onChange={(e) => setFormData({ ...formData, from_address: e.target.value })}
              placeholder="sender@example.com or +1234567890"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="to_address">To</Label>
            <Input
              id="to_address"
              value={formData.to_address}
              onChange={(e) => setFormData({ ...formData, to_address: e.target.value })}
              placeholder="recipient@example.com or +1234567890"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="subject">Subject</Label>
            <Input
              id="subject"
              value={formData.subject}
              onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
              placeholder="Subject or call description"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="content">Content</Label>
            <Textarea
              id="content"
              value={formData.content}
              onChange={(e) => setFormData({ ...formData, content: e.target.value })}
              placeholder="Message content or call notes"
              rows={3}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="priority">Priority</Label>
              <Select value={formData.priority} onValueChange={(value) => 
                setFormData({ ...formData, priority: value })
              }>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="low">Low</SelectItem>
                  <SelectItem value="normal">Normal</SelectItem>
                  <SelectItem value="high">High</SelectItem>
                  <SelectItem value="critical">Critical</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {(formData.type === 'sip' || formData.type === 'military_voip') && (
              <div className="space-y-2">
                <Label htmlFor="duration">Duration (seconds)</Label>
                <Input
                  id="duration"
                  type="number"
                  value={formData.duration}
                  onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
                  placeholder="300"
                />
              </div>
            )}
          </div>

          <div className="flex justify-end space-x-2">
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button type="submit" disabled={loading}>
              {loading ? 'Creating...' : 'Create'}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
